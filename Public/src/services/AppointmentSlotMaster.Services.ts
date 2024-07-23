import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class AppointmentSlotMasterService {
    private serviceName = '/Appointmentslots';

    getAppointmentSlotList(date: Date) {
        isTokenExpired();
        return http.post(`${this.serviceName}/GetSlotsForDate?date=${date}`).catch((err: Error) => {
            throw err?.message;
        });
    }

    GetAppointmentSlots(date: any, productTypeId: number, serviceTypeId: number, isExpressPickup: boolean, userAddressId: number) {
        isTokenExpired();
        return http.post(`${this.serviceName}/GetAppointmentSlots?date=${date}&productTypeId=${productTypeId}&serviceTypeId=${serviceTypeId}&isExpressPickup=${isExpressPickup}&userAddressId=${userAddressId}`).catch((err: Error) => {
            throw err?.message;
        });
    }

}

export default new AppointmentSlotMasterService();