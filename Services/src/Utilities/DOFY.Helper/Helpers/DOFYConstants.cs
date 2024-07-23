namespace DOFY.Helper
{
    public static class DOFYConstants
    {
        public const string HostingEnvironment = "Hosting:Environment";

        public const string ServiceAuthorizationHeaderScheme = "BaseSecurityAPIkey";

        public static bool ACTIVESTATUS { get; set; } = true;

        public static string DATE_FORMAT { get; set; } = "MMM d, yyy";

        public static string TIME_FORMAT { get; set; } = "hh:mm tt";

        public static string DEFAULT_SQL_DATE { get; set; } = "Jan 1, 1900";

        public static string MASTERDATAFROMCACHE { get; set; } = "ApplicationConfiguration:MasterDataFromCache";

        public static int NEXT_ROW_ORDER { get; set; } = 100;

        public static int JWT_MAX_AGE = 8;

        public static int SMS_ENTITY_TYPE = 14;

        public static int EMAIL_ENTITY_TYPE = 15;

        public static string CSVFILEFORMAT { get; set; } = ".csv";

        public static string India { get; set; } = "in";

        public static string UAE { get; set; } = "ae";

        public static string Language_English { get; set; } = "en";

        public static string Language_Arabic { get; set; } = "ar";

        public enum QUESTIONTYPE
        {
            HEADING, SUB_HEADING, QUESTIONS, NONE,
        }

        public static class DataBase
        {
            public static string VW_LoginDetail { get; set; } = "vw_LoginDetail";

            public static string VW_MasterModelVariants { get; set; } = "vw_MasterModelVariants";

            public static string VW_SeriesModel { get; set; } = "vw_SeriesModel";

            public static string SP_GetBrandMasterList { get; set; } = "GetBrandMasterList";

            public static string SP_GetDofygeoList { get; set; } = "GetDofyGeoList";

            public static string SP_GetBrandSeriesList { get; set; } = "GetBrandSeriesList";

            public static string SP_GetModelVariantList { get; set; } = "GetModelVariantList";

            public static string SP_GetQuestionnaireList { get; set; } = "GetQuestionnaireList";

            public static string SP_GetQuestionnaireTypeList { get; set; } = "GetQuestionnaireTypeList";

            public static string SP_GetSeriesModelList { get; set; } = "GetSeriesModelList";

            public static string SP_GetQuote { get; set; } = "GetQuoteV1";

            public static string SP_GetAppointmentList { get; set; } = "GetAppointmentList";

            public static string SP_GetOrdersList { get; set; } = "GetOrdersList";

            public static string SP_GetUserAddressList { get; set; } = "GetUserAddressList";

            public static string SP_GetProductTypeList { get; set; } = "GetProductTypeList";

            public static string SP_GetQuestionnaireTemplate { get; set; } = "GetQuestionnaireTemplateV1";

            public static string SP_GetOrderSummary { get; set; } = "GetOrderSummary";

            public static string SP_GetAppointmentSlotsList { get; set; } = "GetAppointmentSlotsList";

            public static string SP_GetLoginsList { get; set; } = "GetLoginsList";

            public static string SP_GetPersonList { get; set; } = "GetPersonList";

            public static string SP_GetRolesList { get; set; } = "GetRolesList";

            public static string SP_GetStatusList { get; set; } = "GetStatusList";

            public static string SP_GetUserRolesList { get; set; } = "GetUserRolesList";

            public static string SP_GetPersonAddress { get; set; } = "GetPersonAddress";

            public static string SP_GetPersonOrders { get; set; } = "GetPersonOrders";

            public static string SP_GetServiceTypeList { get; set; } = "GetServiceTypeList";

            public static string SP_GetDocumentTypeList { get; set; } = "GetDocumentTypeList";

            public static string SP_GetEmailTemplatesList { get; set; } = "GetEmailTemplatesList";

            public static string SP_GetOSTypeList { get; set; } = "GetOSTypeList";

            public static string SP_GetQuestionnaireTemplateList { get; set; } = "GetQuestionnaireTemplateList";

            public static string SP_GetAddressTypeList { get; set; } = "GetAddressTypeList";

            public static string SP_GetCancellationTypeList { get; set; } = "GetCancellationTypeList";

            public static string SP_GetPartTypeList { get; set; } = "GetPartTypeList";

            public static string SP_GetPaymentTypeList { get; set; } = "GetPaymentTypeList";

            public static string SP_GetRecomendationItemsList { get; set; } = "GetRecomendationItemsList";

            public static string SP_GetRepairTypeList { get; set; } = "GetRepairTypeList";

            public static string SP_IncrementSeed { get; set; } = "IncrementSeed";

            public static string SP_GetAssigneeList { get; set; } = "GetAssigneeList";

            public static string SP_GetOrdersByRider { get; set; } = "GetOrdersByRider";

            public static string SP_GetSeriesModelColorsList { get; set; } = "GetSeriesModelColorsList";

            public static string SP_GetAssigneeDetails { get; set; } = "GetAssigneeDetails";
            
            public static string SP_GetRptProductList { get; set; } = "GetRptProductList";

            public static string SP_GetUsersByRoleId { get; set; } = "GetUsersByRoleId";

            public static string SP_GetOrderStats { get; set; } = "GetOrderStats";

            public static string SP_GetModelVariants { get; set; } = "GetModelVariants";

            public static string SP_GetSeriesModelByBrandMasterId { get; set; } = "GetSeriesModelByBrandMasterId";

            public static string SP_GetQuestionnaireBasedModelVariantId { get; set; } = "GetQuestionnaireBasedModelVariantId";

            public static string SP_GetModelVariantsbyBrandMasterId { get; set; } = "GetModelVariantsbyBrandMasterId";

            public static string SP_GetOrderWishList { get; set; } = "GetOrderWishList";

            public static string SP_GetHotSaleVariants { get; set; } = "GetHotSaleVariants";

            public static string SP_GetInvoiceDetails { get; set; } = "GetInvoiceDetails";

            public static string SP_GetOSTypebyGadgetId { get; set; } = "GetOSTypebyGadgetId";

            public static string SP_GetCategorybyOSTypeGadgetId { get; set; } = "GetCategorybyOSTypeGadgetId";

            public static string SP_GetQuestionnaireTemplateForThreshold { get; set; } = "GetQuestionnaireTemplateForThresholdV1";

            public static string SP_GetVerificationCodeExpirationStatus { get; set; } = "GetVerificationCodeExpirationStatus";

            public static string SP_GetAppointments  { get; set; } = "GetAppointmentsV1";

            public static string SP_GetSEOList { get; set; } = "GetSEOList";

            public static string SP_ValidateReferralCode { get; set; } = "sp_ValidateReferralCode"; 

            public static string SP_RemoveReferralCode { get; set; } = "sp_RemoveReferralCode";
        }

        public static class EmailTemplatesInfo
        {
            public const string LOGIN_OTP = "Login_OTP";
            public const string ORDER_PLACED = "Order_Placed";
            public const string ORDER_RESHEDULED = "Order_Rescheduled";
            public const string ORDER_CANCELED = "Order_Cancelled";
            public const string ORDER_PENDING = "Order_Pending";
            public const string REPORT_DELAY = "Report_Delay";
            public const string AMOUNT_REQUOTE = "Amount_Requote";
            public const string PAYMENTPROCESS_OTP = "Payment_Process_OTP";
            public const string PAYMENT_SUCCESSFULL = "Payment_Successful";
            public const string PAYMENT_FAILED = "Payment_Failed";
            public const string ORDER_FAILED = "Order_Failed";
            public const string ORDERCANCEL_REQUEST = "Order_Cancel_Request";
            public const string CALLWASNOT_PICKED = "Call_was_not_Picked";
            public const string CONTACT_US = "Contact_Us";
            public const string DOWNLOAD_APP = "Download_App";
            public const string ACCOUNT_DELETION_OTP = "Account_deletion_OTP";
        }
    }
}