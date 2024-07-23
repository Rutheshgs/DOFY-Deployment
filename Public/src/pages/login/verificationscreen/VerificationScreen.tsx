import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IonPage, IonContent, IonGrid, IonRow, IonText, IonCol, IonButton, IonRouterLink, IonIcon, IonImg, IonLabel, IonInput, IonCheckbox } from "@ionic/react";
import { arrowBack, close } from "ionicons/icons";

import '../../login/Login.css';

import dofylogo from '../../../assets/images/phase2/dofy-logo.png'
import { ISellOrderModel } from "../../../models/order/sell/SellOrder.Model";
import { IRepairOrderModel } from "../../../models/order/repair/RepairOrder.Model";
import AuthService from "../../../services/Auth.Services";
import SellOrderServices from "../../../services/order/sell/SellOrder.Services";
import RepairOrderServices from "../../../services/order/repair/RepairOrder.Services";

import { useTypedDispatch, useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";
import { loginPageChanger, modelChanger, resetModelChanger } from "../../../features/reducers/login/LoginModel.Reducer";

import { HelperConstant } from "../../../components/helper/HelperConstant";
import { Direction, getLocalStorage, getUserLanguage, getUserLocationForParam, isIn, IsLogginUser, restrictInput } from "../../../components/helper/Helper";

import OtpInput from "react-otp-input-rc-17";
import Language from './VerificationScreen.json'
import { InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { IloginModel } from "../../../models/Login.Model";

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

    let history = useHistory();

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
                            localStorage.setItem("token", JSON.stringify(res.data));
                            if (orderData) {
                                orderApi(orderData);
                            }
                            else {
                                window.location.href = `/${getUserLanguage()}${getUserLocationForParam()}/home`;
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

    // const handleSendOtp = async () => {
    //     start();
    //     const smsRegister = await SmsRetriever.startSmsReceiver();
    //     if (smsRegister) {
    //         SmsRetriever.addListener("onSmsReceive", (receivedMessage: ReceivedMessage): void => {
    //             let otpMessage = receivedMessage.message?.toString().substring(4, 10);
    //             alert(otpMessage)
    //             SmsRetriever.removeSmsReceiver();
    //         })
    //     }
    // }

    // const start = () => {
    //     SmsRetriever.getAppSignature().then(res => {
    //         console.log(res.signature)
    //        alert(res.signature)
    //     })
    // }

    const orderApi = (orderData: ISellOrderModel) => {
        orderData.PersonId = getLocalStorage()?.PersonId;
        orderData.UserMobile = getLocalStorage()?.MobileNumber;
        orderData.UserName = getLocalStorage()?.FirstName;

        SellOrderServices.Create(orderData).then(res => {
            if (res.status === 200) {
                localStorage.setItem("orderId", res.data);
                localStorage.removeItem("orders");
                window.location.href = `/${getUserLanguage()}${getUserLocationForParam()}/sell-device-details/${localStorage.getItem("orderId")}`;
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

    const signup = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("register"));
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
            <>
                {isIn() ?
                    <IonContent>
                        <IonGrid className="ion-padding" dir={Direction()} >
                            <IonRow>
                                <IonCol sizeXl='6' className='ls_login-back'>
                                    <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></IonIcon>
                                </IonCol>
                                {questionnaire !== "questionnaire" &&
                                    <IonCol sizeXl="6" className='ls_login-close'>
                                        <IonIcon className='ls-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                                    </IonCol>
                                }
                            </IonRow>
                            <IonRow className='ls_padding-adjustment'>
                                <IonCol sizeLg='3' sizeXl="3" sizeXs="3" sizeSm="3">
                                    <IonImg src={dofylogo}></IonImg>
                                </IonCol>
                                <IonCol sizeLg="12" sizeXs="12" sizeXl="12" sizeSm="12" className=" mt-3 vc_otp">
                                    <IonText>We have sent OTP on <span className="fp_pass">xxx-xxx-{userName.substring(userName.length - 4)}</span> and your registered email </IonText>
                                </IonCol>
                                <IonCol className=" fp_text-gap">
                                    <IonText>Enter OTP here</IonText>
                                </IonCol>
                                <IonCol size="12">
                                    <OtpInput className="otp-box" isInputNum numInputs={6} onChange={handleChange} value={OTP} />
                                </IonCol>
                                {errorOTP &&
                                    <IonCol size="12" >
                                        <IonText className='text-danger'>{errorOTP}</IonText>
                                    </IonCol>
                                }
                                <IonCol size="12" className="text-end" >
                                    <IonText className={getResendButtonHide()}>Resend OTP</IonText>
                                    <IonRouterLink onClick={() => reset()} className={getResendButton()}>Resend OTP</IonRouterLink>
                                </IonCol>
                                <IonCol sizeLg='12' sizeXl="12" sizeXs="12" sizeSm="12" className=' fp_btn-otp '>
                                    <IonButton className='fp_btn-clr' color='white' expand='full' onClick={() => submitHandler()} type="submit">Verify OTP</IonButton>
                                </IonCol>
                                <IonCol className="text-center fp_resend">
                                    <IonText>Resend OTP in Seconds : {counter}</IonText>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className='text-center fp_btn'>
                                    <IonText className='ls_signup cursor-pointer' onClick={signinhandler}><u>Back to Signin</u></IonText>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                    :
                    <IonContent>
                        <IonGrid dir={Direction()} >
                            <IonRow>
                                <IonCol sizeXl="12" className='ls_login-close'>
                                    <IonIcon className='ls-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                                </IonCol>
                            </IonRow>
                            <IonRow className="ls_padding-adjustment">
                                <IonCol sizeLg="3" sizeMd="3" sizeXs="3" sizeXl="3">
                                    <IonImg src={dofylogo} alt="dofy-logo"></IonImg>
                                </IonCol>
                                <IonCol sizeLg="12" sizeXs="12" sizeMd="12" className="mt-3">
                                    <IonText className="ls_signin-text">{dataLocalization.Signin_into_dofy}</IonText>
                                </IonCol>
                                <IonCol sizeLg="12" sizeMd="12" sizeXs="12" sizeXl="12" className="mt-3">
                                    <IonLabel>{dataLocalization.Enter_Mobile_Number}</IonLabel>
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
                                </IonCol>
                                <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12" className="mt-1">
                                    <IonLabel className="ls_lable-style">{dataLocalization.Password}</IonLabel>
                                    <IonInput onIonChange={(e) => handleChange(e.detail.value)} value={OTP} type={"password"} placeholder={dataLocalization.Password} className="ls_input-style"></IonInput>
                                    {errorOTP && <IonText className="text-danger">{errorOTP}</IonText>}
                                    <IonText onClick={() => { forgetpasswordHandler() }} className="ls_fp-text cursor-pointer">{dataLocalization.Forget_Password}</IonText>
                                </IonCol>
                                <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
                                    <IonCheckbox disabled className="login_checkbox login-icon" checked></IonCheckbox>
                                    <IonLabel className="login-text ls_lable-style">{dataLocalization.I_agree_to_the}</IonLabel>
                                    <Link to={`/${getUserLanguage()}${getUserLocationForParam()}/terms-of-use`}>
                                        <IonText className="ls_lable-style text-primary" onClick={() => dispatch(modelChanger(false))}>{dataLocalization.Terms_Conditions} </IonText>
                                    </Link>
                                </IonCol>
                                <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12" className="mt-2">
                                    <IonButton expand="full" className="ls_btn-color"
                                        color="transparent"
                                        title="Continue"
                                        type="submit" onClick={() => submitHandler()}>{dataLocalization.Continue}
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className='text-center fp_btn'>
                                    <IonText className='ls_signup cursor-pointer' onClick={signinhandler}><u>Back to Signin</u></IonText>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                }
            </>
        )
    }


    return (
        <IonPage>
            {
                webUi()
            }
        </IonPage>
    )
}

export default LoginOtp