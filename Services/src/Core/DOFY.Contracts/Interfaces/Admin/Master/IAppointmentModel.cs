namespace DOFY.Contracts.Interfaces;

using DOFY.ViewEntities;

public interface IAppointmentModel : IEntityModel<Appointment>
{
    /// <summary>
    /// Get Appointment list.
    /// </summary> 
    /// <param name="appointment">Request.</param>
    /// <param name="orderId">request.</param>
    /// <returns>List in Appointment creation.</returns>
    long Reschedule(Appointment appointment, long orderId);
}
