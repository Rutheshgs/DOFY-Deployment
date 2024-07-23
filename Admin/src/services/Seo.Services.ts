import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';
import { ISeoModel } from '../models/Seo.Model';

class Seo {
    private serviceName = '/sEO';

    Create(data: ISeoModel){
        isTokenExpired();
        return http.post(`${this.serviceName}/Create`, data).catch((err) => {
            throw err.response;
        })
    }

    GetList() {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetList`).catch((err) => {
            throw err.response;
        })
    }

    Edit(data: ISeoModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/Edit`, data).catch((err) => {
            throw err.response;
        })
    }

    EditSEO(Id: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/Edit/${Id}`).catch((err) => {
            throw err.response;
        })
    }

}

export default new Seo();