import { findedLocation, properHeader } from "@/components/helper/Helper";
import http from "./http-common";
import FindLocation from "@/components/findlocation/FindLocation";

class CarousalBannerServices {
    private serviceName = '/CarousalBanner';

    GetCarousalBanner(LanguageCode: any, CountryCode: any) {
        return http.get(`${this.serviceName}/GetCarousalBanner`, {
            headers: {
                "LanguageCode":properHeader(LanguageCode,"LanguageCode"),
                "CountryCode": properHeader(CountryCode,"CountryCode" )
            }
        }).catch((err: Error) => {
            throw err?.message;
        });
    }
}

export default new CarousalBannerServices();