namespace DOFY.ViewEntities;

public class Appointment : EntityBase
{
    public long OrderId { get; set; }

    public long? AssigneeId { get; set; }

    public long? UserAddresId { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string ?Remarks { get; set; }

    public string TechnicianComments { get; set; }

    public int? RowOrder { get; set; }

    public bool? IsReschedule { get; set; }

    public string Address { get; set; }

    public string AppointmentCity { get; set; }

    public string? AppointmentPincode { get; set; }

    public int? ReasonId { get; set; }

    public string? Address1 { get; set; }

    public string? LandMark { get; set; }

    public string? Name { get; set; }
}
