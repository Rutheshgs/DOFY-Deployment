import { useEffect, useState } from 'react';
import { IAddressModel } from '@/models/Address.Model';
import MasterServices from '@/services/Master.Services';
import UserAddressServices from '@/services/UserAddress.Services';
import { addressPageChange } from '@/features/reducers/address/AddressPageChange.Reducers';
import { useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { findedLocation, getLocalStorage, getUserLanguage, onKeyDown } from '../../helper/Helper';
import { HelperConstant } from '../../helper/HelperConstant';
import { InputParamChange } from '@/features/reducers/shared/InputParams.Reducers';
import { ActionType } from '@/features/actiontypes/Input.ActionTypes';
import { Autocomplete, Button, TextField, createFilterOptions } from '@mui/material';
import { CustomMaterialDropDown } from '../../shared/CustomMaterialDropDown';
import Language from '../form/AddressFormLanguage.json';
import { useForm, SubmitHandler } from "react-hook-form";

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

    let URLParamSell = window.location.pathname.includes('schedule');
    let URLParamRepair = window.location.pathname.includes("Repairschedule");


    const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<IAddressModel>({
        defaultValues: (defaultValues?.Id && defaultValues?.Id > 0) ? { ...defaultValues } : {
            Name: getLocalStorage().FirstName,
            MobilePhone: getLocalStorage().MobileNumber,
        }
    });

    let defaultStateId = localStorage.getItem("stateId");

    const [isDefault, setIsDefault] = useState<boolean>(false);
    const [addressData, setAddressData] = useState({ cityId: 0, pincode: "", pinLocation: "" });
    const [dofyGeoList, setDofyGeoList] = useState<Array<any>>([]);
    const [addressType, setAddressType] = useState<Array<any>>([]);
    const [stateList, setStateList] = useState<Array<any>>([]);
    const [pinLocationErr, setPinLocationErr] = useState(true);
    const [saveButtonDisable, setSaveButtonDisable] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState<number>(0);
    const [filterLocation, setFilterLocationList] = useState<Array<any>>([]);

    const defaultProps = {
        options: filterLocation,
        getOptionLabel: (option: any) => option.Code,
    };

    const filterOptions = createFilterOptions({
        stringify: (option: any) => option.Name + option.Code,
    });


    const onCreateAddress: SubmitHandler<IAddressModel> = (data: any) => {
        setSaveButtonDisable(true);
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
                            setSaveButtonDisable(false);
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
                            setSaveButtonDisable(false);
                            return dispatch(addressPageChange("timedateslot"));
                        }
                        window.location.reload();
                    }
                }).catch((e: string) => {
                    console.log(e);
                });
        }
        else{
            setSaveButtonDisable(false);
        }
    }

    const GetDofyGeoList = (serviceTypeId: number) => {
        MasterServices.GetAllDofyGeo(serviceTypeId, findedLocation().LanguageCode, findedLocation().CountryCode).then((res) => {
            if (res.status === 200) {
                setDofyGeoList(res.data);

                if (defaultStateId || defaultValues?.StateId > 0) {
                    initialSelectedCityHandler(res.data, defaultValues?.StateId > 0 ? defaultValues.StateId : defaultStateId);
                }
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    const getAddressType = (serviceTypeId: number) => {
        MasterServices.GetAllAddressType(serviceTypeId, findedLocation().LanguageCode, findedLocation().CountryCode).then((res: any) => {
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
            let data = filterLocation.find(it => it.Id === Id || it.Code == Id);
            if (data) {
                setValue("LocationPin", data.Code);
                setPinLocationErr(true);                
                setAddressData({ pinLocation: data.Name, cityId: data.Id, pincode: data.Code });
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
            setAddressData({ pinLocation: data.Name, cityId: data.Id, pincode: data.Code });
            setPinLocationErr(true);
        }
        else {
            setPinLocationErr(false);
        }
    }

    const GetAllStateList = (serviceTypeId: number) => {
        MasterServices.GetAllStateList(serviceTypeId, findedLocation().LanguageCode, findedLocation().CountryCode).then(res => {
            if (res.status === 200) {
                setStateList(res.data);
            };
        }).catch(e => console.log(e));
    }

    const selectedCityHandler = (value: any) => {
        const validLocation = value ? dofyGeoList.filter(it => it.Parent1 === value) : dofyGeoList;
        setFilterLocationList(validLocation);
    }

    const initialSelectedCityHandler = (data: Array<any>, value: string) => {
        const validLocation = value ? data.filter(it => it.Parent1 === parseInt(value)) : data;
        setFilterLocationList(validLocation);

    }

    useEffect(() => {
        GetDofyGeoList(HelperConstant.serviceTypeId.SELL);
        getAddressType(HelperConstant.serviceTypeId.SELL);
        GetAllStateList(HelperConstant.serviceTypeId.SELL);
    }, []);

    return (
        <ion-grid class='address-form'>
            <form onSubmit={handleSubmit(onCreateAddress)}>
                <ion-card-content>
                    <ion-row>
                        <ion-col size-lg='6' size-md='6' size-xs='12' class='address-form-cols'>
                            <ion-text>{dataLocalization.Name}</ion-text>
                            <TextField fullWidth className='address-form-inline' placeholder="Enter the name"
                                {...register("Name", { required: true, onChange: (e: any) => { setValue("Name", e.target.value); clearErrors("Name"); } })}
                                type="text"></TextField>
                            {errors.Name && <ion-text color='danger'>{dataLocalization.Name1}</ion-text>}
                        </ion-col>

                        <ion-col size-lg='6' size-md='6' size-xs='12' class='address-form-cols'>
                            <ion-text >{dataLocalization.Address1}</ion-text>
                            <TextField fullWidth className='address-form-inline' placeholder={dataLocalization.Enter_address1}
                                {...register("Address", { required: true, onChange: (e: any) => { setValue("Address", e.target.value); clearErrors("Address"); } })}
                            ></TextField>
                            {errors.Address && <ion-text color='danger'>{dataLocalization.Address} </ion-text>}
                        </ion-col>
                        <>
                            <ion-col size-lg='6' size-md='6' size-xs='12' class='address-form-cols'>
                                <ion-text >{dataLocalization.Mobile_Number}</ion-text>
                                <TextField fullWidth className='address-form-inline ' type="number" placeholder={dataLocalization.Mobile_Number} onKeyDown={onKeyDown}
                                    {...register("MobilePhone", { required: true, minLength: 10, maxLength: 10, onChange: (e: any) => { setValue("MobilePhone", e.target.value); clearErrors("MobilePhone"); } })}></TextField>
                                {errors.MobilePhone && errors.MobilePhone.type === "required" && (<ion-text color='danger' class="error-padding">{dataLocalization.Mobile_Number1}</ion-text>)}
                                {errors.MobilePhone && (errors.MobilePhone.type === "minLength" || errors.MobilePhone.type === "maxLength") && (<ion-text color='danger' class="error-padding">{dataLocalization.valid_Mobile_Number}</ion-text>)}
                            </ion-col>

                            <ion-col size-lg='6' size-md='6' size-xs='12' class='address-form-cols' >
                                <ion-text >Alternate Mobile Number</ion-text>
                                <TextField fullWidth className='address-form-inline' type="number" placeholder={dataLocalization.Alternate_Mobile_Number} onKeyDown={onKeyDown}
                                    {...register("WorkPhone", { required: false, minLength: 10, maxLength: 10, onChange: (e: any) => { setValue("WorkPhone", e.target.value); clearErrors("WorkPhone"); } })}
                                ></TextField>
                                {errors.WorkPhone && (errors.WorkPhone.type === "minLength" || errors.WorkPhone.type === "maxLength") && (<ion-text color='danger' class="error-padding">{dataLocalization.valid_Mobile_Number}</ion-text>)}
                            </ion-col>
                        </>

                        <ion-col size-lg='12' size-md='12' size-xs='12' class='address-form-cols'>
                            <ion-text >LandMark</ion-text>
                            <TextField fullWidth className='address-form-inline' placeholder={dataLocalization.Enter_LandMark}
                                {...register("LandMark", { required: false, onChange: (e: any) => { setValue("LandMark", e.target.value); clearErrors("LandMark"); } })}
                            ></TextField>
                        </ion-col>
                        <ion-col size-lg='4' size-md='6' size-xs='12' class='address-card-dropdown address-form-cols'>
                            <CustomMaterialDropDown selectedValue={defaultValues?.AddressTypeId} label={dataLocalization.Address_Type} data={addressType}
                                {...register("AddressTypeId", { required: true })} onIonChange={(e: any) => { setValue("AddressTypeId", e.value); clearErrors("AddressTypeId"); }}
                            />
                            {errors.AddressTypeId && <ion-text color='danger'>{dataLocalization.Address_Type} </ion-text>}
                        </ion-col>
                        <ion-col size-lg='4' size-md='6' size-xs='12' class='address-card-dropdown address-form-cols'>
                            <CustomMaterialDropDown selectedValue={defaultValues?.StateId} label={"State*"} data={stateList}
                                {...register("StateId", { required: true })} onIonChange={(e: any) => { selectedCityHandler(e); clearErrors("StateId"); }} />
                            {errors.StateId && <ion-text color='danger'>{dataLocalization.State}</ion-text>}
                        </ion-col>

                        {(dofyGeoList.length > 0) ?
                            <ion-col size-lg='4' size-md='12' size-xs='12' class='address-form-cols' >
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
                                {errors.LocationId && <ion-text color='danger'>{dataLocalization.Pincodes}</ion-text>}
                            </ion-col> : <></>}
                    </ion-row>
                </ion-card-content>
                <ion-row class='ion-margin-top address-edit-btn'>
                    <ion-col class='ion-text-center'>
                        {pageFrom === "ScheduleAddress" && <Button className='ad_back-btn' variant="contained" onClick={() => setDefaultShow(false)} type="button">{dataLocalization.Back}</Button>}
                        {URLParamSell ?
                            <Button disabled={saveButtonDisable} variant="contained" type="submit">{dataLocalization.Continue}</Button>
                            :
                            <Button disabled={saveButtonDisable} variant="contained" type="submit">{isEdit ? dataLocalization.SaveChanges : dataLocalization.Save}</Button>
                        }
                    </ion-col>
                </ion-row>
            </form>
        </ion-grid>
    )
}

export default AddressFormIN  