import { useEffect, useState } from "react";
import { arrowBack, close } from "ionicons/icons";

import '../../login/Login.css';

import dofylogo from '@/assets/images/phase2/dofy-logo.png'
import { ISellOrderModel } from "@/models/order/sell/SellOrder.Model";
import { IRepairOrderModel } from "@/models/order/repair/RepairOrder.Model";
import AuthService from "@/services/Auth.Services";
import SellOrderServices from "@/services/order/sell/SellOrder.Services";
import RepairOrderServices from "@/services/order/repair/RepairOrder.Services";

import { useTypedDispatch, useTypedSelector } from "@/features/reduxhooks/ReduxHooks";
import { loginPageChanger, modelChanger, resetModelChanger } from "@/features/reducers/login/LoginModel.Reducer";

import { HelperConstant } from "@/components/helper/HelperConstant";
import { Direction, getLocalStorage, getUserLanguage, getUserLocationForParam, isIn, IsLogginUser } from "@/components/helper/Helper";

import OtpInput from "react-otp-input-rc-17";
import Language from './VerificationScreen.json'
import { InputAdornment, TextField } from "@mui/material";
import Link from 'next/link';
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { CustomMaterialDropDown } from "@/components/shared/CustomMaterialDropDown";
import { CustomMaterialInput } from "@/components/shared/CustomMaterialInput";

const IonInput = dynamic(() => import('@ionic/react').then(mod => mod.IonInput), { ssr: false });
const IonCheckBox = dynamic(() => import('@ionic/react').then(mod => mod.IonCheckbox), { ssr: false });

