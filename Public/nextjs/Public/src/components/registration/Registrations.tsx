import { useEffect, useState } from 'react';
import { arrowBack, close } from 'ionicons/icons';

import { useForm, SubmitHandler } from "react-hook-form";


import { IRegistrationModel } from '@/models/Registration.Model';
import PersonServices from '@/services/Person.Services';

import "./Registration.css";

import { useTypedDispatch, useTypedSelector } from '@/features/reduxhooks/ReduxHooks';
import { newUser } from '@/features/reducers/registration/Registration.Reducers';
import { loginPageChanger, modelChanger, resetModelChanger } from '@/features/reducers/login/LoginModel.Reducer';

import { Direction, IsLogginUser, getUserLanguage, isIn, onKeyDown, restrictInput } from '@/components/helper/Helper';
import { HelperConstant } from '@/components/helper/HelperConstant';
import dofylogo from '@/assets/images/phase2/dofy-logo.png';
import Language from './RegistrationLanguage.json';
import { InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const IonInput = dynamic(() => import('@ionic/react').then(mod => mod.IonInput), { ssr: false });

function Registration() {

    let dataLocalization = Language[getUserLanguage()];
    let dispatch = useTypedDispatch();
    let history = useRouter();


    const newNumber = useTypedSelector(state => state.NewUserRegistrationReducer.NewNumber);
    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const { register, handleSubmit, formState: { errors }, clearErrors, watch, getValues, setValue } = useForm<IRegistrationModel>({ defaultValues: { Mobile: newNumber } });
    const pattern = HelperConstant.emailPattern.pattern;

    const [alreadyUser, setAlreadyUser] = useState("");



    const onSubmit: SubmitHandler<IRegistrationModel> = data => {
        data.Id = 0;
        data.Created = null;
        data.CreatedBy = 0;
        data.Active = true;
        data.Modified = null;
        data.ModifiedBy = 0;
        data.ValidationErrors = {};
        data.LoginId = 0;
        data.UserRoleId = HelperConstant.roleId.USER;
        data.UserRoleName = "";
        data.MiddleName = "";
        data.LastName = "";
        data.Prefix = "";
        data.Suffix = "";
        data.DateOfBirth = null;
        data.UploadImagePath = "";
        data.UploadImageName = "";
        data.RowOrder = 0;
        data.UserLogin = {
            Id: 0,
            Created: null,
            CreatedBy: 0,
            Active: true,
            Modified: null,
            ModifiedBy: 0,
            ValidationErrors: {},
            CompanyId: 0,
            UserName: data.Mobile,
            PassWord: data.PassWord ? data.PassWord : "",
            Salt: "",
            IVKey: "",
            RowOrder: 0,
            ConfirmPassword: data.ConfirmPassword ? data.ConfirmPassword : ""
        }
        isIn() ?
            PersonServices.create(data).then((res) => {
                if (res.status === 200) {
                    dispatch(newUser(data.Mobile));
                    if (res.data === "Already registered user") {
                        return setAlreadyUser("Mobile Number is Already Registered");
                    }
                    setAlreadyUser("");
                    dispatch(loginPageChanger("verification"));
                }
            }).catch((e: string) => {
                console.log(e);
            })
            :
            PersonServices.CreateUae(data).then((res) => {
                if (res.status === 200) {
                    dispatch(newUser(data.Mobile));
                    if (res.data === "Already registered user") {
                        return setAlreadyUser("Mobile Number is Already Registered");
                    }
                    setAlreadyUser("");
                    dispatch(loginPageChanger("verification"));
                }
            }).catch((e: string) => {
                console.log(e);
            });
    }

    const signinhandler = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("login"));
    }

    useEffect(() => {
        IsLogginUser();
    }, [])

    const webUi = () => {
        return (
            <ion-content class='fl_content-style'>
                {isIn() ?
                    <ion-grid >
                        <ion-row>
                            <ion-col size-xl='6' class='rp_login-back'>
                                <ion-icon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></ion-icon>
                            </ion-col>
                            <ion-col size-xl="6" class='rp_login-close'>
                                <ion-icon class='rp-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                            </ion-col>
                        </ion-row>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ion-row class='rg_padding-adjustment'>
                                <ion-col size-lg='2.5' size-md="3" size-xs='6'>
                                    <ion-img src={dofylogo.src}></ion-img>
                                </ion-col>
                                <ion-col size-xs='12' size-lg='12' size-md="12" class='rp_signup mt-3'>
                                    <ion-text class='ls_signin-text'>Signup for DOFY</ion-text>
                                </ion-col>
                                <ion-col size-lg='12' size='12' size-md="12" size-xs='12' class='mt-3'>
                                    <ion-text color="dark">{dataLocalization.Enter_Mobile_Number}</ion-text>
                                    <TextField
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        placeholder={dataLocalization.Enter_Mobile_Number}
                                        id="outlined-start-adornment"
                                        sx={{ width: '25ch' }}
                                        {...register("Mobile", { required: true, minLength: 10, maxLength: 10, onChange: (e: any) => { setValue("Mobile", e.target.value); clearErrors("Mobile"); restrictInput(e, 10) } })}
                                        type="number" />
                                    {errors.Mobile?.type === "required" && <ion-text color='danger'>{dataLocalization.Enter_Mobile_Number}</ion-text>}
                                    {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && <ion-text color='danger'>{dataLocalization.Please_enter_an_valid_Mobile_Number}</ion-text>}
                                    {alreadyUser && <ion-text color='danger'>{alreadyUser}</ion-text>}
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" size='12'>
                                    <ion-text>{dataLocalization.Enter_Alternate_Mobile_Number}</ion-text>
                                    <TextField
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        placeholder="9123456780"
                                        id="outlined-start-adornment"
                                        sx={{ width: '25ch' }}
                                        {...register("SecondaryMobile", { required: false, minLength: 10, maxLength: 10, onChange: (e: any) => { setValue("SecondaryMobile", e.target.value); clearErrors("SecondaryMobile"); restrictInput(e, 10) } })}
                                        type="number" />
                                    {(errors.SecondaryMobile?.type === "minLength" || errors.SecondaryMobile?.type === "maxLength") && <ion-text color='danger'>{dataLocalization.Enter_Alternate_Mobile_Number}</ion-text>}
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" size='12'>
                                    <ion-text>{dataLocalization.Enter_Email}</ion-text>
                                    <TextField
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        placeholder='email@address.com'
                                        id="outlined-start-adornment"
                                        sx={{ width: '25ch' }}
                                        {...register("Email", { required: true, pattern: pattern, onChange: (e: any) => { setValue("Email", e.target.value); clearErrors("Email"); } })}
                                    />
                                    {errors.Email?.type === "required" && <ion-text color='danger'>{dataLocalization.Enter_Email}</ion-text>}
                                    {errors.Email?.type === "pattern" && <ion-text color='danger'>{dataLocalization.Please_enter_valid_an_Email_Id}</ion-text>}
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" size='12'>
                                    <ion-text>{dataLocalization.Enter_Full_Name}</ion-text>
                                    <TextField
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        placeholder="John Doe/Jane Doe"
                                        id="outlined-start-adornment"
                                        sx={{ width: '25ch' }}
                                        {...register("FirstName", { required: true, onChange: (e: any) => { setValue("FirstName", e.target.value); clearErrors("FirstName"); } })}
                                        type="text" />
                                    {errors.FirstName && <ion-text color='danger'>{dataLocalization.Enter_Full_Name}</ion-text>}
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" class='ion-text-center'>
                                    <ion-button class='rp_btn-color' color='white' expand='full' type="submit" >{dataLocalization.Continue}</ion-button>
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" class='ion-text-center'>
                                    <ion-text class="ls_reg cursor-pointer rg_backtosignin" onClick={() => signinhandler()}><u>{dataLocalization.Back_to_signin}</u></ion-text>
                                </ion-col>
                            </ion-row>
                        </form>
                    </ion-grid>
                    :
                    <ion-grid>
                        <ion-row>
                            <ion-col size-xl='6' class='rp_login-back'>
                                <ion-icon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></ion-icon>
                            </ion-col>
                            <ion-col size-xl="6" class='rp_login-close'>
                                <ion-icon class={`${getUserLanguage() === "ae_ar" ? 'pr-close_icon_left' : 'pr_close_icon_right'} rp-close-icon`} icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                            </ion-col>
                        </ion-row>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ion-row class='rg_padding-adjustment'>
                                <ion-col size-lg='2.5' size-md="3" size-xs='6' size-sm='6'>
                                    <ion-img src={dofylogo.src}></ion-img>
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" class={`${getUserLanguage() === "ae_ar" ? 'rp_signup_ae' : 'rp_signup'}`}>
                                    <ion-text class='ls_signin-text'>{dataLocalization.SignUp_For_DOFY}</ion-text>
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" size='12' class='mt-3'>
                                    <ion-text>{dataLocalization.Enter_Name}</ion-text>
                                    <TextField
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        placeholder="John Doe/Jane Doe"
                                        id="outlined-start-adornment"
                                        sx={{ width: '25ch' }}
                                        {...register("FirstName", { required: true, onChange: (e: any) => { setValue("FirstName", e.target.value); clearErrors("FirstName"); } })}
                                        type="text" />
                                    {errors.FirstName && <ion-text color='danger'>{dataLocalization.Please_enter_Full_Name}</ion-text>}
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" size='12'>
                                    <ion-text>{dataLocalization.Enter_Mobile_Number}</ion-text>
                                    <TextField
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        id="outlined-start-adornment"
                                        sx={{ width: '25ch' }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">+971</InputAdornment>,
                                            size: "medium"
                                        }}
                                        type="number"
                                        {...register("Mobile", { required: true, minLength: 9, maxLength: 10, onChange: (e: any) => { clearErrors("Mobile"); restrictInput(e, 10) } })}
                                    />
                                    {errors.Mobile?.type === "required" && <ion-text color='danger'>{dataLocalization.Please_enter_your_Mobile_Number}</ion-text>}
                                    {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && <ion-text color='danger'>{dataLocalization.Please_enter_your_Mobile_Number}</ion-text>}
                                    {alreadyUser && <ion-text color='danger'>{alreadyUser}</ion-text>}
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" size='12'>
                                    <ion-text>{dataLocalization.Enter_Email}</ion-text>
                                    <TextField
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        placeholder='email@address.com'
                                        id="outlined-start-adornment"
                                        sx={{ width: '25ch' }}
                                        {...register("Email", { required: true, pattern: pattern, onChange: (e: any) => { setValue("Email", e.target.value); clearErrors("Email"); } })}
                                    />
                                    {errors.Email?.type === "required" && <ion-text color='danger'>{dataLocalization.Enter_Email}</ion-text>}
                                    {errors.Email?.type === "pattern" && <ion-text color='danger'>{dataLocalization.Please_enter_valid_an_Email_Id}</ion-text>}
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" size='12'>
                                    <ion-text>{dataLocalization.Enter_Password}</ion-text>
                                    <TextField
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        id="outlined-start-adornment"
                                        sx={{ width: '25ch' }}
                                        {...register("PassWord", { required: true, onChange: (e: any) => { setValue("PassWord", e.target.value); clearErrors("PassWord"); } })}
                                        type="password" />
                                    {errors.PassWord?.type === "required" && <ion-text color='danger'>{dataLocalization.Please_enter_password}</ion-text>}
                                    {(errors.PassWord?.type === "minLength" || errors.PassWord?.type === "maxLength") && <ion-text color='danger'>{dataLocalization.Enter_valid_password}</ion-text>}
                                </ion-col>
                                <ion-col size-lg='12' size-xs='12' size-md="12" size='12'>
                                    <ion-text>{dataLocalization.Enter_Confirm_Password}</ion-text>
                                    <TextField
                                        style={{ width: "100%" }}
                                        variant="outlined"
                                        id="outlined-start-adornment"
                                        sx={{ width: '25ch' }}
                                        {...register("ConfirmPassword", {
                                            required: true,
                                            validate: (val: string) => {
                                                if (watch('PassWord') != val) {
                                                    return "Your passwords do not match";
                                                }
                                            }, onChange: (e: any) => { setValue("ConfirmPassword", e.target.value); clearErrors("ConfirmPassword"); }
                                        })}
                                        type="password" />
                                    {errors.ConfirmPassword?.type === "required" && <ion-text color='danger'>{dataLocalization.Enter_Confirm_Password}</ion-text>}
                                    {(errors.ConfirmPassword?.type === "validate") && <ion-text color='danger'>{dataLocalization.Your_password_do_not_match_with_Your_Confirm_PassWord}</ion-text>}
                                </ion-col>
                                <ion-col size-lg='12' size-md="12" size-xs='12' size-sm='12' class='ion-text-center'>
                                    <ion-button class='rp_btn-color' color='white' expand='full' type="submit">{dataLocalization.Continue}</ion-button>
                                </ion-col>
                                <ion-col size-xs='12' size-lg='12' size-md="12" size-sm='12' class='ion-text-center'>
                                    <ion-text class="ls_reg cursor-pointer rg_backtosignin" onClick={() => signinhandler()}><u>{dataLocalization.Back_to_signin}</u></ion-text>
                                </ion-col>
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

export default Registration