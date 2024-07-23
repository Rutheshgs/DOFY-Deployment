import { IForgetPassword } from "../models/Forgetpassword.Model";
import { IloginModel } from "../models/Login.Model";
import { IOtpVerification } from "../models/OtpVerification.Model";
import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';


class AuthService {
    private serviceName = '/auth';

    Login(data: IloginModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/authenticate/${data.UserName}/${data.PassWord}`).catch((err: Error) => {
            throw err?.message;
        });
    }
    
    emailauthenticate(userName: any,passWord:any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/emailauthenticate/${userName}/${passWord}`).catch((err: Error) => {
            throw err?.message;
        });
    }
    
    SignIn(userName: IForgetPassword) {
        isTokenExpired();
        return http.get(`${this.serviceName}/SignIn/${userName}`).catch((err: Error) => {
            throw err?.message;
        })
    }
    EncryptedPassword(encryptedPassword: IOtpVerification) {
        isTokenExpired();
        return http.get(`${this.serviceName}/DecryptPassword/${encryptedPassword}`).catch((err: Error) => {
            throw err?.message;
        })
    }
    ResetPassword(data: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/ResetPassword`, data).catch((err: Error) => {
            throw err?.message;
        })
    }
    ResendOTP(UserName: any) {
        return http.get(`${this.serviceName}/ResendOTP/${UserName}`).catch((err: Error) => {
            throw err?.message
        });
    }
    
    AdminLogin(data: IloginModel) {
        isTokenExpired();
        return http.post(`${this.serviceName}/AdminLogin/${data.UserName}/${data.PassWord}`).catch((err: Error) => {
            throw err?.message;
        });
    }

}

export default new AuthService();