
namespace DOFY.Admin.API.Controllers;

[Route("v1/questionnaireTemplate")]
public class QuestionnaireTemplateController : BaseController<IQuestionnaireTemplateModel, QuestionnaireTemplate>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IQuestionnaireTemplateModel questionnaireTemplateModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public QuestionnaireTemplateController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IQuestionnaireTemplateModel iQuestionnaireTemplateModel, CountryContext requestContext)
        : base(iQuestionnaireTemplateModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.questionnaireTemplateModel = iQuestionnaireTemplateModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetAllQuestionnaireTemplate")]
    public async Task<IEnumerable<QuestionnaireTemplate>> GetAllQuestionnaireTemplate()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }

    [HttpPost]
    public async Task<OrderQuestionnaire> GetQuestionnaireTemplate(QuestionnaireSearchCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetQuestionnaireTemplate(criteria);
        });

        return result;
    }

    [HttpPost]
    [Route("SubmitOrUpdateTemplate")]

    public async Task<bool> SubmitOrUpdateTemplate(IEnumerable<ViewEntities.QuestionnaireTemplate> questionnaireTemplates)
    {
        return await this.Contract.SubmitOrUpdateTemplate(questionnaireTemplates);
    }

    [HttpGet]
    [Route("GetQuestionaireTemplateByVariant/{variantId}")]
    public async Task<IEnumerable<QuestionnaireTemplate>> GetQuestionaireTemplateByVariant(long variantId)
    {
        return await this.Contract.GetQuestionaireTemplateByVariant(variantId);
    }

    [HttpPost]
    [Route("GetQuestionaireTemplateByCategory/{productTypeId}/{osTypeId}/{categoryId}")]
    public async Task<IEnumerable<QuestionnaireTemplate>> GetQuestionaireTemplateByCategory(long productTypeId, long osTypeId, long categoryId)
    {
        return await this.Contract.GetQuestionaireTemplateByCategory(productTypeId, osTypeId, categoryId);
    }
}
