import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class PersonalDetails {
    private serviceName = '/personModel';

    CreateUser(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/CreateUser`, data).catch((err) => {
            throw err.response;
        })
    }
    edit(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/EditUser`, data).catch((err) => {
            throw err.response;
        })
    }

    remove(id: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/Remove/${id}`).catch((err) => {
            throw err.response;
        })
    }

    getAllPerson() {
        isTokenExpired();
        return http.get(`${this.serviceName}/getAllPerson`).catch((err) => {
            throw err.response;
        })
    }

    getUser(id: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetUser/${id}`).catch((err) => {
            throw err.response;
        })
    }

    getPersonsByRoleId(roleId: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetPersonsByRoleId/${roleId}`).catch((err) => {
            throw err.response;
        })
    }

    getAssigneeDetail(id: number) {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAssigneeDetail/${id}`).catch((err) => {
            throw err.response;
        })
    }

    getAssigneeList() {
        isTokenExpired();
        return http.get(`${this.serviceName}/GetAssigneeDetail`).catch((err) => {
            throw err.response;
        })
    }

    GetBase64ProfileImage(personId:any){
        isTokenExpired();
        return http.get(`${this.serviceName}/GetBase64ProfileImage?personId=${personId}`).catch((err) => {
            throw err.response;
        })
    }

    GetPersonList(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/GetPersonList`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

}

export default new PersonalDetails();