namespace DOFY.ViewEntities;

public class OrderParts : EntityBase
{
    public long? OrderId { get; set; }

    public long? RepairTypeId { get; set; }

    public long? PartTypeId { get; set; }

    public long? RowOrder { get; set; }

    public string? RepairType { get; set; }

    public string? PartType { get; set; }

    public decimal? ServiceCharge { get; set; }

    public bool? Enabled { get; set; }

    public string? RepairTypeName { get; set; }
}