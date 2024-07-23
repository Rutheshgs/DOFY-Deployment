import { IonButton, IonCol, IonContent, IonPage, IonRow, IonText, IonGrid, IonCard, IonCardHeader, IonTitle, IonImg } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import MenuButton from "../../components/menubutton/MenuButton";
import { CustomDropdown } from "../../components/shared/CustomDropdown";
import { CustomInput } from "../../components/shared/CustomInput";
import { CustomImg } from "../../components/shared/CustomImage";
import dofylogo from '../../assets/images/myaccount.png'
import dofylogos from '../../assets/images/myaccounts.png'


import GetDofyGeoListServices from "../../services/GetDofyGeoList.Services";
import MasterServices from "../../services/Master.Services";
import PersonalDetailsServices from "../../services/PersonalDetails.Services";
import { IUserModel } from "../../models/User.Model";
import { IDofyGeo } from "../../models/Person.Model";

import { isMobile, onKeyDown } from "../../components/helper/Helper";
import { HelperConstant } from "../../components/helper/HelperConstant";
import { isRider } from "../../components/helper/TokenHelper";

import { CustomAutoComplete } from "../../components/shared/CustomAutoComplete";
import Profile from "../../assets/images/profile.png";

function View() {

    const [user, setUser] = useState<IUserModel>({} as IUserModel);
    const [dofyGeoList, setDofyGeoList] = useState<Array<IDofyGeo>>([]);
    const [getState, setGetState] = useState<any>([]);
    const { id } = useParams<{ id: any }>();
    const [pinLocationErr, setPinLocationErr] = useState(true);
    const [getRole, setGetRole] = useState<any>([]);
    const [locationId, setLocationId] = useState<number>();

    const [profileImage, setProfileImage] = useState<any>();

    const isAddMode = !id;

    const { register, reset, formState: { errors }, clearErrors, setValue } = useForm<IUserModel>({ reValidateMode: "onChange" });
    const pattern = HelperConstant.emailPattern.pattern;
    const riderlogin: boolean = isRider() ?? false;


    const getPinLocationCreate = (Id: any) => {
        let data = dofyGeoList.find(it => it.Id === Id);
        if (data) {
            setValue("LocationId", data.Code);
            setPinLocationErr(true);
        }
        if (data === undefined) {
            setPinLocationErr(false);
        }
    }

    const getPinLocationUpdate = (Id: any) => {
        let data = dofyGeoList.find(it => it.Id === Id);
        if (data) {
            setPinLocationErr(true);
            setValue("LocationId", data.Code)
            setLocationId(parseInt(data.Code));
        }
        if (data === undefined) {
            setPinLocationErr(false);
        }
    }

    const Cancel = () => {
        if (!riderlogin) {
            window.location.href = "/UserDashbord";
        }
        else {
            window.location.href = "/homepage";
        }
    }

    const GetRoles = () => {
        MasterServices.GetRoles().then(res => {
            if (res.status === 200) {
                setGetRole(res.data)
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const GetStates = (serviceTypeId: number) => {
        MasterServices.GetStateList(serviceTypeId).then(res => {
            if (res.status === 200) {
                setGetState(res.data)
            }
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        const GetUserDetail = (id: number) => {
            if (!isAddMode) {
                PersonalDetailsServices.getUser(id).then(res => {
                    if (res.status === 200) {
                        setUser(res.data);
                        reset(res.data);
                        GetDofyGeoList(HelperConstant.serviceTypeId.SELL, res.data.LocationId, res.data);
                    }
                }).catch(e => {
                    console.log(e);
                });
            }
        }

        const GetDofyGeoList = (serviceTypeId: number, LocationId?: any, response?: any) => {
            GetDofyGeoListServices.GetAllDofyGeo(serviceTypeId).then(res => {
                if (res.status === 200) {
                    setDofyGeoList(res.data);
                    if (!isAddMode && LocationId) {
                        let geoData = res.data.find((eItem: any) => eItem.Id === LocationId);
                        response = { ...response, LocationId: geoData.Code }
                        reset(response);
                        setLocationId(parseInt(geoData.Code));
                        setValue("LocationId", geoData.Code);
                    }
                }
            }).catch(e => {
                console.log(e);
            });
        }

        if (isAddMode) {
            GetDofyGeoList(HelperConstant.serviceTypeId.SELL);
        }
        GetStates(HelperConstant.serviceTypeId.SELL);
        GetUserDetail(id);
        GetRoles();


        const GetUserProfile = () => {
            PersonalDetailsServices.GetBase64ProfileImage(id).then((res) => {
                var base64ImageString: any = `data:image/png;base64,${res.data}`;
                setProfileImage(base64ImageString)
                console.log(base64ImageString)
            });
        }
        GetUserProfile();

    }, [id, reset, setValue, isAddMode]);

    return (
        <IonPage>
            <MenuButton pageName={"User"} backButton="yes" />
            <IonContent fullscreen={true}>
                <IonGrid className="ion-no-padding">
                    <IonRow className="account-header">
                        {isMobile() ?
                            <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
                                <CustomImg className="account-logo" src={dofylogo} />
                            </IonCol> :
                            <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
                                <CustomImg className="account-logo" src={dofylogos} />
                            </IonCol>
                        }

                    </IonRow>
                    <IonRow>
                        <IonCol sizeMd="12" offsetMd="0" sizeXs="12" offsetXs="0" sizeLg="7" offsetLg="5" sizeSm="12" sizeXl="5" offsetXl="6">
                            <IonCard className="account-cardform">
                                <IonCardHeader className="ion-text-center">
                                    <IonTitle className="account-cardheader">{isAddMode ? 'Create User' : 'Modify User'}</IonTitle>
                                </IonCardHeader>
                                <form >
                                    {profileImage ?
                                        <IonRow>
                                            <IonCol sizeMd="12" sizeLg="12" sizeSm="12" sizeXs="12" sizeXl="6">
                                                {profileImage ?
                                                    <IonImg className="cs_upload-image" src={profileImage} alt="scsc"  ></IonImg>
                                                    :
                                                    <IonImg className="cs_upload-image" src={Profile}></IonImg>
                                                }
                                            </IonCol>
                                            <IonCol sizeMd="12" sizeLg="12" sizeSm="12" sizeXs="12" sizeXl="6">
                                                <IonRow>
                                                    <IonCol sizeMd="6" sizeSm="12" sizeXs="12" sizeXl="12">
                                                        <CustomInput disabled label={"First Name"} {...register("FirstName", { required: true })} onIonChange={() => { clearErrors("FirstName"); }}
                                                            placeholder="Ex:John" />
                                                        {errors.FirstName && (<IonText color='danger' className="error-padding">Please enter First Name</IonText>)}
                                                    </IonCol>
                                                    <IonCol sizeMd="6" sizeSm="12" sizeXs="12" sizeXl="12">
                                                        <CustomInput disabled label={"Last Name"} {...register("LastName", { required: true })} onIonChange={() => { clearErrors("LastName"); }}
                                                            placeholder="Ex:Doe" />
                                                        {errors.LastName && (<IonText color='danger' className="error-padding">Please enter Last Name</IonText>)}
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                        :
                                        <IonRow>
                                            <IonCol sizeMd="12" sizeLg="12" sizeSm="12" sizeXs="12" sizeXl="12">
                                                <IonRow>
                                                    <IonCol sizeMd="12" sizeSm="12" sizeXs="12" sizeXl="12">
                                                        <CustomInput disabled label={"First Name"} {...register("FirstName", { required: true })} onIonChange={() => { clearErrors("FirstName"); }}
                                                            placeholder="Ex:John" />
                                                        {errors.FirstName && (<IonText color='danger' className="error-padding">Please enter First Name</IonText>)}
                                                    </IonCol>
                                                    <IonCol sizeMd="12" sizeSm="12" sizeXs="12" sizeXl="12">
                                                        <CustomInput disabled label={"Last Name"} {...register("LastName", { required: true })} onIonChange={() => { clearErrors("LastName"); }}
                                                            placeholder="Ex:Doe" />
                                                        {errors.LastName && (<IonText color='danger' className="error-padding">Please enter Last Name</IonText>)}
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                    }
                                    <IonRow>
                                        {isAddMode ?
                                            <IonCol sizeMd="12" sizeSm="12" sizeXs="12" sizeXl="12">
                                                <CustomDropdown disabled label={"Role"} data={getRole}
                                                    {...register("RoleId", { required: true })} />
                                                {errors.RoleId && (<IonText color='danger' className="error-padding">Please select Role</IonText>
                                                )}
                                            </IonCol> :
                                            <IonCol sizeMd="12" sizeSm="12" sizeXs="12" sizeXl="12">
                                                <CustomDropdown disabled label={"Role"} data={getRole}
                                                    value={user?.RoleId} {...register("RoleId", { required: true })} />
                                                {errors.RoleId && (<IonText color='danger' className="error-padding">Please select Role</IonText>
                                                )}
                                            </IonCol>}
                                        <IonCol sizeMd="12" sizeSm="12" sizeXs="12" sizeXl="12">
                                            <CustomInput disabled label={"Mobile Number"} type='number' onKeyDown={onKeyDown}  {...register("UserLogin.UserName",
                                                { required: true, minLength: 10, maxLength: 10 })} onIonChange={() => { clearErrors("UserLogin.UserName"); }} placeholder="+91-1234567890" />
                                            {errors.UserLogin?.UserName && errors.UserLogin.UserName.type === "required" && (<IonText color='danger' className="error-padding">Please enter Mobile Number</IonText>)}
                                            {errors.UserLogin?.UserName && errors.UserLogin.UserName.type === "minLength" && (<IonText color='danger' className="error-padding">Please enter valid Mobile Number</IonText>)}
                                            {errors.UserLogin?.UserName && errors.UserLogin.UserName.type === "maxLength" && (<IonText color='danger' className="error-padding">Please enter valid Mobile Number</IonText>)}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
                                            <CustomInput disabled label={"Email"} {...register("Email", { required: true, pattern: pattern })} onIonChange={() => { clearErrors("Email"); }}
                                                placeholder="Ex:JohnDoe@example.com" type="email" />
                                            {errors.Email && errors.Email.type === "required" && (<IonText color='danger' className="error-padding"> Please enter Email Id</IonText>)}
                                            {errors.Email && errors.Email.type === "pattern" && (<IonText color='danger' className="error-padding"> Please enter valid Email Id</IonText>)}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
                                            <CustomInput disabled label={"Address"} {...register("Address", { required: true })} onIonChange={() => { clearErrors("Address"); }} autoComplete="off" />
                                            {errors.Address && <IonText color='danger' className="error-padding">Please enter Address</IonText>}
                                        </IonCol>
                                    </IonRow>
                                    {isAddMode ?
                                        <IonRow>
                                            <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                                <CustomDropdown disabled label={"State"} data={getState}
                                                    {...register("StateId", { required: true })} />
                                                {errors.StateId && <IonText color='danger' className="error-padding">Please select State</IonText>}
                                            </IonCol>
                                            <IonCol sizeLg="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                                <CustomAutoComplete disabled label={"ZipCode"} defaultShow={false} customValue={user?.LocationId} getId={(e: any) => { clearErrors("LocationId"); getPinLocationCreate(e) }}
                                                    data={dofyGeoList} {...register("LocationId", { required: true })} />
                                                {errors.LocationId && <IonText color='danger' className="error-padding"> Please select Zipcode</IonText>}
                                                {(!errors.LocationId && !pinLocationErr) && <IonText color='danger'>Please select valid Pincode </IonText>}
                                            </IonCol>
                                        </IonRow> :
                                        <IonRow>
                                            <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                                <CustomDropdown disabled label={"State"} data={getState}
                                                    value={user?.StateId} {...register("StateId", { required: true })} />
                                                {errors.StateId && <IonText color='danger' className="error-padding">Please select State</IonText>}
                                            </IonCol>
                                            <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                                <CustomAutoComplete disabled label={"ZipCode"} defaultShow={false} customValue={locationId} getId={(e: any) => { clearErrors("LocationId"); getPinLocationUpdate(e) }}
                                                    data={dofyGeoList} {...register("LocationId", { required: true })} />
                                                {errors.LocationId && <IonText color='danger' className="error-padding"> Please select Zipcode</IonText>}
                                                {(!errors.LocationId && !pinLocationErr) && <IonText color='danger'>Please select valid Pincode </IonText>}
                                            </IonCol>
                                        </IonRow>}
                                    <IonRow className="ion-margin-top ion-margin-bottom">
                                        <IonCol sizeXl="12" sizeSm="12" sizeMd="12" sizeXs="12" sizeLg="12" className="ion-text-center">
                                            <IonButton color="white" className="bg-danger" size="small" type="button" onClick={() => Cancel()}> Cancel</IonButton>
                                        </IonCol>
                                    </IonRow>
                                </form>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent >
        </IonPage >
    );
}

export default View;