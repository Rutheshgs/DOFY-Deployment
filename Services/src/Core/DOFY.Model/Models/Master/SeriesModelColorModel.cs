namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class SeriesModelColorModel : BaseModel<DBO.SeriesModelColors>
{

    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public SeriesModelColorModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper,iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.SeriesModelColors Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.SeriesModelColors, ViewEntities.SeriesModelColors>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.SeriesModelColors> GetList()
    {
        var result = this.FindItems(item => item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.SeriesModelColors>, IEnumerable<ViewEntities.SeriesModelColors>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.SeriesModelColors> GetColorsBySeriesModelId(long seriesModelId)
    {
        var results = this.ExecStoredProcedure<ViewEntities.SeriesModelColors>(DOFYConstants.DataBase.SP_GetSeriesModelColorsList, new { SeriesModelId = seriesModelId });

        return results;
    }

    public PagedList<SeriesModelColors> GetSeriesModelColorsList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = this.GetPagedSProcResultWithCriteria<SeriesModelColors>(criteria, DOFYConstants.DataBase.SP_GetSeriesModelColorsList, param);

        return results;
    }

    public IEnumerable<DBO.SeriesModelColors> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.SeriesModelColors>(DOFYConstants.DataBase.SP_GetSeriesModelColorsList, null);

        return results;
    }
}
