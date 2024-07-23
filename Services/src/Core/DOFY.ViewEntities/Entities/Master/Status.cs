namespace DOFY.ViewEntities;

public class Status : EntityBase
{
    public long? EntityTypeId { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string EnumName { get; set; }

    public string DisplayName { get; set; }

    public string TemplateText { get; set; }

    public bool DisplayInList { get; set; }

    public long? RowOrder { get; set; }

    public string ExternalStatus { get; set; }

    public string ColorCode { get; set; }
}
