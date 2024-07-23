import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IonAlert, IonButton, IonCard, IonCardHeader, IonChip, IonCol, IonGrid, IonIcon, IonLabel, IonRow, IonText } from '@ionic/react'

import { InputParamChange } from '../../../features/reducers/shared/InputParams.Reducers';
import { useTypedDispatch } from '../../../features/reduxhooks/ReduxHooks';
import { ActionType } from '../../../features/actiontypes/Input.ActionTypes';

import UserAddressServices from '../../../services/UserAddress.Services';
import MasterServices from '../../../services/Master.Services';
import { IAddressModel } from '../../../models/Address.Model';
import "./AddressHome.css";

import { Direction, authUser, countrycodenumber, getLocalStorage, getUserLocationForParam, isIn } from '../../helper/Helper';
import { HelperConstant } from '../../helper/HelperConstant';

import { getUserLanguage } from '../../../components/helper/Helper';

import Language from "./AddressHomeLanguage.json";
import { Button } from '@mui/material';
import AddressForm from '../form/AddressForm';
import { checkmarkCircleOutline, createOutline } from 'ionicons/icons';
import { addressPageChange } from '../../../features/reducers/address/AddressPageChange.Reducers';
// interface InputParams {
//     id: string;
// }

function AddressHome() {

    let dataLocalization = Language[getUserLanguage()];

    const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState(false);
    const [removedId, setRemovedId] = useState<any>(0);
    const [searchText, setSearchText] = useState<any>("");
    const [filteredData, setfilteredData] = useState<Array<IAddressModel>>([]);
    const [stateList, setStateList] = useState<Array<any>>([]);
    const [dubaiStateList, setDubaiStateList] = useState<Array<any>>([]);
    const [defaultvalue, setDefaultValue] = useState<IAddressModel>({} as IAddressModel);
    const [defaultShow, setDefaultShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    let personId = getLocalStorage()?.PersonId;

    let dispatch = useTypedDispatch();
    let history = useHistory();

    let URLParamRepair = window.location.pathname.includes("Repairschedule");
    let URLParamSell = window.location.pathname.includes("schedule");

    const routerHandler = () => {
        if (URLParamRepair)
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/Repair-Devices-Details`);
        else
            history.goBack();
    }

    // const editHandler = (addressId: any,type:"edit") => {
    //     // dispatch(addressPageChange("editaddress"));
    // }

    // const addressViewHandler = (addressId: any,type:"view") => {
    //     // dispatch(addressPageChange("editaddress"));
    // }
    const addressHandler = (addressId: any, type: "view" | "edit") => {
        if (type === "view") {
            dispatch(InputParamChange({ payload: addressId, type: ActionType.ADDRESS_ID }));
            setIsEdit(false);
            filterAddresshandler(addressId);
        }
        if (type === "edit") {
            dispatch(InputParamChange({ payload: addressId, type: ActionType.ADDRESS_ID }));
            setIsEdit(true);
            filterAddresshandler(addressId);
        }
    }

    const RemoveAddressHandler = (addressId: any) => {
        UserAddressServices.remove(addressId).then(res => {
            if (res.status === 200)
                window.location.reload();
        }).catch((e: string) => {
            console.log(e)
        });
    }

    const filterAddresshandler = (id: any) => {
        let data = filteredData.find(x => x.Id == id) as IAddressModel;
        setDefaultValue(data);
        setTimeout(() => { setDefaultShow(false); }, 100);
        setTimeout(() => { setDefaultShow(true); }, 200);
    }

    const addNewAddressHandler = () => {
        setIsEdit(false);
        setDefaultValue({} as IAddressModel);
        setTimeout(() => { setDefaultShow(false); }, 100);
        setTimeout(() => { setDefaultShow(true); }, 200);
    }

    useEffect(() => {
        const searchFilter = (data: Array<IAddressModel>, searchString: string) => {
            if (searchText === "") {
                return setfilteredData(data);
            }
            var resultArray = Array<IAddressModel>();
            data.forEach((data, i) => {
                let strings = `${data?.Name} ${data.Address} ${data.Address1} ${data.LandMark} ${data.LocationPin} ${data.MobilePhone} ${data.PinCode}`;
                if (strings.toLowerCase().includes(searchText.toLowerCase())) {
                    return resultArray.push(data);
                }
            })

            setfilteredData(resultArray);
            return resultArray;
        }

        const getAddress = (personId: number) => {
            UserAddressServices.GetPersonAddress(personId).then(res => {
                if (res.status === 200)
                    searchFilter(res.data.Items, searchText);
                setDefaultValue(res.data.Items[0]);
                if (res.data.Items <= 0) {
                    setDefaultShow(true);
                }
                // dispatch(userAddressData(res.data.Items));
            }).catch((e: string) => {
                console.log(e);
            });
        }

        getAddress(personId);
    }, [personId, searchText]);

    const selectSlot = (addressId: any) => {
        dispatch(InputParamChange({ payload: addressId, type: ActionType.ADDRESS_ID }));
        if (URLParamRepair) {
            dispatch(addressPageChange("repairtimedateslot"));
        }
        else {
            dispatch(addressPageChange("timedateslot"));
        }
    }

    useEffect(() => {
        const GetAllStateList = (serviceTypeId: number) => {
            MasterServices.GetAllStateList(serviceTypeId).then(res => {
                if (res.status === 200) {
                    setStateList(res.data);
                };
            }).catch(e => console.log(e));
        }

        const getCityList = () => {
            MasterServices.GetCityList(HelperConstant.serviceTypeId.SELL).then(res => {
                if (res.status === 200) {
                    setDubaiStateList(res.data);
                }
            }).catch(e => {
                console.log(e);
            });
        }

        getCityList();
        GetAllStateList(HelperConstant.serviceTypeId.SELL);
    }, []);

    useEffect(() => {
        authUser();
    }, []);

    return (
        <IonGrid dir={Direction()}>
            <IonRow>
                <IonCol sizeLg='12' sizeMd='12' sizeXl='12' sizeSm='12' sizeXs='12' className='address-choose-address' >
                    <IonText className='address-header'>{dataLocalization.Choose}</IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                {
                    filteredData && filteredData.length > 0 ?
                        <>
                            {filteredData.map((val: IAddressModel, i: number) => {
                                return <IonCol className='current-address-content' sizeXl='3' sizeLg='4' sizeMd='4' sizeSm='12' sizeXs='12' key={i}>
                                    <IonCard className='address-card' style={{ height: "100%" }}>
                                        <IonRow>
                                            {isIn() ?
                                                <IonCol>
                                                    {/* {defaultvalue.Id == val.Id && (isEdit ? <IonIcon style={{ float: "right" }} color="primary" size='small' icon={createOutline} /> : <IonIcon style={{ float: "right" }} color="success" size='small' icon={checkmarkCircleOutline} />)} */}
                                                    <IonText>{val.Name}</IonText><br />
                                                    <IonText>{val.Address},{val.Address1 && <>{val.Address1},</>}</IonText><br />
                                                    {val.LandMark ? <><IonText>{val.LandMark},</IonText><br /></> : ""}
                                                    <IonText>{countrycodenumber(val.MobilePhone)}</IonText>{val.WorkPhone ? <IonText>,{val.WorkPhone}</IonText> : ""}<br/>
                                                    {(stateList.length > 0 && isIn()) && <><IonText>{stateList.find(x => x.Id === val.StateId)?.Name} - <IonText>{val.PinCode ? val.PinCode : val.LocationPin}</IonText></IonText><br /></>}
                                                </IonCol>
                                                :
                                                <IonCol>
                                                    {/* {defaultvalue.Id == val.Id && (isEdit ? <IonIcon style={{ float: "right" }} color="primary" size='small' icon={createOutline} /> : <IonIcon style={{ float: "right" }} color="success" size='small' icon={checkmarkCircleOutline} />)} */}
                                                    <IonText>{val.Name}</IonText><br />
                                                    <IonText>{val.Address},{val.Address1 && <>{val.Address1},</>}</IonText><br />
                                                    {val.ApartmentNumber ? <IonText>{val.ApartmentNumber},</IonText> : ""}
                                                    {val.LandMark ? <><IonText>{val.LandMark},</IonText><br /></> : ""}
                                                    <IonText dir='ltr'>{countrycodenumber(val.MobilePhone)}</IonText>{val.WorkPhone ? <IonText dir='ltr'>{countrycodenumber (val.WorkPhone)}</IonText> : ""}<br/>
                                                    <IonText>{dubaiStateList.find(x => x.Id === val.StateId)?.Name} - <IonText>{val.PinCode}</IonText></IonText><br />
                                                </IonCol>
                                            }
                                            <IonCol className='addhome' size='12'>
                                            {URLParamSell && <IonText className='address-controlls' onClick={() => selectSlot(val.Id)}>Use&nbsp;|&nbsp;</IonText>}<IonText className='address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</IonText>{URLParamSell ? null : <><IonText onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} className='address-controlls'>&nbsp;|&nbsp;Delete</IonText><IonText onClick={() => addressHandler(val.Id, "view")} className='address-controlls'>&nbsp;|&nbsp;Clone</IonText></>}
                                            </IonCol>
                                        </IonRow>
                                        {/* <IonRow>
                                            <IonCol className='ion-text-right'>{URLParamSell && <IonText className='address-controlls' onClick={() => selectSlot(val.Id)}>Use&nbsp;|&nbsp;</IonText>}<IonText className='address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</IonText>{URLParamSell ? null : <><IonText onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} className='address-controlls'>&nbsp;|&nbsp;Delete</IonText><IonText onClick={() => addressHandler(val.Id, "view")} className='address-controlls'>&nbsp;|&nbsp;Clone</IonText></>}</IonCol>
                                        </IonRow> */}
                                    </IonCard>
                                </IonCol>
                            })}
                            <IonCol className='add-address-card' sizeXl='3' sizeLg='4' sizeMd='4' sizeSm='12' sizeXs='12'>
                                <IonCard className='address-card'>
                                    <Button variant="contained" onClick={() => addNewAddressHandler()}>{dataLocalization.Add_New_Address}</Button>
                                </IonCard>
                            </IonCol>
                        </>
                        : <IonCardHeader className='header'>
                            <IonChip>
                                <IonLabel color='black'>{dataLocalization.No_Address_found}</IonLabel>
                            </IonChip>
                        </IonCardHeader>
                }
            </IonRow>
            {defaultShow &&
                <IonRow>
                    <AddressForm defaultValues={defaultvalue} isEdit={isEdit} isAddress={filteredData.length > 0} />
                </IonRow>
            }
            {
                (URLParamSell) &&
                <IonRow>
                    <IonCol size='12' className='ion-text-center sell-devices-btn-back'>
                        <Button variant="contained" onClick={() => routerHandler()}>{dataLocalization.Back}</Button>
                    </IonCol>
                </IonRow>
            }

            {/* <IonAlert isOpen={URLParamSell}
                cssClass={'custom-alert-order'}
                header='Inforamtion...'
                subHeader='We are just two steps away from completing your order.' /> */}

            <IonAlert isOpen={isRemoveAlertOpen}
                onDidDismiss={() => setIsRemoveAlertOpen(false)}
                header={"Confirmation"}
                subHeader={dataLocalization.Are_You_Sure_To_Delete}
                buttons={[{
                    text: "Yes",
                    handler: () => RemoveAddressHandler(removedId)
                }, {
                    text: "No",
                    handler: () => setIsRemoveAlertOpen(false)
                }]} />
        </IonGrid >
    )
}

export default AddressHome