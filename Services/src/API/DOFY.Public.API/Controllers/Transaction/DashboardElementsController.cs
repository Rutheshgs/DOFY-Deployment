namespace DOFY.Public.API.Controllers;

[AllowAnonymous]
[Route("v1/dashboardElements")]
[ApiController]
public class DashboardElementsController : BaseController<IPublicDashboardElementsModel, DashboardElements>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicDashboardElementsModel dashboardElementsModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;
    public DashboardElementsController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicDashboardElementsModel iDashboardElementsModel, CountryContext requestContext)
        : base(iDashboardElementsModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.dashboardElementsModel = iDashboardElementsModel;
        this.requestContext = requestContext;
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

    [HttpGet]
    [Route("GetHotsellingList")]
    public async Task<IEnumerable<HotSaleViewModel>> GetHotsellingList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetHotSaleVariants();
        });

        return result;
    }
}
