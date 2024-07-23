namespace DOFY.Admin.API.Controllers;

[Route("v1/brandSeries")]

public class BrandSeriesController : BaseController<IBrandSeriesModel, BrandSeries>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IBrandSeriesModel brandSeriesModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public BrandSeriesController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IBrandSeriesModel iBrandSeriesModel, CountryContext requestContext)
        : base(iBrandSeriesModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.brandSeriesModel = iBrandSeriesModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(BrandSeries item)
    {
        var reault = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return reault;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit(BrandSeries item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        return result;
    }

    [HttpGet]
    [Route("View/{id}")]
    public async Task<BrandSeries> View(int id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Get(id);
        });

        return result;
    }

    [HttpGet]
    [Route("GetBrandSeriesById/{id}")]
    public async Task<IEnumerable<BrandSeries>> BrandSeriesById(int id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandSeriesById(id);

        });

        return result;
    }

    [HttpPost("Remove/{id}")]
    public async Task<bool> Remove(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Remove(id);
        });

        return result;
    }


    [HttpGet]
    [Route("GetList")]
    public async Task<IEnumerable<BrandSeries>> GetList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }
}
