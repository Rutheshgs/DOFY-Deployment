namespace DOFY.ViewEntities;

public class SeriesModelViewModel : EntityBase
{
    public string Name { get; set; }

    public string? ThumbnailPath { get; set; }

    public long? RowOrder { get; set; }

    public IEnumerable<ModelVariantViewModel>? Variants { get; set; }
}