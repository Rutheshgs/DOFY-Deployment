import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IonButton, IonCol, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonModal, IonRouterLink, IonRow, IonText, IonToolbar } from '@ionic/react';
import { locationOutline, searchOutline } from 'ionicons/icons';

import logo from "../../assets/images/phase2/dofy-logo.png";

import "./Header.css";

import { getLocalStorage, getUserLanguage, getUserLocation, getUserLocationForParam, isIn } from '../helper/Helper';

import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { pageChange } from '../../features/reducers/selldevice/PageChange.Reducer';
import { RepairpageChange } from '../../features/reducers/repair/RepairPageChange.Reducer';
import { modelChanger, modelChangerClose, resetModelChanger } from '../../features/reducers/login/LoginModel.Reducer';
import { userLocationChanger } from '../../features/reducers/locationmodal/Location.Reducers';

import LoginMobileNumber from '../../pages/login/loginscreen/LoginScreen';
import VerificationScreen from '../../pages/login/verificationscreen/VerificationScreen';
import Registration from '../../pages/registration/Registrations';
import LocationModel from '../locationmodal/LocationModal';

import { CustomImg } from '../shared/CustomImage';
import { isPlatform } from '@ionic/core';
import { HelperConstant } from '../helper/HelperConstant';
import { newUser } from '../../features/reducers/registration/Registration.Reducers';

import MasterServices from '../../services/Master.Services';
import GlobalSearch from '../globalsearch/GlobalSearch';
import { Button } from '@mui/material';
import ForgotPassword from '../../pages/forgetpassword/ForgotPassword';
import PasswordReset from '../../pages/passwordreset/PasswordReset';
import VerifyOtp from '../../pages/verifyotp/VerifyOtp';
import FindLocation from '../findlocation/FindLocation';
import FindDevice from '../finddevice/FindDevice';
import UniversalSearch from '../universalsearch/UniversalSearch';
import uaeimage from '../../assets/images/uaeimage.png';
import Language from './Header.json';
import { Helmet } from 'react-helmet';


type backgroundColor = { backgroundColor?: 'black' };

