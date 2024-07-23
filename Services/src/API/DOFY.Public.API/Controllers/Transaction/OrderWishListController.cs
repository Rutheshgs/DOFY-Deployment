namespace DOFY.Public.API.Controllers;

[Route("v1/orderWishList")]
[ApiController]
public class OrderWishListController : BaseController<IPublicOrderWishListModel, OrderWishList>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicOrderWishListModel orderWishListModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;
    public OrderWishListController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicOrderWishListModel iOrderWishListModel, CountryContext requestContext)
        : base(iOrderWishListModel, iAppConfiguration, requestContext: requestContext
)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.orderWishListModel = iOrderWishListModel;
        this.requestContext = requestContext;

    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(OrderWishList item)
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.Post(item);
            return result;
        });

        return pagedResult;
    }

    [HttpGet]
    [Route("GetWishListList")]
    public async Task<IEnumerable<OrderWishList>> GetList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }

    [HttpPost]
    [Route("GetWishList/{PersonId}")]
    public async Task<IEnumerable<OrderWishListViewModel>> GetOrderWishList(long PersonId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetOrderWishList(PersonId);
        });

        return result;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit(OrderWishList item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);            
        });

        return result;
    }

    [HttpPost]
    [Route("AddOrUpdate")]
    public async Task<long> AddOrUpdate(OrderWishList item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.AddOrUpdate(item);
        });

        return result;
    }
}
