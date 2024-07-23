namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class PartTypeModel : BaseModel<DBO.PartType>, IPartTypeModel, IPublicPartTypeModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public PartTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
       : base(iConfig, iMapper, iPrincipal,GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.PartType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.PartType, ViewEntities.PartType>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.PartType> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.PartType>, IEnumerable<ViewEntities.PartType>>(results);

        return mapperResults;
    }

    public override IEnumerable<DBO.PartType> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.PartType>(DOFYConstants.DataBase.SP_GetPartTypeList, null);

        return results;
    }
}
