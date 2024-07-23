import { IAppointmentModel } from "../../../models/Appointment.Model";
import { IRepairOrderModel } from "../../../models/order/repair/RepairOrder.Model";
import { IRepairPersonOrdersModel } from "../../../models/order/repair/RepairPersonOrders.Model";
import http from "../../http-common";
import { isTokenExpired } from '../../../components/helper/TokenHelper';

class RepairOrderServices {
    private serviceName = '/Repair';

    Create(data: IRepairOrderModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/create`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    Edit(data: IRepairOrderModel) {
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

    GetOrderList(data: IRepairOrderModel) {
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

    GetOrderByPersonId(id: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetOrderByPersonId/${id}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    Reschedule(data: IAppointmentModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/Reschedule`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetPersonOrders(data: IRepairPersonOrdersModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/GetPersonOrders`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    CreateAppointment(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/CreateAppointment`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

}

export default new RepairOrderServices();