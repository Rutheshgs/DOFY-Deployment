namespace DOFY.Admin.API.Controllers;

[Route("v1/serviceType")]
public class ServiceTypeController : BaseController<IServiceTypeModel, ServiceType>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IServiceTypeModel serviceTypeModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public ServiceTypeController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IServiceTypeModel iServiceTypeModel, CountryContext requestContext)
        : base(iServiceTypeModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.serviceTypeModel = iServiceTypeModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetServiceType")]
    public async Task<IEnumerable<ServiceType>> GetServiceType()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }
}