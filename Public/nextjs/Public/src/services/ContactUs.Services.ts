import http from "./http-common";
import { IContactUsModel } from "../models/ContactUs.Model";
import { isTokenExpired } from '../components/helper/TokenHelper';
import { findedLocation, properHeader } from "@/components/helper/Helper";

class ContactUsServices {
    private serviceName = '/ContactUs';

    create(data: IContactUsModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/SubmitContactUS`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    getAddress(LanguageCode: any, CountryCode: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAddress`, {
            headers: {
                "LanguageCode":properHeader(LanguageCode,"LanguageCode"),
                "CountryCode": properHeader(CountryCode,"CountryCode" )
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }
}

export default new ContactUsServices();