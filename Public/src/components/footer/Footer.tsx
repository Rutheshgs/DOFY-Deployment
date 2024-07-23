import { useHistory } from 'react-router-dom';
import { IonCol, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import { chevronForward } from 'ionicons/icons';

import { ActionType } from '../../features/actiontypes/Input.ActionTypes';
import { pageChange, routerChange } from '../../features/reducers/selldevice/PageChange.Reducer';
import { InputParamChange } from '../../features/reducers/shared/InputParams.Reducers';
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks';
import { RepairpageChange } from '../../features/reducers/repair/RepairPageChange.Reducer';

import "./Footer.css";
import { HelperConstant } from '../helper/HelperConstant';
import { Direction, getUserLanguage, getUserLocationForParam } from '../helper/Helper';
import Language from "./Footer.json"
import { useEffect, useState } from 'react';
import ContactUsServices from '../../services/ContactUs.Services';

function Footer() {

    const routerHandler = (type: "/home" | "/about-us" | "/contact-us" | "/sell-your-old-device" | "/Repair-Device" | "/faq" | "/terms-of-use" | "/privacy-policy") => {
        dispatch(pageChange("selectdevice"));
        dispatch(RepairpageChange("selectdevice"));
        history.push(`/${getUserLanguage()}${getUserLocationForParam()}${type}`);
    }
    let dataLocalization = Language[getUserLanguage()];
    let dispatch = useTypedDispatch();
    let history = useHistory();

    const [address, setAddress] = useState<{ Address: string, Email: string, Phone: string, PromotionLinks: { faceBook: string, instagram: string, linkedIn: string, tikTok: string, youTube: string, Twitter: string } }>({
        Address: "", Email: "", Phone: "",
        PromotionLinks: {
            faceBook: "",
            instagram: "",
            linkedIn: "",
            youTube: "",
            tikTok: "",
            Twitter: ""
        }
    });

    // const ServicesBuy = [{ Id: HelperConstant.productTypeId.phone, Name: dataLocalization.Phone }, { Id: HelperConstant.productTypeId.smart_watch, Name: dataLocalization.SmartWatch }, { Id: HelperConstant.productTypeId.laptop, Name: dataLocalization.Laptop }, { Id: HelperConstant.productTypeId.more, Name: dataLocalization.More }, { Id: HelperConstant.productTypeId.tablet, Name: dataLocalization.Tablet }];
    const ServicesBuy = [
        { Id: HelperConstant.productTypeId.phone, Name: dataLocalization.Phone, Router: "Phone" },
        { Id: HelperConstant.productTypeId.smart_watch, Name: dataLocalization.SmartWatch, Router: "SmartWatch" },
        { Id: HelperConstant.productTypeId.laptop, Name: dataLocalization.Laptop, Router: "Laptop" },
        { Id: HelperConstant.productTypeId.more, Name: dataLocalization.More, Router: "More..." },
        { Id: HelperConstant.productTypeId.tablet, Name: dataLocalization.Tablet, Router: "Tablet" }
    ];

    const linkHandler = (type: "android" | "ios") => {
        if (type === "android") {
            window.open(HelperConstant.androidAppLink);
        }
        if (type === "ios") {
            window.open(HelperConstant.iosAppLink);
        }
    }

    const sellServiceRouterHandler = (deviceName: string) => {

        if (deviceName.includes("More...")) {
            return history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
        }

        dispatch(routerChange(deviceName.toLowerCase().replaceAll(' ', '')));
        history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-${deviceName.toLowerCase().replaceAll(' ', '')}`);

        // dispatch(InputParamChange({ payload: Id, type: ActionType.PRODUCT_ID }));
        // if (Id === 0) {
        //     history.push(`/${getUserLanguage()}${getUserLocationForParam()}/${type}`);
        //     dispatch(pageChange("selectdevice"));
        // }
        // else if (type === "sell-your-old-device") {
        //     history.push(`/${getUserLanguage()}${getUserLocationForParam()}/${type}`);
        //     dispatch(pageChange("selectbrand"));
        // }
        // else {
        //     history.push(`/${getUserLanguage()}${getUserLocationForParam()}/${type}`);
        //     dispatch(RepairpageChange("selectbrand"));
        // }
    }

    const getAddress = () => {
        ContactUsServices.getAddress().then(res => {
            if (res.status == 200) {
                setAddress(res.data);
            }
        }).catch(e => { console.log(e) });
    }

    const facebookSite = () => {
        window.open(address.PromotionLinks.faceBook);
    };

    const instagramSite = () => {
        window.open(address.PromotionLinks.instagram);
    };

    const twitterSite = () => {
        window.open(address.PromotionLinks.Twitter);
    };

    const linkedInSite = () => {
        window.open(address.PromotionLinks.linkedIn);
    };

    const tikTokSIte = () => {
        window.open(address.PromotionLinks.tikTok);
    };

    const youtubeSite = () => {
        window.open(address.PromotionLinks.youTube);
    };

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <>
            <IonGrid className='foo-grid' dir={Direction()}>
                <IonGrid >
                    <IonRow>
                        <IonCol sizeLg='4.5' sizeMd='4' sizeXs='12' sizeSm='12'>
                            <IonText className='footer_title'>{address.Address.split(';')[0]}</IonText><br />
                            <IonText className='foo-content'>{dataLocalization.We_promise_our_users}</IonText>
                            <ul>
                                {address.PromotionLinks.faceBook != "" &&
                                    <li onClick={() => { facebookSite() }}><i className="fab fa-facebook" aria-hidden="true"></i></li>
                                }
                                {address.PromotionLinks.Twitter != "" &&
                                    <li onClick={() => { twitterSite() }}><i className="fab fa-twitter" aria-hidden="true"></i></li>
                                }
                                {address.PromotionLinks.instagram != "" &&
                                    <li onClick={() => { instagramSite() }}><i className="fab fa-instagram" aria-hidden="true"></i></li>
                                }
                                {address.PromotionLinks.linkedIn != "" &&
                                    <li onClick={() => { linkedInSite() }}><i className="fab fa-linkedin" aria-hidden="true"></i></li>
                                }
                                {address.PromotionLinks.youTube != "" &&
                                    <li onClick={() => { youtubeSite() }}><i className="fab fa-youtube" aria-hidden="true"></i></li>
                                }
                                {address.PromotionLinks.tikTok != "" &&
                                    <li style={{ marginTop: "-2px" }} onClick={() => { tikTokSIte() }}><svg fill='white' height="1em" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" /></svg></li>
                                }
                            </ul>
                            <IonRow>
                                <IonImg style={{ height: "40px", marginRight: "10px", cursor: "pointer" }} onClick={() => linkHandler("android")} src={require('../../assets/images/playstore.png')} alt='playstore-icon' />&nbsp;&nbsp;
                                <IonImg style={{ height: "40px", cursor: "pointer" }} onClick={() => linkHandler("ios")} src={require('../../assets/images/appstore.png')} alt='appstore-icon' />
                            </IonRow>
                        </IonCol>
                        <IonCol sizeLg='3.5' sizeMd='4' sizeXs='12'>
                            <IonText className='foo-header'>{dataLocalization.Important_Links}</IonText>
                            <IonRow>
                                {ServicesBuy.map((val, i) => (
                                    <IonCol style={{ padding: "0px" }} sizeLg='6' sizeMd='6' sizeXs='12' key={i}>
                                        <IonItem className='custom-ion-item foo-items' color="white" lines='none'>
                                            <IonIcon icon={chevronForward} />
                                            {/* <IonLabel className='cursor-pointer' onClick={() => sellServiceRouterHandler(val.Name)}>{val.Name}</IonLabel> */}
                                            <IonLabel className='cursor-pointer' onClick={() => sellServiceRouterHandler(val.Router)}>{val.Name}</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonCol>
                        <IonCol sizeLg='1.7' sizeMd='2' sizeXs='12'>
                            <IonText className='foo-header'>{dataLocalization.Company}</IonText>
                            <IonItem className='custom-ion-item foo-items' color="white" lines='none'>
                                <IonIcon icon={chevronForward} />
                                <IonLabel className='cursor-pointer' onClick={() => routerHandler("/about-us")}>{dataLocalization.About_Us}</IonLabel>
                            </IonItem>
                            <IonItem className='custom-ion-item foo-items' color="white" lines='none'>
                                <IonIcon icon={chevronForward} />
                                <IonLabel className='cursor-pointer' onClick={() => routerHandler("/faq")}>{dataLocalization.FAQS}</IonLabel>
                            </IonItem>
                        </IonCol>
                        <IonCol sizeLg='2.3' sizeMd='2' sizeXs='12'>
                            <IonText className='foo-header'>{dataLocalization.Help_Support}</IonText>
                            <IonItem className='custom-ion-item foo-items' color="white" lines='none'>
                                <IonIcon icon={chevronForward} />
                                <IonLabel className='cursor-pointer' onClick={() => routerHandler("/contact-us")}>{dataLocalization.Contact_Us}</IonLabel>
                            </IonItem>
                            <IonItem className='custom-ion-item foo-items' color="white" lines='none'>
                                <IonIcon icon={chevronForward} />
                                <IonLabel className='cursor-pointer' onClick={() => routerHandler("/terms-of-use")}>{dataLocalization.Terms_and_conditions}</IonLabel>
                            </IonItem>
                            <IonItem className='custom-ion-item foo-items' color="white" lines='none'>
                                <IonIcon icon={chevronForward} />
                                <IonLabel className='cursor-pointer' onClick={() => routerHandler("/privacy-policy")}>{dataLocalization.Privacy_Policy}</IonLabel>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonGrid>
            <IonGrid className='foo-second-grid'>
                <IonRow>
                    <IonCol size='12' className='ion-text-center foo-copyright'>
                        <IonText>{dataLocalization.Copyrights} &copy; {new Date().getFullYear()} &nbsp;{dataLocalization.All_rights_reserved} </IonText>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </>
    )
}

export default Footer