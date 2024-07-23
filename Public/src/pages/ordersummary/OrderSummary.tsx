import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { IonAlert, IonCard, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonModal, IonPage, IonRow, IonText, isPlatform } from '@ionic/react';
import { checkmarkCircleOutline, informationCircleOutline, receipt } from 'ionicons/icons';

import { Filesystem, Directory } from '@capacitor/filesystem';

import "./OrderSummary.css";

import moment from "moment";
import FileSaver from "file-saver";

import { ISellOrderModel } from '../../models/order/sell/SellOrder.Model';
import SellOrderServices from '../../services/order/sell/SellOrder.Services';

import Loader from '../../components/loader/Loader';

import Footer from '../../components/footer/Footer';
import CancelOrder from '../../components/cancel/CancelOrder';
import RescheduleModal from '../../components/reschedule/RescheduleModal';

import { HelperConstant } from '../../components/helper/HelperConstant';
import { getLocalStorage, toAmount, isValidUser, getUserLanguage, Direction, getUserLocationForParam, currencyByCountry, isIn, countrycodenumber } from '../../components/helper/Helper';
import { IStatusModel } from '../../models/StatusModel';
import { CustomImg } from '../../components/shared/CustomImage';


import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { addressPageChange } from '../../features/reducers/address/AddressPageChange.Reducers';
import PersonServices from '../../services/Person.Services';
import MasterServices from '../../services/Master.Services';
import Language from "./OrderSummaryLanguage.json";
import { Button } from '@mui/material';
import { OrderPayout } from '../../components/orderpayout/OrderPayout';
import OrderTrack from '../../components/ordertrack/OrderTrack';
import CompleteAnimation from '../../components/completeanimation/CompleteAnimation';
import AssigneeDetails from '../../components/assigneedetails/AssigneeDetails';
import { pageChange } from '../../features/reducers/selldevice/PageChange.Reducer';

interface InputParam {
    id: any
}

