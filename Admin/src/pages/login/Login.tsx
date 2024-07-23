import { useEffect, useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonPage, IonRow, IonText } from "@ionic/react";
import { logInOutline } from "ionicons/icons";

import './Login.css';

import { useForm, SubmitHandler } from "react-hook-form";

import login from '../../assets/images/loginvector.png';
import logo from '../../assets/images/dofy-logo-blue.png';
import OtpVerification from "../forgetpassword/otpverification/OtpVerification";

import { CustomInput } from "../../components/shared/CustomInput";
import { CustomImg } from "../../components/shared/CustomImage";

import { IloginModel } from "../../models/Login.Model";
import AuthServices from "../../services/Auth.Services";

import { useTypedDispatch, useTypedSelector } from "../../features/reduxhooks/ReduxHooks";
import { UserNameData } from "../../features/reducers/username/UserName.Reducers";
import { GetLocation, isIn, isLogginUser, restrictInput } from "../../components/helper/Helper";
import { type } from "os";
import { InputAdornment, TextField } from "@mui/material";
import { useHistory } from "react-router";

function Login() {
    let history = useHistory();

    const dispatch = useTypedDispatch();
    let UserNameDatainfo = useTypedSelector(state => state.UserNameReducers.UserNameInfoData);

    const [AuthorizedUser, setAuthorizedUser] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm<IloginModel>({});


    const onSubmit: SubmitHandler<IloginModel> = (data) => {
        isIn() ?
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
            })
            :
            AuthServices.emailauthenticate(data.UserName, data.PassWord).then(res => {
                if (res.status === 200) {
                    if (res.data === "Not Valid User" || res.data === "Invalid Credentials") {
                        return setAuthorizedUser(true);
                    }
                    else {
                        localStorage.setItem('token', res.data?.token);
                        localStorage.setItem('loginId', res.data);
                        window.location.href = '/HomePage';
                    }
                }
            }).catch(e => {
                console.log(e);
            })
    }

    const dofylanguageHandler = () => {
        history.push("/sectionpage");
    }

    useEffect(() => {
        isLogginUser();
        GetLocation("sectionpage");
    }, []);

    return (
        <IonPage>
            {isIn() ?
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
                                            WELCOME TO DOFY - ADMIN
                                        </IonCardSubtitle>
                                        <IonCardContent>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <IonGrid>
                                                    <IonRow>
                                                        <IonCol>
                                                            <CustomInput label={"Mobile Number"} onIonChange={(e: any) => { setValue("UserName", e.detail.value) }} placeholder="User Name" type={"text"} {...register("UserName", { required: true })} />
                                                            {errors.UserName && <IonText className='text-danger'>Please enter the Username</IonText>}
                                                        </IonCol>
                                                    </IonRow>
                                                    {/* <IonRow  >
                                     <IonCol>
                                         <CustomInput label={"Password"} placeholder="xxxxxxxxx" type={"password"} {...register("PassWord", { required: true })} />
                                         {errors.PassWord && <IonText className='text-danger'>Please enter the Password</IonText>}
                                     </IonCol>
                                 </IonRow> */}
                                                    <IonRow>
                                                        {(AuthorizedUser && !errors.PassWord) &&
                                                            <IonCol>
                                                                <IonText className='text-danger'>Please check the Username and Password</IonText>
                                                            </IonCol>
                                                        }
                                                    </IonRow>
                                                    <IonRow className="ion-margin-top">
                                                        <IonCol size="12">
                                                            <IonItem lines="none" color="transparent">
                                                                {/* <Link className="login-forgetpassword" to={"/StepOne"}>
                                                 Login with Password
                                             </Link> */}<IonCol size="12" className="text-center">
                                                                    <IonText onClick={() => { dofylanguageHandler() }} className="ls_Login cursor-pointer" >Change Country</IonText>
                                                                </IonCol>
                                                                <IonButton className="bg-warning" slot="end" color="white" size="small" type="submit">
                                                                    <IonIcon style={{ paddingRight: '5px' }} icon={logInOutline} />Sign In
                                                                </IonButton>
                                                            </IonItem>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonGrid>
                                            </form>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid> :
                        <OtpVerification />
                    }
                </IonContent>
                :
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
                                            WELCOME TO DOFY - ADMIN(UAE)
                                        </IonCardSubtitle>
                                        <IonCardContent>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <IonGrid>
                                                    <IonRow>
                                                        <IonCol size="12">
                                                            <TextField
                                                                style={{ width: "99%" }}
                                                                variant="standard"
                                                                label={"Mobile Number"}
                                                                id="outlined-start-adornment"
                                                                placeholder="Mobile Number"
                                                                sx={{ m: 1, width: '25ch' }}
                                                                InputProps={{
                                                                    startAdornment: <InputAdornment position="start">+971</InputAdornment>,
                                                                }}
                                                                type="number"
                                                                {...register("UserName", { required: true, onChange: (e: any) => { clearErrors("UserName"); restrictInput(e, 10) } })}
                                                            />
                                                            {errors.UserName?.type === "required" && <IonText color='danger'>Enter the UserName</IonText>}
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow>
                                                        <IonCol>
                                                            <TextField
                                                                style={{ width: "99%" }}
                                                                variant="standard"
                                                                label={"Password"}
                                                                id="outlined-start-adornment"
                                                                placeholder="PassWord"
                                                                sx={{ m: 1, width: '25ch' }}
                                                                type="password"
                                                                {...register("PassWord", { required: true, onChange: () => clearErrors("PassWord") })}
                                                            />
                                                            {errors.PassWord?.type === "required" && <IonText color='danger'>Enter the Password</IonText>}
                                                        </IonCol>
                                                    </IonRow>
                                                    {/* <IonRow  >
                                 <IonCol>
                                     <CustomInput label={"Password"} placeholder="xxxxxxxxx" type={"password"} {...register("PassWord", { required: true })} />
                                     {errors.PassWord && <IonText className='text-danger'>Please enter the Password</IonText>}
                                 </IonCol>
                             </IonRow> */}
                                                    <IonRow>
                                                        {(AuthorizedUser && !errors.PassWord && !errors.UserName) &&
                                                            <IonCol>
                                                                <IonText className='text-danger'>Please check the Username and Password</IonText>
                                                            </IonCol>
                                                        }
                                                    </IonRow>
                                                    <IonRow className="ion-margin-top">
                                                        <IonCol size="12">
                                                            <IonItem lines="none" color="transparent">
                                                                {/* <Link className="login-forgetpassword" to={"/StepOne"}>
                                             Login with Password
                                         </Link> */}<IonCol size="12" className="text-center">
                                                                    <IonText onClick={() => { dofylanguageHandler() }} className="ls_Login cursor-pointer" >Change Country</IonText>
                                                                </IonCol>
                                                                <IonButton className="bg-warning" slot="end" color="white" size="small" type="submit">
                                                                    <IonIcon style={{ paddingRight: '5px' }} icon={logInOutline} />Sign In
                                                                </IonButton>
                                                            </IonItem>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonGrid>
                                            </form>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid> :
                        <OtpVerification />
                    }
                </IonContent>}

        </IonPage>
    )
}

export default Login