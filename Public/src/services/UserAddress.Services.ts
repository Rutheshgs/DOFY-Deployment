import { IAddressModel } from "../models/Address.Model";
import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class UserAddressServices {
    private serviceName = '/UserAddress';

    create(data: IAddressModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/create`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    edit(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/edit`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    remove(id: number) {
        isTokenExpired();
        return http.post(`${this.serviceName}/remove/${id}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetPersonAddress(personId: number) {
        isTokenExpired();
        return http.post(`${this.serviceName}/GetPersonAddress?personId=${personId}`).catch((err: Error) => {
            throw err?.message;
        })
    }
}

export default new UserAddressServices();