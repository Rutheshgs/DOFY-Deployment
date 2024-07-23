import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IonPage, IonText, IonContent, IonGrid, IonRow, IonCol, IonCheckbox, IonButton, IonIcon, IonLabel, IonImg, IonInput } from "@ionic/react"

import { useForm, SubmitHandler } from "react-hook-form";

import '../../login/Login.css';

import AuthService from "../../../services/Auth.Services"
import { IloginModel } from "../../../models/Login.Model";

import { useTypedDispatch, useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";
import { newUser } from "../../../features/reducers/registration/Registration.Reducers";
import { loginPageChanger, modelChanger, resetModelChanger } from "../../../features/reducers/login/LoginModel.Reducer";

import "./LoginScreen.css";

import { Direction, IsLogginUser, getLocalStorage, getUserLocationForParam, getUserLanguage, isIn, onKeyDown, restrictInput, localStorageClearHandler } from "../../../components/helper/Helper";
import Language from "../LoginLanguage.json";
import { ISellOrderModel } from "../../../models/order/sell/SellOrder.Model";
import SellOrderServices from "../../../services/order/sell/SellOrder.Services";
import dofylogo from "../../../assets/images/phase2/dofy-logo.png"
import { close } from "ionicons/icons";
import { InputAdornment, TextField } from "@mui/material";


function LoginMobileNumber() {

    let dispatch = useTypedDispatch();
    let dataLocalization = Language[getUserLanguage()];
    let orderData = JSON.parse(localStorage.getItem("orders") as any);
    let questionnaire = useTypedSelector((state) => state.PageChangeReducer.selectedPage);

    let newNumber = useTypedSelector(state => state.NewUserRegistrationReducer.NewNumber);
    let IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<IloginModel>({ defaultValues: { "UserName": newNumber ? newNumber : "" } });
    const [isDefault, setIsDefault] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [disbleLogin, setDisableLogin] = useState<boolean>(false);
    const [errorOTP, setErrorOTP] = useState("");

    const signup = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("register"));
    }

    const orderApi = (orderData: ISellOrderModel) => {
        orderData.PersonId = getLocalStorage()?.PersonId;
        orderData.UserMobile = getLocalStorage()?.MobileNumber;
        orderData.UserName = getLocalStorage()?.FirstName;

        SellOrderServices.Create(orderData).then(res => {
            if (res.status === 200) {
                localStorage.setItem("orderId", res.data);
                localStorage.removeItem("orders");
                window.location.href = `/${getUserLanguage()}/sell-device-details/${localStorage.getItem("orderId")}`;
            }
        }).catch((e: string) => {
            console.log(e);
        });

    }

    const onSubmit: SubmitHandler<IloginModel> = data => {
        if (isDefault) {
            setDisableLogin(true);
            setIsSelected(false);
            AuthService.SignIn(data.UserName).then(res => {
                if (res.status === 200) {
                    setDisableLogin(false);
                    dispatch(newUser(data.UserName));
                    if (res.data === "New User") {
                        dispatch(loginPageChanger("register"));
                    }
                    else {
                        dispatch(loginPageChanger("verification"));
                    }
                }
            }).catch((e: string) => {
                console.log(e)
            })
        }
        else {
            return setIsSelected(true);
        }
    }

    const loginHandler = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("register"));
    }

    const forgetpasswordHandler = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("forgot-password"));
    }

    const switchLanguage = () => {
        let defaultPath = window.location.pathname.split('/').splice(2).toString().replaceAll(',', '/');
        localStorageClearHandler();
        if (getUserLanguage() == "ae_ar" || getUserLanguage() == "ae_en") {
            let constructedPath = window.location.pathname.split('/').splice(1)[0] = "in_en".toString().replaceAll(',', '/');
            window.location.href = `/${constructedPath}/${defaultPath}`;
        }
        else {
            let constructedPath = window.location.pathname.split('/').splice(1)[0] = "ae_en".toString().replaceAll(',', '/');
            window.location.href = `/${constructedPath}/${defaultPath}`;
        }
    }

    useEffect(() => {
        IsLogginUser();
    }, []);

    const webUi = () => {
        return (
            <IonPage>
                {isIn() ?
                    <IonContent>
                        <IonGrid dir={Direction()} >
                            <IonRow>
                                <IonCol sizeXl="12" className='ls_login-close'>
                                    <IonIcon className='ls-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                                </IonCol>
                            </IonRow>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <IonRow className="ls_padding-adjustment rp_comp-size">
                                    <IonCol sizeLg="2.5" sizeMd="3" sizeXs="3">
                                        <IonImg alt="dofy-logo" src={dofylogo}></IonImg>
                                    </IonCol>
                                    <IonCol sizeLg="12" sizeMd="12" sizeXs="12" className="mt-3">
                                        <IonText className="p-0 ls_signin-text">{dataLocalization.Signin_into_dofy}</IonText><br />
                                    </IonCol>
                                    <IonCol sizeLg="12" sizeMd="12" sizeXs="12" className="mt-3">
                                        <IonLabel className="ls_lable-style">{dataLocalization.Mobile_Number}</IonLabel><br />
                                        <IonInput placeholder={dataLocalization.Mobile_Number} onIonChange={(e: any) => { setValue("UserName", e.detail.value); clearErrors("UserName"); restrictInput(e, 10) }} type="text" onKeyDown={onKeyDown}   {...register("UserName", { required: true, minLength: 10, maxLength: 10 })} className='fp_outline-style'></IonInput>
                                        {errors.UserName?.type === "required" && <IonText className='text-danger'>{dataLocalization.Enter_Mobile_Number}</IonText>}
                                        {(errors.UserName?.type === "minLength" || errors.UserName?.type === "maxLength") && <IonText className='text-danger'>{dataLocalization.Enter_valid_Mobile_Number}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg="12" sizeMd="12" sizeXs="12">
                                        <IonCheckbox className="login_checkbox login-icon" onIonChange={(e) => { setIsDefault(e.detail.checked); setIsSelected(false) }} ></IonCheckbox>
                                        <IonLabel className="login-text ls_lable-style">{dataLocalization.I_agree_to_the}</IonLabel>
                                        <Link to={`/${getUserLanguage()}${getUserLocationForParam()}/terms-of-use`}>
                                            <IonText className="ls_lable-style text-primary" onClick={() => dispatch(modelChanger(false))}>{dataLocalization.Terms_Conditions} </IonText>
                                        </Link> <br />
                                        {isSelected && <IonText color='primary'>{dataLocalization.Please_accept_Terms_and_Conditions}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg="12" sizeMd="12" sizeXs="12" className="mt-2">
                                        <IonButton disabled={disbleLogin ? true : isDefault ? false : true} className='ls_btn-color' color='white' expand='full' type="submit" > {dataLocalization.Continue}</IonButton>
                                    </IonCol>
                                    <IonCol className='text-center ls_lable-style'>
                                        <IonText >{dataLocalization.You_Dont_have_account}</IonText>
                                        <IonText className="ls_signup cursor-pointer" onClick={() => signup()}>{dataLocalization.signup}</IonText>
                                    </IonCol>
                                    <IonCol size="12" className="text-center ls_lable-style">
                                        <IonText onClick={() => { switchLanguage() }} className="ls_signup cursor-pointer" >{dataLocalization.Switch_Location}</IonText>
                                    </IonCol>
                                </IonRow>
                            </form>
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
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                            variant="outlined"
                                            id="outlined-start-adornment"
                                            sx={{ width: '25ch' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+971</InputAdornment>,
                                            }}
                                            type="number"
                                            {...register("UserName", { required: true, onChange: (e: any) => { clearErrors("UserName"); restrictInput(e, 10) } })}
                                        />
                                        {errors.UserName?.type === "required" && <IonText className='text-danger'>{dataLocalization.Enter_Mobile_Number}</IonText>}
                                        {(errors.UserName?.type === "minLength" || errors.UserName?.type === "maxLength") && <IonText className='text-danger'>{dataLocalization.Enter_valid_Mobile_Number}</IonText>}
                                    </IonCol>
                                    {/* <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12" className="mt-1">
                                        <IonLabel className="ls_lable-style">{dataLocalization.Password}</IonLabel>
                                        <IonInput onIonChange={(e: any) => { setValue("Password", e.detail.value); clearErrors("Password"); restrictInput(e, 200) }} type={"password"} placeholder={dataLocalization.Password} {...register("Password", { required: true })} className="ls_input-style"></IonInput>
                                        {errors.Password?.type === "required" && <IonText className='text-danger'>{dataLocalization.Enter_Password}</IonText>}
                                        {(errors.Password?.type === "minLength" || errors.Password?.type === "maxLength") && <IonText className='text-danger'>{dataLocalization.Enter_valid_Password}</IonText>}
                                        <IonText onClick={() => { forgetpasswordHandler() }} className="ls_fp-text cursor-pointer">{dataLocalization.Forget_Password}</IonText>
                                        {errorOTP && <IonText className="text-danger">{errorOTP}</IonText>}
                                    </IonCol> */}
                                    <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
                                        <IonCheckbox className="login_checkbox login-icon" onIonChange={(e) => { setIsDefault(e.detail.checked); setIsSelected(false) }}></IonCheckbox>
                                        <IonLabel className="login-text ls_lable-style">{dataLocalization.I_agree_to_the}</IonLabel>
                                        <Link to={`/${getUserLanguage()}${getUserLocationForParam()}/terms-of-use`}>
                                            <IonText className="ls_lable-style text-primary" onClick={() => dispatch(modelChanger(false))}>{dataLocalization.Terms_Conditions} </IonText>
                                        </Link> <br />
                                        {isSelected && <IonText color='primary'>{dataLocalization.Please_accept_Terms_and_Conditions}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12" className="mt-2">
                                        <IonButton disabled={disbleLogin ? true : isDefault ? false : true} expand="full" className="ls_btn-color"
                                            color="transparent"
                                            title="Continue"
                                            type="submit">{dataLocalization.Continue}
                                        </IonButton>
                                    </IonCol>
                                    <IonCol sizeLg="12" className="text-center ls_lable-style">
                                        {dataLocalization.You_Dont_have_account}<IonText onClick={() => { signup() }} className="ls_signup cursor-pointer" >{dataLocalization.signup}</IonText>
                                    </IonCol>
                                    <IonCol size="12" className="text-center ls_lable-style">
                                        <IonText onClick={() => { switchLanguage() }} className="ls_signup cursor-pointer" >{dataLocalization.Switch_Location}</IonText>
                                    </IonCol>
                                </IonRow>
                            </form>
                        </IonGrid>
                    </IonContent>
                }
            </IonPage>
        )
    }

    return (
        <IonPage dir={Direction()}>
            {
                webUi()
            }
        </IonPage>
    )
}
export default LoginMobileNumber