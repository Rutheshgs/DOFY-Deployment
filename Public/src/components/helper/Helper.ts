import { isPlatform } from "@ionic/react";
import { useTypedSelector } from "../../features/reduxhooks/ReduxHooks";
import { ILocalStorageModel } from "../../models/LocalStorage.Model";

export const ResponsiveItemPerView = (mobileView: number, webView: number, tabletView?: number, xlScreen?: number) => {
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);
    let isTablet = useTypedSelector(state => state.FindDevice.isTablet);
    let isXLScreen = useTypedSelector(state => state.FindDevice.isExtraLarge);
    let isDesktop = useTypedSelector(state => state.FindDevice.isDesktop);

    let view: number;

    if (isMobile) {
        view = mobileView;
        return view;
    }
    if (isTablet) {
        view = tabletView ? tabletView : (webView / 2);
        return view;
    }
    if (isDesktop) {
        view = webView;
        return view;
    }

    if (isXLScreen) {
        view = xlScreen ? xlScreen : webView;
        return view;
    }

    return webView;
}

export const IsMobile = () => {
    const isMobile = useTypedSelector(state => state.FindDevice.isMobile);
    if (isMobile) {
        return isMobile
    }
    return false
}

export const isMobilePlatform = () => {
    const isMobilePlatform = isPlatform("android") || isPlatform("ios");
    return isMobilePlatform;
}

export const IsLogginUser = () => {
    const validUser = getLocalStorage().Token;
    if (validUser) {
        return window.location.href = "/";
    }
}

export const authUser = () => {
    const validUser = getLocalStorage().Token;
    if (!validUser) {
        return window.location.href = "/";
    }
}

export const IsTablet = () => {
    if (isPlatform("desktop")) {
        return false
    }
    else if (isPlatform("tablet")) {
        return true;
    } else {
        return false;
    }
}

export const isMobileWeb = () => {
    if (isPlatform("mobileweb")) {
        return true
    }
    else {
        return false;
    }
}

export const GetDefaultHome = (data: any, pathRef: any) => {
    if (data === 0 || data === null || data === undefined || !data) window.location.href = `/${getUserLanguage()}${getUserLocationForParam()}/${pathRef}`;
}

export const GetHome = (data: any) => {
    if (data === 0) window.location.href = `/${getUserLanguage()}${getUserLocationForParam()}`;
}

export const getLocalStorage = () => {
    let token: ILocalStorageModel = JSON.parse(localStorage.getItem("token") as any);
    return token ? token : {} as ILocalStorageModel
}

export const getUserLocation = () => {
    if (getUserLanguage() === "ae_ar") {
        let location = JSON.parse(localStorage.getItem("userLocation_ar") as any);
        return location
    }
    let location = JSON.parse(localStorage.getItem("userLocation") as any);
    return location
}

export const getUserLocationForParam = () => {
    let location: string = JSON.parse(localStorage.getItem("userLocation") as any);
    if (location == null) {
        return ""
    }
    return '/' + location?.replaceAll(' ', '');
}

export const toAmount = (amount: any) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const onKeyDown = (e: any) => {
    // return ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
    // return isNaN(e.key) && e.preventDefault();

    // temporary solution for tablet need to be changes.
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '+', '-', '.', '!', '@', '#', '$', '%',
        '^', '&', '*', '(', ')', '`', '~', '>', '<', ',', '.', '?', '/', '[', ']', '{', '}', '|', '=', '_', '/', '₹', ';', ':', "'", '"'].includes(e.key.toLowerCase()) && e.preventDefault();
}

export const restrictInput = (e: any, maxLength: number) => {
    if (e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
    }
}

export const roundUpNearest10 = (num: number) => {
    return Math.ceil(num / 10) * 10;
}

export const isValidUser = (userId: number) => {
    const loginUser = getLocalStorage().PersonId;
    if (loginUser !== userId) {
        return window.location.href = `/${getUserLanguage()}${getUserLocationForParam()}/home`;
    }
}

export const findPostiveNumber = (num: number) => (num < 0) ? "color-danger" : "color-success";

export function handleKeyEnter(e: any, keyWord: string, length: number, callBack: any) {
    const { key } = e;
    if (key === 'Enter' && keyWord.length === length) callBack();
}

export const getUserLanguage = (): "in_en" | "ae_en" | "ae_ar" => {

    // resetLocation();

    let existingLocation = localStorage.getItem("Ln") as "in_en" | "ae_en" | "ae_ar";
    let in_en = window.location.pathname.split('/')[1].includes('in_en');
    let ae_en = window.location.pathname.split('/')[1].includes('ae_en');
    let ae_ar = window.location.pathname.split('/')[1].includes('ae_ar');

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
    if (existingLocation) {
        return existingLocation;
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

export const findedLocation = (): { LanguageCode: string, CountryCode: string } => {
    if (getUserLanguage() == "ae_ar") {
        return { LanguageCode: "ar", CountryCode: "ae" }
    }
    if (getUserLanguage() == "ae_en") {
        return { LanguageCode: "en", CountryCode: "ae" }
    }
    else {
        return { LanguageCode: "en", CountryCode: "in" }
    }
}

export const isIn = () => {
    if (getUserLanguage() == "in_en") {
        return true;
    }
    else {
        return false;
    }
}

export const resetLocation = () => {
    let currentPath = window.location.pathname.split('/')[1];
    let existingLocation = localStorage.getItem("Ln");

    if (existingLocation && currentPath && (currentPath.slice(0, 2) != existingLocation?.slice(0, 2))) {
        localStorageClearHandler();
    }
}

export const currencyByCountry = (amount: any) => {
    if (getUserLanguage() === "in_en") {
        return `₹ ${amount}`;
    }
    // return `Æ ${amount}`;
    return `${amount} AED`;
}

export const localStorageClearHandler = () => {
    let existingPermission = localStorage.getItem('permission') as string;
    let existingLocation = localStorage.getItem("Ln") as string;
    localStorage.clear();
    localStorage.setItem('Ln', existingLocation);
    localStorage.setItem('permission', existingPermission);
}

export const countrycodenumber = (val: any) => (val ? isIn() ? `+91-${val}` : `+971-${val}` : "");