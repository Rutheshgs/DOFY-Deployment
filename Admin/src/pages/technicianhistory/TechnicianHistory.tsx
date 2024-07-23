import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { IonAvatar, IonBadge, IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonLoading, IonPage, IonRouterLink, IonRow, IonText, } from "@ionic/react";
import { arrowUndoOutline, cashOutline, chevronBackCircleOutline, informationCircleOutline, locationOutline, } from "ionicons/icons";

import moment from "moment";
// import { Rating } from "react-simple-star-rating";

import "./TechnicianHistory.css";

import { useTypedDispatch, useTypedSelector } from "../../features/reduxhooks/ReduxHooks";
import { FilterDataId } from "../../features/reducers/filterdata/FilterData.Reducers";

import PersonalDetailsServices from "../../services/PersonalDetails.Services";
import SellServices from "../../services/Sell.Services";
import { IOrderRiderModel } from "../../models/OrderRider.Model";
import { IGetAssigneeDetailModel } from "../../models/GetAssigneeDetail.Model";

import Delay from "../../components/reportdelay/Delay";
import { CustomImg } from "../../components/shared/CustomImage";
import { CustomDataTable } from "../../components/shared/custom-data-table/CustomDataTable";

import { getDecodedAccessToken, getPersonId, isRider } from "../../components/helper/TokenHelper"
import { currencyByCountry, getLocalStorage, getStatusIds, getStatusName, toAmount } from "../../components/helper/Helper";
import { HelperConstant } from "../../components/helper/HelperConstant";
import { OrderPayout } from "../../components/orderpayout/OrderPayout";
import MasterServices from "../../services/Master.Services";

interface InputParam {
    id: string;
    orderId: string;
}

type UTMModel = { ThemeColor: string, Name: string, UTM_Id: string }

