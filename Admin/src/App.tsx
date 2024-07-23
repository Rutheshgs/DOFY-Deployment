import { Redirect, Route } from "react-router-dom";
import { IonApp, IonPage, IonRouterOutlet, IonSplitPane, isPlatform, setupIonicReact, } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Geolocation } from "@capacitor/geolocation";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "swiper/css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css"

import { getLocalStorage } from "./components/helper/Helper";

import HomePage from "./pages/homepage/HomePage";
import Home from "./pages/home/Home";
import Menu from "./components/menu/Menu";
import CreateEdit from "./pages/User/CreateEdit";
import UserDashbord from "./pages/User/UserDashbord/UserDashbord";
import Login from "./pages/login/Login";
import DashBoard from "./pages/dashboard/DashBoard";
import StepOne from "./pages/forgetpassword/stepone/StepOne";
import PasswordReset from "./pages/forgetpassword/passwordreset/PasswordReset";
import OtpVerification from "./pages/forgetpassword/otpverification/OtpVerification";
import AgentTicketView from "./pages/agentticketview/AgentTicketView";
import FinalDocumentVerify from "./pages/finaldocumentverify/FinalDocumentVerify";
import Requote from "./pages/reqoute/Requote";
import TechnicianHistory from "./pages/technicianhistory/TechnicianHistory";
import Header from "./components/header/Header";
import ProductValue from "./pages/productvalue/ProductValue";
import RepairRequote from "./pages/repairrequote/RepairRequote";
import ProductPercent from "./pages/productpercent/ProductPercent";
import AddProduct from "./pages/addproduct/AddProduct";
import TimeDateSlot from "./components/timedateslot/TimeDateSlot";
import Seo from "./pages/seo/Seo";
import SeoDashboard from "./pages/seo/SeoDashbord/SeoDashboard";
import { useTypedDispatch } from "./features/reduxhooks/ReduxHooks";
import { useEffect, useState } from "react";
import { findDeviceDetail } from "./features/reducers/finddevice/FindDevice.Reducers";
import SuccessScreen from "./pages/successscreen/SuccessScreen";
import { getDecodedAccessToken, isRider } from "./components/helper/TokenHelper";
import { HelperConstant } from "./components/helper/HelperConstant";
import View from "./components/view/View";
import ModelVarientDashbord from "./pages/ModelVariant/ModelVariantDashboard/ModelVariantDashboard";
import ModelVariantCreate from "./pages/ModelVariant/CreateEdit/ModelVariantCreate";
import SeriesModelDashBoard from "./pages/SeriesModel/SeriesModelDashboard/SeriesModelDashBoard";
import SeriesModelCreate from "./pages/SeriesModel/SeriesModelDashboard/CreateEdit/SeriesModelCreate";
import SeriesModelEdit from "./pages/SeriesModel/SeriesModelDashboard/CreateEdit/SeriesModelEdit";
import ModelVariantEdit from "./pages/ModelVariant/CreateEdit/ModelVariantEdit";
import { FilterDataId } from "./features/reducers/filterdata/FilterData.Reducers";
import SectionPage from "./pages/sectionpage/SectionPage";
import ProductReport from "./pages/productReport/ProductReport";

setupIonicReact();

