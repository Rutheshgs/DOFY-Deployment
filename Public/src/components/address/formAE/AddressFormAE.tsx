import { useEffect, useState } from 'react';
import { IonRow, IonCol, IonText, IonCardContent, IonInput } from '@ionic/react';

import { useForm, SubmitHandler } from "react-hook-form";

import { IAddressModel } from '../../../models/Address.Model';
import MasterServices from '../../../services/Master.Services';
import UserAddressServices from '../../../services/UserAddress.Services';

import { addressPageChange } from '../../../features/reducers/address/AddressPageChange.Reducers';
import { useTypedDispatch } from '../../../features/reduxhooks/ReduxHooks';

import { getLocalStorage, getUserLanguage, onKeyDown, restrictInput } from '../../helper/Helper';
import { HelperConstant } from '../../helper/HelperConstant';
import { InputParamChange } from '../../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../../features/actiontypes/Input.ActionTypes';

import Language from "../form/AddressFormLanguage.json";
import { Button } from '@mui/material';
import { CustomMaterialDropDown } from '../../shared/CustomMaterialDropDown';
import { unique } from 'underscore';

type Props = {
    defaultValues: IAddressModel,
    isEdit: boolean,
    isAddress: boolean,
    pageFrom?: "ScheduleAddress" | "other"
    setDefaultShow?: any,
    setChangesInAddress?: any
}

