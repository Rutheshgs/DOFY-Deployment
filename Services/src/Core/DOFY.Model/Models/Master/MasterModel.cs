namespace DOFY.Model;

using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using AutoMapper;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.Model.Models;
using DOFY.ViewEntities;
using Microsoft.Extensions.Options;

public class MasterModel : BaseModel<DBO.ServiceType>, IPublicMasterModel, IMasterModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal? principal;
    private readonly CountryContext context;

    public MasterModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal? iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.principal = iPrincipal;
        this.context = requestContext;
    }

    public IEnumerable<ViewEntities.ServiceType> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.ServiceType>, IEnumerable<ViewEntities.ServiceType>>(results);

        return mapperResults;
    }

    public ServiceType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.ServiceType, ViewEntities.ServiceType>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.ProductType> GetProductTypeList(long serviceTypeId)
    {
        var result = new ProductTypeModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }

    public IEnumerable<ViewEntities.BrandMaster> GetBrandMasterList(long serviceTypeId)
    {
        var result = new BrandMasterModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }


    public IEnumerable<ViewEntities.BrandMaster> GetBrandsByProductTypeId(long? productTypeId, long? serviceTypeId)
    {
        var result = new BrandMasterModel(this.config, this.mapper, this.principal, this.context)
                                .GetBrandsByProductTypeId(productTypeId ?? 0);

        return result;
    }

    public IEnumerable<ViewEntities.BrandMaster> GetBrandsByProductTypeName(string? productTypeName, long? serviceTypeId)
    {
        var result = new BrandMasterModel(this.config, this.mapper, this.principal, this.context)
                                .GetBrandsByProductTypeName(productTypeName ?? "");

        return result;
    }

    public IEnumerable<ViewEntities.BrandSeries> GetBrandSeriesList(long serviceTypeId)
    {
        var result = new BrandSeriesModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }

    public IEnumerable<ViewEntities.BrandSeries> GetBrandSeriesByBrandMasterId(long? brandMasterId, long? serviceTypeId)
    {
        var result = new BrandSeriesModel(this.config, this.mapper, this.principal, this.context)
            .GetBrandSeriesByBrandMasterId(brandMasterId ?? 0);

        return result;
    }

    public IEnumerable<ViewEntities.SeriesModel> GetSeriesModelList(long serviceTypeId)
    {
        var result = new SeriesModelModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }
    public IEnumerable<ViewEntities.SeriesModel> GetSeriesModelListBysearch(long serviceTypeId, string searchText)
    {
        var result = new SeriesModelModel(this.config, this.mapper, this.principal, this.context).GetListBysearch(searchText);

        return result;
    }

    public IEnumerable<ViewEntities.SeriesModel> GetSeriesModelByBrandMasterId(long? brandMasterId, long? serviceTypeId)
    {
        var result = new SeriesModelModel(this.config, this.mapper, this.principal, this.context).GetSeriesModelByBrandMasterId(brandMasterId ?? 0);

        return result;
    }

    public IEnumerable<ViewEntities.SeriesModel> GetSeriesModelByBrandMasterName(string? productTypeName, string? brandMasterName, long? serviceTypeId)
    {
        var result = new SeriesModelModel(this.config, this.mapper, this.principal, this.context).GetSeriesModelByBrandMasterName(productTypeName ?? "", brandMasterName ?? "");

        return result;
    }

    public IEnumerable<ViewEntities.ModelVariant> GetModelVariantList(long serviceTypeId)
    {
        var result = new ModelVariantModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }

    public IEnumerable<ModelVariantViewModel> GetModelVariantBySeriesModelId(long? seriesModelId, long? serviceTypeId)
    {
        var result = new ModelVariantModel(this.config, this.mapper, this.principal, this.context)
                                                        .GetModelVariantBySeriesModelId(seriesModelId ?? 0, serviceTypeId ?? 0);

        return result;
    }

    public IEnumerable<ModelVariantViewModel> GetModelVariantBySeriesModelName(string? seriesModelName, long? serviceTypeId)
    {
        var result = new ModelVariantModel(this.config, this.mapper, this.principal, this.context)
                                                        .GetModelVariantBySeriesModelName(seriesModelName ?? "", serviceTypeId ?? 0);

        return result;
    }

    public IEnumerable<ModelVariantViewModel> GetModelVariants(long? brandMasterId, long? seriesModelId, long? serviceTypeId)
    {
        var result = new ModelVariantModel(this.config, this.mapper, this.principal, this.context)
                                                        .GetModelVariants(brandMasterId ?? 0, seriesModelId ?? 0, serviceTypeId ?? 0, null, null);

        return result;
    }

    public IEnumerable<ViewEntities.SeriesModelColors> GetSeriesModelColorList(long serviceTypeId)
    {
        var result = new SeriesModelColorModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }

    public IEnumerable<ViewEntities.SeriesModelColors> GetColorsBySeriesModelId(long? seriesModelId, long? serviceTypeId)
    {
        var result = new SeriesModelColorModel(this.config, this.mapper, this.principal, this.context).GetColorsBySeriesModelId(seriesModelId ?? 0);

        return result;
    }

    public IEnumerable<ViewEntities.RepairType> GetRepairTypeList(long serviceTypeId)
    {
        var result = new RepairTypeModel(this.config, this.mapper, this.principal, this.context).GetRepairTypeList();

        return result;
    }

    public IEnumerable<ViewEntities.RepairType> GetRepairTypesForSeries(long? seriesModelColorId, long? serviceTypeId)
    {
        var result = new RepairTypeModel(this.config, this.mapper, this.principal, this.context).GetAllRepairTypes(seriesModelColorId ?? 0);

        return result;
    }

    public IEnumerable<ViewEntities.CancellationType> GetCancellationTypeList(long serviceTypeId)
    {
        var result = new CancellationTypeModel(this.config, this.mapper, this.principal, this.context).GetCancellationTypes();

        return result;
    }

    public IEnumerable<ViewEntities.CancellationType> GetFailureTypeList(long serviceTypeId)
    {
        var result = new CancellationTypeModel(this.config, this.mapper, this.principal, this.context).GetFailureTypes();

        return result;
    }

    public IEnumerable<ViewEntities.Status> GetStatusList(long serviceTypeId)
    {
        var result = new StatusModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }

    public IEnumerable<ViewEntities.Status> GetStatusToDisplay(long serviceTypeId)
    {
        var result = new StatusModel(this.config, this.mapper, this.principal, this.context).GetStatusToDisplayList();

        return result;
    }

    public IEnumerable<ViewEntities.AddressType> GetAddressTypeList(long serviceTypeId)
    {
        var result = new AddressTypeModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }

    public IEnumerable<ViewEntities.DocumentType> GetDocumentTypeList(long serviceTypeId)
    {
        var result = new DocumentTypeModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }

    public IEnumerable<ViewEntities.PaymentType> GetPaymentTypeList(long serviceTypeId)
    {
        var result = new PaymentTypeModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }

    public IEnumerable<ViewEntities.DofyGeo> GetDofyGeoList(long serviceTypeId)
    {
        var result = new DofyGeoModel(this.config, this.mapper, this.principal, this.context).GetDofyGeoList();

        return result;
    }

    public IEnumerable<ViewEntities.DofyGeo> GetDofyGeoListBysearch(long serviceTypeId, long stateId, string searchText)
    {
        var result = new DofyGeoModel(this.config, this.mapper, this.principal, this.context).GetDofyGeoListBysearch(stateId, searchText);

        return result;
    }

    public IEnumerable<ViewEntities.DofyGeo> GetStateList(long serviceTypeId)
    {
        var result = new DofyGeoModel(this.config, this.mapper, this.principal, this.context).GetStateList();

        return result;
    }

    public IEnumerable<ViewEntities.DofyGeo> GetDistrictList(long serviceTypeId)
    {
        var result = new DofyGeoModel(this.config, this.mapper, this.principal, this.context).GetDistrictList();

        return result;
    }

    public IEnumerable<ViewEntities.DofyGeo> GetCountryList(long serviceTypeId)
    {
        var result = new DofyGeoModel(this.config, this.mapper, this.principal, this.context).GetCountryList();

        return result;
    }

    public IEnumerable<ViewEntities.DofyGeo> GetCityList(long serviceTypeId)
    {
        var result = new DofyGeoModel(this.config, this.mapper, this.principal, this.context).GetCityList();

        return result;
    }

    public IEnumerable<ViewEntities.DofyGeo> GetAreaList(long serviceTypeId, long cityId)
    {
        var result = new DofyGeoModel(this.config, this.mapper, this.principal, this.context).GetAreaList(serviceTypeId, cityId);

        return result;
    }

    public IEnumerable<ViewEntities.OSType> GetOSTypeList(long serviceTypeId)
    {
        var result = new OSTypeModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }

    public IEnumerable<DocumentType> GetDocumentTypes()
    {
        var result = new DocumentTypeModel(this.config, this.mapper, this.principal, this.context).GetList();

        return result;
    }

    public async Task<IEnumerable<CancellationType>> GetAllRescheduledType(long serviceTypeId)
    {
        var result = new CancellationTypeModel(this.config, this.mapper, this.principal, this.context).GetAllRescheduledItems();

        return await Task.FromResult(result);
    }

    public IEnumerable<Category> GetProductCategory()
    {
        var result = new CategoryModel(this.config, this.mapper, this.principal, this.context).GetProductValueCategories();

        return result;
    }

    public IEnumerable<Category> GetThresholdCategory()
    {
        var result = new CategoryModel(this.config, this.mapper, this.principal, this.context).GetThresholdCategories();

        return result;
    }

    public IEnumerable<MasterEntity> GetOSTypebyGadgetId(long productTypeId)
    {
        var results = this.ExecStoredProcedure<ViewEntities.MasterEntity>(DOFYConstants.DataBase.SP_GetOSTypebyGadgetId, new { ProductTypeId = productTypeId });

        return results;
    }

    public IEnumerable<MasterEntity> GetCategorybyOSTypeGadgetId(long productTypeId, long osTypeId)
    {
        var results = this.ExecStoredProcedure<ViewEntities.MasterEntity>(DOFYConstants.DataBase.SP_GetCategorybyOSTypeGadgetId, new { ProductTypeId = productTypeId, OSTypeId = osTypeId });

        return results;
    }

    public IEnumerable<Roles> GetRoles()
    {
        IEnumerable<Roles> roles = new RolesModel(this.config, this.mapper, this.principal, this.context).GetList();

        return roles;
    }

    public IEnumerable<ReferralCode> GetReferalCodes()
    {
        IEnumerable<ReferralCode> roles = new ReferralCodeModel(this.config, this.mapper, this.principal, this.context).GetList();

        return roles;
    }


    public IEnumerable<UTMLinks> GetUTMLinks()
    {
        var result = new UTMLinksModel(this.config, this.mapper, this.principal, this.context).FindItems(x => x.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.UTMLinks>, IEnumerable<ViewEntities.UTMLinks>>(result);

            return mapperResult;
        }

        return default;
    }

    Task<AppUpdate> IPublicMasterModel.GetAppUpdate()
    {
        var result = new AppUpdateModel(this.config, this.mapper, this.principal).FindItems(x => x.Active == true)?.FirstOrDefault();

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.AppUpdate, ViewEntities.AppUpdate>(result);

            return Task.FromResult(mapperResult);
        }

        return default;
    }
}
