import { IonButton, IonCol, IonGrid, IonRouterLink, IonRow, IonText, IonTitle, IonToast } from '@ionic/react';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import OtpInput from "react-otp-input-rc-17";
import "./OtpScreen.css";
import React from 'react';
import SellServices from '../../services/Sell.Services';
import { IOrderOtpView } from '../../models/OrderOtpView.Model';
import { HelperConstant } from '../helper/HelperConstant';
import { useHistory } from 'react-router-dom';


interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    orderId: any,
}

export const OtpScreen = React.forwardRef(({ orderId, ...rest }: inputProps, ref) => {

    let history = useHistory();

    const [OTP, setOTP] = useState("");
    const [otpData, setOtpData] = useState<IOrderOtpView>();
    const [successToast, setSuccessToast] = useState(false);
    const [dangerToast, setDangerToast] = useState(false);
    const [counter, setCounter] = useState(0);
    const [isResendOTP, setIsResendOTP] = useState(false);


    const handleChange = (otp: any) => {
        setOTP(otp);
    }
    const timersetting = () => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }

    const GetOtp = (orderId: number, type: "OTP" | "resendOTP") => {
        if (type === "OTP") {
            setIsResendOTP(true);
        }
        SellServices.GetOrderOTP(orderId).then(res => {
            if (res.status === 200)
                setCounter(HelperConstant.otpVerificationTime.timer)
            setOtpData(res.data)
            timersetting();
        }).catch(exception => console.log(exception))
    }

    const SubmitOrderOtp = () => {
        const Data = {
            OrderId: otpData?.orderId,
            personId: otpData?.personId,
            password: OTP,
            emailTemplateId: otpData?.emailTemplateId
        };
        SellServices.ValidateOrderOTP(Data).then(res => {
            if (res.status === 200) {
                if (res.data === true) {
                    setSuccessToast(true);
                    getResendButton();
                    history.push(`/SuccessScreen/${orderId}`)
                }
                else {
                    setDangerToast(true);
                }
            }
        }).catch(ex => console.log(ex))
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
            return "ion-hide";
        }
        else {
            return "vs-resend-hidden";
        }
    }

    useEffect(() => {
        timersetting();
    }, [counter])
    useEffect(() => {
        GetOtp(orderId, "OTP")
    }, [])

    return (

        <IonGrid className='ion-padding'>
            <IonRow>
                <IonCol sizeLg='12' sizeXl='12' sizeMd='12' sizeXs='12'>
                    <IonTitle className='ion-text-center' >OTP Verification</IonTitle>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol sizeLg='12' sizeXl='12' sizeMd='12' sizeXs='12' className='mt-4'>
                    <IonRow>
                        <IonCol sizeMd='6' offsetMd='3' sizeLg='6' offsetLg='3' sizeXl='4' offsetXl='4'>
                            <OtpInput
                                isInputNum
                                isInputSecure
                                value={OTP}
                                onChange={handleChange}
                                numInputs={6}
                                separator={<span>&nbsp;&nbsp;</span>}
                                className="os_Input-align"
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='ion-text-center' sizeLg="12" sizeXs="12">                           
                            <IonButton color="success" disabled={counter === 0} onClick={() => SubmitOrderOtp()}>submit</IonButton>
                        </IonCol>                        
                    </IonRow>
                    {(isResendOTP) &&
                        <IonRow>
                            <IonCol className='ion-text-center'>
                                <IonText className={getResendButtonHide()}>Resend OTP </IonText>
                                <IonRouterLink onClick={() => GetOtp(orderId, "resendOTP")} className={getResendButton()}>Resend OTP</IonRouterLink>
                            </IonCol>
                        </IonRow>
                    }
                    <IonRow className="ion-justify-content-center ion-margin-top">
                        <IonCol sizeLg='12' sizeXs='12' className='ion-text-center'>
                            <IonText>Resend OTP in Seconds : {counter}</IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size='12'>
                            <IonToast color='success' isOpen={successToast} onDidDismiss={() => setSuccessToast(false)}
                                message="Order completed Successfully" duration={2000} />
                            <IonToast color='danger' isOpen={dangerToast} onDidDismiss={() => setDangerToast(false)}
                                message="OTP Invaild" duration={2000} />
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
});



