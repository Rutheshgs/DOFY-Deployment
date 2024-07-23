namespace DOFY.Contracts;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IOrderBaseModel<TEntity> : IEntityModel<TEntity>
                                            where TEntity : EntityBase
{
    /// <summary>
    /// Do Cancel Order .
    /// </summary>
    /// <param name="order">order detail.</param>
    /// <returns>Cancel order Id.</returns>
    long CancelOrder(RejectOrderViewModel order);

    /// <summary>
    /// Do Cancel Order .
    /// </summary>
    /// <param name="item">criteria.</param>
    /// <returns>Canelled orderId.</returns>
    long Reschedule(Appointment item);

    /// <summary>
    /// Do Cancel Order .
    /// </summary>
    /// <param name="item">criteria.</param>
    /// <returns>Canelled orderId.</returns>
    long AdminReschedule(Appointment item);

    /// <summary>
    /// Do Reschedule Order .
    /// </summary>
    /// <param name="item">criteria.</param>
    /// <returns>Rescheduled orderId.</returns>
    long SaveAppointment(Appointment item);

    /// <summary>
    /// Do Reschedule Order .
    /// </summary>
    /// <param name="orderId">id of the current order.</param>
    /// <param name="assingeeId">assigned agent id.</param>
    /// <returns>Rescheduled orderId.</returns>
    long AssignToUser(long orderId, long assingeeId);

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
    Task<byte[]> ExportOrderCsv(OrderSearchCriteria criteria);

    /// <summary>
    /// Get OrdersByRider list.
    /// </summary>
    /// <param name="criteria">criteria.</param>
    /// <returns>List in OrdersByRider creation.</returns>
    PagedList<OrdersViewModel> GetOrdersByRider(OrdersByRiderSearchCriteria criteria);

    /// <summary>
    /// Get Order summary.
    /// </summary>
    /// <param name="id">orderid.</param>
    /// <returns> order summary.</returns>
    Orders GetOrderSummary(long id);

    /// <summary>
    /// Get Order summary.
    /// </summary>
    /// <param name="id">orderid.</param>
    /// <returns> order summary.</returns>
    Orders GetOrderSummaryWithTemplate(long id);

    /// <summary>
    /// Get Order Stats for Dashboard.
    /// </summary>
    /// <param name="isToday">isToday.</param>
    /// <returns> order dashboard stats.</returns>
    OrderStatsViewModel GetDashboardStats(bool isToday = true);

    /// <summary>
    /// Do Report Delay Order .
    /// </summary>
    /// <param name="order">order detail.</param>
    /// <returns> order Id.</returns>
    Task<long> ReportDelayAsync(ReportDelayViewModel order);

    /// <summary>
    /// Do Reject Order .
    /// </summary>
    /// <param name="order">order detail.</param>
    /// <returns> order Id.</returns>
    Task<long> RejectOrderAsync(RejectOrderViewModel order);

    /// <summary>
    /// Call was not picked .
    /// </summary>
    /// <param name="order">order detail.</param>
    /// <returns> order Id.</returns>
    Task<long> CallWasNotPickedAsync(TEntity order);

    /// <summary>
    /// Requote Order.
    /// </summary>
    /// <param name="questionnaireResponses">QuestionnaireResponse detail.</param>
    /// <returns> order Id.</returns>
    Task<long> RequoteOrder(IEnumerable<QuestionnaireResponses> questionnaireResponses);

    /// <summary>
    /// Requote Order.
    /// </summary>
    /// <param name="parts">QuestionnaireResponse detail.</param>
    /// <returns> order Id.</returns>
    Task<long> RequoteRepair(IEnumerable<OrderParts> parts);

    /// <summary>
    /// CancelOrder.
    /// </summary>
    /// <param name="orderEntityAsync">orderEntityAsync detail.</param>
    /// <returns> order Id.</returns>
    Task<long> CancelOrderProcAsync(RejectOrderViewModel orderEntityAsync);

    /// <summary>
    /// Order success.
    /// </summary>
    /// <param name="orderId">order detail.</param>
    /// <returns> order Id.</returns>
    Task<long> OrderCompleted(long orderId);

    /// <summary>
    /// Order Retrive.
    /// </summary>
    /// <param name="orderId">order detail.</param>
    /// <returns> order Id.</returns>
    Task<long> RetrieveOrder(long orderId);

    /// <summary>
    /// Get OrderOTP.
    /// </summary>
    /// <param name="orderId">order detail.</param>
    /// <returns> order Id.</returns>
    Task<OrderOtpViewModel> GetOrderOTP(long orderId);

    /// <summary>
    /// Validate OrderOTP.
    /// </summary>
    /// <param name="orderOtpView">order detail.</param>
    /// <returns> boolean.</returns>
    Task<bool> ValidateOrderOTP(OrderOtpViewModel orderOtpView);

    /// <summary>
    /// Validate OrderOTP.
    /// </summary>
    /// <param name="orderOtpView">order detail.</param>
    /// <returns> boolean.</returns>
    Task<bool> SkipOTP(OrderOtpViewModel orderOtpView);

    /// <summary>
    /// Do Reschedule Order .
    /// </summary>
    /// <param name="orderId">orderid.</param>
    /// <param name="amount">amount.</param>
    /// <returns> Reportorder summary.</returns>
    long AddAdjustment(long orderId, decimal amount);

    /// <summary>
    /// Order Payout .
    /// </summary>
    /// <param name="orderId">orderid.</param>    
    /// <returns> GetOrderPayout.</returns>
    OrderPayout GetOrderPayout(long orderId);

    /// <summary>
    /// Order Payout .
    /// </summary>
    /// <param name="orderId">orderid.</param>    
    /// <returns> GetOrderPayout.</returns>
    Task<byte[]> ExportProductListCsv( ProductListSearchCriteria criteria);

    /// <summary>
    /// Order Payout .
    /// </summary>
    /// <param name="orderId">orderid.</param>    
    /// <returns> GetOrderPayout.</returns>
    PagedList<ProductRptViewModel> GetProductList(ProductListSearchCriteria criteria);
}
