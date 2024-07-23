import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonLabel, IonPage, IonRow, IonText } from '@ionic/react'
import { Direction, getUserLanguage } from '../../components/helper/Helper';
import { loginPageChanger, modelChanger, resetModelChanger } from '../../features/reducers/login/LoginModel.Reducer';

import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import AuthServices from '../../services/Auth.Services';
import { useState } from 'react';
import { newUser } from '../../features/reducers/registration/Registration.Reducers';
import './ForgotPassword.css';
import dofylogo from '../../assets/images/phase2/dofy-logo.png'
import { arrowBack, close } from "ionicons/icons";
import Language from "./forgetpassword.json"


function ForgotPassword() {

    let IsMobile = useTypedSelector(state => state.FindDevice.isMobile);
    let dispatch = useTypedDispatch();
    let dataLocalization = Language[getUserLanguage()];


    const [email, setEmail] = useState("");
    const [errEmail, setErrEmail] = useState("");

    const signup = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("register"));
    }

    const signin = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("login"));
    }

    const loginHandler = () => {
        if (email !== "") {
            AuthServices.ForgetPassword(email).then(res => {
                if (res.status === 200) {
                    dispatch(newUser(res.data.UserName));
                    if (res.data == "New User") {
                        setErrEmail("Email does not exist !");
                    } else {
                        setErrEmail("");
                        dispatch(loginPageChanger("verify-otp"));
                    }
                }
            }).catch((e: string) => {
                console.log(e)
            });
        }
        else {
            setErrEmail("Enter your email");
        }

    }
    const mobileUi = () => {
        return (
            <>
                <IonContent>
                    <IonGrid dir={Direction()}>
                        <IonRow>
                            <IonCol sizeXl='6' className='fp_login-back'>
                                <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></IonIcon>
                            </IonCol>
                            <IonCol sizeXl="6" className='fp_login-close'>
                                <IonIcon className={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ls_padding-adjustment" >
                            <IonCol sizeLg='2.5' sizeXs='3'>
                                <IonImg src={dofylogo} alt='dofy-logo'></IonImg>
                            </IonCol>
                            <IonCol className='mt-2' sizeLg='12' sizeXs='12'>
                                <IonLabel className='fp_signin-text' >{dataLocalization.Did_you_forgot_your_password}</IonLabel>
                            </IonCol>
                            <IonCol sizeLg='12' sizeXs='12'>
                                <IonText className='fp_text'>{dataLocalization.Enter_your_email_address}</IonText><br />
                            </IonCol>
                            <IonCol sizeLg='12' sizeXs='12' className='mt-3'>
                                <IonLabel className="ls_lable-style">{dataLocalization.Email_Address}</IonLabel><br />
                                <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} placeholder="example123@dofy.com" className='fp_outline-style' ></IonInput>
                                {errEmail && <IonRow className="ion-margin-top">
                                    <IonCol size="12" className="ion-text-center">
                                        <IonText className='text-danger'>{errEmail}</IonText>
                                    </IonCol>
                                </IonRow>}
                            </IonCol>
                            <IonCol sizeLg='12' sizeXs='12' className='text-center fp_btn-otp mt-1'>
                                <IonButton className='fp_btn-color cursor-pointer' color='white' expand='full' onClick={loginHandler}>{dataLocalization.Request_OTP}</IonButton>
                            </IonCol>
                            <IonCol sizeLg='12' sizeXs='12' className='text-center fp_btn'>
                                <IonText className='fp_backtosignin cursor-pointer' onClick={() => signin()}><u>{dataLocalization.Back_to_signin}</u></IonText>
                            </IonCol>
                            <IonCol sizeXs='12' className='text-center ls_lable-style mt-3'>
                                <IonText >{dataLocalization.You_donot_have_account}</IonText>
                                <IonText className='ls_signup cursor-pointer' onClick={() => signup()}>{dataLocalization.Signup_here}</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </>
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
            //             <IonLabel>Enter Email*</IonLabel>
            //             <IonItem>
            //                 <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)}  placeholder='Enter Email'></IonInput>
            //                 {errEmail && <IonRow className="ion-margin-top">
            //                             <IonCol size="12" className="ion-text-center">
            //                                 <IonText className='text-danger'>{errEmail}</IonText>
            //                             </IonCol>
            //                         </IonRow>}
            //             </IonItem>
            //         </IonCol>
            //         <IonCol sizeLg='12' className='text-center'>
            //             <IonButton onClick={loginHandler}>Send OTP to Mail</IonButton>
            //         </IonCol>
            //     </IonRow>
            // </IonGrid>

            <IonGrid dir={Direction()}>
                <IonRow>
                    <IonCol sizeXl='6' sizeMd='12' className='fp_login-back'>
                        <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></IonIcon>
                    </IonCol>
                    <IonCol sizeXl="6" sizeMd='12' sizeSm='12' className='fp_login-close'>
                        <IonIcon className={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                    </IonCol>
                </IonRow>
                <IonRow className="ls_padding-adjustment" >
                    <IonCol sizeLg='2.5' sizeXs='3'>
                        <IonImg src={dofylogo} alt='dofy-logo'></IonImg>
                    </IonCol>
                    <IonCol className='mt-2' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                        <IonLabel className='fp_signin-text' >{dataLocalization.Did_you_forgot_your_password}</IonLabel>
                    </IonCol>
                    <IonCol sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                        <IonText className='fp_text'>{dataLocalization.Enter_your_email_address}</IonText><br />
                    </IonCol>
                    <IonCol sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12' className='mt-3'>
                        <IonLabel className="ls_lable-style">{dataLocalization.Email_Address}</IonLabel><br />
                        <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} placeholder="example123@dofy.com" type={'email'} className='fp_outline-style' ></IonInput>
                        {errEmail && <IonRow >
                            <IonCol size="12" className="ion-text-center">
                                <IonText className='text-danger'>{errEmail}</IonText>
                            </IonCol>
                        </IonRow>}
                    </IonCol>
                    <IonCol sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12' className='text-center fp_btn-otp mt-1'>
                        <IonButton className='fp_btn-color cursor-pointer fp_btn' color='white' expand='full' onClick={loginHandler}>{dataLocalization.Request_OTP}</IonButton>
                    </IonCol>
                    <IonCol sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12' className='text-center '>
                        <IonText className='fp_backtosignin cursor-pointer fp_btn' onClick={() => signin()}><u>{dataLocalization.Back_to_signin}</u></IonText>
                    </IonCol>
                    <IonCol sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12' className='text-center ls_lable-style mt-1'>
                        <IonText >{dataLocalization.You_donot_have_account}</IonText>
                        <IonText className='ls_signup cursor-pointer' onClick={() => signup()}>{dataLocalization.Signup_here}</IonText>
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

export default ForgotPassword