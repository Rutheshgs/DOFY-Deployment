namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class QuestionnaireTypeModel : BaseModel<DBO.QuestionnaireType>, IQuestionnaireTypeModel, IPublicQuestionnaireTypeModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public QuestionnaireTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.QuestionnaireType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.QuestionnaireType, ViewEntities.QuestionnaireType>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.QuestionnaireType> GetList()
    {
        var result = this.FindItems(item => item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.QuestionnaireType>, IEnumerable<ViewEntities.QuestionnaireType>>(result);

            return mapperResult;
        }

        return default;
    }

    public long Post(ViewEntities.QuestionnaireType item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.QuestionnaireType, DBO.QuestionnaireType>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.QuestionnaireType item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.QuestionnaireType, DBO.QuestionnaireType>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public bool Remove(long id)
    {
        var QuestionnaireType = this.FindById(id);
        if (QuestionnaireType is not null)
        {
            QuestionnaireType.Active = false;
            this.UpdateItem(QuestionnaireType);

            return true;
        }

        return false;
    }

    public long Post(ViewEntities.QuestionnaireType item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.QuestionnaireType, DBO.QuestionnaireType>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.QuestionnaireType item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.QuestionnaireType, DBO.QuestionnaireType>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public PagedList<ViewEntities.QuestionnaireType> GetPagedList(IDataTablesRequest request)
    {
        throw new NotImplementedException();
    }

    public PagedList<QuestionnaireType> GetQuestionnaireTypeList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = base.GetPagedSProcResultWithCriteria<QuestionnaireType>(criteria, DOFYConstants.DataBase.SP_GetQuestionnaireTypeList, param);

        return results;
    }

    public override IEnumerable<DBO.QuestionnaireType> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.QuestionnaireType>(DOFYConstants.DataBase.SP_GetQuestionnaireTypeList, null);

        return results;
    }
}
