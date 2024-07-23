// import { useEffect, useState } from 'react';
// import { IonRow, IonCard, IonCol, IonText, IonGrid, IonCardContent, IonInput } from '@ionic/react';
// import AddressFormIN from '../formIN/AddressFormIN';
// import { Direction, isIn } from '../../helper/Helper';
// import { IAddressModel } from '../../../models/Address.Model';
// import AddressFormAE from '../formAE/AddressFormAE';

// import { useForm, SubmitHandler } from "react-hook-form";


// import { IAddressModel } from '../../../models/Address.Model';
// import MasterServices from '../../../services/Master.Services';
// import UserAddressServices from '../../../services/UserAddress.Services';

// import { addressPageChange } from '../../../features/reducers/address/AddressPageChange.Reducers';
// import { useTypedDispatch } from '../../../features/reduxhooks/ReduxHooks';

// import { Direction, getLocalStorage, getUserLanguage, isIn, onKeyDown } from '../../helper/Helper';
// import { HelperConstant } from '../../helper/HelperConstant';
// import { InputParamChange } from '../../../features/reducers/shared/InputParams.Reducers';
// import { ActionType } from '../../../features/actiontypes/Input.ActionTypes';

// import Language from "./AddressFormLanguage.json";
// import { Autocomplete, Button, TextField, createFilterOptions } from '@mui/material';
// import { CustomMaterialDropDown } from '../../shared/CustomMaterialDropDown';
// import { unique } from 'underscore';


// function AddressForm({ defaultValues, isEdit, isAddress }: Props) {

//   let dataLocalization = Language[getUserLanguage()];
//   let dispatch = useTypedDispatch();

//   console.log(defaultValues)

//   // const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

//   const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<IAddressModel>({
//     defaultValues: (defaultValues?.Id && defaultValues?.Id > 0) ? { ...defaultValues } : {
//       Name: getLocalStorage().FirstName,
//       MobilePhone: getLocalStorage().MobileNumber
//     }
//   });

// let URLParamSavedAddress = window.location.pathname.endsWith("saved-address");
//   let locationId = localStorage.getItem("userLocationId");
//   let URLParamSell = window.location.pathname.includes('schedule');
//   let URLParamRepair = window.location.pathname.includes("Repairschedule");

//   let defaultStateId = localStorage.getItem("stateId");
//   let defaultLocationId = localStorage.getItem("userLocationId");

//   const [isDefault, setIsDefault] = useState<boolean>(false);
//   const [addressData, setAddressData] = useState({ cityId: 0, pincode: "", pinLocation: "" });
//   const [dofyGeoList, setDofyGeoList] = useState<Array<any>>([]);
//   const [addressType, setAddressType] = useState<Array<any>>([]);
//   const [stateList, setStateList] = useState<Array<any>>([]);
//   const [pinLocationErr, setPinLocationErr] = useState(true);
//   const [District, setDistrict] = useState<Array<any>>([]);
//   const [Village, setVillage] = useState<Array<any>>([]);
//   const [selectedLocationId, setSelectedLocationId] = useState<number>(0);
//   const [filterLocation, setFilterLocationList] = useState<Array<any>>([]);

//   const defaultProps = {
//     options: filterLocation,
//     getOptionLabel: (option: any) => option.Name,
//   };

//   const filterOptions = createFilterOptions({
//     stringify: (option: any) => option.Name + option.Code,
//   });

//   const selectSlot = (addressId: any) => {
//     dispatch(InputParamChange({ payload: addressId, type: ActionType.ADDRESS_ID }));
//     if (URLParamRepair) {
//       dispatch(addressPageChange("repairtimedateslot"));
//     }
//     else {
//       dispatch(addressPageChange("timedateslot"));
//     }
//   }

//   const onCreateAddress: SubmitHandler<IAddressModel> = (data) => {
//     let locId = dofyGeoList.find(x => (x.Name === data.LocationPin || x.Code === data.LocationPin))?.Id;
//     data.IsDefault = isDefault;
//     data.PersonId = getLocalStorage()?.PersonId;
//     data.CityId = addressData.cityId;
//     // data.LocationPin = selectedLocationId;
//     data.CountryId = 1;
//     data.PinCode = addressData.pincode;
//     data.LocationId = selectedLocationId > 0 ? selectedLocationId : locId;
//     if (!isIn()) {
//       data.StateId = District.find(x => x.Id == addressData.cityId)?.Parent;
//     }
//     // data.LocationPin = addressData.pincode;
//     if (pinLocationErr) {
//       isEdit ?
//         UserAddressServices.edit(data).then(res => {
//           if (res.status === 200)
//             window.location.reload();
//         }).catch((e: string) => {
//           console.log(e);
//         })
//         :
//         UserAddressServices.create(data).then((res) => {
//           if (res.status === 200) {
//             if (URLParamSell) {
//               dispatch(InputParamChange({ payload: res.data, type: ActionType.ADDRESS_ID }));
//               return dispatch(addressPageChange("timedateslot"));
//             }
//             window.location.reload();
//           }
//         }).catch((e: string) => {
//           console.log(e);
//         });
//     }
//   }

