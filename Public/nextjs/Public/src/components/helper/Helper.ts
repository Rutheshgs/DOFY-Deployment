import { isPlatform } from "@ionic/core";
import { useTypedSelector } from "../../features/reduxhooks/ReduxHooks";
import { ILocalStorageModel } from "../../models/LocalStorage.Model";
import cookie from "cookie"

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
    if (typeof window !== "undefined") {
        const isMobilePlatform = isPlatform("android") || isPlatform("ios");
        return isMobilePlatform;
    }
}

export const IsLogginUser = () => {
    if (typeof window !== "undefined") {
        const validUser = getLocalStorage().Token;
        if (validUser) {
            return window.location.href = "/";
        }
    }
}

export const authUser = () => {
    if (typeof window !== "undefined") {
        const validUser = getLocalStorage().Token;
        if (!validUser) {
            return window.location.href = "/";
        }
    }
}

export const IsTablet = () => {
    if (typeof window !== "undefined") {
        if (isPlatform("desktop")) {
            return false
        }
        else if (isPlatform("tablet")) {
            return true;
        } else {
            return false;
        }
    }
}

export const isMobileWeb = () => {
    if (typeof window !== "undefined") {
        if (isPlatform("mobileweb")) {
            return true
        }
        else {
            return false;
        }
    }
}

export const GetDefaultHome = (data: any, pathRef: any) => {
    if (findWindow()) {
        if (data === 0 || data === null || data === undefined || !data) window.location.href = `/${getUserLanguage()}${getUserLocationForParam("")}/${pathRef}`;
    }
}

export const GetHome = (data: any) => {
    if (findWindow()) {
        if (data === 0) window.location.href = `/${getUserLanguage()}${getUserLocationForParam("")}`;
    }
}

export const getLocalStorage = () => {
    if (findWindow()) {
        let token: ILocalStorageModel = JSON.parse(localStorage.getItem("token") as any);
        return token ? token : {} as ILocalStorageModel
    }
    return {} as ILocalStorageModel
}

export const getUserLocation = () => {
    if (findWindow()) {
        if (getUserLanguage() === "ae_ar") {
            let location = JSON.parse(localStorage.getItem("userLocation_ar") as any);
            return location
        }
        let location = JSON.parse(localStorage.getItem("userLocation") as any);
        return location
    }
}

export const ExistingLocation = (): "in_en" | "ae_en" | "ae_ar" => {
    if (findWindow()) {
        let existingLocation = localStorage.getItem("Ln") as "in_en" | "ae_en" | "ae_ar";
        if (existingLocation) {
            return existingLocation;
        }

        else {
            localStorage.setItem("Ln", 'in_en');
            return "in_en";
        }
    }
    return "in_en";
}

export const getUserLocationForParam = (locationParam: string) => {
    if (findWindow()) {
        let location: string = JSON.parse(localStorage.getItem("userLocation") as any);
        if (location == null) {
            if (locationParam == "") {
                if (getUserLanguage() == "in_en") {
                    return "/india"

                }
                return "/uae"
            }
            if (locationParam == "in_en") {
                return "/india"

            }
            return "/uae"
        }
        return '/' + location?.replaceAll(' ', '');
    }
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
    if (findWindow()) {
        const loginUser = getLocalStorage().PersonId;
        if (loginUser !== userId) {
            return window.location.href = `/${getUserLanguage()}${getUserLocationForParam("")}/`;
        }
    }
}

export const findPostiveNumber = (num: number) => (num < 0) ? "color-danger" : "color-success";

export function handleKeyEnter(e: any, keyWord: string, length: number, callBack: any) {
    const { key } = e;
    if (key === 'Enter' && keyWord.length === length) callBack();
}

