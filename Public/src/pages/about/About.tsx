import {
    IonButton, IonCard, IonCardSubtitle, IonCol, IonContent, IonGrid, IonIcon,
    IonImg,
    IonItem, IonPage, IonRow, IonText, isPlatform
} from '@ionic/react';
import { chevronBack, chevronForward } from 'ionicons/icons';
import Aboutimage from '../../assets/images/Aboutbg.png';
import "./About.css";
import customer_feedback from "../../assets/images/customer_feedback-img.png";

import { aboutdata } from './AboutData';
import Footer from '../../components/footer/Footer';
import { Direction, ResponsiveItemPerView, getLocalStorage, getUserLanguage } from '../../components/helper/Helper';
import Language from "./AboutLanguage.json";
import MetaTags from '../../components/metatags/MetaTags';
import { star } from 'ionicons/icons';
import { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css/navigation';
import { modelChanger } from '../../features/reducers/login/LoginModel.Reducer';
import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';

function AboutUs() {

    let dispatch = useTypedDispatch();

    let dataLocalization = Language[getUserLanguage()];
    let personId = getLocalStorage()?.PersonId;
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);
    let isTablet = useTypedSelector(state => state.FindDevice.isTablet);


    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const loginHandler = () => {
        dispatch(modelChanger(true));
    }

    SwiperCore.use([Navigation]);

    return (
        <IonPage data-aos="fade-left">
            <MetaTags pageName={'About-Us'} />
            <IonContent>
                {/* <IonGrid className='p-0 au-grid' dir={Direction()}>
                    <IonRow className='au-header-row '>
                        <IonCol >
                            <IonText className='au-header-text'>{dataLocalization.Were_all_about_smartphones}</IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className='au-row'>
                        <IonCol>
                            <IonRow>
                                <IonCol className='ion-text-center aboutus-title'>
                                    <IonTitle>{dataLocalization.About_Us}</IonTitle>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className='ion-text-center'>
                                    <IonText> {dataLocalization.Every_journey_starts}</IonText>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonRow >
                                        <IonCol className='aboutus-text-align' sizeLg='8' sizeMd='8' sizeXl='8' sizeXs='12'>
                                            <IonItem lines='none' color='white'>
                                                <IonLabel class="ion-text-justify">
                                                    {dataLocalization.With_over_decades}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines='none' color='white'>
                                                <IonLabel class="ion-text-justify">
                                                    {dataLocalization.This_is_where_DOFY}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines='none' color='white'>
                                                <IonLabel className='who-we'>{dataLocalization.Who_are_we}</IonLabel>
                                            </IonItem>
                                            <IonItem lines='none' color='white'>
                                                <IonLabel class="ion-text-justify">
                                                    {dataLocalization.In_simple_terms}
                                                </IonLabel>
                                            </IonItem>
                                        </IonCol>
                                        <IonCol sizeLg='4' sizeMd='4' sizeXl='4' sizeXs='12' sizeSm='12'>
                                            <CustomImg src={aboutus1} className="aboutus-images" />
                                            {!personId ?
                                                <IonRow>
                                                    <IonCol offsetLg='2' offsetMd='2' offsetXs='3'>
                                                        <IonButton color='warning' onClick={() => loginHandler()}>
                                                            {dataLocalization.Join_Us} <IonIcon icon={chevronForwardCircleSharp}></IonIcon>
                                                        </IonButton>
                                                    </IonCol>
                                                </IonRow> : ""}
                                        </IonCol>
                                    </IonRow>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                {aboutusdata.map((value, i) => {
                                    return <IonCol key={i} sizeXl="3" sizeLg='3' sizeXs='12'>
                                        <IonCard className='aboutus-card-align'>
                                            <IonCardHeader className='ion-text-center'>
                                                <IonText className='aboutus-innertexts'>{value.Name}</IonText>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                <CustomImg src={value.UserImage} className="aboutus-card-img" style={{ height: '100px' }} />
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                })}
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow className='aboutus-rows' hidden={true}>
                        {aboutusdatas.map((value, i) => {
                            return <IonCol sizeLg='3' sizeXs='12' key={i}>
                                <IonRow>
                                    <IonCol className="ion-margin-left ion-padding" sizeLg="6" sizeXs='6'>
                                        <CustomImg src={value.UserImage} style={{ height: '100px' }} />
                                    </IonCol>
                                    <IonCol className="ion-margin-top" sizeLg='5' sizeXs='6'>
                                        <IonText>{value.Name}</IonText>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        })}
                    </IonRow>
                    <IonModal className='modal-login' isOpen={modeIsOpen} onDidDismiss={() => dispatch(modelChanger(false))}>
                        {selecteddPage === routerPage.LOGIN &&
                            <LoginMobileNumber />
                        }
                        {selecteddPage === routerPage.VERIFY &&
                            <VerificationScreen />
                        }
                        {selecteddPage === routerPage.REGISTER &&
                            <Registration />
                        }
                    </IonModal>

                </IonGrid> */}
                <IonGrid className='ab-grid as-padding-adjustment' dir={Direction()}>
                    <IonGrid className='container'>
                        <IonRow>
                            <IonCol sizeLg='6' sizeXs='12' >
                                <IonImg className='ab_image' src={Aboutimage} alt="about-us"></IonImg>
                            </IonCol>
                            <IonCol sizeLg='6' sizeXs='12' className='text-align-justify'>
                                <IonText className='ab_title'>{dataLocalization.About_Us}</IonText><br />
                                <IonText className='ab_text'>
                                    {dataLocalization.Welcome_to_dofy}
                                </IonText>
                                <br /><br />
                                <IonText className='ab_text'>
                                    {dataLocalization.We_introduce_dofy}
                                </IonText>
                                <br /><br />
                                <IonText className='ab_text'>
                                    {dataLocalization.At_Dofy}
                                </IonText>
                                <br /><br />
                                <IonText className='ab_text'>
                                    {dataLocalization.Together_lets_give}
                                </IonText>
                                <br /><br />
                                <IonText className='ab_text'>
                                    {dataLocalization.Sell_your_smartphone}
                                </IonText>
                                {!personId ?
                                    <IonRow>
                                        <IonCol className='ab_submit'>
                                            <IonButton color='white' className='ab_btn' onClick={loginHandler}>
                                                {dataLocalization.Join_Us}
                                            </IonButton>
                                        </IonCol>
                                    </IonRow> : ""}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonGrid>


                {/* <IonGrid className='ab-grid1 as-padding-adjustment' dir={Direction()}>
                    <IonRow className='container'>
                        <IonCol sizeLg='6' sizeMd='6' sizeXs='12' >
                            <IonText className='ab_title '>{dataLocalization.Who_are_we}</IonText><br />
                            <IonText className='ab_text'>
                                {dataLocalization.In_simple_terms}
                            </IonText>
                            <IonRow>
                                <IonButton color='white' className='ab_btn' ref={navigationPrevRef}>
                                    <IonIcon icon={chevronBack}></IonIcon>
                                </IonButton>
                                <IonButton color='white' className='ab_btn' ref={navigationNextRef}>
                                    <IonIcon icon={chevronForward}></IonIcon>
                                </IonButton>
                            </IonRow>
                        </IonCol>
                        <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='about-us-slide'>
                            <Swiper modules={[Navigation]} spaceBetween={10} navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current,
                            }}
                                onBeforeInit={(swiper: any) => {
                                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                                    swiper.params.navigation.nextEl = navigationNextRef.current;
                                }}
                                slidesPerView={ResponsiveItemPerView(2.2, 3.4, 2, 3.5)}>
                                {aboutdata.map((val, i) => (
                                    <SwiperSlide key={i}>
                                        <IonCard className='ab_card' key={i}>
                                            <IonImg src={val.Image}></IonImg>
                                            <IonCardSubtitle className='ab_card-sub'>{val.Name}</IonCardSubtitle>
                                        </IonCard>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </IonCol>
                    </IonRow>
                </IonGrid> */}



                {/* <IonGrid className='ab-grid padding-adjustment ' dir={Direction()}>
                    <IonRow>
                        <IonCol sizeLg='6' sizeXs='12' class='ion-padding' >
                            <IonImg src={customer_feedback}></IonImg>
                            <IonText className='ab_customer-name'> Tressah Gail</IonText>
                            <IonText className='ab_lap-seller'> Laptop seller</IonText>
                            <IonItem lines='none' className='ab_star-rate'>
                                <IonIcon style={{ color: "#ffd700" }} icon={star} />
                                <IonIcon style={{ color: "#ffd700" }} icon={star} />
                                <IonIcon style={{ color: "#ffd700" }} icon={star} />
                                <IonIcon style={{ color: "#ffd700" }} icon={star} />
                                <IonIcon style={{ color: "#ffd700" }} icon={star} />
                            </IonItem>


                        </IonCol>
                        <IonCol sizeLg='6' sizeXs='12' className='align-self-center ion-padding '>
                            <IonText className='ab_title'>Customer Feedback</IonText><br />
                            <IonText className='ab_text'>
                                "Lorem ipsum dolor sit amet, consectetur adipisc elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven quis nostrud exercitation ullamco.tempor incididunt ut labore et magna aliqua."
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid> */}
                {
                    (!isMobile && !isTablet) &&
                    <Footer />
                }
            </IonContent>
        </IonPage>
    )
}

export default AboutUs


