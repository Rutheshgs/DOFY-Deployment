namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class OSTypeModel : BaseModel<DBO.OSType>
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public OSTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper,iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.OSType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.OSType, ViewEntities.OSType>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.OSType> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.OSType>, IEnumerable<ViewEntities.OSType>>(results);

        return mapperResults;
    }

    public override IEnumerable<DBO.OSType> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.OSType>(DOFYConstants.DataBase.SP_GetOSTypeList, null);

        return results;
    }
}
