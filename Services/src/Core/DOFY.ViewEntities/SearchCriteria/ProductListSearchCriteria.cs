namespace DOFY.ViewEntities
{
    public class ProductListSearchCriteria : SearchBaseCriteria
    {
        public long? CategoryId { get; set; }

        public long? ProductTypeId { get; set; }

        public long? BrandMasterId { get; set; }

        public long? SeriesModelId { get; set; }
    }
}
