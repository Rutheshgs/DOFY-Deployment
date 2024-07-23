namespace DOFY.DBO;

public class OrderParts : EntityBase
{
    public long OrderId { get; set; }

    public long RepairTypeId { get; set; }

    public long PartTypeId { get; set; }

    public long? RowOrder { get; set; }
}