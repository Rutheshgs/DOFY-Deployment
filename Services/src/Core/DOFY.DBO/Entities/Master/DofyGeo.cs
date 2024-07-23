namespace DOFY.DBO;

public class DofyGeo : EntityBase
{
    public long Identifier { get; set; }

    public string Name { get; set; }

    public string Code { get; set; }

    public string EnumName { get; set; }

    public long Level { get; set; }

    public string LevelName { get; set; }

    public long Parent { get; set; }

    public long? RowOrder { get; set; }

    public bool DisplayInList { get; set; }

    public long Parent1 { get; set; }

    public string? SecondLanguage { get; set; }

    public long? DeliveryDelay { get; set; }
}
