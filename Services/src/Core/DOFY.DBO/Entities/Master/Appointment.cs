namespace DOFY.DBO;

public class Appointment : EntityBase
{
    public long OrderId { get; set; }

    public long? AssigneeId { get; set; }

    public long? UserAddresId { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string Remarks { get; set; }

    public string TechnicianComments { get; set; }

    public int? RowOrder { get; set; }

    public bool? IsReschedule { get; set; }
}