function OrderSummary() {

    let dataLocalization = Language[getUserLanguage()];
    let { id } = useParams<InputParam>();

    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const orderPathName = window.location.pathname.includes("/view-orders-details");
    const [orderSummary, setOrderSummary] = useState<ISellOrderModel>({} as ISellOrderModel);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [Status, setStatus] = useState<Array<IStatusModel>>();
    const [isRender, setIsRender] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<any>();
    const [isReferral, setIsReferral] = useState<boolean>(false);
    const [animate, setAnimate] = useState<boolean>(false);

    const notWorking = "Not Working";
    const available = "Available";

    const statusColor = { pending: "#ffc107", scheduled: "#ffc107", completed: "#32cd32", cancelled: "#dc3545", inProgress: "#3184fd", failed: "#dc3545" };
    const [orderStaus, setOrderStatus] = useState<{ statusbar: Array<number>, orderStatus: "cancel" | "complete" | "none" }>({ statusbar: [], orderStatus: "none" });

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isDownload, setIsDownload] = useState(false);

    let dispatch = useTypedDispatch();
    let history = useHistory();

    const reshedulehandler = (ServiceTypeId: number) => {
        if (HelperConstant.serviceTypeId.SELL === ServiceTypeId) {
            dispatch(addressPageChange("timedateslot"));
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/schedule/${id}`);
        }
        else {
            dispatch(addressPageChange("repairtimedateslot"));
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/Repair-schedule/${id}`);
        }
    };


    const downloadMobileInvoice = async (file: any) => {
        const currentDate = new Date().toLocaleString().replace(/[,:\s]/g, '-');
        const path = `DOFY-${currentDate + "-" + orderSummary?.OrderCode}-Invoice.pdf`;
        Filesystem.writeFile({
            path: path,
            data: file,
            directory: Directory.Documents,
            recursive: true
        });
    }

    const downloadInvoice = () => {
        SellOrderServices.downloadInvoice(id).then(response => {
            if (response.status === 200) {
                if (isPlatform("android") || isPlatform("ios")) {
                    downloadMobileInvoice(response.data);
                    setIsDownload(true);
                    setTimeout(() => { setIsDownload(false) }, 3000);
                }
                else {
                    const byteArray = Uint8Array.from(atob(response.data).split('').map(char => char.charCodeAt(0)));
                    const blob = new Blob([byteArray], { type: 'application/pdf' });
                    const file = new File([blob], `DOFY_${orderSummary?.OrderCode}_Invoice.pdf`, { type: 'application/pdf' });
                    FileSaver.saveAs(file);
                }
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    const GetBase64ProfileImage = (personId: number) => {
        PersonServices.GetBase64ProfileImage(personId).then(res => {
            if (res.status === 200) {
                let base64ImageString = `data:image/png;base64,${res.data}`;
                setProfileImage(base64ImageString);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {

        //temp solution for safari cache
        if (isPlatform("capacitor")) {
            fetch(`${process.env.REACT_APP_PUBLIC_APP_API}Sell/getOrderSummary/${id}`, { cache: "force-cache" });
        }
        else {
            fetch(`${process.env.REACT_APP_PUBLIC_API}Sell/getOrderSummary/${id}`, { cache: "force-cache" });
        }

        const GetOrderSummary = () => {
            SellOrderServices.GetOrderSummary(id).then(res => {
                if (res.status === 200) {
                    res.data?.AssigneeDetails?.Id && GetBase64ProfileImage(res.data.AssigneeDetails.Id);
                    setOrderSummary(res.data);
                    setIsRender(true);
                    isValidUser(res.data.PersonId);
                }
            }).catch((e) => {
                console.log(e);
            });
            var resultArray = Array<any>();
            const GetAllStatus = (serviceTypeId: any) => {
                MasterServices.GetAllStatus(serviceTypeId).then(response => {
                    if (response.status === 200) {
                        setStatus(response.data);
                        Status?.forEach(element => {
                            if (!resultArray.includes(element.ExternalStatus)) {
                                resultArray.push(element.ExternalStatus);
                                if (!orderPathName) {
                                    setTimeout(() => { setAnimate(true) }, 300);
                                }
                                // setStatusGroup(resultArray)
                            }
                        });
                    }
                })
            }
            GetAllStatus(HelperConstant.serviceTypeId.SELL);
        }

        const getStatusColor = () => {
            if (orderSummary?.ExternalStatus === HelperConstant.orderStatus.InProgress) {
                return setOrderStatus({ orderStatus: "none", statusbar: [1, 2] });
            }
            if (orderSummary?.ExternalStatus === HelperConstant.orderStatus.scheduled) {
                return setOrderStatus({ orderStatus: "none", statusbar: [1] });
            }
            if (orderSummary?.ExternalStatus === HelperConstant.orderStatus.failed) {
                return setOrderStatus({ orderStatus: "cancel", statusbar: [1, 2, 3, 4] });
            }
            if (orderSummary?.ExternalStatus === HelperConstant.orderStatus.completed) {
                return setOrderStatus({ orderStatus: "complete", statusbar: [1, 2, 3, 4] });
            }
            if (orderSummary?.ExternalStatus === HelperConstant.orderStatus.cancel) {
                return setOrderStatus({ orderStatus: "cancel", statusbar: [1, 2, 3, 4] });
            }
            if (orderSummary?.ExternalStatus === HelperConstant.orderStatus.cancelled) {
                return setOrderStatus({ orderStatus: "cancel", statusbar: [1, 2, 3, 4] });
            }
        }

        GetOrderSummary();
        getStatusColor();
    }, [id, orderSummary?.ExternalStatus, statusColor.cancelled, statusColor.failed, statusColor.inProgress, statusColor.scheduled, statusColor.completed])

    const routerHandler = (type: "/view-orders") => {
        dispatch(pageChange("selectdevice"));
        history.push(`/${getUserLanguage()}${getUserLocationForParam()}${type}`);
    }
    return (
        <IonPage data-aos="zoom-out" className='os-grid'>
            {animate && <CompleteAnimation />}
            {isRender ?
                <IonContent>
                    <IonGrid className="os_padding-adjustment" dir={Direction()}>
                        <IonRow className='ion-padding-horizontal ion-padding-top'>
                            {orderSummary.ExternalStatus !== HelperConstant.orderStatus.cancel &&
                                <>
                                    {orderSummary.ServiceTypeId === HelperConstant.serviceTypeId.SELL
                                        ?
                                        <IonCol className='os-choose-col' sizeLg='10' sizeMd='9.5' sizeXs='12' >
                                            <IonText style={{ fontWeight: "900", fontSize: "20px" }}>{dataLocalization.Hi} {orderSummary.UserName ? orderSummary.UserName : getLocalStorage()?.FirstName},</IonText><br />
                                            <IonText style={{ fontWeight: "900", fontSize: "13px" }}>{dataLocalization.Your_Order_is} . {dataLocalization.Our_executive} </IonText>
                                        </IonCol>
                                        :
                                        <IonCol className='os-choose-col' sizeLg='10' sizeMd='9.5' sizeXs='12'>
                                            <IonText style={{ fontWeight: "900", fontSize: "20px" }}>{dataLocalization.Hi} {orderSummary.UserName ? orderSummary.UserName : getLocalStorage()?.FirstName},</IonText><br />
                                            <IonText style={{ fontWeight: "900", fontSize: "13px" }}>{dataLocalization.Your_order_is_placed}
                                                {dataLocalization.Fastest_possible}</IonText>
                                        </IonCol>
                                    }
                                </>
                            }

                            {!orderPathName &&
                                <IonCol sizeMd='2' sizeXl='2' sizeXs='12' sizeLg='2' className='align-self-center text-center os_retrunbtn-web'>
                                    <Button onClick={() => window.location.href = `/${getUserLanguage()}${getUserLocationForParam()}/view-orders`} variant="outlined">{dataLocalization.Return_to_Orders} &#8594;</Button>
                                </IonCol>
                            }

                        </IonRow>

                        <IonRow>
                            <IonCol sizeXl="4" sizeXs="12" sizeLg="4" sizeMd='6'>
                                <IonCard className="os-orders-card os-card-height">
                                    <IonRow>
                                        <IonCol size="12" className="ion-padding-start">
                                            <IonRow>
                                                <IonCol size='5'>
                                                    <IonText>{dataLocalization.Appointment_Details}</IonText>
                                                </IonCol>
                                                <IonCol size="7" className='ion-text-end ion-padding-end'>
                                                    <IonLabel># <b>{orderSummary?.OrderCode}</b></IonLabel>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol sizeLg='12'>
                                            <IonCard className="os-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="5" >
                                                        <IonLabel>{dataLocalization.Date}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <IonText>{moment(orderSummary?.Appointment?.AppointmentDate).format('DD/MM/YYYY')}</IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeXs="12">
                                            <IonCard className="os-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="5">
                                                        <IonLabel>{dataLocalization.Start_Time}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <IonText>{moment(orderSummary?.Appointment?.StartTime).format('LT')}</IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeXs="12">
                                            <IonCard className="os-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="5">
                                                        <IonLabel>{dataLocalization.End_Time}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <IonText>{moment(orderSummary?.Appointment?.EndTime).format('LT')}</IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>

                                        <IonCol sizeLg="12" sizeXs="12">
                                            <IonCard className="os-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="12" className='os-orders-address'>
                                                        <IonLabel>{dataLocalization.Address_Details}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="12" >
                                                        <IonText>{orderSummary?.Appointment?.Name},</IonText><br />
                                                        <IonText>{orderSummary?.Appointment?.Address}, {orderSummary?.Appointment?.Address1 ? orderSummary?.Appointment?.Address1 : null}</IonText><br /> 
                                                        {orderSummary?.Appointment?.LandMark ? <><IonText> {orderSummary.Appointment.LandMark}, </IonText><br /></> : ""}
                                                        <IonText>{orderSummary?.Appointment?.AppointmentCity}{isIn() && <> - {orderSummary?.Appointment?.AppointmentPincode}</>},</IonText><br />
                                                        <IonText dir='ltr'>{ countrycodenumber (orderSummary?.UserMobile)}{(orderSummary?.SecondaryMobile) && <>  {countrycodenumber(orderSummary?.SecondaryMobile)}</>}.</IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        {orderSummary.AssigneeDetails &&
                                            <IonCol sizeLg="12" sizeXs="12">
                                                <IonLabel className='ion-padding-start' style={{color:"#2250b2",fontWeight:'600'}}>{dataLocalization.Assignee_Details}</IonLabel>
                                                <IonCard className="os-orders-card">
                                                    <AssigneeDetails data={orderSummary.AssigneeDetails} />
                                                </IonCard>
                                            </IonCol>
                                        }
                                    </IonRow>
                                </IonCard>
                            </IonCol>
                            <IonCol sizeLg="4" sizeXs="12" sizeMd='6'>
                                <IonCard className="os-orders-card os-card-height">
                                    <IonRow>
                                        <IonCol sizeLg="12" sizeXs="12" className="ion-padding-start">
                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonText>{dataLocalization.Order_Summary}</IonText>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol sizeLg='12'>
                                            <IonCard className="os-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="5">
                                                        <IonLabel>{dataLocalization.Order_Status}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <IonText>{orderSummary?.ExternalStatus}</IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeXs="12">
                                            <IonCard className="os-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="5" >
                                                        <IonLabel >{dataLocalization.Order_Date}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <IonText >{moment(orderSummary?.OrderDate).format('DD/MM/YYYY')}</IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeXs="12" >
                                            <IonCard className="os-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol sizeLg="12" sizeXs="12" className="os-orders-card-inline-card os-orders-card-inline-card-0">
                                                        <IonRow>
                                                            <IonCol size="5">
                                                                <CustomImg src={`${HelperConstant.imageAPI}/${orderSummary?.BrandThumbnailPath}`} className={`${getUserLanguage() === "ae_ar" ? "os-device-img-ar" : "os-device-img"}`} alt='order-summary' />
                                                            </IonCol>
                                                            <IonCol size="7" className={`${getUserLanguage() === "ae_ar" ? "os-orders-card-inline-adjustment-ar" : "os-orders-card-inline-adjustment"}`}>
                                                                <IonLabel>{orderSummary.BrandMasterName}</IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeXs="12" >
                                            <IonCard className="os-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="5" >
                                                        <IonLabel>{dataLocalization.Model}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <IonText>{orderSummary.SeriesModelName}</IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeXs="12" >
                                            <IonCard className="os-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="5" >
                                                        <IonLabel>{dataLocalization.Variant}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        <IonText>{orderSummary.ModelVariantName}</IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeXs="12">
                                            <IonCard className="os-orders-card-inline-cost">
                                                <IonRow>
                                                    <IonCol size="5">
                                                        <IonLabel style={{ color: "#2250B2" }}>{dataLocalization.Final_Cost}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7" >
                                                        <IonText>{currencyByCountry(orderSummary?.Payout?.TotalAmount > 0 ? toAmount(orderSummary?.Payout?.TotalAmount) : 0)}/-</IonText>
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
                            <IonCol sizeLg="4" sizeXs="12" sizeMd='12'>
                                <IonCard className="os-orders-card os-card-height-q">
                                    <IonRow>
                                        <IonCol sizeLg="12" sizeXs="12" className="ion-padding-start">
                                            <IonRow>
                                                <IonCol>
                                                    <IonText>{dataLocalization.Device_details}</IonText>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                        {orderSummary?.QuestionnaireResponse?.filter(x => x.Threshold > 0 || x.QuestionnaireTypeId === HelperConstant.questionnaireType.DeviceAge)?.map((val: any, index) => (
                                            <IonCol sizeLg="12" sizeXs="12" sizeMd="6" key={index}>
                                                <ul className="os_chip-style">
                                                    <li className={`${index === 0 ? '' : "icon-margin"}`}>{index + 1}. {val.Question}{(val.ResponseText == notWorking) ? <i className="fa fa-thumbs-down icon-thumb"></i> : (val.ResponseText == available) ? <i className="fa fa-thumbs-up icon-thumb-up"></i> : <IonText> - {val.ResponseText}</IonText>}</li>
                                                </ul>
                                            </IonCol>
                                        ))}
                                    </IonRow>
                                    {(orderSummary.StatusId == HelperConstant.orderStatusId.completed && !IsMobile) &&
                                        <>
                                            {isDownload ?
                                                <IonCol sizeXl='1.2' offsetXl='0.8' sizeLg='2' offsetLg='0' sizeMd='2.5' offsetMd='0' sizeXs='12' offsetXs='0'>
                                                    <IonItem lines='none' className='invoice-btn'>
                                                        <IonIcon title='Download Invoice' icon={checkmarkCircleOutline} color="success" size='small' class="receiptIcon"></IonIcon>
                                                        <IonLabel>{dataLocalization.Downloaded}</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                                :
                                                <IonCol sizeXl='1.2' offsetXl='0.8' sizeLg='2' offsetLg='0' sizeMd='2.5' offsetMd='0' sizeXs='6' offsetXs='6'>
                                                    <IonItem lines='none' className='cursor-pointer invoice-btn' onClick={() => downloadInvoice()}>
                                                        <IonIcon title='Download Invoice' icon={receipt} color="dark" size='small' class="receiptIcon"></IonIcon>
                                                        <IonLabel>{dataLocalization.Invoice}</IonLabel>
                                                    </IonItem>
                                                </IonCol>
                                            }
                                        </>
                                    }
                                </IonCard>

                            </IonCol>
                            <IonCol size='12' className='text-center'>
                            </IonCol>
                            {!orderPathName &&
                                <IonCol sizeXs='12' className='align-self-center text-center os_retrunbtn-mobile mb-3'>
                                    <Button onClick={() => window.location.href = `/${getUserLanguage()}${getUserLocationForParam()}/view-orders`} className='syd-btn' variant="outlined">{dataLocalization.Return_to_Orders}&#8594;</Button>
                                </IonCol>
                            }
                        </IonRow>
                        <IonRow>
                            {orderPathName
                                ?
                                <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeXs='12' className='ion-padding-top'>
                                    <IonCard className='p-3 os_outercard-style'>
                                        <IonRow>
                                            <IonCol sizeXl='6' sizeLg='6' sizeXs='12'>
                                                <IonRow className='custom-center'>
                                                    <IonCol sizeXl='12'>
                                                        <OrderTrack activePage={orderStaus.statusbar} isCancel={orderStaus.orderStatus} />
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                            <IonCol className='ion-text-center align-self-center' sizeXl='6' sizeLg='6' sizeXs='12'>
                                                {orderSummary?.ExternalStatus === HelperConstant.orderStatus.cancel
                                                    ?
                                                    <IonCol sizeMd='12' size='12' className='ion-text-center'>
                                                        <IonText className='os-detail-header'>{dataLocalization.Your_Cancellation_Request}</IonText>
                                                    </IonCol>
                                                    :
                                                    orderSummary?.ExternalStatus === HelperConstant.orderStatus.cancelled
                                                        ?
                                                        <IonCol sizeMd='12' size='12' className='ion-text-center'>
                                                            <IonText className='os-detail-header'>{dataLocalization.Your_order_is_Cancelled}</IonText>&nbsp;
                                                            <Button variant="outlined" onClick={() => routerHandler("/view-orders")} className="vw-btn-cancel"> {dataLocalization.Back}</Button>
                                                        </IonCol>
                                                        :
                                                        orderSummary?.ExternalStatus === HelperConstant.orderStatus.completed ?
                                                            <IonCol sizeMd='12' size='12' className='ion-text-center'>
                                                                <IonText color='success' className='os-detail-headers'>{dataLocalization.Your_order_is_Completed}</IonText>&nbsp;
                                                                <Button variant="outlined" onClick={() => routerHandler("/view-orders")} className="vw-btn-cancel"> {dataLocalization.Back}</Button>
                                                            </IonCol>
                                                            :
                                                            orderSummary?.ExternalStatus === HelperConstant.orderStatus.failed ?
                                                                <IonCol sizeMd='12' size='12' className='ion-text-center'>
                                                                    <IonText color='success' className='os-detail-header'>{dataLocalization.Your_order_is_Failed}</IonText>&nbsp;
                                                                    <Button variant="outlined" onClick={() => routerHandler("/view-orders")} className="vw-btn-cancel"> {dataLocalization.Back}</Button>
                                                                </IonCol>
                                                                :
                                                                <IonCol sizeMd='12' size='12' className='ion-text-center'>
                                                                    <Button variant="contained" onClick={() => setShowModal(true)} className="vw-btn-schedule"> {dataLocalization.Reschedule}</Button>&nbsp;
                                                                    <Button variant="outlined" onClick={() => setIsModelOpen(true)} className="vw-btn-cancel"> {dataLocalization.Help}</Button>&nbsp;
                                                                    <Button variant="outlined" onClick={() => routerHandler("/view-orders")} className="vw-btn-cancel"> {dataLocalization.Back}</Button>&nbsp;
                                                                </IonCol>
                                                }
                                            </IonCol>
                                        </IonRow>
                                    </IonCard>
                                </IonCol>
                                :
                                <>
                                </>
                            }
                        </IonRow>
                        <IonRow>
                            <IonModal
                                isOpen={showModal}
                                canDismiss={true}
                                onDidDismiss={() => setShowModal(false)}
                            >
                                <RescheduleModal setShowModal={setShowModal} orderSummary={orderSummary} />
                            </IonModal>
                        </IonRow>
                        <IonRow>
                            <IonModal
                                isOpen={isModelOpen}
                                canDismiss={true}
                                onDidDismiss={() => setIsModelOpen(false)} className="cancel-modal">
                                <CancelOrder setIsModelOpen={setIsModelOpen} orderId={id} />
                            </IonModal>
                        </IonRow>
                        <IonAlert isOpen={isAlertOpen}
                            onDidDismiss={() => setIsAlertOpen(false)}
                            header={"Confirmation"}
                            subHeader={"Are you sure you want to Reschedule?"}
                            buttons={[{
                                text: "Yes",
                                handler: () => reshedulehandler(orderSummary.ServiceTypeId)
                            }, {
                                text: "No",
                                handler: () => setIsAlertOpen(false)
                            }]}
                        />
                    </IonGrid>
                    {isPlatform("mobile") || isPlatform("ios") ? <></>
                        :
                        <Footer />
                    }
                </IonContent>
                :
                <Loader />
            }
        </IonPage>
    )
}

export default OrderSummary