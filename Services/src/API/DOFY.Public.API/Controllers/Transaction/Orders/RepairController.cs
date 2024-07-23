namespace DOFY.Public.API.Controllers;

[Route("v1/repair")]
public class RepairController : OrderBaseController<ViewEntities.RepairOrder>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly CountryContext requestContext;
    private readonly IMapper mapper;
    private readonly IPublicOrderBaseModel<ViewEntities.RepairOrder> ordersModel;

    public RepairController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicOrderBaseModel<ViewEntities.RepairOrder> iOrdersModel, CountryContext requestContext) 
        : base(iAppConfiguration, iMapper, iOrdersModel, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.ordersModel = iOrdersModel;
        this.requestContext = requestContext;

    }
}
