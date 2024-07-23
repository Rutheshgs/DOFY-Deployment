namespace DOFY.Admin.API.Controllers;

[Route("v1/personModel")]
public class PersonController : BaseController<IPersonModel, Person>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPersonModel personModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public PersonController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPersonModel iPersonModel, CountryContext requestContext)
        : base(iPersonModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.personModel = iPersonModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetUser/{id}")]
    public async Task<Users> GetUser(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetUserByPersonId(id);
        });

        return result;
    }

    [HttpGet]
    [Route("GetUserProfileImage")]
    public async Task<IActionResult> GetUserProfileImage([FromQuery] long personId)
    {
        (byte[] fileContent, string fileName) = await this.Contract.GetUserProfileImage(personId);

        this.Response.Headers.Add("Content-Disposition", "inline;filename=\"" + fileName + "\"");
        return new FileContentResult(fileContent, $"image/{Path.GetExtension(fileName)}");
    }

    [HttpGet]
    [Route("GetBase64ProfileImage")]
    public async Task<string> GetBase64ProfileImage([FromQuery] long personId)
    {
        var result = await this.Contract.GetBase64ProfileImage(personId);

        return result;
    }

    [HttpPost]
    [Route("CreateUser")]
    public async Task<IActionResult> CreateUser([FromForm] Users item)
    {
        var result = await this.Contract.PostUser(item);

        if (result < 0) { return Content("Already registerd user"); }

        return Ok(result);
    }

    [HttpPost]
    [Route("EditUser")]
    public async Task<long> Edit([FromForm] Users item)
    {
        var result = await this.Contract.PutUser(item);

        return result;
    }

    [HttpGet]
    [Route("Remove/{id}")]
    public async Task<bool> Remove(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Remove(id);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllPerson")]
    public async Task<IEnumerable<Person>> GetAllPerson()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetPersonsByRoleId/{roleId}")]
    public async Task<IEnumerable<Person>> GetPersonsByRoleId(long roleId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetPersonsByRoleId(roleId);
        });

        return result;
    }

    [HttpPost]
    [Route("GetAssigneeList")]
    public async Task<IEnumerable<Person>> PagedAssigneeList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAssigneeList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetAssigneeDetail/{id}")]
    public async Task<ViewEntities.AssigneeDetailsViewModel> GetAssigneeDetail(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAssigneeDetail(id);
        });

        return result;
    }

    [HttpPost]
    [Route("GetPersonList")]
    public async Task<PagedList<Person>> GetPersonList(SearchBaseCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetPersonList(criteria);
        });

        return result;
    }
}