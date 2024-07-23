import { IOrderWishListModel } from "../models/OrderWishList.Model";
import http from "./http-common";
import { isTokenExpired } from '../components/helper/TokenHelper';

class OrderWishListServices {
    getWishListList() {
        throw new Error('Method not implemented.');
      }
    private serviceName ='/OrderWishList';
    
    Create(data: IOrderWishListModel){
        isTokenExpired();
        return http.post(`${this.serviceName}/create`, data).catch((err: Error) => {
            throw err?.message;
        })
    }

    getWishList(personId: number){
        isTokenExpired();
        return http.post(`${this.serviceName}/getWishList/${personId}`).catch((err: Error) => {
            throw err?.message;
        })
    }

    edit(data: IOrderWishListModel){
        isTokenExpired();
        return http.post(`${this.serviceName}/edit`,data).catch((err: Error) =>{
        throw err?.message;
        })
    }
    addOrUpdate(data: IOrderWishListModel){
        isTokenExpired();
        return http.post(`${this.serviceName}/addOrUpdate`, data).catch((err: Error) =>{
            throw err?.message;
        })
    }
}
export default new OrderWishListServices();