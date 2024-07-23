import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonText, IonItem, IonButton, IonIcon, IonSelect, IonSelectOption, IonRadio, IonRadioGroup } from '@ionic/react';
import { logInOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { isLogginUser, isIn } from '../../components/helper/Helper';
import { CustomImg } from '../../components/shared/CustomImage';
import { CustomInput } from '../../components/shared/CustomInput';
import { UserNameData } from '../../features/reducers/username/UserName.Reducers';
import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { IloginModel } from '../../models/Login.Model';
import AuthServices from '../../services/Auth.Services';
import OtpVerification from '../forgetpassword/otpverification/OtpVerification';
import login from '../../assets/images/loginvector.png';
import logo from '../../assets/images/dofy-logo-blue.png';
import { CustomDropdown } from '../../components/shared/CustomDropdown';
import { SectionData } from './SectionPageData';
import { useHistory } from 'react-router';
import { CustomMaterialDropDown } from '../../components/shared/CustomMaterialDropDown';

function SectionPage() {

    let history = useHistory();


    const dispatch = useTypedDispatch();
    let UserNameDatainfo = useTypedSelector(state => state.UserNameReducers.UserNameInfoData);

    const [AuthorizedUser, setAuthorizedUser] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IloginModel>({});
    const [country, setcountry] = useState<Array<any>>([]);

    const routerHandler = (val: any) => {
        if (val == 1) {
            localStorage.setItem('CountryCode', 'in');
            localStorage.setItem('LanguageCode', 'en');
            window.location.href = '/login';
        }
        else {
            localStorage.setItem('CountryCode', 'ae');
            localStorage.setItem('LanguageCode', 'en');
            window.location.href = '/login?ae_ar';
        }
    }

    const onSubmit: SubmitHandler<IloginModel> = (data) => {
        AuthServices.SignIn(data.UserName).then(res => {
            if (res.status === 200) {
                if (res.data === "Not Valid User" || res.data === "Invalid Credentials") {
                    return setAuthorizedUser(true);
                }
                else {
                    dispatch(UserNameData(data.UserName));
                }
            }
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        isLogginUser();
    }, []);

    return (
        <IonPage>
            <IonContent fullscreen={true}>
                {UserNameDatainfo === "" ?
                    <IonGrid className="ion-no-padding">
                        <IonRow className="login-header">
                            <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
                                <CustomImg className="login-logo" src={login} />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeMd="6" offsetMd="6" sizeXs="12" offsetXs="0" sizeLg="7" offsetLg="5" sizeSm="12" sizeXl="5" offsetXl="6">
                                <IonCard className="login-cardform">
                                    <IonCardHeader>
                                        <CustomImg className="logo-card" src={logo} />
                                    </IonCardHeader>
                                    <IonCardSubtitle className="login-cardheader ion-text-center">
                                        WELCOME TO DOFY
                                    </IonCardSubtitle>
                                    <IonCardHeader>
                                        <IonCol sizeXs="12" sizeMd="3">
                                            <CustomMaterialDropDown label={"SELECT COUNTRY"} data={SectionData} onIonChange={routerHandler} selectedValue={""} />
                                        </IonCol>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid> :
                    <OtpVerification />
                }
            </IonContent>
        </IonPage>
    )
}

export default SectionPage;
