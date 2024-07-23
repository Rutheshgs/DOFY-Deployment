namespace DOFY.Contracts.Interfaces;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IPublicAppointmentModel : IEntityModel<Appointment>
{
    /// <summary>
    /// Get All Appointment list.
    /// </summary>
    /// <param name="request">request</param>
    /// <returns>List in Appointment creation</returns>
    PagedList<Appointment> GetAppointmentList(SearchBaseCriteria criteria);

    /// <summary>
    /// Get Appointment list.
    /// </summary>
    /// <param name="orderId">request.</param>
    /// <returns>List in Appointment creation.</returns>
    Appointment GetAppointmentsByOrderId(long orderId);

    /// <summary>
    /// Get Appointment list.
    /// </summary>.
    /// <param name="appointment">Request.</param>
    /// <param name="orderId">request.</param>
    /// <returns>List in Appointment creation.</returns>
    long Reschedule(Appointment appointment, long orderId);
}
