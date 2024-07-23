namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class ServiceTypeModel : BaseModel<DBO.ServiceType>, IServiceTypeModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public ServiceTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper,iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ServiceType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.ServiceType, ViewEntities.ServiceType>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ServiceType> GetList()
    {
        throw new NotImplementedException();
    }

    public PagedList<ServiceType> GetServiceTypeList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = base.GetPagedSProcResultWithCriteria<ServiceType>(criteria, DOFYConstants.DataBase.SP_GetServiceTypeList, param);

        return results;
    }

    public override IEnumerable<DBO.ServiceType> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.ServiceType>(DOFYConstants.DataBase.SP_GetServiceTypeList, null);

        return results;
    }
}
