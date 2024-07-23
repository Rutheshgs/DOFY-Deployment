using DOFY.Helper.Attributes;

namespace DOFY.DBO;

public class BrandMaster : EntityBase
{
    public long ProductTypeId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public long? RowOrder { get; set; }

    public DateTime? DateOfIntroduction { get; set; }

    public bool DisplayInList { get; set; }

    public string ThumbnailPath { get; set; }

    public string OperatingSystem { get; set; }

    [DBIgnore]
    public bool? ComingSoon { get; set; }

    [DBIgnore]
    public string? ProductTypeName { get; set; }

    [DBIgnore]
    public string? ProductTypeEnumName { get; set; }

    [DBIgnore]
    public string? ProductTypeThumbnailPath { get; set; }
}
