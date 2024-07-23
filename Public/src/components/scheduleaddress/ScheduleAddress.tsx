import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IonAccordion, IonAccordionGroup, IonAlert, IonCard, IonCardHeader, IonChip, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonModal, IonRadio, IonRadioGroup, IonRow, IonText, isPlatform } from "@ionic/react";
import { Button } from "@mui/material";
import { caretBackOutline, caretForwardOutline, informationCircleOutline } from "ionicons/icons";

import { IAddressModel } from "../../models/Address.Model";
import MasterServices from "../../services/Master.Services";
import UserAddressServices from "../../services/UserAddress.Services";

import { ActionType } from "../../features/actiontypes/Input.ActionTypes";
import { addressPageChange } from "../../features/reducers/address/AddressPageChange.Reducers";
import { InputParamChange } from "../../features/reducers/shared/InputParams.Reducers";
import { useTypedDispatch, useTypedSelector } from "../../features/reduxhooks/ReduxHooks";

import AddressForm from "../address/form/AddressForm";
import Language from "../address/home/AddressHomeLanguage.json";
import Language1 from "../../pages/sell/timedateslot/TimeDataSlotLanguage.json";

import { Direction, ResponsiveItemPerView, authUser, countrycodenumber, currencyByCountry, getLocalStorage, getUserLanguage, getUserLocationForParam, isIn, toAmount } from "../helper/Helper";
import { HelperConstant } from "../helper/HelperConstant";

import "./ScheduleAddress.css";
import "../../pages/sell/timedateslot/TimeDataSlot.css";

import { ISellOrderModel } from "../../models/order/sell/SellOrder.Model";
import SellOrderServices from "../../services/order/sell/SellOrder.Services";
import AppointmentSlotMasterServices from "../../services/AppointmentSlotMaster.Services";

import moment from "moment";

import { IAppointmentModel } from "../../models/Appointment.Model";
import RefferalCodeServices from "../../services/RefferalCode.Services";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { IAppointmentSlotModel } from "../../models/AppointmentSlot.Model";
import { CustomImg } from "../shared/CustomImage";
import { OrderPayout } from "../orderpayout/OrderPayout";

interface InputParams {
    id: any;
}

