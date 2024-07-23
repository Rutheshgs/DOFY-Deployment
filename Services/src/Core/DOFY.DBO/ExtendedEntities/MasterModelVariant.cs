using DOFY.Helper.Attributes;

namespace DOFY.DBO;

public class MasterModelVariant : EntityBase
{
    public long SeriesModelId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public DateTime? DateOfIntroduction { get; set; }

    public bool DisplayInList { get; set; }

    public long? RowOrder { get; set; }

    public string ThumbnailPath { get; set; }

    public decimal MinimumValue { get; set; }

    public decimal MaximumValue { get; set; }

    public bool DisplayForSale { get; set; }

    public bool DisplayForRepair { get; set; }

    public string Specification { get; set; }

    public long? ProductCategoryId { get; set; }

    public long? ThresholdCategoryId { get; set; }

    [DBIgnore]
    public bool? ComingSoon { get; set; }

    public string SeriesModelName { get; set; }

    public string SeriesModelEnumName { get; set; }

    public string SeriesModelThumbnailPath { get; set; }

    public long? SeriesModelRowOrder { get; set; }

    public long? BrandSeriesId { get; set; }

    public long? OsTypeId { get; set; }

    public string BrandSeriesName { get; set; }

    public string BrandSeriesEnumName { get; set; }

    public string BrandSeriesThumbnailPath { get; set; }

    public long? BrandSeriesRowOrder { get; set; }

    public long? BrandMasterId { get; set; }

    public string BrandMasterName { get; set; }

    public string BrandMasterEnumName { get; set; }

    public string BrandMasterThumbnailPath { get; set; }

    public long? BrandMasterRowOrder { get; set; }

    public long? ProductTypeId { get; set; }

    public string ProductTypeName { get; set; }

    public string ProductTypeEnumName { get; set; }

    public string ProductTypeThumbnailPath { get; set; }

    public long? ProductTypeRowOrder { get; set; }

    public string? ProductCategoryName { get; set; }

    public string? ThresholdCategoryName { get; set; }

    public bool DisplaySeriesModel { get; set; }

    public bool DisplayBrandMaster { get; set; }

    public bool DisplayProductType { get; set; }
}