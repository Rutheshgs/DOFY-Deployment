import { useState, Suspense, lazy } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonImg, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';

import "./Tabs.css";

import Home from '../../pages/home/Home';
import Loader from '../loader/Loader';
import { getUserLanguage, getUserLocationForParam } from '../helper/Helper';
import home from '../../assets/images/phase2/home.png';
import sell from '../../assets/images/phase2/sell.png';
import about from '../../assets/images/phase2/About.png';
import contact from '../../assets/images/phase2/Contact.png';

import homeblue from '../../assets/images/phase2/Homeblue.png';
import sellblue from '../../assets/images/phase2/sellblue.png';
import aboutblue from '../../assets/images/phase2/Aboutblue.png';
import contactblue from '../../assets/images/phase2/Contactblue.png';

// import About from '../../pages/about/About';
// import Contact from '../../pages/contact/Contact';
// import LoginMobileNumber from '../../pages/login/loginscreen/LoginScreen';
// import LoginOtp from '../../pages/login/verificationscreen/VerificationScreen';
// import PrivacyPolicy from '../../pages/policy/privacypolicy/PrivacyPolicy';
// import Registration from '../../pages/registration/Registration';
// import Schedule from '../../pages/schedule/Schedule';
// import OrderSummary from '../../pages/ordersummary/OrderSummary';
// import DevicesDetails from '../../pages/sell/devicedetails/DevicesDetails';
// import SellDevice from '../../pages/sell/SellDevice';
// import ViewOrders from '../../pages/vieworders/ViewOrders';
// import MyAccount from '../myaccount/MyAccount';
// import TermsOfUse from '../../pages/policy/termsofuse/TermsOfUse';
// import FAQ from '../../pages/policy/faq/FAQ';

const SellDevice = lazy(() => import("../../pages/sell/SellDevice"));
const SellYourDevice = lazy(() => import("../../pages/sellyourdevice/SellYourDevice"));
const Schedule = lazy(() => import('../../pages/schedule/Schedule'));
const OrderSummary = lazy(() => import('../../pages/ordersummary/OrderSummary'));
const Contact = lazy(() => import('../../pages/contact/Contact'));
const About = lazy(() => import('../../pages/about/About'));
const TermsOfUse = lazy(() => import('../../pages/policy/termsofuse/TermsOfUse'));
const PrivacyPolicy = lazy(() => import('../../pages/policy/privacypolicy/PrivacyPolicy'));
const ViewOrders = lazy(() => import('../../pages/vieworders/ViewOrders'));
const DevicesDetails = lazy(() => import('../../pages/sell/devicedetails/DevicesDetails'));
const FAQ = lazy(() => import('../../pages/policy/faq/FAQ'));

// import RepairDevice from '../../pages/repair/RepairDevice';
// import RepairDevicesDetails from '../../pages/repair/repairdevicedetails/RepairDeviceDetails';
// import RepairSchedule from '../../pages/repair/repairschedule/RepairSchedule';
// import MyWishlist from '../../pages/mywishlist/MyWishlist';
// import CookiePolicy from '../../pages/policy/cookiepolicy/CookiePolicy';
// import Dataprotection from '../../pages/policy/dataprotection/DataProtection';
// import IndemnityForm from '../../pages/policy/indemnityform/IndemnityForm';
// import ReferAndEarnTerms from '../../pages/policy/referandearnterms/ReferAndEarnTerms';
// import RefundPolicy from '../../pages/policy/refundpolicy/RefundPolicy';
// import RefurbishedPhones from '../../pages/policy/refurbishedphones/RefurbishedPhones';
// import TermsAndCondition from '../../pages/policy/termsandcondition/TermsAndCondition';
// import WarrantyPolicy from '../../pages/policy/warrantypolicy/WarrantyPolicy';
// import WastePolicy from '../../pages/policy/wastepolicy/WastePolicy';

function Tabs() {

    const [tabSelected, setTabSelected] = useState('');

    return (
        <IonTabs className='tabs-bg'>
            <IonRouterOutlet className='mt-50'>
                <IonContent>
                    {/* <Route path="/:ln/:geo?" exact><Home /></Route> */}
                    <Route path="/" exact={true} >
                        <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/home`} /> : <Home />
                    </Route>

                    <Route path="/:ln/:geo?/home" exact><Home /></Route>
                    <Route path="/home" exact={true} >
                        <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/home/`} /> : <Home />
                    </Route>

                    <Suspense fallback={<Loader />}>
                        <Route path="/:ln/:geo?/sell-your-old-device"><SellDevice /></Route>
                        <Route path="/sell-your-old-device" exact={true} >
                            <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`} /> : <SellDevice />
                        </Route>

                        <Route path="/:ln/:geo?/sell-your-device/:modelId"><SellYourDevice /></Route>
                        <Route path="/sell-your-device" exact={true} >
                            <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-device/:modelId`} /> : <SellYourDevice />
                        </Route>

                        <Route path="/:ln/:geo?/contact-us"><Contact /></Route>
                        <Route path="/contact-us" exact={true} >
                            <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/contact-us`} /> : <Contact />
                        </Route>

                        <Route path="/:ln/:geo?/about-us"><About /></Route>
                        <Route path="/about-us" exact={true} >
                            <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/about-us`} /> : <About />
                        </Route>

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

                        <Route path="/:ln/:geo?/saved-address"><Schedule /></Route>
                        <Route path="/saved-address" exact={true} >
                            <Redirect to={`/${getUserLanguage()}${getUserLocationForParam()}/saved-address`} /> : <Schedule />
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
            <IonTabBar slot="bottom" className="tabs-bg" onIonTabsDidChange={($event) => setTabSelected($event.detail.tab)}>
                <IonTabButton tab="home" selected={tabSelected === 'home'} href={`/${getUserLanguage()}${getUserLocationForParam()}/home`}>
                    <IonImg className='header-icon-sm' src={`${tabSelected === 'home' ? homeblue : home}`} alt='home' style={{ width: "24px" }} />Home
                </IonTabButton>
                <IonTabButton tab="sell" selected={tabSelected === 'sell'} href={`/${getUserLanguage()}${getUserLocationForParam()}/sell-device`}>
                    <IonImg className='header-icon-sm' src={`${tabSelected === 'sell' ? sellblue : sell}`} alt='sell' style={{ width: "24px" }} />Sell
                </IonTabButton>
                <IonTabButton tab="about" selected={tabSelected === 'about'} href={`/${getUserLanguage()}${getUserLocationForParam()}/about-us`}>
                    <IonImg className='header-icon-sm' src={`${tabSelected === 'about' ? aboutblue : about}`} alt='about' style={{ width: "24px" }} />About
                </IonTabButton>
                <IonTabButton tab="contact" selected={tabSelected === 'contact'} href={`/${getUserLanguage()}${getUserLocationForParam()}/contact-us`}>
                    <IonImg className='header-icon-sm' src={`${tabSelected === 'contact' ? contactblue : contact}`} alt='contact' style={{ width: "24px" }} />Contact
                </IonTabButton>
            </IonTabBar>
        </IonTabs >
    )
}

export default Tabs;
