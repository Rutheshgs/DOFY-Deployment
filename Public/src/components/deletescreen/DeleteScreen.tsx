import { useState } from "react";
import { IonAlert, IonButton, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonText } from "@ionic/react";

import OtpInput from "react-otp-input-rc-17";

import accountdelete from '../../assets/images/accountdelete.png';

import { getLocalStorage, localStorageClearHandler } from "../helper/Helper";
import { CustomImg } from "../shared/CustomImage";
import { close } from "ionicons/icons";
import dofylogo from '../../assets/images/phase2/dofy-logo.png'

import PersonServices from "../../services/Person.Services";
import './DeleteScreen.css';

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
        <IonGrid className="ds_padding">
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
            <IonRow>
                
                <IonCol size="11" className='ls_login-close'>
                    <IonIcon className="ds_float-right" icon={close} onClick={() => setOTPAlert(false)}></IonIcon>
                </IonCol>
            </IonRow>
            <IonRow className="ls_padding-adjustment">
                <IonCol sizeXs='3' className="vp_logo">
                    <IonImg src={dofylogo}></IonImg>
                </IonCol>
                <IonCol sizeLg="12" sizeXl="12" sizeXs="12" sizeSm="12" className=" mt-3">
                    <IonText > <span className="fp_pass">xxx-xxx-{getLocalStorage().MobileNumber.substring(getLocalStorage().MobileNumber.length - 4)}</span> and your registered email </IonText>
                </IonCol>
                <IonCol sizeLg="12" sizeXs="12" sizeXl="12" sizeMd="12" className=" fp_text-gap">
                    <IonText className="ls_signin-text">Please enter OTP </IonText>
                </IonCol>
                <IonCol sizeLg="12" sizeXs="12">
                    <OtpInput className="otp-box" isInputNum numInputs={6} onChange={handleChange} value={OTP} />
                </IonCol>
                {errorOTP &&
                    <IonCol size="12" >
                        <IonText className='text-danger'>{errorOTP}</IonText>
                    </IonCol>
                }
                
                <IonCol sizeLg='12' sizeXl="12" sizeXs="12" sizeSm="12" className=' fp_btn-otp '>
                    <IonButton className='fp_btn-clr' color='white' expand='full' onClick={() => submitHandler()} type="submit">Verify OTP</IonButton>
                </IonCol>
              
            </IonRow>

        </IonGrid>
    )
}

export default DeleteScreen