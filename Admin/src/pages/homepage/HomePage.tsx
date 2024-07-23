import { IonAlert, IonBadge, IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonSegment, IonSegmentButton, IonText, IonToast } from '@ionic/react';
import { useEffect, useState } from 'react'
import { HelperConstant } from '../../components/helper/HelperConstant';

import All from "../../assets/images/All.png";
import Inprogress from "../../assets/images/Inprogres.png";
import open from "../../assets/images/open.png";
import fail from "../../assets/images/fail.png";
import pending from "../../assets/images/pending.png";
import complete from "../../assets/images/complete.png";
import cancelrequest from "../../assets/images/Cancel request.png";
import cancelled from "../../assets/images/Cancelled.png";

import "./HomePage.css";
import { IDashboardStats } from '../../models/DashboardStats.Model';
import SellServices from '../../services/Sell.Services';
import { GetHome, getLocalStorage, isIn, isValidUserAuthenticate } from '../../components/helper/Helper';
import { useHistory } from 'react-router';
import { refreshCircle } from 'ionicons/icons';
import { getDecodedAccessToken, isRider } from '../../components/helper/TokenHelper';
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks';
import { FilterDataId } from '../../features/reducers/filterdata/FilterData.Reducers';
import { ICurrency } from '../../models/Currency.Model';
import CurrencyConvertorServices from '../../services/CurrencyConvertor.Services';
import axios from 'axios';

interface AppPage {
    name: string;
    totalCount: string;
    img: string;
    value: number;
    canShow?: boolean;
}

type Props = {
    setToday: any
}

