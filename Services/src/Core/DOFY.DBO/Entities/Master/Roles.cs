namespace DOFY.DBO;

public class Roles : EntityBase
{
    public string Name { get; set; }

    public string Description { get; set; }

    public string EnumName { get; set; }

    public bool? DisplayInList { get; set; }

    public long? RowOrder { get; set; }

}
