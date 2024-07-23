namespace DOFY.ViewEntities;

public class PartType : EntityBase
{
    public long? ProductTypeId { get; set; }

    public long? RepairTypeId { get; set; }

    public long? SeriesModelColorId { get; set; }

    public string? PartId { get; set; }

    public string? PartName { get; set; }

    public string? EnumName { get; set; }

    public decimal? PartValue { get; set; }

    public decimal? ServiceValue { get; set; }

    public decimal? ServiceCharge { get; set; }

    public long? RowOrder { get; set; }

    public bool? DisplayInList { get; set; }

    public bool? Enabled { get; set; }
}
