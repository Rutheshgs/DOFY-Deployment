namespace DOFY.ViewEntities
{
    public class OrdersByRiderSearchCriteria : SearchBaseCriteria
    {
        public long? PersonId { get; set; }

        public string? StatusIds { get; set; }

        public long? ProductTypeId { get; set; }

        public long? SeriesModelId { get; set; }

        public long? BrandMasterId { get; set; }
    }
}
