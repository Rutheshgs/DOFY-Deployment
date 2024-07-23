import { useEffect, useState } from 'react';
import { IonRow, IonCol, IonText, IonCardContent, IonInput } from '@ionic/react';

import { useForm, SubmitHandler } from "react-hook-form";

import { IAddressModel } from '../../../models/Address.Model';
import MasterServices from '../../../services/Master.Services';
import UserAddressServices from '../../../services/UserAddress.Services';

import { addressPageChange } from '../../../features/reducers/address/AddressPageChange.Reducers';
import { useTypedDispatch } from '../../../features/reduxhooks/ReduxHooks';

import { getLocalStorage, getUserLanguage, onKeyDown } from '../../helper/Helper';
import { HelperConstant } from '../../helper/HelperConstant';
import { InputParamChange } from '../../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../../features/actiontypes/Input.ActionTypes';

import { Autocomplete, Button, TextField, createFilterOptions } from '@mui/material';
import { CustomMaterialDropDown } from '../../shared/CustomMaterialDropDown';
import { unique } from 'underscore';
import Language from '../form/AddressFormLanguage.json';


type Props = {
    defaultValues: IAddressModel,
    isEdit: boolean,
    isAddress: boolean,
    pageFrom?: "ScheduleAddress" | "other"
    setDefaultShow?: any,
    setChangesInAddress?: any
}

