import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { locationOutline, searchOutline } from "ionicons/icons";

import logo from "@/assets/images/phase2/dofy-logo.png";
import uaeimage from '@/assets/images/uaeimage.png';

import "./Header.css";

import { getLocalStorage, getUserLanguage, getUserLocation, getUserLocationForParam, localStorageClearHandler } from '../helper/Helper';

import { useTypedDispatch, useTypedSelector } from '@/features/reduxhooks/ReduxHooks';
import { pageChange } from '@/features/reducers/selldevice/PageChange.Reducer';
import { RepairpageChange } from '@/features/reducers/repair/RepairPageChange.Reducer';
import { modelChanger, resetModelChanger, modelChangerClose } from '@/features/reducers/login/LoginModel.Reducer';
import { userLocationChanger } from '@/features/reducers/locationmodal/Location.Reducers';
import { newUser } from '@/features/reducers/registration/Registration.Reducers';

import VerificationScreen from '@/components/login/verificationscreen/VerificationScreen';
import Registration from '@/components/registration/Registrations';
import ForgotPassword from '@/components/forgetpassword/ForgotPassword';
import PasswordReset from '@/components/passwordreset/PasswordReset';
import VerifyOtp from '@/components/verifyotp/VerifyOtp';

import { HelperConstant } from '@/components/helper/HelperConstant';

import MasterServices from '@/services/Master.Services';

