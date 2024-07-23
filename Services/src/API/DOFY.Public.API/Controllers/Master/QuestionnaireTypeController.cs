

namespace DOFY.Public.API.Controllers;

[AllowAnonymous]
[Route("v1/questionnaireType")]
public class QuestionnaireTypeController : BaseController<IPublicQuestionnaireTypeModel, QuestionnaireType>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicQuestionnaireTypeModel questionnaireTypeModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;
    public QuestionnaireTypeController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicQuestionnaireTypeModel iQuestionnaireTypeModel, CountryContext requestContext) 
        : base(iQuestionnaireTypeModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.questionnaireTypeModel = iQuestionnaireTypeModel;
        this.requestContext = requestContext;

    }

    [HttpPost]
    [Route("GetQuestionnaireTypeList")]
    public async Task<PagedList<QuestionnaireType>> PagedQuestionnaireTypeList(SearchBaseCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetQuestionnaireTypeList(criteria);
        });

        return result;
    }

}
