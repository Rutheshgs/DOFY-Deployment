import { IDownloadModel } from "../models/DownloadApp.Model";
import http from "./http-common";

class DownloadApp {
    private serviceName = '/DownloadApp';

    AppDownload(data: IDownloadModel) {
        return http.post(`${this.serviceName}/AppDownload`, data).catch((err: Error) => {
            throw err?.message;
        });
    }

}

export default new DownloadApp();