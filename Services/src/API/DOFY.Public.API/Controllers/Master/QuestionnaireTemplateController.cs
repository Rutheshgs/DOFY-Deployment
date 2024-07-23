namespace DOFY.Public.API.Controllers;

[AllowAnonymous]
[Route("v1/questionnaireTemplate")]
public class QuestionnaireTemplateController : BaseController<IPublicQuestionnaireTemplateModel, QuestionnaireTemplate>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicQuestionnaireTemplateModel questionnaireTemplateModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public QuestionnaireTemplateController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicQuestionnaireTemplateModel iQuestionnaireTemplateModel, CountryContext requestContext) 
        : base(iQuestionnaireTemplateModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.questionnaireTemplateModel = iQuestionnaireTemplateModel;
        this.requestContext = requestContext;

    }

    [HttpPost]
    [Route("GetQuestionnaireTemplate")]
    public async Task<OrderQuestionnaire> GetQuestionnaireTemplate(QuestionnaireSearchCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetQuestionnaireTemplate(criteria);
        });

        return result;
    }

}
