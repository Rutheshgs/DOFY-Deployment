namespace DOFY.DBO;

public class OrderHistory : EntityBase
{
    public long OrderId { get; set; }

    public long StatusId { get; set; }

    public DateTime? TransactionDate { get; set; }

    public long? AssignedTo { get; set; }

    public decimal? Amount { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public string Comments { get; set; }
}