namespace DOFY.NotificationService
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http.Headers;
    using System.Net.Mail;
    using System.Threading;
    using System.Threading.Tasks;
    using DOFY.Helper;
    using DOFY.Logger;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Options;

    public class NotificationSenderService : BackgroundService
    {
        private System.Timers.Timer pendingEmailCheckTimer;
        private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
        private readonly long defaultTimerValue;

        public NotificationSenderService(IOptionsSnapshot<AppConfiguration> _AppConfiguration)
        {
            this.defaultTimerValue = 30000;
            this.pendingEmailCheckTimer = new System.Timers.Timer();
            this.appConfiguration = _AppConfiguration;
        }

        public override async Task StartAsync(CancellationToken cancellationToken)
        {

            if (Environment.UserInteractive)
            {
                Console.WriteLine("Dofy Notification Service started as a Console Application");
                Console.WriteLine(" 1. Run Service");
                Console.WriteLine(" 2. Exit");
                Console.Write("Enter Option: ");
                string input = Console.ReadLine();

                switch (input)
                {
                    case "1":
                        Console.WriteLine("Running Service - Press Enter To Exit");
                        await base.StartAsync(cancellationToken);
                        break;
                }

                Console.Read();
                await StopAsync(cancellationToken);
            }

            await base.StartAsync(cancellationToken);
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            this.pendingEmailCheckTimer.Stop();
            this.pendingEmailCheckTimer.Dispose();
            this.pendingEmailCheckTimer = null;

            await base.StopAsync(cancellationToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            if (!stoppingToken.IsCancellationRequested)
            {
                StartEmailCheckTimer();
            }
        }

        public override void Dispose()
        {
            this.pendingEmailCheckTimer = null;
        }

        private void StartEmailCheckTimer()
        {
            this.pendingEmailCheckTimer.Interval = this.appConfiguration?.Value?.ApplicationConfiguration?.TimerValue ?? defaultTimerValue;
            this.pendingEmailCheckTimer.Elapsed += new System.Timers.ElapsedEventHandler(this.OnPendingEmailCheckTimerExpired);
            this.pendingEmailCheckTimer.Start();
        }

        private void OnPendingEmailCheckTimerExpired(object sender, System.Timers.ElapsedEventArgs args)
        {
            this.pendingEmailCheckTimer.Stop();

            try
            {
                ProcessPendingTasks();
            }
            catch (Exception ex)
            {
                SeriLogger.Fatal(ex, "ProcessPendingTasks Exception Occur");
            }
            finally
            {
                this.pendingEmailCheckTimer.Start();
            }
        }

        private void ProcessPendingTasks()
        {
            IEnumerable<PendingTask> pendingTasks = new PendingTaskChecker(this.appConfiguration).FetchPendingTasks();
            if (pendingTasks?.Any() ?? false)
            {
                bool canSendSMS = this.appConfiguration.Value?.SMSConfiguration?.EnableSMS ?? false;

                bool canSendEmail = this.appConfiguration.Value?.SMSConfiguration?.EnableEmail ?? false;

                IEnumerable<SendNotificationCommand>? pendingSendSMSCommands = pendingTasks.Where(item => item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE && canSendSMS == true) 
                       ?.Select(item => new SendNotificationCommand(item, this.appConfiguration));
                Task pendingSMSTask = Task.Factory.StartNew(() =>
                {
                    if (pendingSendSMSCommands?.Any() ?? false)
                    {
                        this.ProcessPendingSMS(pendingSendSMSCommands);
                    }
                });

                IEnumerable<SendNotificationCommand>? pendingSendEmailCommands = pendingTasks.Where(item => item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE && canSendEmail == true)
                       ?.Select(item => new SendNotificationCommand(item, this.appConfiguration));
                Task pendingEmailTask = Task.Factory.StartNew(() =>
                {
                    if (pendingSendEmailCommands?.Any() ?? false)
                    {
                        this.ProcessPendingEmails(pendingSendEmailCommands);
                    }
                });

                Task.WaitAll(pendingSMSTask, pendingEmailTask);
            }
        }

        private void ProcessPendingEmails(IEnumerable<SendNotificationCommand> pendingSendEmailCommands)
        {
            using SmtpClient smtpClient = new SmtpClient(this.appConfiguration?.Value?.EmailConfiguration?.SMTPClientHostName)
            {
                Port = this.appConfiguration?.Value?.EmailConfiguration?.SMTPClientPort ?? 0,
                EnableSsl = this.appConfiguration?.Value?.EmailConfiguration?.EnableSSL ?? true,
                DeliveryFormat = (SmtpDeliveryFormat)Enum.Parse(typeof(SmtpDeliveryFormat), this.appConfiguration?.Value?.EmailConfiguration?.SMTPDeliveryFormat, true),
                DeliveryMethod = (SmtpDeliveryMethod)Enum.Parse(typeof(SmtpDeliveryMethod), this.appConfiguration?.Value?.EmailConfiguration?.SMTPDeliveryMethod, true),
                Credentials = new NetworkCredential(this.appConfiguration?.Value?.EmailConfiguration?.UserName, this.appConfiguration?.Value?.EmailConfiguration?.Password)
            };

            PendingEmailTaskQueue taskQueue = new PendingEmailTaskQueue(smtpClient);

            // this will automagically fire the dequeue and execute command in the queue
            taskQueue.Enqueue(pendingSendEmailCommands);
        }


        private void ProcessPendingSMS(IEnumerable<SendNotificationCommand> pendingSendEmailCommands)
        {
            using HttpClient httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.DefaultRequestHeaders.Add("Authorization", string.Format("Bearer {0}", this.appConfiguration?.Value?.SMSConfiguration?.AuthorizationKey));

            PendingSMSTaskQueue taskQueue = new PendingSMSTaskQueue(httpClient);

            // this will automagically fire the dequeue and execute command in the queue
            taskQueue.Enqueue(pendingSendEmailCommands);
        }
    }
}