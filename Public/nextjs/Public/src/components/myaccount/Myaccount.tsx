import { useEffect, useState } from "react";
import { close, trashBin } from 'ionicons/icons';

import { useForm, SubmitHandler } from "react-hook-form";

import dofylogo from "@/assets/images/phase2/dofy-logo.png"

import PersonServices from "@/services/Person.Services";
import { IRegistrationModel } from "@/models/Registration.Model";

import { Direction, authUser, getLocalStorage, getUserLanguage, isIn, onKeyDown } from "@/components/helper/Helper";
import { HelperConstant } from "@/components/helper/HelperConstant";

import { useTypedSelector, useTypedDispatch } from "@/features/reduxhooks/ReduxHooks";

import DeleteScreen from "../deletescreen/DeleteScreen";

import "./MyAccount.css";
import { InputAdornment, TextField, Tooltip } from "@mui/material";

import Language from "./MyAccount.json"
import dynamic from "next/dynamic";
import { modelChanger } from "@/features/reducers/login/LoginModel.Reducer";

const IonModal = dynamic(() => import('@ionic/react').then(mod => mod.IonModal), { ssr: false });
const IonAlert = dynamic(() => import('@ionic/react').then(mod => mod.IonAlert), { ssr: false });
const IonLoading = dynamic(() => import('@ionic/react').then(mod => mod.IonLoading), { ssr: false });