//   const GetDofyGeoList = (serviceTypeId: number) => {

//     MasterServices.GetAllDofyGeo(serviceTypeId).then((res) => {
//       if (res.status === 200) {
//         setDofyGeoList(res.data);
//         if (locationId) {
//           getDefaultPinLocation(parseInt(locationId), res.data);
//         }
//         if (defaultStateId) {
//           initialSelectedCityHandler(res.data, defaultValues?.StateId > 0 ? defaultValues.StateId : defaultStateId);
//         }
//       }
//     }).catch((e: string) => {
//       console.log(e);
//     });
//   }

//   const getAddressType = (serviceTypeId: number) => {
//     MasterServices.GetAllAddressType(serviceTypeId).then((res: any) => {
//       if (res.status === 200) {
//         setAddressType(res.data);
//       }
//     }).catch((e: string) => {
//       console.log(e);
//     })
//   }

//   const getPinLocation = (Id: any) => {
//     let data = dofyGeoList.find(it => it.Id === Id);
//     if (data) {
//       setValue("LocationPin", data.Code);
//       setPinLocationErr(true);
//       setAddressData({ pinLocation: data.Name, cityId: data.Id, pincode: data.Code });
//     }
//     else {
//       setPinLocationErr(false);
//     }
//   }

//   const getDefaultPinLocation = (Id: any, GeoData: Array<any>) => {
//     let data = GeoData.find(it => it.Id === Id);
//     if (data) {
//       setValue("LocationPin", data.Code);
//       setPinLocationErr(true);
//       setAddressData({ pinLocation: data.Name, cityId: data.Id, pincode: data.Code });
//     }
//     else {
//       setPinLocationErr(false);
//     }
//   }

//   const GetAllStateList = (serviceTypeId: number) => {
//     MasterServices.GetAllStateList(serviceTypeId).then(res => {
//       if (res.status === 200) {
//         setStateList(res.data);
//       };
//     }).catch(e => console.log(e));
//   }

//   const getCityList = () => {
//     MasterServices.GetCityList(HelperConstant.serviceTypeId.SELL).then(res => {
//       if (res.status === 200) {
//         setDistrict(res.data);
//       }
//     }).catch(e => {
//       console.log(e);
//     });
//   }

//   const selectedCityHandler = (value: any) => {
//     const validLocation = value ? dofyGeoList.filter(it => it.Parent1 === value) : dofyGeoList;
//     var uniqueOptions = unique(validLocation, "Name");
//     setFilterLocationList(uniqueOptions);
//   }

//   const initialSelectedCityHandler = (data: Array<any>, value: string) => {
//     if (getUserLanguage() === "in_en") {
//       const validLocation = value ? data.filter(it => it.Parent1 === parseInt(value)) : data;
//       var uniqueOptions = unique(validLocation, "Name");
//       setFilterLocationList(uniqueOptions);
//     }
//     else {
//       const validLocation = value ? data.filter(it => it.Parent === parseInt(value)) : data;
//       var uniqueOptions = unique(validLocation, "Name");
//       setFilterLocationList(uniqueOptions);
//     }

//   }

//   const getAreaList = (val: any) => {
//     MasterServices.GetAreaList(HelperConstant.serviceTypeId.SELL, val).then(res => {
//       if (res.status === 200) {
//         setVillage(res.data);
//         setDofyGeoList(res.data);
//         setAddressData({ ...addressData, cityId: val, pincode: res.data?.find((x: any) => x.Id === defaultValues.LocationId)?.Code });
//       }
//     }).catch(e => {
//       console.log(e);
//     });
//   }

//   useEffect(() => {
//     if (defaultValues?.CityId > 0) {
//       getAreaList(defaultValues?.CityId);
//     }

//     GetDofyGeoList(HelperConstant.serviceTypeId.SELL);
//     getAddressType(HelperConstant.serviceTypeId.SELL);
//     GetAllStateList(HelperConstant.serviceTypeId.SELL);
//     getCityList();
//   }, []);

