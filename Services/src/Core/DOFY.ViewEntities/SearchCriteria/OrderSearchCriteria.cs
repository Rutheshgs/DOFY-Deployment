namespace DOFY.ViewEntities
{
    public class OrderSearchCriteria : SearchBaseCriteria
    {
        public long ProductTypeId { get; set; }

        public string? StatusId { get; set; }

        public long? BrandMasterId { get; set; }

        public long? SeriesModelId { get; set; }

        public long? CityId { get; set; }

        public long? ServiceTypeId { get; set; }

        public long? ReferralCodeId { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public long? PersonId { get; set; }

        public DateTime? CompletedStartDate { get; set; }

        public DateTime? CompletedEndDate { get; set; }
    }
}