function MyAccount() {

  const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);
  const pattern = HelperConstant.emailPattern.pattern;
  let dataLocalization = Language[getUserLanguage()];
  let personId = getLocalStorage()?.PersonId;
  let dispatch = useTypedDispatch();

  const [person, setPerson] = useState<IRegistrationModel>({} as IRegistrationModel);
  const [showAlert, setShowAlert] = useState(false);
  const [OTPAlert, setOTPAlert] = useState(false);
  const [isOrders, setIsOrders] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, } = useForm<IRegistrationModel>({});

  const Cancel = () => {
    dispatch(modelChanger(false));
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
      <ion-content>
        <IonLoading isOpen={updating} message={"Updating..."} />
        {isIn() ?
          <ion-grid dir={Direction()}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ion-row>
                <ion-col size-xl="12" size-md="12" size-sm="12" class='ls_login-close'>
                  <ion-icon class='ls-close-icon' icon={close} onClick={() => Cancel()}></ion-icon>
                </ion-col>
              </ion-row>
              <ion-row class="ap_padding-adjustment">
                <ion-col size-lg="2.5" size-xs="3" >
                  <img src={dofylogo.src} alt="dofy-logo"></img>
                </ion-col>
                <ion-col size-lg="10" size-md="10" size-xs="10" class="mt-3" >
                  <ion-text class="p-0 ls_signin-text">My Account</ion-text>
                </ion-col>
                <ion-col size-lg="2" size-md="2" class="align-self-end text-end">
                  <Tooltip title="delete-account">
                    <ion-icon onClick={() => setShowAlert(true)} color="danger" size="medium" icon={trashBin} />
                  </Tooltip>
                </ion-col>
                <ion-col size-lg="12" size-md="12" size-sm="12" class="mt-2" >
                  <ion-text class="p-0 ap_signin-text" > Name* </ion-text>
                  <TextField fullWidth variant="outlined" {...register("FirstName", { required: true })} placeholder="John Doe/Jane Doe" />
                  {errors.FirstName && (<ion-text class="text-danger"> Please enter the Name </ion-text>)}
                </ion-col>
                <ion-col size-lg="12" size-md="12" size-sm="12" class="mt-2">
                  <ion-text class="p-0 ap_signin-text"> Mobile Number </ion-text>
                  <TextField fullWidth variant="outlined" {...register("Mobile", { required: true, minLength: 10, maxLength: 10, })} type="number" placeholder="+91- 9123456780" disabled onKeyDown={onKeyDown} />
                  {errors.Mobile?.type === "required" && (<ion-text class="text-danger"> Please enter the Mobile Number </ion-text>)}
                  {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && (<ion-text class="text-danger"> Please enter the valid Mobile Number </ion-text>)}
                </ion-col>
                <ion-col size-lg="12" size-md="12" size-sm="12" class="mt-2">
                  <ion-text class="p-0 ap_signin-text"> Email*</ion-text>
                  <TextField fullWidth variant="outlined" {...register("Email", { required: true, pattern: pattern })} placeholder="email@address.com" />
                  {errors.Email?.type === "required" && (<ion-text class="text-danger">  Please enter the Email </ion-text>)}
                  {errors.Email?.type === "pattern" && (<ion-text class="text-danger">  Please enter the valid Email </ion-text>)}
                </ion-col>
                <ion-col size-lg="12" size-md="12" size-sm="12" class="mt-2">
                  <ion-button class='ls_btn-color' expand='full' type="submit">Save Changes</ion-button>
                </ion-col>
                <ion-col class="ion-text-center ap_lable-style">
                  <ion-text onClick={() => Cancel()} >Cancel</ion-text>
                </ion-col>
              </ion-row>
            </form>
          </ion-grid>
          :
          <ion-content>
            <ion-grid dir={Direction()}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ion-row>
                  <ion-col size-xl="12" size-md="12" size-sm="12" class='ls_login-close'>
                    <ion-icon class='ma-close-icon' icon={close} onClick={() => Cancel()}></ion-icon>
                  </ion-col>
                </ion-row>
                <ion-row class="ap_padding-adjustment">
                  <ion-col size-lg="2.5" size-xs="3" >
                    <img src={dofylogo.src}></img>
                  </ion-col>
                  <ion-col size-lg="10" size-md="10" size-xs="10" class="mt-3" >
                    <ion-text class="p-0 ls_signin-text">{dataLocalization.My_Account}</ion-text><br />
                  </ion-col>
                  <ion-col size-lg="2" size-md="2" size-sm="2" size-xs="2" class="align-self-end text-end">
                    <Tooltip title="delete-account">
                      <ion-icon onClick={() => setShowAlert(true)} color="danger" size="medium" icon={trashBin} />
                    </Tooltip>
                  </ion-col>
                  <ion-col size-lg="12" size-md="12" size-sm="12" class="mt-2" >
                    <ion-text class="p-0 ap_signin-text" > {dataLocalization.Name} </ion-text>
                    <TextField fullWidth {...register("FirstName", { required: true })} placeholder="John Doe/Jane Doe" />
                    {errors.FirstName && (<ion-text class="text-danger"> {dataLocalization.Please_enter_the_Name} </ion-text>)}
                  </ion-col>
                  <ion-col size-lg="12" size-md="12" size-sm="12" class="mt-2">
                    <ion-label class="p-0 ap_signin-text">{dataLocalization.Mobile_Number}</ion-label>
                    <TextField
                      fullWidth
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
                    {errors.Mobile?.type === "required" && (<ion-text class="text-danger"> {dataLocalization.Please_enter_the_Mobile_Number} </ion-text>)}
                    {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && (<ion-text class="text-danger">{dataLocalization.Please_enter_the_valid_Mobile_Number} </ion-text>)}

                  </ion-col>
                  <ion-col size-lg="12" size-md="12" size-sm="12" class="mt-2">
                    <ion-text class="p-0 ap_signin-text"> {dataLocalization.Email}</ion-text>
                    <TextField fullWidth variant="outlined" {...register("Email", { required: true, pattern: pattern })} placeholder="email@address.com" />
                    {errors.Email?.type === "required" && (<ion-text class="text-danger"> {dataLocalization.Please_enter_the_Email}</ion-text>)}
                    {errors.Email?.type === "pattern" && (<ion-text class="text-danger">  {dataLocalization.Please_enter_the_valid_Email} </ion-text>)}
                  </ion-col>
                  <ion-col size-lg="12" size-md="12" size-sm="12" class="mt-2">
                    <ion-text class="p-0 ap_sigin-text"> {dataLocalization.Password}</ion-text>
                    <TextField fullWidth variant="outlined" {...register("UserLogin.PassWord", { required: true })} ></TextField>
                    {errors.UserLogin?.PassWord?.type === "required" && (<ion-text class="text-danger">{dataLocalization.Please_enter_the_password}</ion-text>)}
                    {errors.UserLogin?.PassWord?.type === 'pattern' && (<ion-text class="text-danger">{dataLocalization.please_enter_the_valid_password}</ion-text>)}
                  </ion-col>
                  <ion-col size-lg="12" size-md="12" size-sm="12" class="mt-2">
                    <ion-button class='ls_btn-color' expand='full' type="submit">{dataLocalization.save_changes}</ion-button>
                  </ion-col>
                  <ion-col class="ion-text-center ap_lable-style">
                    <ion-text onClick={() => Cancel()} >{dataLocalization.Cancel}</ion-text>
                  </ion-col>
                </ion-row>
              </form>
            </ion-grid>
          </ion-content>
        }
      </ion-content>
    )
  }
  const mobileUI = () => {
    return (
      <ion-content>
        {isIn() ?
          <ion-grid dir={Direction()}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ion-row>
                <ion-col size-xl="12" size-xs="12" class='ls_login-close'>
                  <ion-icon class='ls-close-icon' icon={close} onClick={() => Cancel()}></ion-icon>
                </ion-col>
              </ion-row>
              <ion-row class="ap_padding-adjustment">
                <ion-col size-lg="2.5" size-xs="4" >
                  <img src={dofylogo.src} alt="dof-logo"></img>
                </ion-col>
                <ion-col size-lg="10" size-xs="10" class="mt-3" >
                  <ion-text class="p-0 ls_signin-text">My Account</ion-text>
                </ion-col>
                <ion-col size-lg="2" size-xs="2" class="align-self-end text-end">
                  <Tooltip title="delete-account">
                    <ion-icon onClick={() => setShowAlert(true)} color="danger" size="medium" icon={trashBin} />
                  </Tooltip>
                </ion-col>
                <ion-col size-lg="12" size-xs='12' size-sm='12' size-md='12' class="mt-2" >
                  <ion-text class="p-0 ap_signin-text" > Name*</ion-text><br />
                  <TextField fullWidth {...register("FirstName", { required: true })} placeholder="John Doe/Jane Doe" />
                  {errors.FirstName && (<ion-text class="text-danger"> Please enter the Name </ion-text>)}
                </ion-col>
                <ion-col size-lg="12" size-xs="12" size-md="12" size-sm="12" class="mt-2">
                  <ion-text class="p-0 ap_signin-text" > Mobile Number</ion-text>
                  <TextField fullWidth disabled {...register("Mobile", { required: true, minLength: 10, maxLength: 10, })} type="number" onKeyDown={onKeyDown} />
                  {errors.Mobile?.type === "required" && (<ion-text class="text-danger"> Please enter the Mobile Number </ion-text>)}
                  {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && (<ion-text class="text-danger"> Please enter the valid Mobile Number </ion-text>)}
                </ion-col>
                <ion-col size-lg="12" size-xs="12" size-md="12" size-sm="12" class="mt-2">
                  <ion-text class="p-0 ap_signin-text"> Email*</ion-text>
                  <TextField fullWidth {...register("Email", { required: true, pattern: pattern })} placeholder="email@address.com" />
                  {errors.Email?.type === "required" && (<ion-text class="text-danger">  Please enter the Email </ion-text>)}
                  {errors.Email?.type === "pattern" && (<ion-text class="text-danger">  Please enter the valid Email </ion-text>)}
                </ion-col>
                <ion-col size-lg="12" size-xs="12" size-md="12" size-sm="12" class="mt-2">
                  <ion-button class='ls_btn-color' expand='full' type="submit" >save changes</ion-button>
                </ion-col>
                <ion-col class="ion-text-center ap_lable-style mt-2">
                  <ion-text onClick={() => Cancel()} >Cancel</ion-text>
                </ion-col>
              </ion-row>
            </form>
          </ion-grid>
          :
          <ion-content>
            <ion-grid dir={Direction()}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ion-row>
                  <ion-col size-xl="12" size-xs='12' size-sm='12' size-md='12' class='ls_login-close'>
                    <ion-icon class='ls-close-icon' icon={close} onClick={() => Cancel()}></ion-icon>
                  </ion-col>
                </ion-row>
                <ion-row class="ap_padding-adjustment">
                  <ion-col size-lg="2.5" size-xs="3" >
                    <img src={dofylogo.src} alt="dofy-logo"></img>
                  </ion-col>
                  <ion-col size-lg="10" size-xs="10" size-sm='12' size-md='12' class="mt-3" >
                    <ion-text class="p-0 ls_signin-text">My Account</ion-text><br />
                  </ion-col>
                  <ion-col size-lg="2" size-xs="2" size-sm='12' size-md='12' class="align-self-end text-end">
                    <Tooltip title="delete-account">
                      <ion-icon onClick={() => setShowAlert(true)} color="danger" size="medium" icon={trashBin} />
                    </Tooltip>
                  </ion-col>
                  <ion-col size-lg="12" size-xs="12" size-sm='12' size-md='12' class="mt-2" >
                    <ion-text class="p-0 ap_signin-text" > Name*</ion-text>
                    <TextField fullWidth {...register("FirstName", { required: true })} placeholder="John Doe/Jane Doe" />
                    {errors.FirstName && (<ion-text class="text-danger"> Please enter the Name </ion-text>)}
                  </ion-col>
                  <ion-col size-lg="12" size-xs='12' size-sm='12' size-md='12' class="mt-2">
                    <ion-label class="p-0 ap_signin-text">{dataLocalization.Mobile_Number}</ion-label>
                    <TextField
                      fullWidth
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
                    {errors.Mobile?.type === "required" && (<ion-text class="text-danger"> Please enter the Mobile Number </ion-text>)}
                    {(errors.Mobile?.type === "minLength" || errors.Mobile?.type === "maxLength") && (<ion-text class="text-danger"> Please enter the valid Mobile Number </ion-text>)}
                  </ion-col>
                  <ion-col size-lg="12" size-xs="12" size-sm='12' size-md='12' class="mt-2">
                    <ion-text class="p-0 ap_signin-text"> Email*</ion-text>
                    < TextField fullWidth {...register("Email", { required: true, pattern: pattern })} placeholder="email@address.com" />
                    {errors.Email?.type === "required" && (<ion-text class="text-danger">  Please enter the Email </ion-text>)}
                    {errors.Email?.type === "pattern" && (<ion-text class="text-danger">  Please enter the valid Email </ion-text>)}
                  </ion-col>
                  <ion-col size-lg="12" size-xs="12" size-sm='12' size-md='12' class="mt-2">
                    <ion-text class="p-0 ap_sigin-text"> Password*</ion-text>
                    <TextField fullWidth {...register("UserLogin.PassWord", { required: true })} ></TextField>
                    {errors.UserLogin?.PassWord?.type === "required" && (<ion-text class="text-danger">Please enter the  password </ion-text>)}
                    {errors.UserLogin?.PassWord?.type === 'pattern' && (<ion-text class="text-danger">please enter the valid password</ion-text>)}
                  </ion-col>
                  <ion-col size-lg="12" size-xs="12" size-sm='12' size-md='12' class="mt-2">
                    <ion-button class='ls_btn-color' expand='full' type="submit" >save changes</ion-button>

                  </ion-col>
                  <ion-col size-xs="12" class="ion-text-center ap_lable-style mt-2">
                    <ion-text onClick={() => Cancel()} >Cancel</ion-text>
                  </ion-col>
                </ion-row>
              </form>
            </ion-grid>
          </ion-content>
        }
      </ion-content>
    )
  }

  return (
    <ion-app class="ls-module">
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
      {OTPAlert &&
        <IonModal isOpen={OTPAlert} cssClass="modal-login modal-login-height-95" onDidDismiss={() => setOTPAlert(false)}>
          <DeleteScreen setOTPAlert={setOTPAlert} />
        </IonModal>
      }
      {
        IsMobile
          ?
          mobileUI()
          :
          webUi()
      }
    </ion-app>
  )

}

export default MyAccount;