function AddressFormAE({ defaultValues, isEdit, pageFrom, setDefaultShow, setChangesInAddress }: Props) {

    let dataLocalization = Language[getUserLanguage()];
    let dispatch = useTypedDispatch();

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<IAddressModel>({
        defaultValues: (defaultValues?.Id && defaultValues?.Id > 0) ? { ...defaultValues } : {
            Name: getLocalStorage().FirstName,
            MobilePhone: getLocalStorage().MobileNumber
        }
    });

    let URLParamSell = window.location.pathname.includes('schedule');

    const [isDefault, setIsDefault] = useState<boolean>(false);
    const [dofyGeoList, setDofyGeoList] = useState<Array<any>>([]);
    const [addressType, setAddressType] = useState<Array<any>>([]);
    const [pinLocationErr, setPinLocationErr] = useState(true);
    const [District, setDistrict] = useState<Array<any>>([]);
    const [Village, setVillage] = useState<Array<any>>([]);
    const [selectedLocationId, setSelectedLocationId] = useState<number>(0);
    const [filterLocation, setFilterLocationList] = useState<Array<any>>([]);

    const onCreateAddress: SubmitHandler<IAddressModel> = (data) => {
        let loc = dofyGeoList.find(x => (x.Id === data.LocationId));
        data.IsDefault = isDefault;
        data.PersonId = getLocalStorage()?.PersonId;
        data.CityId = data.LocationId;
        data.PinCode = loc.Name;
        data.CountryId = 1;
        data.LocationPin = loc.Name;
        if (pinLocationErr) {
            isEdit ?
                UserAddressServices.edit(data).then(res => {
                    if (res.status === 200) {
                        if (URLParamSell) {
                            dispatch(InputParamChange({ payload: res.data, type: ActionType.ADDRESS_ID }));
                            setChangesInAddress(true);
                            setDefaultShow(false);
                            return dispatch(addressPageChange("timedateslot"));
                        }
                        window.location.href = `/${getUserLanguage()}/saved-address`;
                    }
                }).catch((e: string) => {
                    console.log(e);
                })
                :
                UserAddressServices.create(data).then((res) => {
                    if (res.status === 200) {
                        if (URLParamSell) {
                            dispatch(InputParamChange({ payload: res.data, type: ActionType.ADDRESS_ID }));
                            setChangesInAddress(true);
                            setDefaultShow(false);
                            return dispatch(addressPageChange("timedateslot"));
                        }
                        window.location.reload();
                    }
                }).catch((e: string) => {
                    console.log(e);
                });
        }
    }

    const GetDofyGeoList = (serviceTypeId: number) => {
        MasterServices.GetAllDofyGeo(serviceTypeId).then((res) => {
            if (res.status === 200) {
                setDofyGeoList(res.data);
                if (defaultValues.StateId) {
                    initialSelectedCityHandler(res.data, defaultValues?.StateId);
                }
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    const getAddressType = (serviceTypeId: number) => {
        MasterServices.GetAllAddressType(serviceTypeId).then((res: any) => {
            if (res.status === 200) {
                setAddressType(res.data);
            }
        }).catch((e: string) => {
            console.log(e);
        })
    }

    // const getDefaultPinLocation = (Id: any, GeoData: Array<any>) => {
    //     let data = GeoData.find(it => it.Id === Id);
    //     if (data) {
    //         setValue("LocationPin", data.Code);
    //         setPinLocationErr(true);
    //         setAddressData({ pinLocation: data.Name, cityId: data.Id, pincode: data.Code });
    //     }
    //     else {
    //         setPinLocationErr(false);
    //     }
    // }

    const getCityList = () => {
        MasterServices.GetCityList(HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setDistrict(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const selectedCityHandler = (value: any) => {
        const validLocation = value ? dofyGeoList.filter(it => it.Parent === value) : dofyGeoList;
        var uniqueOptions = unique(validLocation, "Name");
        setFilterLocationList(uniqueOptions);
    }

    const initialSelectedCityHandler = (data: Array<any>, value: string) => {
        if (getUserLanguage() === "in_en") {
            const validLocation = value ? data.filter(it => it.Parent1 === parseInt(value)) : data;
            var uniqueOptions = unique(validLocation, "Name");
            setFilterLocationList(uniqueOptions);
        }
        else {
            const validLocation = value ? data.filter(it => it.Parent === parseInt(value)) : data;
            var uniqueOptions = unique(validLocation, "Name");
            setFilterLocationList(uniqueOptions);
        }
    }

    // const getAreaList = (val: any) => {
    //     MasterServices.GetAreaList(HelperConstant.serviceTypeId.SELL, val).then(res => {
    //         if (res.status === 200) {
    //             setVillage(res.data);
    //             setDofyGeoList(res.data);
    //             setAddressData({ ...addressData, cityId: val, pincode: res.data?.find((x: any) => x.Id === defaultValues.LocationId)?.Code });
    //         }
    //     }).catch(e => {
    //         console.log(e);
    //     });
    // }

    useEffect(() => {
        // if (defaultValues?.CityId > 0) {
        //     getAreaList(defaultValues?.CityId);
        // }
        GetDofyGeoList(HelperConstant.serviceTypeId.SELL);
        getAddressType(HelperConstant.serviceTypeId.SELL);
        getCityList();
    }, []);

    return (
        <form onSubmit={handleSubmit(onCreateAddress)} className='address-form'>
            <IonCardContent>
                <IonRow>
                    <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols'>
                        <IonText>{dataLocalization.Name}</IonText>
                        <IonInput className='address-form-inline' placeholder="Enter the name" {...register("Name", { required: true })} onIonChange={() => { clearErrors("Name"); }} type="text"></IonInput>
                        {errors.Name && <IonText color='danger'>{dataLocalization.Name1}</IonText>}
                    </IonCol>
                    <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols'>
                        <IonText >{dataLocalization.Address1}</IonText>
                        <IonInput className='address-form-inline' placeholder={dataLocalization.Enter_address1}  {...register("Name", { required: true })} {...register("Address", { required: true })} onIonChange={() => { clearErrors("Address"); }}></IonInput>
                        {errors.Address && <IonText color='danger'>{dataLocalization.Address} </IonText>}
                    </IonCol>
                    <>
                        <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols'>
                            <IonText >{dataLocalization.Mobile_Number}</IonText>
                            <IonInput className='address-form-inline' placeholder={dataLocalization.Mobile_Number} type="number" onKeyDown={onKeyDown} {...register("MobilePhone", { required: true })}
                                onIonChange={(e: any) => { clearErrors("MobilePhone"); restrictInput(e, 10) }}></IonInput>
                            {errors.MobilePhone && errors.MobilePhone.type === "required" && (<IonText color='danger' className="error-padding">{dataLocalization.Mobile_Number1}</IonText>)}
                            {errors.MobilePhone && (errors.MobilePhone.type === "minLength" || errors.MobilePhone.type === "maxLength") && (<IonText color='danger' className="error-padding">{dataLocalization.valid_Mobile_Number}</IonText>)}
                        </IonCol>

                        <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols'>
                            <IonText >{dataLocalization.Alternate_Mobile_Number}</IonText>
                            <IonInput className='address-form-inline' type="number" placeholder={dataLocalization.Alternate_Mobile_Number} onKeyDown={onKeyDown} {...register("WorkPhone", { required: false })}
                                onIonChange={(e: any) => { clearErrors("WorkPhone"); restrictInput(e, 10); }} ></IonInput>
                            {errors.WorkPhone && (errors.WorkPhone.type === "minLength" || errors.WorkPhone.type === "maxLength") && (<IonText color='danger' className="error-padding">{dataLocalization.valid_Mobile_Number}</IonText>)}
                        </IonCol>
                    </>
                    <IonCol sizeLg='12' sizeMd='12' sizeXs='12' className='address-form-cols'>
                        <IonText >{dataLocalization.LandMark}</IonText>
                        <IonInput className='address-form-inline' placeholder={dataLocalization.Enter_LandMark} {...register("LandMark", { required: false })} ></IonInput>
                    </IonCol>
                    <IonCol sizeLg='12' sizeMd='12' sizeXs='12' className='address-form-cols'>
                        <IonText >{dataLocalization.ApartmentNumber}</IonText>
                        <IonInput className='address-form-inline' placeholder={dataLocalization?.ApartmentNumber} {...register("ApartmentNumber", { required: false })}></IonInput>
                    </IonCol>
                    <IonCol sizeLg='4' sizeMd='6' sizeXs='12' className='address-card-dropdown address-form-cols'>
                        <CustomMaterialDropDown selectedValue={defaultValues?.AddressTypeId} label={dataLocalization.Address_Type} data={addressType} {...register("AddressTypeId", { required: true })} onIonChange={() => { clearErrors("AddressTypeId"); }} />
                        {errors.AddressTypeId && <IonText color='danger'>{dataLocalization.Address_Type} </IonText>}
                    </IonCol>
                    <IonCol sizeLg='4' sizeMd='6' sizeXs='12' className='address-card-dropdown address-form-cols'>
                        <CustomMaterialDropDown selectedValue={defaultValues?.StateId} label={"City*"} data={District} {...register("StateId", { required: true })} onIonChange={selectedCityHandler} />
                        {errors.StateId && <IonText color='danger'>{dataLocalization.Please_select_City}</IonText>}
                    </IonCol>
                    <IonCol sizeLg='4' sizeMd='6' sizeXs='12' className='address-form-cols' >
                        <CustomMaterialDropDown selectedValue={defaultValues?.LocationId} label={dataLocalization.Pincode} data={filterLocation} {...register("LocationId", { required: true })} onIonChange={(e: any) => { setSelectedLocationId(e) }} />
                        {errors.LocationId && <IonText color='danger'>{dataLocalization.Pincodes}</IonText>}
                    </IonCol>
                </IonRow>
            </IonCardContent>
            <IonRow className='ion-margin-top address-edit-btn'>
                <IonCol className='ion-text-center'>
                    {pageFrom === "ScheduleAddress" && <Button className='ad_back-btn' variant="contained" onClick={() => setDefaultShow(false)} type="button">{dataLocalization.Back}</Button>}
                    {URLParamSell ?
                        <Button variant="contained" type="submit">{dataLocalization.Continue}</Button>
                        :
                        <Button variant="contained" type="submit">{isEdit ? dataLocalization.SaveChanges : dataLocalization.Save}</Button>
                    }
                </IonCol>
            </IonRow>
        </form>
    )
}

export default AddressFormAE