using DOFY.Model;

namespace DOFY.Public.API.Controllers;

[AllowAnonymous]
[Route("v1/master")]
public class MasterController : BaseController<IPublicMasterModel, ServiceType>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicMasterModel masterModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public MasterController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper,
        IPublicMasterModel iMasterModel, CountryContext requestContext)
        : base(iMasterModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.masterModel = iMasterModel;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetAllServiceType")]
    public async Task<IEnumerable<ServiceType>> GetAllServiceType()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetList();
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllBrandMaster")]
    public async Task<IEnumerable<BrandMaster>> GetAllBrandMaster(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandMasterList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetBrandMasterByProductId/{productTypeId}/{serviceTypeId}")]
    public async Task<IEnumerable<BrandMaster>> GetBrandsByProductTypeId(long? productTypeId, long? serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandsByProductTypeId(productTypeId, serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetBrandMasterByProductName/{productTypeName}/{serviceTypeId}")]
    public async Task<IEnumerable<BrandMaster>> GetBrandsByProductTypeName(string? productTypeName, long? serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandsByProductTypeName(productTypeName, serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllBrandSeries")]
    public async Task<IEnumerable<BrandSeries>> GetAllBrandSeriesList(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandSeriesList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetBrandSeriesByBrandMasterId/{brandMasterId}/{serviceTypeId}")]
    public async Task<IEnumerable<BrandSeries>> GetBrandSeriesByBrandMasterId(long? brandMasterId, long? serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetBrandSeriesByBrandMasterId(brandMasterId, serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllModelVariant")]
    public async Task<IEnumerable<ModelVariant>> GetAllModelVariantList(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetModelVariantList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetModelVariantBySeriesModelId/{seriesModelId}/{serviceTypeId}")]
    public async Task<IEnumerable<ModelVariantViewModel>> GetModelVariantBySeriesModelId(long? seriesModelId, long? serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetModelVariantBySeriesModelId(seriesModelId, serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetModelVariantBySeriesModelName/{seriesModelName}/{serviceTypeId}")]
    public async Task<IEnumerable<ModelVariantViewModel>> GetModelVariantBySeriesModelName(string? seriesModelName, long? serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetModelVariantBySeriesModelName(seriesModelName, serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllSeriesModel")]
    public async Task<IEnumerable<SeriesModel>> GetAllSeriesModelList(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetSeriesModelList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllSeriesModelBysearch")]
    public async Task<IEnumerable<SeriesModel>> GetAllSeriesModelListBysearch(long serviceTypeId, string searchText)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetSeriesModelListBysearch(serviceTypeId,searchText);
        });

        return result;
    }

    [HttpGet]
    [Route("GetSeriesModelByBrandMasterId/{brandMasterId}/{serviceTypeId}")]
    public async Task<IEnumerable<SeriesModel>> GetSeriesModelByBrandMasterId(long? brandMasterId, long? serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetSeriesModelByBrandMasterId(brandMasterId, serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetSeriesModelByBrandMasterName/{productTypeName}/{brandMasterName}/{serviceTypeId}")]
    public async Task<IEnumerable<SeriesModel>> GetSeriesModelByBrandMasterName(string? productTypeName, string? brandMasterName, long? serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetSeriesModelByBrandMasterName(productTypeName, brandMasterName, serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllSeriesModelColor")]
    public async Task<IEnumerable<SeriesModelColors>> GetAllSeriesModelColorList(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetSeriesModelColorList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetColorsBySeriesModelId/{seriesModelId}/{serviceTypeId}")]
    public async Task<IEnumerable<SeriesModelColors>> GetColorsBySeriesModelId(long? seriesModelId, long? serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetColorsBySeriesModelId(seriesModelId, serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllRepairType")]
    public async Task<IEnumerable<RepairType>> GetAllRepairType(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetRepairTypeList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetRepairTypesForSeries/{seriesModelColorId}/{serviceTypeId}")]
    public async Task<IEnumerable<RepairType>> GetRepairTypesForSeries(long? seriesModelColorId, long? serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetRepairTypesForSeries(seriesModelColorId, serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllCancellationType")]
    public async Task<IEnumerable<CancellationType>> GetAllCancellationTypeList(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetCancellationTypeList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllFailureType")]
    public async Task<IEnumerable<CancellationType>> GetAllFailureType(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetFailureTypeList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllProductType")]
    public async Task<IEnumerable<ProductType>> GetAllProductTypeList(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetProductTypeList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllAddressType")]
    public async Task<IEnumerable<AddressType>> GetAllAddressType(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAddressTypeList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllDofyGeo")]
    public async Task<IEnumerable<DofyGeo>> GetAllDofyGeo(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetDofyGeoList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllDofyGeoBysearch")]
    public async Task<IEnumerable<DofyGeo>> GetDofyGeoListBysearch(long serviceTypeId, long stateId, string searchText)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetDofyGeoListBysearch(serviceTypeId, stateId, searchText);
        });

        return result;
    }


    [HttpGet]
    [Route("GetAreaList")]
    public async Task<IEnumerable<DofyGeo>> GetAreaList(long serviceTypeId, long cityId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAreaList(serviceTypeId, cityId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetStateList")]
    public async Task<IEnumerable<DofyGeo>> GetStateList(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetStateList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetDistrictList")]
    public async Task<IEnumerable<DofyGeo>> GetDistrictList(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetDistrictList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetCityList")]
    public async Task<IEnumerable<DofyGeo>> GetCityList(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetCityList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetCountryList")]
    public async Task<IEnumerable<DofyGeo>> GetCountryList(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetCountryList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllStatus")]
    public async Task<IEnumerable<Status>> GetAllStatus(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetStatusList(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllStatusToDisplay")]
    public async Task<IEnumerable<Status>> GetAllStatusToDisplay(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetStatusToDisplay(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllRescheduledType")]
    public async Task<IEnumerable<CancellationType>> GetAllRescheduledType(long serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAllRescheduledType(serviceTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("UpdateCache")]
    public async Task<bool> UpdateCache()
    {
        MasterEntitiesCache.Init(this.appConfiguration, this.mapper);

        return true;
    }

    [HttpGet]
    [Route("GetAppUpdate")]
    public async Task<AppUpdate> AppUpdate()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetAppUpdate();
        });

        return result;
    }
}
