namespace DOFY.NotificationService
{
    /// <summary>
    /// Command will host the actual job
    /// </summary>
    public interface INotificationCommand
    {
        void SendEmail(System.Net.Mail.SmtpClient smtpClient);

        void SendSMS(HttpClient httpClient);
    }
}
