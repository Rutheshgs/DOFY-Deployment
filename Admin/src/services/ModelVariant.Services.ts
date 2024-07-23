import http from "./http-common";
import { isTokenExpired } from "../components/helper/TokenHelper";

class ModelVariant {
  private serviceName = "/ModelVariant";

  Create(data: any) {
    isTokenExpired();
    return http.post(`${this.serviceName}/Create`, data).catch((err) => {
      throw err.response;
    });
  }

  Edit(data: any) {
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

  GetModelVariantList(data: any) {
    isTokenExpired();
    return http
      .post(`${this.serviceName}/GetModelVariantList`, data)
      .catch((err: Error) => {
        throw err?.message;
      });
  }

  GetModel(id: number) {
    isTokenExpired();
    return http.get(`${this.serviceName}/GetModel/${id}`).catch((err) => {
      throw err.response;
    });
  }
}
export default new ModelVariant();
