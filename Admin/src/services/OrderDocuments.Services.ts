import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class OrderDocuments {

    private serviceName = '/OrderDocuments';

    AddOrderDocument(data:any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/AddOrderDocument`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetOrderDocument(orderId:any,documentTypeId:any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetBase64OrderDocument?orderId=${orderId}&documentTypeId=${documentTypeId}`).catch((err) => {
            throw err.response
        })
    }

    DeleteOrderDocument(orderId:any,documentTypeId:any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/DeleteOrderDocument?orderId=${orderId}&documentTypeId=${documentTypeId}`).catch((err) => {
            throw err.response
        })
    }

    GetOrderDocuments(orderId:any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetOrderDocuments?orderId=${orderId}`).catch((err) => {
            throw err.response
        })
    }

}
export default new OrderDocuments();