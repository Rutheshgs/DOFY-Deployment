import { useState } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonText, IonCard, IonButton, IonCardHeader } from '@ionic/react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import dofylogo from "../../../assets/images/otpvector.png";
import logo from '../../../assets/images/logo-round-black.png';

import { CustomInput } from '../../../components/shared/CustomInput'
import "./StepOne.css"
import AuthServices from '../../../services/Auth.Services';
import { CustomImg } from '../../../components/shared/CustomImage';
import { IloginModel } from '../../../models/Login.Model';
import { GetHome } from '../../../components/helper/Helper';
import { getRoleId } from '../../../components/helper/TokenHelper';
import { HelperConstant } from '../../../components/helper/HelperConstant';


function StepOne() {
    const [AuthorizedUser, setAuthorizedUser] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<IloginModel>({});

    const onSubmit: SubmitHandler<IloginModel> = (data) => {
        AuthServices.AdminLogin(data).then(res => {
            if (res.status === 200) {
                if (res.data === "Not Valid User" || res.data === "Invalid Credentials") {
                    return setAuthorizedUser(true);
                }
                else {
                    localStorage.setItem('token', res.data?.token);
                    localStorage.setItem('loginId', res.data);
                    const roleId: number = getRoleId() ?? 0;

                    if (roleId === HelperConstant.Roles.Rider) {
                        GetHome(null, 'homepage');
                    }
                    else {
                        GetHome(null, 'dashboard');
                    }
                }
            }
        }).catch((e: string) => {
            console.log(e)
        });
    }

    return (
        <IonPage>
            <IonContent fullscreen={true}>
                <IonGrid className="ion-no-padding">
                    <IonRow className="login-header">
                        <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
                            <CustomImg className="login-logo" src={dofylogo} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol sizeMd="6" offsetMd="6" sizeXs="12" offsetXs='0' offsetSm='0' sizeLg="6" offsetLg="6" sizeSm="12" sizeXl="4" offsetXl='6'>
                            <IonCard className="login-cardform">
                                <IonCardHeader className='ion-text-center' >
                                    <IonCol sizeLg='12' sizeMd='12' sizeSm='12' sizeXl='12' sizeXs='12'>
                                        <CustomImg className="logo-card" src={logo} />
                                        <IonText className="login-cardheader">WELCOME TO DOFY</IonText><br />
                                    </IonCol>
                                </IonCardHeader>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <IonGrid className="ion-padding">
                                        {/* <IonRow>
                                                    <IonCol sizeXs="12" offsetMd='0' offsetXs='3' sizeLg='12' offsetLg='1'>
                                                        <IonText className='so-subcontent'>Please enter your mobile number</IonText>
                                                    </IonCol>
                                                </IonRow> */}
                                        <IonRow>
                                            <IonCol >
                                                <CustomInput label={"Mobile Number"} autoComplete="'false'" placeholder="Mobile Number" type={"text"} {...register("UserName", { required: true, minLength: 10, maxLength: 10 })} />
                                                {errors.UserName && <IonText className='text-danger'>Please check the Username</IonText>}
                                            </IonCol>
                                        </IonRow>
                                        <IonRow  >
                                            <IonCol>
                                                <CustomInput label={"Password"} placeholder="xxxxxxxxx" type={"password"} {...register("PassWord", { required: true })} />
                                                {errors.PassWord && <IonText className='text-danger'>Please enter the Password</IonText>}
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            {(AuthorizedUser && !errors.PassWord) &&
                                                <IonCol>
                                                    <IonText className='text-danger'>Please check the Username and Password</IonText>
                                                </IonCol>
                                            }
                                        </IonRow>
                                        <br />
                                        <IonRow>
                                            <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeXs='6'>
                                                <IonButton className="login-button bg-warning" color="white" type="submit">Submit</IonButton>
                                            </IonCol>
                                            <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeXs='6' className="ion-align-self-center">
                                                <Link className="login-forgetpassword" to={"/"}>Back to login</Link>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </form>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default StepOne