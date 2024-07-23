import http from "./http-common";

class DashboardServices {
    private serviceName = '/dashboardElements';

    GetAllDashboardElements() {
        return http.get(`${this.serviceName}/GetAllDashboardElements`).catch((err: Error) => {
            throw err?.message;
        });
    }

    GetHotsellingList() {
        return http.get(`${this.serviceName}/GetHotsellingList`).catch((err: Error) => {
            throw err?.message;
        });
    }

}

export default new DashboardServices();