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
import dynamic from 'next/dynamic';
import { InputAdornment, TextField } from "@mui/material";


const IonInput = dynamic(() => import('@ionic/react').then(mod => mod.IonInput), { ssr: false });



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
            <ion-content>
                <ion-grid dir={Direction()}>
                    <ion-row>
                        <ion-col size-xl='6' size-sm='12' class='fp_login-back'>
                            <ion-icon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></ion-icon>
                        </ion-col>
                        <ion-col size-xl="6" size-sm='12' class='fp_login-close'>
                            <ion-icon class={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ls_padding-adjustment" >
                        <ion-col size-lg='2.5' size-sm='12' size-xs='3'>
                            <ion-img src={dofylogo.src} alt='dofy-logo'></ion-img>
                        </ion-col>
                        <ion-col class='mt-2' size-lg='12' size-sm='6' size-xs='12'>
                            <ion-label class='fp_signin-text' >{dataLocalization.Did_you_forgot_your_password}</ion-label>
                        </ion-col>
                        <ion-col size-lg='12' size-sm='6' size-xs='12'>
                            <ion-label class='fp_text'>{dataLocalization.Enter_your_email_address}</ion-label><br />
                        </ion-col>
                        <ion-col size-lg='12' size-xs='12' class='mt-3'>
                            <ion-label class="ls_lable-style">{dataLocalization.Email_Address}</ion-label><br />
                            <TextField
                                style={{ width: "100%" }}
                                variant="outlined"
                                placeholder="example123@dofy.com"
                                id="outlined-start-adornment"
                                sx={{ width: '25ch' }}
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)} />
                            {errEmail && <ion-row class="ion-margin-top">
                                <ion-col size="12" class="ion-text-center">
                                    <ion-label color='danger'>{errEmail}</ion-label>
                                </ion-col>
                            </ion-row>}
                        </ion-col>
                        <ion-col size-lg='12' size-xs='12' class='ion-text-center fp_btn-otp mt-1'>
                            <ion-button class='fp_btn-color cursor-pointer' color='white' expand='full' onClick={loginHandler}>{dataLocalization.Request_OTP}</ion-button>
                        </ion-col>
                        <ion-col size-lg='12' size-xs='12' class='ion-text-center fp_btn'>
                            <ion-label class='fp_backtosignin cursor-pointer' onClick={() => signin()}><u>{dataLocalization.Back_to_signin}</u></ion-label>
                        </ion-col>
                        <ion-col size-xs='12' class='ion-text-center ls_lable-style mt-3'>
                            <ion-label >{dataLocalization.You_donot_have_account}</ion-label>
                            <ion-label class='ls_signup cursor-pointer' onClick={() => signup()}>{dataLocalization.Signup_here}</ion-label>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>
        )
    }
    const webUi = () => {
        return (
            <ion-grid dir={Direction()}>
                <ion-row>
                    <ion-col size-xl='6' sizeMd='12' class='fp_login-back'>
                        <ion-icon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></ion-icon>
                    </ion-col>
                    <ion-col size-xl="6" sizeMd='12' sizeSm='12' class='fp_login-close'>
                        <ion-icon class={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                    </ion-col>
                </ion-row>
                <ion-row class="ls_padding-adjustment" >
                    <ion-col size-lg='2.5' size-xs='3'>
                        <ion-img src={dofylogo.src} alt='dofy-logo'></ion-img>
                    </ion-col>
                    <ion-col class='mt-2' size-lg='12' sizeMd='12' sizeSm='12' size-xs='12'>
                        <ion-text class='fp_signin-text' >{dataLocalization.Did_you_forgot_your_password}</ion-text>
                    </ion-col>
                    <ion-col size-lg='12' sizeMd='12' sizeSm='12' size-xs='12'>
                        <ion-text class='fp_text'>{dataLocalization.Enter_your_email_address}</ion-text><br />
                    </ion-col>
                    <ion-col size-lg='12' sizeMd='12' sizeSm='12' size-xs='12' class='mt-3'>
                        <ion-text class="ls_lable-style">{dataLocalization.Email_Address}</ion-text><br />
                        <TextField
                            style={{ width: "100%" }}
                            variant="outlined"
                            placeholder="example123@dofy.com"
                            id="outlined-start-adornment"
                            sx={{ width: '25ch' }}
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)} />
                        {errEmail && <ion-row >
                            <ion-col size="12" class="ion-text-center">
                                <ion-label color='danger'>{errEmail}</ion-label>
                            </ion-col>
                        </ion-row>}
                    </ion-col>
                    <ion-col size-lg='12' sizeMd='12' sizeSm='12' size-xs='12' class='ion-text-centerfp_btn-otp mt-1'>
                        <ion-button class='fp_btn-color cursor-pointer fp_btn' color='white' expand='full' onClick={loginHandler}>{dataLocalization.Request_OTP}</ion-button>
                    </ion-col>
                    <ion-col size-lg='12' sizeMd='12' sizeSm='12' size-xs='12' class='ion-text-center'>
                        <ion-text class='fp_backtosignin cursor-pointer fp_btn' onClick={() => signin()}><u>{dataLocalization.Back_to_signin}</u></ion-text>
                    </ion-col>
                    <ion-col size-lg='12' sizeMd='12' sizeSm='12' size-xs='12' class='ion-text-center ls_lable-style mt-1'>
                        <ion-text >{dataLocalization.You_donot_have_account}</ion-text>
                        <ion-text class='ls_signup cursor-pointer' onClick={() => signup()}>{dataLocalization.Signup_here}</ion-text>
                    </ion-col>
                </ion-row>
            </ion-grid>
        )
    }
    return (
        <ion-app class="ls-module">
            {IsMobile
                ?
                mobileUi()
                :
                webUi()
            }
        </ion-app>
    )

}

export default ForgotPassword