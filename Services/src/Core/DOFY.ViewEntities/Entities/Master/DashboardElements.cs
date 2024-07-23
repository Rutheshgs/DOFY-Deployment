namespace DOFY.ViewEntities;

public class DashboardElements : EntityBase
{
    public long? ModelVariantId { get; set; }

    public long? EntityTypeId { get; set; }
     
    public string? Title { get; set; }

    public string? AuthorName { get; set; }

    public string? Content { get; set; }

    public bool? DisplayInList { get; set; }

    public bool? Enabled { get; set; }

    public string? ThumbnailPath { get; set; }

    public long? RowOrder { get; set; }
}
