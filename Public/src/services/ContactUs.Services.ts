import http from "./http-common";
import { IContactUsModel } from "../models/ContactUs.Model";
import { isTokenExpired } from '../components/helper/TokenHelper';

class ContactUsServices {
    private serviceName = '/ContactUs';

    create(data: IContactUsModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/SubmitContactUS`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    getAddress() {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAddress`).catch((err: Error) => {
            throw err?.message;
        })
    }
}

export default new ContactUsServices();