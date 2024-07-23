import { IonButton, IonCol, IonGrid, IonIcon, IonImg, IonInput, IonLabel, IonPage, IonRow, IonText, IonTitle } from '@ionic/react'
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
      <IonGrid dir={Direction()}>
        <IonRow>
          <IonCol sizeXl='6' className='ls_login-back'>
            <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("forgot-password"))}></IonIcon>
          </IonCol>
          <IonCol sizeXl="6" className='ls_login-close'>
            <IonIcon className={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
          </IonCol>
        </IonRow>
        <IonRow className=" ls_padding-adjustment" >
          <IonCol sizeXs='3' className="vp_logo">
            <IonImg src={dofylogo}></IonImg>
          </IonCol>
          <IonCol sizeLg="12" sizeXl="12" sizeXs="12" sizeSm="12" className=" mt-3" >
            <IonText className="p-0 ls_signin-text">{dataLocalization.Password_Reset}</IonText>
          </IonCol>
          <IonCol sizeLg="12" sizeXl="12" sizeXs="12" sizeSm="12" className=" mt-2" >
            <IonText >{dataLocalization.Enter_New_Password}</IonText>
          </IonCol>
          <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className="mt-3">
            <IonLabel className="ls_lable-style">{dataLocalization.Enter_Password}</IonLabel>
            <IonInput className='fp_outline-style' value={password} onIonChange={(e: any) => { setPassword(e.detail.value!); restrictInput(e, 10); }} type={"password"} ></IonInput>
          </IonCol>
          <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className="mt-3">
            <IonLabel className="ls_lable-style">{dataLocalization.Confirm_Password}</IonLabel>
            <IonInput className='fp_outline-style' value={confirmPassword} onIonChange={(e: any) => { setConfirmPassword(e.detail.value!); restrictInput(e, 10); }} type={"password"}></IonInput>
            {errPassword && <IonLabel className='text-danger'>{dataLocalization.Password_Mismatch}</IonLabel>}
          </IonCol>
          <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='text-center reset'>
            <IonButton className='fp_btn-clr' onClick={loginHandler} color='white' expand='full'>{dataLocalization.Reset_Password}</IonButton>
          </IonCol>
          <IonCol sizeXs='12' className='text-center fp_btn-otp fp_btn'>
            <IonText onClick={signinhandler}><u>{dataLocalization.Back_to_Signin}</u></IonText>
          </IonCol>
          <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='text-center ls_lable-style mt-3'>
            <IonText>{dataLocalization.You_donot_have_account}</IonText>
            <IonText className='ls_signup cursor-pointer' onClick={signinhandler}>{dataLocalization.Signup_here}</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    )
  }
  // <IonGrid dir={Direction()}>
  //   <IonRow>
  //     <IonCol sizeLg='12'>
  //       <IonImg style={{ height: "300px" }} src={forgotpassword}></IonImg>
  //     </IonCol>
  //     <IonCol sizeLg='12'>
  //       <IonLabel>{dataLocalization.Enter_Password}</IonLabel>
  //       <IonItem>
  //       <CustomInput value={password} onIonChange={(e: any) => { setPassword(e.detail.value!); restrictInput(e, 10); } } placeholder='*******' type={"password"} label={undefined}></CustomInput>
  //       </IonItem>
  //     </IonCol>
  //     <IonCol sizeLg='12'>
  //       <IonLabel>{dataLocalization.Confirm_Password}</IonLabel>
  //       <IonItem>
  //       <IonInput value={confirmPassword} onIonChange={(e: any) => { setConfirmPassword(e.detail.value!); restrictInput(e, 10); } } placeholder='******' type={"password"}></IonInput>
  //       {errPassword && <IonLabel className='text-danger'>{dataLocalization.Password_Mismatch}</IonLabel>}
  //       </IonItem>
  //     </IonCol>
  //     <IonCol sizeLg='12' className='text-center'>
  //       <IonButton onClick={loginHandler}>{dataLocalization.Submit}</IonButton>
  //     </IonCol>
  //   </IonRow>
  // </IonGrid>
  const webUi = () => {
    return (
      <IonGrid dir={Direction()}>
        <IonRow>
          <IonCol sizeXl='6' className='ls_login-back'>
            <IonIcon icon={arrowBack} onClick={() => dispatch(loginPageChanger("login"))}></IonIcon>
          </IonCol>
          <IonCol sizeXl="6" className='ls_login-close'>
            <IonIcon className={`${getUserLanguage() === "ae_ar" ? 'pr-close-icon-left' : 'pr-close-icon-right'} `} icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
          </IonCol>
        </IonRow  >
        <IonRow className='pr_padding-adjustment '>
          <IonCol sizeLg='2.5' sizeXl='2.5' sizeXs='2.5' sizeSm='2.5'>
            <IonImg src={dofylogo} alt="dofy-logo"></IonImg>
          </IonCol>
          <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='mt-3'  >
            <IonTitle className=' fp_font-size' >{dataLocalization.Password_Reset}</IonTitle>
          </IonCol>
          <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12'>
            <IonText className='p-0 fp_text'>{dataLocalization.Enter_New_Password}</IonText>
          </IonCol>
          <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' >
            <IonLabel>{dataLocalization.Enter_Password}</IonLabel>
            <IonInput className='otp_outline-style' value={password} onIonChange={(e: any) => { setPassword(e.detail.value!); restrictInput(e, 10); }} type={"password"} ></IonInput>
          </IonCol>
          <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' >
            <IonLabel>{dataLocalization.Confirm_Password}</IonLabel>
            <IonInput className='otp_outline-style' value={confirmPassword} onIonChange={(e: any) => { setConfirmPassword(e.detail.value!); restrictInput(e, 10); }} type={"password"}></IonInput>
            {errPassword && <IonLabel className='text-danger'>{dataLocalization.Password_Mismatch}</IonLabel>}
          </IonCol>
          <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='text-center reset'>
            <IonButton className='fp_btn-clr' onClick={loginHandler} color='white' expand='full'>{dataLocalization.Reset_Password}</IonButton>
          </IonCol>
          <IonCol className='text-center fp_btn-otp fp_btn '>
            <IonText onClick={signinhandler}><u>{dataLocalization.Back_to_Signin}</u></IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeLg='12' sizeXl='12' sizeXs='12' sizeSm='12' className='text-center ls_lable-style '>
            <IonText>{dataLocalization.You_donot_have_account}</IonText>
            <IonText className=' ls_signup cursor-pointer' onClick={signinhandler}>{dataLocalization.Signup_here}</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    )
  }
  return (
    <IonPage>
      {IsMobile
        ?
        mobileUi()
        :
        webUi()
      }
    </IonPage>
  )
}

export default PasswordReset