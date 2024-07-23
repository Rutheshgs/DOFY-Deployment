namespace DOFY.Public.API.Controllers;

[AllowAnonymous]
[Route("v1/personModel")]
public class PersonController : BaseController<IPublicPersonModel, Person>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicPersonModel personModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public PersonController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicPersonModel iPersonModel, CountryContext requestContext)
        : base(iPersonModel, iAppConfiguration, requestContext: requestContext
)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.personModel = iPersonModel;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetPerson/{loginId}")]
    public async Task<Person> GetPerson(long loginId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetPersonsByLoginId(loginId);
        });

        return result;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit([FromBody] Person item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        return result;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> Create([FromBody] Person item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        if (result < 0) { return Content("Already registered user"); }

        return Ok(result);
    }

    [HttpPost]
    [Route("CreateUae")]
    public async Task<IActionResult> CreateUae([FromBody] Person item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        if (result < 0) { return Content("Already registered user"); }

        return Ok(result);
    }

    [HttpPost]
    [Route("GetPersonList")]
    public async Task<ActionResult<IEnumerable<Person>>> GetPersonList(SearchBaseCriteria criteria)
    {
        return await this.Contract.GetPersonList(criteria);
    }

    [HttpGet]
    [Route("GetUserByPersonId/{id}")]
    public async Task<Users> GetUserByPersonId(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetUserByPersonId(id);
        });

        return result;
    }

    [HttpGet]
    [Route("GetBase64ProfileImage")]
    public async Task<string> GetBase64ProfileImage([FromQuery] long personId)
    {
        var result = await this.Contract.GetBase64ProfileImage(personId);

        return result;
    }

    [HttpPost]
    [Route("DeleteUser/{PersonId}")]
    public async Task<bool> DeleteUser(long PersonId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.DeleteUser(PersonId);
        });

        return result;
    }

    [HttpPost]
    [Route("VerifyUser/{PersonId}/{Password}")]
    public async Task<bool> VerifyUser(long PersonId, string Password)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.VerifyUser(PersonId, Password);
        });

        return result;
    }
}
