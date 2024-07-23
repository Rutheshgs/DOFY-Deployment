import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonLabel, IonPage, IonRow, IonText } from '@ionic/react';
import { arrowBack, close } from 'ionicons/icons';

import { useForm, SubmitHandler } from "react-hook-form";


import { IRegistrationModel } from '../../models/Registration.Model';
import PersonServices from '../../services/Person.Services';

import "./Registration.css";

import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { newUser } from '../../features/reducers/registration/Registration.Reducers';
import { loginPageChanger, modelChanger, resetModelChanger } from '../../features/reducers/login/LoginModel.Reducer';

import { Direction, IsLogginUser, getUserLanguage, getUserLocationForParam, isIn, onKeyDown, restrictInput } from '../../components/helper/Helper';
import { HelperConstant } from '../../components/helper/HelperConstant';
import dofylogo from '../../assets/images/phase2/dofy-logo.png';
import Language from './RegistrationLanguage.json';
import { InputAdornment, TextField } from '@mui/material';

function Registration() {

    let dataLocalization = Language[getUserLanguage()];
    let dispatch = useTypedDispatch();
    let history = useHistory();


    const newNumber = useTypedSelector(state => state.NewUserRegistrationReducer.NewNumber);
    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const { register, handleSubmit, formState: { errors }, clearErrors, watch } = useForm<IRegistrationModel>({ defaultValues: { Mobile: newNumber } });

    const pattern = HelperConstant.emailPattern.pattern;

    const [alreadyUser, setAlreadyUser] = useState("");



    const onSubmit: SubmitHandler<IRegistrationModel> = (data) => {
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
            <IonPage>
                {isIn() ?
                    <IonContent>
                        <IonGrid >
                            <IonRow>
                                <IonCol sizeXl='6' className='rp_login-back'>
                                    <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></IonIcon>
                                </IonCol>
                                <IonCol sizeXl="6" className='rp_login-close'>
                                    <IonIcon className='rp-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                                </IonCol>
                            </IonRow>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <IonRow className='rg_padding-adjustment rp_comp-size'>
                                    <IonCol sizeLg='2.5' sizeMd="3" >
                                        <IonImg src={dofylogo}></IonImg>
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" className='rp_signup mt-3'>
                                        <IonText className='ls_signin-text'>Signup for DOFY</IonText>
                                    </IonCol>
                                    <IonCol sizeLg='12' size='12' sizeMd="12" className='mt-3'>
                                        <IonLabel>{dataLocalization.Enter_Mobile_Number}</IonLabel>
                                        <IonInput placeholder={dataLocalization.Enter_Mobile_Number} type="number" onKeyDown={onKeyDown} onIonChange={(e: any) => { clearErrors("Mobile"); restrictInput(e, 10) }} {...register("Mobile", { required: true, minLength: 10, maxLength: 10 })} className='rp_outline-style' />
                                        {errors.Mobile?.type === "required" && <IonText className='text-danger'>{dataLocalization.Enter_Mobile_Number}</IonText>}
                                        {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && <IonText className='text-danger'>{dataLocalization.Please_enter_an_valid_Mobile_Number}</IonText>}
                                        {alreadyUser && <IonText className='text-danger'>{alreadyUser}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" size='12'>
                                        <IonLabel>{dataLocalization.Enter_Alternate_Mobile_Number}</IonLabel>
                                        <IonInput type="number" onKeyDown={onKeyDown} onIonChange={(e: any) => { clearErrors("SecondaryMobile"); restrictInput(e, 10) }} {...register("SecondaryMobile", { minLength: 10, maxLength: 10 })} placeholder="9123456780" className='rp_outline-style' />
                                        {(errors.SecondaryMobile?.type === "minLength" || errors.SecondaryMobile?.type === "maxLength") && <IonText className='text-danger'>{dataLocalization.Enter_Alternate_Mobile_Number}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" size='12'>
                                        <IonLabel>{dataLocalization.Enter_Email}</IonLabel>
                                        <IonInput  {...register("Email", { required: true, pattern: pattern })} onIonChange={() => clearErrors("Email")} placeholder='email@address.com' className='rp_outline-style' />
                                        {errors.Email?.type === "required" && <IonText className='text-danger'>{dataLocalization.Enter_Email}</IonText>}
                                        {errors.Email?.type === "pattern" && <IonText className='text-danger'>{dataLocalization.Please_enter_valid_an_Email_Id}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" size='12'>
                                        <IonLabel>{dataLocalization.Enter_Full_Name}</IonLabel>
                                        <IonInput  {...register("FirstName", { required: true })} onIonChange={() => clearErrors("FirstName")} placeholder="John Doe/Jane Doe" className='rp_outline-style' />
                                        {errors.FirstName && <IonText className='text-danger'>{dataLocalization.Enter_Full_Name}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" className='text-center'>
                                        <IonButton className='rp_btn-color' color='white' expand='full' type="submit" >{dataLocalization.Continue}</IonButton>
                                        <IonText className="ls_reg cursor-pointer" onClick={() => signinhandler()}><u>{dataLocalization.Back_to_signin}</u></IonText>
                                    </IonCol>
                                </IonRow>
                            </form>
                        </IonGrid>
                    </IonContent>
                    :
                    <IonContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol sizeXl='6' className='rp_login-back'>
                                    <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></IonIcon>
                                </IonCol>
                                <IonCol sizeXl="6" className='rp_login-close'>
                                    <IonIcon className={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                                </IonCol>
                            </IonRow>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <IonRow className='rg_padding-adjustment rp_comp-size'>
                                    <IonCol sizeLg='2.5' sizeMd="3" >
                                        <IonImg src={dofylogo}></IonImg>
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" className='rp_signup mt-3'>
                                        <IonText className='ls_signin-text'>{dataLocalization.SignUp_For_DOFY}</IonText>
                                    </IonCol>

                                    <IonCol sizeLg='12' sizeMd="12" size='12' className='mt-3'>
                                        <IonLabel>{dataLocalization.Enter_Name}</IonLabel>
                                        <IonInput  {...register("FirstName", { required: true })} onIonChange={() => clearErrors("FirstName")} placeholder="John Doe/Jane Doe" className='rp_outline-style' />
                                        {errors.FirstName && <IonText className='text-danger'>{dataLocalization.Please_enter_Full_Name}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" size='12'>
                                        <IonLabel>{dataLocalization.Enter_Mobile_Number}</IonLabel>
                                        {/* <IonInput type="number" onKeyDown={onKeyDown} onIonChange={(e: any) => { clearErrors("Mobile"); restrictInput(e, 9) }} {...register("Mobile", { required: true, minLength: 9, maxLength: 9 })} placeholder="+971- 912345678" className='rp_outline-style' /> */}
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
                                            {...register("Mobile", { required: true, onChange: (e: any) => { clearErrors("Mobile"); restrictInput(e, 10) } })}
                                        />
                                        {errors.Mobile?.type === "required" && <IonText className='text-danger'>{dataLocalization.Please_enter_your_Mobile_Number}</IonText>}
                                        {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && <IonText className='text-danger'>{dataLocalization.Please_enter_your_Mobile_Number}</IonText>}
                                        {alreadyUser && <IonText className='text-danger'>{alreadyUser}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" size='12'>
                                        <IonLabel>{dataLocalization.Enter_Email}</IonLabel>
                                        <IonInput  {...register("Email", { required: true, pattern: pattern })} onIonChange={() => clearErrors("Email")} placeholder='email@address.com' className='rp_outline-style' />
                                        {errors.Email?.type === "required" && <IonText className='text-danger'>{dataLocalization.Enter_Email}</IonText>}
                                        {errors.Email?.type === "pattern" && <IonText className='text-danger'>{dataLocalization.Please_enter_valid_an_Email_Id}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" size='12'>
                                        <IonLabel>{dataLocalization.Enter_Password}</IonLabel>
                                        <IonInput  {...register("PassWord", { required: true })} onIonChange={() => clearErrors("PassWord")} type={"password"} className='rp_outline-style' />
                                        {errors.PassWord?.type === "required" && <IonText className='text-danger'>{dataLocalization.Please_enter_password}</IonText>}
                                        {(errors.PassWord?.type === "minLength" || errors.PassWord?.type === "maxLength") && <IonText className='text-danger'>{dataLocalization.Enter_valid_password}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" size='12'>
                                        <IonLabel>{dataLocalization.Enter_Confirm_Password}</IonLabel>
                                        <IonInput  {...register("ConfirmPassword", {
                                            required: true,
                                            validate: (val: string) => {
                                                if (watch('PassWord') != val) {
                                                    return "Your passwords do not match";
                                                }
                                            },
                                        })} onIonChange={() => clearErrors("ConfirmPassword")} type={"password"} className='rp_outline-style' />
                                        {errors.ConfirmPassword?.type === "required" && <IonText className='text-danger'>{dataLocalization.Enter_Confirm_Password}</IonText>}
                                        {(errors.ConfirmPassword?.type === "validate") && <IonText className='text-danger'>{dataLocalization.Your_password_do_not_match_with_Your_Confirm_PassWord}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeMd="12" className='text-center'>
                                        <IonButton className='rp_btn-color' color='white' expand='full' type="submit">{dataLocalization.Continue}</IonButton>
                                        <IonText className="ls_reg cursor-pointer " onClick={() => signinhandler()}><u>{dataLocalization.Back_to_signin}</u></IonText>
                                    </IonCol>
                                </IonRow>
                            </form>
                        </IonGrid>
                    </IonContent>
                }
            </IonPage>
        )
    }

    const mobileUI = () => {
        return (
            <IonPage>
                {isIn() ?
                    <IonContent>
                        <IonGrid >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <IonRow>
                                    <IonCol sizeXl='6' sizeXs='6' className='rp_login-back'>
                                        <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></IonIcon>
                                    </IonCol>
                                    <IonCol sizeXl="6" sizeXs='6' className='rp_login-close'>
                                        <IonIcon className={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                                    </IonCol>
                                </IonRow>
                                <IonRow className='rg_padding-adjustment rp_comp-size'>
                                    <IonCol sizeLg='2.5' sizeXs='3'>
                                        <IonImg src={dofylogo} alt='dofy-logo'></IonImg>
                                    </IonCol>
                                    <IonCol sizeXs='12' className='rp_signup mt-3'>
                                        <IonText className='ls_signin-text'>SignUp For DOFY</IonText>
                                    </IonCol>
                                    <IonCol sizeLg='12' size='12' className='mt-3' >
                                        <IonLabel>Enter Mobile Number*</IonLabel>
                                        <IonInput placeholder={dataLocalization.Enter_Mobile_Number} type="number" onKeyDown={onKeyDown} onIonChange={(e: any) => { clearErrors("Mobile"); restrictInput(e, 10) }} {...register("Mobile", { required: true, minLength: 10, maxLength: 10 })} className='rp_outline-style' />
                                        {errors.Mobile?.type === "required" && <IonText className='text-danger'>Enter Mobile Number</IonText>}
                                        {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && <IonText className='text-danger'>Please enter an valid Mobile Number</IonText>}
                                        {alreadyUser && <IonText className='text-danger'>{alreadyUser}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' size='12' className='mt-2' >
                                        <IonLabel>Enter Alternate Mobile Number</IonLabel>
                                        <IonInput placeholder="9123456780" type="number" onKeyDown={onKeyDown} onIonChange={(e: any) => { clearErrors("SecondaryMobile"); restrictInput(e, 10) }} {...register("SecondaryMobile", { minLength: 10, maxLength: 10 })} className='rp_outline-style' />
                                        {(errors.SecondaryMobile?.type === "minLength" || errors.SecondaryMobile?.type === "maxLength") && <IonText className='text-danger'>Enter Alternate Mobile number</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' size='12' className='mt-2'>
                                        <IonLabel>Enter Email*</IonLabel>
                                        <IonInput  {...register("Email", { required: true, pattern: pattern })} onIonChange={() => clearErrors("Email")} placeholder='email@address.com' className='rp_outline-style' />
                                        {errors.Email?.type === "required" && <IonText className='text-danger'>Enter Email</IonText>}
                                        {errors.Email?.type === "pattern" && <IonText className='text-danger'>Please enter valid an Email Id</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' size='12' className='mt-2' >
                                        <IonLabel>Enter Full Name*</IonLabel>
                                        <IonInput  {...register("FirstName", { required: true })} onIonChange={() => clearErrors("FirstName")} placeholder="John Doe/Jane Doe" className='rp_outline-style' />
                                        {errors.FirstName && <IonText className='text-danger'>Enter Full Name</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeXs='12' className='text-center mt-2 '>
                                        <IonButton className='rp_btn-color' color='white' expand='full' type="submit">Continue</IonButton>
                                    </IonCol>
                                    <IonCol className='mt-3 text-center fp_btn' sizeLg='12'  >
                                        <IonText className="ls_reg cursor-pointer" onClick={() => signinhandler()}><u>Back to signin</u></IonText>
                                    </IonCol>
                                </IonRow>
                            </form>
                        </IonGrid>
                    </IonContent>
                    :
                    <IonContent>
                        <IonGrid dir={Direction()} >
                            <IonRow>
                                <IonCol sizeXl='6' sizeXs='6' className='rp_login-back'>
                                    <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></IonIcon>
                                </IonCol>
                                <IonCol sizeXl="6" sizeXs='6' className='rp_login-close'>
                                    <IonIcon className='rp-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                                </IonCol>
                            </IonRow>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <IonRow className='rg_padding-adjustment rp_comp-size'>
                                    <IonCol sizeLg='2' sizeXs='3'>
                                        <IonImg src={dofylogo} alt='dofy-logo'></IonImg>
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeXs='12' className='rp_signup mt-3'>
                                        <IonText className='rls_signin-text'>{dataLocalization.SignUp_For_DOFY}</IonText>
                                    </IonCol>
                                    <IonCol sizeLg='12' size='12' className='mt-2'>
                                        <IonLabel>{dataLocalization.Enter_Name}</IonLabel>
                                        <IonInput  {...register("FirstName", { required: true })} onIonChange={() => clearErrors("FirstName")} placeholder="John Doe/Jane Doe" className='rp_outline-style' />
                                        {errors.FirstName && <IonText className='text-danger'>{dataLocalization.Please_enter_Full_Name}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' size='12' className='mt-2'>
                                        <IonLabel>{dataLocalization.Enter_Mobile_Number}</IonLabel>
                                        {/* <IonInput type="number" onKeyDown={onKeyDown} onIonChange={(e: any) => { clearErrors("Mobile"); restrictInput(e, 9) }} {...register("Mobile", { required: true, minLength: 9, maxLength: 9 })} placeholder="+971- 912345678" className='rp_outline-style' /> */}
                                        <TextField
                                            style={{ width: "100%" }}
                                            variant="outlined"
                                            id="outlined-start-adornment"
                                            sx={{ width: '25ch' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+971</InputAdornment>,
                                            }}
                                            type="number"
                                            {...register("Mobile", { required: true, minLength: 9, maxLength: 10, onChange: (e) => { clearErrors("Mobile"); restrictInput(e, 10) } })}
                                        />
                                        {errors.Mobile?.type === "required" && <IonText className='text-danger'>{dataLocalization.Please_enter_your_Mobile_Number}</IonText>}
                                        {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && <IonText className='text-danger'>{dataLocalization.Please_enter_your_Mobile_Number}</IonText>}
                                        {alreadyUser && <IonText className='text-danger'>{alreadyUser}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' size='12' className='mt-2'>
                                        <IonLabel>{dataLocalization.Enter_Email}</IonLabel>
                                        <IonInput  {...register("Email", { required: true, pattern: pattern })} onIonChange={() => clearErrors("Email")} placeholder='email@address.com' className='rp_outline-style' />
                                        {errors.Email?.type === "required" && <IonText className='text-danger'>{dataLocalization.Enter_Email}</IonText>}
                                        {errors.Email?.type === "pattern" && <IonText className='text-danger'>{dataLocalization.Please_enter_valid_an_Email_Id}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' size='12' className='mt-2'>
                                        <IonLabel>{dataLocalization.Enter_Password}</IonLabel>
                                        <IonInput  {...register("PassWord", { required: true })} onIonChange={() => clearErrors("PassWord")} type={"password"} className='rp_outline-style' />
                                        {errors.PassWord?.type === "required" && <IonText className='text-danger'>{dataLocalization.Please_enter_password}</IonText>}
                                        {(errors.PassWord?.type === "minLength" || errors.PassWord?.type === "maxLength") && <IonText className='text-danger'>{dataLocalization.Enter_valid_password}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' size='12' className='mt-2'>
                                        <IonLabel>{dataLocalization.Enter_Confirm_Password}</IonLabel>
                                        <IonInput  {...register("ConfirmPassword", {
                                            required: true,
                                            validate: (val: string) => {
                                                if (watch('PassWord') != val) {
                                                    return "Your passwords do not match";
                                                }
                                            },
                                        })} onIonChange={() => clearErrors("ConfirmPassword")} type={"password"} className='rp_outline-style' />
                                        {errors.ConfirmPassword?.type === "required" && <IonText className='text-danger'>{dataLocalization.Enter_Confirm_Password}</IonText>}
                                        {(errors.ConfirmPassword?.type === "validate") && <IonText className='text-danger'>{dataLocalization.Your_password_do_not_match_with_Your_Confirm_PassWord}</IonText>}
                                    </IonCol>
                                    <IonCol sizeLg='12' sizeXs='12' className='text-center fp_btn '>
                                        <IonButton className='rp_btn-color' color='white' expand='full' type="submit">{dataLocalization.Continue}</IonButton>
                                    </IonCol>
                                    <IonCol className='text-center mt-2'>
                                        <IonText className="ls_reg cursor-pointer" onClick={() => signinhandler()}><u>{dataLocalization.Back_to_signin}</u></IonText>
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
                IsMobile
                    ?
                    mobileUI()
                    :
                    webUi()
            }
        </IonPage>
    )
}

export default Registration