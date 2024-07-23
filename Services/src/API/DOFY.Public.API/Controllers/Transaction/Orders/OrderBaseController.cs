

namespace DOFY.Public.API.Controllers;

[Route("v1/OrderBase")]
public class OrderBaseController<TEntity> : BaseController<IPublicOrderBaseModel<TEntity>, TEntity>
                                where TEntity : ViewEntities.Orders, new()
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicOrderBaseModel<TEntity> ordersModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public OrderBaseController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicOrderBaseModel<TEntity> iOrdersModel, CountryContext requestContext)
        : base(iOrdersModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.ordersModel = iOrdersModel;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create([FromBody] TEntity item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return result;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit([FromBody] TEntity item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        return result;
    }

    [HttpPost]
    [Route("Remove/{id}")]
    public async Task<bool> Remove(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Remove(id);
        });

        return result;
    }

    [HttpPost]
    [Route("GetOrderList")]
    public async Task<PagedList<OrdersViewModel>> PagedOrdersList(OrderSearchCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetOrdersList(criteria);
        });

        return result;
    }

    [HttpPost]
    [Route("Reschedule")]
    public async Task<long> Reschedule(Appointment item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Reschedule(item);
        });

        return result;
    }

    [HttpPost]
    [Route("CreateAppointment")]
    public async Task<long> CreateAppointment(Appointment item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.SaveAppointment(item);
        });

        return result;
    }

    [HttpPost]
    [Route("CancelOrderRequest")]
    public async Task<long> CancelOrdeRequest(TEntity item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.CancelOrderRequest(item);
        });

        return result;
    }

    [HttpPost]
    [Route("GetPersonOrders")]
    public async Task<PagedList<OrdersViewModel>> PagedPersonOrders(PersonOrdersSearchCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetPersonOrders(criteria);
        });

        return result;
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("GetOrderSummary/{id}")]
    public async Task<Orders> GetOrderSummary(int id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetOrderSummary(id);
        });

        return result;
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("ReEvaluteOrder/{id}")]
    public async Task<Orders> ReEvaluteOrder(int id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.ReEvaluteOrder(id);
        });

        return result;
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("GetReportOrderSummary/{id}")]
    public async Task<IEnumerable<ReportOrderViewModel>> GetReportOrderSummary(int id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetReportOrderSummary(id);
        });

        return result;
    }

    [HttpPost]
    [Route("UpdateReferalCode")]
    public async Task<long> UpdateReferalCode(string code, long orderId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.UpdateReferalCode(code, orderId);
        });

        return result;
    }  
}