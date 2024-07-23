namespace DOFY.ViewEntities
{
    public class OrdersViewModel : EntityBase
    {
        public long Id { get; set; }

        public long PersonId { get; set; }

        public long ServiceTypeId { get; set; }

        public string ServiceType { get; set; }

        public long ModelVariantId { get; set; }

        public string ModelVariantName { get; set; }

        public string ThumbnailPath { get; set; }

        public string ProductTypeName { get; set; }

        public string BrandMasterName { get; set; }

        public string SeriesModelName { get; set; }

        public string UserMobile { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Address { get; set; }

        public string Address1 { get; set; }

        public string AppointmentCity { get; set; }

        public string AppointmentPincode { get; set; }

        public decimal? Amount { get; set; }

        public string IMEI { get; set; }

        public string UserName { get; set; }

        public DateTime AppointmentDate { get; set; }

        public DateTime? OrderDate { get; set; }

        public string OrderCode { get; set; }

        public long StatusId { get; set; }

        public long AssigneeId { get; set; }

        public string AssigneeName { get; set; }

        public long? RowOrder { get; set; }

        public int? TotalRowsCount { get; set; }

        public string StatusName { get; set; }

        public decimal? SuggestedCost { get; set; }

        public decimal? FinalPaid { get; set; }

        public string ColorCode { get; set; }

        public string? ReferralCode { get; set; }

        public decimal? TotalAmount { get; set; }

        public decimal? RequoteAmount { get; set; }

        public decimal? ReferralAmount { get; set; }

        public string ProductTypeEnumName { get; set; }

        public string CancellationType { get; set; }

        public decimal? Adjustment { get; set; }

        public string? UTMReference { get; set; }

        public DateTime? CompletedDate { get; set; }
    }
}
