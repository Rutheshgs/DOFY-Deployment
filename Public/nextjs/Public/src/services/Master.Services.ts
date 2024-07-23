import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';
import { findedLocation, properHeader } from "@/components/helper/Helper";

class MasterServices {
    private serviceName = '/master';

    getProductTypeById(Id: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/getProductTypebyId/${Id}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllProductType(serviceTypeId: number, LanguageCode: any, CountryCode: any) {
        isTokenExpired();
        return http.get(`/master/GetAllProductType?serviceTypeId=${serviceTypeId}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetBrandMasterByProductId(ProductTypeId: number, serviceTypeId: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetBrandMasterByProductId/${ProductTypeId}/${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetBrandMasterByProductName(ProductTypeName: string, serviceTypeId: number, LanguageCode: any, CountryCode: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetBrandMasterByProductName/${ProductTypeName}/${serviceTypeId}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }
        ).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllBrandMaster(data: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAllBrandMaster`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    // GetBrandSeriesByBrandMasterId(BrandMasterId: number, serviceTypeId: number) {
    //     return http.get(`${this.serviceName}/GetBrandSeriesByBrandMasterId/${BrandMasterId}/${serviceTypeId}`).catch((err) => {
    //         throw err.response
    //     })
    // }

    GetSeriesModelByBrandMasterId(BrandMasterId: number, serviceTypeId: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetSeriesModelByBrandMasterId/${BrandMasterId}/${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetSeriesModelByBrandMasterName(ProductTypeName: string, BrandMasterName: string, serviceTypeId: number, LanguageCode: any, CountryCode: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetSeriesModelByBrandMasterName/${ProductTypeName}/${BrandMasterName}/${serviceTypeId}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllBrandSeries(data: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAllBrandSeries`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    // GetSeriesModelByBrandSeriesId(BrandSeriesId: number, serviceTypeId: number) {
    //     return http.get(`${this.serviceName}/GetSeriesModelByBrandSeriesId/${BrandSeriesId}/${serviceTypeId}`).catch((err) => {
    //         throw err.response
    //     })
    // }

    GetModelVariantBySeriesModelId(SeriesModelId: number, serviceTypeId: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetModelVariantBySeriesModelId/${SeriesModelId}/${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetModelVariantBySeriesModelName(SeriesModelId: string, serviceTypeId: number, LanguageCode: any, CountryCode: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetModelVariantBySeriesModelName/${SeriesModelId}/${serviceTypeId}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllModelVariant(data: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAllModelVariant`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetColourBySeriesModelId(seriesModelId: any, serviceTypeId: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetColorsBySeriesModelId/${seriesModelId}/${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllSeriesModelColor(data: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAllSeriesModelColor`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllCancellationType(serviceTypeId: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAllCancellationType?serviceTypeId=${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllDofyGeo(serviceTypeId: number, LanguageCode: any, CountryCode: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAllDofyGeo?serviceTypeId=${serviceTypeId}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetRepairTypesForSeries(seriesId: any, serviceTypeId: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetRepairTypesForSeries/${seriesId}/${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllRepairType(serviceTypeId: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAllRepairType?serviceTypeId=${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }


    GetAllAddressType(serviceTypeId: number, LanguageCode: any, CountryCode: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAllAddressType?serviceTypeId=${serviceTypeId}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllStateList(serviceTypeId: number, LanguageCode: any, CountryCode: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetStateList?serviceTypeId=${serviceTypeId}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetALLCountryList(serviceTypeId: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetCountryList?serviceTypeId=${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllRescheduledType(serviceTypeId: any) {
        return http.get(`${this.serviceName}/GetAllRescheduledType`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetStateList(serviceTypeId: any) {
        return http.get(`${this.serviceName}/GetStateList?serviceTypeId=${serviceTypeId}`, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate"
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetDistrictList(serviceTypeId: any) {
        return http.get(`${this.serviceName}/GetDistrictList?serviceTypeId=${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }
    GetCityList(serviceTypeId: any, LanguageCode: any, CountryCode: any) {
        return http.get(`${this.serviceName}/GetCityList?serviceTypeId=${serviceTypeId}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }
    GetAreaList(serviceTypeId: any, cityId: any) {
        return http.get(`${this.serviceName}/GetAreaList?serviceTypeId=${serviceTypeId}&cityId=${cityId}`).catch((err: Error) => {
            throw err?.message;
        })
    }


    GetAllStatus(serviceTypeId: any) {
        return http.get(`${this.serviceName}/GetAllStatus?serviceTypeId=${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllSeriesModel(serviceTypeId: any, LanguageCode: any, CountryCode: any) {
        return http.get(`${this.serviceName}/GetAllSeriesModel?serviceTypeId=${serviceTypeId}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAppUpdate() {
        return http.get(`${this.serviceName}/GetAppUpdate`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllDofyGeoBysearch(serviceTypeId: any, stateId: any, searchText: any, LanguageCode: any, CountryCode: any) {
        return http.get(`${this.serviceName}/GetAllDofyGeoBysearch?serviceTypeId=${serviceTypeId}&stateId=${stateId}&searchText=${searchText}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllSeriesModelBysearch(searchText: any, LanguageCode: any, CountryCode: any) {
        return http.get(`${this.serviceName}/GetAllSeriesModelBysearch?searchText=${searchText}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

}

export default new MasterServices();