function LoginOtp() {

    let dispatch = useTypedDispatch();
    let dataLocalization = Language[getUserLanguage()];
    let questionnaire = useTypedSelector((state) => state.PageChangeReducer.selectedPage);
    let newNumber = useTypedSelector(state => state.NewUserRegistrationReducer.NewNumber);

    const [errorOTP, setErrorOTP] = useState("");
    const [OTP, setOTP] = useState("");
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [disbleLogin, setDisableLogin] = useState<boolean>(false);

    const [counter, setCounter] = useState(HelperConstant.otpVerificationTime.timer);

    let history = useRouter();

    let orderData = JSON.parse(localStorage.getItem("orders") as any);
    let RepairorderData = JSON.parse(localStorage.getItem("Repairorders") as any);
    const userName: string = useTypedSelector(state => state.NewUserRegistrationReducer.NewNumber);

    const handleChange = (otp: any) => {
        setOTP(otp);
    }

    const validateInputs = () => {
        if (isIn()) {
            if (OTP && OTP.length >= 6) return true;
        }
        else {
            if (OTP && OTP != "") return true;
        }
    }

    const submitHandler = () => {
        if (validateInputs()) {
            if (isIn()) {
                AuthService.authenticate(userName, OTP).then(res => {
                    if (res.status === 200) {
                        if (res.data === "not valid user") {
                            return setErrorOTP("The OTP entered is incorrect");
                        }
                        else {
                            // handleSendOtp();
                            localStorage.setItem("token", JSON.stringify(res.data));
                            document.cookie = "token" + "=" + JSON.stringify(res.data.Token) + ";" + ";path=/";
                            document.cookie = "personId" + "=" + JSON.stringify(res.data.PersonId) + ";" + ";path=/";
                            setErrorOTP("");
                            if (orderData) {
                                orderApi(orderData);
                            }
                            else if (RepairorderData) {
                                RepairorderApi(RepairorderData);
                            }
                            else {
                                window.location.href = `/`;
                            }
                        }
                    }
                }).catch((e: string) => {
                    console.log(e);
                });
            }
            else {
                setDisableLogin(true);
                setIsSelected(false);
                AuthService.emailauthenticate(newNumber, OTP).then(res => {
                    if (res.status === 200) {
                        if (res.data == "Invalid Credentials") {
                            setDisableLogin(false);
                            return setErrorOTP("Invalid Username & Password");
                        }
                        else {
                            setDisableLogin(false);
                            setErrorOTP("");
                            document.cookie = "token" + "=" + JSON.stringify(res.data.Token) + ";" + ";path=/";
                            document.cookie = "personId" + "=" + JSON.stringify(res.data.PersonId) + ";" + ";path=/";
                            localStorage.setItem("token", JSON.stringify(res.data));
                            if (orderData) {
                                orderApi(orderData);
                            }
                            else {
                                window.location.href = `/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/`;
                            }
                        }
                    }
                }).catch((e: string) => {
                    console.log(e)
                });
            }
        }
        else {
            return setErrorOTP("Please enter your OTP");
        }
    }

    const orderApi = (orderData: ISellOrderModel) => {
        orderData.PersonId = getLocalStorage()?.PersonId;
        orderData.UserMobile = getLocalStorage()?.MobileNumber;
        orderData.UserName = getLocalStorage()?.FirstName;

        SellOrderServices.Create(orderData).then(res => {
            if (res.status === 200) {
                localStorage.setItem("orderId", res.data);
                localStorage.removeItem("orders");
                window.location.href = `/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/sell-device-details/${localStorage.getItem("orderId")}`;
            }
        }).catch((e: string) => {
            console.log(e);
        });

    }

    const RepairorderApi = (RepairorderData: IRepairOrderModel) => {
        RepairorderData.PersonId = getLocalStorage()?.PersonId;
        RepairorderData.UserMobile = getLocalStorage()?.MobileNumber;
        RepairorderData.UserName = getLocalStorage()?.FirstName;

        RepairOrderServices.Create(RepairorderData).then(res => {
            if (res.status === 200) {
                localStorage.setItem("RepairorderId", res.data);
                localStorage.removeItem("Repairorders");
                window.location.href = `/RepairDevicesDetails/${localStorage.getItem("RepairorderId")}`;
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    const reset = () => {
        setCounter(HelperConstant.otpVerificationTime.timer);
        AuthService.ResendOTP(userName).then(res => {
            if (res.status === 200) {
                getResendButton();
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    const getResendButton = () => {
        if (counter > 0) {
            return "ion-hide"
        }
        else {
            return "vs-resend-button"
        }
    }
    const getResendButtonHide = () => {
        if (counter === 0) {
            return "ion-hide"
        }
        else {
            return "vs-resend-hidden"
        }
    }

    const signinhandler = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("login"));
    }

    const forgetpasswordHandler = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("forgot-password"));
    }

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    useEffect(() => {
        const validateUserName = (userName: string) => {
            if (userName === "") {
                dispatch(loginPageChanger("login"));
            }
        }
        validateUserName(userName);
    }, [userName, history]);

    useEffect(() => {
        IsLogginUser();
    }, []);

    const webUi = () => {
        return (
            <ion-content class="fl_content-style">
                {isIn() ?
                    <ion-grid class="ion-padding" dir={Direction()} >
                        <ion-row>
                            <ion-col size-xl='6' class='ls_login-back'>
                                <ion-icon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></ion-icon>
                            </ion-col>
                            {questionnaire !== "questionnaire" &&
                                <ion-col size-xl="6" class='ls_login-close'>
                                    <ion-icon class='ls-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                                </ion-col>
                            }
                        </ion-row>
                        <ion-row class='ls_padding-adjustment'>
                            <ion-col size-lg='3' size-xl="3" size-xs="3" size-sm="3">
                                <ion-img src={dofylogo.src} alt={"dofylogo"}></ion-img>
                            </ion-col>
                            <ion-col size-lg="12" size-xs="12" size-xl="12" size-sm="12" class=" mt-3 vc_otp">
                                <ion-text>We have sent OTP on <span className="fp_pass">xxx-xxx-{userName.substring(userName.length - 4)}</span> and your registered email </ion-text>
                            </ion-col>
                            <ion-col class=" fp_text-gap">
                                <ion-text>Enter OTP here</ion-text>
                            </ion-col>
                            <ion-col size="12">
                                <OtpInput className="otp-box" isInputNum numInputs={6} onChange={handleChange} value={OTP} />
                            </ion-col>
                            {errorOTP &&
                                <ion-col size="12" >
                                    <ion-text class='text-danger'>{errorOTP}</ion-text>
                                </ion-col>
                            }
                            <ion-col size="12" class="text-end" >
                                <ion-label class={getResendButtonHide()}>Resend OTP</ion-label>
                                <ion-router-link onClick={() => reset()} class={getResendButton()}>Resend OTP</ion-router-link>
                            </ion-col>
                            <ion-col size-lg='12' size-xl="12" size-xs="12" size-sm="12" class=' fp_btn-otp '>
                                <ion-button class='fp_btn-clr' color='white' expand='full' onClick={() => submitHandler()} type="submit">Verify OTP</ion-button>
                            </ion-col>
                            <ion-col class="ion-text-center fp_resend">
                                <ion-text>Resend OTP in Seconds : {counter}</ion-text>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col class='ion-text-center fp_btn'>
                                <ion-text class='fp_backtosignin ls_signup cursor-pointer' onClick={signinhandler}><u>Back to Signin</u></ion-text>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                    :
                    <ion-grid dir={Direction()} >
                        <ion-row>
                            <ion-col size-xl="12" class='ls_login-close'>
                                <ion-icon class='ls-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                            </ion-col>
                        </ion-row>
                        <ion-row class="ls_padding-adjustment">
                            <ion-col size-lg="3" size-md="3" size-xs="3" size-xl="3">
                                <ion-img src={dofylogo.src} alt="dofy-logo"></ion-img>
                            </ion-col>
                            <ion-col size-lg="12" size-xs="12" size-md="12" class="mt-3">
                                <ion-label class="ls_signin-text">{dataLocalization.Signin_into_dofy}</ion-label>
                            </ion-col>
                            <ion-col size-lg="12" size-md="12" size-xs="12" size-xl="12" class="mt-3">
                                <ion-label>{dataLocalization.Enter_Mobile_Number}</ion-label>
                                <TextField
                                    style={{ width: "100%" }}
                                    value={newNumber}
                                    disabled
                                    variant="outlined"
                                    id="outlined-start-adornment"
                                    sx={{ width: '25ch' }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">+971</InputAdornment>,
                                    }}
                                    type="number"
                                />
                            </ion-col>
                            <ion-col size-lg="12" size-md="12" size-xl="12" size-xs="12" class="mt-1">
                                <ion-label class="ls_lable-style">{dataLocalization.Password}</ion-label>
                                <TextField
                                    style={{ width: "100%" }}
                                    variant="outlined"
                                    placeholder={dataLocalization.Password}
                                    id="outlined-start-adornment"
                                    sx={{ width: '25ch' }}
                                    type={"password"}
                                    value={OTP}
                                    onChange={(e: any) => handleChange(e.target.value)} />
                                {errorOTP && <ion-label color="danger">{errorOTP}</ion-label>}
                                <ion-label onClick={() => { forgetpasswordHandler() }} class="ls_fp-text cursor-pointer">{dataLocalization.Forget_Password}</ion-label>
                            </ion-col>
                            <ion-col size-lg="12" size-md="12" size-xl="12" size-xs="12">
                                <IonCheckBox disabled class="login_checkbox login-icon" checked></IonCheckBox>
                                <ion-label class="login-text ls_lable-style">{dataLocalization.I_agree_to_the}</ion-label>
                                <Link href={`/${getUserLanguage()}/terms-of-use`}>
                                    <ion-label class="ls_lable-style text-primary" onClick={() => dispatch(modelChanger(false))}>{dataLocalization.Terms_Conditions} </ion-label>
                                </Link>
                            </ion-col>
                            <ion-col size-lg="12" size-md="12" size-xl="12" size-xs="12" class="mt-2">
                                <ion-button expand="full" class="ls_btn-color"
                                    color="transparent"
                                    title="Continue"
                                    type="submit" onClick={() => submitHandler()}>{dataLocalization.Continue}
                                </ion-button>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col class='ion-text-center fp_btn'>
                                <ion-label class='fp_backtosignin ls_signup cursor-pointer' onClick={signinhandler}><u>Back to Signin</u></ion-label>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                }
            </ion-content>
        )
    }


    return (
        <ion-app class="ls-module">
            {
                webUi()
            }
        </ion-app>
    )
}

export default LoginOtp