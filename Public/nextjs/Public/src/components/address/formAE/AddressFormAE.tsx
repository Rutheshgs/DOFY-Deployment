import { useEffect, useState } from 'react';
import { IAddressModel } from '@/models/Address.Model';
import MasterServices from '@/services/Master.Services';
import UserAddressServices from '@/services/UserAddress.Services';
import { addressPageChange } from '@/features/reducers/address/AddressPageChange.Reducers';
import { useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { findedLocation, getLocalStorage, getUserLanguage, onKeyDown, restrictInput } from '../../helper/Helper';
import { HelperConstant } from '../../helper/HelperConstant';
import { InputParamChange } from '@/features/reducers/shared/InputParams.Reducers';
import { ActionType } from '@/features/actiontypes/Input.ActionTypes';
import Language from "../form/AddressFormLanguage.json";
import { Button, TextField } from '@mui/material';
import { CustomMaterialDropDown } from '../../shared/CustomMaterialDropDown';
import { useForm, SubmitHandler } from "react-hook-form";
import { unique } from 'underscore';

type Props = {
    defaultValues: IAddressModel,
    isEdit: boolean,
    isAddress: boolean,
    pageFrom?: "ScheduleAddress" | "other"
    setDefaultShow?: any,
    setChangesInAddress?: any
}

function AddressFormAE({ defaultValues, isEdit, pageFrom, setDefaultShow, setChangesInAddress, isAddress }: Props) {
    let dataLocalization = Language[getUserLanguage()];
    let dispatch = useTypedDispatch();

    const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<IAddressModel>({
        defaultValues: (defaultValues?.Id && defaultValues?.Id > 0) ? { ...defaultValues } : {
            Name: getLocalStorage().FirstName,
            MobilePhone: getLocalStorage().MobileNumber
        }
    });

    let URLParamSell = window.location.pathname.includes('schedule');

    const [isDefault] = useState<boolean>(false);
    const [dofyGeoList, setDofyGeoList] = useState<Array<any>>([]);
    const [addressType, setAddressType] = useState<Array<any>>([]);
    const [pinLocationErr] = useState(true);
    const [District, setDistrict] = useState<Array<any>>([]);
    const [Village] = useState<Array<any>>([]);
    const [selectedLocationId, setSelectedLocationId] = useState<number>(0);
    const [filterLocation, setFilterLocationList] = useState<Array<any>>([]);
    const [saveButtonDisable, setSaveButtonDisable] = useState(false);


    const onCreateAddress: SubmitHandler<IAddressModel> = data => {
        setSaveButtonDisable(true);
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
                            setSaveButtonDisable(false);
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
                            setSaveButtonDisable(false);
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
        MasterServices.GetAllDofyGeo(serviceTypeId, findedLocation().LanguageCode, findedLocation().CountryCode).then((res) => {
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
        MasterServices.GetAllAddressType(serviceTypeId, findedLocation().LanguageCode, findedLocation().CountryCode).then((res: any) => {
            if (res.status === 200) {
                setAddressType(res.data);
            }
        }).catch((e: string) => {
            console.log(e);
        })
    }


    const getCityList = () => {
        MasterServices.GetCityList(HelperConstant.serviceTypeId.SELL, findedLocation().LanguageCode, findedLocation().CountryCode).then(res => {
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
        const validLocation = value ? data.filter(it => it.Parent === parseInt(value)) : data;
        var uniqueOptions = unique(validLocation, "Name");
        setFilterLocationList(uniqueOptions);
    }

    useEffect(() => {
        GetDofyGeoList(HelperConstant.serviceTypeId.SELL);
        getAddressType(HelperConstant.serviceTypeId.SELL);
        getCityList();
    }, []);

    return (
        <ion-grid class='address-form'>
            <form onSubmit={handleSubmit(onCreateAddress)}>
                <ion-card-content >
                    <ion-row>
                        <ion-col size-xl='6' size-lg='6' size-md='6' size-xs='12' class='address-form-cols'>
                            <ion-text>{dataLocalization.Name}</ion-text>
                            <TextField fullWidth className='address-form-inline' placeholder="Enter the name"
                                {...register("Name", { required: true, onChange: (e: any) => { setValue("Name", e.target.value); clearErrors("Name"); } })}
                                type="text"></TextField>
                            {errors.Name && <ion-text color='danger'>{dataLocalization.Name1}</ion-text>}
                        </ion-col>
                        <ion-col size-xl='6' size-lg='6' size-md='6' size-xs='12' class='address-form-cols'>
                            <ion-text >{dataLocalization.Address1}</ion-text>
                            <TextField fullWidth className='address-form-inline' placeholder={dataLocalization.Enter_address1}
                                {...register("Address", { required: true, onChange: (e: any) => { setValue("Address", e.target.value); clearErrors("Address"); } })}
                            ></TextField>
                            {errors.Address && <ion-text color='danger'>{dataLocalization.Address} </ion-text>}
                        </ion-col>
                        <>
                            <ion-col size-xl='6 ' size-lg='6' size-md='6' size-xs='12' class='address-form-cols'>
                                <ion-text >{dataLocalization.Mobile_Number}</ion-text>

                                <TextField fullWidth className='address-form-inline ' type="number" placeholder={dataLocalization.Mobile_Number} onKeyDown={onKeyDown}
                                    {...register("MobilePhone", { required: true, onChange: (e: any) => { setValue("MobilePhone", e.target.value); restrictInput(e, 10); clearErrors("MobilePhone"); } })}></TextField>
                                {errors.MobilePhone && errors.MobilePhone.type === "required" && (<ion-text color='danger' class="error-padding">{dataLocalization.Mobile_Number1}</ion-text>)}
                                {errors.MobilePhone && (errors.MobilePhone.type === "minLength" || errors.MobilePhone.type === "maxLength") && (<ion-text color='danger' class="error-padding">{dataLocalization.valid_Mobile_Number}</ion-text>)}
                            </ion-col>

                            <ion-col size-xl='6' size-lg='6' size-md='6' size-xs='12' class='address-form-cols'>
                                <ion-text >{dataLocalization.Alternate_Mobile_Number}</ion-text>

                                <TextField fullWidth className='address-form-inline' type="number" placeholder={dataLocalization.Alternate_Mobile_Number} onKeyDown={onKeyDown}
                                    {...register("WorkPhone", { required: false, onChange: (e: any) => { setValue("WorkPhone", e.target.value); restrictInput(e, 10); clearErrors("WorkPhone"); } })}
                                ></TextField>
                                {errors.WorkPhone && (errors.WorkPhone.type === "minLength" || errors.WorkPhone.type === "maxLength") && (<ion-text color='danger' class="error-padding">{dataLocalization.valid_Mobile_Number}</ion-text>)}
                            </ion-col>
                        </>
                        <ion-col size-xl='12' size-lg='12' size-md='12' size-xs='12' class='address-form-cols'>
                            <ion-text >{dataLocalization.LandMark}</ion-text>
                            <TextField fullWidth className='address-form-inline' placeholder={dataLocalization.Enter_LandMark}
                                {...register("LandMark", { required: false, onChange: (e: any) => { setValue("LandMark", e.target.value); clearErrors("LandMark"); } })}
                            ></TextField>
                        </ion-col>
                        <ion-col size-xl='12' size-lg='12' size-md='12' size-xs='12' class='address-form-cols'>
                            <ion-text >{dataLocalization.ApartmentNumber}</ion-text>
                            <TextField fullWidth className='address-form-inline' placeholder={dataLocalization?.ApartmentNumber}
                                {...register("ApartmentNumber", { required: false, onChange: (e: any) => { setValue("ApartmentNumber", e.target.value); clearErrors("ApartmentNumber"); } })}
                            ></TextField>
                        </ion-col>

                        <ion-col size-xl='4' size-lg='4' siz-md='6' size-xs='12' class='address-card-dropdown address-form-cols'>
                            <CustomMaterialDropDown selectedValue={defaultValues?.AddressTypeId} label={dataLocalization.Address_Type} data={addressType}
                                {...register("AddressTypeId", { required: true })} onIonChange={(e: any) => { setValue("AddressTypeId", e.value); clearErrors("AddressTypeId"); }}
                            />
                            {errors.AddressTypeId && <ion-text color='danger'>{dataLocalization.Address_Type} </ion-text>}
                        </ion-col>
                        <ion-col size-xl='4' size-lg='4' size-md='6' size-xs='12' class='address-card-dropdown address-form-cols'>
                            <CustomMaterialDropDown selectedValue={defaultValues?.StateId} label={"City*"} data={District}
                                {...register("StateId", { required: true })} onIonChange={(e: any) => { selectedCityHandler(e.value); clearErrors("StateId"); }} />
                            {errors.StateId && <ion-text color='danger'>{dataLocalization.Please_select_City}</ion-text>}
                        </ion-col>
                        <ion-col size-xl='4' size-lg='4' size-md='6' size-xs='12' class='address-form-cols' >
                            <CustomMaterialDropDown selectedValue={defaultValues?.LocationId} label={dataLocalization.Pincode} data={filterLocation} {...register("LocationId", { required: true })} onIonChange={(e: any) => { setSelectedLocationId(e); clearErrors('LocationId') }} />
                            {errors.LocationId && <ion-text color='danger'>{dataLocalization.Pincodes}</ion-text>}
                        </ion-col>

                    </ion-row>
                </ion-card-content>
                {/* <ion-row class='ion-margin-top address-edit-btn'>
                    <ion-col class='ion-text-center'>
                        {pageFrom === "ScheduleAddress" && <Button className='ad_back-btn' variant="contained" onClick={() => setDefaultShow(false)} type="button">{dataLocalization.Back}</Button>}
                        {URLParamSell ?
                            <Button variant="contained" type="submit">{dataLocalization.Continue}</Button>
                            :
                            <Button variant="contained" type="submit">{isEdit ? dataLocalization.SaveChanges : dataLocalization.Save}</Button>
                        }
                    </ion-col>
                </ion-row> */}
                <ion-row class='ion-margin-top address-edit-btn'>
                    <ion-col class='ion-text-center'>
                        {(pageFrom === "ScheduleAddress" && isAddress) && <Button className='ad_back-btn' variant="contained" onClick={() => setDefaultShow(false)} type="button">{dataLocalization.Back}</Button>}
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

export default AddressFormAE