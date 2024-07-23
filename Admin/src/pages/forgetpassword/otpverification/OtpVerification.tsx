import { useEffect, useState } from "react";
import { IonGrid, IonRow, IonCol, IonText, IonCard, IonButton, IonCardHeader, IonRouterLink, IonCardSubtitle } from "@ionic/react";

import dofylogo from "../../../assets/images/otpvector.png";
import logo from '../../../assets/images/dofy-logo-blue.png';

import { useTypedDispatch, useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";
import { TemporaryPassword } from "../../../features/reducers/otp/Otp.Reducers";

import AuthServices from "../../../services/Auth.Services";

import { HelperConstant } from "../../../components/helper/HelperConstant";
import { CustomImg } from "../../../components/shared/CustomImage";

import OtpInput from "react-otp-input-rc-17";

import "./OtpVerification.css";


function OtpVerification() {

    const dispatch = useTypedDispatch()

    const [counter, setCounter] = useState(HelperConstant.otpVerificationTime.timer);

    let UserNameData = useTypedSelector(state => state.UserNameReducers.UserNameInfoData)
    const [otp, setOtp] = useState("")
    const [errorOTP, setErrorOTP] = useState(false);

    // const { register, handleSubmit, formState: { errors } } = useForm<IOtpVerification>({});

    const reset = () => {
        setCounter(HelperConstant.otpVerificationTime.timer);
        AuthServices.ResendOTP(UserNameData).then(res => {
            if (res.status === 200) {
                getResendButton();
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }
    const getResendButton = () => {
        if (counter > 0) {
            return "ion-hide";
        }
        else {
            return "vs-resend-button";
        }
    }
    const getResendButtonHide = () => {
        if (counter === 0) {
            return "ion-hide";
        }
        else {
            return "vs-resend-hidden";
        }
    }
    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    const handleChange = () => {
        const Data = {
            UserName: UserNameData,
            PassWord: otp
        }
        dispatch(TemporaryPassword(otp))
        AuthServices.Login(Data).then(res => {
            if (res.status === 200) {
                if (res.data === "Invalid Credentials") {
                    return setErrorOTP(true);
                }
                else {
                    setErrorOTP(false);
                    localStorage.setItem('token', res.data?.token);
                    localStorage.setItem('loginId', res.data);
                    // if (!riderlogin) {
                    //     window.location.href = '/HomePage';
                    // }
                    // else {
                    //     window.location.href = '/HomePage';
                    // }
                    window.location.href = '/HomePage';

                }
            }
        }).catch(ex => console.log(ex));
    }

    return (
        <IonGrid className="ion-no-padding">
            <IonRow className="login-header">
                <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
                    <CustomImg className="login-logo" src={dofylogo} />
                </IonCol>
            </IonRow>
            {/* <IonRow >
                        <IonCol sizeXs="12" offsetXs='1' sizeLg='6' offsetLg='3' className="login-card" size="12">
                            <IonText className="login-cardheader">Enter the OTP to Reset Password</IonText>
                        </IonCol>
                    </IonRow> */}
            <IonRow>
                <IonCol sizeMd="7" offsetMd="5" sizeXs="12" offsetXs="0" sizeLg="6" offsetLg="6" sizeSm="12" sizeXl="4">
                    <IonCard className="login-cardform">
                        <IonCardHeader className="ion-text-center" >
                            <CustomImg className="logo-card" src={logo} />
                        </IonCardHeader>
                        <IonCardSubtitle className="login-cardheader ion-text-center">
                            OTP Screen
                        </IonCardSubtitle>
                        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                        <IonGrid className="ion-padding">
                            <IonRow>
                                <IonCol offsetLg="2" sizeLg="8" sizeMd="8" offsetMd="2" sizeXs="12" sizeXl="12" offsetXl="0" >
                                    {/* <IonCol>
                                                <CustomInput label={"OTP"} placeholder="xxxxxx" type={"password"} {...register("encryptedPassword", { required: true })} />
                                                {errors.encryptedPassword && <IonText className='text-danger'>Please enter the OTP</IonText>}
                                                {errorOTP && <IonText className='text-danger'>Invalid OTP</IonText>}
                                            </IonCol> */}
                                    <OtpInput
                                        isInputNum
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        className="os_Input-align"

                                    />
                                    {errorOTP && <IonText className='text-danger'>Invalid OTP</IonText>}
                                </IonCol>
                            </IonRow>
                            <br />
                            <IonRow>
                                <IonCol sizeMd="6" sizeLg="4" sizeXs="6" offsetLg="2.3" className="ion-text-end">
                                    <IonButton className="login-button" color="light" routerLink="/">Cancel</IonButton>
                                </IonCol>  
                                <IonCol sizeMd="6" sizeLg="4" sizeXs="6">
                                    <IonButton className="login-button" color="warning" onClick={() => handleChange()}>Submit</IonButton>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="ion-text-center">
                                    <IonText className={getResendButtonHide()}>Resend OTP</IonText>
                                    <IonRouterLink onClick={() => reset()} className={getResendButton()}>Resend OTP</IonRouterLink>
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-justify-content-center ion-margin-top">
                                <IonText>Resend OTP in Seconds : {counter}
                                </IonText>
                            </IonRow>
                        </IonGrid>
                        {/* </form> */}
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default OtpVerification