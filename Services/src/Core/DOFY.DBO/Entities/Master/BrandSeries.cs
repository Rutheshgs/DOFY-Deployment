using DOFY.Helper.Attributes;

namespace DOFY.DBO;

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

    [DBIgnore]
    public bool? ComingSoon { get; set; }

    [DBIgnore]
    public string? BrandMasterName { get; set; }

    [DBIgnore]
    public string? BrandMasterEnumName { get; set; }

    [DBIgnore]
    public string? BrandMasterThumbnailPath { get; set; }

    [DBIgnore]
    public long? ProductTypeId { get; set; }

    [DBIgnore]
    public string? ProductTypeName { get; set; }

    [DBIgnore]
    public string? ProductTypeThumbnailPath { get; set; }
}
