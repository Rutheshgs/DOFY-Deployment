namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class CategoryModel : BaseModel<DBO.Category>, ICategoryModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public CategoryModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
       : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.Category Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Category, ViewEntities.Category>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.Category> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.Category>, IEnumerable<ViewEntities.Category>>(results);

        return mapperResults;
    }

    public IEnumerable<ViewEntities.Category> GetThresholdCategories()
    {
        var results = this.FindItems(item => item.Active == true && item.EntityTypeId == (long)ENTITY_TYPE_ENUM.THRESHOLD_VALUE);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.Category>, IEnumerable<ViewEntities.Category>>(results);

        return mapperResults?.OrderBy(x => x.RowOrder);
    }

    public IEnumerable<ViewEntities.Category> GetProductValueCategories()
    {
        var results = this.FindItems(item => item.Active == true && item.EntityTypeId == (long)ENTITY_TYPE_ENUM.PRODUCT_VALUE);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.Category>, IEnumerable<ViewEntities.Category>>(results);

        return mapperResults?.OrderBy(x => x.RowOrder);
    }
}
