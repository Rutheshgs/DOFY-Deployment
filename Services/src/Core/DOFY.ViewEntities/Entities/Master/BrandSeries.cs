namespace DOFY.ViewEntities;

public class BrandSeries : EntityBase
{
    public long BrandMasterId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public long? RowOrder { get; set; }

    public DateTime? DateOfIntroduction { get; set; }

    public bool DisplayInList { get; set; }

    public string ThumbnailPath { get; set; }

    public int? TotalRowsCount { get; set; }

    public bool? ComingSoon { get; set; }

    public string? BrandMasterName { get; set; }

    public string? BrandMasterEnumName { get; set; }

    public string? BrandMasterThumbnailPath { get; set; }

    public long? ProductTypeId { get; set; }

    public string? ProductTypeName { get; set; }

    public string? ProductTypeThumbnailPath { get; set; }
}
