import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    IonPage, IonButtons, IonIcon, IonContent, IonGrid, IonCard, IonRow, IonCol, IonText, IonAvatar, IonCardHeader, IonCardTitle, IonButton, IonTitle, IonModal,
    IonBadge, IonToast, IonLoading, IonItem, IonLabel
} from "@ionic/react";
import { arrowRedoCircleOutline, closeOutline, locationOutline, } from 'ionicons/icons';

import moment from "moment";

import './DashBoard.css';

import PersonServices from "../../services/Person.Services";
import SellServices from "../../services/Sell.Services";
import MasterServices from "../../services/Master.Services";
import { IPostOrdersModel } from "../../models/PostOrders.Model";
import { IDashboardStats } from "../../models/DashboardStats.Model";

import { CustomDropdown } from "../../components/shared/CustomDropdown";
import { CustomImg } from "../../components/shared/CustomImage";
import { CustomDataTable } from "../../components/shared/custom-data-table/CustomDataTable";

import { useTypedDispatch, useTypedSelector } from "../../features/reduxhooks/ReduxHooks";
import { FilterDataId } from "../../features/reducers/filterdata/FilterData.Reducers";

import { HelperConstant } from "../../components/helper/HelperConstant";
import { GetHome, GetLocation, getCountryCodeStorage, getLocalStorage, getStatusIds, getStatusName, isValidUserAuthenticate, isValidUserAuthenticateForSeo } from "../../components/helper/Helper";
import { getDecodedAccessToken } from "../../components/helper/TokenHelper";

interface Param {
    orderId: string
}

type UTMModel = { ThemeColor: string, Name: string, UTM_Id: string }

