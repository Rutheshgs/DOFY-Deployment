import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import '../../login/Login.css';

import AuthService from "../../../services/Auth.Services"
import { IloginModel } from "../../../models/Login.Model";

import { useTypedDispatch, useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";
import { newUser } from "../../../features/reducers/registration/Registration.Reducers";
import { loginPageChanger, modelChanger, resetModelChanger } from "../../../features/reducers/login/LoginModel.Reducer";

import "./LoginScreen.css";

import { Direction, IsLogginUser, getUserLocationForParam, getUserLanguage, isIn, onKeyDown, restrictInput, localStorageClearHandler, ExistingLocation } from "../../../components/helper/Helper";
import Language from "../LoginLanguage.json";
import dofylogo from "../../../assets/images/phase2/dofy-logo.png"
import { close } from "ionicons/icons";
import { InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";
import { isPlatform } from "@ionic/core";

const IonCheckBox = dynamic(() => import('@ionic/react').then(mod => mod.IonCheckbox), { ssr: false });

function LoginMobileNumber() {

    let dataLocalization = Language[getUserLanguage()];

    let dispatch = useTypedDispatch();

    let newNumber = useTypedSelector(state => state.NewUserRegistrationReducer.NewNumber);

    const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<IloginModel>({ defaultValues: { "UserName": newNumber ? newNumber : "" } });
    const [isDefault, setIsDefault] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [disbleLogin, setDisableLogin] = useState<boolean>(false);
    const [errorOTP, setErrorOTP] = useState("");

    const signup = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("register"));
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

    const switchLanguage = () => {
        localStorageClearHandler();
        if (ExistingLocation() == "ae_ar" || ExistingLocation() == "ae_en") {
            let constructedPath = window.location.pathname.split('/').splice(1)[0] = "in_en".toString().replaceAll(',', '/');
            localStorage.setItem("Ln", 'in_en');
            window.location.href = `/${constructedPath}${getUserLocationForParam("in_en")}`;
            // window.location.href = `/`;
        }
        else {
            let constructedPath = window.location.pathname.split('/').splice(1)[0] = "ae_en".toString().replaceAll(',', '/');
            localStorage.setItem("Ln", 'ae_en');
            window.location.href = `/${constructedPath}${getUserLocationForParam("ae_en")}`;
            // window.location.href = `/`;
        }
    }

    useEffect(() => {
        IsLogginUser();
    }, []);

    const webUi = () => {
        return (
            <ion-content class="fl_content-style">
                {isIn() ?
                    <ion-grid dir={Direction()}>
                        <ion-row>
                            <ion-col size-xl="12" class='ls_login-close'>
                                <ion-icon class='ls-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                            </ion-col>
                        </ion-row>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ion-row class="ls_padding-adjustment">
                                <ion-col size-lg="2.5" size-md="3" size-xs="3">
                                    <ion-img alt="dofy-logo" src={dofylogo.src}></ion-img>
                                </ion-col>
                                <ion-col size-lg="12" size-md="12" size-xs="12" class="mt-3">
                                    <ion-text class="p-0 ls_signin-text">{dataLocalization.Signin_into_dofy}</ion-text><br />
                                </ion-col>
                                <ion-col size-lg="12" size-md="12" size-xs="12" class="mt-3">
                                    <ion-text class="ls_lable-style">{dataLocalization.Mobile_Number}</ion-text><br />
                                    <TextField
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        placeholder={dataLocalization.Mobile_Number}
                                        id="outlined-start-adornment"
                                        sx={{ width: '25ch' }}
                                        {...register("UserName", { required: true, minLength: 10, maxLength: 10, onChange: (e: any) => { setValue("UserName", e.target.value); clearErrors("UserName"); restrictInput(e, 10) } })}
                                        type="text" onKeyDown={onKeyDown} />
                                    {errors.UserName?.type === "required" && <ion-label color='danger'>{dataLocalization.Enter_Mobile_Number}</ion-label>}
                                    {(errors.UserName?.type === "minLength" || errors.UserName?.type === "maxLength") && <ion-label color='danger'>{dataLocalization.Enter_valid_Mobile_Number}</ion-label>}
                                </ion-col>
                                <ion-col size-lg="12" size-md="12" size-xs="12">
                                    <IonCheckBox className="login_checkbox login-icon" onIonChange={(e) => { setIsDefault(e.detail.checked); setIsSelected(false) }} ></IonCheckBox>
                                    <ion-text class="login-text ls_lable-style">{dataLocalization.I_agree_to_the}</ion-text>
                                    <Link href={`/${getUserLanguage()}/terms-of-use`}>
                                        <ion-label color='primary' class="ls_lable-style" onClick={() => dispatch(modelChanger(false))}>{dataLocalization.Terms_Conditions} </ion-label>
                                    </Link> <br />
                                    {isSelected && <ion-text color='primary'>{dataLocalization.Please_accept_Terms_and_Conditions}</ion-text>}
                                </ion-col>
                                <ion-col size-lg="12" size-md="12" size-xs="12" class="mt-2">
                                    <ion-button disabled={disbleLogin ? true : isDefault ? false : true} class='ls_btn-color' color='white' expand='full' type="submit"> {dataLocalization.Continue}</ion-button>
                                </ion-col>
                                <ion-col class='ion-text-center ls_lable-style'>
                                    <ion-text >{dataLocalization.You_Dont_have_account}</ion-text>
                                    <ion-text class="ls_signup cursor-pointer" onClick={() => signup()}>{dataLocalization.signup}</ion-text>
                                </ion-col>
                                {isPlatform("capacitor") &&
                                    <ion-col size="12" class="ion-text-center ls_lable-style">
                                        <ion-text onClick={() => { switchLanguage() }} class="ls_signup cursor-pointer" >{dataLocalization.Switch_Location}</ion-text>
                                    </ion-col>
                                }
                            </ion-row>
                        </form>
                    </ion-grid>
                    :
                    <ion-grid dir={Direction()} >
                        <ion-row>
                            <ion-col size-xl="12" class='ls_login-close'>
                                <ion-icon class='ls-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                            </ion-col>
                        </ion-row>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ion-row class="ls_padding-adjustment">
                                <ion-col size-lg="3" size-md="3" size-xs="3" size-xl="3">
                                    <ion-img src={dofylogo.src} alt="dofy-logo"></ion-img>
                                </ion-col>
                                <ion-col size-lg="12" size-xs="12" size-md="12" class="mt-3">
                                    <ion-text class="ls_signin-text">{dataLocalization.Signin_into_dofy}</ion-text>
                                </ion-col>
                                <ion-col size-lg="12" size-md="12" size-xs="12" size-xl="12" class="mt-3">
                                    <ion-text>{dataLocalization.Enter_Mobile_Number}</ion-text>
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
                                    {errors.UserName?.type === "required" && <ion-label color='danger'>{dataLocalization.Enter_Mobile_Number}</ion-label>}
                                    {(errors.UserName?.type === "minLength" || errors.UserName?.type === "maxLength") && <ion-label color='danger'>{dataLocalization.Enter_valid_Mobile_Number}</ion-label>}
                                </ion-col>
                                <ion-col size-lg="12" size-md="12" size-xl="12" size-xs="12">
                                    <IonCheckBox class="login_checkbox login-icon" onIonChange={(e) => { setIsDefault(e.detail.checked); setIsSelected(false) }}></IonCheckBox>
                                    <ion-text class="login-text ls_lable-style">{dataLocalization.I_agree_to_the}</ion-text>
                                    <Link href={`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/terms-of-use`}>
                                        <ion-label color="primary" class="ls_lable-style" onClick={() => dispatch(modelChanger(false))}>{dataLocalization.Terms_Conditions} </ion-label>
                                    </Link> <br />
                                    {isSelected && <ion-text color='primary'>{dataLocalization.Please_accept_Terms_and_Conditions}</ion-text>}
                                </ion-col>
                                <ion-col size-lg="12" size-md="12" size-xl="12" size-xs="12" class="mt-2">
                                    <ion-button disabled={disbleLogin ? true : isDefault ? false : true} expand="full" class="ls_btn-color"
                                        color="transparent"
                                        title="Continue"
                                        type="submit">{dataLocalization.Continue}
                                    </ion-button>
                                </ion-col>
                                <ion-col size-lg="12" class="ion-text-center ls_lable-style">
                                    {dataLocalization.You_Dont_have_account}<ion-text onClick={() => { signup() }} class="ls_signup cursor-pointer" >{dataLocalization.signup}</ion-text>
                                </ion-col>
                                {isPlatform("capacitor") &&
                                    <ion-col size="12" class="ion-text-center ls_lable-style">
                                        <ion-text onClick={() => { switchLanguage() }} class="ls_signup cursor-pointer" >{dataLocalization.Switch_Location}</ion-text>
                                    </ion-col>
                                }
                            </ion-row>
                        </form>
                    </ion-grid>
                }
            </ion-content>
        )
    }

    return (
        <ion-app dir={Direction()} class="ls-module">
            {
                webUi()
            }
        </ion-app>
    )
}
export default LoginMobileNumber 