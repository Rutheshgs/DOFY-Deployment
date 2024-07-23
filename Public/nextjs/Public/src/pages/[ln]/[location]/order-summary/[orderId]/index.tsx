import { useEffect, useState } from 'react';
// import { Link, useParams, userouter } from '@react-router-dom';
// import { IonAlert-card, IonChip, ion-col, IonContent, IonGrid, ion-icon, ion-item, ion-label, IonModal, IonPage, IonRow, ion-text, isPlatform } from '@ionic/react';
import { checkmarkCircleOutline, informationCircleOutline, receipt, thumbsDownSharp, thumbsUpSharp } from 'ionicons/icons';

import "./OrderSummary.css";

import moment from "moment";

import { ISellOrderModel } from '@/models/order/sell/SellOrder.Model';
import SellOrderServices from '@/services/order/sell/SellOrder.Services';

// import Loader from '@/components/loader/Loader';

import Footer from '@/components/footer/Footer';

import { HelperConstant } from '@/components/helper/HelperConstant';
import { getLocalStorage, toAmount, getUserLocationForParam, currencyByCountry, Direction, getUserLanguage, findWindow, countrycodenumber, SSRDetection, capacitorDevice } from '@/components/helper/Helper';
import { IStatusModel } from '@/models/StatusModel';

import { useTypedDispatch, useTypedSelector } from '@/features/reduxhooks/ReduxHooks';
import { addressPageChange } from '@/features/reducers/address/AddressPageChange.Reducers';
import PersonServices from '@/services/Person.Services';
import MasterServices from '@/services/Master.Services';
import Language from "./OrderSummaryLanguage.json";
import { Button } from '@mui/material';
import CompleteAnimation from '@/components/completeanimation/CompleteAnimation';
import AssigneeDetails from '@/components/assigneedetails/AssigneeDetails';
import { pageChange } from '@/features/reducers/selldevice/PageChange.Reducer';
import { isPlatform } from '@ionic/core';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import OrderTrack from '@/components/ordertrack/OrderTrack';
import ContactUsServices from '@/services/ContactUs.Services';
import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import FileSaver from "file-saver";

const OrderPayout = dynamic(() => import('@/components/orderpayout/OrderPayout').then(mod => mod.OrderPayout), { ssr: false });
const IonModal = dynamic(() => import('@ionic/react').then(mod => mod.IonModal), { ssr: false });
const IonAlert = dynamic(() => import('@ionic/react').then(mod => mod.IonAlert), { ssr: false });
const CancelOrder = dynamic(() => import('@/components/cancel/CancelOrder'), { ssr: false });
const RescheduleModal = dynamic(() => import('@/components/reschedule/RescheduleModal'), { ssr: false });

class OrderSummaryData {
    address: { Address: string, Email: string, Phone: string, PromotionLinks: { faceBook: string, instagram: string, linkedIn: string, tikTok: string, youTube: string, Twitter: string } } =
        {
            Address: "", Email: "", Phone: "",
            PromotionLinks: {
                faceBook: "",
                instagram: "",
                linkedIn: "",
                youTube: "",
                tikTok: "",
                Twitter: ""
            }
        };
    direction: string = "";
    language: "in_en" | "ae_en" | "ae_ar" = "in_en";
    orderSummary!: ISellOrderModel;
    orderPathName!: boolean;
    Status!: Array<IStatusModel>;
    metaTags: ISEOModel = {} as ISEOModel
}

const fetchData = async (context: any): Promise<OrderSummaryData> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let orderId = context ? context.query.orderId : findWindow() && window.location.pathname.split('/').at(-1)?.toString();
    let orderPathName = context ? context.resolvedUrl.includes('/view-orders-details') : findWindow() && window.location.pathname.includes('/view-orders-details');
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let orderSummaryRes = await SellOrderServices.GetOrderSummary(orderId, header.LanguageCode, header.CountryCode);
    let orderSummary = await (orderSummaryRes.status === 200 && orderSummaryRes.data);

    let statusData = await MasterServices.GetAllStatus(HelperConstant.serviceTypeId.SELL);
    let Status = await (statusData.status === 200 && statusData.data);

    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.OrderSummary, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsData.status === 200 && metaTagsData.data);

    return { address, direction, language, orderSummary, orderPathName, Status, metaTags }
}


