namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class CancellationTypeModel : BaseModel<DBO.CancellationType>,ICancellationTypeModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public CancellationTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
       : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.CancellationType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.CancellationType, ViewEntities.CancellationType>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.CancellationType> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.CancellationType>, IEnumerable<ViewEntities.CancellationType>>(results);

        return mapperResults;
    }

    public IEnumerable<ViewEntities.CancellationType> GetCancellationTypes()
    {
        var results = this.FindItems(item => item.Active == true && item.EntityTypeId == (long)ENTITY_TYPE_ENUM.CANCELLATION);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.CancellationType>, IEnumerable<ViewEntities.CancellationType>>(results);

        return mapperResults;
    }

    public IEnumerable<ViewEntities.CancellationType> GetFailureTypes()
    {
        var results = this.FindItems(item => item.Active == true && item.EntityTypeId == (long)ENTITY_TYPE_ENUM.FAILED_ORDERS);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.CancellationType>, IEnumerable<ViewEntities.CancellationType>>(results);

        return mapperResults;
    }

    public override IEnumerable<DBO.CancellationType> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.CancellationType>(DOFYConstants.DataBase.SP_GetCancellationTypeList, null);

        return results;
    }

    public IEnumerable<ViewEntities.CancellationType> GetAllRescheduledItems()
    {
        var results = this.FindItems(item => item.Active == true && item.EntityTypeId == (long)ENTITY_TYPE_ENUM.RESCHEDULED);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.CancellationType>, IEnumerable<ViewEntities.CancellationType>>(results);

        return mapperResults;
    }
}
