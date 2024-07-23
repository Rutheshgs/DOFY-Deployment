namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class ApplicationSeedModel : BaseModel<DBO.ApplicationSeed>, IPublicApplicationSeedModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public ApplicationSeedModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.ApplicationSeed Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.ApplicationSeed, ViewEntities.ApplicationSeed>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.ApplicationSeed> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.ApplicationSeed>, IEnumerable<ViewEntities.ApplicationSeed>>(results);

        return mapperResults;
    }

    public string UpdateOrderSeed(long orderId)
    {
        if (orderId > 0)
        {
            var param = new
            {
                Id = orderId,
            };

            var results = this.ExecStoredProcedure<string>(DOFYConstants.DataBase.SP_IncrementSeed, param);

            return results?.FirstOrDefault();
        }

        return default;
    }
}