function OrderSummary({ address, direction, language, orderSummary, orderPathName, Status, metaTags }: OrderSummaryData) {

    let dataLocalization = Language[language];
    let router = useRouter();
    const Id = router.query.orderId;
    const { NEXT_PUBLIC_SSR } = process.env;

    const [orderSummaryData, setOrderDummaryData] = useState<OrderSummaryData>({ address, direction, language, orderSummary, orderPathName, Status, metaTags })

    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const [isModelOpen, setIsModelOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
    let history = useRouter();

    const reshedulehandler = (ServiceTypeId: number) => {
        if (HelperConstant.serviceTypeId.SELL === ServiceTypeId) {
            dispatch(addressPageChange("timedateslot"));
            history.push(`/${language}${getUserLocationForParam(orderSummaryData.language)}/schedule/${Id}`);
        }
        else {
            dispatch(addressPageChange("repairtimedateslot"));
            history.push(`/${language}${getUserLocationForParam(orderSummaryData.language)}/Repair-schedule/${Id}`);
        }
    };

    const downloadInvoice = () => {
        SellOrderServices.downloadInvoice(Id).then(response => {
            if (response.status === 200) {
                const byteArray = Uint8Array.from(atob(response.data).split('').map(char => char.charCodeAt(0)));
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const file = new File([blob], `DOFY_${orderSummary?.OrderCode}_Invoice.pdf`, { type: 'application/pdf' });
                FileSaver.saveAs(file);
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

        if (isPlatform("capacitor")) {
            fetch(`${process.env.NEXT_PUBLIC_PUBLIC_APP_API}Sell/getOrderSummary/${Id}`, { cache: "force-cache" });
        }
        else {
            fetch(`${process.env.NEXT_PUBLIC_PUBLIC_API}Sell/getOrderSummary/${Id}`, { cache: "force-cache" });
        }

        const GetOrderSummary = (Status: Array<IStatusModel>) => {
            setIsRender(true);
            var resultArray = Array<any>();
            Status?.forEach(element => {
                if (!resultArray.includes(element.ExternalStatus)) {
                    resultArray.push(element.ExternalStatus);
                    if (!orderSummaryData.orderPathName) {
                        setTimeout(() => { setAnimate(true) }, 300);
                    }
                }
                // isValidUser(orderSummary.PersonId);
            });
        }

        const getStatusColor = (orderSummary: ISellOrderModel) => {
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

        if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setOrderDummaryData({
                    orderSummary: res.orderSummary,
                    orderPathName: res.orderPathName,
                    Status: res.Status,
                    address: res.address,
                    direction: res.direction,
                    language: res.language,
                    metaTags: res.metaTags
                });
                GetOrderSummary(res.Status);
                getStatusColor(res.orderSummary);
            });
        }
        else {
            GetOrderSummary(Status);
            getStatusColor(orderSummary);
        }
    }, [router.query.orderId, orderSummary?.ExternalStatus, statusColor.cancelled, statusColor.failed, statusColor.inProgress, statusColor.scheduled, statusColor.completed])

    const routerHandler = (type: "/view-orders") => {
        dispatch(pageChange("selectdevice"));
        history.push(`/${language}${getUserLocationForParam(orderSummaryData.language)}${type}`);
    }
    return (
        <ion-app data-aos="zoom-out" class='os-grid'>
            <MetaTags metaTags={orderSummaryData.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={orderSummaryData.language} pageName="Order-summary" />
            {animate && <CompleteAnimation />}
            {/* {isRender ? */}
            {
                orderSummaryData.orderSummary.Id > 0 &&
                <ion-content>
                    <ion-grid class="os_padding-adjustment" dir={orderSummaryData.direction}>
                        <ion-row class='ion-padding-horizontal ion-padding-top'>
                            {orderSummaryData.orderSummary.ExternalStatus !== HelperConstant.orderStatus.cancel &&
                                <>
                                    {orderSummaryData.orderSummary.ServiceTypeId === HelperConstant.serviceTypeId.SELL
                                        ?
                                        <ion-col class='os-choose-col' size-lg='10' size-md='9.5' size-xs='12' >
                                            <ion-text style={{ fontWeight: "900", fontSize: "20px" }}>{dataLocalization.Hi} {orderSummaryData.orderSummary.UserName},</ion-text><br />
                                            <ion-text style={{ fontWeight: "900", fontSize: "13px" }}>{dataLocalization.Your_Order_is}. {dataLocalization.Our_executive}
                                            </ion-text>
                                        </ion-col>
                                        :
                                        <ion-col class='os-choose-col' size-lg='10' size-md='9.5' size-xs='12'>
                                            <ion-text style={{ fontWeight: "900", fontSize: "20px" }}>{dataLocalization.Hi} {orderSummaryData.orderSummary.UserName},</ion-text><br />
                                            <ion-text style={{ fontWeight: "900", fontSize: "13px" }}>{dataLocalization.Your_order_is_placed}
                                                {dataLocalization.Fastest_possible}</ion-text>
                                        </ion-col>
                                    }
                                </>
                            }

                            {!orderSummaryData.orderPathName &&
                                <ion-col size-md='2' size-xl='2' size-xs='12' size-lg='2' class='ion-align-center ion-text-center os_return_button'>
                                    <Button onClick={() => window.location.href = `/${language}${getUserLocationForParam(orderSummaryData.language)}/view-orders`} variant="outlined">{dataLocalization.Return_to_Orders} &#8594;</Button>
                                </ion-col>
                            }

                        </ion-row>

                        <ion-row>
                            <ion-col size-xl="4" size-xs="12" size-lg="4" size-md='6'>
                                <ion-card class="os-orders-card os-card-height">
                                    <ion-row>
                                        <ion-col size="12" class="ion-padding-start">
                                            <ion-row>
                                                <ion-col size='5'>
                                                    <ion-text>{dataLocalization.Appointment_Details}</ion-text>
                                                </ion-col>
                                                <ion-col size="7" class='ion-text-end ion-padding-end'>
                                                    <ion-label># <b>{orderSummaryData.orderSummary?.OrderCode}</b></ion-label>
                                                </ion-col>
                                            </ion-row>
                                        </ion-col>
                                    </ion-row>
                                    <ion-row>
                                        <ion-col size-lg='12'>
                                            <ion-card class="os-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="5" >
                                                        <ion-label>{dataLocalization.Date}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7">
                                                        <ion-text>{moment(orderSummaryData.orderSummary?.Appointment?.AppointmentDate).format('DD/MM/YYYY')}</ion-text>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col size-lg="12" size-Xs="12">
                                            <ion-card class="os-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="5">
                                                        <ion-label>{dataLocalization.Start_Time}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7">
                                                        <ion-text>{moment(orderSummaryData.orderSummary?.Appointment?.StartTime).format('LT')}</ion-text>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col size-lg="12" size-xs="12">
                                            <ion-card class="os-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="5">
                                                        <ion-label>{dataLocalization.End_Time}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7">
                                                        <ion-text>{moment(orderSummaryData.orderSummary?.Appointment?.EndTime).format('LT')}</ion-text>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>

                                        <ion-col size-lg="12" size-xs="12">
                                            <ion-card class="os-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="12" class='os-orders-address'>
                                                        <ion-label>{dataLocalization.Address_Details}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="12" >
                                                        <ion-text>{orderSummaryData.orderSummary?.Appointment?.Name}</ion-text><br />
                                                        <ion-text>{orderSummaryData.orderSummary?.Appointment?.Address} {orderSummaryData.orderSummary?.Appointment?.Address1 ? orderSummaryData.orderSummary?.Appointment?.Address1 : null}</ion-text><br />
                                                        {orderSummaryData.orderSummary?.Appointment?.LandMark ? <><ion-text> {orderSummaryData.orderSummary.Appointment.LandMark}, </ion-text><br /></> : ""}
                                                        <ion-text>{orderSummaryData.orderSummary?.Appointment?.AppointmentCity}{orderSummaryData.language === "in_en" && <>  {orderSummaryData.orderSummary?.Appointment?.AppointmentPincode}</>}</ion-text><br />
                                                        <ion-text dir='ltr'>{countrycodenumber(orderSummaryData.orderSummary?.UserMobile)}{orderSummaryData.orderSummary?.SecondaryMobile && <> , {countrycodenumber(orderSummaryData.orderSummary?.SecondaryMobile)}</>}</ion-text>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        {orderSummaryData.orderSummary.AssigneeDetails &&
                                            <ion-col size-lg="12" size-xs="12">
                                                <ion-label class='ion-padding-start' style={{ color: "#2250b2", fontWeight: '600' }}>{dataLocalization.Assignee_Details}</ion-label>
                                                <ion-card class="os-orders-card">
                                                    <AssigneeDetails data={orderSummaryData.orderSummary.AssigneeDetails} />
                                                </ion-card>
                                            </ion-col>
                                        }
                                    </ion-row>
                                </ion-card>
                            </ion-col>
                            <ion-col size-lg="4" size-xs="12" size-md='6'>
                                <ion-card class="os-orders-card os-card-height">
                                    <ion-row>
                                        <ion-col size-lg="12" size-xs="12" class="ion-padding-start">
                                            <ion-row>
                                                <ion-col size='12'>
                                                    <ion-text>{dataLocalization.Order_Summary}</ion-text>
                                                </ion-col>
                                            </ion-row>
                                        </ion-col>
                                    </ion-row>
                                    <ion-row>
                                        <ion-col size-lg='12'>
                                            <ion-card class="os-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="5">
                                                        <ion-label>{dataLocalization.Order_Status}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7">
                                                        <ion-text>{orderSummaryData.orderSummary?.ExternalStatus}</ion-text>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col size-lg="12" size-xs="12">
                                            <ion-card class="os-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="5" >
                                                        <ion-label >{dataLocalization.Order_Date}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7">
                                                        <ion-text >{moment(orderSummaryData.orderSummary?.OrderDate).format('DD/MM/YYYY')}</ion-text>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col size-lg="12" size-xs="12" >
                                            <ion-card class="os-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size-lg="12" size-xs="12" class="os-orders-card-inline-card os-orders-card-inline-card-0">
                                                        <ion-row>
                                                            <ion-col size="5" class="os_device_img">
                                                                <ion-img src={`${HelperConstant.imageAPI}/${orderSummaryData.orderSummary?.BrandThumbnailPath}`} class={`${orderSummaryData.language === "ae_ar" ? "os-device-img-ar" : "os-device-img"}`} alt='order-summary' />
                                                            </ion-col>
                                                            <ion-col size="7" class={`${orderSummaryData.language === "ae_ar" ? "os-orders-card-inline-adjustment-ar" : "os-orders-card-inline-adjustment"}`}>
                                                                <ion-label>{orderSummaryData.orderSummary.BrandMasterName}</ion-label>
                                                            </ion-col>
                                                        </ion-row>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col size-lg="12" size-xs="12" >
                                            <ion-card class="os-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="5" >
                                                        <ion-label>{dataLocalization.Model}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7">
                                                        <ion-text>{orderSummaryData.orderSummary.SeriesModelName}</ion-text>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col size-lg="12" size-xs="12" >
                                            <ion-card class="os-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="5" >
                                                        <ion-label>{dataLocalization.Variant}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7">
                                                        <ion-text>{orderSummaryData.orderSummary.ModelVariantName}</ion-text>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col size-lg="12" size-xs="12">
                                            <ion-card class="os-orders-card-inline-cost">
                                                <ion-row>
                                                    <ion-col size="5">
                                                        <ion-label style={{ color: "#2250B2" }}>{dataLocalization.Final_Cost}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7" >
                                                        <ion-text>{currencyByCountry(orderSummaryData.orderSummary?.Payout?.TotalAmount > 0 ? toAmount(orderSummaryData.orderSummary?.Payout?.TotalAmount) : 0, orderSummaryData.language)}/-</ion-text>
                                                        <ion-icon title='' class='cursor-pointer' src={informationCircleOutline} onMouseLeave={() => setIsReferral(false)} onMouseEnter={() => setIsReferral(true)} />
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                            {isReferral &&
                                                <OrderPayout orderPayout={orderSummaryData.orderSummary} language={orderSummaryData.language} ReferralCode={orderSummaryData.orderSummary.ReferralCode} setIsReferral={setIsReferral} />
                                            }
                                        </ion-col>
                                    </ion-row>
                                </ion-card>
                            </ion-col>
                            <ion-col size-lg="4" size-xs="12" size-md='12'>
                                <ion-card class="os-orders-card os-card-height-q">
                                    <ion-row>
                                        <ion-col size-lg="12" size-xs="12" class="ion-padding-start" style={{ marginTop: "5px" }}>
                                            <ion-col>
                                                <ion-text>{dataLocalization.Device_details}</ion-text>
                                            </ion-col>
                                        </ion-col>
                                        {orderSummaryData.orderSummary?.QuestionnaireResponse?.filter(x => x.Threshold > 0 || x.QuestionnaireTypeId === HelperConstant.questionnaireType.DeviceAge)?.map((val: any, index) => (
                                            <ion-col size-lg="12" size-xs="12" size-md="6" key={index}>
                                                <ul className="os_chip-style">
                                                    <li className={`${index === 0 ? '' : "icon-margin"}`}>{index + 1}. {val.Question}{(val.ResponseText == notWorking) ? <ion-icon class="icon-thumb-down" icon={thumbsDownSharp} /> : (val.ResponseText == available) ? <ion-icon class="icon-thumb-up" icon={thumbsUpSharp} /> : <ion-text class="--dofy-color-primary-new"> - {val.ResponseText}</ion-text>}</li>
                                                </ul>
                                            </ion-col>
                                        ))}
                                    </ion-row>
                                    {(orderSummaryData.orderSummary.StatusId == HelperConstant.orderStatusId.completed && !IsMobile) &&
                                        <>
                                            {isDownload ?
                                                <ion-col sizeXl='1.2' offset-xl='0.8' size-lg='2' offsetLg='0' sizeMd='2.5' offset-md='0' sizeXs='12' offsetXs='0'>
                                                    <ion-item lines='none' class='invoice-btn'>
                                                        <ion-icon title='Download Invoice' icon={checkmarkCircleOutline} color="success" size='small' class="receiptIcon"></ion-icon>
                                                        <ion-label>{dataLocalization.Downloaded}</ion-label>
                                                    </ion-item>
                                                </ion-col>
                                                :
                                                <ion-col sizeXl='1.2' offset-xl='0.8' size-lg='2' offset-lg='0' size-md='2.5' offset-md='0' size-xs='6' offset-xs='6'>
                                                    <ion-item lines='none' class='cursor-pointer invoice-btn' onClick={() => downloadInvoice()}>
                                                        <ion-icon title='Download Invoice' icon={receipt} color="dark" size='small' class="receiptIcon"></ion-icon>
                                                        <ion-label>{dataLocalization.Invoice}</ion-label>
                                                    </ion-item>
                                                </ion-col>
                                            }
                                        </>
                                    }
                                </ion-card>
                            </ion-col>
                            <ion-col size='12' class='text-center'>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            {orderSummaryData.orderPathName
                                ?
                                <ion-col size-xl='12' size-lg='12' size-md='12' size-xs='12' class='ion-padding-top'>
                                    <ion-card class='p-3 os_outercard-style md'>
                                        <ion-row>
                                            <ion-col size-xl='6' size-lg='6' size-xs='12'>
                                                <ion-row class='custom-center'>
                                                    <ion-col size-xl='12'>
                                                        <OrderTrack activePage={orderStaus.statusbar} isCancel={orderStaus.orderStatus} />
                                                    </ion-col>
                                                </ion-row>
                                            </ion-col>
                                            <ion-col class='ion-text-center os_btn-style' style={{ alignSelf: 'center' }} size-xl='6' size-lg='6' size-xs='12'>
                                                {orderSummaryData.orderSummary?.ExternalStatus === HelperConstant.orderStatus.cancel
                                                    ?
                                                    <ion-col size-md='12' size='12' class='ion-text-center'>
                                                        <ion-text class='os-detail-header'>{dataLocalization.Your_Cancellation_Request}</ion-text>
                                                    </ion-col>
                                                    :
                                                    orderSummaryData.orderSummary?.ExternalStatus === HelperConstant.orderStatus.cancelled
                                                        ?
                                                        <ion-col size-md='12' size='12' class='ion-text-center'>
                                                            <ion-text class='os-detail-header'>{dataLocalization.Your_order_is_Cancelled}</ion-text>&nbsp;
                                                            <Button variant="outlined" onClick={() => routerHandler("/view-orders")} className="vw-btn-cancel"> {dataLocalization.Back}</Button>
                                                        </ion-col>
                                                        :
                                                        orderSummaryData.orderSummary?.ExternalStatus === HelperConstant.orderStatus.completed ?
                                                            <ion-col size-md='12' size='12' class='ion-text-center'>
                                                                <ion-text color='success' class='os-detail-headers'>{dataLocalization.Your_order_is_Completed}</ion-text>&nbsp;
                                                                <Button variant="outlined" onClick={() => routerHandler("/view-orders")} className="vw-btn-cancel"> {dataLocalization.Back}</Button>
                                                            </ion-col>
                                                            :
                                                            orderSummaryData.orderSummary?.ExternalStatus === HelperConstant.orderStatus.failed ?
                                                                <ion-col size-md='12' size='12' class='ion-text-center'>
                                                                    <ion-text color='success' class='os-detail-header'>{dataLocalization.Your_order_is_Failed}</ion-text>&nbsp;
                                                                    <Button variant="outlined" onClick={() => routerHandler("/view-orders")} className="vw-btn-cancel"> {dataLocalization.Back}</Button>
                                                                </ion-col>
                                                                :
                                                                <ion-col size-md='12' size-lg='12' size='12' class='ion-text-center'>
                                                                    <Button variant="contained" onClick={() => setShowModal(true)} className="vw-btn-schedule"> {dataLocalization.Reschedule}</Button>&nbsp;
                                                                    <Button variant="outlined" onClick={() => setIsModelOpen(true)} className="vw-btn-cancel"> {dataLocalization.Help}</Button>&nbsp;
                                                                    <Button variant="outlined" onClick={() => routerHandler("/view-orders")} className="vw-btn-cancel"> {dataLocalization.Back}</Button>&nbsp;
                                                                </ion-col>
                                                }
                                            </ion-col>
                                        </ion-row>
                                    </ion-card>
                                </ion-col>
                                :
                                <>
                                </>
                            }
                        </ion-row>
                        <ion-row>
                            {showModal &&
                                <IonModal
                                    isOpen={showModal}
                                    onDidDismiss={() => setShowModal(false)}
                                >
                                    <RescheduleModal setShowModal={setShowModal} orderSummary={orderSummaryData.orderSummary} />
                                </IonModal>
                            }
                        </ion-row>
                        <ion-row>
                            {isModelOpen &&
                                <IonModal
                                    isOpen={isModelOpen}
                                    onDidDismiss={() => setIsModelOpen(false)} cssClass="cancel-modal">
                                    <CancelOrder setIsModelOpen={setIsModelOpen} orderId={Id} />
                                </IonModal>
                            }
                        </ion-row>
                        <IonAlert
                            isOpen={isAlertOpen}
                            onDidDismiss={() => setIsAlertOpen(false)}
                            header={"Confirmation"}
                            subHeader={"Are you sure you want to Reschedule?"}
                            buttons={[{
                                text: "Yes",
                                handler: () => reshedulehandler(orderSummaryData.orderSummary.ServiceTypeId)
                            }, {
                                text: "No",
                                handler: () => setIsAlertOpen(false)
                            }]}
                        />
                    </ion-grid>
                    {capacitorDevice() &&
                        (orderSummaryData.address.Address) && <Footer address={orderSummaryData.address} direction={orderSummaryData.direction} language={orderSummaryData.language} />
                    }
                </ion-content>
            }
            {/* } */}
        </ion-app>
    )
}

export const getServerSideProps: GetServerSideProps<OrderSummaryData> = async (context) => {

    // const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
    // let orderPathName = false;
    // let orderSummary = {} as ISellOrderModel;
    // let Status = [] as any;
    // let address = {} as any;
    // let metaTags = {} as ISEOModel;

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { address, direction, language, orderSummary, orderPathName, Status, metaTags } = await fetchData(context);
    return { props: { address, direction, language, orderSummary, orderPathName, Status, metaTags } }
    // }

    // return { props: { address, direction, language, orderSummary, orderPathName, Status, metaTags } }
}

export default OrderSummary