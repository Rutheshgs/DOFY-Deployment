namespace DOFY.DBO;
public class ActivityMaster : EntityBase
{
    public string Name { get; set; }

    public string Description { get; set; }

    public string EnumName { get; set; }

    public long? RowOrder { get; set; }

}
