namespace DOFY.Public.API.Controllers;

[Route("v1/sell")]
public class SellController : OrderBaseController<ViewEntities.SellOrder>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly CountryContext requestContext;
    private readonly IMapper mapper;
    private readonly IPublicOrderBaseModel<ViewEntities.SellOrder> ordersModel;

    public SellController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicOrderBaseModel<ViewEntities.SellOrder> iOrdersModel, CountryContext requestContext) 
        : base(iAppConfiguration, iMapper, iOrdersModel, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.ordersModel = iOrdersModel;
        this.requestContext = requestContext;

    }
}