//   return (
//     <IonGrid>
//       <IonRow >
//         <IonCol size='12'>
//           <IonCard className="address-edit" dir={Direction()}>
//             {/* {(!URLParamSavedAddress && isAddress && (defaultValues?.Id && defaultValues?.Id > 0)) &&
//               <IonRow>
//                 <IonCol className='ion-padding'><Button onClick={() => selectSlot(defaultValues.Id)} className='address-edit-use-btn' variant="contained">Use This Address</Button></IonCol>
//               </IonRow>
//             } */}
//             <form onSubmit={handleSubmit(onCreateAddress)} className='address-form'>
//               <IonCardContent>
//                 <IonRow>
//                   <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols'>
//                     <IonText>{dataLocalization.Name}</IonText>
//                     <IonInput className='address-form-inline' placeholder="Enter the name" {...register("Name", { required: true })} onIonChange={() => { clearErrors("Name"); }} type="text"></IonInput>
//                     {errors.Name && <IonText color='danger'>{dataLocalization.Name1}</IonText>}
//                   </IonCol>

//                   <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols'>
//                     <IonText >{dataLocalization.Address1}</IonText>
//                     <IonInput className='address-form-inline' placeholder={dataLocalization.Enter_address1}  {...register("Name", { required: true })} {...register("Address", { required: true })} onIonChange={() => { clearErrors("Address"); }}></IonInput>
//                     {errors.Address && <IonText color='danger'>{dataLocalization.Address} </IonText>}
//                   </IonCol>

//                   {isIn() ?
//                     <>
//                       <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols'>
//                         <IonText >{dataLocalization.Mobile_Number}</IonText>
//                         <IonInput className='address-form-inline' placeholder="+91-91234567896" type="number" onKeyDown={onKeyDown} {...register("MobilePhone", { required: true, minLength: 10, maxLength: 10 })}
//                           onIonChange={() => { clearErrors("MobilePhone"); }}></IonInput>
//                         {errors.MobilePhone && errors.MobilePhone.type === "required" && (<IonText color='danger' className="error-padding">{dataLocalization.Mobile_Number1}</IonText>)}
//                         {errors.MobilePhone && (errors.MobilePhone.type === "minLength" || errors.MobilePhone.type === "maxLength") && (<IonText color='danger' className="error-padding">{dataLocalization.valid_Mobile_Number}</IonText>)}
//                       </IonCol>

//                       <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols' >
//                         <IonText >Alternate Mobile Number</IonText>
//                         <IonInput className='address-form-inline' type="number" placeholder="+91-91234567895" onKeyDown={onKeyDown} {...register("WorkPhone", { required: false, minLength: 10, maxLength: 10 })}
//                           onIonChange={() => { clearErrors("WorkPhone"); }} ></IonInput>
//                         {errors.WorkPhone && (errors.WorkPhone.type === "minLength" || errors.WorkPhone.type === "maxLength") && (<IonText color='danger' className="error-padding">{dataLocalization.valid_Mobile_Number}</IonText>)}
//                       </IonCol>
//                     </>
//                     :
//                     <>
//                       <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols'>
//                         <IonText >{dataLocalization.Mobile_Number}</IonText>
//                         <IonInput className='address-form-inline' placeholder="+971- 912345678" type="number" onKeyDown={onKeyDown} {...register("MobilePhone", { required: true, minLength: 10, maxLength: 10 })}
//                           onIonChange={() => { clearErrors("MobilePhone"); }}></IonInput>
//                         {errors.MobilePhone && errors.MobilePhone.type === "required" && (<IonText color='danger' className="error-padding">{dataLocalization.Mobile_Number1}</IonText>)}
//                         {errors.MobilePhone && (errors.MobilePhone.type === "minLength" || errors.MobilePhone.type === "maxLength") && (<IonText color='danger' className="error-padding">{dataLocalization.valid_Mobile_Number}</IonText>)}
//                       </IonCol>

//                       <IonCol sizeLg='6' sizeMd='6' sizeXs='12' className='address-form-cols'>
//                         <IonText >Alternate Mobile Number</IonText>
//                         <IonInput className='address-form-inline' type="number" placeholder="+971- 912345678" onKeyDown={onKeyDown} {...register("WorkPhone", { required: false, minLength: 10, maxLength: 10 })}
//                           onIonChange={() => { clearErrors("WorkPhone"); }} ></IonInput>
//                         {errors.WorkPhone && (errors.WorkPhone.type === "minLength" || errors.WorkPhone.type === "maxLength") && (<IonText color='danger' className="error-padding">{dataLocalization.valid_Mobile_Number}</IonText>)}
//                       </IonCol>
//                     </>
//                   }

