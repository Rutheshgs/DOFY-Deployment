namespace DOFY.Admin.API.Controllers;

[AllowAnonymous]
[Route("v1/dashboardElements")]
public class DashboardElementsController : BaseController<IDashboardElementsModel, DashboardElements>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly CountryContext requestContext;
    private readonly IMapper mapper;
    private readonly IDashboardElementsModel dashboardElementsModel;

    public DashboardElementsController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IDashboardElementsModel iDashboardElementsModel, CountryContext requestContext)
        : base(iDashboardElementsModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.dashboardElementsModel = iDashboardElementsModel;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(DashboardElements item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return result;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit(DashboardElements item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        return result;
    }
    [HttpGet]
    [Route("GetAllDashboardElements")]
    public async Task<IEnumerable<DashboardElements>> GetAllDashboardElements()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }
}
