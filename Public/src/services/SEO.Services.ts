import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class SEOServices {
    private serviceName = '/SEO';

    GetSEOList(pageName: string) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetSEOList/${pageName}`).catch((err: Error) => {
            throw err?.message
        })
    }
}

export default new SEOServices();