import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';
import { ICurrency } from "../models/Currency.Model";

class CurrencyConvertorService {
    private serviceName = "/currencyconverter"

    Edit(data: ICurrency) {
        isTokenExpired();
        return http.post(`${this.serviceName}/edit`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    Get() {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetCurrencyConvertor`).catch((err: Error) => {
            throw err?.message;
        })
    }
}

export default new CurrencyConvertorService()