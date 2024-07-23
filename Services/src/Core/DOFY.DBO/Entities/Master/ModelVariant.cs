using DOFY.Helper.Attributes;

namespace DOFY.DBO;

public class ModelVariant : EntityBase
{
    public long SeriesModelId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public DateTime? DateOfIntroduction { get; set; }

    public bool DisplayInList { get; set; }

    public long? RowOrder { get; set; }

    public string ThumbnailPath { get; set; }

    public decimal? MinimumValue { get; set; }

    public decimal? MaximumValue { get; set; }

    public bool DisplayForSale { get; set; }

    public bool DisplayForRepair { get; set; }

    public string Specification { get; set; }

    public long? ProductCategoryId { get; set; }

    public long? ThresholdCategoryId { get; set; }

    [DBIgnore]
    public bool? ComingSoon { get; set; }

    [DBIgnore]
    public string? SeriesModelName { get; set; }

    [DBIgnore]
    public string? SeriesModelThumbnailPath { get; set; }

    [DBIgnore]
    public long? BrandSeriesId { get; set; }

    [DBIgnore]
    public long? OsTypeId { get; set; }

    [DBIgnore]
    public string? BrandSeriesName { get; set; }

    [DBIgnore]
    public string? BrandSeriesThumbnailPath { get; set; }

    [DBIgnore]
    public long? BrandMasterId { get; set; }

    [DBIgnore]
    public string? BrandMasterName { get; set; }

    [DBIgnore]
    public string? BrandMasterThumbnailPath { get; set; }

    [DBIgnore]
    public long? ProductTypeId { get; set; }

    [DBIgnore]
    public string? ProductTypeName { get; set; }

    [DBIgnore]
    public string? ProductTypeThumbnailPath { get; set; }

    [DBIgnore]
    public string? ProductCategoryName { get; set; }

    [DBIgnore]
    public string? ThresholdCategoryName { get; set; }
}
