namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class RecomendationItemsModel : BaseModel<DBO.RecomendationItems>, IRecomendationItemsModel, IPublicRecomendationItemsModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public RecomendationItemsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
       : base(iConfig, iMapper,iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.RecomendationItems Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.RecomendationItems, ViewEntities.RecomendationItems>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.RecomendationItems> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.RecomendationItems>, IEnumerable<ViewEntities.RecomendationItems>>(results);

        return mapperResults;
    }

    public override IEnumerable<DBO.RecomendationItems> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.RecomendationItems>(DOFYConstants.DataBase.SP_GetRecomendationItemsList, null);

        return results;
    }
}
