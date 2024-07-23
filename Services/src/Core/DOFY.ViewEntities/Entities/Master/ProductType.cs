namespace DOFY.ViewEntities;

public class ProductType : EntityBase
{
    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public string Year { get; set; }

    public long? RowOrder { get; set; }

    public string ThumbnailPath { get; set; }

    public bool Enabled { get; set; }

    public bool DisplayInList { get; set; }

    public bool? ComingSoon { get; set; }
}
