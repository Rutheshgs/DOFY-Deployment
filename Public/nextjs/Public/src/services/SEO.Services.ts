import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';
import { properHeader } from "@/components/helper/Helper";

class SEOServices {
    private serviceName = '/SEO';

    GetSEOList(pageName: string, LanguageCode: any, CountryCode: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetSEOList/${pageName}`, {
            headers: {
                "LanguageCode": properHeader(LanguageCode, "LanguageCode"),
                "CountryCode": properHeader(CountryCode, "CountryCode")
            }
        }).catch((err: Error) => {
            throw err?.message
        })
    }
}

export default new SEOServices();