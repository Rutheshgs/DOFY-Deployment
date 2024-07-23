namespace DOFY.Helper
{
    using Microsoft.Extensions.Configuration;

    public class AppConfiguration
    {
        public AppConfiguration()
        {

        }

        public IConfiguration Configuration { get; set; }

        public ProfileImagePathConfiguration ProfileImagePathConfiguration { get; set; }

        public EmailConfiguration EmailConfiguration { get; set; }

        public SMSConfiguration SMSConfiguration { get; set; }

        public DatabaseConfiguration DatabaseConfiguration { get; set; }

        public ApplicationConfiguration ApplicationConfiguration { get; set; }

        public EncryptionConfiguration EncryptionConfiguration { get; set; }

        public AWSConfiguration AWSConfiguration { get; set; }

        public ContactUsAddress ContactUsAddress_in_en { get; set; }

        public ContactUsAddress ContactUsAddress_ae_en { get; set; }

        public ContactUsAddress ContactUsAddress_ae_ar { get; set; }
    }

    public class ProfileImagePathConfiguration
    {
        public string ImagePath { get; set; }
    }

    public class ContactUsAddress
    {
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public PromotionLinks? PromotionLinks { get; set; }
    }
    public class PromotionLinks
    {
        public string faceBook { get; set; }

        public string instagram { get; set; }

        public string linkedIn { get; set; }

        public string tikTok { get; set; }

        public string youTube { get; set; }

        public string Twitter { get; set; }
    }

    public class EmailConfiguration
    {
        public string EmailFromAddressDisplayName { get; set; }

        public string SMTPClientHostName { get; set; }

        public int SMTPClientPort { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public bool EnableSSL { get; set; }

        public string SMTPDeliveryFormat { get; set; }

        public string SMTPDeliveryMethod { get; set; }

        public string SMTPEmailFromAddress { get; set; }

        public string DevEnvironmentToEmailAddress { get; set; }
    }

    public class SMSConfiguration
    {
        public string SenderName { get; set; }

        public string SMSSendAPIURL { get; set; }

        public string GlobalMessage { get; set; }

        public string SMSServiceType { get; set; }

        public string SMSFormat { get; set; }

        public string SMSProvider { get; set; }

        public string AuthorizationKey { get; set; }

        public bool EnableSMS { get; set; }

        public bool EnableEmail { get; set; }

        public string DevEnvironmentToMobile { get; set; }
    }

    public class DatabaseConfiguration
    {
        public string ConnectionStringIndia { get; set; }

        public string ConnectionStringUAE { get; set; }

        public string ProviderName { get; set; }
    }

    public class ApplicationConfiguration
    {
        public string BaseSecurityAPIkey { get; set; }

        public string ReportSecurityAPIKey { get; set; }

        public string BaseURL { get; set; }

        public string AdminURL { get; set; }

        public string ReportBaseURL { get; set; }

        public bool MasterDataFromCache { get; set; }

        public string ApplicationURL { get; set; }

        public string DofyContactNo { get; set; }

        public long TimerValue { get; set; }

        public long RetryCount { get; set; }

        public string AttachmentFilePath { get; set; }

        public string AppstoreURL { get; set; }

        public string PlaystoreURL { get; set; }

        public string EmailImagePath { get; set; }
    }

    public class EncryptionConfiguration
    {
        public string Issuer { get; set; }

        public string Audience { get; set; }

        public string GrantType { get; set; }

        public string SecurityKey { get; set; }

        public string ClientSecrect { get; set; }

        public int ExpirationInMinutes { get; set; }

        public string DataBase { get; set; }

        public int RandomDigitsCount { get; set; }

        public int OTPExpirationInMinutes { get; set; }

        public bool IsDefaultPassword { get; set; }

        public string DefaultPassword { get; set; }
    }

    public class AWSConfiguration
    {
        public string AWSRegion { get; set; }

        public string AWSAccessKey { get; set; }

        public string AWSSecretKey { get; set; }

        public string AWSBucketName { get; set; }

        public string Environment { get; set; }

        public bool EnableS3 { get; set; }
    }
}
