namespace DOFY.ViewEntities;

public class AppointmentSlots : EntityBase
{
    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public DateTime? EventDate { get; set; }

    public int? RowOrder { get; set; }
}
