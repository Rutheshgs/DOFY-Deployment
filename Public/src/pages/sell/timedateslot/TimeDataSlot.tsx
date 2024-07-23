import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IonAlert, IonCard, IonCardHeader, IonChip, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonRow, IonText } from "@ionic/react";
import { caretBackOutline, caretForwardOutline, close, informationCircle, swapVerticalOutline } from "ionicons/icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { addressPageChange } from "../../../features/reducers/address/AddressPageChange.Reducers";
import { useTypedDispatch, useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";

import AppointmentSlotMasterServices from "../../../services/AppointmentSlotMaster.Services";
import SellOrderServices from "../../../services/order/sell/SellOrder.Services";
import { IAppointmentModel } from "../../../models/Appointment.Model";
import { IAppointmentSlotModel } from "../../../models/AppointmentSlot.Model";

import { ISellOrderModel } from "../../../models/order/sell/SellOrder.Model";
import { HelperConstant } from "../../../components/helper/HelperConstant";
import { Direction, ResponsiveItemPerView, currencyByCountry, getLocalStorage, getUserLocationForParam, toAmount } from "../../../components/helper/Helper";
import { CustomImg } from "../../../components/shared/CustomImage";
import { getUserLanguage } from '../../../components/helper/Helper';
import Language from "./TimeDataSlotLanguage.json";

import moment from "moment";

import "./TimeDataSlot.css";
import RefferalCodeServices from "../../../services/RefferalCode.Services";
import { Button } from "@mui/material";

interface InputParams {
    id: any;
}

function TimeDataSlot() {

    const { id } = useParams<InputParams>();
    SwiperCore.use([Autoplay]);

    const dispatch = useTypedDispatch();
    const history = useHistory();

    const personId = getLocalStorage().PersonId;

    const addressId = useTypedSelector((state) => state.InputParamChangeReducer.AddressId);
    const rescheduleOrderId = useTypedSelector(state => state.OrdersReducer.orderId);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    let dataLocalization = Language[getUserLanguage()];

    const [slotDate, setSlotDate] = useState<any>();
    const [slotSession, setSlotSession] = useState({ StartTime: "", EndTime: "", Id: 0 });
    const [orderSummary, setOrderSummary] = useState<ISellOrderModel>({} as ISellOrderModel);
    const [slotList, setSlotList] = useState<Array<IAppointmentSlotModel>>([]);
    const [referralCodeMessage, setReferralCodeMessage] = useState<string>("");

    const codeUsedInMultiOrders = "Pending order have Promo Code";
    const referralCodeIn = "NEW100";
    const referralCodeAe = "NEW50";

    const referralCode = getUserLanguage() === "in_en" ? referralCodeIn : referralCodeAe;

    const currentDate = new Date();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const getSlots = (slotList: Array<IAppointmentSlotModel>) => {
        return <Swiper slidesPerView={ResponsiveItemPerView(2, 4, 3.5)} modules={[Navigation]} pagination={{ clickable: true }} rewind={false} navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
        }}>
            {slotList.filter((value, index, self) => index === self.findIndex((t) => (t.EventDate === value.EventDate)))
                .map((val, i) => (
                    <SwiperSlide key={i}>
                        {/* <IonRadio className="tds-slot-check" onClick={() => setSlotDate(val.EventDate)}></IonRadio> */}
                        <IonCard className={`slot-date-card ${slotDate == val.EventDate && 'slot-date-card-selected'} ${moment(val.EventDate).format("MMM Do YY") === moment(currentDate).format("MMM Do YY") && 'slot-date-card-express'} `}
                            onClick={() => { setSlotDate(val.EventDate); setSlotSession({ StartTime: "", EndTime: "", Id: 0 }) }}>
                            {moment(val.EventDate).format("MMM Do YY") === moment(currentDate).format("MMM Do YY") ?
                                <IonCardHeader className="express-pickup">
                                    <IonText className="">{dataLocalization.Express_Pickup}</IonText>
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
        const GetOrderSummary = () => {
            SellOrderServices.GetOrderSummary(id).then(res => {
                if (res.status === 200) {
                    setOrderSummary(res.data);
                    getAppointmentSlotList(res.data.ProductTypeId, res.data.ServiceTypeId, false, addressId);
                }
            }).catch((e: string) => {
                console.log(e);
            })
        }

        const getAppointmentSlotList = (productTypeId: number, serviceTypeId: number, isExpressPickup: boolean, userAddressId: number) => {
            AppointmentSlotMasterServices.GetAppointmentSlots(moment(currentDate).format('yyyy-MM-DD HH:mm'), productTypeId, serviceTypeId, isExpressPickup, userAddressId).then(res => {
                if (res.status === 200) {
                    setSlotList(res.data);
                }
            }).catch(e => {
                console.log(e);
            });
        }

        GetOrderSummary();
    }, [id]);

    return (
        <IonGrid dir={Direction()} data-aos="fade-down">
            <IonRow>
                <IonCol sizeLg='12' sizeMd='12' sizeXl='12' sizeSm='12' sizeXs='12' className='slot-choose-col' >
                    <IonText style={{ fontWeight: "900", fontSize: "20px" }}>{dataLocalization.Hi} {orderSummary.UserName}</IonText><br />
                    <IonText style={{ fontWeight: "900", fontSize: "13px" }}>{dataLocalization.Please_schedule_the_convenient_time_for_pickup}</IonText>
                </IonCol>
            </IonRow>
            <IonRow className="ion-padding-top">
                <IonCol size="7.5" sizeXl="6.5" sizeLg="6.5" sizeXs="12" className="slot-details-col">
                    <IonCard className="slot-details-card">
                        <IonRow>
                            <IonCol size="12" className="slot-details-card-inline-col">
                                <IonText>{moment(orderSummary.OrderDate).format("MMMM")}</IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="1" className="ion-text-center">
                                <IonIcon ref={navigationPrevRef} className="cursor-pointer location-button-prev" icon={caretBackOutline} />
                            </IonCol>
                            <IonCol sizeXl="10" sizeXs="10">
                                {getSlots(slotList)}
                            </IonCol>
                            <IonCol size="1" className="ion-text-center">
                                <IonIcon ref={navigationNextRef} className="cursor-pointer location-button-next " icon={caretBackOutline} />
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
                {isMobile &&
                    <IonCol size="12" className="ion-text-center slot-controlls mt-3">
                        <Button variant="contained" className="slot-prev" onClick={() => { dispatch(addressPageChange("currentaddress")) }}>{dataLocalization.Back}</Button>
                        {(slotSession.EndTime !== "" && slotSession.StartTime !== "") &&
                            <Button variant="contained" className="slot-submit" onClick={() => slotHandler()}>{dataLocalization.submit}</Button>
                        }
                    </IonCol>
                }
                <IonCol offset="0.5" offsetLg="0.5" offsetXs="0" sizeXl="5" size="4" sizeLg="5" sizeXs="12" className="slot-orders-col">
                    <IonCard className="slot-orders-card">
                        <IonRow>
                            <IonCol size="12" className="ion-padding-start">
                                <IonRow>
                                    <IonCol size="5">
                                        <IonText >{dataLocalization.Order_Summary}</IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonLabel>{dataLocalization.Order_No}:  <b>{orderSummary.OrderCode}</b></IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonCard className="slot-orders-card-inline">
                                    <IonRow>
                                        <IonCol size="5" >
                                            <IonLabel>{dataLocalization.Order_Date}</IonLabel>
                                        </IonCol>
                                        <IonCol size="7" >
                                            <IonText>{moment(orderSummary?.OrderDate).format("L")}</IonText>
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
                                            <IonLabel>{dataLocalization.Model_and_Variant}</IonLabel>
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
                                            <IonLabel>{dataLocalization.Final_Cost}</IonLabel>
                                        </IonCol>
                                        <IonCol size="7" >
                                            <IonText>{currencyByCountry(orderSummary?.Payout?.TotalAmount > 0 ? toAmount(orderSummary?.Payout?.TotalAmount) : 0)}</IonText>
                                        </IonCol>
                                    </IonRow>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                </IonCol>
            </IonRow>
            {!isMobile &&
                <IonRow className="ion-padding-top">
                    <IonCol size="12" className="ion-text-center slot-controlls">
                        <Button variant="contained" className="slot-prev" onClick={() => { dispatch(addressPageChange("currentaddress")) }}>{dataLocalization.Back}</Button>
                        {(slotSession.EndTime !== "" && slotSession.StartTime !== "") &&
                            <Button variant="contained" className="slot-submit" onClick={() => slotHandler()}>{dataLocalization.submit}</Button>
                        }
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
        </IonGrid>
    )
}

export default TimeDataSlot