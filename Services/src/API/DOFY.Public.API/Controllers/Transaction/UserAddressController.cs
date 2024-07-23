namespace DOFY.Public.API.Controllers;

[Route("v1/userAddress")]
public class UserAddressController : BaseController<IPublicUserAddressModel, UserAddress>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicUserAddressModel userAddressModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;
    public UserAddressController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicUserAddressModel iUserAddressModel, CountryContext requestContext) 
        : base(iUserAddressModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.userAddressModel = iUserAddressModel;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(UserAddress item)
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.Post(item);
            return result;
        });

        return pagedResult;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit(UserAddress item)
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.Put(item);
            return result;
        });

        return pagedResult;
    }

    [HttpPost]
    [Route("Remove/{id}")]
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
    public async Task<IEnumerable<UserAddress>> GetList()
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.GetList();

            return result;
        });

        return pagedResult;
    }


    [HttpPost]
    [Route("GetPersonAddress")]
    public async Task<PagedList<UserAddressViewModel>> PagedPersonAddress(long personId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetPersonAddress(personId);
        });

        return result;
    }
}