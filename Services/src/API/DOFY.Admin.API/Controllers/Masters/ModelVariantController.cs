namespace DOFY.Admin.API.Controllers;

[Route("v1/ModelVariant")]
public class ModelVariantController : BaseController<IModelVariantModel, ModelVariant>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IModelVariantModel modelVariantModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public ModelVariantController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IModelVariantModel iModelVariantModel, CountryContext requestContext)
        : base(iModelVariantModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.modelVariantModel = iModelVariantModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(ModelVariant item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return result;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit(ModelVariant item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        return result;
    }

    [HttpGet]
    [Route("View/{id}")]
    public async Task<ModelVariant> View(int id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Get(id);
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
    public async Task<IEnumerable<ModelVariant>> GetList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }   

    [HttpPost]
    [Route("UpdateModelVarients")]
    public async Task<long> UpdateModelVarients(SeriesModelViewModel item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.AddOrUpdateItems(item);
        });

        return result;
    }

    [HttpGet]
    [Route("GetVariants")]

    public async Task<IEnumerable<SeriesModelViewModel>> GetVariants(long? brandMasterId, long? seriesModelId, long? productTypeId, long? categoryId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetVariantsBySeriesModel(brandMasterId, seriesModelId, productTypeId, categoryId);
        });

        return result;
    }

    [HttpPost]
    [Route("GetModelVariantList")]
    public async Task<PagedList<ModelVariant>> PagedModelVariantList(SearchBaseCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetModelVariantList(criteria);
        });

        return result;
    }

    [HttpGet]
    [Route("GetModel/{id}")]
    public async Task<ModelVariant> GetModel(int id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetModel(id);
        });

        return result;
    }

}