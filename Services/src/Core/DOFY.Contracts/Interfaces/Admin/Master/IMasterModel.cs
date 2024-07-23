namespace DOFY.Contracts;

using DataTables.AspNet.Core;
using DOFY.Helper;
using DOFY.ViewEntities;

public interface IMasterModel : IBaseModel<ServiceType>
{
    /// <summary>
    /// Get ServiceType list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in ServiceType creation.</returns>
    IEnumerable<ServiceType> GetList();

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in BrandMaster creation.</returns>
    IEnumerable<BrandMaster> GetBrandMasterList(long serviceTypeId);

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <param name="productTypeId">request.</param>
    /// <returns>List in BrandMaster creation.</returns>
    IEnumerable<BrandMaster> GetBrandsByProductTypeId(long? productTypeId, long? serviceTypeId);

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in BrandSeries creation.</returns>
    IEnumerable<BrandSeries> GetBrandSeriesList(long serviceTypeId);

    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <param name="brandMasterId">request.</param>
    /// <returns>List in BrandSeries creation.</returns>
    IEnumerable<BrandSeries> GetBrandSeriesByBrandMasterId(long? brandMasterId, long? serviceTypeId);

    /// <summary>
    /// Get ModelVariant list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in ModelVariant creation.</returns>
    IEnumerable<ModelVariant> GetModelVariantList(long serviceTypeId);

    /// <summary>
    /// Get ModelVariant list.
    /// </summary>
    /// <param name="seriesModelId">request.</param>
    /// <returns>List in ModelVariant creation.</returns>
    IEnumerable<ModelVariantViewModel> GetModelVariantBySeriesModelId(long? seriesModelId, long? serviceTypeId);

    /// <summary>
    /// Get ModelVariant list.
    /// </summary>
    /// <param name="brandMasterId">brandMasterId.</param>
    /// <param name="seriesModelId">request.</param>
    /// <returns>List in ModelVariant creation.</returns>
    IEnumerable<ModelVariantViewModel> GetModelVariants(long? brandMasterId, long? seriesModelId, long? serviceTypeId);

    /// <summary>
    /// Get SeriesModel list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in SeriesModel creation.</returns>
    IEnumerable<SeriesModel> GetSeriesModelList(long serviceTypeId);

    /// <summary>
    /// Get SeriesModel list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in SeriesModel creation.</returns>
    IEnumerable<SeriesModel> GetSeriesModelListBysearch(long serviceTypeId, string searchText);

    /// <summary>
    /// Get SeriesModel list.
    /// </summary>
    /// <param name="brandSeriesId">request.</param>
    /// <returns>List in SeriesModel creation.</returns>
    IEnumerable<SeriesModel> GetSeriesModelByBrandMasterId(long? brandMasterId, long? serviceTypeId);

    /// <summary>
    /// Get SeriesModelColors list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in SeriesModelColors creation.</returns>
    IEnumerable<SeriesModelColors> GetSeriesModelColorList(long serviceTypeId);

    /// <summary>
    /// Get SeriesModelColors list.
    /// </summary>
    /// <param name="seriesModelId">request.</param>
    /// <returns>List in SeriesModelColors creation.</returns>
    IEnumerable<SeriesModelColors> GetColorsBySeriesModelId(long? seriesModelId, long? serviceTypeId);

    /// <summary>
    /// Get AddressType list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in AddressType creation.</returns>
    IEnumerable<RepairType> GetRepairTypeList(long serviceTypeId);

    /// <summary>
    /// Get RepairType list.
    /// </summary>
    /// <param name="seriesModelColorId">request.</param>
    /// <returns>List in RepairType creation.</returns>
    IEnumerable<RepairType> GetRepairTypesForSeries(long? seriesModelColorId, long? serviceTypeId);

    /// <summary>
    /// Get CancellationType list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in CancellationType creation.</returns>
    IEnumerable<CancellationType> GetCancellationTypeList(long serviceTypeId);

    /// <summary>
    /// Get CancellationType list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in FailureType creation.</returns>
    IEnumerable<CancellationType> GetFailureTypeList(long serviceTypeId);

    /// <summary>
    /// Get ProductType list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in ProductType creation.</returns>
    IEnumerable<ProductType> GetProductTypeList(long serviceTypeId);

    /// <summary>
    /// Get AddressType list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in AddressType creation.</returns>
    IEnumerable<AddressType> GetAddressTypeList(long serviceTypeId);

    /// <summary>
    /// Get DofyGeo list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in DofyGeo creation.</returns>
    IEnumerable<DofyGeo> GetDofyGeoList(long serviceTypeId);

    /// <summary>
    /// Get DofyGeo list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <param name="stateId">state id.</param>
    /// <param name="searchText"> search text.</param>
    /// <returns>List in DofyGeo creation.</returns>
    IEnumerable<DofyGeo> GetDofyGeoListBysearch(long serviceTypeId, long stateId, string searchText);

    /// <summary>
    /// Get DofyGeo list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in DofyGeo creation.</returns>
    IEnumerable<DofyGeo> GetStateList(long serviceTypeId);

    /// <summary>
    /// Get DofyGeo list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in DofyGeo creation.</returns>
    IEnumerable<DofyGeo> GetDistrictList(long serviceTypeId);

    /// <summary>
    /// Get DofyGeo list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in DofyGeo creation.</returns>
    IEnumerable<DofyGeo> GetCountryList(long serviceTypeId);

    /// <summary>
    /// Get Status list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in Status creation.</returns>
    IEnumerable<Status> GetStatusList(long serviceTypeId);

    /// <summary>
    /// Get Status list.
    /// </summary>
    /// <param name="serviceTypeId">request.</param>
    /// <returns>List in Status creation.</returns>
    IEnumerable<Status> GetStatusToDisplay(long serviceTypeId);

    /// <summary>
    /// Get Status list.
    /// </summary>
    /// <returns>List in Document types.</returns>
    IEnumerable<DocumentType> GetDocumentTypes();

    /// <summary>
    /// Get Status list.
    /// </summary>
    /// <returns>List in Document types.</returns>
    IEnumerable<Category> GetProductCategory();

    /// <summary>
    /// Get Status list.
    /// </summary>
    /// <returns>List in Document types.</returns>
    IEnumerable<Category> GetThresholdCategory();

    /// <summary>
    /// Get Status list.
    /// </summary>
    /// <param name="productTypeId">productTypeId.</param>
    /// <returns>List in Document types.</returns>
    IEnumerable<MasterEntity> GetOSTypebyGadgetId(long productTypeId);

    /// <summary>
    /// Get Status list.
    /// </summary>
    /// <param name="productTypeId">productTypeId.</param>
    /// <param name="osTypeId">osTypeId.</param>
    /// <returns>List in Document types.</returns>
    IEnumerable<MasterEntity> GetCategorybyOSTypeGadgetId(long productTypeId, long osTypeId);

    /// <summary>
    /// Get Roles list.
    /// </summary>
    /// <returns>List in Roles types.</returns>
    IEnumerable<Roles> GetRoles();

    /// <summary>
    /// GetReferralCode.
    /// </summary>
    /// <returns>List in ReferralCode.</returns>
    IEnumerable<ReferralCode> GetReferalCodes();

    /// <summary>
    /// GetUTMLinks.
    /// </summary>
    /// <returns>List in UTMMasters.</returns>
    IEnumerable<UTMLinks> GetUTMLinks();
}