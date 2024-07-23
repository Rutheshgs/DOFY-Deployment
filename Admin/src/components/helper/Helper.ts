import { isPlatform } from "@ionic/react";
import { ILocalStorageModel } from "../../models/LocalStorage.Model";
import { HelperConstant } from "./HelperConstant";

export const responsiveItemPerView = (mobileView: number, webView: number) => {
    let view: number;
    if (isPlatform('android') || isPlatform('ios')) {
        view = mobileView;
    } else {
        view = webView;
    }

    return view;
}

export const isMobile = () => {
    if (isPlatform("tablet")) {
        return false
    }
    else if (isPlatform('android') || isPlatform('ios')) {
        return true;
    } else {
        return false;
    }
}

export const isTablet = () => {
    if (isPlatform("desktop")) {
        return false
    }
    else if (isPlatform("tablet")) {
        return true;
    } else {
        return false;
    }
}

export const GetLocation = (pathRef: any) => {
    let data = localStorage.getItem('LanguageCode');
    if (data === null || data === undefined || !data) window.location.href = `/${pathRef}`;
}

export const GetHome = (data: any, pathRef: any) => {
    if (data === 0 || data === null || data === undefined || !data) window.location.href = `/${pathRef}`;
}

export const getLocalStorage = () => {
    let token: string = localStorage.getItem("token") as string;
    const item: ILocalStorageModel = {
        Token: token
    };
    return item ? item : {} as ILocalStorageModel;
}

export const getCountryCodeStorage = () => {
    let item: string = localStorage.getItem("CountryCode") as string;
    return item ? item : "in";
}

export const restrictInput = (e: any, maxLength: number) => {
    if (e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
    }
}

export const onKeyDown = (e: any) => {
    // return ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
    // return isNaN(e.key) && e.preventDefault();

    // temporary solution for tablet need to be changes.
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '+', '-', '.', '!', '@', '#', '$', '%',
        '^', '&', '*', '(', ')', '`', '~', '>', '<', ',', '.', '?', '/', '[', ']', '{', '}', '|', '=', '_', '/', '₹', ';', ':', "'", '"'].includes(e.key.toLowerCase()) && e.preventDefault();
}

export const toAmount = (amount: any) => {
    return amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const isValidUser = (token: any) => {
    const loginUser = getLocalStorage().Token;
    const isUser = token?.RoleId;

    if (loginUser === null || (isUser === HelperConstant.Roles.Public.toString())) {
        return window.location.href = "/login";
    }
}

export const isValidUserAuthenticate = (token: any) => {
    const isUser = token?.RoleId;

    let seoRouter = window.location.pathname.includes("SeoDashboard");
    let HomeRouter = window.location.pathname.includes("HomePage");

    if ((isUser === HelperConstant.Roles.SEO.toString() && !seoRouter)) {
        return window.location.href = "/SeoDashboard";
    }
    if ((isUser === HelperConstant.Roles.Rider.toString() && !HomeRouter)) {
        return window.location.href = "/HomePage";
    }

}

export const isValidUserAuthenticateForSeo = (token: any) => {
    const isUser = token?.RoleId;

    let seoRouter = window.location.pathname.includes("SeoDashboard");

    if ((isUser === HelperConstant.Roles.SEO.toString() && !seoRouter)) {
        return window.location.href = "/SeoDashboard";
    }

}

export const isLogginUser = () => {
    const loginUser = getLocalStorage().Token;

    if (loginUser) {
        return window.location.href = "/";
    }
}
export const countrycodenumber = (val: any) => (val ? isIn() ? '+91-' : "+971-" : "");

export const findPostiveNumber = (num: number) => (num < 0) ? "color-danger" : "color-success";

export const changePostiveNumber = (num: number) => (num < 0) ? num * -1 : num;

export const getStatusIds = (statsId: number) => {
    switch (statsId) {
        case 1:
            return null;
        case 2:
            return `${HelperConstant.StatusId.SCHEDULED},${HelperConstant.StatusId.RESCHEDULED}`;
        case 3:
            return `${HelperConstant.StatusId.INPROGRESS},${HelperConstant.StatusId.ASSIGNED},${HelperConstant.StatusId.REQUOTE},${HelperConstant.StatusId.DELAYED}`;
        case 4:
            return HelperConstant.StatusId.COMPLETED;
        case 5:
            return HelperConstant.StatusId.FAILED;
        case 6:
            return HelperConstant.StatusId.CANCEL_REQUEST;
        case 7:
            return HelperConstant.StatusId.CANCELLED;
        case 8:
            return HelperConstant.StatusId.PENDING;
        default:
            return;
    }
}

export const getStatusName = (dashboardName?: number) => {
    switch (dashboardName) {
        case 1:
            return ('All');
        case 2:
            return ('Open');
        case 3:
            return ('In-Progress');
        case 4:
            return ('Completed');
        case 5:
            return ('Failed')
        case 6:
            return ('Cancel Requested')
        case 7:
            return ('Cancelled')
        case 8:
            return ('Pending')
        default:
            return;
    }
}
export const getUserLanguage = (): "in_en" | "ae_en" | "ae_ar" => {
    let in_en = window.location.href.includes('in_en');
    let ae_en = window.location.href.includes('ae_en');
    let ae_ar = window.location.href.includes('ae_ar');
    if (in_en) {
        localStorage.setItem("Ln", 'in_en');
        return "in_en";
    }
    if (ae_en) {
        localStorage.setItem("Ln", 'ae_en');
        return "ae_en";
    }
    if (ae_ar) {
        localStorage.setItem("Ln", 'ae_ar');
        return "ae_ar";
    }
    else {
        localStorage.setItem("Ln", 'in_en');
        return "in_en";
    }
}

export const RTLDirection = () => {
    let htmlElements = document.querySelectorAll('.rtl');
    if (getUserLanguage() == "ae_ar") {
        htmlElements.forEach(element => (
            element?.setAttribute("dir", "rtl")
        ));
    }
    else {
        htmlElements.forEach(element => (
            element?.removeAttribute("dir")
        ));
    }
}

export const Direction = (): "rtl" | "ltr" => {
    if (getUserLanguage() == "ae_ar") {
        return "rtl";
    }
    else {
        return "ltr";
    }
}

export const isRTL = () => {
    if (getUserLanguage() == "ae_ar") {
        return true;
    }
    else {
        return false;
    }
}

export const isIn = () => {
    if (getCountryCodeStorage() == "in") {
        return true;
    }
    else {
        return false;
    }
}

export const currencyByCountry = (amount: any) => {
    if (getCountryCodeStorage() == "in") {
        return `₹ ${amount}`;
    }
    // return `Æ ${amount}`;
    return `${amount} AED`;
}

export const findedLocation = (): { LanguageCode: string, CountryCode: string } => {
    let CountryCode = localStorage.getItem('CountryCode');
    let LanguageCode = localStorage.getItem('LanguageCode');

    if (CountryCode == 'ae' && LanguageCode == "ar") {
        return { LanguageCode: "ar", CountryCode: "ae" }
    }
    if (CountryCode == 'ae' && LanguageCode == "en") {
        return { LanguageCode: "en", CountryCode: "ae" }
    }
    else {
        return { LanguageCode: "en", CountryCode: "in" }
    }
}