//                   <IonCol sizeLg='12' sizeMd='12' sizeXs='12' className='address-form-cols' >
//                     <IonText >{dataLocalization?.Address2}</IonText>
//                     <IonInput className='address-form-inline' placeholder={dataLocalization.Enter_address1} {...register("Address1", { required: false })}></IonInput>
//                   </IonCol>

//                   <IonCol sizeLg='12' sizeMd='12' sizeXs='12' className='address-form-cols'>
//                     <IonText >LandMark</IonText>
//                     <IonInput className='address-form-inline' placeholder={dataLocalization.Enter_LandMark} {...register("LandMark", { required: false })} ></IonInput>
//                   </IonCol>

//                   {isIn() ? <></>
//                     :
//                     // <IonCol sizeLg='4' sizeMd='6' sizeXs='12'>
//                     //   <CustomInput label={dataLocalization.ApartmentNumber} placeholder={dataLocalization.ApartmentNumber} {...register("ApartmentNumber", { required: true })} onIonChange={() => { clearErrors("ApartmentNumber"); }} />
//                     //   {errors.ApartmentNumber && <IonText color='danger'>{dataLocalization.ApartmentNumber} </IonText>}
//                     // </IonCol>
//                     <IonCol sizeLg='12' sizeMd='12' sizeXs='12' className='address-form-cols'>
//                       <IonText >ApartmentNumber/Floor</IonText>
//                       <IonInput className='address-form-inline' placeholder={dataLocalization?.ApartmentNumber} {...register("ApartmentNumber", { required: false })}></IonInput>
//                     </IonCol>
//                   }

//                   <IonCol sizeLg='4' sizeMd='6' sizeXs='12' className='address-card-dropdown address-form-cols'>
//                     <CustomMaterialDropDown selectedValue={defaultValues?.AddressTypeId} label={dataLocalization.Address_Type} data={addressType} {...register("AddressTypeId", { required: true })} onIonChange={() => { clearErrors("AddressTypeId"); }} />
//                     {errors.AddressTypeId && <IonText color='danger'>{dataLocalization.Address_Type} </IonText>}
//                   </IonCol>

//                   {isIn() ? <IonCol sizeLg='4' sizeMd='6' sizeXs='12' className='address-card-dropdown address-form-cols'>
//                     <CustomMaterialDropDown selectedValue={defaultValues?.StateId > 0 ? defaultValues.StateId : defaultStateId} label={"State*"} data={stateList} {...register("StateId", { required: true })} onIonChange={(e: any) => { selectedCityHandler(e); clearErrors("CityId"); }} />
//                     {errors.StateId && <IonText color='danger'>{dataLocalization.State}</IonText>}
//                   </IonCol> :
//                     <IonCol sizeLg='4' sizeMd='6' sizeXs='12' className='address-card-dropdown address-form-cols'>
//                       <CustomMaterialDropDown selectedValue={defaultValues?.CountryId > 0 ? defaultValues.CountryId : defaultStateId} label={"City*"} data={District} {...register("CityId", { required: true })} onIonChange={getCityList} />
//                       {errors.CityId && <IonText color='danger'>Please select City*</IonText>}
//                     </IonCol>
//                   }

//                   {(isIn() && dofyGeoList.length > 0) ?
//                     <IonCol sizeLg='4' sizeMd='12' sizeXs='12' className='address-form-cols' >
//                       <Autocomplete
//                         defaultValue={dofyGeoList.find(x => (x.Id == defaultValues?.LocationId || x.Id == defaultLocationId))}
//                         {...defaultProps}
//                         isOptionEqualToValue={(option, value) => option?.Code === value?.Code || option?.Name === value?.Name}
//                         filterOptions={filterOptions}
//                         style={{ width: '100%' }}
//                         disablePortal
//                         onChange={(e, v) => { getPinLocation(v.Id) }}
//                         // {...register("LocationPin", { required: false}
//                         id="combo-box-demo"
//                         clearIcon={null}
//                         sx={{ width: 300 }}
//                         renderInput={(params) => <TextField type="text" {...params}
//                           label={dataLocalization.Pincode}{...register("LocationId", { required: true })}
//                         />}
//                       />
//                       {errors.LocationId && <IonText color='danger'>{dataLocalization.Pincodes}</IonText>}
//                       {/* <CustomAutoComplete label={dataLocalization.Pincode} defaultShow={false} data={} getId={(e: any) => { getPinLocation(e); clearErrors("LocationPin"); }} {...register("LocationPin", { required: true })} /> */}

