namespace DOFY.DBO;

public class CancellationType : EntityBase
{
    public long? EntityTypeId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public bool DisplayInList { get; set; }

    public long? RowOrder { get; set; }

    public string? SecondLanguage { get; set; }
}