const App: React.FC = () => {

  const dispatch = useTypedDispatch();

  const isAdmin = getDecodedAccessToken(getLocalStorage().Token)?.RoleId === HelperConstant.Roles.Admin;

  const [isToday, setIsToday] = useState(true);

  const smallScreen = window.matchMedia("(max-width:576px)");
  const mediumScreen = window.matchMedia("(max-width:1024px) and (min-width:577px)");
  const largeScreen = window.matchMedia("(max-width:1919px) and (min-width:1025px)");
  const extraLargeScreen = window.matchMedia("(min-width:1920px)");

  useEffect(() => {

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

    smallScreen.addListener(isMobileDevice);
    mediumScreen.addListener(isTabletDevice);
    largeScreen.addListener(isDesktopDevice);
    extraLargeScreen.addListener(extraLargeScreenDevice);

    isMobileDevice(smallScreen);
    isTabletDevice(mediumScreen);
    isDesktopDevice(largeScreen);
    extraLargeScreenDevice(extraLargeScreen);

  }, [smallScreen, mediumScreen, largeScreen, extraLargeScreen, dispatch]);

  useEffect(() => {
    let today = new Date();
    let priorDate = new Date(new Date().setDate(today.getDate() - 90));

    dispatch(FilterDataId({ payload: priorDate, type: "FromDate" }));
    dispatch(FilterDataId({ payload: null, type: "ToDate" }));

  }, [dispatch]);

  useEffect(() => {
    if (isPlatform("android") || isPlatform("ios")) {
      Geolocation.requestPermissions();
    }
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        {getLocalStorage()?.Token && <Header />}
        <IonSplitPane when="2xl" contentId="main">
          {getLocalStorage()?.Token && <Menu today={isToday} />}
          <IonPage id="main" >
            <IonRouterOutlet id="main">
              {/* <Route path="/" exact={true} component={DashBoard} /> */}
              <Route path="/" exact={true} >
                {isRider() ? <Redirect to="/HomePage" /> : <DashBoard />}
              </Route>
              <Route path="/HomePage" exact={true}><HomePage setToday={setIsToday} /></Route>
              <Route path="/Home" exact={true} component={Home} />
              <Route path="/login" exact={true} component={Login} />
              <Route path='/Sectionpage' exact={true} component={SectionPage} />
              <Route path="/DashBoard/:orderId" exact={true} component={DashBoard} />
              <Route path="/StepOne" exact={true} component={StepOne} />
              <Route path="/OtpVerification" exact={true} component={OtpVerification} />
              <Route path="/PasswordReset" exact={true} component={PasswordReset} />
              <Route path="/User" exact={true} component={CreateEdit} />
              <Route path="/User/:id" exact={true} component={CreateEdit} />
              <Route path="/Profile/:id" exact={true} component={CreateEdit} />
              <Route path="/UserDashbord" exact={true} component={UserDashbord} />
              <Route path="/AgentTicketView/:id" exact={true} component={AgentTicketView} />
              <Route path="/FinalDocumentVerify/:id" exact={true} component={FinalDocumentVerify} />
              <Route path="/requote/:id" exact={true} component={Requote} />
              {isAdmin ?
                <Route path="/technicianhistory/:id" exact={true} component={TechnicianHistory} />
                :
                <Route path="/technicianhistory/:orderId" exact={true} component={TechnicianHistory} />
              }
              <Route path="/productvalue" exact={true} component={ProductValue} />
              <Route path="/RepairRequote" exact={true} component={RepairRequote} />
              <Route path="/productthreshold" exact={true} component={ProductPercent} />
              <Route path="/AddProduct" exact={true} component={AddProduct} />
              <Route path="/TimeDateSlot/:orderId" exact={true} component={TimeDateSlot} />
              <Route path="/reschedule/:orderId" exact={true} component={TimeDateSlot} />
              <Route path="/Seo" exact={true} component={Seo} />
              <Route path="/Seo/:id" exact={true} component={Seo} />
              <Route path="/SeoDashboard" exact={true} component={SeoDashboard} />
              <Route path="/SuccessScreen/:orderId" exact={true} component={SuccessScreen} />
              <Route path="/View/:id" exact={true} component={View} />
              <Route path="/ModelVarientDashbord" exact={true} component={ModelVarientDashbord} />
              <Route path="/ModelVarient" exact={true} component={ModelVariantCreate} />
              <Route path="/ModelVarient/:id" exact={true} component={ModelVariantEdit} />
              <Route path="/SeriesModelDashbord" exact={true} component={SeriesModelDashBoard} />
              <Route path="/SeriesModel" exact={true} component={SeriesModelCreate} />
              <Route path="/SeriesModel/:id" exact={true} component={SeriesModelEdit} />
              <Route path="/ProductReport" exact={true} component={ProductReport} />

            </IonRouterOutlet>
          </IonPage>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp >
  )
};

export default App;
