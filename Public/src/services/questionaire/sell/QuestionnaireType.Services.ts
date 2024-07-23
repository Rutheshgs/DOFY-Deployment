import { IQuestionnaireModel } from "../../../models/Questionnaire.Model";
import http from "../../http-common";
import { isTokenExpired } from '../../../components/helper/TokenHelper';

class QuestionnaireTypeServices {
    private serviceName = '/QuestionnaireTemplate';

    getQuestionnaireTemplate(data: IQuestionnaireModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/getQuestionnaireTemplate`, data).catch((err: Error) => {
            throw err?.message;
        })
    }
}

export default new QuestionnaireTypeServices();