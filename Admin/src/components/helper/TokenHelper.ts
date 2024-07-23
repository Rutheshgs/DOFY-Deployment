import jwt_decode from 'jwt-decode';
import { ITokenModel } from "../../models/LocalStorage.Model";
import http from "../../services/http-common";
import { HelperConstant } from './HelperConstant';

export const isTokenExpired = () => {
    let token: string = localStorage.getItem("token") as string;
    let result: any;
    if (token) {
        let date: Date = getTokenExpirationDate(token);
        result = (date.valueOf() >= new Date().valueOf());

        if (result === true) {
            return false;
            // let hours = getDifferenceInHours(date.valueOf(), new Date().valueOf());
            // let data = ProcessToken(hours <= 8, token);
            // return hours >= 8 ? false : true;
        }
        else {
            ProcessToken(false, token)
        }
    }
    return false;
}

export const ProcessToken = (isRefresh: boolean, token: any) => {
    if (isRefresh === true) {
        refreshToken(token).then((res: any) => {
            localStorage.setItem("token", JSON.stringify(res.data));
        });
    }
    else {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
}

export const getDecodedAccessToken = (token: string) => {
    try {
        let tokendata: ITokenModel = jwt_decode(token);
        return tokendata;
    }
    catch (Error) {
        return null;
    }
}

export const isRider = () => {
    try {
        let token: string = localStorage.getItem("token") as string;
        let tokendata: ITokenModel = jwt_decode(token);
        return tokendata?.RoleId == HelperConstant.Roles.Rider ? true : false;
    }
    catch (Error) {
        return null;
    }
}

export const isSeo = () => {
    try {
        let token: string = localStorage.getItem("token") as string;
        let tokendata: ITokenModel = jwt_decode(token);
        return tokendata?.RoleId == HelperConstant.Roles.SEO ? true : false;
    }
    catch (Error) {
        return null;
    }
}


export const getPersonId = () => {
    try {
        let token: string = localStorage.getItem("token") as string;
        let tokendata: ITokenModel = jwt_decode(token);
        return tokendata?.PersonId;
    }
    catch (Error) {
        return null;
    }
}

export const getPersonName = () => {
    try {
        let token: string = localStorage.getItem("token") as string;
        let tokendata: ITokenModel = jwt_decode(token);
        return tokendata?.Mobile;
    }
    catch (Error) {
        return null;
    }
}

export const getRoleId = () => {
    try {
        let token: string = localStorage.getItem("token") as string;
        let tokendata: ITokenModel = jwt_decode(token);
        return tokendata?.RoleId;
    }
    catch (Error) {
        return null;
    }
}

function getTokenExpirationDate(token: string): Date {
    let decoded: ITokenModel = jwt_decode(token);
    if (decoded === undefined) return new Date();
    let date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
}

// function getDifferenceInDays(date1: number, date2: number) {
//     const diffInDays = Math.abs(date2 - date1);
//     return diffInDays / (1000 * 60 * 60 * 24);
// }

function refreshToken(token: any) {
    return http.post(`/auth/refreshToken/${token}`).catch((err: Error) => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    });
}