
namespace DOFY.Public.API.Controllers;

[Route("v1/appointment")]
public class AppointmentController : BaseController<IPublicAppointmentModel, Appointment>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicAppointmentModel appointmentModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;
    public AppointmentController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicAppointmentModel iAppointmentModel, CountryContext requestContext
)
        : base(iAppointmentModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.appointmentModel = iAppointmentModel;
        this.requestContext = requestContext;

    }

    [HttpPost]
    [Route("GetAppointmentList")]
    public async Task<PagedList<Appointment>> PagedAppointmentList(SearchBaseCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAppointmentList(criteria);
        });

        return result;
    }
}