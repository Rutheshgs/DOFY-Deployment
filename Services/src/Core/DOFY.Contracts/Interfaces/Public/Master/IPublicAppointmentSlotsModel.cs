namespace DOFY.Contracts.Interfaces;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IPublicAppointmentSlotsModel : IBaseModel<AppointmentSlots>
{
    /// <summary>
    /// Get AppointmentSlots list.
    /// </summary>
    /// <param name="criteria">criteria.</param>
    /// <returns>List in AppointmentSlots creation.</returns>
    PagedList<AppointmentSlots> GetAppointmentSlotsList(SearchBaseCriteria criteria);

    /// <summary>
    /// Get AppointmentSlots list.
    /// </summary>
    /// <param name="date">date for slot.</param>
    /// <returns>List in AppointmentSlots.</returns>
    IEnumerable<AppointmentSlots> GetSlotsForDate(string date);

    /// <summary>
    /// Get AppointmentSlots list.
    /// </summary>
    /// <param name="date">date for slot.</param>
    /// <param name="productTypeId"> producttype.</param>
    /// <param name="serviceTypeId"> serviceType.</param>
    /// <param name="isExpressPickup"> isExpresspickup.</param>
    /// <param name="userAddressId"> userAddress Id.</param>
    /// <returns>List in AppointmentSlots.</returns>
    IEnumerable<AppointmentSlots> GetAppointmentSlots(string date, long productTypeId, long serviceTypeId, bool isExpressPickup, long userAddressId);
}
