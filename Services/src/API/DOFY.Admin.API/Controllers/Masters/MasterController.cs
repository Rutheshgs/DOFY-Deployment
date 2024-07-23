using DOFY.Model;

namespace DOFY.Admin.API.Controllers;

[Route("v1/master")]
public class MasterController : BaseController<IMasterModel, ServiceType>
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMasterModel masterModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;
    public MasterController(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IMasterModel iMasterModel, CountryContext requestContext) : base(iMasterModel, iConfig, requestContext: requestContext)
    {
        this.config = iConfig;
        this.masterModel = iMasterModel;
        this.mapper = iMapper;
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
    [Route("GetModelVariants/{brandMasterId}/{seriesModelId}/{serviceTypeId}")]
    public async Task<IEnumerable<ModelVariantViewModel>> GetModelVariants(long? brandMasterId, long? seriesModelId, long? serviceTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetModelVariants(brandMasterId, seriesModelId, serviceTypeId);
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
    [Route("GetDocumentTypes")]
    public async Task<IEnumerable<DocumentType>> GetDocumentTypes()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetDocumentTypes();
        });

        return result;
    }

    [HttpGet]
    [Route("GetProductCategory")]
    public async Task<IEnumerable<Category>> GetProductCategory()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetProductCategory();
        });

        return result;
    }

    [HttpGet]
    [Route("GetThresholdCategory")]
    public async Task<IEnumerable<Category>> GetThresholdCategory()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetThresholdCategory();
        });

        return result;
    }

    [HttpGet]
    [Route("GetOSTypebyGadgetId")]
    public async Task<IEnumerable<MasterEntity>> GetOSTypebyGadgetId(long productTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetOSTypebyGadgetId(productTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetCategorybyOSTypeGadgetId")]
    public async Task<IEnumerable<MasterEntity>> GetCategorybyOSTypeGadgetId(long productTypeId, long osTypeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetCategorybyOSTypeGadgetId(productTypeId, osTypeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetRoles")]
    public async Task<IEnumerable<Roles>> GetRoles()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetRoles();
        });

        return result;
    }

    [HttpGet]
    [Route("GetReferalCodes")]
    public async Task<IEnumerable<ReferralCode>> GetReferalCodes()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetReferalCodes();
        });

        return result;
    }

    [HttpGet]
    [Route("UpdateCache")]
    public async Task<bool> UpdateCache()
    {
        MasterEntitiesCache.Init(this.config, this.mapper);

        return true;
    }

    [HttpGet]
    [Route("GetUtmLinks")]
    public async Task<IEnumerable<UTMLinks>> GetUTMLinks()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetUTMLinks();
        });

        return result;
    }
}

