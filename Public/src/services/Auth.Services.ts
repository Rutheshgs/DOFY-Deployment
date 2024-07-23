import { isTokenExpired } from "../components/helper/TokenHelper";
import { IOtpVerification } from "../models/OtpVerification.Model";
import http from "./http-common";

class AuthServices {
    private serviceName = '/auth';

    authenticate(UserName: any, Password: any) {
        return http.post(`${this.serviceName}/authenticate/${UserName}/${Password}`).catch((err: Error) => {
            throw err?.message
        });
    }

    ResetPasswordUae(UserName: any, Password: any) {
        return http.post(`${this.serviceName}/ResetPasswordUae/${UserName}/${Password}`).catch((err: Error) => {
            throw err?.message
        });
    }

    emailauthenticate(UserName: any, Password: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/AuthenticateWithPassword/${UserName}/${Password}`).catch((err: Error) => {
            throw err?.message
        });
    }

    SignIn(UserName: any) {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' },
        };

        return http.get(`${this.serviceName}/SignIn/${UserName}`, requestOptions).catch((err: Error) => {
            throw err?.message
        });
    }

    refreshToken(token: any) {
        return http.post(`${this.serviceName}/refreshToken/${token}`).catch((err: Error) => {
            throw err?.message
        });
    }

    DecryptPassword(EncryptedPassword: any) {
        return http.get(`${this.serviceName}/DecryptPassword/${EncryptedPassword}`).catch((err: Error) => {
            throw err?.message
        });
    }

    ResendOTP(UserName: any) {
        return http.get(`${this.serviceName}/ResendOTP/${UserName}`).catch((err: Error) => {
            throw err?.message
        });
    }

    ForgetPassword(Email: any) {
        isTokenExpired();
        return http.get(`${this.serviceName}/forgetpassword/${Email}`).catch((err: Error) => {
            throw err?.message
        });
    }
}

export default new AuthServices();