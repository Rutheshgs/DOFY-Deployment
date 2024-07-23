import http from "./http-common";

class CarousalBannerServices {
    private serviceName = '/CarousalBanner';

    GetCarousalBanner() {
        return http.get(`${this.serviceName}/GetCarousalBanner`).catch((err: Error) => {
            throw err?.message;
        });
    }
}

export default new CarousalBannerServices();