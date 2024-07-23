namespace DOFY.ViewEntities;

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

    public bool? ComingSoon { get; set; }

    public string? ProductTypeName { get; set; }

    public string? ProductTypeEnumName { get; set; }

    public string? ProductTypeThumbnailPath { get; set; }
}
