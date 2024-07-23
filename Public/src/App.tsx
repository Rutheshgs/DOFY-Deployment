import { useEffect, useRef, Suspense, lazy, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { IonApp, IonPage, IonContent, IonRouterOutlet, IonSplitPane, setupIonicReact, isPlatform } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { SplashScreen } from '@capacitor/splash-screen';
import { Filesystem } from '@capacitor/filesystem';
import { PushNotifications } from '@capacitor/push-notifications';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { AppUpdate } from "@robingenz/capacitor-app-update";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "swiper/css";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import "./App.css";

// import { SplashScreen } from '@capacitor/splash-screen';

import { getLocalStorage, getUserLanguage, getUserLocationForParam, isMobilePlatform, localStorageClearHandler } from './components/helper/Helper';
import { useTypedDispatch, useTypedSelector } from './features/reduxhooks/ReduxHooks';
import { findDeviceDetail } from './features/reducers/finddevice/FindDevice.Reducers';
import { Geolocation } from "@ionic-native/geolocation";

import axios from 'axios';
import Home from './pages/home/Home';
import Menu from './components/menu/Menu';
import Header from './components/header/Header';
import Loader from './components/loader/Loader';
import BottomNavigation from './components/bottomnavigation/BottomNavigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HelperConstant } from './components/helper/HelperConstant';
import MasterServices from './services/Master.Services';
import AppUpdateUI from './components/appupdateUI/AppUpdateUI';

const SellDevice = lazy(() => import("./pages/sell/SellDevice"));
const SelectBrand = lazy(() => import('./pages/sell/selectbrand/SelectBrand'));
const SelectModel = lazy(() => import('./pages/sell/selectmodel/SelectModel'));
const SellYourDevice = lazy(() => import("./pages/sellyourdevice/SellYourDevice"));
const Schedule = lazy(() => import('./pages/schedule/Schedule'));
const OrderSummary = lazy(() => import('./pages/ordersummary/OrderSummary'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const About = lazy(() => import('./pages/about/About'));
const TermsOfUse = lazy(() => import('./pages/policy/termsofuse/TermsOfUse'));
const PrivacyPolicy = lazy(() => import('./pages/policy/privacypolicy/PrivacyPolicy'));
const ViewOrders = lazy(() => import('./pages/vieworders/ViewOrders'));
const DevicesDetails = lazy(() => import('./pages/sell/devicedetails/DevicesDetails'));
const FAQ = lazy(() => import('./pages/policy/faq/FAQ'));
const Address = lazy(() => import('./pages/address/Address'));

setupIonicReact();

type AppUpdateProps = { Android_Version: string, IOS_Version: string, Android_Forced_Update: boolean, IOS_Forced_Update: boolean }

const Apps: React.FC = () => {
  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const IOSJsonPath = window.location.pathname.includes(".well-known/apple-app-site-association");
  let locationPermision = localStorage.getItem('permission');

  // let defaultPath = window.location.pathname.includes("sell-your-old") ? (getUserLocationForParam() != "" ? window.location.pathname?.split('/')[3]?.split('-')?.at(-1) : window.location.pathname?.split('/')[2]?.split('-')?.at(-1)) : "phone";

  // const defaultPath = (): string => {
  //   if (window.location.pathname.includes("sell-your-old")) {
  //     let pathIndex = window.location.pathname.search("old");
  //     return window.location.pathname.slice(pathIndex + "old-".length);
  //   }
  //   return "";
  // }

  const [flexibleUpdate, setFlexibleUpdate] = useState(false);
  const [forcedUpdate, setForcedUpdate] = useState(false);

  let androidDevice = isPlatform("android");
  let IOSDevice = isPlatform("ios");
  let notNowUpdate = window.localStorage.getItem(HelperConstant.noUpdate);

  const performImmediateUpdate = async () => {
    setForcedUpdate(true);
    setFlexibleUpdate(false);
    localStorage.removeItem(HelperConstant.noUpdate);
  };

  const startFlexibleUpdate = async () => {
    setForcedUpdate(false);
    setFlexibleUpdate(true);
  };

  const noUpdate = async () => {
    setForcedUpdate(false);
    setFlexibleUpdate(false);
    window.localStorage.setItem(HelperConstant.noUpdate, HelperConstant.noUpdate);
  };

  const dailyUpdateHandler = () => {
    const hours = HelperConstant.updateTime;
    const setHoursLimit = hours * 60 * 60 * 1000;
    const now = new Date().getTime() as any;
    const setupTime = localStorage.getItem('setupTime');

    if (setupTime == null) {
      localStorage.setItem('setupTime', now);
    } else {
      if (now - parseInt(setupTime) > setHoursLimit) {
        localStorage.removeItem(HelperConstant.noUpdate);
        localStorage.setItem('setupTime', now);
      }
    }
  }

  const checkAppVersion = async (data: AppUpdateProps) => {
    await AppUpdate.getAppUpdateInfo().then((res) => {
      if ((res.currentVersion !== (androidDevice ? data.Android_Version : IOSDevice ? data.IOS_Version : null) && (androidDevice ? data.Android_Forced_Update : IOSDevice ? data.IOS_Forced_Update : false) === true)) {
        return performImmediateUpdate();
      }
      if ((res.currentVersion !== (androidDevice ? data.Android_Version : IOSDevice ? data.IOS_Version : null) && (androidDevice ? data.Android_Forced_Update : IOSDevice ? data.IOS_Forced_Update : false) === false)) {
        return startFlexibleUpdate();
      }
      else {
        return noUpdate();
      }
    }).catch((e) => {
      console.log(e);
    });
  };

  const getAppUpdate = () => {
    MasterServices.GetAppUpdate().then((res) => {
      if (res.status === 200) {
        checkAppVersion(res.data);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  // const activeUser = UseActive(10000);

  const dispatch = useTypedDispatch();

  const isTabletPortrait = useTypedSelector(state => state.FindDevice.isTabletPortrait);

  let routerPath = useTypedSelector(state => state.PageChangeReducer.page);

  const xtraSmallScreen = window.matchMedia("(max-width:375px)");
  const smallScreen = window.matchMedia("(max-width:576px)");
  const tabletPortrait = window.matchMedia("(max-width:1024px)");
  const mediumScreen = window.matchMedia("(max-width:1024px) and (min-width:577px)");
  const largeScreen = window.matchMedia("(max-width:1919px) and (min-width:1025px)");
  const extraLargeScreen = window.matchMedia("(min-width:1920px)");

  useEffect(() => {

    const isSmallMobileDevice = (e: { matches: any; }) => {
      if (e.matches) {
        dispatch(findDeviceDetail({ payload: true, type: "smallmobile" }));
      }
      else {
        dispatch(findDeviceDetail({ payload: false, type: "smallmobile" }));
      }
    }

    const isMobileDevice = (e: { matches: any; }) => {
      if (e.matches) {
        dispatch(findDeviceDetail({ payload: true, type: "mobile" }));
      }
      else {
        dispatch(findDeviceDetail({ payload: false, type: "mobile" }));
      }
    }

    const isTabletDevice = (e: { matches: any; }) => {
      if (e.matches) {
        dispatch(findDeviceDetail({ payload: true, type: "tablet" }));
      }
      else {
        dispatch(findDeviceDetail({ payload: false, type: "tablet" }));
      }
    }

    const isTabletPortraitDevice = (e: { matches: any; }) => {
      if (e.matches) {
        dispatch(findDeviceDetail({ payload: true, type: "tabletportrait" }));
      }
      else {
        dispatch(findDeviceDetail({ payload: false, type: "tabletportrait" }));
      }
    }

    const isDesktopDevice = (e: { matches: any; }) => {
      if (e.matches) {
        dispatch(findDeviceDetail({ payload: true, type: "desktop" }));
      }
      else {
        dispatch(findDeviceDetail({ payload: false, type: "desktop" }));
      }
    }

    const extraLargeScreenDevice = (e: { matches: any; }) => {
      if (e.matches) {
        dispatch(findDeviceDetail({ payload: true, type: "extralarge" }));
      }
      else {
        dispatch(findDeviceDetail({ payload: false, type: "extralarge" }));
      }
    }

    xtraSmallScreen.addListener(isSmallMobileDevice);
    smallScreen.addListener(isMobileDevice);
    mediumScreen.addListener(isTabletDevice);
    tabletPortrait.addListener(isTabletPortraitDevice);
    largeScreen.addListener(isDesktopDevice);
    extraLargeScreen.addListener(extraLargeScreenDevice);

    isSmallMobileDevice(xtraSmallScreen);
    isMobileDevice(smallScreen);
    isTabletDevice(mediumScreen);
    isTabletPortraitDevice(tabletPortrait);
    isDesktopDevice(largeScreen);
    extraLargeScreenDevice(extraLargeScreen);

    return () => {
      xtraSmallScreen.removeListener(isSmallMobileDevice);
      smallScreen.removeListener(isMobileDevice);
      mediumScreen.removeListener(isTabletDevice);
      tabletPortrait.removeListener(isTabletPortraitDevice);
      largeScreen.removeListener(isDesktopDevice);
      extraLargeScreen.removeListener(extraLargeScreenDevice);
    }

  }, [xtraSmallScreen, smallScreen, mediumScreen, tabletPortrait, largeScreen, extraLargeScreen, dispatch]);

  const locationHandler = () => {
    Geolocation.getCurrentPosition().then((res) => {
      getExactAddress(res.coords.latitude, res.coords.longitude);
    }).catch((error) => {
      if (error) {
        localStorage.setItem('permission', 'deny');
        localStorage.setItem("Ln", 'in_en');
        if (locationPermision == null) {
          localStorageClearHandler();
          window.location.href = "/";
        }
      }
    });
  }

  const getExactAddress = (lat: number, lan: number) => {
    let api = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lan}&zoom=18&addressdetails=1`
    // let api = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lan}&key=03c48dae07364cabb7f121d8c1519492&no_annotations=1&language=en`
    axios.get(api).then(res => {
      if (res.status === 200) {
        let countryCode = res.data.address.country_code;
        // let countryCode = res.data.results[0].components.country_code;
        localStorage.setItem('permission', 'allow');
        if (countryCode == 'ae') {
          localStorage.setItem("Ln", 'ae_en');
        }
        else {
          localStorage.setItem("Ln", 'in_en');
        }
        if (locationPermision == null) {
          localStorageClearHandler();
          window.location.href = "/";
        }
      }
    }).catch(e => console.log(e));
  }

  useEffect(() => {
    SplashScreen.hide();
    if (locationPermision == null) {
      locationHandler();
    }
    if (isPlatform("android") || isPlatform("ios")) {
      Filesystem.requestPermissions();
      PushNotifications.requestPermissions();
      dailyUpdateHandler();
      if (!notNowUpdate) {
        getAppUpdate();
      }
    };

  }, []);

  useEffect(() => {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const UTM = event.url.split('dofy.in/home/').pop();
      if (UTM) {
        localStorage.setItem("UTM", UTM);
      }
    });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out-sine',
      delay: 100,
    });
    AOS.refresh();

    const captureUTM = () => {
      let UTM = window.location.hash;
      if (UTM) {
        localStorage.setItem("UTM", UTM);
      }
    }
    if (!isMobilePlatform()) {
      captureUTM();
    }
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <AppUpdateUI forcedUpdate={forcedUpdate} flexibleUpdate={flexibleUpdate} noUpdate={noUpdate} />
        {IOSJsonPath ? null : <Header></Header>}
        <IonSplitPane when="2xl" contentId='main'>
          {getLocalStorage()?.Token && <Menu />}
          <IonPage id="main">
            {/* {!isTabletPortrait && */}
            <IonRouterOutlet animated={true} className={`mt-50 ${isTabletPortrait && "navbar-margin"}`}>
              <IonContent scrollEvents={true} ref={contentRef}>

                {/* <Route path="/:ln/:geo?/" exact><Home /></Route> */}
                <Route path="/" exact={true} >
                  <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/home`} /> : <Home />
                </Route>

                {/* <Route path="/:ln/:geo?/" exact={true} >
                  <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/home`} /> : <Home />
                </Route> */}

                <Route path="/:ln/:geo?/home/" exact><Home /></Route>
                <Route path="/home" exact={true} >
                  <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/home/`} /> : <Home />
                </Route>

                <Suspense fallback={<Loader />}>
                  <Route path="/:ln/:geo?/sell-your-old-device"><SellDevice /></Route>
                  {HelperConstant.productTypeName.map((val, i) => (
                    <div key={i}>
                      <Route path={`/:ln/:geo?/sell-your-old-${val.Name}/`}><SelectBrand /></Route>
                      <Route path={`/:ln/:geo?/sell-your-old-${val.Name}/:brandNames/`}><SelectModel /></Route>
                      <Route path={`/:ln/:geo?/sell-your-old-${val.Name}/:brandNames/:modelId/`}><SellYourDevice /></Route>
                    </div>
                  ))}

                  <Route path="/sell-your-old-device" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`} /> : <SellDevice />
                  </Route>

                  {/* <Route path="/:ln/:geo?/sell-your-device/:modelId"><SellYourDevice /></Route>
                  <Route path="/sell-your-device" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-device/:modelId`} /> : <SellYourDevice />
                  </Route> */}

                  <Route path="/:ln/:geo?/schedule/:id"><Schedule /></Route>
                  <Route path="/schedule" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/schedule`} /> : <Schedule />
                  </Route>

                  <Route path="/:ln/:geo?/view-orders-details/:id"><OrderSummary /></Route>
                  <Route path="/view-orders-details" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/view-orders-details`} /> : <OrderSummary />
                  </Route>

                  <Route path="/:ln/:geo?/order-summary/:id"><OrderSummary /></Route>
                  <Route path="/order-summary" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/order-summary`} /> : <OrderSummary />
                  </Route>

                  <Route path="/:ln/:geo?/contact-us"><Contact /></Route>
                  <Route path="/contact-us" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/contact-us`} /> : <Contact />
                  </Route>

                  <Route path="/:ln/:geo?/about-us"><About /></Route>
                  <Route path="/about-us" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/about-us`} /> : <About />
                  </Route>

                  <Route path="/:ln/:geo?/terms-of-use"><TermsOfUse /></Route>
                  <Route path="/terms-of-use" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/terms-of-use`} /> : <TermsOfUse />
                  </Route>

                  <Route path="/:ln/:geo?/faq"><FAQ /></Route>
                  <Route path="/faq" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/faq`} /> : <FAQ />
                  </Route>

                  <Route path="/:ln/:geo?/privacy-policy"><PrivacyPolicy /></Route>
                  <Route path="/privacy-policy" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/privacy-policy`} /> : <PrivacyPolicy />
                  </Route>

                  <Route path="/:ln/:geo?/view-orders"><ViewOrders /></Route>
                  <Route path="/view-orders" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/view-orders`} /> : <ViewOrders />
                  </Route>

                  <Route path="/:ln/:geo?/saved-address"><Address /></Route>
                  <Route path="/saved-address" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/saved-address`} /> : <Address />
                  </Route>

                  <Route path="/:ln/:geo?/sell-device-details/:id"><DevicesDetails /></Route>
                  <Route path="/sell-device-details" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/sell-device-details`} /> : <DevicesDetails />
                  </Route>

                  <Route path="/:ln/:geo?/pending-order-detail/:id"><DevicesDetails /></Route>
                  <Route path="/pending-order-detail" exact={true} >
                    <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/pending-order-detail`} /> : <DevicesDetails />
                  </Route>
                </Suspense>
              </IonContent>
            </IonRouterOutlet>
            {/* } */}
            {/* {isTabletPortrait && <Route path="/" component={Tabs} />} */}
          </IonPage>
        </IonSplitPane>
        {isTabletPortrait && <BottomNavigation />}

        {/* <Footer /> */}
        {/* { isMobile ? '' : <ScrollToTop /> } */}
      </IonReactRouter>
    </IonApp>
  )
};

export default Apps;
