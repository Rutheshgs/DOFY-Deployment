namespace DOFY.Public.API.Controllers;

[Route("v1/PersonReview")]
[ApiController]
public class PersonReviewController : BaseController<IPublicPersonReviewModel, PersonReview>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicPersonReviewModel PersonReviewModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;
    public PersonReviewController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicPersonReviewModel iPersonReviewModel, CountryContext requestContext) 
        : base(iPersonReviewModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.PersonReviewModel = iPersonReviewModel;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create([FromBody] ViewEntities.PersonReview item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return result;
    }

    [HttpGet]
    [Route("GetList")]
    public async Task<IEnumerable<PersonReview>> GetList()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetPersonReview/{OrderId}")]
    public async Task<PersonReview> GetPersonReview(long OrderId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetPersonReview(OrderId);
        });

        return result;
    }
}
