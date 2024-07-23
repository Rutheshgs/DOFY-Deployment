import { IonCard, IonCol, IonGrid, IonItem, IonLabel, IonRouterLink, IonRow, IonSelect, IonSelectOption } from '@ionic/react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import "./LegalTerms.css";
import { getUserLanguage, getUserLocationForParam } from '../helper/Helper';
import Language from "./legalterms.json"

function LegalTerms() {
    const [link] = useState();

    let history = useHistory();
    let dataLocalization = Language[getUserLanguage()];

    return (
        <IonGrid>
            {/* <IonRow className='ion-hide-sm-down'> */}
            {/* <IonCol> */}
            {/* <IonCard className='tac-card'> */}
            {/* <IonItem routerLink='/warrantypolicy' className={routerActiveClass("warrantypolicy") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>Warranty Policy</IonLabel>
                        </IonItem> */}


            {/* <IonItem routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/terms-of-use`} className={routerActiveClass("termsofuse") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>Terms of Use</IonLabel>
                        </IonItem> */}



            {/* <IonItem routerLink='/termsandcondition' className={routerActiveClass("termsandcondition") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>Terms & Conditions</IonLabel>
                        </IonItem> */}
            {/* <IonItem routerLink='/refundpolicy' className={routerActiveClass("refundpolicy") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>Refund Policy</IonLabel>
                        </IonItem> */}
            {/* <IonItem routerLink='/cookiepolicy' className={routerActiveClass("cookiepolicy") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>Cookie Policy</IonLabel>
                        </IonItem> */}
            {/* <IonItem routerLink='/referandearnterms' className={routerActiveClass("referandearnterms") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>Refer & Earn Terms</IonLabel>
                        </IonItem> */}



            {/* <IonItem routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/privacy-policy`} className={routerActiveClass("privacypolicy") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>Privacy Policy</IonLabel>
                        </IonItem> */}



            {/* <IonItem routerLink='/dataprotection' className={routerActiveClass("dataprotection") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel >Data protection</IonLabel>
                        </IonItem> */}



            {/* <IonItem routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/faq`} className={routerActiveClass("faq") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>FAQ</IonLabel>
                        </IonItem> */}



            {/* <IonItem routerLink='/wastepolicy' className={routerActiveClass("wastepolicy") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>E-Waste Policy</IonLabel>
                        </IonItem>
                        <IonItem routerLink='/indemnityform' className={routerActiveClass("indemnityform") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>Indemnity Form</IonLabel>
                        </IonItem> */}
            {/* <IonItem routerLink='/refurbishedphones' className={routerActiveClass("refurbishedphones") ? "legal-terms-active sidenavbar" : "sidenavbar"}>
                            <IonIcon color='dark' className='icon-small' icon={arrowForwardCircleOutline}></IonIcon>
                            <IonLabel>Refurbished Phones</IonLabel>
                        </IonItem> */}
            {/* </IonCard> */}
            {/* </IonCol> */}
            {/* </IonRow> */}
            <IonRow className='justify-content-center'>
                <IonCol sizeLg='2'>
                    <IonCard className='lt_termcondition-card' routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/terms-of-use`}>
                        <IonLabel className='lt_termsuse'>{dataLocalization.Terms_and_Condition}</IonLabel>
                    </IonCard>
                </IonCol>
                <IonCol sizeLg='2'>
                    <IonCard className='lt_termcondition-card' routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/privacy-policy`}>
                        <IonLabel className='lt_termsuse'>{dataLocalization.Privacy_Policy}</IonLabel>
                    </IonCard>
                </IonCol>
            </IonRow>
            <IonRow className='ion-hide-sm-up'>

                {/* <IonCol>
                    <IonCard className='tac-card'>
                        <IonItem>
                            <IonSelect interface='popover'>
                                <label>Warranty Policy</label>
                                {link.map((val, i) => {
                                    return <IonCol >

                                        <IonSelectOption key={i} value={val.Id}>{val.Name}</IonSelectOption>

                                    </IonCol>
                                })}
                            </IonSelect>
                        </IonItem>
                    </IonCard>
                </IonCol>*/}

                <IonCol>
                    <IonCard className='tac-card'>
                        <IonItem>
                            <IonLabel>Select Your Policy</IonLabel>
                            <IonSelect interface='popover'
                                onIonChange={e => history.push(`/${getUserLanguage()}${getUserLocationForParam()}/${e.detail.value}`)}
                                value={link}
                            >
                                {/* <IonSelectOption value="warrantypolicy" ><IonRouterLink routerLink='/warrantypolicy'>Warranty Policy</IonRouterLink></IonSelectOption> */}
                                <IonSelectOption value="terms-of-use" ><IonRouterLink routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/terms-of-use`}>Terms of Use</IonRouterLink></IonSelectOption>
                                {/* <IonSelectOption value="termsandcondition"><IonRouterLink routerLink='/termsandcondition' >Terms & Conditions</IonRouterLink></IonSelectOption> */}
                                {/* <IonSelectOption value="refundpolicy"><IonRouterLink routerLink='/refundpolicy'>Refund Policy</IonRouterLink></IonSelectOption> */}
                                {/* <IonSelectOption value="cookiepolicy"><IonRouterLink routerLink='/cookiepolicy' >Cookie Policy</IonRouterLink></IonSelectOption> */}
                                {/* <IonSelectOption value="referandearnterms"><IonRouterLink routerLink='/referandearnterms' >Refer & Earn Terms</IonRouterLink></IonSelectOption> */}
                                <IonSelectOption value="privacy-policy"><IonRouterLink routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/privacy-policy`} >Privacy Policy</IonRouterLink></IonSelectOption>
                                <IonSelectOption value="faq"><IonRouterLink routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/faq`} >FAQ</IonRouterLink></IonSelectOption>
                                {/* <IonSelectOption value="dataprotection"><IonRouterLink routerLink='/dataprotection' >Data Protection</IonRouterLink></IonSelectOption> */}
                                {/* <IonSelectOption value="wastepolicy"><IonRouterLink routerLink='/wastepolicy' >E-Waste Policy</IonRouterLink></IonSelectOption>
                                <IonSelectOption value="indemnityform"><IonRouterLink routerLink='/indemnityform' >Indemnity Form</IonRouterLink></IonSelectOption> */}
                                {/* <IonSelectOption value="refurbishedphones"><IonRouterLink routerLink='/refurbishedphones'>Refurbished Phones</IonRouterLink></IonSelectOption> */}
                            </IonSelect>
                        </IonItem>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default LegalTerms