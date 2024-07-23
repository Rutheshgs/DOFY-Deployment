import { useState } from "react";

import OtpInput from "react-otp-input-rc-17";

import accountdelete from '../../assets/images/accountdelete.png';

import { getLocalStorage, localStorageClearHandler } from "../helper/Helper";
import { CustomImg } from "../shared/CustomImage";
import { close } from "ionicons/icons";
import dofylogo from '../../assets/images/phase2/dofy-logo.png'

import PersonServices from "../../services/Person.Services";
import './DeleteScreen.css';
import dynamic from "next/dynamic";

const IonAlert = dynamic(() => import('@ionic/react').then(mod => mod.IonAlert), { ssr: false });


type Props = {
    setOTPAlert: any
}

function DeleteScreen({ setOTPAlert }: Props) {

    let personId = getLocalStorage()?.PersonId;

    const [errorOTP, setErrorOTP] = useState("");
    const [OTP, setOTP] = useState("");
    const [isVerifiedOTP, setIsVerifiedOTP] = useState(false);

    const handleChange = (otp: any) => {
        setOTP(otp);
    }

    const validateInputs = () => {
        if (OTP && OTP.length >= 6) return true;
    }

    const logout = () => {
        localStorageClearHandler();
        window.location.href = "/";
    }

    const submitHandler = () => {
        if (validateInputs()) {
            PersonServices.verifyUser(personId, OTP).then((res) => {
                if (res.status === 200) {
                    if (res.data === true) {
                        setIsVerifiedOTP(true);
                        setTimeout(() => { logout() }, 5000);
                    }
                    else {
                        return setErrorOTP("Entered OTP is Incorrect");
                    }
                }
            }).catch(e => {
                console.log(e);
            });
        }
        else {
            return setErrorOTP("Please enter your OTP");
        }
    }

    return (
        <ion-grid class="ds_padding">
            <IonAlert
                isOpen={isVerifiedOTP}
                onDidDismiss={() => logout()}
                header="Account Deleted"
                message="We are Expecting, You will Reconnect Soon!."
                buttons={[
                    {
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            logout();
                        },
                    },
                ]}
            />
            <ion-row>

                <ion-col size="11" class='ls_login-close'>
                    <ion-icon class="ds_float-right" icon={close} onClick={() => setOTPAlert(false)}></ion-icon>
                </ion-col>
            </ion-row>
            <ion-row class="ls_padding-adjustment">
                <ion-col size-xs='3' class="vp_logo">
                    <img src={dofylogo.src} alt="dofy-logo"></img>
                </ion-col>
                <ion-col size-lg="12" size-xl="12" size-xs="12" size-sm="12" class=" mt-3">
                    <ion-text > <span className="fp_pass">xxx-xxx-{getLocalStorage().MobileNumber.substring(getLocalStorage().MobileNumber.length - 4)}</span> and your registered email </ion-text>
                </ion-col>
                <ion-col size-lg="12" size-xs="12" size-xl="12" size-md="12" class=" fp_text-gap">
                    <ion-text class="ls_signin-text">Please enter OTP </ion-text>
                </ion-col>
                <ion-col size-lg="12" size-xs="12">
                    <OtpInput className="otp-box" isInputNum numInputs={6} onChange={handleChange} value={OTP} />
                </ion-col>
                {errorOTP &&
                    <ion-col size="12" >
                        <ion-text class='text-danger'>{errorOTP}</ion-text>
                    </ion-col>
                }

                <ion-col size-lg='12' size-xl="12" size-xs="12" size-sm="12" class=' fp_btn-otp '>
                    <ion-button class='fp_btn-clr' color='white' expand='full' onClick={() => submitHandler()} type="submit">Verify OTP</ion-button>
                </ion-col>

            </ion-row>

        </ion-grid>
    )
}

export default DeleteScreen