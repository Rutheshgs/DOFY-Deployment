namespace DOFY.ViewEntities;

public class DocumentType : EntityBase
{
    public long? EntityTypeId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public long? RowOrder { get; set; }

    public bool? DisplayInList { get; set; }

}
