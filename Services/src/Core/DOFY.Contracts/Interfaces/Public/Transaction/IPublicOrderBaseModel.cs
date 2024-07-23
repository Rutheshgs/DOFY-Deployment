namespace DOFY.Contracts;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IPublicOrderBaseModel<TEntity> : IEntityModel<TEntity>
                                            where TEntity : EntityBase
{
    /// <summary>
    /// Do Cancel Order .
    /// </summary>
    /// <param name="order">criteria.</param>
    /// <returns>Cancel order Id.</returns>
    long CancelOrderRequest(TEntity order);

    /// <summary>
    /// Do Reschedule Order .
    /// </summary>
    /// <param name="item">criteria.</param>
    /// <returns>Rescheduled orderId.</returns>
    long Reschedule(Appointment item);

    /// <summary>
    /// Get Orders list.
    /// </summary>
    /// <param name="criteria">criteria.</param>
    /// <returns>List in Orders creation.</returns>
    PagedList<OrdersViewModel> GetOrdersList(OrderSearchCriteria criteria);

    /// <summary>
    /// Get Orders list.
    /// </summary>
    /// <param name="criteria">criteria.</param>
    /// <returns>List in Orders creation.</returns>
    PagedList<OrdersViewModel> GetPersonOrders(PersonOrdersSearchCriteria criteria);

    /// <summary>
    /// Do Reschedule Order .
    /// </summary>
    /// <param name="item">criteria.</param>
    /// <returns>Rescheduled orderId.</returns>
    long SaveAppointment(Appointment item);

    /// <summary>
    /// Do Reschedule Order .
    /// </summary>
    /// <param name="id">orderid.</param>
    /// <returns> order summary.</returns>
    Orders GetOrderSummary(long id);

    /// <summary>
    /// Do Reschedule Order .
    /// </summary>
    /// <param name="id">orderid.</param>
    /// <returns> Reportorder summary.</returns>
    IEnumerable<ReportOrderViewModel> GetReportOrderSummary(long id);

    /// <summary>
    /// Do Reschedule Order .
    /// </summary>
    /// <param name="code">code.</param>
    /// <param name="orderId">orderid.</param>
    /// <returns> Reportorder summary.</returns>
    long UpdateReferalCode(string code, long orderId);

    /// <summary>
    /// Do ReEvaluteOrder .
    /// </summary>
    /// <param name="id">orderid.</param>
    /// <returns> order summary.</returns>
    Orders ReEvaluteOrder(long id);
}
