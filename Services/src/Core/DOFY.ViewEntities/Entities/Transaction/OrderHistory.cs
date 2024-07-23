namespace DOFY.ViewEntities;

public class OrderHistory : EntityBase
{
    public long? OrderId { get; set; }

    public long? StatusId { get; set; }

    public DateTime? TransactionDate { get; set; }

    public long? AssignedTo { get; set; }

    public decimal? Amount { get; set; }

    public string? StatusName { get; set; }

    public string? AssigneeName { get; set; }

    public string? ColorCode { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public string Comments { get; set; }
}