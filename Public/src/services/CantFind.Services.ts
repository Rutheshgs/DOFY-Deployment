import { IFindYourDeviceModel, IFindLocation } from "../models/PublicRequest.Model";
import http from "./http-common";
type ControllerName = "PublicRequest";

type ModelName = 'LocationRequest' | 'DeviceRequest';

class CantFindServices {

    private serviceName = '/PublicRequest';

    createDeviceRequest(data: IFindYourDeviceModel) {
        return http.post(`${this.serviceName}/DeviceRequest`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    createLocationRequest(data: IFindLocation) {
        return http.post(`${this.serviceName}/LocationRequest`, data).catch((err: Error) => {
            throw err?.message;
        })
    }
}

export default new CantFindServices();