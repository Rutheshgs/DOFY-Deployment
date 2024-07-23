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
using System.Linq.Expressions;
using System.Security.Principal;

public class SeriesModelModel : BaseModel<DBO.SeriesModel>, ISeriesModelModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public SeriesModelModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.SeriesModel Get(long id)
    {
        var result = this.ExecViewResult<ViewEntities.SeriesModel>(DOFYConstants.DataBase.VW_SeriesModel, item => item.Id == id).FirstOrDefault();

        return result;
    }

    public IEnumerable<ViewEntities.SeriesModel> GetList()
    {
        var result = this.FindItems(item => item.Active == true)?.OrderBy(x => x.DisplayName);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.SeriesModel>, IEnumerable<ViewEntities.SeriesModel>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.SeriesModel> GetListBysearch(string searchText)
    {
        searchText = !string.IsNullOrEmpty(searchText) ? searchText.ToLower() : string.Empty;
        var result = this.FindItems(item => item.Active == true)?.OrderBy(x => x.DisplayName);

        if (result is not null)
        {
            var filteredResult = !string.IsNullOrEmpty(searchText) ? result?.Where(x => x.Name.ToLower().Contains(searchText) || x.BrandMasterName.ToLower().Contains(searchText) ||x.BrandSeriesName.ToLower().Contains(searchText)) : result;
            filteredResult = filteredResult?.Count() > 10 ? filteredResult.Take(10) : filteredResult;
            var mapperResult = this.mapper.Map<IEnumerable<DBO.SeriesModel>, IEnumerable<ViewEntities.SeriesModel>>(filteredResult);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.SeriesModel> GetSeriesModelByBrandSeriesId(long brandSeriesId)
    {
        var result = this.FindItems(item => item.BrandSeriesId == brandSeriesId && item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.SeriesModel>, IEnumerable<ViewEntities.SeriesModel>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.SeriesModel> GetSeriesModelByBrandMasterId(long brandMasterId)
    {
        var results = this.FindItems(x => x.BrandMasterId == brandMasterId && x.Active == true)?.OrderBy(x => x.DisplayName);

        if (results is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.SeriesModel>, IEnumerable<ViewEntities.SeriesModel>>(results);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.SeriesModel> GetSeriesModelByBrandMasterName(string productTypeName, string brandMasterName)
    {
        long productTypeId = new ProductTypeModel(this.config, this.mapper, this.iPrincipal, this.context).FindItem(x => x.EnumName.ToLower() == productTypeName.ToLower() && x.Active == true)?.Id ?? 0;
        long brandMasterId = new BrandMasterModel(this.config, this.mapper, this.iPrincipal, this.context).FindItem(x => x.EnumName.ToLower() == brandMasterName.ToLower() && x.ProductTypeId == productTypeId && x.Active == true)?.Id ?? 0;

        var results = this.FindItems(x => x.BrandMasterId == brandMasterId && x.Active == true)?.OrderBy(x => x.DisplayName);

        if (results is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.SeriesModel>, IEnumerable<ViewEntities.SeriesModel>>(results);

            return mapperResult;
        }

        return default;
    }

    public long Post(ViewEntities.SeriesModel item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var seriesModels = this.FindItems(x => x.ProductTypeId == item.ProductTypeId && x.BrandMasterId == item.BrandMasterId && x.Active == true);
            var existingItem = seriesModels?.Where(x => x.Name?.ToLower() == item.Name?.ToLower());

            if (existingItem?.Count() > 0)
            {
                return -1;
            }
            else
            {
                var mapperResult = this.mapper.Map<ViewEntities.SeriesModel, DBO.SeriesModel>(item);
                mapperResult.BrandSeriesId = seriesModels?.OrderByDescending(x => x.Id).FirstOrDefault()?.BrandSeriesId ?? null;

                this.AddItem(mapperResult);

                return mapperResult.Id;
            }
        }

        return 0;
    }

    public long Post(ViewEntities.SeriesModel item)
    {
        if (item is not null)
        {
            var seriesModels = this.FindItems(x => x.ProductTypeId == item.ProductTypeId && x.BrandMasterId == item.BrandMasterId && x.Active == true);
            var existingItem = seriesModels?.Where(x => x.Name?.ToLower() == item.Name?.ToLower());

            if (existingItem?.Count() > 0)
            {
                return -1;
            }
            else
            {
                var mapperResult = this.mapper.Map<ViewEntities.SeriesModel, DBO.SeriesModel>(item);
                mapperResult.BrandSeriesId = seriesModels?.OrderByDescending(x => x.Id).FirstOrDefault()?.BrandSeriesId ?? null;
                var result = this.AddItem(mapperResult);

                return result;
            }
        }

        return 0;
    }

    public long Put(ViewEntities.SeriesModel item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var seriesModels = this.FindItems(x => x.ProductTypeId == item.ProductTypeId && x.BrandMasterId == item.BrandMasterId && x.Active == true);
            var existingItem = seriesModels?.Where(x => x.Name?.ToLower() == item.Name?.ToLower() && x.Id != item.Id);

            if (existingItem?.Count() > 0)
            {
                return -1;
            }
            else
            {
                var mapperResult = this.mapper.Map<ViewEntities.SeriesModel, DBO.SeriesModel>(item);

                this.UpdateItem(mapperResult);
            }

            return item.Id;
        }

        return item.Id;
    }

    public long Put(ViewEntities.SeriesModel item)
    {
        if (item is not null)
        {
            var seriesModels = this.FindItems(x => x.ProductTypeId == item.ProductTypeId && x.BrandMasterId == item.BrandMasterId && x.Active == true);
            var existingItem = seriesModels?.Where(x => x.Name?.ToLower() == item.Name?.ToLower() && x.Id != item.Id);

            if (existingItem?.Count() > 0)
            {
                return -1;
            }
            else
            {
                var mapperResult = this.mapper.Map<ViewEntities.SeriesModel, DBO.SeriesModel>(item);

                this.UpdateItem(mapperResult);
            }

            return item.Id;
        }

        return item.Id;
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

    public PagedList<SeriesModel> GetSeriesModelList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = base.GetPagedSProcResultWithCriteria<SeriesModel>(criteria, DOFYConstants.DataBase.SP_GetSeriesModelList, param);

        return results;
    }

    public override IEnumerable<DBO.SeriesModel> GetAllItems()
    {
        var result = new ModelVariantModel(this.config, this.mapper, this.iPrincipal, this.context).GetAllItems();

        return this.LoadFromCache ? DOFYCache<DBO.SeriesModel>.GetAllEntities() : this.GetAll();
    }
}
