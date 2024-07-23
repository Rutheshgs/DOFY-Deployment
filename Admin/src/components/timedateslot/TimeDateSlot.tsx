import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IonButton, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRow, IonSegment, IonSegmentButton, IonText } from "@ionic/react";
import moment from "moment";
import { IAppointmentSlotModel } from "../../models/AppointmentSlot.Model";
import SellOrderServices from "../../services/order/sell/SellOrder.Services";
import { IAppointmentModel } from "../../models/Appointment.Model";
import AppointmentSlotMasterServices from "../../services/AppointmentSlotMaster.Services";

import "./TimeDateSlot.css"
import SellServices from "../../services/Sell.Services";
import { IGetOrderSummaryModel } from "../../models/GetOrderSummary.Model";
import { useTypedSelector } from "../../features/reduxhooks/ReduxHooks";

interface InputParams {
    orderId: any;
}

function TimeDataSlot() {

    const { orderId } = useParams<InputParams>();

    let history = useHistory();

    let urlData = history.location.pathname;

    let isReschedule = urlData.startsWith("/reschedule") ? true : false;

    const [slotDate, setSlotDate] = useState<Date>();
    const [slotSession, setSlotSession] = useState({ StartTime: "", EndTime: "", Id: 0 });
    const [slotList, setSlotList] = useState<Array<IAppointmentSlotModel>>([])
    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const [isButton, SetisButton] = useState<boolean>(false);


    const [orderSummaryInfo, setOrderSummaryInfo] = useState<IGetOrderSummaryModel>();
    const currentDate = new Date();

    const getSlots = (slotList: Array<IAppointmentSlotModel>) => {

        return slotList.filter((value, index, self) => index === self.findIndex((t) => (t.EventDate === value.EventDate)))
            .map((val, i) => (
                <IonCol key={i} sizeXl="3" sizeLg="3" sizeMd="3" sizeXs="4">
                    <IonRadio className="slot-check" onClick={() => setSlotDate(val.EventDate)}></IonRadio>
                    <IonCard className="timeslot-select-date">
                        {moment(val.EventDate).format("MMM Do YY") === moment(currentDate).format("MMM Do YY") ?
                            <IonCardHeader className="express-pickup">
                                <IonText>Express Pickup</IonText>
                            </IonCardHeader>
                            :
                            <IonCardHeader>
                                <IonText className="slot-date">{moment(val.EventDate).format('ddd')}</IonText><br />
                                <IonText className="slot-day">{moment(val.EventDate).format('D')?.toString().padStart(2, "0")}</IonText>
                            </IonCardHeader>
                        }
                    </IonCard>
                </IonCol>
            ))
    }

    const goBackBtn = () => {
        history.push(`/AgentTicketView/${orderId}`)
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
            OrderId: parseInt(orderId as any),
            AssigneeId: null,
            UserAddresId: orderSummaryInfo?.Appointment.UserAddresId,
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
        if (!isReschedule) {
            SellOrderServices.CreateAppointment(appointmentData).then(res => {
                if (res.status === 200) {
                    SellServices.OrderRetrieved(orderId).then((response: any) => {
                        if (response.status === 200) {

                            window.location.href = ("/Homepage");

                        }
                    }).catch(exception => console.log(exception));
                }
            }).catch((e: string) => {
                console.log(e)
            });
        }
        else {
            SellOrderServices.AdminReschedule(appointmentData).then(res => {
                if (res.status === 200) {
                    SetisButton(true);
                    window.location.href = ("/Homepage");
                }
            }).catch((e: string) => {
                console.log(e)
            });
        }
        SetisButton(true);

    }

    useEffect(() => {
        const getOrderSummaryById = () => {
            SellServices.GetOrderSummary(orderId).then(res => {
                if (res.status === 200) {
                    let order = res.data as IGetOrderSummaryModel;
                    setOrderSummaryInfo(order);
                    getAppointmentSlotList(res.data.ProductTypeId, res.data.ServiceTypeId, false, order.Appointment?.UserAddresId);
                }
            }).catch(e => {
                console.log(e);
            })
        }

        const getAppointmentSlotList = (productTypeId: number, serviceTypeId: number, isExpressPickup: boolean, userAddresId: number) => {
            AppointmentSlotMasterServices.GetAppointmentSlots(moment(currentDate).format('yyyy-MM-DD HH:mm'), productTypeId, serviceTypeId, isExpressPickup, userAddresId).then(res => {
                if (res.status === 200) {
                    setSlotList(res.data);
                }
            }).catch(e => {
                console.log(e);
            });
        }

        getOrderSummaryById()
    }, [orderId])

    return (
        <IonPage>
            <IonContent>
                <IonGrid style={{ paddingTop: 100 }} className="slot-grid ">
                    <IonRow>
                        <IonCol sizeLg="6" sizeMd="12" sizeXs="12">
                            <IonCol sizeXs="12">
                                <IonText className="slot-text">Please select your preferable pickup date</IonText>
                            </IonCol>
                            <IonRadioGroup>
                                <IonRow>
                                    {
                                        getSlots(slotList)
                                    }
                                </IonRow>
                            </IonRadioGroup>
                        </IonCol>
                        <IonCol sizeLg="6" sizeMd="12" sizeXs="12">
                            {slotList.length > 0 &&
                                <IonRow>
                                    <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
                                        <IonText className="slot-text">Your availability on that day</IonText>
                                    </IonCol>
                                    {IsMobile ?
                                        <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
                                            <IonSegment selectOnFocus={true} value={slotSession.Id as any}>
                                                <IonRow>
                                                    {slotList.filter(it => it.EventDate === slotDate).map((val: IAppointmentSlotModel, index: number) => (
                                                        <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12" key={index}>
                                                            <IonSegmentButton value={val.Id as any} onClick={() => { setSlotSession({ StartTime: val.StartTime, EndTime: val.EndTime, Id: val.Id }) }}>
                                                                <IonLabel>
                                                                    {moment(val.StartTime).format('LT')} TO {moment(val.EndTime).format('LT')}
                                                                </IonLabel>
                                                            </IonSegmentButton>
                                                        </IonCol>
                                                    ))}
                                                </IonRow>
                                            </IonSegment>
                                        </IonCol> :
                                        <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
                                            <IonSegment selectOnFocus={true} value={slotSession.Id as any}>
                                                {slotList.filter(it => it.EventDate === slotDate).map((val: IAppointmentSlotModel, index: number) => (
                                                    <IonSegmentButton key={index} value={val.Id as any} onClick={() => { setSlotSession({ StartTime: val.StartTime, EndTime: val.EndTime, Id: val.Id }) }}>
                                                        <IonLabel>
                                                            {moment(val.StartTime).format('LT')} TO {moment(val.EndTime).format('LT')}
                                                        </IonLabel>
                                                    </IonSegmentButton>
                                                ))}
                                            </IonSegment>
                                        </IonCol>
                                    }
                                </IonRow>
                            }
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" className="ion-text-center">
                            <IonButton color="white" class="sell-devices-btn-pre" onClick={goBackBtn}>Previous</IonButton>
                            {(slotSession.EndTime !== "" && slotSession.StartTime !== "") &&
                                <IonButton color="white" onClick={() => slotHandler()} disabled={isButton}>submit</IonButton>
                            }
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default TimeDataSlot