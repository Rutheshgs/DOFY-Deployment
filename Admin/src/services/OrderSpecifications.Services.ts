import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class OrderSpecifications {

    private serviceName = '/orderSpecifications';

    SumbitOrderSpecifications(data:any) {
       isTokenExpired();
        return http.post(`${this.serviceName}/SubmitOrderSpecifications`, data).catch((err) => {
            throw err.response
        })
    }

    UpdateOrderSpecifications(data:any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/UpdateOrderSpecifications`, data).catch((err) => {
            throw err.response
        })
    }

    Get(Id: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/Get/${Id}`).catch((err) => {
            throw err.response
        })
    }

    GetSpecificationsByOrderId(orderId: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetSpecificationsByOrderId/${orderId}`).catch((err) => {
            throw err.response
        })
    }
}
export default new OrderSpecifications();