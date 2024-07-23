namespace DOFY.Admin.API.Controllers;

[Route("v1/addressType")]
public class AddressTypeController : BaseController<IAddressTypeModel, AddressType>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IMapper mapper;
    private readonly IAddressTypeModel addressTypeModel;
    private readonly CountryContext requestContext;

    public AddressTypeController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IAddressTypeModel iAddressTypeModel, CountryContext requestContext)
        : base(iAddressTypeModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.addressTypeModel = iAddressTypeModel;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("GetAllAddressType")]
    public async Task<IEnumerable<AddressType>> GetAllAddressType()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }
}
