import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IonButton, IonCard, IonCardHeader, IonCol, IonGrid, IonIcon, IonItemDivider, IonLabel, IonModal, IonRadio, IonRadioGroup, IonRow, IonSegment, IonSegmentButton, IonText } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { addressPageChange } from "../../../features/reducers/address/AddressPageChange.Reducers";
import { useTypedDispatch, useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";

import AppointmentSlotMasterServices from "../../../services/AppointmentSlotMaster.Services";
import RepairOrderServices from "../../../services/order/repair/RepairOrder.Services";
import { IAppointmentModel } from "../../../models/Appointment.Model";
import { IAppointmentSlotModel } from "../../../models/AppointmentSlot.Model";

import moment from "moment";
import { RepairTimeDateSlotData } from "./RepairTimeDateSlotData";
import { HelperConstant } from "../../../components/helper/HelperConstant";
import { ISellOrderModel } from "../../../models/order/sell/SellOrder.Model";
import SellOrderServices from "../../../services/order/sell/SellOrder.Services";
import { CustomImg } from "../../../components/shared/CustomImage";
import { currencyByCountry, getUserLocationForParam, toAmount } from "../../../components/helper/Helper";
import { getUserLanguage } from '../../../components/helper/Helper';

import Language from "./RepairTimeDataSlotLanguage.json";


interface InputParams {
    id: string;
}

function RepairTimeDataSlot() {

    const { id } = useParams<InputParams>();
    let history = useHistory();
    let dataLocalization = Language[getUserLanguage()];



    let dispatch = useTypedDispatch();

    const [orderSummary, setOrderSummary] = useState<ISellOrderModel>();
    const [repairtimedateslotdata] = useState(RepairTimeDateSlotData);

    let addressId = useTypedSelector((state) => state.InputParamChangeReducer.AddressId);
    let rescheduleOrderId = useTypedSelector(state => state.OrdersReducer.orderId);

    const [slotTime, setSlotTime] = useState<Date>();
    const [slotSession, setSlotSession] = useState({ StartTime: "", EndTime: "" });

    const [session, setSession] = useState([])
    const [isModelOpen, setIsModelOpen] = useState(false);

    useEffect(() => {
        const GetOrderSummary = () => {
            SellOrderServices.GetOrderSummary(id).then(res => {
                if (res.status === 200) {
                    setOrderSummary(res.data);
                }
            }).catch((e: string) => {
                console.log(e)
            })
        }
        GetOrderSummary();
    }, [id]);

    const dateConverter = () => {
        let dates = [];
        let days = 11;
        let dateIn = new Date();

        for (let i = 1; i < days; i++) {
            let Weeks = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

            let future10 = new Date(dateIn.getTime() + (i * 24 * 60 * 60 * 1000));

            let dayName = Weeks[future10.getDay()];
            let day = future10.getDate();

            dates[i] = (
                <IonCol key={i} sizeMd="2.2" size="4">
                    <IonRadio className="slot-check" onClick={() => getAppointmentSlotMaster(future10)}></IonRadio>
                    <IonCard className="timeslot-select-date">
                        <IonCardHeader>
                            <IonText className="slot-date">{dayName}</IonText><br />
                            <IonText className="slot-day">{day.toString().padStart(2, "0")}</IonText>
                        </IonCardHeader>
                    </IonCard>
                </IonCol>
            )
        }
        return dates
    }

    const slotHandler = () => {
        let appointmentData: IAppointmentModel = {
            Id: 0,
            Created: "2022-04-13T14:40:43.424Z",
            CreatedBy: 0,
            Active: true,
            address: "",
            Modified: "2022-04-13T14:40:43.424Z",
            ModifiedBy: 0,
            ValidationErrors: {},
            OrderId: parseInt(id as any),
            AssigneeId: null,
            UserAddresId: addressId,
            AppointmentDate: slotTime,
            StartTime: slotSession.StartTime,
            EndTime: slotSession.EndTime,
            Remarks: "",
            TechnicianComments: "",
            RowOrder: 0,
            IsReschedule: true,
            AppointmentCity: "",
            AppointmentPincode: 0
        };

        if (rescheduleOrderId === 0) {
            RepairOrderServices.CreateAppointment(appointmentData).then(res => {
                if (res.status === 200) {
                    history.push(`/${getUserLanguage()}${getUserLocationForParam()}/ordersummary/${res.data}`);
                }
            }).catch((e: string) => {
                console.log(e)
            });
        }
        else {
            RescheduleOrder();
        }
        setIsModelOpen(false)
    }

    const getAppointmentSlotMaster = (slotTime: any) => {
        const result = moment(slotTime).format('') as any;
        AppointmentSlotMasterServices.getAppointmentSlotList(result)
            .then(res => {
                if (res.status === 200) {
                    setSession(res.data);
                    setSlotTime(slotTime);
                }
            }).catch((e: string) => {
                console.log(e);
            });
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
            AppointmentDate: slotTime,
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

        RepairOrderServices.Reschedule(RescheduleOrderData).then(res => {
            if (res.status === 200) {
                window.location.href = `/${getUserLanguage()}${getUserLocationForParam()}/view-orders`;
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    return (
        <IonGrid className="slot-grid ion-padding">
            <IonRow className='address-header-row'>
                <IonCol>
                    <IonText className='address-header-text'>
                        <IonIcon icon={arrowBack} onClick={() => { dispatch(addressPageChange("currentaddress")) }} className="cursor-pointer" /> {dataLocalization.Date_Time_for_pickup}
                    </IonText>
                </IonCol>
            </IonRow>
            <IonRow className='address-header-row-color'>
                <IonCol>
                    <IonText >{dataLocalization.Order_Details}</IonText>
                    {/* <IonButton
                        expand="block"
                        onClick={() =>
                        present({
                        buttons: [{ text: 'Ok' }, { text: 'Cancel' }],
                        header: 'Action Sheet'
                      })
                    }
                    > Show ActionSheet
                    </IonButton> */}
                </IonCol>
            </IonRow>
            <IonRow className='os-product-row-header'>
                <IonCol sizeMd='3' size='6' className='ion-text-center'>
                    <IonText>{dataLocalization.Product}</IonText><br /><br />
                    <CustomImg src={`${HelperConstant.imageAPI}/${orderSummary?.ThumbnailPath}`} alt={orderSummary?.ThumbnailPath} style={{ height: "80px" }} />
                </IonCol>
                <IonCol sizeMd='2' size='6' className='ion-text-center'>
                    <IonText>{dataLocalization.Brand_Name}</IonText><br /><br />
                    <IonText className='os-product-row-body-text'>{orderSummary?.BrandMasterName}</IonText>
                </IonCol>
                <IonCol sizeMd='2' size='6' className='ion-text-center'>
                    <IonText>Product Description</IonText><br /><br />
                    <IonText className='os-product-row-body-text'>{orderSummary?.SeriesModelName}</IonText><br />
                    <IonText className='os-product-row-body-text'>( {orderSummary?.ModelVariantName ? orderSummary.ModelVariantName : orderSummary?.SeriesModelColor} )</IonText>
                </IonCol>
                <IonCol sizeMd='2' size='6' className='ion-text-center'>
                    <IonText>{dataLocalization.Service_Type}</IonText><br /><br />
                    <IonText className='os-product-row-body-text'>{orderSummary?.ServiceType}</IonText><br />
                    {/* <IonText className='os-product-row-body'>{orderSummary.ProductTypeName}</IonText> */}
                </IonCol>
                <IonCol sizeMd='3' size='6' className='ion-text-center'>
                    <IonText>{dataLocalization.Final_Cost}</IonText><br /><br />
                    <IonText className='os-product-row-body-text'>{currencyByCountry((orderSummary?.Payout?.SuggestedCost) ? toAmount(orderSummary?.Payout?.SuggestedCost) : 0)}</IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="6">
                    <IonRadioGroup>
                        <IonRow>
                            <IonCol size="12">
                                <IonText className="slot-text">{dataLocalization.Please_Select_your_Preferable}</IonText>
                            </IonCol>
                            {
                                dateConverter()
                            }
                        </IonRow>
                    </IonRadioGroup>
                </IonCol>
                <IonCol size="6">
                    <IonRow>
                        <IonText className="slot-text ">{dataLocalization.Price_Summary}</IonText>
                    </IonRow>
                    <IonGrid className="pricesummary_body">
                        <IonRow>
                            <IonCol size="6">
                                <IonText className='ion-text-center ps_heading'>{dataLocalization.Repair_Parts_Name}</IonText>
                            </IonCol>
                            <IonCol size="6">
                                <IonText className='ion-text-center ps_heading'>{dataLocalization.Amount}</IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeLg="6">
                                <IonRow>
                                    {orderSummary?.RepairParts.filter(x => x.ServiceCharge !== null).map((item, index) => {
                                        return (
                                            <IonCol key={index} size="12">
                                                <IonText className='ion-text-center'>{item.RepairTypeName}</IonText>
                                            </IonCol>
                                        )
                                    })}
                                </IonRow>
                            </IonCol>
                            <IonCol sizeLg="6">
                                <IonRow>
                                    {orderSummary?.RepairParts.filter(x => x.ServiceCharge !== null).map((item, index) => {
                                        return (
                                            <IonCol key={index} sizeLg="12">
                                                <IonText className='ion-text-center'>{currencyByCountry((item.ServiceCharge) ? toAmount(item.ServiceCharge) : 0)}</IonText>
                                            </IonCol>
                                        )
                                    })}
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonItemDivider />

                        <IonRow>
                            <IonCol size="6">
                                <IonText className='ion-text-center ps_priceamount'>{dataLocalization.Total_Amount}</IonText>
                            </IonCol>
                            <IonCol size="6">
                                <IonText className='ion-text-center ps_priceamount'>{currencyByCountry((orderSummary?.Payout?.SuggestedCost) ? toAmount(orderSummary?.Payout?.SuggestedCost) : 0)}</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="6">
                    {session.length > 0 &&
                        <IonRow>
                            <IonCol size="12">
                                <IonText className="slot-text">{dataLocalization.Your_availability_on_that_day}</IonText>
                            </IonCol>
                            <IonCol size="12">
                                <IonSegment>
                                    <IonRow>
                                        {session.map((val: IAppointmentSlotModel, i: number) => (
                                            <IonCol key={i} size={`4`}>
                                                <IonSegmentButton value={val.Id as any} onClick={() => { setSlotSession({ StartTime: val.StartTime, EndTime: val.EndTime }) }}>
                                                    <IonLabel>
                                                        {moment(val.StartTime).format('LT')} TO {moment(val.EndTime).format('LT')}
                                                    </IonLabel>
                                                </IonSegmentButton>
                                            </IonCol>
                                        ))}
                                    </IonRow>
                                </IonSegment>
                            </IonCol>
                        </IonRow>
                    }
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol offsetLg="9">
                    <IonButton color="white" class="sell-devices-btn-pre" onClick={() => { dispatch(addressPageChange("currentaddress")) }}>{dataLocalization.Previous}</IonButton>
                    {(slotSession.EndTime !== "" && slotSession.StartTime !== "") &&
                        <IonCol className="ion-text-center mt-3">
                            <IonButton color="white" onClick={() => setIsModelOpen(true)}>{dataLocalization.Continue}</IonButton>
                        </IonCol>
                    }
                </IonCol>
            </IonRow>
            <IonModal
                isOpen={isModelOpen}
                canDismiss={true}
                onDidDismiss={() => setIsModelOpen(false)}>
                <IonRow>
                    <IonCol sizeLg="11" className="repair-space" offsetLg="1">
                        <IonText className="repair-inst-title ion-margin">{dataLocalization.Our_Agents_are_frequently}</IonText><br />
                        <IonText className="repair-inst-titles">{dataLocalization.Requesting_to_do_the_following}</IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    {repairtimedateslotdata.map((value, i) => {
                        return <IonCol sizeLg="3" key={i} className="repair-space">
                            <CustomImg src={value.UserImage} style={{ height: '100px' }} />
                        </IonCol>
                    })}
                </IonRow>
                <IonRow>
                    {repairtimedateslotdata.map((value, i) => {
                        return <IonCol key={i} sizeLg="3" className="repair-inst-text ion-text-center ion-margin-right">
                            <IonText>{value.Name}</IonText>
                        </IonCol>
                    })}
                </IonRow>
                <IonRow>
                    <IonCol className="repair-space ion-margin" offsetLg="5.3" >
                        <IonButton color="white" class="sell-devices-btn-pre" onClick={() => slotHandler()}>ok</IonButton>
                    </IonCol>
                </IonRow>
            </IonModal>
        </IonGrid>
    )
}

export default RepairTimeDataSlot	