using DOFY.Helper;

namespace DOFY.Admin.API.Controllers;

[Route("v1/repairType")]
public class RepairTypeController : BaseController<IRepairTypeModel, RepairType>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly CountryContext requestContext;
    private readonly IMapper mapper;
    private readonly IRepairTypeModel repairTypeModel;

    public RepairTypeController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IRepairTypeModel iRepairTypeModel, CountryContext requestContext)
        : base(iRepairTypeModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.repairTypeModel = iRepairTypeModel;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("GetAllRepairType")]
    public async Task<IEnumerable<RepairType>> GetAllRepairType()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetRepairTypeList();
        });

        return result;
    }

    [HttpPost]
    [Route("GetRepairTypesForSeries/{seriesId}")]
    public async Task<IEnumerable<RepairType>> GetRepairTypesForSeries(long seriesModelColorId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAllRepairTypes(seriesModelColorId);
        });

        return result;
    }
}