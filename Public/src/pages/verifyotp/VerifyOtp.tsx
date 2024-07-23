import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonLabel, IonPage, IonRow, IonText, IonTitle } from '@ionic/react'
import { Direction, getUserLanguage } from '../../components/helper/Helper';
import { loginPageChanger, modelChanger, resetModelChanger } from '../../features/reducers/login/LoginModel.Reducer';

import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import AuthServices from '../../services/Auth.Services';
import { useState } from 'react';
import Language from "./VerifyOtp.json";
import './VerifyOtp.css';
import dofylogo from '../../assets/images/phase2/dofy-logo.png'
import { arrowBack, close } from "ionicons/icons";



function VerifyOtp() {

    let IsMobile = useTypedSelector(state => state.FindDevice.isMobile);
    let dispatch = useTypedDispatch();
    let number = useTypedSelector(state => state.NewUserRegistrationReducer.NewNumber);

    const [otp, setOtp] = useState("");
    const [errOtp, setErrOtp] = useState("");
    let dataLocalization = Language[getUserLanguage()];

    const loginHandler = () => {
        AuthServices.authenticate(number, otp).then(res => {
            if (res.status === 200) {
                if (res.data == "not valid user") {
                    setErrOtp("Incorrect OTP");
                }
                else {
                    verifyhandler();
                }
            }
        }).catch((e: string) => {
            console.log(e);
        });

    }
    const signinhandler = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("login"));
    }

    const signuphandler = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("register"));
    }

    const verifyhandler = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("password-reset"));
    }

    const mobileUi = () => {
        return (
            <IonContent>
                <IonGrid dir={Direction()}>
                    <IonRow>
                        <IonCol sizeXl='6' className='ls_login-back'>
                            <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("forgot-password"))}></IonIcon>
                        </IonCol>
                        <IonCol sizeXl="6" className='ls_login-close'>
                            <IonIcon className={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                        </IonCol>
                    </IonRow>
                    <IonRow className=" ls_padding-adjustment" >
                        <IonCol sizeXs='3' className="vp_logo">
                            <IonImg src={dofylogo} alt='dofy-logo'></IonImg>
                        </IonCol>
                        <IonCol sizeLg="12" sizeXl="12" sizeXs="12" sizeSm="12" className=" mt-3">
                            <IonText className="p-0 ls_signin-text">{dataLocalization.Enter_OTP}</IonText>
                        </IonCol>
                        <IonCol sizeLg="12" sizeXl="12" sizeXs="12" sizeSm="12" className=" mt-2">
                            <IonText className='fp_text'>{dataLocalization.We_Will_Send_Otp}</IonText>
                        </IonCol>
                        <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='mt-3'>
                            <IonLabel className="ls_lable-style">{dataLocalization.OTP_Verification}</IonLabel>
                            <IonInput className='otp_outline-style' value={otp} onIonChange={e => setOtp(e.detail.value!)} ></IonInput>
                            {errOtp && <IonRow className="ion-margin-top">
                                <IonCol size="12" className="ion-text-center">
                                    <IonText className='text-danger'>{dataLocalization.Incorrect_OTP}</IonText>
                                </IonCol>
                            </IonRow>}
                        </IonCol>
                        <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='text-center fp_btn-otp '>
                            <IonButton className='fp_btn-clr' color='white' expand='full' onClick={verifyhandler}>{dataLocalization.Verify_OTP}</IonButton>
                        </IonCol>
                        <IonCol className='text-center fp_btn-otp fp_btn' >
                            <IonText className='cursor-pointer' onClick={signinhandler}><u>{dataLocalization.Back_to_Signin}</u></IonText>
                        </IonCol>
                        <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='text-center ls_lable-style mt-3'>
                            <IonText>{dataLocalization.Dont_Have_account}</IonText>
                            <IonText className='fp_clr-sign' onClick={signuphandler}>{dataLocalization.Signup_here}</IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        )
    }
    const webUi = () => {
        return (
            // <IonGrid className='ion-padding' dir={Direction()}>
            //     <IonRow>
            //         <IonCol sizeLg='12'>
            //             <IonImg style={{ height: "400px" }} src={forgotpassword}></IonImg>
            //         </IonCol> 
            //         <IonCol sizeLg='12'>
            //             <IonLabel>{dataLocalization.Enter_OTP}</IonLabel>
            //             <IonItem>
            //             <IonInput value={otp} onIonChange={e => setOtp(e.detail.value!)} placeholder='Enter OTP'></IonInput>
            //             {errOtp && <IonRow className="ion-margin-top">
            //                             <IonCol size="12" className="ion-text-center">
            //                                 <IonText className='text-danger'>{dataLocalization.Incorrect_OTP}</IonText>
            //                             </IonCol>
            //                         </IonRow>}
            //             </IonItem>
            //         </IonCol>
            //         <IonCol sizeLg='12' className='text-center'>
            //             <IonButton onClick={loginHandler}>{dataLocalization.Verify_OTP}</IonButton>
            //         </IonCol>
            //     </IonRow>
            // </IonGrid>
            <IonGrid dir={Direction()} >
                <IonRow>
                    <IonCol sizeXl='6' sizeSm='6' sizeMd='6' className='ls_login-back'>
                        <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("forgot-password"))}></IonIcon>
                    </IonCol>
                    <IonCol sizeXl="6" sizeSm='6' sizeMd='6' className='ls_login-close'>
                        <IonIcon className={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                    </IonCol>
                </IonRow>
                <IonRow className='ls_padding-adjustment '>
                    <IonCol sizeLg='2.5' sizeXl='2.5' sizeXs='2.5' sizeSm='2.5'>
                        <IonImg src={dofylogo} alt='dofy-logo'></IonImg>
                    </IonCol>
                    <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='mt-3'>
                        <IonTitle className='fp_font-size' >{dataLocalization.Enter_OTP}</IonTitle>
                    </IonCol>
                    <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' >
                        <IonText className=' fp_text'>{dataLocalization.We_Will_Send_Otp}</IonText>
                    </IonCol>
                    <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='mt-2'>
                        <IonLabel className="ls_lable-style">{dataLocalization.OTP_Verification}</IonLabel>
                        <IonInput className='otp_outline-style' value={otp} onIonChange={e => setOtp(e.detail.value!)} ></IonInput>
                        {errOtp && <IonRow>
                            <IonCol size="12" className="ion-text-center">
                                <IonText className='text-danger'>{dataLocalization.Incorrect_OTP}</IonText>
                            </IonCol>
                        </IonRow>}
                    </IonCol>
                    <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='text-center mt-1 '>
                        <IonButton className='fp_btn-clr' color='white' expand='full' onClick={loginHandler}>{dataLocalization.Verify_OTP}</IonButton>
                    </IonCol>
                    <IonCol className='text-center fp_btn-otp fp_btn cursor-pointer'>
                        <IonText className='cursor-pointer' onClick={signinhandler}><u>{dataLocalization.Back_to_Signin}</u></IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className='text-center ls_lable-style '>
                        <IonText>{dataLocalization.Dont_Have_account}</IonText>
                        <IonText className='ls_signup cursor-pointer' onClick={signuphandler}>{dataLocalization.Signup_here}</IonText>
                    </IonCol>
                </IonRow>
            </IonGrid>
        )
    }
    return (
        <IonPage>
            {IsMobile
                ?
                mobileUi()
                :
                webUi()
            }
        </IonPage>
    )
}

export default VerifyOtp