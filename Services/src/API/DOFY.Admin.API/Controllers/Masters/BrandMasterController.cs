namespace DOFY.Admin.API.Controllers;

[Route("v1/brandMaster")]
public class BrandMasterController : BaseController<IBrandMasterModel, BrandMaster>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IBrandMasterModel brandmasterModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public BrandMasterController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IBrandMasterModel iBrandMasterModel, CountryContext requestContext)
        : base(iBrandMasterModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.brandmasterModel = iBrandMasterModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetBrandMaster")]
    public async Task<IEnumerable<BrandMaster>> GetBrandMaster()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(BrandMaster item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return result;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit(BrandMaster item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        return result;
    }

    [HttpGet]
    [Route("Remove/{id}")]
    public async Task<bool> Remove(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Remove(id);
        });

        return result;
    }
}