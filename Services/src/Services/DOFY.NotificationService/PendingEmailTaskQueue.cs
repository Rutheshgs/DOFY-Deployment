﻿namespace DOFY.NotificationService
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Linq;
    using Serilog;

    /// <summary>
    /// Processing queue that contains homogenous commands
    /// </summary>
    public class PendingEmailTaskQueue
    {
        /// <summary>
        ///   The is executing.
        /// </summary>
        private bool isExecuting;

        /// <summary>
        ///   The queue.
        /// </summary>
        private ConcurrentQueue<INotificationCommand> queue;

        private System.Net.Mail.SmtpClient smtpClient;

        public PendingEmailTaskQueue(System.Net.Mail.SmtpClient client)
        {
            this.smtpClient = client;
        }

        /// <summary>
        /// Gets Queue.
        /// </summary>
        private ConcurrentQueue<INotificationCommand> Queue
        {
            get
            {
                if (this.queue == null)
                {
                    this.queue = new ConcurrentQueue<INotificationCommand>();

                    Log.Information("Queue", "PendingEmail Task Queue Created");
                }

                return this.queue;
            }
        }

        /// <summary>
        /// The queue of index commands
        /// </summary>
        /// <param name="indexUpdateCommands">commands to be added to the queue</param>
        public void Enqueue(IEnumerable<INotificationCommand> indexUpdateCommands)
        {
            indexUpdateCommands.ToList().ForEach(item => this.Queue.Enqueue(item));

            Log.Information("Enqueue", string.Format("PendingEmailTask Queue length : {0}", this.Queue.Count));

            this.DequeueAndExecute();
        }

        /// <summary>
        /// remove the command from queue and execute
        /// </summary>
        private void DequeueAndExecute()
        {
            // this is to prevent multiple threads from causing a deadlock
            if (this.isExecuting)
            {
                return;
            }

            if (!this.Queue.TryDequeue(out INotificationCommand command))
            {
                return;
            }

            try
            {
                this.isExecuting = true;

                command.SendEmail(this.smtpClient);
                Log.Information("Email Sent");
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Exception Occurss while sending email");
            }
            finally
            {
                this.isExecuting = false;

                this.DequeueAndExecute();
            }
        }
    }
}