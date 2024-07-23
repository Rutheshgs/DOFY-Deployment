using DOFY.Helper.Attributes;

namespace DOFY.ViewEntities;

public class SeriesModel : EntityBase
{
    public long BrandMasterId { get; set; }

    public long? OsTypeId { get; set; }

    public string? OsTypeName { get; set; }

    public long? BrandSeriesId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public DateTime? DateOfIntroduction { get; set; }

    public bool DisplayInList { get; set; }

    public long? RowOrder { get; set; }

    public string ThumbnailPath { get; set; }

    public string Specification { get; set; }

    [DBIgnore]
    public bool? ComingSoon { get; set; }

    public string? BrandSeriesName { get; set; }

    public string? BrandSeriesThumbnailPath { get; set; }

    public string? BrandMasterName { get; set; }

    public string? BrandMasterThumbnailPath { get; set; }

    public long? ProductTypeId { get; set; }

    public string? ProductTypeName { get; set; }

    public string? ProductTypeThumbnailPath { get; set; }

    public int? TotalRowsCount { get; set; }

}
