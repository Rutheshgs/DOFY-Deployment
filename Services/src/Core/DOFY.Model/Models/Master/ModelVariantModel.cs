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
using System.Security.Claims;
using System.Security.Principal;

public class ModelVariantModel : BaseModel<DBO.ModelVariant>, IModelVariantModel
{
    private readonly IMapper mapper;
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal? iPrincipal;
    private readonly CountryContext context;

    public ModelVariantModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal? iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig.Value.ApplicationConfiguration.MasterDataFromCache;
        this.context = requestContext;
    }

    public ViewEntities.ModelVariant Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.ModelVariant, ViewEntities.ModelVariant>(result);

            return mapperResult;
        }

        return default;
    }

    public ViewEntities.ModelVariant GetModel(long id)
    {
        var result = this.ExecViewResult<ViewEntities.ModelVariant>(DOFYConstants.DataBase.VW_MasterModelVariants, item => item.Id == id)?.FirstOrDefault();

        return result;
    }

    public IEnumerable<ViewEntities.ModelVariant> GetList()
    {
        var result = this.FindItems(item => item.Active == true)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.ModelVariant>, IEnumerable<ViewEntities.ModelVariant>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ModelVariantViewModel> GetModelVariantBySeriesModelId(long seriesModelId, long serviceTypeId)
    {
        var result = this.GetModelVariants(null, seriesModelId, serviceTypeId, null, null);

        return result;
    }

    public IEnumerable<ModelVariantViewModel> GetModelVariantBySeriesModelName(string seriesModelName, long serviceTypeId)
    {
        var result = this.GetModelVariants(null, null, serviceTypeId, null, seriesModelName);

        return result;
    }

    public IEnumerable<ModelVariantViewModel> GetModelVariants(long? brandMasterId, long? seriesModelId, long? serviceTypeId, long? categoryId, string? seriesModelName)
    {
        var param = new
        {
            SeriesModelId = seriesModelId,
            SeriesModelName = seriesModelName,
            ServiceTypeId = serviceTypeId,
            PersonId = this.UserId,
            BrandMasterId = brandMasterId,
            CategoryId = categoryId,
        };

        var result = this.ExecStoredProcedure<ModelVariantViewModel>(DOFYConstants.DataBase.SP_GetModelVariants, param);

        return result;
    }

    public long Post(ViewEntities.ModelVariant item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ModelVariant, DBO.ModelVariant>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Post(ViewEntities.ModelVariant item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ModelVariant, DBO.ModelVariant>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.ModelVariant item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ModelVariant, DBO.ModelVariant>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.ModelVariant item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ModelVariant, DBO.ModelVariant>(item);
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

    public PagedList<ModelVariant> GetModelVariantList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = base.GetPagedSProcResultWithCriteria<ModelVariant>(criteria, DOFYConstants.DataBase.SP_GetModelVariantList, param);

        return results;
    }

    public override IEnumerable<DBO.ModelVariant> GetAllItems()
    {
        var results = this.ExecViewResult<DBO.MasterModelVariant>(DOFYConstants.DataBase.VW_MasterModelVariants, null);

        var modelVariants = this.mapper.Map<IEnumerable<DBO.MasterModelVariant>, IEnumerable<DBO.ModelVariant>>(results);

        DOFYCache<DBO.ModelVariant>.AddUpdateEntities(modelVariants);

        var result = this.UpdateMasterCache(results);

        return modelVariants;
    }

    public IEnumerable<DBO.MasterModelVariant> UpdateCacheModelVariants()
    {
        var results = this.ExecViewResult<DBO.MasterModelVariant>(DOFYConstants.DataBase.VW_MasterModelVariants, null);

        var modelVariants = this.mapper.Map<IEnumerable<DBO.MasterModelVariant>, IEnumerable<DBO.ModelVariant>>(results);

        DOFYCache<DBO.ModelVariant>.AddUpdateEntities(modelVariants);

        var result = this.UpdateMasterCache(results);

        return results;
    }

    public bool UpdateMasterCache(IEnumerable<DBO.MasterModelVariant> items)
    {
        var seriesModels = items?.DistinctBy(x => x.SeriesModelId);

        var seriesModelsResult = this.mapper.Map<IEnumerable<DBO.MasterModelVariant>, IEnumerable<DBO.SeriesModel>>(seriesModels);

        foreach (var seriesModel in seriesModelsResult)
        {
            seriesModel.DisplayInList = items?.Where(x => x.DisplayInList == true)?.Count() > 0 && seriesModel?.DisplayInList == true;
        }

        DOFYCache<DBO.SeriesModel>.AddUpdateEntities(seriesModelsResult);

        var brandSeries = seriesModels?.DistinctBy(x => x.BrandSeriesId);

        var brandSeriesResult = this.mapper.Map<IEnumerable<DBO.MasterModelVariant>, IEnumerable<DBO.BrandSeries>>(brandSeries);

        foreach (var brandSeriesData in brandSeriesResult)
        {
            brandSeriesData.DisplayInList = seriesModelsResult?.Where(x => x.DisplayInList == true)?.Count() > 0 && brandSeriesData?.DisplayInList == true;
        }

        DOFYCache<DBO.BrandSeries>.AddUpdateEntities(brandSeriesResult);

        var brandMasters = brandSeries?.DistinctBy(x => x.BrandMasterId);

        var brandMastersResult = this.mapper.Map<IEnumerable<DBO.MasterModelVariant>, IEnumerable<DBO.BrandMaster>>(brandMasters);

        foreach (var brandMasterData in brandMastersResult)
        {
            brandMasterData.DisplayInList = brandSeriesResult?.Where(x => x.DisplayInList == true)?.Count() > 0 && brandMasterData?.DisplayInList == true;
        }

        DOFYCache<DBO.BrandMaster>.AddUpdateEntities(brandMastersResult);

        var productTypes = brandMasters?.DistinctBy(x => x.ProductTypeId);

        var productTypesResult = this.mapper.Map<IEnumerable<DBO.MasterModelVariant>, IEnumerable<DBO.ProductType>>(productTypes);

        foreach (var productType in productTypesResult)
        {
            productType.DisplayInList = brandMastersResult?.Where(x => x.DisplayInList == true)?.Count() > 0 && productType?.DisplayInList == true;
        }

        DOFYCache<DBO.ProductType>.AddUpdateEntities(productTypesResult);

        return true;
    }

    public long AddOrUpdateItems(SeriesModelViewModel item)
    {
        if (item is not null && item?.Variants?.Count() > 0)
        {
            long seriesModelId = item.Variants.First().SeriesModelId ?? 0;
            var variants = this.FindItems(variant => variant.SeriesModelId == seriesModelId && variant.Active == true);

            foreach (var variant in item.Variants)
            {
                var result = variants?.Where(x => x.Id == variant.Id)?.FirstOrDefault();
                if (result is not null)
                {
                    result.MaximumValue = variant.MaximumValue;
                    result.MinimumValue = variant.MinimumValue;
                    result.ThresholdCategoryId = variant.ThresholdCategoryId;
                    result.ProductCategoryId = variant.ProductCategoryId;
                    result.Active = variant.Active;
                    result.DisplayInList = variant.DisplayInList;
                    result.DisplayForSale = variant.DisplayInList;

                    this.UpdateItem(result);
                }

                // To do Add code to add items in future.
            }
        }

        return default;
    }

    public IEnumerable<SeriesModelViewModel> GetVariantsBySeriesModel(long? brandMasterId, long? seriesModelId, long? serviceTypeId, long? categoryId)
    {
        var result = this.GetModelVariants(brandMasterId, seriesModelId, serviceTypeId, categoryId,null);

        if (result?.Count() > 0)
        {
            var seriesModel = result?.GroupBy(x => x.SeriesModelId).Select(data =>
            {
                return new SeriesModelViewModel()
                {
                    Id = data?.FirstOrDefault()?.SeriesModelId ?? 0,
                    Name = data?.FirstOrDefault()?.SeriesModelName ?? string.Empty,
                    ThumbnailPath = data?.FirstOrDefault()?.ThumbnailPath,
                    Variants = data,
                };
            });

            return seriesModel;
        }

        return default;
    }
}
