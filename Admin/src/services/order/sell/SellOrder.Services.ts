import { IGetOrdersByRiderModel } from "../../../models/GetOrdersByRider.Model";

import { IReportDelayModel } from "../../../models/ReportDelay.Model";

import { IOrderRejectModel } from "../../../models/OrderReject.Model";
import { IRequoteModel } from "../../../models/Requote.Model";

import http from "../../http-common";
import { isTokenExpired } from '../../../components/helper/TokenHelper';
import { IQuestionModel } from "../../../models/QuestionType.Model";
import { IDownloadProductReport } from "../../../models/DownloadProductReport.Model";

class SellOrderServices {
    private serviceName = '/Sell';

    Create(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/create`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    Edit(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/edit`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    Remove(id: number) {
        isTokenExpired();
        return http.post(`${this.serviceName}/remove/${id}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetOrderSummary(id: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/getOrderSummary/${id}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetQuestionaireTemplateByVariant(id: any) {
        isTokenExpired();
        return http.get(`/questionnaireTemplate/GetQuestionaireTemplateByVariant/${id}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    PageOrderList(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/PageOrderList`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetAllOrders(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/getAllOrders`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    CreateAppointment(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/CreateAppointment`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    AdminReschedule(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/AdminReschedule`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    Reschedule(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/Reschedule`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetOrdersByRider(data: IGetOrdersByRiderModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/GetOrdersByRider`, data).catch((err: Error) => {
            throw err?.message;
        })
    }
    RequoteOrder(data: Array<any>) {
        isTokenExpired();
        return http.post(`${this.serviceName}/RequoteOrder`, data).catch((err: Error) => {
            throw err?.message;
        })
    }
    RejectOrder(data: IOrderRejectModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/RejectOrder`, data).catch((err: Error) => {
            throw err?.message;
        })
    }


    ReportDelayOrder(data: IReportDelayModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/ReportDelayOrder`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    CancelOrder(data: IOrderRejectModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/CancelOrder`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    AddAdjustment(orderId: number, amount: number) {
        isTokenExpired();
        return http.post(`${this.serviceName}/AddAdjustment?orderId=${orderId}&amount=${amount}`).catch((err: Error) => {
            throw err?.message
        })
    }

    GetOrderPayout(orderId: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetOrderPayout?orderId=${orderId}`).catch((err: Error) => {
            throw err?.message
        })
    }

    DownloadProductListList(data: IDownloadProductReport) {
        isTokenExpired();
        return http.post(`${this.serviceName}/DownloadProductListList`, data).catch((err: Error) => {
            throw err?.message
        })
    }
}

export default new SellOrderServices();