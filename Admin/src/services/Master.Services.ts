import http from "./http-common";
import { isTokenExpired } from "../components/helper/TokenHelper";

class BrandMasterServices {
  private serviceName = "/master";

  GetBrandMasterByProductId(productTypeId: number, serviceTypeId: any) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetBrandMasterByProductId/${productTypeId}/${serviceTypeId}`
      )
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  getAllBrands() {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/getBrandMasterList`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetSeriesModelByBrandMasterId(brandMasterId: number, serviceTypeId: any) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetSeriesModelByBrandMasterId/${brandMasterId}/${serviceTypeId}`
      )
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetAllBrandSeries() {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/GetAllBrandSeries`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetSeriesModelByBrandSeriesId(brandSeriesId: number, serviceTypeId: any) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetSeriesModelByBrandSeriesId/${brandSeriesId}/${serviceTypeId}`
      )
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetAllSeriesModel(serviceTypeId: any) {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/getSeriesModelList/${serviceTypeId}`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetModelVariantBySeriesModelId(seriesModelId: number, ServiceTypeId: number) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetModelVariantBySeriesModelId/${seriesModelId}/${ServiceTypeId}`
      )
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetAllProductType() {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetAllProductType`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetRepairTypesForSeries(seriesId: any, serviceTypeId: number) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetRepairTypesForSeries/${seriesId}/${serviceTypeId}`
      )
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetDocumentTypes() {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetDocumentTypes`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetProductCategory() {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetProductCategory`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetThresholdCategory() {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetThresholdCategory`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetRoles() {
    isTokenExpired();
    return http.get(`${this.serviceName}/GetRoles`).catch((err: Error) => {
      throw err?.message;
    });
  }
  GetOSTypebyGadgetId(data: any) {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetOsTypebyGadgetId?productTypeId=${data}`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetStateList(serviceTypeId: number) {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetStateList?serviceTypeId=${serviceTypeId}`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetDistrictList(serviceTypeId: any) {
    return http
      .get(`${this.serviceName}/GetDistrictList?serviceTypeId=${serviceTypeId}`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetCategorybyOSTypeGadgetId(productTypeId: any, osTypeId: number) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetCategorybyOSTypeGadgetId?productTypeId=${productTypeId}&osTypeId=${osTypeId}`
      )
      .catch((err: Error) => {
        throw err?.message;
      });
  }
  GetAllStatusToDisplay(serviceTypeId: number) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetAllStatusToDisplay?serviceTypeId=${serviceTypeId}`
      )
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetAllFailureType(serviceTypeId: number) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetAllFailureType?serviceTypeId=${serviceTypeId}`
      )
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetAllCancellationType(serviceTypeId: number) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetAllCancellationType?serviceTypeId=${serviceTypeId}`
      )
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetPromoCodes() {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetReferalCodes`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetAreaList(serviceTypeId: any,cityId:any) {
    return http.get(`${this.serviceName}/GetAreaList?serviceTypeId=${serviceTypeId}&cityId=${cityId}`).catch((err: Error) => {
        throw err?.message;
    })
}

  GetAllBrandMaster(serviceTypeId: number) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetAllBrandMaster?serviceTypeId=${serviceTypeId}`
      )
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetBrandSeriesByBrandMasterId(BrandMasterId: number, serviceTypeId: number) {
    isTokenExpired();
    return http
      .get(
        `${this.serviceName}/GetBrandSeriesByBrandMasterId/${BrandMasterId}/${serviceTypeId}`
      )
      .catch((err) => {
        throw err.response;
      });
  }

  GetUTMLinks() {
    isTokenExpired();
    return http.get(`${this.serviceName}/GetUtmLinks`).catch((err: Error) => {
      throw err?.message;
    })
  }
}

export default new BrandMasterServices();
