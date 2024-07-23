import { findedLocation, properHeader } from "@/components/helper/Helper";
import http from "./http-common";

class DashboardServices {
    private serviceName = '/dashboardElements';

    GetAllDashboardElements(LanguageCode: any, CountryCode: any) {
        return http.get(`${this.serviceName}/GetAllDashboardElements`, {
            headers: {
                "LanguageCode":properHeader(LanguageCode,"LanguageCode"),
                "CountryCode": properHeader(CountryCode,"CountryCode" )
            }
        }).catch((err: Error) => {
            throw err?.message;
        });
    }

    GetHotsellingList() {
        return http.get(`${this.serviceName}/GetHotsellingList`).catch((err: Error) => {
            throw err?.message;
        });
    }

}

export default new DashboardServices();