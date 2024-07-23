import http from "./http-common";
import { isTokenExpired } from "../components/helper/TokenHelper";
import { IproductValue } from "../models/productvalue.Model";

class ModelVariantsServices {
  private serviceName = "/modelvariant";

  GetVariants(brandMasterId:any,seriesModelId:any,productType:any,categoryId?:any) {
    isTokenExpired();
    return http.get(`${this.serviceName}/GetVariants?brandMasterId=${brandMasterId}&seriesModelId=${seriesModelId}&productTypeId=${productType}&categoryId=${categoryId}`).catch((err: Error) => {
        throw err?.message;
      });
  }

  UpdateModelVarients(data:IproductValue) {
    isTokenExpired();
    return http.post(`${this.serviceName}/UpdateModelVarients`,data).catch((err: Error)=>{
      throw err?.message;
    })
  }

}

export default new ModelVariantsServices();
