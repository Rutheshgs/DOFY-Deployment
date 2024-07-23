import { IGetOrdersByRiderModel } from "../models/GetOrdersByRider.Model";
import http from "./http-common";
import { isTokenExpired } from "../components/helper/TokenHelper";
import { IOrderOtpView } from "../models/OrderOtpView.Model";

class SellServices {
  private serviceName = "/sell";

  GetOrdersByRider(data: IGetOrdersByRiderModel) {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/GetOrdersByRider`, data)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetDashboardStats(isToday: boolean) {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetDashboardStats?isToday=${isToday}`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  AssignProcess(orderId: any, AssigneeId: any) {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/AssignProcess/${orderId}/${AssigneeId}`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetOrderSummary(Id: any) {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetOrderSummary/${Id}`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetOrderSummaryWithTemplate(Id: any) {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetOrderSummaryWithTemplate/${Id}`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  PagedOrdersList(data: any) {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/PagedOrdersList`, data)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  OrderCompleted(orderId: any) {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/OrderCompleted/${orderId}`)
      .catch((err) => {
        throw err?.message;
      });
  }

  OrderRetrieved(orderId: any) {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/RetrieveOrder/${orderId}`)
      .catch((err) => {
        throw err?.message;
      });
  }

  GetOrderOTP(orderId: any) {
    isTokenExpired();
    return http
      .get(`${this.serviceName}/GetOrderOTP/${orderId}`)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  ValidateOrderOTP(data: IOrderOtpView) {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/ValidateOrderOTP`, data)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  SkipOTP(data: IOrderOtpView) {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/SkipOTP`, data)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  DownloadOrdersList(data: IGetOrdersByRiderModel) {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/DownloadOrdersList`, data)
      .catch((err: Error) => {
        throw err?.message;
      });
  }
}
export default new SellServices();
