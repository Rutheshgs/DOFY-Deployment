namespace DOFY.Admin.API.Controllers;

[Route("v1/orderSpecifications")]
public class OrderSpecificationsController : BaseController<IOrderSpecificationsModel, OrderSpecifications>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IOrderSpecificationsModel orderSpecificationsModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public OrderSpecificationsController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IOrderSpecificationsModel iOrderSpecificationsModel, CountryContext requestContext)
        : base(iOrderSpecificationsModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.orderSpecificationsModel = iOrderSpecificationsModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("SubmitOrderSpecifications")]

    public async Task<long> SubmitOrderSpecifications([FromBody] IEnumerable<ViewEntities.OrderSpecifications> orderSpecifications)
    {
        return await this.Contract.AddOrderSpecifications(orderSpecifications);
    }

    [HttpPost]
    [Route("UpdateOrderSpecifications")]

    public async Task<long> UpdateOrderSpecifications([FromBody] IEnumerable<ViewEntities.OrderSpecifications> orderSpecifications)
    {
        return await this.Contract.UpdateOrderSpecifications(orderSpecifications);
    }

    [HttpGet]
    [Route("GetSpecificationsByOrderId/{orderId}")]

    public async Task<IEnumerable<ViewEntities.OrderSpecifications>> GetSpecificationsByOrderId(long orderId)
    {
        IEnumerable<ViewEntities.OrderSpecifications> orderSpecifications = await Task.Run(() =>
        {
            return this.Contract.GetSpecificationsByOrderId(orderId);
        });

        return orderSpecifications;
    }

    [HttpGet]
    [Route("Get/{id}")]

    public async Task<ViewEntities.OrderSpecifications> GetOrderSpecifications(long id)
    {
        ViewEntities.OrderSpecifications orderSpecifications = await Task.Run(() =>
        {
            return this.Contract.Get(id);
        });

        return orderSpecifications;
    }
}