function TechnicianHistory() {
    const { id, orderId } = useParams<InputParam>();
    const dispatch = useTypedDispatch();

    const riderlogin: boolean = isRider() ?? false;
    let route = id ? id : getPersonId();

    let OffsetStart = useTypedSelector(state => state.FilterDataReducers.OffsetStart);
    let RowsPerPage = useTypedSelector(state => state.FilterDataReducers.RowsPerPage);
    let FromDate = useTypedSelector(state => state.FilterDataReducers.FromDate);
    let ToDate = useTypedSelector(state => state.FilterDataReducers.ToDate);
    let productId = useTypedSelector(state => state.FilterDataReducers.productId);
    let brandId = useTypedSelector(state => state.FilterDataReducers.BrandId);
    let modelId = useTypedSelector(state => state.FilterDataReducers.ModelId);
    let cityId = useTypedSelector(state => state.FilterDataReducers.CityId);
    let PromoCode = useTypedSelector(state => state.FilterDataReducers.PromoCode);

    const isAdmin = getDecodedAccessToken(getLocalStorage().Token)?.RoleId === HelperConstant.Roles.Admin;

    const [personId] = useState(route);
    const [orderData, setOrderData] = useState<Array<IOrderRiderModel>>([]);
    const [Search, setSearch] = useState([]);
    const [recordsCount, setRecordsCount] = useState<number>(0);
    const [rider, setRider] = useState<IGetAssigneeDetailModel>();
    const [DashboardName, setDashboardName] = useState<any>(1);
    // const [DashboardStats, setDashboardStats] = useState<IDashboardStats>();
    const [MenuName, setMenuName] = useState<any>("In-Progress Orders");
    const [isToday] = useState(true);
    const [loading, setLoading] = useState(true);
    const [isReferral, setIsReferral] = useState<number>(0);
    const [searchText, setSearchText] = useState<any>();
    const [utmLinks, setUtmLinks] = useState<Array<UTMModel>>([]);

    const handleFilter = (text: any) => {
        setSearchText(text);
        dispatch(FilterDataId({ payload: 0, type: "OffsetStart" }));
    };

    const getStatsName = (dashboardName?: number) => {
        dashboardName = dashboardName ? dashboardName : DashboardName;
        setMenuName(getStatusName(dashboardName));
    }

    useEffect(() => {
        const getUtmLinkd = () => {
            MasterServices.GetUTMLinks().then(res => {
                if (res.status === 200) {
                    setUtmLinks(res.data);
                }
            }).catch(e => {
                console.log(e);
            })
        }

        getUtmLinkd();
    }, []);

    const columns = useMemo(
        () => [
            {
                name: 'Order Summary',
                selector: (row: any) => row.Id,
                cell: (row: any, index: any, column: any, id: any) => {
                    const item = row;
                    return (
                        <>
                            <IonCard style={{ borderColor: `${item.ColorCode}`, width: '100%' }} className="db-cardcontent" >
                                <IonRow>
                                    <IonCol sizeXl="0.5" sizeLg="0.5" sizeXs="2" sizeMd="1" className="ion-align-self-center">
                                        <IonAvatar className="db-avatarimage">
                                            <CustomImg src={`${HelperConstant.imageAPI}/devicetypes/${item.ProductTypeEnumName}.png`} alt={item.ProductTypeEnumName} />
                                        </IonAvatar>
                                    </IonCol>
                                    <IonCol sizeXl="2" sizeLg="2" sizeXs="10" sizeMd="3.5" className="ion-align-self-center">
                                        <IonCardHeader>
                                            <IonRouterLink routerLink={`/AgentTicketView/${item.Id}`}>
                                                <IonCardTitle className="th_order-title">{item.OrderCode}</IonCardTitle>
                                                <IonRow>
                                                    <IonCol sizeXl="12" sizeXs="12">
                                                        <IonBadge color="warning">{item.ServiceType?.replace('a device', '')}</IonBadge>
                                                        <IonBadge style={{ marginLeft: '4px' }} color="medium">{item.ProductTypeName}</IonBadge>
                                                    </IonCol>
                                                    {item.ReferralCode ?
                                                        <IonCol sizeLg="12" sizeMd="12" sizeXs="12">
                                                            <IonBadge className="refral"> Promo#: {item.ReferralCode}</IonBadge>
                                                        </IonCol>
                                                        : ""}
                                                    {item.UTMReference ?
                                                        <IonCol sizeLg="12" sizeXl="12" sizeMd="12" sizeXs="12">
                                                            {utmLinks.map((res, i) => {
                                                                if (res.Name === item.UTMReference) {
                                                                    return <IonBadge key={i} className="utm" style={{ background: res.ThemeColor }}><IonLabel>{res.Name}</IonLabel></IonBadge>
                                                                }
                                                                return null
                                                            })
                                                            }
                                                        </IonCol>
                                                        : ""}
                                                </IonRow>
                                            </IonRouterLink>
                                        </IonCardHeader>
                                    </IonCol>
                                    <IonCol sizeXl="2" sizeLg="2" sizeXs="5.5" sizeSm="6" sizeMd="3.5" className="ion-align-self-center ion-padding">
                                        <IonRow>
                                            <IonCol sizeXs="12" sizeLg="12">
                                                <IonText>{item.BrandMasterName}</IonText>
                                            </IonCol>
                                            <IonCol sizeLg="12" sizeXs="12">
                                                <IonText>{item.SeriesModelName}</IonText>
                                            </IonCol>
                                            <IonCol sizeLg="12" sizeXs="12">
                                                <IonText>{item.ModelVariantName}</IonText>
                                            </IonCol>
                                        </IonRow>
                                    </IonCol>
                                    <IonCol sizeXl="1.5" sizeLg="1.5" sizeXs="6" sizeSm="6" sizeMd="3.5" className="ion-padding" >
                                        <IonRow>
                                            <IonCol sizeXs="12" sizeLg="12">
                                                <IonText>{item.UserName}</IonText>
                                            </IonCol>
                                            <IonCol sizeLg="12" sizeXs="12">
                                                <IonText>+91 {item.UserMobile}</IonText>
                                            </IonCol>
                                        </IonRow>
                                    </IonCol>
                                    <IonCol sizeXl="1.5" sizeLg="1.5" sizeMd="4" sizeXs="6" className="ion-align-self-center ion-padding" onMouseLeave={() => { setIsReferral(0) }}>
                                        <IonBadge color="success" className="th_price-badge" onMouseEnter={() => setIsReferral(item.Id)} >
                                            <IonIcon style={{ marginRight: '5px' }} icon={cashOutline}></IonIcon>
                                            {(item.TotalAmount > 0) ? currencyByCountry ( toAmount(Math.ceil(item.TotalAmount))) + '/-' : 0}
                                            <IonIcon src={informationCircleOutline} />
                                        </IonBadge>
                                    </IonCol>
                                    <IonCol sizeXl="2" sizeLg="2.5" sizeMd="4" sizeXs="6" className="ion-align-self-center ion-padding">
                                        <IonRow>
                                            <IonText>{moment(item.AppointmentDate).format("DD/MM/YYYY")}</IonText>&nbsp;
                                            <IonText>{moment(item.StartTime).format('LT')} - {moment(item.EndTime).format('LT')}</IonText>
                                        </IonRow>
                                        <IonRow>
                                            <IonText>
                                                {item.AppointmentPincode &&
                                                    <>
                                                        <IonIcon icon={locationOutline} />
                                                        {item.AppointmentCity} - {item.AppointmentPincode}
                                                    </>
                                                }
                                            </IonText>
                                        </IonRow>
                                    </IonCol>
                                    <IonCol sizeXl="1" sizeLg="1" sizeXs="3" sizeMd="2" className="ion-align-self-center ion-text-center">
                                        <IonBadge color="light" >
                                            {item.StatusName}
                                        </IonBadge>
                                    </IonCol>
                                    {item.StatusId === HelperConstant.StatusId.COMPLETED || item.StatusId === HelperConstant.StatusId.FAILED ?
                                        <IonCol sizeXl="1" sizeLg="1" sizeSm="6" sizeXs="3" sizeMd="2" className="ion-text-center ion-align-self-center"></IonCol> :
                                        <IonCol sizeXl="1" sizeLg="1" sizeSm="6" sizeXs="3" sizeMd="2" className="ion-text-center ion-align-self-center">
                                            <IonButtons >
                                                <Delay orderId={item.Id} setShowToast={null} showOnlyIcon={true} />
                                            </IonButtons>
                                        </IonCol>}
                                </IonRow>
                            </IonCard >
                            {(isReferral === item.Id) &&
                                <OrderPayout orderPayout={{
                                    Adjustment: item?.Adjustment,
                                    ReferralAmount: item?.ReferralAmount,
                                    TotalAmount: item?.TotalAmount,
                                    RequoteAmount: item?.RequoteAmount,
                                    SuggestedCost: item?.SuggestedCost
                                }} referralCode={item.ReferralCode} customClassName={index === 9 ? "referral-card-th referral-card-th-nth" : "referral-card-th"} />
                            }
                        </>
                    )
                }
            }
        ],
        [isReferral, utmLinks]
    );

    const getAssignee = (personId: any) => {
        PersonalDetailsServices.getAssigneeDetail(personId).then(res => {
            if (res.status === 200) {
                setRider(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const backbtn = () => {
        if (!riderlogin) {
            window.history.back();
        }
        else {
            window.location.href = '/HomePage';
        }
    }

    const getOrders = (statsId: number, FromDate: any, ToDate: any, searchText: any) => {
        setDashboardName(statsId);
        getStatsName(statsId);
        const status = getStatusIds(statsId);

        SellServices.PagedOrdersList({
            OffsetStart: OffsetStart,
            RowsPerPage: RowsPerPage,
            SortOrder: 'desc',
            SortOrderColumn: 'modified',
            SearchText: searchText,
            PersonId: personId,
            StatusId: status,
            ProductTypeId: productId,
            SeriesModelId: modelId,
            BrandMasterId: brandId,
            CityId: cityId,
            FromDate: FromDate === null ? null : moment(FromDate).format('L'),
            ToDate: ToDate === null ? null : moment(ToDate).format('L'),
            ReferralCodeId: PromoCode
        }).then(res => {
            if (res.status === 200) {
                setOrderData(res.data.Items);
                setSearch(res.data.Items);
                setRecordsCount(res.data.RecordsCount);
                setLoading(false);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    // const GetDashboardStatsData = (isToday: boolean) => {
    //     SellServices.GetDashboardStats(isToday).then(res => {
    //         setDashboardStats(res.data);
    //     })
    // }

    const sellFilterData = () => {
        const SellData = Search.filter((x: any) => x.ServiceTypeId === HelperConstant.serviceTypeId.SELL)
        setOrderData(SellData);
    }
    const repairFilterData = () => {
        const repairData = Search.filter((x: any) => x.ServiceTypeId === HelperConstant.serviceTypeId.REPAIR)
        setOrderData(repairData);
    }

    useEffect(() => {
        if (isAdmin) {
            getOrders(DashboardName, FromDate, ToDate, searchText);
        }
        else {
            getOrders(parseInt(orderId), FromDate, ToDate, searchText);
        }
        getAssignee(personId);
    }, [productId, brandId, modelId, personId, isToday, isAdmin, orderId, DashboardName, OffsetStart, RowsPerPage, FromDate, ToDate, cityId, searchText, PromoCode]);

    return (
        <IonPage>
            <IonContent>
                <IonGrid className="ion-no-padding">
                    <IonRow className="page-headers">
                        <IonCol sizeLg="12" sizeMd="12" sizeXl="6" sizeSm="12" sizeXs="12">
                            <IonCol>
                                {riderlogin ? " " :
                                    <IonButton size="small" color="medium" onClick={() => backbtn()}>
                                        <IonIcon size="small" icon={chevronBackCircleOutline} />
                                    </IonButton>
                                }
                            </IonCol>
                            <IonCol>
                                <IonText className="page-title">{riderlogin ? '' : 'Rider history dashboard'}</IonText>
                            </IonCol>
                        </IonCol>
                        {riderlogin ? null :
                            <IonCol sizeLg="4.5" sizeMd="4" className="ion-margin-top">
                                <IonRow>
                                    <IonCol>
                                        <IonItem className="tech-detail-item" lines="none" color="transparent">
                                            <IonBadge color="medium">Clients Attended</IonBadge>&nbsp;
                                            <IonBadge slot="end">{rider?.AppointmentCount}</IonBadge>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol>
                                        <IonItem className="tech-detail-item" lines="none" color="transparent">
                                            <IonBadge color="medium">Pin Code</IonBadge>&nbsp;
                                            <IonBadge slot="end" color="light">{rider?.Pincode ? rider?.Pincode : '--'}</IonBadge>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem className="tech-detail-item" lines="none" color="transparent">
                                            <IonBadge color="medium">Contact</IonBadge>&nbsp;
                                            <IonRouterLink slot="end" href={`tel:${rider?.Mobile}`}>
                                                {rider?.Mobile}
                                            </IonRouterLink>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol>
                                        <IonItem className="tech-detail-item" lines="none" color="transparent">
                                            <IonBadge color="medium">Email</IonBadge>&nbsp;
                                            <IonRouterLink slot="end" href={`mailto:${rider?.Email}`}>
                                                {rider?.Email}
                                            </IonRouterLink>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        }
                        <IonCol sizeLg="4" sizeMd="12" sizeXl="6" sizeSm="12" sizeXs="12" className="ion-align-self-end hide-header">
                            <IonItem lines="none" color="transaprent" >
                                <IonText>Rating Overview:</IonText>
                                <IonAvatar>
                                    {/* <SpeedoMeter width={100} height={80} currentValueText={`Rating ${rider?.UserRating}`}
                                            minValue={0} maxValue={5} value={rider?.UserRating} ringWidth={30} /> */}
                                    {/* <Rating initialValue={rider?.UserRating} ratingValue={0} size={25} readonly={true} tooltipArray={HelperConstant.RatingTooltip} /> */}
                                </IonAvatar>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" style={{ marginTop: '0px', width: '100%' }}>
                            {loading === false ?
                                <CustomDataTable headerText={MenuName} data={orderData} addRouterLink={"/technicianhistory"}
                                    columns={columns} pagination={true} height={'1000px'} noBorder={true} filterShow={`/technicianhistory/${orderId}`} setsearchData={handleFilter} onClickSell={() => sellFilterData()} onClickRepair={() => repairFilterData()} RecordsCount={recordsCount}>
                                </CustomDataTable>
                                :
                                <IonLoading
                                    cssClass='custom-loading'
                                    isOpen={true}
                                    message={'Please Wait...'}
                                    spinner={"bubbles"}
                                />
                            }
                        </IonCol>
                    </IonRow>
                    {riderlogin ? " " :
                        <IonRow className="page-header mt-0 ion-justify-content-center" >
                            <IonCol className="backbtn" sizeXs="6" offsetLg="10" sizeLg="1">
                                <IonButton fill="outline" color="danger" size="small" onClick={() => backbtn()}>
                                    <IonIcon icon={arrowUndoOutline}></IonIcon>
                                    Back
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    }
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default TechnicianHistory


