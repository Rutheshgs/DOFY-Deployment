import { IonButton, IonCol, IonRow, IonText, IonCard, IonCardHeader, IonTitle, IonImg, IonIcon, IonInput, IonLoading } from "@ionic/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { CustomImg } from "../../components/shared/CustomImage";
import dofylogo from '../../assets/images/myaccount.png'
import dofylogos from '../../assets/images/myaccounts.png'
import GetDofyGeoListServices from "../../services/GetDofyGeoList.Services";
import MasterServices from "../../services/Master.Services";
import PersonalDetailsServices from "../../services/PersonalDetails.Services";
import { IUserModel } from "../../models/User.Model";
import { IDofyGeo } from "../../models/Person.Model";

import { isIn, isMobile, onKeyDown, restrictInput } from "../../components/helper/Helper";
import { HelperConstant } from "../../components/helper/HelperConstant";
import { isRider } from "../../components/helper/TokenHelper";

import "./CreateEdits.css";
import Profile from "../../assets/images/profile.png";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { cloudUpload, trashBin } from "ionicons/icons";
import { CustomMaterialDropDown } from "../../components/shared/CustomMaterialDropDown";
import { unique } from "underscore";

function UAECreateEdit() {

    const [user, setUser] = useState<IUserModel>({} as IUserModel);
    const [dofyGeoList, setDofyGeoList] = useState<Array<IDofyGeo>>([]);
    const [getState, setGetState] = useState<any>([]);
    const { id } = useParams<{ id: any }>();
    const [addressData, setAddressData] = useState({ cityId: 0, pincode: "", pinLocation: "" });
    const [getRole, setGetRole] = useState<any>([]);

    const [ProfileImageFile, setProfileImageFile] = useState<any>();
    const [profileImage, setProfileImage] = useState<any>();
    const [showEdit, setShowEdit] = useState(true);
    const [District, setDistrict] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterLocation, setFilterLocationList] = useState<Array<any>>([]);
    const [groupedLocation, setGroupedLocationList] = useState<Array<any>>([]);


    const isAddMode = !id;

    const { register, handleSubmit, reset, formState: { errors }, clearErrors, setValue, watch } = useForm<IUserModel>({ reValidateMode: "onChange" });
    const pattern = HelperConstant.emailPattern.pattern;
    const riderlogin: boolean = isRider() ?? false;

    const onSubmit: SubmitHandler<IUserModel> = (data) => {
        return isAddMode ? createUser(data) : updateUser(data);
    };

    function createUser(data: IUserModel) {
        data.Prefix = "";
        data.Suffix = "";
        data.UploadImageName = "";
        data.UploadImagePath = "";
        data.LocationId = data.CityId;
        data.Mobile = data.SecondaryMobile;

        let formData = new FormData();
        formData.append("FirstName", data.FirstName);
        formData.append("LastName", data.LastName);
        formData.append("UserRoleName", data.UserRoleName);
        formData.append("UserLogin.UserName", data.SecondaryMobile);
        formData.append("SecondaryMobile", data.SecondaryMobile);
        formData.append("Email", data.Email);
        formData.append("Address", data.Address);
        formData.append("StateId", data.StateId);
        formData.append("PinCode", addressData.pincode);
        formData.append("LocationId", data.LocationId);
        formData.append("CityId", data.LocationId);
        formData.append("RoleId", data.RoleId);
        formData.append("Mobile", data.Mobile);
        formData.append("UserLogin.PassWord", data.UserLogin.PassWord);
        formData.append("UserLogin.ConfirmPassword", data.UserLogin.ConfirmPassword);
        formData.append("UserLogin.Salt", data.UserLogin.Salt);
        formData.append("UserLogin.IVKey", data.UserLogin.IVKey);

        PersonalDetailsServices.CreateUser(formData).then((res) => {
            if (res.status === 200) {
                if (res.data === "Already registerd user") {
                    alert("User already exists")
                }
                else {
                    alert("Created success fully")
                    window.location.href = "/UserDashbord";
                }
            }
        }).catch(e => {
            console.log(e);
        });
    }


    function updateUser(users: IUserModel) {
        users.Prefix = "";
        users.Suffix = "";
        users.UploadImageName = "";
        users.UploadImagePath = "";
        users.LocationId = users.CityId;
        users.UserLogin.UserName = users.SecondaryMobile;
        users.Mobile = users.SecondaryMobile;
        users.UserLogin.Id = users.LoginId;

        let formData = new FormData();
        formData.append("FirstName", users.FirstName);
        formData.append("LastName", users.LastName);
        formData.append("Mobile", users.Mobile);
        formData.append("UserLogin.UserName", users.SecondaryMobile);
        formData.append("UserRoleName", users.UserRoleName);
        formData.append("LoginId", users.LoginId);
        formData.append("Id", users.Id);
        formData.append("UserRoleId", users.UserRoleId);
        formData.append("SecondaryMobile", users.Mobile);
        formData.append("SecondaryMobile", users.SecondaryMobile);
        formData.append("Email", users.Email);
        formData.append("Address", users.Address);
        formData.append("StateId", users.StateId);
        formData.append("PinCode", users.PinCode);
        formData.append("CityId", users.CityId);
        formData.append("LocationId", users.LocationId ? users.LocationId : user.LocationId);
        formData.append("RoleId", users.RoleId);
        formData.append("UserLogin.Id", users.UserLogin.Id);
        formData.append("UserLogin.ConfirmPassword", users.UserLogin.ConfirmPassword);
        formData.append("UserLogin.IVKey", users.UserLogin.IVKey);
        formData.append("UserLogin.PassWord", users.UserLogin.PassWord);
        formData.append("UserLogin.Salt", users.UserLogin.Salt);
        formData.append("UploadFiles", ProfileImageFile);
        formData.append("UploadImageName", photostype.ProfileImage);

        PersonalDetailsServices.edit(formData).then((res) => {
            if (res.status === 200) {
                alert("edited successfully")
                window.location.href = "/UserDashbord";
            }

            else {
                alert("not okay")
            }
        });
    }

    const Cancel = () => {
        if (!riderlogin) {
            window.location.href = "/UserDashbord";
        }
        else {
            window.location.href = "/UserDashbord";
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

    const getCityList = () => {
        MasterServices.GetDistrictList(HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setDistrict(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const [photostype] = useState({
        ProfileImage: "ProfileImage.png",
    });

    const takePicture = async (photostypes: string) => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera
        });
        const imageFile = dataURLtoFile(image.dataUrl, photostypes);
        const UploadFiles: any = image.dataUrl;
        setProfileImage(UploadFiles);
        setProfileImageFile(imageFile);
    }

    const dataURLtoFile = (dataurl: any, filename: string) => {
        let arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const deleteProfileImage = () => {
        setProfileImage('');
    }

    const selectedCityHandler = (value: any) => {
        const validLocation = value ? dofyGeoList.filter(it => it.Parent1 === value) : dofyGeoList;
        setGroupedLocationList(validLocation);
        var uniqueOptions = unique(validLocation, "Name");
        setFilterLocationList(uniqueOptions);
        setIsLoading(false);

    }

    const initialCityHandler = (value: any, data: Array<any>) => {
        const validLocation = value ? data.filter(it => it.Parent1 === value) : data;
        setGroupedLocationList(validLocation);
        var uniqueOptions = unique(validLocation, "Name");
        setFilterLocationList(uniqueOptions);
        setIsLoading(false);
    }

    useEffect(() => {
        const GetUserDetail = (id: number) => {
            PersonalDetailsServices.getUser(id).then(res => {
                if (res.status === 200) {
                    setUser(res.data);
                    GetDofyGeoList(HelperConstant.serviceTypeId.SELL, res.data.LocationId, res.data);
                    reset(res.data);
                    setValue("UserLogin.ConfirmPassword", res.data.UserLogin.PassWord);
                }
            }).catch(e => {
                console.log(e);
            });
        }
        getCityList();

        const GetDofyGeoList = (serviceTypeId: number, LocationId?: any, response?: any) => {
            GetDofyGeoListServices.GetAllDofyGeo(serviceTypeId).then(res => {
                if (res.status === 200) {
                    setDofyGeoList(res.data);
                    initialCityHandler(response?.StateId, res.data);
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
                setProfileImage(base64ImageString);
                setShowEdit(false);
            });
        }
        GetUserProfile();
    }, [id, reset, setValue, isAddMode]);

    return (
        <>
            {isLoading ?
                <IonLoading message="Loading..." spinner="circles" isOpen={isLoading} />
                :
                <><IonRow className="account-header">
                    {isMobile() ?
                        <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
                            <CustomImg className="account-logo" src={dofylogo} />
                        </IonCol> :
                        <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
                            <CustomImg className="account-logo" src={dofylogos} />
                        </IonCol>}

                </IonRow><IonRow>
                        <IonCol sizeMd="12" offsetMd="0" sizeXs="12" offsetXs="0" sizeLg="7" offsetLg="5" sizeSm="11" sizeXl="5" offsetXl="6">
                            <IonCard className="account-cardform">
                                <IonCardHeader className="ion-text-center">
                                    <IonTitle className="account-cardheader">{isAddMode ? 'Create User' : 'Modify User'}</IonTitle>
                                </IonCardHeader>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <IonRow>
                                        <IonCol sizeMd="12" sizeLg="12" sizeSm="11" sizeXs="12" sizeXl="6" className="cs_upload-image">
                                            {profileImage ?
                                                <>
                                                    <IonImg src={profileImage} alt="scsc"></IonImg>
                                                    {showEdit ?
                                                        <IonButton onClick={() => deleteProfileImage()} className="profile_delete" color="danger">
                                                            <IonIcon className="delete_icon" size="medium" icon={trashBin} />
                                                        </IonButton> :
                                                        null}
                                                </>
                                                :
                                                <>
                                                    <IonImg className="cs_img" src={Profile}></IonImg>
                                                    <IonButton onClick={() => takePicture(photostype.ProfileImage)} className="profile_delete" color="primary">
                                                        <IonIcon className="delete_icon" size="medium" icon={cloudUpload} />
                                                    </IonButton>
                                                </>}
                                        </IonCol>
                                    </IonRow>

                                    <IonRow>
                                        <IonCol className="ce-margin" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <IonInput className="uae_input" placeholder="FirstName" {...register("FirstName", { required: true })} onIonChange={() => { clearErrors("FirstName"); }}></IonInput>
                                            {errors.FirstName && <IonText color='danger' className="error-padding">Enter First Name </IonText>}
                                        </IonCol>
                                        <IonCol sizeXl="1" sizeLg='1' sizeMd='1'></IonCol>
                                        <IonCol className="ce-margin" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <IonInput className="uae_input" placeholder="Last Name" {...register("LastName", { required: true })} ></IonInput>
                                            {errors.LastName && <IonText color='danger' className="error-padding">Enter Last Name </IonText>}
                                        </IonCol>
                                    </IonRow>

                                    <IonRow>
                                        <IonCol className="ce-margin uae_dd-input" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <CustomMaterialDropDown data={getRole} selectedValue={user?.RoleId} label="Select Role" {...register("RoleId", { required: true })} onIonChange={() => { clearErrors("RoleId"); }} />
                                            {errors.RoleId && <IonText color='danger'>Please select Role</IonText>}
                                        </IonCol>
                                        <IonCol sizeXl="1" sizeLg='1' sizeMd='1'></IonCol>

                                        <IonCol className="ce-margin" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <IonInput className="uae_input" placeholder="Email" {...register("Email", { required: true, pattern: pattern })} type="email" onIonChange={() => { clearErrors("Email"); }}></IonInput>
                                            {errors.Email && <IonText color='danger' className="error-padding">Enter Email </IonText>}

                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol className="ce-margin" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <IonInput className="uae_input" placeholder="Address" {...register("Address", { required: true })} onIonChange={() => { clearErrors("Address"); }}></IonInput>
                                            {errors.Address && <IonText color='danger' className="error-padding">Enter Address </IonText>}
                                        </IonCol>
                                        <IonCol sizeXl="1" sizeLg='1' sizeMd='1'></IonCol>
                                        <IonCol className="ce-margin uae_dd-input" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <CustomMaterialDropDown data={getState} selectedValue={user.StateId} label="Select City" {...register("StateId", { required: true })} onIonChange={(e: any) => { clearErrors("StateId");; selectedCityHandler(e) }} />
                                            {errors.StateId && <IonText color='danger' className="error-padding">Please select city</IonText>}
                                        </IonCol>

                                    </IonRow>
                                    <IonRow>
                                        <IonCol className="ce-margin uae_dd-input" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <CustomMaterialDropDown label="Select Area/District" data={filterLocation} selectedValue={user.LocationId} {...register("CityId", { required: true })} onIonChange={() => { clearErrors("CityId") }} />
                                            {errors.CityId && <IonText color='danger' className="error-padding">Please select Area/District</IonText>}
                                        </IonCol>
                                        <IonCol sizeXl="1" sizeLg='1' sizeMd='1'></IonCol>

                                        {/* <IonCol className="ce-margin" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <IonInput className="uae_input" placeholder="+91-1234567890" type='number' onKeyDown={onKeyDown} {...register("SecondaryMobile",
                                                { required: true, minLength: 10, maxLength: 10 })} onIonChange={() => { clearErrors("SecondaryMobile"); }} />
                                            {errors.SecondaryMobile?.type && errors.SecondaryMobile?.type === "required" && (<IonText color='danger' className="error-padding">Please enter Alternate Number</IonText>)}
                                            {errors.SecondaryMobile?.type && errors.SecondaryMobile?.type === "minLength" && (<IonText color='danger' className="error-padding">Please enter valid Mobile Number</IonText>)}
                                            {errors.SecondaryMobile?.type && errors.SecondaryMobile?.type === "maxLength" && (<IonText color='danger' className="error-padding">Please enter valid Mobile Number</IonText>)}
                                        </IonCol> */}
                                        <IonCol className="ce-margin" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <IonInput className="uae_input" placeholder="+971-1234567890" type='number' onKeyDown={onKeyDown} {...register("SecondaryMobile",
                                                { required: true })} onIonChange={(e: any) => { clearErrors("SecondaryMobile"); restrictInput(e, 10) }} />
                                            {errors.SecondaryMobile?.type && errors.SecondaryMobile?.type === "required" && (<IonText color='danger' className="error-padding">Please enter Number</IonText>)}
                                            {errors.SecondaryMobile?.type && errors.SecondaryMobile?.type === "minLength" && (<IonText color='danger' className="error-padding">Please enter valid Mobile Number</IonText>)}
                                            {errors.SecondaryMobile?.type && errors.SecondaryMobile?.type === "maxLength" && (<IonText color='danger' className="error-padding">Please enter valid Mobile Number</IonText>)}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol className="ce-margin" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <IonInput className="uae_input" type="password" {...register("UserLogin.PassWord", { required: true })} onIonChange={() => { clearErrors("UserLogin.PassWord"); }}
                                                placeholder="Password" />
                                            {errors.UserLogin?.PassWord && errors.UserLogin.PassWord.type === "required" && (<IonText color='danger' className="error-padding"> Please enter Password</IonText>)}
                                        </IonCol>
                                        <IonCol sizeXl="1" sizeLg='1' sizeMd='1'></IonCol>

                                        <IonCol className="ce-margin" sizeXl="5" sizeLg='5' sizeMd='5' sizeSm="11" sizeXs='11'>
                                            <IonInput className="uae_input" type="password" {...register("UserLogin.ConfirmPassword", {
                                                required: true,
                                                validate: (val: string) => {
                                                    if (watch('UserLogin.PassWord') != val) {
                                                        return "Your passwords do not match";
                                                    }
                                                },
                                            })} onIonChange={() => { clearErrors("UserLogin.ConfirmPassword"); }}
                                                placeholder="ConfirmPassword" />
                                            {errors.UserLogin?.ConfirmPassword && errors.UserLogin.ConfirmPassword.type === "required" && (<IonText color='danger' className="error-padding"> Please enter ConfirmPassword</IonText>)}
                                            {(errors.UserLogin?.ConfirmPassword && errors.UserLogin.ConfirmPassword.type === "validate") && <IonText color='danger'>Your password do not match with Your Confirm PassWord</IonText>}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-margin-top ion-margin-bottom">
                                        <IonCol sizeXl="12" sizeSm="11" sizeMd="12" sizeXs="12" sizeLg="12" className=" ion-text-center">
                                            <IonButton color="white" className="bg-danger" size="small" type="reset" onClick={() => Cancel()}> Cancel</IonButton>
                                            <IonButton className="bg-success" color="white" size="small" type="submit">Save</IonButton>
                                        </IonCol>
                                    </IonRow>
                                </form>
                            </IonCard>
                        </IonCol>
                    </IonRow></>

            }
        </>
    );
}

export default UAECreateEdit;