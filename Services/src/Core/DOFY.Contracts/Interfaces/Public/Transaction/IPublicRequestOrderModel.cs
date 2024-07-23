using DOFY.ViewEntities;

namespace DOFY.Contracts
{
    public interface IPublicRequestOrderModel : IBaseModel<OrderPublicRequest>
    {
        /// <summary>
        /// Post Location list.
        /// </summary>.
        /// <param name="item">Request.</param>
        /// <returns>List in Appointment creation.</returns>
        long SaveLocation(OrderPublicRequest item);

        /// <summary>
        /// Post Device list.
        /// </summary>.
        /// <param name="item">Request.</param>
        /// <returns>List in Appointment creation.</returns>
        long SaveDevice(OrderPublicRequest item);
    }
}