function DashBoard() {

    const dispatch = useTypedDispatch();
    const { orderId } = useParams<Param>();

    let history = useHistory();

    let productId = useTypedSelector(state => state.FilterDataReducers.productId);
    let brandId = useTypedSelector(state => state.FilterDataReducers.BrandId);
    let modelId = useTypedSelector(state => state.FilterDataReducers.ModelId);
    let cityId = useTypedSelector(state => state.FilterDataReducers.CityId);
    let PromoCode = useTypedSelector(state => state.FilterDataReducers.PromoCode);
    let FromDate = useTypedSelector(state => state.FilterDataReducers.FromDate);
    let ToDate = useTypedSelector(state => state.FilterDataReducers.ToDate);
    let CompletedStartDate = useTypedSelector(state => state.FilterDataReducers.CompletedStartDate);
    let CompletedEndDate = useTypedSelector(state => state.FilterDataReducers.CompletedEndDate);
    let OffsetStart = useTypedSelector(state => state.FilterDataReducers.OffsetStart);
    let RowsPerPage = useTypedSelector(state => state.FilterDataReducers.RowsPerPage);
    const PersonId = getDecodedAccessToken(getLocalStorage().Token)?.PersonId;

    const [showToast1, setShowToast1] = useState(false);
    const [GetAllOrdersData, setGetAllOrdersData] = useState([]);
    const [AssigneeList, setAssigneeList] = useState<Array<any>>([]);
    const [TechnicianAssignId, setTechnicianAssignId] = useState<number>(0);
    const [OrderId, setOrderId] = useState();
    const [DashboardStats, setDashboardStats] = useState<IDashboardStats>();
    const [DashboardName, setDashboardName] = useState<any>(HelperConstant.dashboardNameIndex.AllOrders);
    const [FilterData, setFilterData] = useState([]);
    const [MenuName, setMenuName] = useState<any>("All Orders");
    const [showModal, setShowModal] = useState(false);
    const [recordsCount, setRecordsCount] = useState<number>(0);
    const [isToday] = useState(true);
    const [searchText, setSearchText] = useState<any>();
    const [loading, setLoading] = useState(true);

    const [utmLinks, setUtmLinks] = useState<Array<UTMModel>>([]);
    const [isButton, setisButton] = useState<boolean>(false);


    const columns = useMemo(
        () => [
            {
                name: "Order Summary",
                selector: (row: any) => row.Id,
                cell: (row: any, index: any, column: any, id: any) => {
                    const item = row;
                    return (
                        <IonCard style={{ borderColor: `${item.ColorCode}`, width: '100%' }} className="db-cardcontent" >
                            <IonRow>
                                <IonCol sizeXl="0.5" sizeLg="0.5" sizeXs="2" sizeMd="1" className="ion-align-self-center">
                                    <IonAvatar className="db-avatarimage">
                                        <CustomImg src={`${HelperConstant.imageAPI}/devicetypes/${item.ProductTypeEnumName}.png`} alt={item.ProductTypeEnumName} />
                                    </IonAvatar>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="2" sizeXs="10" sizeMd="3.5" className="ion-align-self-center">
                                    <IonCardHeader className={parseInt(orderId) === HelperConstant.dashboardNameIndex.PendingOrders ? "" : "cursor-pointer"} onClick={() => { if (parseInt(orderId) !== HelperConstant.dashboardNameIndex.PendingOrders) getOrderSummary(item.Id); }}>
                                        <IonCardTitle className={parseInt(orderId) === HelperConstant.dashboardNameIndex.PendingOrders ? "" : "order-title"}>{item.OrderCode}</IonCardTitle>
                                        <IonRow>
                                            <IonCol sizeLg="12" sizeXl="12" sizeMd="12" sizeXs="12">
                                                <IonBadge color="warning">{item.ServiceType?.replace('a device', '')}</IonBadge>
                                                <IonBadge style={{ marginLeft: '4px' }} color="medium">{item.ProductTypeName}</IonBadge>
                                            </IonCol>
                                            {item.ReferralCode ?
                                                <IonCol sizeLg="12" sizeXl="12" sizeMd="12" sizeXs="12">
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
                                    </IonCardHeader>
                                </IonCol>
                                <IonCol offsetXs="0.5" sizeXl="2" offsetXl="0" offsetMd="0" sizeLg="2" sizeXs="6" sizeSm="12" sizeMd="4" className="ion-align-self-center">
                                    <IonRow>
                                        <IonCol sizeXs="12" sizeMd="12" sizeLg="12">
                                            <IonText>{item.BrandMasterName}</IonText>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeMd="12" sizeXs="12">
                                            <IonText>{item.SeriesModelName}</IonText>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeMd="12" sizeXs="12">
                                            <IonText>{item.ModelVariantName}</IonText>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>
                                <IonCol offsetXs="0.5" sizeXl="2" offsetXl="0" offsetMd="0" sizeLg="2" sizeXs="4" sizeSm="12" sizeMd="3" className="ion-align-self-center">
                                    <IonRow>
                                        <IonCol sizeXs="12" sizeMd="12" sizeLg="12">
                                            <IonText>{item.UserName}</IonText>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeMd="12" sizeXs="12">
                                            <IonText>{getCountryCodeStorage() == "in" ? "+91" : "+971"} {item.UserMobile}</IonText>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>
                                <IonCol sizeLg="1.5" sizeXl="1.5" sizeXs="3" sizeSm="3" sizeMd="2" offsetMd="2" offsetLg="0" offsetSm="0" offsetXs="0" offsetXl="0" className="ion-align-self-center">
                                    <IonRow>
                                        <IonCol className="db_minutes" sizeLg="12" sizeXs="12">
                                            <IonBadge color="medium">{item.StatusName}</IonBadge>
                                        </IonCol>
                                        {item.StatusId === HelperConstant.StatusId.COMPLETED ?
                                            <IonCol sizeLg="12" sizeMd="12" sizeXs="12">
                                                <IonText>{moment(item.CompletedDate).format("DD-MMM-YYYY HH:mm a")}</IonText> &nbsp;&nbsp;
                                            </IonCol>
                                            :
                                            <>
                                            </>
                                        }

                                    </IonRow>
                                </IonCol>
                                <IonCol sizeLg="2" sizeXl="2.5" sizeXs="9" sizeSm="9" sizeMd="4" className="ion-align-self-center db_address">
                                    <IonRow>
                                        <IonCol sizeLg="12" sizeXs="12" className="ion-align-self-center">
                                            <IonRow className="db_addressdetails">
                                                {parseInt(orderId) === HelperConstant.dashboardNameIndex.PendingOrders ?
                                                    <IonText>N/A</IonText>
                                                    :
                                                    <>
                                                        <IonText>{moment(item.AppointmentDate).format("DD-MMM-YYYY")}</IonText> &nbsp;&nbsp;
                                                        <IonText>{moment(item.StartTime).format('LT')} - {moment(item.EndTime).format('LT')}</IonText>
                                                    </>
                                                }
                                            </IonRow>
                                            <IonRow>
                                                <IonText className="db_addressdetails">
                                                    {item.AppointmentPincode && <>
                                                        <IonIcon icon={locationOutline} />
                                                        {item.AppointmentCity} - {item.AppointmentPincode}
                                                    </>
                                                    }
                                                </IonText>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                </IonCol>
                                {item?.AssigneeId <= 0 && (item?.StatusId !== HelperConstant.StatusId.FAILED && item?.StatusId !== HelperConstant.StatusId.CANCEL_REQUEST && item?.StatusId !== HelperConstant.StatusId.CANCELLED && item?.StatusId !== HelperConstant.StatusId.PENDING) ?
                                    <IonCol sizeLg="1" sizeXl="1" sizeXs="4" offsetXl="0" offsetLg="0" offsetMd="0" offsetSm="0" offsetXs="8" sizeMd="4" className="ion-align-self-center db_assignbtn_col">
                                        <IonButton className="db-assignbtn" size="small" color="warning"
                                            onClick={() => { setOrderId(item.Id); setShowModal(true); setTechnicianAssignId(0); }}>
                                            <IonIcon icon={arrowRedoCircleOutline} /> Assign
                                        </IonButton >
                                    </IonCol>
                                    :
                                    <IonCol sizeLg="1" sizeXl="1" sizeXs="12" offsetMd="8" offsetXl="0" offsetLg="0" sizeMd="4" className="ion-align-self-center db_assignbtn_col">
                                        <IonText className="db-assignName">{item.AssigneeName}</IonText>
                                    </IonCol>}

                                {/* <IonCol sizeLg="1" sizeXl="1" sizeSm="6" sizeXs="2" sizeMd="6" className="ion-align-self-center">
                                    <IonButtons className="ion-justify-content-center db_chevronbtn">
                                        <IonRouterLink className="cursor-pointer" onClick={() => { getOrderSummary(item.Id); }}>
                                            <IonIcon className="db-contentbtn" icon={chevronForwardCircleOutline} />
                                        </IonRouterLink>
                                    </IonButtons>
                                </IonCol> */}
                            </IonRow>
                        </IonCard>
                    )
                }
            }
        ],
        [orderId, utmLinks]
    );

    const getStatsName = (dashboardName?: number) => {
        dashboardName = dashboardName ? dashboardName : DashboardName;
        setMenuName(getStatusName(dashboardName));
    }

    const getOrders = (statsId: number, FromDate: any, ToDate: any, assign?: "assign") => {
        setDashboardName(statsId);
        getStatsName(statsId);
        const status = getStatusIds(statsId);

        postOrderList(productId, statsId, status, searchText, modelId, brandId, cityId, PromoCode, PersonId, FromDate, ToDate, CompletedStartDate, CompletedEndDate, HelperConstant.serviceTypeId.SELL, OffsetStart, RowsPerPage, assign);
    }

    useEffect(() => {
        getOrders(parseInt(orderId), FromDate, ToDate);
    }, [orderId, productId, brandId, modelId, cityId, PromoCode, PersonId, FromDate, ToDate, CompletedStartDate, CompletedEndDate, OffsetStart, RowsPerPage, searchText])

    const getOrderSummary = (id: any) => {
        window.location.href = "/AgentTicketView/" + id;
    }

    const GetDashboardStatsData = (isToday: boolean) => {
        SellServices.GetDashboardStats(isToday).then(res => {
            if (res.status === 200) {
                setDashboardStats(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const TechnicianAssigneeData = () => {
        SellServices.AssignProcess(OrderId, TechnicianAssignId).then(res => {
            if (res.status === 200) {
                setShowToast1(true);
                setShowModal(false);
                GetDashboardStatsData(isToday);
                getOrders(HelperConstant.dashboardNameIndex.InProgressOrders, FromDate, ToDate, "assign");
            }
        })
        setisButton(true);
    }

    function postOrderList(productTypeId: any, dashboardNameIndex?: any, statusId?: any, searchText?: any, seriesModelId?: any, brandMasterId?: any, cityId?: any, PromoCode?: any, PersonId?: any, FromDate?: any, ToDate?: any, CompletedStartDate?: any, CompletedEndDate?: any, ServiceTypeId?: any, OffsetStart?: any, RowsPerPage?: any, assign?: "assign") {
        const request: IPostOrdersModel = {
            OffsetStart: OffsetStart,
            RowsPerPage: RowsPerPage,
            SortOrder: "desc",
            SortOrderColumn: "modified",
            SearchText: searchText,
            ProductTypeId: productTypeId,
            StatusId: statusId,
            seriesModelId: seriesModelId,
            brandMasterId: brandMasterId,
            cityId: cityId,
            ReferralCodeId: PromoCode,
            FromDate: FromDate ? moment(FromDate).format('L') : null,
            ToDate: ToDate ? moment(ToDate).format('L') : null,
            CompletedStartDate: CompletedStartDate ? moment(CompletedStartDate).format('L') : null,
            CompletedEndDate: CompletedEndDate ? moment(CompletedEndDate).format('L') : null,
            PersonId: PersonId,
            ServiceTypeId: ServiceTypeId,
        };
        SellServices.PagedOrdersList(request).then(res => {
            if (res.status === 200) {
                setGetAllOrdersData(res.data.Items);
                setFilterData(res.data.Items);
                setRecordsCount(res.data.RecordsCount);
                if (assign === "assign") {
                    history.push(`/DashBoard/${dashboardNameIndex}`);
                    setisButton(false);
                }
                if (dashboardNameIndex) {
                    setDashboardName(dashboardNameIndex);
                    getStatsName(dashboardNameIndex);
                }
                setLoading(false);
            }
        });
    }

    const sellFilterData = () => {
        const SellData = FilterData.filter((x: any) => x.ServiceTypeId === HelperConstant.serviceTypeId.SELL)
        setGetAllOrdersData(SellData);
    }
    const repairFilterData = () => {
        const repairData = FilterData.filter((x: any) => x.ServiceTypeId === HelperConstant.serviceTypeId.REPAIR)
        setGetAllOrdersData(repairData);
    }

    const handleFilter = (text: any) => {
        setSearchText(text);
        dispatch(FilterDataId({ payload: 0, type: "OffsetStart" }));
    };

    useEffect(() => {
        GetLocation("sectionpage");
        GetHome(getLocalStorage()?.Token, "login");
        isValidUserAuthenticateForSeo(getDecodedAccessToken(getLocalStorage().Token));
        const GetDashboardStatsData = (isToday: boolean) => {
            SellServices.GetDashboardStats(isToday).then(res => {
                setDashboardStats(res.data);
            })
        }
        const AssigneeListData = () => {
            PersonServices.GetAssigneeList().then(res => {
                setAssigneeList(res.data);
            })
        }
        GetDashboardStatsData(isToday);
        AssigneeListData();
        // getOrders(DashboardName);
    }, [productId, brandId, modelId, isToday, searchText]);

    useEffect(() => {
        const getUtmLinkd = () => {
            MasterServices.GetUTMLinks().then(res => {
                if (res.status === 200) {
                    setUtmLinks(res.data);
                }
            }).catch(e => {
                console.log(e);
            });
        }

        getUtmLinkd();
    }, []);

    return (
        <IonPage>
            <IonContent>
                <IonGrid className="ion-no-padding">
                    <IonRow className="page-header">
                        <IonTitle className="page-title db_hide-header">Welcome to DOFY Admin Portal</IonTitle>
                        <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeXs="12" className="db_hide-header">
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" style={{ marginTop: '0px', width: '100%' }}>
                            {loading === false ?
                                <CustomDataTable headerText={MenuName} data={GetAllOrdersData}
                                    columns={columns} pagination={true} height={'1000px'} addRouterLink={"/DashBoard"} noBorder={true} filterShow={`/DashBoard/${orderId}`} setsearchData={handleFilter} onClickSell={() => sellFilterData()} onClickRepair={() => repairFilterData()} RecordsCount={recordsCount} >
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
                    <IonRow>
                        <IonCol size="12">
                            <IonModal isOpen={showModal} animated={true} swipeToClose={true} className="modal-assignee"
                                onDidDismiss={() => setShowModal(false)}>
                                {/* <IonGrid className="ion-padding" style={{ width: '100%' }}> */}
                                <IonRow>
                                    <IonCol sizeXl="12" sizeXs="12" sizeMd="12" sizeSm="12" className="p-0">
                                        <IonItem lines="none">
                                            <IonTitle onClick={() => setShowModal(false)} className="Assign-Order p-0">Assign Order</IonTitle>
                                            <IonButtons className="cursor-pointer" onClick={() => setShowModal(false)}>
                                                <IonIcon icon={closeOutline}></IonIcon>
                                            </IonButtons>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol sizeXl="12" sizeXs="12" sizeMd="12" sizeSm="12" className="p-0" >
                                        <CustomDropdown label={"Select Assignee"} data={AssigneeList} onIonChange={(e: any) => setTechnicianAssignId(e)} />
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol className="text-center mt-4" size="12">
                                        <IonButton color="primary" disabled={isButton} onClick={() => TechnicianAssigneeData()} >ok</IonButton>
                                        <IonButton color="warning" onClick={() => setShowModal(false)} >Close</IonButton>
                                    </IonCol>
                                </IonRow>
                                {/* </IonGrid> */}
                            </IonModal>
                        </IonCol>
                    </IonRow>
                    <IonToast color='success' isOpen={showToast1} onDidDismiss={() => setShowToast1(false)}
                        message="Assigned successfully." duration={2000} />
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default DashBoard;