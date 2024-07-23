namespace DOFY.Admin.API.Controllers;

[Route("v1/appointmentSlots")]
public class AppointmentSlotsController : BaseController<IAppointmentSlotsModel, AppointmentSlots>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IAppointmentSlotsModel appointmentSlotsModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public AppointmentSlotsController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IAppointmentSlotsModel iAppointmentSlotsModel, CountryContext requestContext)
        : base(iAppointmentSlotsModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.appointmentSlotsModel = iAppointmentSlotsModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("GetAppointmentSlotList")]
    public async Task<PagedList<AppointmentSlots>> PagedAppointmentSlotsList(SearchBaseCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAppointmentSlotsList(criteria);
        });

        return result;
    }

    [HttpPost]
    [Route("GetSlotsForDate")]
    public async Task<IEnumerable<AppointmentSlots>> GetSlotsForDate(string date)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetSlotsForDate(date);
        });

        return result;
    }

    [HttpPost]
    [Route("GetAppointmentSlots")]
    public async Task<IEnumerable<AppointmentSlots>> GetAppointmentSlots(string date, long productTypeId, long serviceTypeId, bool isExpressPickup, long userAddressId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAppointmentSlots(date, productTypeId, serviceTypeId, isExpressPickup, userAddressId);
        });

        return result;
    }
}