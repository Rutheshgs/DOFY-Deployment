namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class QuestionnaireResponsesModel : BaseModel<DBO.QuestionnaireResponses>, IEntityModel<ViewEntities.QuestionnaireResponses>
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal principal;
    private readonly CountryContext context;

    public QuestionnaireResponsesModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.principal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.QuestionnaireResponses Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.QuestionnaireResponses, ViewEntities.QuestionnaireResponses>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.QuestionnaireResponses> GetList()
    {
        var result = this.FindItems(item => item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.QuestionnaireResponses>, IEnumerable<ViewEntities.QuestionnaireResponses>>(result);

            return mapperResult;
        }

        return default;
    }

    public long Post(ViewEntities.QuestionnaireResponses item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Post(ViewEntities.QuestionnaireResponses item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.QuestionnaireResponses, DBO.QuestionnaireResponses>(item);
            mapperResult.Active = true;

            var result = this.AddItem(mapperResult);

            return result;
        }

        return default;
    }

    public long Put(ViewEntities.QuestionnaireResponses item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Put(ViewEntities.QuestionnaireResponses item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.QuestionnaireResponses, DBO.QuestionnaireResponses>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public bool Remove(long id)
    {
        var mapperResult = this.FindById(id);
        if (mapperResult is not null)
        {
            mapperResult.Active = false;
            this.UpdateItem(mapperResult);
            return true;
        }

        return false;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public long AddQuestionnaire(IEnumerable<ViewEntities.QuestionnaireResponses> items, long orderId)
    {
        if (items != null)
        {
            var mapperResults = this.mapper.Map<IEnumerable<ViewEntities.QuestionnaireResponses>, IEnumerable<DBO.QuestionnaireResponses>>(items);

            foreach (var result in mapperResults)
            {
                result.OrderId = orderId;
                result.Version = 0;
                result.Active = true;
                this.AddItem(result);
            }

            return orderId;
        }

        return default;
    }

    public long UpdateQuestionnaire(IEnumerable<ViewEntities.QuestionnaireResponses> items, long orderId)
    {
        if (items?.Count() > 0)
        {
            var version = (this.FindItems(x => x.OrderId == orderId && x.Active == true)?.OrderByDescending(x => x.Version)?.FirstOrDefault()?.Version ?? 0) + 1;

            var mapperResults = this.mapper.Map<IEnumerable<ViewEntities.QuestionnaireResponses>, IEnumerable<DBO.QuestionnaireResponses>>(items);

            foreach (var result in mapperResults)
            {
                result.OrderId = orderId;
                result.Version = version;
                result.Active = true;
                this.AddItem(result);
            }

            return orderId;
        }

        return default;
    }

    public async Task<long> QuestionnaireUpdateAsync(IEnumerable<ViewEntities.QuestionnaireResponses> questionnaireResponses)
    {
        if (questionnaireResponses?.Count()  > 0)
        {
            long orderId = questionnaireResponses?.First()?.OrderId ?? 0;

            var result = this.UpdateQuestionnaire(questionnaireResponses, orderId);

            return await Task.FromResult(result);
        }

        return default;
    }
}
