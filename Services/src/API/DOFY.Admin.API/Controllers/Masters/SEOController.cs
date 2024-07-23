namespace DOFY.Admin.API.Controllers;

[Route("v1/sEO")]
public class SEOController : BaseController<ISEOModel, SEO>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly ISEOModel sEOModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public SEOController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, ISEOModel iSEOModel, CountryContext requestContext)
        : base(iSEOModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.sEOModel = iSEOModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(SEO item)
    {
        var reault = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return reault;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit(SEO item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
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
    public async Task<IEnumerable<SEO>> GetList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }

    [HttpGet]
    [Route("Edit/{Id}")]
    public async Task<ViewEntities.SEO> Edit(long Id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Get(Id);
        });

        return result;
    }

    [HttpPost]
    [Route("GetSEO/{Id}")]
    public async Task<IEnumerable<ViewEntities.SEO>> GetSEOList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetSEOList();
        });

        return result;
    }
}