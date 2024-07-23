import http from "./http-common";
import { IRegistrationModel } from "../models/Registration.Model";
import { isTokenExpired } from '../components/helper/TokenHelper';

class PersonServices {
    private serviceName = '/PersonModel';

    create(data: IRegistrationModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/Create`, data).catch((err: Error) => {
            throw err?.message;
        })
    }
    CreateUae(data: IRegistrationModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/CreateUae`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    DeleteUser(personId: number) {
        isTokenExpired();
        return http.post(`${this.serviceName}/DeleteUser/${personId}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    verifyUser(personId: number, password: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/verifyUser/${personId}/${password}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    edit(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/edit`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetUserByPersonId(personId: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetUserByPersonId/${personId}`, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate"
            }
        }).catch((err: Error) => {
            throw err?.message;
        })
    }

    GetBase64ProfileImage(personId: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetBase64ProfileImage?personId=${personId}`).catch((err: Error) => {
            throw err?.message;
        })
    }
}

export default new PersonServices();