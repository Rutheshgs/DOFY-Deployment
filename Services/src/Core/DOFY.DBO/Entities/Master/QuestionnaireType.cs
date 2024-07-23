namespace DOFY.DBO;

public class QuestionnaireType : EntityBase
{
    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public long? RowOrder { get; set; }

    public long ProductTypeId { get; set; }

    public long Section { get; set; }

    public long ParentSection { get; set; }

    public string ChildSectionFailure { get; set; }

    public long ChildSectionSuccess { get; set; }

}