//                       {/* {errors.LocationPin && <IonText color='danger'>{dataLocalization?.Pincode} </IonText>} */}
//                       {/* {(!errors.LocationId && !pinLocationErr) && <IonText color='ion-color-danger'>{dataLocalization.Valid_Pincode}</IonText>} */}
//                     </IonCol>
//                     :
//                     <IonCol sizeLg='4' sizeMd='6' sizeXs='12' className='address-form-cols' >
//                       <CustomMaterialDropDown selectedValue={defaultValues?.LocationId > 0 ? defaultValues.LocationId : defaultLocationId} label={dataLocalization.Pincode} data={filterLocation} {...register("LocationId", { required: true })} onIonChange={(e: any) => { setSelectedLocationId(e); setAddressData({ ...addressData, pincode: Village.find(x => x.Id == e)?.Code }) }} />
//                       {errors.LocationId && <IonText color='danger'>{dataLocalization.Pincodes}</IonText>}
//                     </IonCol>
//                   }

//                   {/* <IonCol sizeLg='4' sizeMd='6' sizeXs='12'>
//                     <IonItem className="bg-color-white">
//                       <IonLabel>{dataLocalization.Default_Address}</IonLabel>
//                       <IonCheckbox {...register("IsDefault")} onIonChange={(e) => setIsDefault(e.detail.checked)} />
//                     </IonItem>
//                   </IonCol> */}
//                 </IonRow>
//               </IonCardContent>
//               {/* {(isAddress && (defaultValues?.Id && defaultValues?.Id > 0)) ? null : */}
//               <IonRow className='ion-margin-top address-edit-btn'>
//                 <IonCol className='ion-text-center'>
//                   {/* <Button variant="contained" type="button" onClick={() => { dispatch(addressPageChange("currentaddress")) }}>{dataLocalization.Back}</Button> */}
//                   {URLParamSell ?
//                     <Button variant="contained" type="submit">{dataLocalization.Continue}</Button>
//                     :
//                     <Button variant="contained" type="submit">{isEdit ? dataLocalization.SaveChanges : dataLocalization.Save}</Button>
//                   }
//                 </IonCol>
//               </IonRow>
//               {/* } */}
//               {/* {(URLParamSavedAddress && (defaultValues?.Id && defaultValues?.Id > 0)) &&
//                 <IonRow className='ion-margin-top address-edit-btn'>
//                   <IonCol className='ion-text-center'>
//                     <Button variant="contained" type="button" onClick={() => { dispatch(addressPageChange("currentaddress")) }}>{dataLocalization.Back}</Button>
//                     {URLParamSell ?
//                       <Button variant="contained" type="submit">{dataLocalization.Continue}</Button>
//                       :
//                       <Button variant="contained" type="submit">{isEdit ? dataLocalization.SaveChanges : dataLocalization.Save}</Button>
//                     }
//                   </IonCol>
//                 </IonRow>
//               } */}
//             </form>
//           </IonCard>
//         </IonCol>
//       </IonRow>
//     </IonGrid>
//   )
// }

// export default AddressForm

import { useEffect, useState } from 'react';
import { IonRow, IonCard, IonCol, IonText, IonGrid, IonCardContent, IonInput } from '@ionic/react';
import AddressFormIN from '../formIN/AddressFormIN';
import { Direction, getUserLanguage, isIn } from '../../helper/Helper';
import { IAddressModel } from '../../../models/Address.Model';
import AddressFormAE from '../formAE/AddressFormAE';
import './AddressForm.css';
import Language from './AddressFormLanguage.json'

type Props = {
  defaultValues: IAddressModel,
  isEdit: boolean,
  isAddress: boolean,
  pageFrom?: "ScheduleAddress" | "other"
  setDefaultShow?: any,
  setChangesInAddress?: any
}

function AddressForm({ defaultValues, isEdit, isAddress, pageFrom, setDefaultShow, setChangesInAddress }: Props) {

  let dataLocalization = Language[getUserLanguage()];

  return (
    <IonGrid>
      <IonRow >
        <IonCol className='os-choose-col' size='12'>
          <IonText>{dataLocalization.Kindly_help_us_with}</IonText>
        </IonCol>
        <IonCol size='12'>
          <IonCard className="address-edit" dir={Direction()}>
            {isIn() ?
              <AddressFormIN defaultValues={defaultValues} isEdit={isEdit} isAddress={isAddress} pageFrom={pageFrom} setDefaultShow={setDefaultShow} setChangesInAddress={setChangesInAddress} />
              :
              <AddressFormAE defaultValues={defaultValues} isEdit={isEdit} isAddress={isAddress} pageFrom={pageFrom} setDefaultShow={setDefaultShow} setChangesInAddress={setChangesInAddress} />
            }
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default AddressForm