export const getUserLanguage = (): "in_en" | "ae_en" | "ae_ar" => {
    // resetLocation();
    if (typeof window !== "undefined") {

        let existingLocation = localStorage.getItem("Ln") as "in_en" | "ae_en" | "ae_ar";
        let ae_en = window.location.origin.includes('ae');

        if (isPlatform("capacitor")) {
            if (existingLocation === "ae_en") {
                localStorage.setItem("Ln", 'ae_en');
                return "ae_en";
            }

            if (existingLocation === "ae_ar") {
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
        else {
            if (!ae_en) {
                localStorage.setItem("Ln", 'in_en');
                return "in_en";
            }
            if (ae_en && existingLocation === "ae_en") {
                localStorage.setItem("Ln", 'ae_en');
                return "ae_en";
            }

            if (ae_en && existingLocation === "ae_ar") {
                localStorage.setItem("Ln", 'ae_ar');
                return "ae_ar";
            }

            if (ae_en) {
                localStorage.setItem("Ln", 'ae_en');
                return "ae_en";
            }

            if (existingLocation) {
                return existingLocation;
            }

            else {
                localStorage.setItem("Ln", 'in_en');
                return "in_en";
            }
        }
    }
    return "in_en";
}

export const SSRDetection = (context: { query: { ln: "in_en" | "ae_en" | "ae_ar"; }; req: { headers: { host: string | string[]; }; }; }, type: "lan" | "dir"): any => {
    let isUAE = context.req.headers.host.includes('ae');
    let language = context.query.ln;

    if (type === "lan") {
        if (isUAE) {
            return language;
        }
        else {
            return "in_en"
        }
    }
    if (type === "dir") {
        if (isUAE && language == "ae_ar") {
            return "rtl";
        }
        else {
            return "ltr"
        }
    }
    return "";
}

// export const getUserLanguage = (): "in_en" | "ae_en" | "ae_ar" => {

//     // resetLocation();

//     if (typeof window !== "undefined") {
//         let existingLocation = localStorage.getItem("Ln") as "in_en" | "ae_en" | "ae_ar";
//         let in_en = window.location.pathname.split('/')[1].includes('in_en');
//         let ae_en = window.location.pathname.split('/')[1].includes('ae_en');
//         let ae_ar = window.location.pathname.split('/')[1].includes('ae_ar');

//         if (in_en) {
//             localStorage.setItem("Ln", 'in_en');
//             return "in_en";
//         }
//         if (ae_en) {
//             localStorage.setItem("Ln", 'ae_en');
//             return "ae_en";
//         }
//         if (ae_ar) {
//             localStorage.setItem("Ln", 'ae_ar');
//             return "ae_ar";
//         }
//         if (existingLocation) {
//             return existingLocation;
//         }
//         else {
//             localStorage.setItem("Ln", 'in_en');
//             return "in_en";
//         }
//     }
//     return "in_en";
// }

export const RTLDirection = () => {
    if (typeof window !== "undefined") {
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
    if (findWindow()) {
        let currentPath = window.location.pathname.split('/')[1];
        let existingLocation = localStorage.getItem("Ln");

        if (existingLocation && currentPath && (currentPath.slice(0, 2) != existingLocation?.slice(0, 2))) {
            localStorageClearHandler();
        }
    }
}

export const currencyByCountry = (amount: any, language: "in_en" | "ae_en" | "ae_ar") => {
    if (language === "in_en") {
        return `₹ ${amount}`;
    }
    return `${amount} AED`;
}

// export const currencyByCountry = (amount: any) => {
//     if (getUserLanguage() === "in_en") {
//       return `₹ ${amount}`;
//     } else {
//       return `${amount} AED`;
//     }
//   }


function removeItem(sKey: string | number | boolean, sPath?: string, sDomain?: string) {
    document.cookie = encodeURIComponent(sKey) +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "");
}

export const localStorageClearHandler = () => {
    if (findWindow()) {
        removeItem('token', "/");
        removeItem('personId', "/");
        let existingPermission = localStorage.getItem('permission') as string;
        let existingLocation = localStorage.getItem("Ln") as string;
        localStorage.clear();
        localStorage.setItem('Ln', existingLocation);
        localStorage.setItem('permission', existingPermission);
    }
}

export const countrycodenumber = (val: any) => (val ? isIn() ? `+91-${val}` : `+971-${val}` : "");

export const findBrowser = () => {
    if (typeof window !== "undefined" || typeof document !== "undefined") {
        return true;
    }
    else {
        return false;
    }
}

export const findWindow = () => {
    if (typeof window !== "undefined") {
        return true;
    }
    else {
        return false;
    }
}

export const findDocument = () => {
    if (typeof document !== "undefined") {
        return true;
    }
    else {
        return false;
    }
}

export const androidDevice = () => {
    if (typeof document !== "undefined") {
        return isPlatform("android")
    }
    else {
        return false;
    }
}

export const IOSDevice = () => {
    if (typeof document !== "undefined") {
        return isPlatform("ios")
    }
    else {
        return false;
    }
}

export const capacitorDevice = () => {
    if (androidDevice() || IOSDevice()) {
        return false;
    }
    else {
        return true;
    }
}

export const getCookie = (cname: string) => {
    if (findWindow()) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                let data = c.substring(name.length, c.length);
                return JSON.parse(data);
            }
        }
        return "";
    }
}

export const getCookiesFromServer = (req: any) => {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export const properHeader = (val: string, type: "LanguageCode" | "CountryCode") => {
    if (val == "" && type === "LanguageCode") {
        return findedLocation().LanguageCode;
    }
    if (val == "" && type === "CountryCode") {
        return findedLocation().CountryCode;
    }
    return val;
}

