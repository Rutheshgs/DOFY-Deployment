namespace DOFY.Admin.API.Controllers;

[Route("v1/SeriesModel")]
public class SeriesModelController : BaseController<ISeriesModelModel, SeriesModel>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly ISeriesModelModel seriesModelModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public SeriesModelController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, ISeriesModelModel iSeriesModelModel, CountryContext requestContext)
        : base(iSeriesModelModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.seriesModelModel = iSeriesModelModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(SeriesModel item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item); ;
        });

        return result;
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("Edit")]
    public async Task<long> Edit(SeriesModel item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        return result;
    }

    [HttpGet]
    [Route("View/{id}")]
    public async Task<SeriesModel> View(int id)
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
    public async Task<IEnumerable<SeriesModel>> GetList()
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.GetList();

            return result;
        });

        return pagedResult;
    }

    [HttpPost]
    [Route("GetSeriesModelList")]
    public async Task<PagedList<SeriesModel>> PagedSeriesModelList(SearchBaseCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetSeriesModelList(criteria);
        });

        return result;
    }

}