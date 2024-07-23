import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class ReferralCodeServices {
    private serviceName = '/ReferralCode';

    GetReferralCode(ReferralCode: any, PersonId: number, orderId: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/GetReferralCode?ReferralCode=${ReferralCode}&PersonId=${PersonId}&orderId=${orderId}`).catch((err: Error) => {
            throw err?.message
        })
    }

    RemoveReferralCode(ReferralCode: any, PersonId: number, orderId: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/RemoveReferralCode?ReferralCode=${ReferralCode}&PersonId=${PersonId}&orderId=${orderId}`).catch((err: Error) => {
            throw err?.message
        })
    }

    RemoveReferralCodeFromOrder(ReferralCode: any, PersonId: number, orderId: any) {
        isTokenExpired();
        return http.post(`${this.serviceName}/RemoveReferralCodeFromOrder?ReferralCode=${ReferralCode}&PersonId=${PersonId}&orderId=${orderId}`).catch((err: Error) => {
            throw err?.message
        })
    }
}

export default new ReferralCodeServices();