import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class AppointmentServices {
    private serviceName = '/Appointment';

    create(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/create`, data).catch((err: Error) => {
            throw err?.message;
        })
    }
    edit(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/edit`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    remove(id: number) {
        isTokenExpired();
        return http.post(`${this.serviceName}/remove/${id}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    getList() {
        isTokenExpired();
        return http.get(`${this.serviceName}/getList`).catch((err: Error) => {
            throw err?.message;
        })
    }
}

export default new AppointmentServices();