
using DOFY.Helper;

namespace DOFY.Admin.API.Controllers;

[Route("v1/questionnaireType")]
public class QuestionnaireTypeController : BaseController<IQuestionnaireTypeModel, QuestionnaireType>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IQuestionnaireTypeModel questionnaireTypeModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public QuestionnaireTypeController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IQuestionnaireTypeModel iQuestionnaireTypeModel, CountryContext requestContext)
        : base(iQuestionnaireTypeModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.questionnaireTypeModel = iQuestionnaireTypeModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetQuestionnaireType")]
    public async Task<IEnumerable<QuestionnaireType>> GetQuestionnaireType()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }

    [HttpGet]
    [Route("Create")]
    public async Task<QuestionnaireType> Create()
    {
        var result = await Task.Run(() =>
        {
            return System.Activator.CreateInstance<QuestionnaireType>();
        });

        return result;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(QuestionnaireType item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return result;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit(QuestionnaireType item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

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
}