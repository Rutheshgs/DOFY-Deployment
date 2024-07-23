import "./BottomNavigation.css";

import homeblue from '../../assets/images/phase2/Homeblue.png';
import sellblue from '../../assets/images/phase2/sellblue.png';
import aboutblue from '../../assets/images/phase2/Aboutblue.png';
import contactblue from '../../assets/images/phase2/Contactblue.png';
import faqblue from '../../assets/images/phase2/faqblue.png';


import home from '../../assets/images/phase2/home.png';
import sell from '../../assets/images/phase2/sell.png';
import about from '../../assets/images/phase2/About.png';
import contact from '../../assets/images/phase2/Contact.png';
import faq from '../../assets/images/phase2/faq.png';
import Language from "./BottomNavigation.json";

import { useEffect, useState } from "react";
import { getUserLanguage, getUserLocationForParam } from "../helper/Helper";
import { useTypedDispatch } from "../../features/reduxhooks/ReduxHooks";
import { StepProgressBarReset } from "../../features/reducers/stepprogressbar/StepProgressBar.Reducers";
import { pageChange } from "../../features/reducers/selldevice/PageChange.Reducer";
import { DeviceNameChange } from "../../features/reducers/devicename/DeviceName.Reducers";
import { ActionType } from "../../features/actiontypes/Input.ActionTypes";
import { useRouter } from "next/router";

function BottomNavigation() {

    let dispatch = useTypedDispatch();
    let router = useRouter();
    const [tabSelected, setTabSelected] = useState<"/" | "/about-us" | "/sell-your-old-device" | "/contact-us" | "/faq">();
    const dataLocalization = Language[getUserLanguage()];

    const routerHandlers = (type: "/" | "/about-us" | "/sell-your-old-device" | "/contact-us" | "/faq") => {
        setTabSelected(type);
        if (type == "/sell-your-old-device") {
            dispatch(StepProgressBarReset());
            dispatch(pageChange("selectdevice"));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
        }
        router.push(`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}${type}`);
    }
    const routerHandler = (type: "/" | "/about-us" | "/sell-your-old-device" | "/contact-us" | "/faq") => {
        setTabSelected(type);
        if (type == "/sell-your-old-device") {
            dispatch(StepProgressBarReset());
            dispatch(pageChange("selectdevice"));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
        }
        router.push(`/${getUserLanguage()}${type}`);
    }

    const defaultnavigation = (): "/" | "/about-us" | "/sell-your-old-device" | "/contact-us" | "/faq" => {
        let sellPath = window.location.pathname.includes('sell');
        let aboutPath = window.location.pathname.includes('about-us');
        let contactPath = window.location.pathname.includes('contact-us');
        let faqpath = window.location.pathname.includes('faq');

        if (sellPath) {
            setTabSelected("/sell-your-old-device");
            return "/sell-your-old-device";
        }
        if (aboutPath) {
            setTabSelected("/about-us");
            return "/about-us";
        }
        if (contactPath) {
            setTabSelected("/contact-us");
            return "/contact-us";
        }
        if (faqpath) {
            setTabSelected("/faq");
            return "/faq";
        }

        return "/";
    }

    useEffect(() => {
        defaultnavigation();
    }, []);

    return (
        <ion-grid class="custom-navbar custom-center">
            <ion-row class="custom-navbar-row">
                <ion-col size="2.4" class="first-icon" onClick={() => routerHandlers("/")}>
                    <img src={`${tabSelected === '/' ? homeblue.src : home.src}`} alt='home.png' style={{ width: "24px" }} />
                    <ion-text class={`${tabSelected === '/' ? 'tab-nonselected' : 'tab-selected'}`}>{dataLocalization.HOME}</ion-text>
                </ion-col>
                <ion-col size="2.4" onClick={() => routerHandler("/about-us")} >
                    <img src={`${tabSelected === '/about-us' ? aboutblue.src : about.src}`} alt='about.png' style={{ width: "24px" }} />
                    <ion-text class={`${tabSelected === '/about-us' ? 'tab-nonselected' : 'tab-selected'}`}>{dataLocalization.ABOUT_US}</ion-text>
                </ion-col>
                <ion-col size="2.4" onClick={() => routerHandler("/sell-your-old-device")}>
                    <ion-card class="center-icon">
                        <img src={sell.src} alt='sell.png' style={{ width: "24px" }} />
                        <ion-text >Sell</ion-text>
                    </ion-card>
                </ion-col>
                <ion-col size="2.4" class="last-icon" onClick={() => routerHandler("/faq")}>
                    <img src={`${tabSelected === '/faq' ? faqblue.src : faq.src}`} alt='faq.png' style={{ width: "28px" }} />
                    <ion-text class={`${tabSelected === '/faq' ? 'tab-nonselected' : 'tab-selected'}`}>{dataLocalization.FAQS}</ion-text>
                </ion-col>
                <ion-col size="2.4" onClick={() => routerHandler("/contact-us")}>
                    <img src={`${tabSelected === '/contact-us' ? contactblue.src : contact.src}`} alt='contact.png' style={{ width: "28px" }} />
                    <ion-text class={`${tabSelected === '/contact-us' ? 'tab-nonselected' : 'tab-selected'}`}>{dataLocalization.CONTACT}</ion-text>
                </ion-col>
            </ion-row>
            <div className="circleBackground"></div>
        </ion-grid>
    )
}
export default BottomNavigation