namespace DOFY.Public.API.Controllers;

[Route("v1/PersonRating")]
[ApiController]
public class PersonRatingController : BaseController<IPublicPersonRatingModel, PersonRating>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicPersonRatingModel PersonRatingModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public PersonRatingController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicPersonRatingModel iPersonRatingModel, CountryContext requestContext)
        : base(iPersonRatingModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.PersonRatingModel = iPersonRatingModel;
        this.requestContext = requestContext;

    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create([FromBody] ViewEntities.PersonRating item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return result;
    }

    [HttpGet]
    [Route("GetList")]
    public async Task<IEnumerable<PersonRating>> GetList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetPersonRating/{PersonId}")]
    public async Task<PersonRating> GetPersonRating(long PersonId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetPersonRating(PersonId);
        });

        return result;
    }
}