function AddressFormIN({ defaultValues, isEdit, pageFrom, setDefaultShow, setChangesInAddress }: Props) {

    let dataLocalization = Language[getUserLanguage()];
    let dispatch = useTypedDispatch();

    // let locationId = localStorage.getItem("userLocationId");
    let URLParamSell = window.location.pathname.includes('schedule');
    let URLParamRepair = window.location.pathname.includes("Repairschedule");

    // const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<IAddressModel>({
        defaultValues: (defaultValues?.Id && defaultValues?.Id > 0) ? { ...defaultValues } : {
            Name: getLocalStorage().FirstName,
            MobilePhone: getLocalStorage().MobileNumber,
            // LocationId: locationId
        }
    });

    let defaultStateId = localStorage.getItem("stateId");

    const [isDefault, setIsDefault] = useState<boolean>(false);
    const [addressData, setAddressData] = useState({ cityId: 0, pincode: "", pinLocation: "" });
    const [dofyGeoList, setDofyGeoList] = useState<Array<any>>([]);
    const [addressType, setAddressType] = useState<Array<any>>([]);
    const [stateList, setStateList] = useState<Array<any>>([]);
    const [pinLocationErr, setPinLocationErr] = useState(true);
    const [selectedLocationId, setSelectedLocationId] = useState<number>(0);
    const [filterLocation, setFilterLocationList] = useState<Array<any>>([]);
    const [saveDisableBtn, setSaveDisableBtn] = useState(false);

    const defaultProps = {
        options: filterLocation,
        getOptionLabel: (option: any) => option.Code,
    };

    const filterOptions = createFilterOptions({
        stringify: (option: any) => option.Name + option.Code,
    });


    const onCreateAddress: SubmitHandler<IAddressModel> = (data) => {
        setSaveDisableBtn(true);
        let locId = dofyGeoList.find(x => (x.Name === data.LocationPin || x.Code === data.LocationPin || x.Id === data.LocationId));
        data.IsDefault = isDefault;
        data.PersonId = getLocalStorage()?.PersonId;
        data.LocationPin = data.LocationId;
        data.CountryId = 1;
        data.PinCode = addressData.pincode == "" ? locId?.Code : addressData.pincode;
        data.LocationId = selectedLocationId > 0 ? selectedLocationId : locId?.Id;
        data.LocationPin = addressData.pincode;

        if (isEdit) {
            data.LocationPin = locId?.Code;
        }

        if (pinLocationErr) {
            isEdit ?
                UserAddressServices.edit(data).then(res => {
                    if (res.status === 200) {
                        if (URLParamSell) {
                            dispatch(InputParamChange({ payload: res.data, type: ActionType.ADDRESS_ID }));
                            setChangesInAddress(true);
                            setDefaultShow(false);
                            setSaveDisableBtn(false);
                            return dispatch(addressPageChange("timedateslot"));
                        }
                        window.location.reload();
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
                            setSaveDisableBtn(false);
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
                // if (locationId) {
                //     getDefaultPinLocation(parseInt(locationId), res.data);
                // }
                if (defaultStateId || defaultValues?.StateId > 0) {
                    initialSelectedCityHandler(res.data, defaultValues?.StateId > 0 ? defaultValues.StateId : defaultStateId);
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

    function handleKeyDown(e: any) {
        const { key } = e;
        if (key === 'Enter') getPinLocation(e.target.value);
    }

    const getPinLocation = (Id: any) => {
        if (Id) {
            let data = dofyGeoList.find(it => it.Id === Id || it.Code == Id);
            if (data) {
                setValue("LocationPin", data.Code);
                setAddressData({ pinLocation: data.Name, cityId: data.Id, pincode: data.Code });
                setPinLocationErr(true);
            }
            else {
                setPinLocationErr(false);
            }
        }
    }

    const getDefaultPinLocation = (Id: any, GeoData: Array<any>) => {
        let data = GeoData.find(it => it.Id === Id);
        if (data) {
            setValue("LocationPin", data.Name);
            setPinLocationErr(true);
            setAddressData({ pinLocation: data.Name, cityId: data.Id, pincode: data.Code });
        }
        else {
            setPinLocationErr(false);
        }
    }

    const GetAllStateList = (serviceTypeId: number) => {
        MasterServices.GetAllStateList(serviceTypeId).then(res => {
            if (res.status === 200) {
                setStateList(res.data);
            };
        }).catch(e => console.log(e));
    }

    const selectedCityHandler = (value: any) => {
        const validLocation = value ? dofyGeoList.filter(it => it.Parent1 === value) : dofyGeoList;
        // var uniqueOptions = unique(validLocation, "Name");
        setFilterLocationList(validLocation);
    }

    const initialSelectedCityHandler = (data: Array<any>, value: string) => {
        const validLocation = value ? data.filter(it => it.Parent1 === parseInt(value)) : data;
        // var uniqueOptions = unique(validLocation, "Name");
        setFilterLocationList(validLocation);

    }

    useEffect(() => {
        GetDofyGeoList(HelperConstant.serviceTypeId.SELL);
        getAddressType(HelperConstant.serviceTypeId.SELL);
        GetAllStateList(HelperConstant.serviceTypeId.SELL);
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
                            <IonInput className='address-form-inline' type="number" placeholder={dataLocalization.Mobile_Number} onKeyDown={onKeyDown} {...register("MobilePhone", { required: true, minLength: 10, maxLength: 10 })}
                                onIonChange={() => { clearErrors("MobilePhone"); }}></IonInput>
                            {errors.MobilePhone && errors.MobilePhone.type === "required" && (<IonText color='danger' className="error-padding">{dataLocalization.Mobile_Number1}</IonText>)}
                            {errors.MobilePhone && (errors.MobilePhone.type === "minLength" || errors.MobilePhone.type === "maxLength") && (<IonText color='danger' className="error-padding">{dataLocalization.valid_Mobile_Number}</IonText>)}
                        </IonCol>

                        <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols' >
                            <IonText >Alternate Mobile Number</IonText>
                            <IonInput className='address-form-inline' type="number" placeholder={dataLocalization.Alternate_Mobile_Number} onKeyDown={onKeyDown} {...register("WorkPhone", { required: false, minLength: 10, maxLength: 10 })}
                                onIonChange={() => { clearErrors("WorkPhone"); }} ></IonInput>
                            {errors.WorkPhone && (errors.WorkPhone.type === "minLength" || errors.WorkPhone.type === "maxLength") && (<IonText color='danger' className="error-padding">{dataLocalization.valid_Mobile_Number}</IonText>)}
                        </IonCol>
                    </>

                    <IonCol sizeLg='12' sizeMd='12' sizeXs='12' className='address-form-cols'>
                        <IonText >LandMark</IonText>
                        <IonInput className='address-form-inline' placeholder={dataLocalization.Enter_LandMark} {...register("LandMark", { required: false })} ></IonInput>
                    </IonCol>

                    <IonCol sizeLg='4' sizeMd='6' sizeXs='12' className='address-card-dropdown address-form-cols'>
                        <CustomMaterialDropDown selectedValue={defaultValues?.AddressTypeId} label={dataLocalization.Address_Type} data={addressType} {...register("AddressTypeId", { required: true })} onIonChange={() => { clearErrors("AddressTypeId"); }} />
                        {errors.AddressTypeId && <IonText color='danger'>{dataLocalization.Address_Type} </IonText>}
                    </IonCol>
                    <IonCol sizeLg='4' sizeMd='6' sizeXs='12' className='address-card-dropdown address-form-cols'>
                        <CustomMaterialDropDown selectedValue={defaultValues?.StateId} label={"State*"} data={stateList} {...register("StateId", { required: true })} onIonChange={(e: any) => { selectedCityHandler(e); clearErrors("CityId"); }} />
                        {errors.StateId && <IonText color='danger'>{dataLocalization.State}</IonText>}
                    </IonCol>

                    {(dofyGeoList.length > 0) ?
                        <IonCol sizeLg='4' sizeMd='12' sizeXs='12' className='address-form-cols' >
                            <Autocomplete
                                onKeyDown={handleKeyDown}
                                defaultValue={dofyGeoList.find(x => (x.Id == defaultValues?.LocationId))}
                                {...defaultProps}
                                isOptionEqualToValue={(option, value) => option?.Code === value?.Code || option?.Name === value?.Name}
                                filterOptions={filterOptions}
                                style={{ width: '100%' }}
                                disablePortal
                                onChange={(e, v) => { getPinLocation(v?.Id) }}
                                id="combo-box-demo"
                                clearIcon={null}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField type="text" {...params}
                                    label={dataLocalization.Pincode}{...register("LocationId", { required: true })}
                                />}
                            />
                            {errors.LocationId && <IonText color='danger'>{dataLocalization.Pincodes}</IonText>}
                        </IonCol> : <></>}
                </IonRow>
            </IonCardContent>
            <IonRow className='ion-margin-top address-edit-btn'>
                <IonCol className='ion-text-center'>
                    {pageFrom === "ScheduleAddress" && <Button className='ad_back-btn' variant="contained" onClick={() => setDefaultShow(false)} type="button">{dataLocalization.Back}</Button>}
                    {URLParamSell ?
                        <Button disabled={saveDisableBtn} variant="contained" type="submit">{dataLocalization.Continue}</Button>
                        :
                        <Button disabled={saveDisableBtn} variant="contained" type="submit">{isEdit ? dataLocalization.SaveChanges : dataLocalization.Save}</Button>
                    }
                </IonCol>
            </IonRow>
        </form>
    )
}

export default AddressFormIN  