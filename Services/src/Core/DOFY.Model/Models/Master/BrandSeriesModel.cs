namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Cache;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class BrandSeriesModel : BaseModel<DBO.BrandSeries>, IBrandSeriesModel
{

    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public BrandSeriesModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.BrandSeries Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.BrandSeries, ViewEntities.BrandSeries>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.BrandSeries> GetList()
    {
        var result = this.FindItems(item => item.Active == true)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.BrandSeries>, IEnumerable<ViewEntities.BrandSeries>>(result);

            return mapperResult;
        }

        return default;
    }
   
    public IEnumerable<ViewEntities.BrandSeries> GetBrandSeriesById(int BrandMasterId)
    {
        var results = this.FindItems(item => item.BrandMasterId == BrandMasterId && item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.BrandSeries>, IEnumerable<ViewEntities.BrandSeries>>(results);

        return mapperResult;
    }

    public long Post(ViewEntities.BrandSeries item, IFormFileCollection files)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.BrandSeries, DBO.BrandSeries>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.BrandSeries item, IFormFileCollection files)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.BrandSeries, DBO.BrandSeries>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Post(ViewEntities.BrandSeries item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.BrandSeries, DBO.BrandSeries>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.BrandSeries item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.BrandSeries, DBO.BrandSeries>(item);
            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public bool Remove(long id)
    {
        var series = this.FindById(id);

        if (series is not null)
        {
            series.Active = false;
            this.UpdateItem(series);
            return true;
        }

        return false;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<ViewEntities.BrandSeries> GetBrandSeriesByBrandMasterId(long brandMasterId)
    {
        var result = this.FindItems(item => item.BrandMasterId == brandMasterId && item.Active == true)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.BrandSeries>, IEnumerable<ViewEntities.BrandSeries>>(result);

            return mapperResult;
        }

        return default;
    }

    public PagedList<BrandSeries> GetBrandSeriesList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = base.GetPagedSProcResultWithCriteria<BrandSeries>(criteria, DOFYConstants.DataBase.SP_GetBrandSeriesList, param);

        return results;
    }

    public override IEnumerable<DBO.BrandSeries> GetAllItems()
    {
        var result = new ModelVariantModel(this.config, this.mapper, this.iPrincipal, this.context).GetAllItems();

        return this.LoadFromCache ? DOFYCache<DBO.BrandSeries>.GetAllEntities() : this.GetAll();
    }
}
