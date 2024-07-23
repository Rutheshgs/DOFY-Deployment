namespace DOFY.Admin.API.Controllers;

[Route("v1/ProductType")]
public class ProductTypeController : BaseController<IProductTypeModel, ProductType>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly CountryContext requestContext;
    private readonly IProductTypeModel productTypeModel;
    private IMapper mapper;

    public ProductTypeController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IProductTypeModel iProductTypeModel, CountryContext requestContext)
        : base(iProductTypeModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.productTypeModel = iProductTypeModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(ProductType item)
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.Post(item);
            return result;
        });

        return pagedResult;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit(ProductType item)
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.Put(item);
            return result;
        });

        return pagedResult;
    }

    [HttpGet]
    [Route("View/{id}")]
    public async Task<ProductType> View(int id)
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.Get(id);

            return result;
        });

        return pagedResult;
    }


    [HttpPost("Remove/{id}")]
    public async Task<bool> Remove(long id)
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.Remove(id);

            return result;
        });

        return pagedResult;
    }


    [HttpGet]
    [Route("GetList")]
    public async Task<IEnumerable<ProductType>> GetList()
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.GetList();

            return result;
        });

        return pagedResult;
    }
}