function HomePage({ setToday }: Props) {


    let history = useHistory();
    let dispatch = useTypedDispatch();

    const [DashboardStats, setDashboardStats] = useState<IDashboardStats>();
    const riderlogin: boolean = isRider() ?? false;

    const [isToday, setIsToday] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [updateCurrency, setUpdateCurrency] = useState<any>("");
    const [errUpdateCurrency, setErrUpdateCurrency] = useState<any>("");
    const [isOpen, setIsOpen] = useState<any>(false);
    const [canShowConverter, setCanShowConverter] = useState<any>(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [aedReport, setAedReport] = useState({ date: "", inr: 0 });

    const cardData: AppPage[] = [
        {
            name: "ALL",
            img: All,
            totalCount: DashboardStats?.All,
            value: HelperConstant.dashboardNameIndex.AllOrders,
            canShow: !riderlogin

        },
        {
            name: "OPEN",
            img: open,
            totalCount: DashboardStats?.Open,
            value: HelperConstant.dashboardNameIndex.OpenOrders,
            canShow: !riderlogin

        },
        {
            name: "INPROGRESS",
            img: Inprogress,
            totalCount: DashboardStats?.Inprogress,
            value: HelperConstant.dashboardNameIndex.InProgressOrders,
            canShow: true

        },
        {
            name: "COMPLETED",
            img: complete,
            totalCount: DashboardStats?.Completed,
            value: HelperConstant.dashboardNameIndex.CompletedOrders,
            canShow: true

        },
        {
            name: "FAILED",
            img: fail,
            totalCount: DashboardStats?.Failed,
            value: HelperConstant.dashboardNameIndex.FailedOrders,
            canShow: true

        },
        {
            name: "CANCEL REQUEST",
            img: cancelrequest,
            totalCount: DashboardStats?.CancelRequest,
            value: HelperConstant.dashboardNameIndex.CancelRequestOrders,
            canShow: !riderlogin

        },
        {
            name: "CANCELLED",
            img: cancelled,
            totalCount: DashboardStats?.Cancelled,
            value: HelperConstant.dashboardNameIndex.CancelledOrders,
            canShow: !riderlogin

        },
        {
            name: "PENDING",
            img: pending,
            totalCount: DashboardStats?.Pending,
            value: HelperConstant.dashboardNameIndex.PendingOrders,
            canShow: !riderlogin

        },
    ];

    const GetDashboardStatsData = (isToday: boolean) => {
        SellServices.GetDashboardStats(isToday).then(res => {
            if (res.status === 200) {
                setShowLoading(true);
                setDashboardStats(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const AmountUpdate = () => {
        let data: ICurrency = {
            Currency1Name: 'AED',
            Currency2Name: 'INR',
            Amount: updateCurrency,
            Active: true
        }

        if (updateCurrency) {
            setErrUpdateCurrency("");
            CurrencyConvertorServices.Edit(data).then(res => {
                if (res.status == 200) {
                    setIsOpen(true);
                }
            }).catch(e => console.log(e));
        }
        else {
            setErrUpdateCurrency("Enter Update Currency");
        }
    }

    const getCurrency = () => {
        CurrencyConvertorServices.Get().then(res => {
            if (res.status == 200) {
                setUpdateCurrency(res.data.Amount);
            }
        }).catch(e => console.log(e));
    }

    const routerHandler = (value: any) => {
        if (riderlogin) {
            history.push(`/technicianhistory/${value}`);
        }
        else {
            history.push(`/DashBoard/${value}`);
        }
    }

    const refresh = () => {
        setShowLoading(false);
        GetDashboardStatsData(isToday);
    }

    const segmentHandler = (e: any) => {
        setIsToday(e.detail.value);
        setToday(e.detail.value)
        if (e.detail.value === true) {
            dispatch(FilterDataId({ payload: new Date(), type: "FromDate" }));
            dispatch(FilterDataId({ payload: new Date(), type: "ToDate" }));
        }
        else {
            let today = new Date();
            let priorDate = new Date(new Date().setDate(today.getDate() - 90));

            dispatch(FilterDataId({ payload: priorDate, type: "FromDate" }));
            dispatch(FilterDataId({ payload: null, type: "ToDate" }));
        }
    }

    const getCurrentAED = () => {
        axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aed/inr.json').then(res => {
            if (res.status === 200) {
                setAedReport({ date: res.data.date, inr: res.data.inr });
            }
        }).catch(e => { console.log(e) });
    }

    useEffect(() => {
        GetHome(getLocalStorage()?.Token, "login");
        isValidUserAuthenticate(getDecodedAccessToken(getLocalStorage().Token));
        setCanShowConverter(isIn() ? false : true);
        GetDashboardStatsData(isToday);
        dispatch(FilterDataId({ payload: new Date(), type: "FromDate" }));
        dispatch(FilterDataId({ payload: new Date(), type: "ToDate" }));
        getCurrentAED();
        getCurrency();
    }, [isToday, dispatch]);

    return (
        <IonPage>
            {showLoading ?
                <IonContent >
                    <IonToast
                        isOpen={isOpen}
                        message="Currency Updated"
                        duration={5000}
                        onDidDismiss={() => setIsOpen(false)}
                        position="top"
                        color="success"
                    ></IonToast>
                    <IonGrid className='hp_margin-top mt-5'>
                        {isRider() ?
                            <></>
                            :
                            <IonRow>
                                {canShowConverter ?
                                    <IonRow className='mt-5'>
                                        <IonCol size='12'>
                                            <IonItem>
                                                <IonText className='text-bold-AED'>AED</IonText> - &nbsp;
                                                <IonLabel>₹</IonLabel>
                                                <IonInput value={updateCurrency} onIonChange={e => setUpdateCurrency(e.detail.value)} type="number">
                                                </IonInput>
                                                <IonButton size="small" className="bg-success" color="success" onClick={() => setIsAlertOpen(true)} type="submit">Update</IonButton>
                                            </IonItem>
                                            {aedReport.inr > 0 &&
                                                <div className="marquee">
                                                    <p> Date : {aedReport?.date} and INR : {aedReport?.inr?.toString()?.slice(0, 5)}</p>
                                                </div>}
                                        </IonCol>
                                        {errUpdateCurrency && <IonLabel className='text-danger'>{errUpdateCurrency}</IonLabel>}
                                        <IonAlert isOpen={isAlertOpen}
                                            onDidDismiss={() => setIsAlertOpen(false)}
                                            header={"Confirmation"}
                                            subHeader={"Are you sure you want to update this price?"}
                                            buttons={[{
                                                text: "Update",
                                                handler: () => AmountUpdate()
                                            }
                                                , {
                                                text: "Cancel",
                                                handler: () => setIsAlertOpen(false)
                                            }]}
                                        />
                                    </IonRow>
                                    :
                                    ""
                                }
                            </IonRow>
                        }

                        <IonRow>
                            <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12' className='ion-text-center'>
                                <IonItem lines='none'>
                                    <IonCol sizeXl='4' sizeMd='4' sizeLg='4' sizeXs='3.5'>
                                        <IonText className='hp_title p-0'>Quick Actions</IonText>
                                    </IonCol>
                                    <IonCol sizeXs='6.5' sizeXl='4' sizeLg='4' offsetLg='4' offsetXl='4' offsetXs='2'>
                                        <IonSegment value={isToday as any} onIonChange={(e) => { segmentHandler(e) }}>
                                            <IonSegmentButton value={false as any} className='hp_SegmentBtn'>
                                                <IonLabel>All</IonLabel>
                                            </IonSegmentButton>
                                            <IonSegmentButton value={true as any} className='hp_SegmentBtn'>
                                                <IonLabel>Today</IonLabel>
                                            </IonSegmentButton>
                                        </IonSegment>
                                    </IonCol>
                                    <IonIcon onClick={() => refresh()} className="cursor-pointer" slot='end' color="dark" icon={refreshCircle}></IonIcon>
                                </IonItem>
                            </IonCol>
                            {cardData.filter(x => x.canShow)?.map((val, i) => (
                                <IonCol key={i} sizeXl='3' sizeLg='3' sizeMd='6' sizeSm='6' sizeXs='6'>
                                    <IonCard className='hp_card-border cursor-pointer' style={{ background: 'rgb(251, 251, 251)', border: '1px solid rgb(151 151 151)' }} onClick={() => { routerHandler(val.value) }}>
                                        <IonRow>
                                            <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12' >
                                                <IonImg className='hp_img-card' src={val.img}></IonImg>
                                            </IonCol>
                                            <IonCol className='ion-text-center' sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                                                <IonText className='hp_card-text'>{val.name}</IonText>
                                            </IonCol>
                                            <IonCol className='ion-text-center' sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                                                <IonBadge style={{ backgroundColor: '#004E73' }}>{val.totalCount}</IonBadge>
                                            </IonCol>
                                        </IonRow>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                </IonContent>
                :
                <IonLoading
                    isOpen={!showLoading}
                    message={'Please wait...'}
                />
            }
        </IonPage>

    )
}

export default HomePage