import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class QuestionnaireTemplateServices{
    private serviceName = '/questionnaireTemplate';

    GetQuestionaireTemplateByVariant(variantId:number){
        isTokenExpired();
        return http.post(`${this.serviceName}/GetQuestionaireTemplateByVariant/${variantId}`).catch((err: Error)=>{
            throw err?.message;
        })
    }

    SubmitOrUpdateTemplate(data:any){
        isTokenExpired();
        return http.post(`${this.serviceName}/SubmitOrUpdateTemplate`,data).catch((err: Error)=>{
            throw err?.message;
        })
    }

    GetQuestionaireTemplateByCategory(productTypeId:any,osTypeId:any,categoryId:any){
        isTokenExpired();
        return http.post(`${this.serviceName}/GetQuestionaireTemplateByCategory/${productTypeId}/${osTypeId}/${categoryId}`).catch((err:Error)=>{
            throw err?.message;
        })
    }

}

export default new QuestionnaireTemplateServices();