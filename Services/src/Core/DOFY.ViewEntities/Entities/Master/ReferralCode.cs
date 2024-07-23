namespace DOFY.ViewEntities
{
    public class ReferralCode : EntityBase
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string EnumName { get; set; }

        public long? RowOrder { get; set; }

        public string Code { get; set; }

        public string UrlData { get; set; }

        public decimal? Amount { get; set; }

        public string Message { get; set; }

        public string? SecondLanguage { get; set; }
    }
}
