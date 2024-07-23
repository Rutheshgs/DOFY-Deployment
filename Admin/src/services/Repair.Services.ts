import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class RepairServices {
    private serviceName = '/repair'
    
    RequoteRepair(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/RequoteRepair`, data).catch((err: Error) => {
            throw err?.message;
        })
    }
}
export default new RepairServices();