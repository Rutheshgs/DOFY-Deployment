namespace DOFY.ViewEntities
{
    public class OrderWishListViewModel : EntityBase
    {
        public long PersonId { get; set; }

        public long ModelVariantId { get; set; }

        public long? ServiceTypeId { get; set; }

        public long? RowOrder { get; set; }

        public string DisplayName { get; set; }

        public string ThumbnailPath { get; set; }

        public decimal MaximumValue { get; set; }

        public string SeriesModelName { get; set; }

    }
}