import Language from './Header.json';
import dynamic from 'next/dynamic';
import { Avatar, Button, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { ISeriesModel } from '@/models/SeriesModel.Model';
import { IonGrid, IonHeader, IonItem, IonRouterLink, IonText, IonToolbar } from '@ionic/react';


const IonModal = dynamic(() => import('@ionic/react').then(mod => mod.IonModal), { ssr: false });
const IonAlert = dynamic(() => import('@ionic/react').then(mod => mod.IonAlert), { ssr: false });
const IonCol = dynamic(() => import('@ionic/react').then(mod => mod.IonCol), { ssr: false });
const IonRow = dynamic(() => import('@ionic/react').then(mod => mod.IonRow), { ssr: false });

const LoginMobileNumber = dynamic(() => import('@/components/login/loginscreen/LoginScreen').then(mod => mod.default), { ssr: false });
const MyAccount = dynamic(() => import('@/components/myaccount/Myaccount'), { ssr: false });
const GlobalSearch = dynamic(() => import('@/components/globalsearch/GlobalSearch'), { ssr: false });
const LocationModel = dynamic(() => import('@/components/locationmodal/LocationModal').then(mod => mod.default), { ssr: false });
const UniversalSearch = dynamic(() => import('@/components/universalsearch/UniversalSearch').then(mod => mod.default), { ssr: false });
const FindLocation = dynamic(() => import('@/components/findlocation/FindLocation').then(mod => mod.default), { ssr: false });
const FindDevice = dynamic(() => import('@/components/findlocation/FindLocation').then(mod => mod.default), { ssr: false });

function Header() {

    let dispatch = useTypedDispatch();
    let dataLocalization = Language[getUserLanguage()];

    const personId = getLocalStorage()?.PersonId;

    let modeIsOpen = useTypedSelector(state => state.ModelChangerReducer.isOpen);
    let selectedPage = useTypedSelector(state => state.ModelChangerReducer.selectedPage);
    let isLocation = useTypedSelector(state => state.userLocation.isLocation);
    let isDesktop = useTypedSelector(state => state.FindDevice.isDesktop);
    let isTabletPortrait = useTypedSelector(state => state.FindDevice.isTabletPortrait);

    const [locationlist, setLocationList] = useState<Array<any>>([]);
    const [locationModel, setLocationModel] = useState(false);
    const [globalSearch, setGlobalSearch] = useState(false);
    const [universalSearch, setUniversalSearch] = useState(false);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [globalData, setGlobalData] = useState<Array<ISeriesModel>>([]);

    const routerPage = {
        LOGIN: "login",
        VERIFY: "verification",
        REGISTER: "register",
        ForgotPassword: "forgot-password",
        PasswordReset: "password-reset",
        VerifyOtp: "verify-otp",
        FindLocation: "find-location",
        FindDevice: "find-device",
        MyAccount: "my-account"
    }

    // const getGeoLocation = () => {
    //     MasterServices.GetAllDofyGeo(HelperConstant.serviceTypeId.SELL, "", "").then(res => {
    //         if (res.status === 200) {
    //             setLocationList(res.data);
    //         }
    //     }).catch(e => {
    //         console.log(e);
    //     });
    // }

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
            localStorage.setItem("Ln", 'ae_en');
            window.location.href = `/${constructedPath}/${defaultPath}`;
        }
        else {
            let constructedPath = window.location.pathname.split('/').splice(1)[0] = "ae_ar".toString().replaceAll(',', '/');
            localStorage.setItem("Ln", 'ae_ar');
            window.location.href = `/${constructedPath}/${defaultPath}`;
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

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const logout = () => {
        localStorageClearHandler();
        window.location.href = "/";
    }

    const openNav = () => {
        let open = document.getElementById('mySidenav');
        if (open!.style.width.includes('300')) {
            closeNav();
        }
        else {
            setTimeout(() => { open!.style.width = '300px' }, 100);
        }
    }

    const closeNav = () => {
        let close = document.getElementById('mySidenav');
        close!.style.width = '0px';
    }


    function handleKeyDown(e: any) {
        const { key } = e;
        if (key === "Escape") closeNav();
    }

    const getGlobalDataSearch = (searchText: any, LanguageCode: any, CountryCode: any) => {
        if (searchText != "") {
            MasterServices.GetAllSeriesModelBysearch(searchText, LanguageCode, CountryCode).then(res => {
                if (res.status === 200) {
                    setGlobalData(res.data);
                }
            }).catch(e => {
                console.log(e);
            });
        }
        else {
            setGlobalData([]);
        }
    }


    useEffect(() => {
        const autoInput = document.getElementById('globalSearch-input');
        autoInput?.addEventListener("focusin", () => {
            setSearchKeyWord("");
        });
        autoInput?.addEventListener("focusout", () => {
            setTimeout(() => { setGlobalSearch(false); setSearchKeyWord("") }, 200);
        });

        return () => {
            autoInput?.removeEventListener("focusin", () => {
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

        // getGeoLocation();
        setTimeout(() => { setIsToastOpen(true) }, 2000);

    }, [dispatch, modeIsOpen, isLocation]);

    return (
        <>
            <IonHeader style={{ position: "unset" }}>
                <IonToolbar class='header-grid' style={{ backgroundColor: ('#1E4496') }}>
                    <IonGrid class='p-0'>
                        <IonRow>
                            <IonCol size-xl='1.5' size-lg='3' size-md='2.5' size-xs={getUserLanguage() === "in_en" ? '5.5' : '2'} size-sm='2'>
                                <Link href={`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/`}>
                                    <img className='header-logo' src={logo.src} alt="logo" />
                                </Link>
                            </IonCol>
                            <IonCol style={{ margin: "auto 0px" }} size-xl='4' size-lg='0' size-md='0' size-xs='0'>
                                {(!isTabletPortrait) && WebNavigationHeader()}
                            </IonCol>
                            <IonCol size-lg='0' size-xl='0' size-md='0' size-sm='0' size-xs={getUserLanguage() === "in_en" ? '2' : '3.9'}>
                                <IonItem color='transparent' lines='none' class='custom-ion-item'>
                                    <ion-icon onClick={() => { setUniversalSearch(!universalSearch) }} class='mobile-universal-icon' icon={searchOutline} />
                                </IonItem>
                            </IonCol>
                            <IonCol size-xl='2.8' size-lg='4' size-md='4' size-sm='4.5' size-xs="0">
                                <IonItem color='transparent' lines='none' class='custom-ion-item'>
                                    <div className='global-search-header-en'>
                                        <span>
                                            <input onClick={() => { setGlobalSearch(!globalSearch); setSearchKeyWord("") }} autoComplete='off' id='globalSearch-input' placeholder={dataLocalization.Search_your_device} type="text" value={searchKeyWord} onChange={(e) => { getGlobalDataSearch(e.target.value, "", ""); setSearchKeyWord(e.target.value) }} className={`global-search-header-input`} />
                                            <ion-icon slot={(isTabletPortrait) ? "" : "end"} class='cursor-pointer' icon={searchOutline} />
                                        </span>
                                    </div>
                                </IonItem>
                            </IonCol>
                            <IonCol size-xl='1.5' size-lg='2' size-sm='2' size-md={getUserLanguage() === "in_en" ? '3' : '2'} size-xs='0'>
                                <IonItem color='transparent' lines='none' class='location-chip' onClick={() => setLocationModel(true)}>
                                    <ion-icon size='small' icon={locationOutline}></ion-icon>
                                    <ion-label class='header-location'>{getUserLocation() ? getUserLocation() : dataLocalization.Select_City}</ion-label>
                                </IonItem>
                            </IonCol>
                            {
                                !(getUserLanguage() === "in_en") &&
                                <IonCol size-xl='0.8' size-lg='0.6' size-sm='1' size-md='1' size-xs='2' class='p-0 mt-5 h-lang-style'>
                                    <IonItem lines='none' color='transaparent' class='custom-ion-item lang-item-style'>
                                        <img className='lang-img cursor-pointer' onClick={() => languageHandler()} src={uaeimage.src} alt="uae-flag"></img>
                                        <IonText class='lang-text cursor-pointer' onClick={() => languageHandler()}>{getUserLanguage() == "ae_en" ? 'أر' : 'En'}</IonText>
                                    </IonItem>
                                </IonCol>
                            }

                            <IonCol size-xl='1.2' size-lg='2' size-md='2' size-sm='2' size-xs='3' class='p-0 mt-6' onKeyDown={handleKeyDown}>
                                <IonItem lines='none' color='transaparent' class='custom-ion-item'>
                                    {personId ?
                                        <Tooltip title="My Account">
                                            <IconButton
                                                onClick={() => openNav()}
                                                size="small"
                                                sx={{ ml: 5 }}>
                                                <Avatar style={{ backgroundColor: "#2d4fb0", fontSize: "small" }} sx={{ width: 30, height: 30 }} className='avatar-icon'>
                                                    <ion-label style={{ fontSize: "x-small", fontWeight: "bold" }}> {getLocalStorage()?.FirstName.charAt(0).toUpperCase()}</ion-label>
                                                </Avatar>
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <Button className='header-btn' variant="contained" onClick={() => loginHandler()}>{dataLocalization.Login}</Button>
                                    }

                                </IonItem>
                            </IonCol>
                        </IonRow>
                        {modeIsOpen && <IonModal cssClass={`modal-login ${modelStyleHandler()}`} isOpen={modeIsOpen} onDidDismiss={() => { dispatch(modelChanger(false)); dispatch(resetModelChanger()); dispatch(modelChangerClose(true)) }}>
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
                                <FindLocation direction={''} language={'in_en'} />
                            }
                            {selectedPage === routerPage.FindDevice &&
                                <FindDevice direction={''} language={'in_en'} />
                            }
                            {selectedPage === routerPage.MyAccount &&
                                <MyAccount />
                            }
                        </IonModal>
                        }
                        {locationModel && <IonModal isOpen={locationModel} cssClass="modal-location"
                            onDidDismiss={() => setLocationModel(false)}>
                            <LocationModel isValid={getValidLocation} showModel={setLocationModel} />
                        </IonModal>
                        }
                    </IonGrid >
                </IonToolbar>
                <IonAlert isOpen={isAlertOpen}
                    onDidDismiss={() => setIsAlertOpen(false)}
                    header={"Confirmation"}
                    subHeader="Are you sure to logout?"
                    buttons={[{
                        text: "Yes",
                        handler: () => logout()
                    }, {
                        text: "Cancel",
                        handler: () => setIsAlertOpen(false)
                    }]}
                />
                {universalSearch &&
                    <UniversalSearch setUniversalSearch={setUniversalSearch} />
                }
                <IonRow class={!isDesktop ? "mt-7" : "mt-n-5"} style={{ zIndex: 1, position: "absolute", width: "100%" }}>
                    <IonCol size-xl='5' offsetXl='7' size-lg='7' offsetLg='5' size-md='12' size-xs='12' hidden={!globalSearch}>
                        <GlobalSearch searchKeyWord={searchKeyWord} globalData={globalData} />
                    </IonCol>
                </IonRow>
            </IonHeader>
        </>

    )
}

function WebNavigationHeader() {

    let dataLocalization = Language[getUserLanguage()];
    let history = useRouter();
    let dispatch = useTypedDispatch();

    const routerHandler = (type: "/" | "/about-us" | "/contact-us" | "/sell-your-old-device" | "/Repair-Device" | "/faq") => {
        dispatch(pageChange("selectdevice"));
        dispatch(RepairpageChange("selectdevice"));

        history.push(`/${getUserLanguage()}${type}`);
    }
    const routerHandlers = (type: "/" | "/sell-your-old-device") => {
        dispatch(pageChange("selectdevice"));
        dispatch(RepairpageChange("selectdevice"));

        history.push(`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}${type}`);
    }

    return (
        <IonGrid>
            <IonRow>
                <IonCol size-xl='2.5' size-lg='2' size-md='2.4' size-xs='0'>
                    <IonRouterLink color='warning' class='header-link cursor-pointer' onClick={() => routerHandlers("/sell-your-old-device")}>
                        <IonText> {dataLocalization.SELL}</IonText>
                    </IonRouterLink>
                </IonCol>
                <IonCol size-xl='3.5' size-lg='4' size-md='3.2' size-xs='0'>
                    <IonRouterLink class="header-link cursor-pointer" color='warning' onClick={() => routerHandler("/about-us")}>
                        <IonText class='hd_aboutus-style'> {dataLocalization.ABOUT_US}</IonText>
                    </IonRouterLink>
                </IonCol>
                <IonCol size-xl='3' size-lg='3' size-md='3' size-xs='0'>
                    <IonRouterLink class="header-link cursor-pointer" color='warning' onClick={() => routerHandler("/contact-us")}>
                        <IonText> {dataLocalization.CONTACT}</IonText>
                    </IonRouterLink>
                </IonCol>
                <IonCol size-xl='3' size-lg='3' size-md='2.4' size-xs='0'>
                    <IonRouterLink class="header-link cursor-pointer" color='warning' onClick={() => routerHandler("/faq")}>
                        <IonText>{dataLocalization.FAQS}</IonText>
                    </IonRouterLink>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default Header