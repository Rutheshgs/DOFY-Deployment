namespace DOFY.ViewEntities
{
    public class ProductRptViewModel : EntityBase
    {
        public string ProductTypeName { get; set; }

        public string BrandMasterName { get; set; }

        public string BrandSeriesName { get; set; }

        public string SeriesModelName { get; set; }

        public string Name { get; set; }

        public long MinimumValue { get; set; }

        public long MaximumValue { get; set; }

        public string ProductCategoryName { get; set; }

        public string ThresholdCategoryName { get; set; }

        public string HotSelling { get; set; }

        public string OsTypeName { get; set; }

        public string DisplayForSale { get; set; }
    }
}
