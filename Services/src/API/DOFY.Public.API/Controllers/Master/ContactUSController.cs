namespace DOFY.Public.API.Controllers;

[AllowAnonymous]
[Route("v1/contactUS")]
public class ContactUSController : BaseController<IPublicContactUSModel, ContactUS>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicContactUSModel contactUSModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public ContactUSController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicContactUSModel iContactUSModel, CountryContext requestContext)
        : base(iContactUSModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.contactUSModel = iContactUSModel;
        this.requestContext = requestContext;

    }

    [HttpPost]
    [Route("SubmitContactUS")]
    public async Task<long> Submit([FromBody] ViewEntities.ContactUS contactUS)
    {
        return await this.Contract.SubmitContactUS(contactUS);
    }

    [HttpGet]
    [Route("GetAddress")]
    public DOFY.Helper.ContactUsAddress GetAddress()
    {
        return this.Contract.GetAddress();
    }
}
