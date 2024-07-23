namespace DOFY.DBO;

public class AddressType : EntityBase
{
    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public long? RowOrder { get; set; }

}
