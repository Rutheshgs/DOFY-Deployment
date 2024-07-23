namespace DOFY.Admin.API.Controllers;

[Route("v1/repair")]
public class RepairController : OrderBaseController<ViewEntities.RepairOrder>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IOrderBaseModel<ViewEntities.RepairOrder> ordersModel;
    private IMapper mapper;
    private readonly CountryContext requestContext;

    public RepairController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IOrderBaseModel<ViewEntities.RepairOrder> iOrdersModel, CountryContext requestContext) 
        : base(iAppConfiguration, iMapper, iOrdersModel, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.ordersModel = iOrdersModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("RequoteRepair")]
    public async Task<long> RequoteRepair(IEnumerable<OrderParts> parts)
    {
        return await this.Contract.RequoteRepair(parts);
    }
}