function Header({ backgroundColor }: backgroundColor) {

    let dispatch = useTypedDispatch();
    let dataLocalization = Language[getUserLanguage()];
    let history = useHistory();

    const personId = getLocalStorage()?.PersonId;

    let modeIsOpen = useTypedSelector(state => state.ModelChangerReducer.isOpen);
    let selectedPage = useTypedSelector(state => state.ModelChangerReducer.selectedPage);
    let isLocation = useTypedSelector(state => state.userLocation.isLocation);
    let isDesktop = useTypedSelector(state => state.FindDevice.isDesktop);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);
    let isTabletPortrait = useTypedSelector(state => state.FindDevice.isTabletPortrait);
    let questionnaire = useTypedSelector((state) => state.PageChangeReducer.selectedPage);

    const [locationlist, setLocationList] = useState<Array<any>>([]);
    const [locationModel, setLocationModel] = useState(false);
    const [globalSearch, setGlobalSearch] = useState(false);
    const [universalSearch, setUniversalSearch] = useState(false);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [isToastOpen, setIsToastOpen] = useState(false);

    const routerPage = {
        LOGIN: "login",
        VERIFY: "verification",
        REGISTER: "register",
        ForgotPassword: "forgot-password",
        PasswordReset: "password-reset",
        VerifyOtp: "verify-otp",
        FindLocation: "find-location",
        FindDevice: "find-device"
    }

    const getGeoLocation = () => {
        MasterServices.GetAllDofyGeo(HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setLocationList(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const getValidLocation = (validLocation: boolean) => {
        if (validLocation) {
            setLocationModel(false);
            dispatch(userLocationChanger(true));
        }
    }

    const loginHandler = () => {
        dispatch(modelChanger(true));
    }

    const languageHandler = () => {
        let defaultPath = window.location.pathname.split('/').splice(2).toString().replaceAll(',', '/');
        if (getUserLanguage() == "ae_ar") {
            let constructedPath = window.location.pathname.split('/').splice(1)[0] = "ae_en".toString().replaceAll(',', '/');
            window.location.href = `/${constructedPath}/${defaultPath}`;
        }
        else {
            let constructedPath = window.location.pathname.split('/').splice(1)[0] = "ae_ar".toString().replaceAll(',', '/');
            window.location.href = `/${constructedPath}/${defaultPath}`;
        }
    }

    const openAPP = () => {
        if (isPlatform("android")) {
            window.open(HelperConstant.androidAppLink);
        }
        else {
            window.open(HelperConstant.iosAppLink);
        }
    }

    const modelStyleHandler = () => {
        if (getUserLanguage() === "in_en") {
            if (selectedPage == routerPage.REGISTER) {
                return "modal-login-height-95"
            }
            else {
                return "modal-login-height-75";
            }
        }
        else {
            if (selectedPage == routerPage.REGISTER) {
                return "modal-login-height-95"
            }
            else {
                return "modal-login-height-80";
            }
        }
    }

    const removeMetaTagsAttr = () => {
        const selectedMetaTags = document.querySelectorAll('meta');

        selectedMetaTags.forEach((item) => {
            if (item.hasAttribute('data-react-helmet'))
                item.removeAttribute('data-react-helmet')
        });
    }

    useLayoutEffect(() => {
        removeMetaTagsAttr();
    }, []);

    useEffect(() => {
        const autoInput = document.getElementById('globalSearch-input');
        autoInput?.addEventListener("focusin", () => {
            // setGlobalSearch(true);
            setSearchKeyWord("");
        });
        autoInput?.addEventListener("focusout", () => {
            setTimeout(() => { setGlobalSearch(false); setSearchKeyWord("") }, 200);
        });

        return () => {
            autoInput?.removeEventListener("focusin", () => {
                // setGlobalSearch(true);
                setSearchKeyWord("");
            });
            autoInput?.removeEventListener('focusout', () => {
                setTimeout(() => { setGlobalSearch(false); setSearchKeyWord("") }, 200);
            });
        }
    }, []);

    useEffect(() => {
        if (getUserLocation() || isLocation) {
            dispatch(userLocationChanger(true));
            setLocationModel(false);
        }

        if (!modeIsOpen) {
            dispatch(newUser(""));
        }

        getGeoLocation();
        setTimeout(() => { setIsToastOpen(true) }, 2000);
    }, [dispatch, modeIsOpen, isLocation]);

    return (
        <>
            <IonHeader style={{ position: "unset" }} >
                {/* {isMobileWeb() &&
                <IonToast
                    isOpen={isToastOpen} duration={5000}
                    buttons={[{ text: "Download Dofy app", icon: isPlatform("android") ? logoGooglePlaystore : logoAppleAppstore, side: "start", cssClass: "mobile-only-toast-btn", handler: () => { openAPP() } }
                        , { icon: closeCircle, handler: () => { setIsToastOpen(false) } }]}
                    color="light" position="top"
                    cssClass={"mobile-only-toast"} onDidDismiss={() => setIsToastOpen(false)} />
            } */}
                <IonToolbar className='header-grid' style={{ backgroundColor: (backgroundColor ? backgroundColor : '#1E4496') }}>
                    <IonGrid className='p-0'>
                        {process.env.REACT_APP_ENV === 'production' &&
                            <Helmet>
                                {getUserLanguage() === "in_en" ?
                                    <meta name='google-site-verification' content='e1KuNB3Ra89OIW6XF2otJtjEvUet9fC8ORoZTiIOj5E' />
                                    :
                                    ""
                                }
                            </Helmet>
                        }
                        <IonRow>
                            <IonCol sizeXl='1.5' sizeLg='3' sizeMd='2.5' sizeXs='2' sizeSm='2'>
                                <Link to={`/${getUserLanguage()}${getUserLocationForParam()}/home`}>
                                    <CustomImg className='header-logo' src={logo} alt="logo" />
                                </Link>
                            </IonCol>
                            <IonCol sizeXl='4' sizeLg='0' sizeMd='0' sizeXs='0'>
                                {(!isTabletPortrait) && WebNavigationHeader()}
                            </IonCol>
                            <IonCol sizeLg='0' sizeXl='0' sizeMd='0' sizeSm='0' sizeXs={isIn() ? '6' : '3.5'}>
                                <IonItem color='transparent' lines='none' className='custom-ion-item'>
                                    <IonIcon onClick={() => { setUniversalSearch(!universalSearch) }} className='mobile-universal-icon' icon={searchOutline} />
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXl='2.8' sizeLg='4' sizeMd='4' sizeSm='4.5' sizeXs="0">
                                <IonItem color='transparent' lines='none' className='custom-ion-item'>
                                    <div className='global-search-header-en'>
                                        <span>
                                            <input onClick={() => { setGlobalSearch(!globalSearch); setSearchKeyWord("") }} autoComplete='off' id='globalSearch-input' placeholder={dataLocalization.Search_your_device} type="text" value={searchKeyWord} onChange={(e) => setSearchKeyWord(e.target.value)} className={`global-search-header-input`} />
                                            <IonIcon slot={(isTabletPortrait) ? "" : "end"} className='cursor-pointer' icon={searchOutline} />
                                        </span>
                                    </div>
                                </IonItem>
                            </IonCol>
                            <IonCol sizeXl='1.5' sizeLg='2' sizeSm='2' sizeMd={isIn() ? '3' : '2.5'} sizeXs='0'>
                                <IonItem color='transparent' lines='none' className='location-chip' onClick={() => setLocationModel(true)}>
                                    <IonIcon size='small' icon={locationOutline}></IonIcon>
                                    <IonLabel className='header-location'>{getUserLocation() ? getUserLocation() : dataLocalization.Select_City}</IonLabel>
                                </IonItem>
                            </IonCol>
                            {
                                !isIn() &&
                                <IonCol sizeXl='0.8' sizeLg='0.6' sizeSm='1' sizeMd='0.8' sizeXs='2.5' className='p-0 mt-5 align-self-center'>
                                    <IonItem lines='none' color='transaparent' className='custom-ion-item lang-item-style'>
                                        {/* <IonText className={`${getUserLanguage() === "ae_ar" ? 'ln-btn-ar' : 'ln-btn-en cursor-pointer'}`} onClick={() => languageHandler()}>{getUserLanguage() == "ae_en" ? 'أر' : 'En'}</IonText> */}
                                        <IonImg className='lang-img cursor-pointer' onClick={() => languageHandler()} src={uaeimage} alt="uae-flag"></IonImg>
                                        <IonText className='lang-text cursor-pointer' onClick={() => languageHandler()}>{getUserLanguage() == "ae_en" ? 'أر' : 'En'}</IonText>
                                    </IonItem>

                                </IonCol>
                            }

                            <IonCol sizeXl='1.2' sizeLg='2' sizeMd='2' sizeSm='2' sizeXs='2.8' className='p-0 mt-6'>
                                <IonItem lines='none' color='transaparent' className='custom-ion-item'>
                                    {personId ?
                                        // <IonMenuButton slot='end'>
                                        //     <IonButton color='white' size='small' shape='round'>
                                        //         <b><IonText className='text_align'>{getLocalStorage()?.FirstName.charAt(0)}</IonText></b>
                                        //     </IonButton>
                                        // </IonMenuButton>

                                        <IonMenuButton slot='end'>
                                            <IonButton size='small' className='af-loginbtn'>
                                                <IonLabel>{getLocalStorage()?.FirstName.charAt(0)}</IonLabel>
                                            </IonButton>
                                        </IonMenuButton>

                                        :
                                        <Button className='header-btn' variant="contained" onClick={() => loginHandler()}>{dataLocalization.Login}</Button>
                                    }
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonModal className={`modal-login ${modelStyleHandler()}`} isOpen={modeIsOpen} onDidDismiss={() => { dispatch(modelChanger(false)); dispatch(resetModelChanger()); dispatch(modelChangerClose(true)) }}>
                            {selectedPage === routerPage.LOGIN &&
                                <LoginMobileNumber />
                            }
                            {selectedPage === routerPage.VERIFY &&
                                <VerificationScreen />
                            }
                            {selectedPage === routerPage.REGISTER &&
                                <Registration />
                            }
                            {selectedPage === routerPage.ForgotPassword &&
                                <ForgotPassword />
                            }
                            {selectedPage === routerPage.PasswordReset &&
                                <PasswordReset />
                            }
                            {selectedPage === routerPage.VerifyOtp &&
                                <VerifyOtp />
                            }
                            {selectedPage === routerPage.FindLocation &&
                                <FindLocation />
                            }
                            {selectedPage === routerPage.FindDevice &&
                                <FindDevice />
                            }
                        </IonModal>
                        <IonModal isOpen={locationModel} className="modal-location" canDismiss={true}
                            onDidDismiss={() => setLocationModel(false)}>
                            <LocationModel isValid={getValidLocation} showModel={setLocationModel} locationlist={locationlist} />
                        </IonModal>
                    </IonGrid >
                </IonToolbar>
                {universalSearch &&
                    <UniversalSearch setUniversalSearch={setUniversalSearch} />
                }
                <IonRow className={!isDesktop ? "mt-7" : "mt-n-5"} hidden={(searchKeyWord.length < 3)}>
                    <IonCol sizeXl='5' offsetXl='7' sizeLg='7' offsetLg='5' sizeMd='12' sizeXs='12' hidden={!globalSearch}>
                        <GlobalSearch searchKeyWord={searchKeyWord} />
                    </IonCol>
                </IonRow>
            </IonHeader>
        </>

    )
}

function WebNavigationHeader() {

    let dataLocalization = Language[getUserLanguage()];
    let history = useHistory();
    let dispatch = useTypedDispatch();

    const routerHandler = (type: "/home" | "/about-us" | "/contact-us" | "/sell-your-old-device" | "/Repair-Device" | "/faq") => {
        dispatch(pageChange("selectdevice"));
        dispatch(RepairpageChange("selectdevice"));

        history.push(`/${getUserLanguage()}${getUserLocationForParam()}${type}`);
    }

    return (
        <IonGrid>
            <IonRow>
                <IonCol sizeXl='2.5' sizeLg='2' sizeMd='2.4' sizeXs='0'>
                    <IonRouterLink color='warning' className='header-link cursor-pointer' onClick={() => routerHandler("/sell-your-old-device")}>
                        <IonText> {dataLocalization.SELL}</IonText>
                    </IonRouterLink>
                </IonCol>
                {/* <IonCol sizeXl='2.4' sizeLg='2.3' sizeMd='2.4' sizeXs='0'>
                    <IonRouterLink color='warning' className='header-link cursor-pointer' onClick={() => routerHandler("/sell-your-old-device")}>
                        <IonText> BUY</IonText>
                    </IonRouterLink>
                </IonCol> */}
                <IonCol sizeXl='3.5' sizeLg='4' sizeMd='3.2' sizeXs='0'>
                    <IonRouterLink className="header-link cursor-pointer" color='warning' onClick={() => routerHandler("/about-us")}>
                        <IonText className='hd_aboutus-style'> {dataLocalization.ABOUT_US}</IonText>
                    </IonRouterLink>
                </IonCol>
                <IonCol sizeXl='3' sizeLg='3' sizeMd='3' sizeXs='0'>
                    <IonRouterLink className="header-link cursor-pointer" color='warning' onClick={() => routerHandler("/contact-us")}>
                        <IonText> {dataLocalization.CONTACT}</IonText>
                    </IonRouterLink>
                </IonCol>
                <IonCol sizeXl='3' sizeLg='3' sizeMd='2.4' sizeXs='0'>
                    <IonRouterLink className="header-link cursor-pointer" color='warning' onClick={() => routerHandler("/faq")}>
                        <IonText>{dataLocalization.FAQS}</IonText>
                    </IonRouterLink>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default Header