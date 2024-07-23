namespace DOFY.Admin.API.Controllers;

[Route("v1/sell")]
public class SellController : OrderBaseController<ViewEntities.SellOrder>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IOrderBaseModel<ViewEntities.SellOrder> ordersModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;
    public SellController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IOrderBaseModel<ViewEntities.SellOrder> iOrdersModel, CountryContext requestContext) 
        : base(iAppConfiguration, iMapper, iOrdersModel, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.ordersModel = iOrdersModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetDashboardStats")]
    public async Task<OrderStatsViewModel> GetDashboardStats(bool isToday = true)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetDashboardStats(isToday);
        });

        return result;
    }

    [HttpPost]
    [Route("PagedOrdersList")]
    public async Task<PagedList<OrdersViewModel>> PagedOrdersList(OrderSearchCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetOrdersList(criteria);
        });

        return result;
    }

    [HttpPost]
    [Route("RequoteOrder")]
    public async Task<long> RequoteOrder(IEnumerable<QuestionnaireResponses> questionnaireResponses)
    {
        return await this.Contract.RequoteOrder(questionnaireResponses);
    }
}
