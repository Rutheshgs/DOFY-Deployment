namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts.Interfaces;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;

public class QuestionnaireTemplateModel : BaseModel<DBO.QuestionnaireTemplate>, IQuestionnaireTemplateModel, IPublicQuestionnaireTemplateModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public QuestionnaireTemplateModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper,iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public IEnumerable<QuestionnaireTemplate> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.QuestionnaireTemplate>, IEnumerable<ViewEntities.QuestionnaireTemplate>>(results);

        return mapperResults;
    }

    public OrderQuestionnaire? GetQuestionnaireTemplate(QuestionnaireSearchCriteria criteria)
    {
        var param = new
        {
            ProductTypeId = criteria.ProductTypeId ?? null,
            QuestionnaireTypeId = criteria.QuestionnaireTypeId ?? null,
            OSTypeId = criteria.OSTypeId ?? null,
            ModelVariantId = criteria.ModelVariantId ?? null,
            ParentId = criteria.ParentId ?? null,
        };

        var results = this.ExecStoredProcedureAsync<DBO.Questionnaire>(DOFYConstants.DataBase.SP_GetQuestionnaireTemplate, param)?.Result;

        if (results?.Count() > 0)
        {
            var questions = new DBO.OrderQuestionnaire()
            {
                OrderId = results?.FirstOrDefault()?.OrderId,
                Sections = results,
            };

            var mapperResults = this.mapper.Map<DBO.OrderQuestionnaire, OrderQuestionnaire>(questions);

            return mapperResults;
        }

        return default;
    }

    public QuestionnaireTemplate Get(long id)
    {
        throw new NotImplementedException();
    }

    public override IEnumerable<DBO.QuestionnaireTemplate> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.QuestionnaireTemplate>(DOFYConstants.DataBase.SP_GetQuestionnaireTemplateList, null);

        return results;
    }

    public async Task<bool> SubmitOrUpdateTemplate(IEnumerable<QuestionnaireTemplate> questionnaireTemplates)
    {
        var questionnarieData = questionnaireTemplates?.FirstOrDefault();
        var questionnaire = this.GetQuestionaireTemplateByCategory(questionnarieData?.ProductTypeId ?? 0, questionnarieData?.OSTypeId ?? 0, questionnarieData?.CategoryId ?? 0).Result;

        var questionnaireResult = this.mapper.Map<IEnumerable<ViewEntities.QuestionnaireTemplate>, IEnumerable<DBO.QuestionnaireTemplate>>(questionnaire);
        if (questionnaireTemplates?.Count() > 0 && questionnaireResult?.Count() > 0)
        {
            foreach (var result in questionnaireResult)
            {
                result.Threshold = questionnaireTemplates?.FirstOrDefault(x => x.Identifier == result.Identifier)?.Threshold ?? 0;
                if (result.Id == 0)
                {
                    this.AddItem(result);
                }
                else
                {
                    this.UpdateItem(result);
                }
            }

            return await Task.FromResult(true);
        }

        return default;
    }

    public async Task<IEnumerable<QuestionnaireTemplate>> GetQuestionaireTemplateByVariant(long variantId)
    {
        var param = new
        {
            ModelVariantId = variantId,
        };

        var questionnaireResult = this.ExecStoredProcedure<ViewEntities.QuestionnaireTemplate>(DOFYConstants.DataBase.SP_GetQuestionnaireBasedModelVariantId, param);

        return await Task.FromResult(questionnaireResult);
    }

    public async Task<IEnumerable<QuestionnaireTemplate>> GetQuestionaireTemplateByCategory(long productTypeId, long osTypeId, long categoryId)
    {
        var param = new
        {
            ProductTypeId = productTypeId,
            OSTypeId = osTypeId,
            CategoryId = categoryId,
        };

        var questionnaireResult = this.ExecStoredProcedure<ViewEntities.QuestionnaireTemplate>(DOFYConstants.DataBase.SP_GetQuestionnaireTemplateForThreshold, param);

        return await Task.FromResult(questionnaireResult);
    }
}
