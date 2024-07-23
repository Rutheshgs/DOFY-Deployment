import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class PersonModel {
    private serviceName = "/personModel"

    GetAssigneeList() {
        isTokenExpired();
        return http.post(`${this.serviceName}/GetAssigneeList`).catch((err: Error) => {
            throw err?.message;
        })
    }

}

export default new PersonModel()