import { IGetProductTypeModel } from "../models/GetProductType.Model";
import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class ProductTypeServices {
    private serviceName = '/ProductType';

    getProductTypeById(Id: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/getProductTypebyId/${Id}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    getAllProducts(data: IGetProductTypeModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/GetProductTypeList`, data).catch((err: Error) => {
            throw err?.message;
        })
    }
    UpdateModelVarients(data:any){
        isTokenExpired();
        return http.post(`${this.serviceName}/UpdateModelVarients`,data).catch((err: Error)=>{
            throw err?.message;
        });
    }
    GetList(){
        isTokenExpired();
        return http.get(`${this.serviceName}/GetList`).catch((err: Error)=>{
            throw err?.message;
        });
    }
}

export default new ProductTypeServices();