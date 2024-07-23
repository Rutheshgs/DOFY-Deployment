namespace DOFY.ViewEntities;

public class ModelVariantViewModel : EntityBase
{
    public long? OrderWishlistId { get; set; }

    public long? SeriesModelId { get; set; }

    public string? SeriesModelName { get; set; }

    public string? Name { get; set; }

    public decimal? MinimumValue { get; set; }

    public decimal? MaximumValue { get; set; }

    public string? ThumbnailPath { get; set; }

    public long? RowOrder { get; set; }

    public long? BrandMasterId { get; set; }

    public string? BrandMasterName { get; set; }

    public string? ProductTypeName { get; set; }

    public long? ProductTypeId { get; set; }

    public string? ProductCategoryName { get; set; }

    public string? ThresholdCategoryName { get; set; }

    public long? ProductCategoryId { get; set; }

    public long? ThresholdCategoryId { get; set; }

    public bool DisplayInList { get; set; }

    public bool DisplayForSale { get; set; }

    public bool? ComingSoon { get; set; }
}
