import { Direction, getUserLanguage } from '../../components/helper/Helper';
import { loginPageChanger, modelChanger, resetModelChanger } from '../../features/reducers/login/LoginModel.Reducer';

import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { useState } from 'react';
import Language from "./VerifyOtp.json";
import './VerifyOtp.css';
import dofylogo from '../../assets/images/phase2/dofy-logo.png'
import { arrowBack, close } from "ionicons/icons";
import AuthServices from '@/services/Auth.Services';
import { TextField } from '@mui/material';


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
            <ion-content>
                <ion-grid dir={Direction()}>
                    <ion-row>
                        <ion-col size-xl='6' class='ls_login-back'>
                            <ion-icon icon={arrowBack} onClick={() => dispatch(loginPageChanger("forgot-password"))}></ion-icon>
                        </ion-col>
                        <ion-col size-xl="6" class='ls_login-close'>
                            <ion-icon class={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                        </ion-col>
                    </ion-row>
                    <ion-row class=" ls_padding-adjustment" >
                        <ion-col size-xs='3' class="vp_logo">
                            <ion-img src={dofylogo.src} alt='dofy-logo'></ion-img>
                        </ion-col>
                        <ion-col sizeLg="12" size-xl="12" size-xs="12" size-sm="12" class=" mt-3">
                            <ion-text class="p-0 ls_signin-text">{dataLocalization.Enter_OTP}</ion-text>
                        </ion-col>
                        <ion-col sizeLg="12" size-xl="12" size-xs="12" size-sm="12" class=" mt-2">
                            <ion-text class='fp_text'>{dataLocalization.We_Will_Send_Otp}</ion-text>
                        </ion-col>
                        <ion-col sizeLg='12' size-xl='12' size-xs='12' size-sm='12' class='mt-3'>
                            <ion-label class="ls_lable-style">{dataLocalization.OTP_Verification}</ion-label>
                            <TextField
                                style={{ width: "100%" }}
                                variant="outlined"
                                id="outlined-start-adornment"
                                sx={{ width: '25ch' }}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)} />
                            {errOtp && <ion-row class="ion-margin-top">
                                <ion-col size="12" class="ion-text-center">
                                    <ion-text class='text-danger'>{dataLocalization.Incorrect_OTP}</ion-text>
                                </ion-col>
                            </ion-row>}
                        </ion-col>
                        <ion-col sizeLg='12' size-xl='12' size-xs='12' size-sm='12' class='ion-text-center fp_btn-otp '>
                            <ion-button class='fp_btn-clr' color='white' expand='full' onClick={verifyhandler}>{dataLocalization.Verify_OTP}</ion-button>
                        </ion-col>
                        <ion-col class='ion-text-center fp_btn-otp fp_btn' >
                            <ion-text class='fp_backtosignin cursor-pointer ' onClick={signinhandler}><u>{dataLocalization.Back_to_Signin}</u></ion-text>
                        </ion-col>
                        <ion-col sizeLg='12' size-xl='12' size-xs='12' size-sm='12' class='ion-text-center ls_lable-style mt-3'>
                            <ion-text>{dataLocalization.Dont_Have_account}</ion-text>
                            <ion-text class='fp_clr-sign' onClick={signuphandler}>{dataLocalization.Signup_here}</ion-text>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>
        )
    }
    const webUi = () => {
        return (
            <ion-grid dir={Direction()} >
                <ion-row>
                    <ion-col size-xl='6' size-sm='6' size-md='6' class='ls_login-back'>
                        <ion-icon icon={arrowBack} onClick={() => dispatch(loginPageChanger("forgot-password"))}></ion-icon>
                    </ion-col>
                    <ion-col size-xl="6" size-sm='6' size-md='6' class='ls_login-close'>
                        <ion-icon class={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                    </ion-col>
                </ion-row>
                <ion-row class='ls_padding-adjustment '>
                    <ion-col sizeLg='2.5' size-xl='2.5' size-xs='2.5' size-sm='2.5'>
                        <ion-img src={dofylogo.src} alt='dofy-logo'></ion-img>
                    </ion-col>
                    <ion-col sizeLg='12' size-xl='12' size-xs='12' size-sm='12' class='mt-3'>
                        <ion-title class='fp_font-size' >{dataLocalization.Enter_OTP}</ion-title>
                    </ion-col>
                    <ion-col sizeLg='12' size-xl='12' size-xs='12' size-sm='12' >
                        <ion-text class=' fp_text'>{dataLocalization.We_Will_Send_Otp}</ion-text>
                    </ion-col>
                    <ion-col sizeLg='12' size-xl='12' size-xs='12' size-sm='12' class='mt-2'>
                        <ion-label class="ls_lable-style">{dataLocalization.OTP_Verification}</ion-label>
                        <TextField
                            style={{ width: "100%" }}
                            variant="outlined"
                            id="outlined-start-adornment"
                            sx={{ width: '25ch' }}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)} />
                        {errOtp && <ion-row>
                            <ion-col size="12" class="ion-text-center">
                                <ion-text class='text-danger'>{dataLocalization.Incorrect_OTP}</ion-text>
                            </ion-col>
                        </ion-row>}
                    </ion-col>
                    <ion-col sizeLg='12' size-xl='12' size-xs='12' size-sm='12' class='ion-text-center mt-1 '>
                        <ion-button class='fp_btn-clr' color='white' expand='full' onClick={loginHandler}>{dataLocalization.Verify_OTP}</ion-button>
                    </ion-col>
                    <ion-col class='ion-text-center fp_btn-otp fp_btn cursor-pointer'>
                        <ion-text class='rg_backtosignin cursor-pointer ' onClick={signinhandler}><u>{dataLocalization.Back_to_Signin}</u></ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class='ion-text-center ls_lable-style '>
                        <ion-text>{dataLocalization.Dont_Have_account}</ion-text>
                        <ion-text class='ls_signup cursor-pointer' onClick={signuphandler}>{dataLocalization.Signup_here}</ion-text>
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

export default VerifyOtp