function ScheduleAddress() {

    let dataLocalization = Language[getUserLanguage()];
    let dataLocalization1 = Language1[getUserLanguage()];

    const { id } = useParams<InputParams>();
    SwiperCore.use([Autoplay]);

    const dispatch = useTypedDispatch();
    const history = useHistory();

    const personId = getLocalStorage().PersonId;

    const addressId = useTypedSelector((state) => state.InputParamChangeReducer.AddressId);
    const rescheduleOrderId = useTypedSelector(state => state.OrdersReducer.orderId);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState(false);
    const [removedId, setRemovedId] = useState<any>(0);
    const [searchText, setSearchText] = useState<any>("");
    const [filteredData, setfilteredData] = useState<Array<IAddressModel>>([]);
    const [stateList, setStateList] = useState<Array<any>>([]);
    const [dubaiStateList, setDubaiStateList] = useState<Array<any>>([]);
    const [defaultvalue, setDefaultValue] = useState<IAddressModel>({} as IAddressModel);
    const [defaultShow, setDefaultShow] = useState<boolean>(false);
    const [changesInAddress, setChangesInAddress] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isReferral, setIsReferral] = useState<boolean>(false);
    const [slotDate, setSlotDate] = useState<any>();
    const [slotSession, setSlotSession] = useState({ StartTime: "", EndTime: "", Id: 0 });
    const [orderSummary, setOrderSummary] = useState<ISellOrderModel>({} as ISellOrderModel);
    const [slotList, setSlotList] = useState<Array<IAppointmentSlotModel>>([]);
    const [referralCodeMessage, setReferralCodeMessage] = useState<string>("");
    const [addressType, setAddressType] = useState<Array<any>>([]);
    const [selectedAddressId, setSelectedAddressId] = useState(0);
    const [selectedAccordion, setSelectedAccordion] = useState<"address" | "slot">("address");

    const codeUsedInMultiOrders = "Pending order have Promo Code";
    const referralCodeIn = "NEW100";
    const referralCodeAe = "NEW50";

    const referralCode = getUserLanguage() === "in_en" ? referralCodeIn : referralCodeAe;

    const currentDate = new Date();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

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
                // setDefaultValue(res.data.Items[0]);
                if (res.data.Items <= 0) {
                    setDefaultShow(true);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }

        setDefaultShow(defaultShow);
        getAddress(personId);
    }, [personId, searchText, defaultShow]);

    useEffect(() => {
        if (changesInAddress) {
            setSelectedAccordion("slot");
            setSelectedAddressId(addressId);
            selectSlot(addressId);
        }
        setChangesInAddress(changesInAddress);

    }, [changesInAddress]);

    const selectSlot = (addressId: any) => {
        dispatch(InputParamChange({ payload: addressId, type: ActionType.ADDRESS_ID }));
        getAppointmentSlotList(orderSummary.ProductTypeId, orderSummary.ServiceTypeId, false, addressId);
    }

    const getAppointmentSlotList = (productTypeId: number, serviceTypeId: number, isExpressPickup: boolean, userAddressId: number) => {
        AppointmentSlotMasterServices.GetAppointmentSlots(moment(currentDate).format('yyyy-MM-DD HH:mm'), productTypeId, serviceTypeId, isExpressPickup, userAddressId).then(res => {
            if (res.status === 200) {
                setSlotList(res.data);
                setSelectedAccordion("slot");
            }
        }).catch(e => {
            console.log(e);
        });
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

    const RemovePendingReferralsHandler = () => {
        RefferalCodeServices.RemoveReferralCode(referralCode, personId, 0).catch(e => {
            console.log(e);
        });
    }

    const routerHandler = () => {
        setReferralCodeMessage("");
        RemovePendingReferralsHandler();
        localStorage.removeItem("orderId");
    }

    const checkValidReferralCode = (orderId: any) => {
        RefferalCodeServices.GetReferralCode(referralCode, personId, parseInt(id)).then(res => {
            if (res.status === 200) {
                if (res.data.Message === codeUsedInMultiOrders) {
                    setReferralCodeMessage(res.data.Message);
                    setTimeout(() => {
                        routerHandler();
                        history.push(`/${getUserLanguage()}${getUserLocationForParam()}/order-summary/${orderId}`);
                    }, 3000);
                }
                else {
                    routerHandler();
                    history.push(`/${getUserLanguage()}${getUserLocationForParam()}/order-summary/${orderId}`);
                }
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const slotHandler = () => {
        let appointmentData: IAppointmentModel = {
            Id: 0,
            Created: "2022-04-13T14:40:43.424Z",
            CreatedBy: 0,
            Active: true,
            Modified: "2022-04-13T14:40:43.424Z",
            ModifiedBy: 0,
            ValidationErrors: {},
            OrderId: parseInt(id as any),
            AssigneeId: null,
            UserAddresId: addressId,
            AppointmentDate: slotDate,
            StartTime: slotSession.StartTime,
            EndTime: slotSession.EndTime,
            Remarks: "",
            TechnicianComments: "",
            RowOrder: 0,
            IsReschedule: true,
            AppointmentCity: "",
            AppointmentPincode: 0,
            address: ""
        };

        if (rescheduleOrderId === 0) {
            SellOrderServices.CreateAppointment(appointmentData).then(res => {
                if (res.status === 200) {
                    checkValidReferralCode(res.data);
                }
            }).catch((e: string) => {
                console.log(e)
            });
        }
        else {
            RescheduleOrder();
        }
    }

    const RescheduleOrder = () => {
        let RescheduleOrderData: IAppointmentModel = {
            Id: 0,
            Created: "2022-04-13T14:40:43.424Z",
            CreatedBy: 0,
            Active: true,
            Modified: "2022-04-13T14:40:43.424Z",
            ModifiedBy: 0,
            ValidationErrors: {},
            OrderId: rescheduleOrderId,
            AssigneeId: null,
            UserAddresId: addressId,
            AppointmentDate: slotDate,
            StartTime: slotSession.StartTime,
            EndTime: slotSession.EndTime,
            Remarks: "",
            TechnicianComments: "",
            RowOrder: 0,
            IsReschedule: true,
            AppointmentCity: "",
            AppointmentPincode: 0,
            address: ""
        };

        SellOrderServices.Reschedule(RescheduleOrderData).then(res => {
            if (res.status === 200) {
                window.location.href = `/${getUserLanguage()}${getUserLocationForParam()}/view-orders`;
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    useEffect(() => {
        if (isPlatform("capacitor")) {
            fetch(`${process.env.REACT_APP_PUBLIC_APP_API}Sell/getOrderSummary/${id}`, { cache: "force-cache" });
        }
        else {
            fetch(`${process.env.REACT_APP_PUBLIC_API}Sell/getOrderSummary/${id}`, { cache: "force-cache" });
        }
        const GetOrderSummary = () => {
            SellOrderServices.GetOrderSummary(id).then(res => {
                if (res.status === 200) {
                    setOrderSummary(res.data);
                }
            }).catch((e: string) => {
                console.log(e);
            })
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

        getAddressType(HelperConstant.serviceTypeId.SELL);
        GetOrderSummary();
    }, [id]);

    useEffect(() => {
        dispatch(InputParamChange({ payload: 0, type: ActionType.ADDRESS_ID }));
        authUser();
    }, [dispatch]);

    const getSlots = (slotList: Array<IAppointmentSlotModel>) => {
        return <Swiper dir={Direction()} slidesPerView={ResponsiveItemPerView(2, 4, 3.5)} modules={[Navigation]} pagination={{ clickable: true }} rewind={false} navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
        }}>
            {slotList.filter((value, index, self) => index === self.findIndex((t) => (t.EventDate === value.EventDate)))
                .map((val, i) => (
                    <SwiperSlide key={i}>
                        <IonCard className={`slot-date-card ${slotDate == val.EventDate && 'slot-date-card-selected'} ${moment(val.EventDate).format("MMM Do YY") === moment(currentDate).format("MMM Do YY") && 'slot-date-card-express'} `}
                            onClick={() => { setSlotDate(val.EventDate); setSlotSession({ StartTime: "", EndTime: "", Id: 0 }) }}>
                            {moment(val.EventDate).format("MMM Do YY") === moment(currentDate).format("MMM Do YY") ?
                                <IonCardHeader className="express-pickup">
                                    <IonText className="">{dataLocalization1.Express_Pickup}</IonText>
                                </IonCardHeader>
                                :
                                <IonCardHeader>
                                    <IonText>{moment(val.EventDate).format('ddd')}</IonText><br />
                                    <IonText>{moment(val.EventDate).format('D')?.toString().padStart(2, "0")}</IonText>
                                </IonCardHeader>
                            }
                        </IonCard>
                    </SwiperSlide>
                ))}
        </Swiper>

    }



    return (
        <IonGrid className="sca-grid" dir={Direction()} data-aos="fade-down">
            <IonRow className="ion-padding-top" >
                {defaultShow &&
                    <AddressForm defaultValues={defaultvalue} isEdit={isEdit} isAddress={filteredData.length > 0} pageFrom={"ScheduleAddress"} setDefaultShow={setDefaultShow} setChangesInAddress={setChangesInAddress} />
                }
                <IonCol size="7.5" sizeXl="6.5" sizeLg="6.5" sizeXs="12" hidden={defaultShow}>
                    <IonAccordionGroup value={selectedAccordion} onIonChange={(e) => { setSelectedAccordion(e.detail.value) }}>
                        <IonAccordion value="address" className='sa-address-choose-address'>
                            <IonItem slot="header" color="white" lines="none" >
                                <IonText className='sa-address-header'>{dataLocalization.Choose}</IonText>
                            </IonItem>
                            {/* {(selectedAccordion != "address" && selectedAddressId > 0) && */}
                            {(selectedAccordion != "address" && addressId > 0) &&
                                <IonItem slot="header" lines="none" color={"white"}>
                                    {/* <IonText style={{ fontSize: "12px" }} slot="start">
                                        {filteredData.find(x => x.Id == selectedAddressId)?.Address},&nbsp;
                                        {filteredData.find(x => x.Id == selectedAddressId)?.Address1 && <>{filteredData.find(x => x.Id == selectedAddressId)?.Address1},&nbsp;</>}
                                        {filteredData.find(x => x.Id == selectedAddressId)?.LandMark && <>{filteredData.find(x => x.Id == selectedAddressId)?.LandMark},&nbsp;</>}
                                        {filteredData.find(x => x.Id == selectedAddressId)?.PinCode ? filteredData.find(x => x.Id == selectedAddressId)?.PinCode : filteredData.find(x => x.Id == selectedAddressId)?.LocationPin},&nbsp;
                                        {filteredData.find(x => x.Id == selectedAddressId)?.MobilePhone}
                                    </IonText> */}
                                    <IonText style={{ fontSize: "12px", overflow: "auto" }}>
                                        {filteredData.find(x => x.Id == addressId)?.Address},&nbsp;
                                        {filteredData.find(x => x.Id == addressId)?.Address1 && <>{filteredData.find(x => x.Id == addressId)?.Address1},&nbsp;</>}
                                        {filteredData.find(x => x.Id == addressId)?.LandMark && <>{filteredData.find(x => x.Id == addressId)?.LandMark},&nbsp;</>}
                                        {filteredData.find(x => x.Id == addressId)?.PinCode ? filteredData.find(x => x.Id == addressId)?.PinCode : filteredData.find(x => x.Id == addressId)?.LocationPin},&nbsp;
                                        {countrycodenumber (filteredData.find(x => x.Id == addressId)?.MobilePhone)}
                                    </IonText>
                                    {/* <Button variant="outlined" size="small" slot={isMobile ? "start" : "end"}>Modify</Button> */}
                                    <Button variant="outlined" size="small" slot={"end"}>Modify</Button>
                                </IonItem>
                            }
                            <IonRow slot="content">
                                <IonCol className='sa-add-address-card' size='12'>
                                    <Button size="small" variant="contained" onClick={() => addNewAddressHandler()}>{dataLocalization.Add_New_Address}</Button>
                                </IonCol>
                                <IonCol size="12">
                                    {/* <IonRadioGroup value={addressId}> */}
                                    <IonRadioGroup value={addressId.toString()}>
                                        {
                                            filteredData && filteredData.length > 0 ?
                                                <>
                                                    {filteredData.map((val: IAddressModel, i: number) => {
                                                        return <IonItem key={i} color={"white"} style={{ marginBottom: "15px", zIndex: "2", borderBottom: "1px solid rgb(216, 218, 218)" }} lines={"none"}>
                                                            {/* <IonRadio slot="start" value={val.Id} style={{ marginRight: "10px" }} onClick={() => { setSelectedAddressId(val.Id); setSlotSession({ StartTime: "", EndTime: "", Id: 0 }); setSlotDate(""); selectSlot(val.Id) }}></IonRadio> */}
                                                            <IonRadio slot="start" value={val.Id.toString()} style={{ marginRight: "10px" }} onClick={() => { setSelectedAddressId(val.Id); setSlotSession({ StartTime: "", EndTime: "", Id: 0 }); setSlotDate(""); selectSlot(val.Id); dispatch(InputParamChange({ payload: val.Id, type: ActionType.ADDRESS_ID })); }}></IonRadio>
                                                            {isIn() ?
                                                                <IonRow style={{ width: "100%" }}>
                                                                    <IonCol size="12">
                                                                        {!isMobile &&
                                                                            <IonText>{val.Name}</IonText>
                                                                        }
                                                                        {isMobile &&
                                                                            <IonItem lines="none" color={"white"} className="sa-custom-ion-item">
                                                                                <IonLabel style={{ overFlow: "unset", textOverFlow: "unset" }} className="--dofy-color-primary-new">{val.Name}</IonLabel>
                                                                                <IonText className='sa-address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</IonText>&nbsp;&nbsp;
                                                                                <IonText onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} className='sa-address-controlls'>Delete</IonText>
                                                                            </IonItem>
                                                                        }
                                                                        <IonItem lines="none" color={"white"} className="sa-custom-ion-item">
                                                                            <IonText>
                                                                                {val.Address},&nbsp;
                                                                                {val.Address1 && <>{val.Address1},&nbsp;</>}
                                                                                {val.LandMark && <>{val.LandMark},&nbsp;</>}
                                                                                {(stateList.length > 0) && <>{stateList.find(x => x.Id === val.StateId)?.Name} - {val.PinCode ? val.PinCode : val.LocationPin}</>},&nbsp;
                                                                                {countrycodenumber( val.MobilePhone)}
                                                                            </IonText>
                                                                            {!isMobile &&
                                                                                <>
                                                                                    <IonText slot="end" className='sa-address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</IonText>
                                                                                    <IonText slot="end" onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} className='sa-address-controlls'>Delete</IonText>
                                                                                </>
                                                                            }
                                                                        </IonItem>
                                                                    </IonCol>
                                                                </IonRow>
                                                                :
                                                                <IonRow style={{ width: "100%" }}>
                                                                    <IonCol size="12">
                                                                        {!isMobile &&
                                                                            <IonText>{val.Name}</IonText>
                                                                        }
                                                                        {isMobile &&
                                                                            <IonItem lines="none" color={"white"} className="sa-custom-ion-item">
                                                                                <IonLabel slot="start" className="--dofy-color-primary-new">{val.Name}</IonLabel>
                                                                                <IonText slot="end" className='sa-address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</IonText>
                                                                                <IonText slot="end" onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} className='sa-address-controlls'>Delete</IonText>
                                                                            </IonItem>
                                                                        }
                                                                        <IonItem color={"white"} lines="none" className="sa-custom-ion-item">
                                                                            <IonText>
                                                                                {val.Address},&nbsp;
                                                                                {val.Address1 && <>{val.Address1},&nbsp;</>}
                                                                                {val.LandMark && <>{val.LandMark},&nbsp;</>}
                                                                                {dubaiStateList.find(x => x.Id === val.StateId)?.Name} - {val.PinCode},<br/>
                                                                                <IonText dir="ltr">
                                                                                {countrycodenumber(val.MobilePhone)}
                                                                            </IonText>
                                                                            </IonText>
                                                                            
                                                                            {!isMobile &&
                                                                                <>
                                                                                    <IonText slot="end" className='sa-address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</IonText>
                                                                                    <IonText slot="end" onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} className='sa-address-controlls'>Delete</IonText>
                                                                                </>
                                                                            }
                                                                        </IonItem>
                                                                    </IonCol>
                                                                </IonRow>
                                                            }
                                                        </IonItem>
                                                    })}
                                                </>
                                                : <IonCardHeader className='header'>
                                                    <IonChip>
                                                        <IonLabel color='black'>{dataLocalization.No_Address_found}</IonLabel>
                                                    </IonChip>
                                                </IonCardHeader>
                                        }
                                    </IonRadioGroup>
                                </IonCol>
                            </IonRow>
                        </IonAccordion>
                        <IonAccordion disabled={addressId == 0} value="slot" className='sa-address-choose-address'>
                            <IonItem slot="header" color="white" lines="none">
                                <IonText className='sa-address-header'>{dataLocalization1.Please_schedule_the_convenient_time_for_pickup}</IonText>
                            </IonItem>
                            {(selectedAccordion != "slot" && slotDate != "" && slotSession.StartTime != "") &&
                                <IonItem slot="header" lines="none" color={"white"}>
                                    <Button variant="outlined" size="small" slot="start" className="mr-3">{moment(slotDate).format('DD/MM/YYYY')}</Button>
                                    <Button variant="outlined" size="small" slot="start">{moment(slotSession.StartTime).format('LT')}&nbsp;to&nbsp;{moment(slotSession.EndTime).format('LT')}</Button>
                                </IonItem>
                            }
                            <IonRow slot="content">
                                <IonCol size="12" sizeXl="12" sizeLg="12" sizeXs="12" className="slot-details-col">
                                    <IonCard className="slot-details-card">
                                        <IonRow>
                                            <IonCol size="12" className="slot-details-card-inline-col">
                                                <IonText>{moment(orderSummary.OrderDate).format("MMMM")}</IonText>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol size="1" className="ion-text-center">
                                                <IonIcon ref={navigationPrevRef} className="cursor-pointer location-button-prev" icon={getUserLanguage() == 'ae_ar' ? caretForwardOutline : caretBackOutline} />
                                            </IonCol>
                                            <IonCol sizeXl="10" sizeXs="10">
                                                {getSlots(slotList)}
                                            </IonCol>
                                            <IonCol size="1" className="ion-text-center">
                                                <IonIcon ref={navigationNextRef} className="cursor-pointer location-button-next " icon={getUserLanguage() == 'ae_ar' ? caretBackOutline : caretForwardOutline} />
                                            </IonCol>
                                        </IonRow>
                                        {slotList.length > 0 &&
                                            <IonRow className="slot-date-row">
                                                {slotList.filter(it => it.EventDate === slotDate).map((val: IAppointmentSlotModel, index: number) => (
                                                    <IonCol sizeLg="4" sizeMd="4" sizeXs="4" key={index}>
                                                        <IonCard className={`slot-date-card ${slotSession.Id == val.Id ? 'slot-chip-checked' : ''}`} onClick={() => { setSlotSession({ StartTime: val.StartTime, EndTime: val.EndTime, Id: val.Id }) }}>
                                                            <IonRow>
                                                                <IonCol size="12" className="p-0">
                                                                    <IonRow style={{ marginBottom: "3px" }}>
                                                                        <IonCol size="12" style={{ fontSize: "12px" }}>
                                                                            {moment(val.StartTime).format('LT')}
                                                                        </IonCol>
                                                                    </IonRow>
                                                                    <IonRow style={{ borderBottom: slotSession.Id == val.Id ? "0.8px dotted white" : "0.8px dotted #1E4496" }}>
                                                                        <IonText className="slot-switch-icon">to</IonText>
                                                                    </IonRow>
                                                                    <IonRow style={{ marginTop: "3px" }}>
                                                                        <IonCol size="12" style={{ fontSize: "12px" }}>
                                                                            {moment(val.EndTime).format('LT')}
                                                                        </IonCol>
                                                                    </IonRow>
                                                                </IonCol>
                                                            </IonRow>
                                                        </IonCard>
                                                    </IonCol>
                                                ))}
                                            </IonRow>
                                        }
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonAccordion>
                    </IonAccordionGroup>
                    {isMobile &&
                        <IonRow>
                            <IonCol size="12" className="ion-text-center slot-controlls">
                                <Button style={{ width: "45%" }} variant="outlined" className="prev-btn" onClick={() => { history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-device-details/${id}`) }}>{dataLocalization.Back}</Button>
                                <Button style={{ width: "45%" }} variant="contained" disabled={(slotSession.EndTime == "" && slotSession.StartTime == "")} className="slot-submit" onClick={() => slotHandler()}>{dataLocalization1.submit}</Button>
                            </IonCol>
                        </IonRow>
                    }
                </IonCol>
                <IonCol offset="0.5" offsetLg="0.5" offsetXs="0" sizeXl="5" size="4" sizeLg="5" sizeXs="12" className="slot-orders-col">
                    <IonCard className="slot-orders-card">
                        <IonRow>
                            <IonCol size="12" className="ion-padding-start">
                                <IonRow>
                                    <IonCol size="5">
                                        <IonText >{dataLocalization1.Order_Summary}</IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonLabel>{dataLocalization1.Order_No}:  <b>{orderSummary.OrderCode}</b></IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonCard className="slot-orders-card-inline">
                                    <IonRow>
                                        <IonCol size="5" >
                                            <IonLabel>{dataLocalization1.Order_Date}</IonLabel>
                                        </IonCol>
                                        <IonCol size="7" >
                                            <IonText>{moment(orderSummary?.OrderDate).format("DD/MM/YYYY")}</IonText>
                                        </IonCol>
                                    </IonRow>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12">
                                <IonCard className="slot-orders-card-inline-details">
                                    <IonRow>
                                        <IonCol sizeLg="12" sizeXs="12">
                                            <IonRow>
                                                <IonCol size="5" className="slot-orders-card-inline-card slot-orders-card-inline-card-0">
                                                    <CustomImg src={`${HelperConstant.imageAPI}/${orderSummary?.BrandThumbnailPath}`} alt={`sell${orderSummary?.ThumbnailPath}`} className={`${getUserLanguage() === "ae_ar" ? "tds-device-img-ar" : "tds-device-img"}`} />
                                                </IonCol>
                                                <IonCol size="7" className={`${getUserLanguage() === "ae_ar" ? "tds-combine-ar" : "tds-combine"}`}>
                                                    <IonLabel>{orderSummary.BrandMasterName}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12">
                                <IonCard className="slot-orders-card-inline-details">
                                    <IonRow>
                                        <IonCol size="5" >
                                            <IonLabel>{dataLocalization1.Model_and_Variant}</IonLabel>
                                        </IonCol>
                                        <IonCol size="7" >
                                            <IonText>{orderSummary?.SeriesModelName}-{orderSummary?.ModelVariantName}</IonText>
                                        </IonCol>
                                    </IonRow>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12">
                                <IonCard className="slot-orders-card-inline-cost">
                                    <IonRow>
                                        <IonCol size="5" >
                                            <IonLabel>{dataLocalization1.Final_Cost}</IonLabel>
                                        </IonCol>
                                        <IonCol size="7" >
                                            <IonText>{currencyByCountry(orderSummary?.Payout?.TotalAmount > 0 ? toAmount(orderSummary?.Payout?.TotalAmount) : 0)}</IonText>
                                            <IonIcon title='' className='cursor-pointer' src={informationCircleOutline} onMouseLeave={() => setIsReferral(false)} onMouseEnter={() => setIsReferral(true)} />
                                        </IonCol>
                                    </IonRow>
                                </IonCard>
                                {isReferral &&
                                    <OrderPayout orderPayout={orderSummary} ReferralCode={orderSummary.ReferralCode} setIsReferral={setIsReferral} />
                                }
                            </IonCol>
                        </IonRow>
                    </IonCard>
                </IonCol>
            </IonRow>
            {!isMobile &&
                <IonRow className="ion-padding-top">
                    <IonCol size="12" className="ion-text-center slot-controlls">
                        <Button variant="outlined" className="prev-btn" onClick={() => { history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-device-details/${id}`) }}>{dataLocalization.Back}</Button>
                        <Button disabled={(slotSession.EndTime == "" && slotSession.StartTime == "")} variant="contained" className="slot-submit" onClick={() => slotHandler()}>{dataLocalization1.submit}</Button>
                    </IonCol>
                </IonRow>
            }
            <IonAlert
                isOpen={referralCodeMessage === codeUsedInMultiOrders}
                header={"Info"}
                message={`Your pending ${referralCode} code is expired`}
                buttons={[
                    {
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            setReferralCodeMessage("");
                        },
                    }
                ]}
            />

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

export default ScheduleAddress