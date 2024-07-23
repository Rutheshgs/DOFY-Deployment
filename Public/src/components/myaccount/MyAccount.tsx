import { useEffect, useState } from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonText, IonButton, IonIcon, IonAlert, IonModal, IonImg, IonInput, IonLabel, IonLoading } from "@ionic/react";
import { close, trashBin } from 'ionicons/icons';

import { useForm, SubmitHandler } from "react-hook-form";

import dofylogo from "../../assets/images/phase2/dofy-logo.png"

import PersonServices from "../../services/Person.Services";
import { IRegistrationModel } from "../../models/Registration.Model";

import { Direction, authUser, getLocalStorage, getUserLanguage, isIn, onKeyDown } from "../helper/Helper";
import { HelperConstant } from "../helper/HelperConstant";

import { useTypedSelector, useTypedDispatch } from "../../features/reduxhooks/ReduxHooks";

import DeleteScreen from "../deletescreen/DeleteScreen";

import "./MyAccount.css";
import { InputAdornment, TextField, Tooltip } from "@mui/material";
import AuthServices from "../../services/Auth.Services";
import { CustomInput } from "../shared/CustomInput";
import Language from "./MyAccount.json"

interface Inputparams {
  datatoclose: any,
}

function MyAccount({ datatoclose }: Inputparams) {

  const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);
  const pattern = HelperConstant.emailPattern.pattern;
  let dataLocalization = Language[getUserLanguage()];
  let personId = getLocalStorage()?.PersonId;

  const [person, setPerson] = useState<IRegistrationModel>({} as IRegistrationModel);
  const [showAlert, setShowAlert] = useState(false);
  const [OTPAlert, setOTPAlert] = useState(false);
  const [isOrders, setIsOrders] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, } = useForm<IRegistrationModel>({});

  const Cancel = () => {
    datatoclose(false);
  }

  const onSubmit: SubmitHandler<IRegistrationModel> = (detail) => {
    setUpdating(true);
    detail.Id = person.Id;
    detail.Active = person.Active;
    detail.Modified = person.Modified;
    detail.ModifiedBy = person.ModifiedBy;
    detail.ValidationErrors = {};
    detail.UserRoleName = "";
    detail.LoginId = person.LoginId;
    detail.UserRoleId = person.UserRoleId;
    detail.MiddleName = person.MiddleName;
    detail.LastName = person.LastName;
    detail.Prefix = person.Prefix;
    detail.Suffix = person.Suffix;
    detail.DateOfBirth = person.DateOfBirth;
    detail.UploadImagePath = person.UploadImagePath;
    detail.UploadImageName = person.UploadImageName;
    detail.RowOrder = person.RowOrder;
    detail.UserLogin = {
      Id: person.UserLogin.Id,
      Created: person.UserLogin.Created,
      CreatedBy: person.UserLogin.CreatedBy,
      Active: person.UserLogin.Active,
      Modified: person.UserLogin.Modified,
      ModifiedBy: person.UserLogin.ModifiedBy,
      ValidationErrors: {},
      CompanyId: person.UserLogin.CompanyId,
      UserName: person.UserLogin.UserName,
      PassWord: person.UserLogin.PassWord,
      Salt: person.UserLogin.Salt,
      IVKey: person.UserLogin.IVKey,
      RowOrder: person.UserLogin.RowOrder,
      ConfirmPassword: ""
    }
    PersonServices.edit(detail).then((res) => {
      if (res.status === 200) {
        refreshLocalStorage();
      }
    }).catch((e: string) => {
      console.log(e)
    });
  };

  const refreshLocalStorage = () => {
    PersonServices.GetUserByPersonId(personId ?? 0).then((res) => {
      if (res.status === 200) {
        let data = getLocalStorage();
        data.FirstName = res.data.FirstName;
        localStorage.setItem("token", JSON.stringify(data));
        window.location.reload();
      }
    }).catch((e: string) => {
      console.log(e);
    });
  }

  // const refreshToken = () => {
  //   AuthServices.refreshToken(getLocalStorage().Token).then(res => {
  //     if (res.status == 200) {
  //       localStorage.setItem("token", JSON.stringify(res.data));
  //       window.location.reload();
  //     }
  //   }).catch(e => console.log(e));
  // }

  const deleteAccount = (personId: number) => {
    PersonServices.DeleteUser(personId).then((res) => {
      if (res.status === 200) {
        if (res.data === true) {
          setOTPAlert(true);
          setShowAlert(false);
        }
        else {
          setIsOrders(true);
        }
      }
    }).catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    const getMyAccount = (personId: number) => {
      PersonServices.GetUserByPersonId(personId ?? 0).then((res) => {
        if (res.status === 200)
          reset(res.data);
        setPerson(res.data);
      }).catch((e: string) => {
        console.log(e);
      });
    }

    getMyAccount(personId);
  }, [personId, reset]);

  useEffect(() => {
    authUser();
  }, []);

  const webUi = () => {
    return (
      <IonPage>
        <IonLoading isOpen={updating} message={"Updating..."} />
        {isIn() ?
          <IonGrid dir={Direction()}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <IonRow>
                <IonCol sizeXl="12" sizeMd="12" sizeSm="12" className='ls_login-close'>
                  <IonIcon className='ls-close-icon' icon={close} onClick={() => Cancel()}></IonIcon>
                </IonCol>
              </IonRow>
              <IonRow className="ap_padding-adjustment">
                <IonCol sizeLg="2.5" sizeXs="3" >
                  <IonImg src={dofylogo} alt="dofy-logo"></IonImg>
                </IonCol>
                <IonCol sizeLg="10" sizeMd="10" sizeXs="10" className="mt-3" >
                  <IonText className="p-0 ls_signin-text">My Account</IonText>
                </IonCol>
                <IonCol sizeLg="2" sizeMd="2" className="align-self-end text-end">
                  <Tooltip title="delete-account">
                    <IonIcon onClick={() => setShowAlert(true)} color="danger" size="medium" icon={trashBin} />
                  </Tooltip>
                </IonCol>
                <IonCol sizeLg="12" sizeMd="12" sizeSm="12" className="mt-2" >
                  <IonText className="p-0 ap_signin-text" > Name* </IonText>
                  <IonInput  {...register("FirstName", { required: true })} placeholder="John Doe/Jane Doe" className='fp_outline-style' />
                  {errors.FirstName && (<IonText className="text-danger"> Please enter the Name </IonText>)}
                </IonCol>
                <IonCol sizeLg="12" sizeMd="12" sizeSm="12" className="mt-2">
                  <IonText className="p-0 ap_signin-text"> Mobile Number </IonText>
                  <IonInput {...register("Mobile", { required: true, minLength: 10, maxLength: 10, })} type="number" placeholder="+91- 9123456780" disabled onKeyDown={onKeyDown} className='fp_outline-style' />
                  {errors.Mobile?.type === "required" && (<IonText className="text-danger"> Please enter the Mobile Number </IonText>)}
                  {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && (<IonText className="text-danger"> Please enter the valid Mobile Number </IonText>)}
                </IonCol>
                <IonCol sizeLg="12" sizeMd="12" sizeSm="12" className="mt-2">
                  <IonText className="p-0 ap_signin-text"> Email*</IonText>
                  < IonInput {...register("Email", { required: true, pattern: pattern })} placeholder="email@address.com" className='fp_outline-style' />
                  {errors.Email?.type === "required" && (<IonText className="text-danger">  Please enter the Email </IonText>)}
                  {errors.Email?.type === "pattern" && (<IonText className="text-danger">  Please enter the valid Email </IonText>)}
                </IonCol>
                <IonCol sizeLg="12" sizeMd="12" sizeSm="12" className="mt-2">
                  <IonButton className='ls_btn-color' color='white' expand='full' type="submit">Save Changes</IonButton>
                </IonCol>
                <IonCol className="text-center ap_lable-style">
                  <IonText onClick={() => Cancel()} >Cancel</IonText>
                </IonCol>
              </IonRow>
            </form>
          </IonGrid>
          :
          <IonContent>
            <IonGrid dir={Direction()}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                  <IonCol sizeXl="12" sizeMd="12" sizeSm="12" className='ls_login-close'>
                    <IonIcon className='ma-close-icon' icon={close} onClick={() => Cancel()}></IonIcon>
                  </IonCol>
                </IonRow>
                <IonRow className="ap_padding-adjustment">
                  <IonCol sizeLg="2.5" sizeXs="3" >
                    <IonImg src={dofylogo}></IonImg>
                  </IonCol>
                  <IonCol sizeLg="10" sizeMd="10" sizeXs="10" className="mt-3" >
                    <IonText className="p-0 ls_signin-text">{dataLocalization.My_Account}</IonText><br />
                  </IonCol>
                  <IonCol sizeLg="2" sizeMd="2" sizeSm="2" sizeXs="2" className="align-self-end text-end">
                    <Tooltip title="delete-account">
                      <IonIcon onClick={() => setShowAlert(true)} color="danger" size="medium" icon={trashBin} />
                    </Tooltip>
                  </IonCol>
                  <IonCol sizeLg="12" sizeMd="12" sizeSm="12" className="mt-2" >
                    <IonText className="p-0 ap_signin-text" > {dataLocalization.Name} </IonText>
                    <IonInput  {...register("FirstName", { required: true })} placeholder="John Doe/Jane Doe" className='fp_outline-style' />
                    {errors.FirstName && (<IonText className="text-danger"> {dataLocalization.Please_enter_the_Name} </IonText>)}
                  </IonCol>
                  <IonCol sizeLg="12" sizeMd="12" sizeSm="12" className="mt-2">
                    <IonLabel className="p-0 ap_signin-text">{dataLocalization.Mobile_Number}</IonLabel>
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      id="outlined-start-adornment"
                      placeholder="987654321"
                      sx={{ width: '25ch' }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">+971</InputAdornment>,
                        size: "medium"
                      }}
                      type="number"
                      disabled
                      {...register("Mobile", { required: true, minLength: 9, maxLength: 10 })}
                    />
                    {errors.Mobile?.type === "required" && (<IonText className="text-danger"> {dataLocalization.Please_enter_the_Mobile_Number} </IonText>)}
                    {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && (<IonText className="text-danger">{dataLocalization.Please_enter_the_valid_Mobile_Number} </IonText>)}

                  </IonCol>
                  <IonCol sizeLg="12" sizeMd="12" sizeSm="12" className="mt-2">
                    <IonText className="p-0 ap_signin-text"> {dataLocalization.Email}</IonText>
                    < IonInput {...register("Email", { required: true, pattern: pattern })} placeholder="email@address.com" className='fp_outline-style' />
                    {errors.Email?.type === "required" && (<IonText className="text-danger"> {dataLocalization.Please_enter_the_Email}</IonText>)}
                    {errors.Email?.type === "pattern" && (<IonText className="text-danger">  {dataLocalization.Please_enter_the_valid_Email} </IonText>)}
                  </IonCol>
                  <IonCol sizeLg="12" sizeMd="12" sizeSm="12" className="mt-2">
                    <IonText className="p-0 ap_sigin-text"> {dataLocalization.Password}</IonText>
                    <IonInput  {...register("UserLogin.PassWord", { required: true })} className='fp_outline-style'></IonInput>
                    {errors.UserLogin?.PassWord?.type === "required" && (<IonText className="text-danger">{dataLocalization.Please_enter_the_password}</IonText>)}
                    {errors.UserLogin?.PassWord?.type === 'pattern' && (<IonText className="text-danger">{dataLocalization.please_enter_the_valid_password}</IonText>)}
                  </IonCol>
                  <IonCol sizeLg="12" sizeMd="12" sizeSm="12" className="mt-2">
                    <IonButton className='ls_btn-color' color='white' expand='full' type="submit" >{dataLocalization.save_changes}</IonButton>
                  </IonCol>
                  <IonCol className="text-center ap_lable-style">
                    <IonText onClick={() => Cancel()} >{dataLocalization.Cancel}</IonText>
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
          <IonGrid dir={Direction()}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <IonRow>
                <IonCol sizeXl="12" sizeXs="12" className='ls_login-close'>
                  <IonIcon className='ls-close-icon' icon={close} onClick={() => Cancel()}></IonIcon>
                </IonCol>
              </IonRow>
              <IonRow className="ap_padding-adjustment">
                <IonCol sizeLg="2.5" sizeXs="4" >
                  <IonImg src={dofylogo}></IonImg>
                </IonCol>
                <IonCol sizeLg="10" sizeXs="10" className="mt-3" >
                  <IonText className="p-0 ls_signin-text">My Account</IonText>
                </IonCol>
                <IonCol sizeLg="2" sizeXs="2" className="align-self-end text-end">
                  <Tooltip title="delete-account">
                    <IonIcon onClick={() => setShowAlert(true)} color="danger" size="medium" icon={trashBin} />
                  </Tooltip>
                </IonCol>
                <IonCol sizeLg="12" sizeXs="12" className="mt-2" >
                  <IonText className="p-0 ap_signin-text" > Name*</IonText>
                  <IonInput  {...register("FirstName", { required: true })} placeholder="John Doe/Jane Doe" className='fp_outline-style' />
                  {errors.FirstName && (<IonText className="text-danger"> Please enter the Name </IonText>)}
                </IonCol>
                <IonCol sizeLg="12" sizeXs="12" className="mt-2">
                  <IonText className="p-0 ap_signin-text" > Mobile Number</IonText>
                  <IonInput disabled {...register("Mobile", { required: true, minLength: 10, maxLength: 10, })} type="number" onKeyDown={onKeyDown} className='fp_outline-style' />
                  {errors.Mobile?.type === "required" && (<IonText className="text-danger"> Please enter the Mobile Number </IonText>)}
                  {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && (<IonText className="text-danger"> Please enter the valid Mobile Number </IonText>)}
                </IonCol>
                <IonCol sizeLg="12" sizeXs="12" className="mt-2">
                  <IonText className="p-0 ap_signin-text"> Email*</IonText>
                  < IonInput {...register("Email", { required: true, pattern: pattern })} placeholder="email@address.com" className='fp_outline-style' />
                  {errors.Email?.type === "required" && (<IonText className="text-danger">  Please enter the Email </IonText>)}
                  {errors.Email?.type === "pattern" && (<IonText className="text-danger">  Please enter the valid Email </IonText>)}
                </IonCol>
                <IonCol sizeLg="12" sizeXs="12" className="mt-2">
                  <IonButton className='ls_btn-color' color='white' expand='full' type="submit" >save changes</IonButton>
                </IonCol>
                <IonCol className="text-center ap_lable-style mt-2">
                  <IonText onClick={() => Cancel()} >Cancel</IonText>
                </IonCol>
              </IonRow>
            </form>
          </IonGrid>
          :
          <IonContent>
            <IonGrid dir={Direction()}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                  <IonCol sizeXl="12" className='ls_login-close'>
                    <IonIcon className='ls-close-icon' icon={close} onClick={() => Cancel()}></IonIcon>
                  </IonCol>
                </IonRow>
                <IonRow className="ap_padding-adjustment">
                  <IonCol sizeLg="2.5" sizeXs="3" >
                    <IonImg src={dofylogo}></IonImg>
                  </IonCol>
                  <IonCol sizeLg="10" sizeXs="10" className="mt-3" >
                    <IonText className="p-0 ls_signin-text">My Account</IonText><br />
                  </IonCol>
                  <IonCol sizeLg="2" sizeXs="2" className="align-self-end text-end">
                    <Tooltip title="delete-account">
                      <IonIcon onClick={() => setShowAlert(true)} color="danger" size="medium" icon={trashBin} />
                    </Tooltip>
                  </IonCol>
                  <IonCol sizeLg="12" sizeXs="12" className="mt-2" >
                    <IonText className="p-0 ap_signin-text" > Name*</IonText>
                    <IonInput  {...register("FirstName", { required: true })} placeholder="John Doe/Jane Doe" className='fp_outline-style' />
                    {errors.FirstName && (<IonText className="text-danger"> Please enter the Name </IonText>)}
                  </IonCol>
                  <IonCol sizeLg="12" sizeXs="12" className="mt-2">
                    <IonLabel className="p-0 ap_signin-text">{dataLocalization.Mobile_Number}</IonLabel>
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      id="outlined-start-adornment"
                      placeholder="987654321"
                      sx={{ width: '25ch' }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">+971</InputAdornment>,
                        size: "medium"
                      }}
                      type="number"
                      disabled
                      {...register("Mobile", { required: true, minLength: 9, maxLength: 9 })}
                    />
                    {errors.Mobile?.type === "required" && (<IonText className="text-danger"> Please enter the Mobile Number </IonText>)}
                    {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && (<IonText className="text-danger"> Please enter the valid Mobile Number </IonText>)}
                  </IonCol>
                  <IonCol sizeLg="12" sizeXs="12" className="mt-2">
                    <IonText className="p-0 ap_signin-text"> Email*</IonText>
                    < IonInput {...register("Email", { required: true, pattern: pattern })} placeholder="email@address.com" className='fp_outline-style' />
                    {errors.Email?.type === "required" && (<IonText className="text-danger">  Please enter the Email </IonText>)}
                    {errors.Email?.type === "pattern" && (<IonText className="text-danger">  Please enter the valid Email </IonText>)}
                  </IonCol>
                  <IonCol sizeLg="12" sizeXs="12" className="mt-2">
                    <IonText className="p-0 ap_sigin-text"> Password*</IonText>
                    <IonInput  {...register("UserLogin.PassWord", { required: true })} className='fp_outline-style'></IonInput>
                    {errors.UserLogin?.PassWord?.type === "required" && (<IonText className="text-danger">Please enter the  password </IonText>)}
                    {errors.UserLogin?.PassWord?.type === 'pattern' && (<IonText className="text-danger">please enter the valid password</IonText>)}
                  </IonCol>
                  <IonCol sizeLg="12" sizeXs="12" className="mt-2">
                    <IonButton className='ls_btn-color' color='white' expand='full' type="submit" >save changes</IonButton>

                  </IonCol>
                  <IonCol sizeXs="12" className="text-center ap_lable-style mt-2">
                    <IonText onClick={() => Cancel()} >Cancel</IonText>
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
    <IonPage>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={dataLocalization.Delete_Account}
        message={dataLocalization.Are_you_sure_you_want_to_delete}
        buttons={[
          {
            text: dataLocalization.Cancel,
            role: 'cancel',
            handler: () => {
              setShowAlert(false);
            },
          },
          {
            text: dataLocalization.OK,
            role: 'confirm',
            handler: () => {
              deleteAccount(personId);
            },
          },
        ]}
      />
      <IonAlert
        isOpen={isOrders}
        onDidDismiss={() => { setIsOrders(false); setShowAlert(false) }}
        header={dataLocalization.Sorry}
        message={dataLocalization.You_Have_Scheduled}
        buttons={[
          {
            text: dataLocalization.OK,
            role: 'confirm',
            handler: () => {
              setIsOrders(false);
              setShowAlert(false);
            },
          },
        ]}
      />
      <IonModal isOpen={OTPAlert} canDismiss={true} className="modal-login modal-login-height-95" onDidDismiss={() => setOTPAlert(false)}>
        <DeleteScreen setOTPAlert={setOTPAlert} />
      </IonModal>
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

export default MyAccount;

