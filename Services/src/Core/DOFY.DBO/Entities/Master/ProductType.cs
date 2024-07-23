using DOFY.Helper.Attributes;

namespace DOFY.DBO;

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

    [DBIgnore]
    public bool? ComingSoon { get; set; }
}
