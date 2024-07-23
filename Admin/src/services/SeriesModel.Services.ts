import http from "./http-common";
import { isTokenExpired } from "../components/helper/TokenHelper";
import { ISeriesModel } from "../models/Series.Model";

class SeriesModel {
  private serviceName = "/SeriesModel";

  Create(data: ISeriesModel) {
    isTokenExpired();
    return http.post(`${this.serviceName}/Create`, data).catch((err) => {
      throw err.response;
    });
  }

  Edit(data: ISeriesModel) {
    isTokenExpired();
    return http.post(`${this.serviceName}/Edit`, data).catch((err) => {
      throw err.response;
    });
  }

  View(id: number) {
    isTokenExpired();
    return http.get(`${this.serviceName}/View/${id}`).catch((err) => {
      throw err.response;
    });
  }
  Remove(id: number) {
    isTokenExpired();
    return http.post(`${this.serviceName}/Remove/${id}`).catch((err) => {
      throw err.response;
    });
  }

  GetList() {
    isTokenExpired();
    return http.get(`${this.serviceName}/GetList`).catch((err) => {
      throw err.response;
    });
  }

  GetSeriesModelList(data: any) {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/GetSeriesModelList`, data)
      .catch((err: Error) => {
        throw err?.message;
      });
  }
}
export default new SeriesModel();
