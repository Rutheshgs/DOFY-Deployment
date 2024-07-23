import { IAppointmentModel } from "../../../models/Appointment.Model";
import { ISellOrderModel } from "../../../models/order/sell/SellOrder.Model";
import { IGetOrderListModel } from "../../../models/order/sell/GetOrderList.Model";
import { ISellGetOrderListModel } from "../../../models/SellGetOrderList.Model";
import http from "../../http-common";
import { isTokenExpired } from '../../../components/helper/TokenHelper';

class SellOrderServices {
    private serviceName = '/Sell';

    Create(data: ISellOrderModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/create`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    Edit(data: ISellOrderModel) {
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

    GetOrderList(data: ISellGetOrderListModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/getOrderList`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetOrderSummary(id: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/getOrderSummary/${id}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    ReEvaluteOrder(id: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/ReEvaluteOrder/${id}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    Reschedule(data: IAppointmentModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/Reschedule`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    CreateAppointment(data: IAppointmentModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/CreateAppointment`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    CancelOrderRequest(data: ISellOrderModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/CancelOrderRequest`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetPersonOrders(data: IGetOrderListModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/GetPersonOrders`, data).catch((err: Error) => {
            throw err?.message
        })
    }

    UpdateReferalCode(referralCode: any, orderId: number) {
        isTokenExpired();
        return http.post(`${this.serviceName}/UpdateReferalCode?code=${referralCode}&orderId=${orderId}`).catch((err: Error) => {
            throw err?.message
        })
    }

    downloadInvoice(orderId: number) {
        isTokenExpired();
        return http.get(`/Report/GetInvoicereportByte/${orderId}`).catch((err: Error) => {
            throw err?.message;
        })

    }
}

export default new SellOrderServices();