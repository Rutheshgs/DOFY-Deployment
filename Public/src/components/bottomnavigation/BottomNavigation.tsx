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

import { IonCard, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonTabBar, IonTabButton, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { getUserLanguage, getUserLocationForParam } from "../helper/Helper";
import { pricetagOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useTypedDispatch } from "../../features/reduxhooks/ReduxHooks";
import { StepProgressBarReset } from "../../features/reducers/stepprogressbar/StepProgressBar.Reducers";
import { pageChange } from "../../features/reducers/selldevice/PageChange.Reducer";
import { DeviceNameChange } from "../../features/reducers/devicename/DeviceName.Reducers";
import { ActionType } from "../../features/actiontypes/Input.ActionTypes";

function BottomNavigation() {

    let dispatch = useTypedDispatch();
    let history = useHistory();
    const [tabSelected, setTabSelected] = useState<"home" | "about-us" | "sell-your-old-device" | "contact-us" | "faq">();
    const dataLocalization = Language[getUserLanguage()];
    
    const routerHandler = (type: "home" | "about-us" | "sell-your-old-device" | "contact-us" | "faq") => {
        setTabSelected(type);
        if (type == "sell-your-old-device") {
            dispatch(StepProgressBarReset());
            dispatch(pageChange("selectdevice"));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
        }
        history.push(`/${getUserLanguage()}${getUserLocationForParam()}/${type}`);
    }

    const defaultnavigation = (): "home" | "about-us" | "sell-your-old-device" | "contact-us" | "faq" => {
        let sellPath = window.location.pathname.includes('sell');
        let aboutPath = window.location.pathname.includes('about-us');
        let contactPath = window.location.pathname.includes('contact-us');
        let faqpath = window.location.pathname.includes('faq');

        if (sellPath) {
            setTabSelected("sell-your-old-device");
            return "sell-your-old-device";
        }
        if (aboutPath) {
            setTabSelected("about-us");
            return "about-us";
        }
        if (contactPath) {
            setTabSelected("contact-us");
            return "contact-us";
        }
        if (faqpath) {
            setTabSelected("faq");
            return "faq";
        }

        return "home";
    }

    useEffect(() => {
        defaultnavigation();
    }, []);

    return (
        <IonGrid className="custom-navbar custom-center">
            <IonRow className="custom-navbar-row">
                <IonCol size="2.4" className="first-icon" onClick={() => routerHandler("home")}>
                    <IonImg src={`${tabSelected === 'home' ? homeblue : home}`} alt='home' style={{ width: "24px" }} />
                    <IonText className={`${tabSelected === 'home' ? 'tab-nonselected' : 'tab-selected'}`}>{dataLocalization.HOME}</IonText>
                </IonCol>
                <IonCol size="2.4" onClick={() => routerHandler("about-us")} >
                    <IonImg src={`${tabSelected === 'about-us' ? aboutblue : about}`} alt='about' style={{ width: "24px" }} />
                    <IonText className={`${tabSelected === 'about-us' ? 'tab-nonselected' : 'tab-selected'}`}>{dataLocalization.ABOUT_US}</IonText>
                </IonCol>
                <IonCol size="2.4" onClick={() => routerHandler("sell-your-old-device")}>
                    <IonCard className="center-icon">
                        <IonImg src={sell} alt='sell' style={{ width: "24px" }} />
                        <IonText >Sell</IonText>
                    </IonCard>
                </IonCol>
                <IonCol size="2.4" className="last-icon" onClick={() => routerHandler("faq")}>
                    <IonImg src={`${tabSelected === 'faq' ? faqblue : faq}`} alt='faq' style={{ width: "24px" }} />
                    <IonText className={`${tabSelected === 'faq' ? 'tab-nonselected' : 'tab-selected'}`}>{dataLocalization.FAQS}</IonText>
                </IonCol>
                <IonCol size="2.4" onClick={() => routerHandler("contact-us")}>
                    <IonImg src={`${tabSelected === 'contact-us' ? contactblue : contact}`} alt='contact' style={{ width: "24px" }} />
                    <IonText className={`${tabSelected === 'contact-us' ? 'tab-nonselected' : 'tab-selected'}`}>{dataLocalization.CONTACT}</IonText>
                </IonCol>
            </IonRow>
            <div className="circleBackground"></div>
        </IonGrid>
    )
}

export default BottomNavigation