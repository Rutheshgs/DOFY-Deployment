using DOFY.Helper;
using DOFY.Helper.Attributes;

namespace DOFY.ViewEntities
{
    public class ProductListCsv : ExportResult
    {
        private readonly ProductRptViewModel result;

        public ProductListCsv(ProductRptViewModel item)
        {
            this.result = item;
        }

        [Column(Name = "ProductType", Order = 1)]
        public string ProductTypeName
        {
            get { return string.IsNullOrEmpty(this.result.ProductTypeName) ? string.Empty : this.result.ProductTypeName; }
        }

        [Column(Name = "BrandName", Order = 2)]
        public string BrandMasterName
        {
            get { return string.IsNullOrEmpty(this.result.BrandMasterName) ? string.Empty : this.result.BrandMasterName; }
        }

        [Column(Name = "Series", Order = 3)]
        public string BrandSeriesName
        {
            get { return string.IsNullOrEmpty(this.result.BrandSeriesName) ? string.Empty : this.result.BrandSeriesName; }
        }

        [Column(Name = "Models", Order = 4)]
        public string SeriesModelName
        {
            get { return string.IsNullOrEmpty(this.result.SeriesModelName) ? string.Empty : this.result.SeriesModelName; }
        }

        [Column(Name = "Variants", Order = 5)]
        public string Name
        {
            get { return string.IsNullOrEmpty(this.result.Name) ? string.Empty : this.result.Name; }
        }

        [Column(Name = "MinimumValue", Order = 6)]
        public string MinimumValue
        {
            get { return this.result?.MinimumValue > 0 ? String.Format("{0:0.00}", this.result?.MinimumValue) : "0.00"; }
        }

        [Column(Name = "MaximumValue", Order = 7)]
        public string MaximumValue
        {
            get { return this.result?.MaximumValue > 0 ? String.Format("{0:0.00}", this.result?.MaximumValue) : "0.00"; }
        }

        [Column(Name = "ProductCategory", Order = 8)]
        public string ProductCategory
        {
            get { return string.IsNullOrEmpty(this.result.ProductCategoryName) ? string.Empty : this.result.ProductCategoryName; }
        }

        [Column(Name = "ThresholdCategory", Order = 9)]
        public string ThresholdCategory
        {
            get { return string.IsNullOrEmpty(this.result.ThresholdCategoryName) ? string.Empty : this.result.ThresholdCategoryName; }
        }

        [Column(Name = "HotSelling", Order = 10)]
        public string HotSelling
        {
            get { return string.IsNullOrEmpty(this.result.HotSelling) ? string.Empty : this.result.HotSelling; }
        }

        [Column(Name = "OSType", Order = 11)]
        public string OsTypeName
        {
            get { return string.IsNullOrEmpty(this.result.OsTypeName) ? string.Empty : this.result.OsTypeName; }
        }

        [Column(Name = "DisplayForSale", Order = 10)]
        public string DisplayForSale
        {
            get { return string.IsNullOrEmpty(this.result.DisplayForSale) ? string.Empty : this.result.DisplayForSale == "True" ? "Yes" : "No"; }
        }
    }
}

