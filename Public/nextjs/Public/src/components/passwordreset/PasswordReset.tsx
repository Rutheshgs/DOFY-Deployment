import { useState } from 'react'
import AuthServices from '../../services/Auth.Services';
import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { Direction, getUserLanguage, restrictInput } from '../../components/helper/Helper';
import { loginPageChanger, modelChanger, resetModelChanger } from '../../features/reducers/login/LoginModel.Reducer';
import Language from "./PasswordReset.json";
import './PasswordReset.css';
import dofylogo from '../../assets/images/phase2/dofy-logo.png'
import { arrowBack, close } from "ionicons/icons";
import { newUser } from '../../features/reducers/registration/Registration.Reducers';
import dynamic from 'next/dynamic';
import { TextField } from '@mui/material';


const IonInput = dynamic(() => import('@ionic/react').then(mod => mod.IonInput), { ssr: false });


function PasswordReset() {

  let dispatch = useTypedDispatch();
  let IsMobile = useTypedSelector(state => state.FindDevice.isMobile);
  let number = useTypedSelector(state => state.NewUserRegistrationReducer.NewNumber);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errPassword, setErrpassword] = useState("");
  let dataLocalization = Language[getUserLanguage()];

  const loginHandler = () => {
    if (password == confirmPassword) {
      setErrpassword("");
      AuthServices.ResetPasswordUae(number, password).then(res => {
        if (res.status === 200) {
          dispatch(newUser(res.data.UserName));
          dispatch(loginPageChanger("login"));
        }
      }).catch((e: string) => {
        console.log(e);
      });
    }
    else {
      setErrpassword("Password mismatch");
    }
  }

  const signinhandler = () => {
    dispatch(modelChanger(true));
    dispatch(loginPageChanger("login"));
  }

  const mobileUi = () => {
    return (
      <ion-grid dir={Direction()}>
        <ion-row>
          <ion-col size-xl='6' class='ls_login-back'>
            <ion-icon icon={arrowBack} onClick={() => dispatch(loginPageChanger("forgot-password"))}></ion-icon>
          </ion-col>
          <ion-col size-xl="6" class='ls_login-close'>
            <ion-icon class={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
          </ion-col>
        </ion-row>
        <ion-row class=" ls_padding-adjustment" >
          <ion-col size-xs='3' class="vp_logo">
            <ion-img src={dofylogo.src} alt='dofylogo'></ion-img>
          </ion-col>
          <ion-col size-lg="12" size-xl="12" size-xs="12" size-sm="12" class=" mt-3" >
            <ion-label class="p-0 ls_signin-text">{dataLocalization.Password_Reset}</ion-label>
          </ion-col>
          <ion-col size-lg="12" size-xl="12" size-xs="12" size-sm="12" class=" mt-2" >
            <ion-label >{dataLocalization.Enter_New_Password}</ion-label>
          </ion-col>
          <ion-col size-lg='12' size-xl='12' size-xs='12' size-sm='12' class="mt-3">
            <ion-label class="ls_lable-style">{dataLocalization.Enter_Password}</ion-label>
            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              id="outlined-start-adornment"
              sx={{ width: '25ch' }}
              value={password}
              onChange={(e: any) => { setPassword(e.target.value!); restrictInput(e, 10); }}
              type="password" />
          </ion-col>
          <ion-col size-lg='12' size-xl='12' size-xs='12' size-sm='12' class="mt-3">
            <ion-label class="ls_lable-style">{dataLocalization.Confirm_Password}</ion-label>
            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              id="outlined-start-adornment"
              sx={{ width: '25ch' }}
              value={confirmPassword}
              onChange={(e: any) => { setConfirmPassword(e.target.value!); restrictInput(e, 10); }}
              type="password" />
            {errPassword && <ion-label class='text-danger'>{dataLocalization.Password_Mismatch}</ion-label>}
          </ion-col>
          <ion-col size-lg='12' size-xl='12' size-xs='12' size-sm='12' class='ion-text-center reset'>
            <ion-button class='fp_btn-clr' onClick={loginHandler} color='white' expand='full'>{dataLocalization.Reset_Password}</ion-button>
          </ion-col>
          <ion-col size-xs='12' class='ion-text-center fp_btn-otp fp_btn'>
            <ion-label class="rg_backtosignin" onClick={signinhandler}><u>{dataLocalization.Back_to_Signin}</u></ion-label>
          </ion-col>
          <ion-col size-lg='12' size-xl='12' size-xs='12' size-sm='12' class='ion-text-center ls_lable-style mt-3'>
            <ion-label>{dataLocalization.You_donot_have_account}</ion-label>
            <ion-label class='ls_signup cursor-pointer' onClick={signinhandler}>{dataLocalization.Signup_here}</ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>
    )
  }
  const webUi = () => {
    return (
      <ion-grid dir={Direction()}>
        <ion-row>
          <ion-col size-xl='6' class='ls_login-back'>
            <ion-icon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></ion-icon>
          </ion-col>
          <ion-col size-xl="6" class='ls_login-close'>
            <ion-icon class={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
          </ion-col>
        </ion-row  >
        <ion-row class='pr_padding-adjustment '>
          <ion-col size-lg='2.5' size-xl='2.5' size-xs='2.5' size-sm='2.5'>
            <ion-img src={dofylogo.src} alt="dofy-logo"></ion-img>
          </ion-col>
          <ion-col size-lg='12' size-xl='12' size-xs='12' size-sm='12' class='mt-3'  >
            <ion-title class=' fp_font-size' >{dataLocalization.Password_Reset}</ion-title>
          </ion-col>
          <ion-col size-lg='12' size-xl='12' size-xs='12' size-sm='12'>
            <ion-label class='p-0 fp_text'>{dataLocalization.Enter_New_Password}</ion-label>
          </ion-col>
          <ion-col size-lg='12' size-xl='12' size-xs='12' size-sm='12' >
            <ion-label>{dataLocalization.Enter_Password}</ion-label>
            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              id="outlined-start-adornment"
              sx={{ width: '25ch' }}
              value={password}
              onChange={(e: any) => { setPassword(e.target.value!); restrictInput(e, 10); }}
              type="password" />
          </ion-col>
          <ion-col size-lg='12' size-xl='12' size-xs='12' size-sm='12' >
            <ion-label>{dataLocalization.Confirm_Password}</ion-label>
            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              id="outlined-start-adornment"
              sx={{ width: '25ch' }}
              value={confirmPassword}
              onChange={(e: any) => { setConfirmPassword(e.target.value!); restrictInput(e, 10); }}
              type="password" />
            {errPassword && <ion-label class='text-danger'>{dataLocalization.Password_Mismatch}</ion-label>}
          </ion-col>
          <ion-col size-lg='12' size-xl='12' size-xs='12' size-sm='12' class='ion-text-center reset'>
            <ion-button class='fp_btn-clr' onClick={loginHandler} color='white' expand='full'>{dataLocalization.Reset_Password}</ion-button>
          </ion-col>
          <ion-col class='ion-text-center fp_btn-otp fp_btn '>
            <ion-label class="rg_backtosignin" onClick={signinhandler}><u>{dataLocalization.Back_to_Signin}</u></ion-label>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size-lg='12' size-xl='12' size-xs='12' size-sm='12' class='ion-text-center ls_lable-style '>
            <ion-label>{dataLocalization.You_donot_have_account}</ion-label>
            <ion-label class=' ls_signup cursor-pointer' onClick={signinhandler}>{dataLocalization.Signup_here}</ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>
    )
  }
  return (
    <ion-app class="ls-module">
      {IsMobile
        ?
        mobileUi()
        :
        webUi()
      }
    </ion-app>
  )
}

export default PasswordReset