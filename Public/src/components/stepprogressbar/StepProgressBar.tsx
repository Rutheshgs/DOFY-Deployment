import { IonIcon, IonImg } from "@ionic/react";
import "./StepProgressBar.css";
import { buildOutline, menuOutline, readerOutline, shieldCheckmarkOutline } from "ionicons/icons";
import { useTypedSelector } from "../../features/reduxhooks/ReduxHooks";

import devicedetailsblue from '../../assets/images/devicedetails-blue.png';
import devicedetailsgrey from '../../assets/images/devicedetails-grey.png';
import devicedetailswhite from '../../assets/images/devicedetails-white.png';

import functionalconditionblue from '../../assets/images/Functional-blue.png';
import functionalconditiongrey from '../../assets/images/Functional-grey.png';
import functionconditionwhite from '../../assets/images/Functional-white.png';

import physicsalconditionblue from '../../assets/images/Physicalcondition-blue.png';
import physicalconditiongrey from '../../assets/images/Physicalcondition-grey.png';
import physicalconditionwhite from '../../assets/images/Physicalcondition-white.png';

import warrantyblue from '../../assets/images/warning-blue.png';
import warrantygrey from '../../assets/images/warning-grey.png';
import warrantywhite from '../../assets/images/warning-white.png';
import Language from "./StepProgressBar.json";
import { getUserLanguage } from "../helper/Helper";

function StepProgressBar() {

    const activePage = useTypedSelector(state => state.StepProgressBar.activePage);

    let devicedetails = activePage.includes(2) ? devicedetailswhite: activePage.includes(1) ? devicedetailsblue : devicedetailsgrey;
    let physicalcondition = activePage.includes(3) ? physicalconditionwhite: activePage.includes(2) ? physicsalconditionblue : physicalconditiongrey;
    let functionconditional = activePage.includes(4) ? functionconditionwhite: activePage.includes(3) ? functionalconditionblue : functionalconditiongrey;
    let warranty = activePage.length > 4 ? warrantywhite: activePage.includes(4) ? warrantyblue : warrantygrey;
    let dataLocalization = Language[getUserLanguage()];

    return (
        <div className="container-step">
            <div className="steps">
                <span className={`circle ${activePage.includes(2) && 'complete-active'} ${activePage.includes(1) && 'active'}`}>
                    {/* <IonIcon icon={menuOutline} /> */}
                    <IonImg className="sp_imagewidth" alt="devicedetails" src={devicedetails}></IonImg>
                </span>
                <span className={`circle ${activePage.includes(3) && 'complete-active'} ${activePage.includes(2) && 'active'}`}>
                    {/* <IonIcon icon={readerOutline} /> */}
                    <IonImg  className="sp_imagewidthadjust" alt="physicalcondition" src={physicalcondition}></IonImg>
                </span>
                <span className={`circle ${activePage.includes(4) && 'complete-active'} ${activePage.includes(3) && 'active'}`}>
                    {/* <IonIcon icon={buildOutline} /> */}
                    <IonImg  className="sp_imagewidth" alt="functionconditional" src={functionconditional}></IonImg>
                </span>
                <span className={`circle ${activePage.length > 4 && 'complete-active'} ${activePage.includes(4) && 'active'}`}>
                    {/* <IonIcon icon={shieldCheckmarkOutline} /> */}
                    <IonImg  className="sp_imagewidth" alt="warranty" src={warranty}></IonImg>
                </span>
                <div className="progress-bar">
                    <span style={{ width: `${activePage.length * 33}%` }} className="indicator"></span>
                </div>
            </div>
            <div className="steps-heading">
                <span > {dataLocalization.Device}</span>
                <span > {dataLocalization.Physical}</span>
                <span > {dataLocalization.Functional}</span>
                <span > {dataLocalization.Warranty}</span>
            </div>
        </div>
    )
}

export default StepProgressBar