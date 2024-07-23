import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { InputParamChange } from '@/features/reducers/shared/InputParams.Reducers';
import { useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { ActionType } from '@/features/actiontypes/Input.ActionTypes';
import UserAddressServices from '@/services/UserAddress.Services';
import MasterServices from '@/services/Master.Services';
import { IAddressModel } from '@/models/Address.Model';
import "./AddressHome.css";
import { countrycodenumber, findWindow, findedLocation, getUserLocationForParam } from '../../helper/Helper';
import { HelperConstant } from '../../helper/HelperConstant';
import { getUserLanguage } from '@/components/helper/Helper';
import Language from "./AddressHomeLanguage.json";
import { Button } from '@mui/material';
import AddressForm from '../form/AddressForm';
import { addressPageChange, userAddressData } from '@/features/reducers/address/AddressPageChange.Reducers';
import dynamic from 'next/dynamic';

const IonAlert = dynamic(() => import('@ionic/react').then(mod => mod.IonAlert), { ssr: false });

type AddressHomeData = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    addressHome: Array<IAddressModel>,
    personId: any,
}

function AddressHome({ addressHome, direction, language, personId }: AddressHomeData) {

    let dataLocalization = Language[language];

    const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState(false);
    const [removedId, setRemovedId] = useState<any>(0);
    const [searchText, setSearchText] = useState<any>("");
    const [filteredData, setfilteredData] = useState<Array<IAddressModel>>([]);
    const [stateList, setStateList] = useState<Array<any>>([]);
    const [dubaiStateList, setDubaiStateList] = useState<Array<any>>([]);
    const [defaultvalue, setDefaultValue] = useState<IAddressModel>({} as IAddressModel);
    const [defaultShow, setDefaultShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    let dispatch = useTypedDispatch();
    let history = useRouter();

    let URLParamRepair = findWindow() && window.location.pathname.includes("Repairschedule");
    let URLParamSell = findWindow() && window.location.pathname.includes("schedule");

    const routerHandler = () => {
        if (URLParamRepair)
            history.push(`/${getUserLanguage()}${getUserLocationForParam(language)}/Repair-Devices-Details`);
        else
            history.back();
    }
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

        // if (addressHome.length <= 0) {
        //     setDefaultShow(true);
        // }

        const getAddress = (personId: number) => {
            UserAddressServices.GetPersonAddress(personId, findedLocation().LanguageCode, findedLocation().CountryCode).then(res => {
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

        dispatch(userAddressData(addressHome));
        searchFilter(addressHome, searchText);
        setDefaultValue(addressHome[0]);
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
            MasterServices.GetAllStateList(serviceTypeId, findedLocation().LanguageCode, findedLocation().CountryCode).then(res => {
                if (res.status === 200) {
                    setStateList(res.data);
                };
            }).catch(e => console.log(e));
        }

        const getCityList = () => {
            MasterServices.GetCityList(HelperConstant.serviceTypeId.SELL, findedLocation().LanguageCode, findedLocation().CountryCode).then(res => {
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
        // authUser();
    }, []);

    return (
        <ion-grid dir={direction}>
            <ion-row>
                <ion-col size-lg='12' size-md='12' size-xl='12' size-sm='12' size-xs='12' class='address-choose-address' >
                    <ion-text class='address-header'>{dataLocalization.Choose}</ion-text>
                </ion-col>
            </ion-row>
            <ion-row>
                {
                    filteredData && filteredData.length > 0 ?
                        <>
                            {filteredData.map((val: IAddressModel, i: number) => {
                                return <ion-col class='current-address-content' size-xl='3' size-lg='4' size-md='4' size-sm='12' size-xs='12' key={i}>
                                    <ion-card class='address-card' style={{ height: "100%" }}>
                                        <ion-row>
                                            {language === "in_en" ?
                                                <ion-col>
                                                    <ion-text> {val.Name}</ion-text><br />
                                                    <ion-text>{val.Address},{val.Address1 && <>{val.Address1},</>}</ion-text><br />
                                                    {val.LandMark ? <><ion-text>{val.LandMark},</ion-text><br /></> : ""}
                                                    <ion-text>{countrycodenumber(val.MobilePhone)}</ion-text>{val.WorkPhone ? <ion-text>,{countrycodenumber(val.WorkPhone)}</ion-text> : ""}<br />
                                                    {(stateList.length > 0 && language === "in_en") && <><ion-text>{stateList.find(x => x.Id === val.StateId)?.Name} - <ion-text>{val.PinCode ? val.PinCode : val.LocationPin}</ion-text></ion-text><br /></>}
                                                </ion-col>
                                                :
                                                <ion-col>
                                                    <ion-text>{val.Name}</ion-text><br />
                                                    <ion-text>{val.Address},{val.Address1 && <>{val.Address1},</>}</ion-text><br />
                                                    {val.ApartmentNumber ? <ion-text>{val.ApartmentNumber},</ion-text> : ""}
                                                    {val.LandMark ? <><ion-text>{val.LandMark},</ion-text><br /></> : ""}
                                                    <ion-text dir='ltr'>{countrycodenumber(val.MobilePhone)}</ion-text>,{val.WorkPhone ? <ion-text dir='ltr'>{countrycodenumber(val.WorkPhone)}</ion-text> : ""}<br />
                                                    <ion-text>{dubaiStateList.find(x => x.Id === val.StateId)?.Name} - <ion-text>{val.PinCode}</ion-text></ion-text><br />
                                                </ion-col>
                                            }
                                            <ion-col class='addhome' size='12'>
                                                {URLParamSell && <ion-text class='address-controlls' onClick={() => selectSlot(val.Id)}>Use&nbsp;|&nbsp;</ion-text>}<ion-text class='address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</ion-text>{URLParamSell ? null : <><ion-text onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} class='address-controlls'>&nbsp;|&nbsp;Delete</ion-text><ion-text onClick={() => addressHandler(val.Id, "view")} class='address-controlls'>&nbsp;|&nbsp;Clone</ion-text></>}
                                            </ion-col>
                                        </ion-row>
                                    </ion-card>
                                </ion-col>
                            })}
                            <ion-col class='add-address-card' size-xl='3' size-lg='4' size-md='4' size-sm='12' size-xs='12'>
                                <ion-card class='address-card'>
                                    <Button variant="contained" onClick={() => addNewAddressHandler()}>{dataLocalization.Add_New_Address}</Button>
                                </ion-card>
                            </ion-col>
                        </>
                        : <ion-card-header class='header'>
                            <ion-chip>
                                <ion-label color='black'>{dataLocalization.No_Address_found}</ion-label>
                            </ion-chip>
                        </ion-card-header>
                }
            </ion-row>
            {defaultShow &&
                <ion-row>
                    <AddressForm defaultValues={defaultvalue} isEdit={isEdit} isAddress={filteredData.length > 0} />
                </ion-row>
            }
            {
                (URLParamSell) &&
                <ion-row>
                    <ion-col size='12' class='ion-text-center sell-devices-btn-back'>
                        <Button variant="contained" onClick={() => routerHandler()}>{dataLocalization.Back}</Button>
                    </ion-col>
                </ion-row>
            }
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
        </ion-grid >
    )
}

export default AddressHome