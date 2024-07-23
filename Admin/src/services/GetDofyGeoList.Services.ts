import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class UserAddressServices {
    private serviceName = '/master';

    GetAllDofyGeo(serviceTypeId: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAllDofyGeo?serviceTypeId=${serviceTypeId}`).catch((err: Error) => {
            throw err?.message;
        })
    }
}

export default new UserAddressServices();