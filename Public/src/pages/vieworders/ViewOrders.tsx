import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonSearchbar, IonText } from '@ionic/react';
import { ellipseSharp, informationCircleOutline } from 'ionicons/icons';

import "./ViewOrders.css";

import { OrderPayout } from '../../components/orderpayout/OrderPayout';

import SellOrderServices from "../../services/order/sell/SellOrder.Services";
import { IOrderModel } from '../../models/Order.Model';

import { Direction, authUser, currencyByCountry, getLocalStorage, getUserLanguage, getUserLocationForParam, toAmount } from '../../components/helper/Helper';
import { HelperConstant } from '../../components/helper/HelperConstant';
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks';
import { addressPageChange } from '../../features/reducers/address/AddressPageChange.Reducers';
import { CustomImg } from '../../components/shared/CustomImage';
import Language from "./ViewOrdersLanguage.json";

import moment from "moment";
import { Skeleton } from '../../components/skeleton/Skeleton';

let dataLocalization = Language[getUserLanguage()];
function ViewOrders() {

    const skeletonLength = 25;

    const [orderData, setOrderData] = useState<Array<IOrderModel>>([]);
    const [filteredData, setfilteredData] = useState<Array<IOrderModel>>([]);
    const [isReferral, setIsReferral] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    // const orderStatus = [{ Name: "All Orders", value: "" }, { Name: "Pending", value: "Pending" }, { Name: "Scheduled", value: "Scheduled" }, { Name: "Failed", value: "Failed" },
    // { Name: "In-Progress", value: "In-progress" }, { Name: "Cancelled", value: "Cancelled" }, { Name: "Cancel Requested", value: "Cancel Requested" }, { Name: "Completed", value: "Completed" }];

    let history = useHistory();
    let dispatch = useTypedDispatch();

    const searchHandler = (searchText: string) => {
        if (searchText === "") {
            setfilteredData(orderData);
        }
        else {
            let resultArray = Array<IOrderModel>();
            orderData.forEach((data, i) => {
                let toBeFiltered = Object.values(data).join('').toLowerCase().includes(searchText.toLowerCase());
                if (toBeFiltered) {
                    resultArray.push(data);
                }
            });
            setfilteredData(resultArray);
        }
    }

    const routerHandler = (id: any, type: number) => {
        if (type === HelperConstant.serviceTypeId.SELL) {
            localStorage.setItem("orderId", id);
            dispatch(addressPageChange("currentaddress"));
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/pending-order-detail/${id}`);
        }
        if (type === HelperConstant.serviceTypeId.REPAIR) {
            localStorage.setItem("RepairorderId", id);
            dispatch(addressPageChange("currentaddress"));
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/Repair-schedule/${id}`);
        }
    }

    const removeLocalOrders = () => {
        localStorage.removeItem("orderId");
        localStorage.removeItem("RepairorderId");
    }

    const getSelectStatus = (value: any, filterType: "status" | "type") => {
        if (filterType === "type" && value !== "") {
            const serviceRes = orderData.filter((x: IOrderModel) => x.ServiceTypeId === parseInt(value));
            if (serviceRes.length > 0) {
                setfilteredData(serviceRes);
            }
        }
        if (filterType === "status" && value !== "") {
            const statusRes = orderData.filter((x: IOrderModel) => x.StatusName === value);
            if (statusRes.length > 0) {
                setfilteredData(statusRes);
            }
        }
        else {
            setfilteredData(orderData);
        }
    }

    const getStatusColor = (StatusId: number) => {
        if (StatusId === HelperConstant.orderStatusId.Scheduled) {
            return "warning"
        }
        if (StatusId === HelperConstant.orderStatusId.InProgress || StatusId === HelperConstant.orderStatusId.Assigned || StatusId === HelperConstant.orderStatusId.Rescheduled || StatusId === HelperConstant.orderStatusId.Requote) {
            return "primary"
        }
        if (StatusId === HelperConstant.orderStatusId.completed) {
            return "success"
        }
        if (StatusId === HelperConstant.orderStatusId.cancel || StatusId === HelperConstant.orderStatusId.Failed || StatusId === HelperConstant.orderStatusId.Delayed || StatusId === HelperConstant.orderStatusId.cancelRequest) {
            return "danger"
        }
        if (StatusId === HelperConstant.orderStatusId.Pending) {
            return ""
        }
    }

    useEffect(() => {
        const getOrders = () => {
            SellOrderServices.GetPersonOrders({
                OffsetStart: 0, RowsPerPage: 10, SortOrder: '', SortOrderColumn: '', SearchText: null, PersonId: getLocalStorage()?.PersonId, StatusIds: null, FromDate: null,
                ToDate: null
            }).then(res => {
                if (res.status === 200) {
                    setOrderData(res.data.Items);
                    setfilteredData(res.data.Items);
                    setLoading(false);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }
        removeLocalOrders();
        getOrders();
    }, []);

    useEffect(() => {
        authUser();
    }, []);

    return (
        <IonPage data-aos="fade-down">
            <IonContent>
                {/* <IonGrid className='p-0 sd-grid view-orders-grid bg-color-white' dir={Direction()}>
                    <IonRow className='vw-header-row'>
                        <IonCol sizeLg='2' sizeMd='3' sizeSm='12' sizeXs='12'>
                            <IonText className='vw-header-text'> {dataLocalization.Orders}</IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className='vw-header-rows vw-row'>
                        <IonCol sizeLg='3' sizeMd='3' sizeSm='12' sizeXs='12' className='ion-padding'>
                            <IonText className=' vw-header-texts'>{dataLocalization.Orders}</IonText>
                        </IonCol>
                        <IonCol offsetLg='5' sizeLg='4' sizeMd='5' offsetMd='4' sizeXs='12'>
                            <IonSearchbar className='vw-searchbar' placeholder={dataLocalization.Search} onIonChange={e => searchHandler(e.detail.value!)}></IonSearchbar>
                        </IonCol>
                    </IonRow>
                    <IonRow >
                       
                        {(!loading) ?
                            <IonCol className='ion-padding-horizontal ion-margin-top' sizeXl='12' sizeLg='12' sizeXs='12'>
                                {filteredData && filteredData.length > 0 ?
                                    filteredData.map((value: IOrderModel, i) => {
                                        return <IonCard key={i} className="bg-color-white">
                                            <IonCardContent>
                                                <IonRow>
                                                    <IonCol sizeXl='12' sizeLg='12' sizeXs='10' >
                                                        <IonText className='vw-text'>{value.OrderCode}</IonText><br />
                                                    </IonCol>
                                                   
                                                    {value.AppointmentPincode !== null &&
                                                        <IonCol sizeXl='2' sizeLg='2' className='ion-text-center ion-margin-top ion-hide-sm-up' >
                                                            <IonIcon onClick={() => history.push(`/${getUserLanguage()}${getUserLocationForParam()}/view-orders-details/${value.Id}`)} icon={chevronForwardCircleSharp} className='vw-icon-size cursor-pointer' title='view orders'></IonIcon>
                                                        </IonCol>
                                                    }
                                                </IonRow>
                                                <IonRow>
                                                    <IonCol sizeXl='1' sizeLg='1' sizeMd='1.5' sizeXs='4'>
                                                        <CustomImg src={`${HelperConstant.imageAPI}/${value.ThumbnailPath}`} alt={value.ThumbnailPath} style={{ height: '80px' }} />
                                                    </IonCol>

                                                    <IonCol sizeXl='2.5' sizeLg='2' sizeMd='2' sizeXs='8' className='ion-margin-top' onMouseLeave={() => setIsReferral(0)}>
                                                        <IonText className='vw-text'>{value.BrandMasterName}</IonText><br />
                                                        <IonText>{value.SeriesModelName}</IonText><br />
                                                        <IonText>{value.ModelVariantName}</IonText><br />
                                                        <IonText className='ion-hide-sm-up vw-texts'>Sell Amount:{currencyByCountry((value?.TotalAmount > 0) ? toAmount(value?.TotalAmount) : 0)}</IonText>
                                                        <IonIcon className='cursor-pointer ion-hide-sm-up' src={informationCircleOutline} onMouseEnter={() => setIsReferral(value.Id)} /><br />
                                                        {(isReferral === value.Id) &&
                                                            <div className='ion-hide-sm-up'>
                                                                <OrderPayout orderPayout={
                                                                    {
                                                                        Payout:
                                                                        {
                                                                            Adjustment: value?.Adjustment,
                                                                            ReferralAmount: value?.ReferralAmount,
                                                                            TotalAmount: value?.TotalAmount,
                                                                            RequoteAmount: value?.RequoteAmount,
                                                                            SuggestedCost: value?.SuggestedCost
                                                                        }
                                                                    }
                                                                } ReferralCode={value?.ReferralCode} />
                                                            </div>
                                                        }
                                                    </IonCol>

                                                    <IonCol sizeXl='2.2' sizeLg='1.5' offsetXl='0' offsetLg='0.5' sizeMd='3.5' sizeXs='8' className=' ion-margin-top ion-hide-sm-down' onMouseLeave={() => setIsReferral(0)}>
                                                        {value.ServiceTypeId === 3
                                                            ?
                                                            <IonText className='vw-texts ion-text-center'>{dataLocalization.Repair_Amount} {(value?.TotalAmount) ? toAmount(value?.TotalAmount) : 0}</IonText>
                                                            :
                                                            <>
                                                                <IonText className='vw-texts ion-text-center no-wrap'>{dataLocalization.Sell_Amount}{(value?.TotalAmount > 0) ? toAmount(value?.TotalAmount) : 0}</IonText>&nbsp;
                                                                <IonIcon className='cursor-pointer ion-hide-sm-down' src={informationCircleOutline} onMouseEnter={() => setIsReferral(value.Id)} /><br />
                                                                {value.OrderDate && <IonText className='vw-texts ion-text-center'>{dataLocalization.Order_Date}{moment(value.OrderDate).format("L")}</IonText>}
                                                            </>
                                                        }
                                                        {(isReferral === value.Id) &&
                                                            <div className='ion-hide-sm-down'>
                                                                <OrderPayout orderPayout={
                                                                    {
                                                                        Payout:
                                                                        {
                                                                            Adjustment: value?.Adjustment,
                                                                            ReferralAmount: value?.ReferralAmount,
                                                                            TotalAmount: value?.TotalAmount,
                                                                            RequoteAmount: value?.RequoteAmount,
                                                                            SuggestedCost: value?.SuggestedCost
                                                                        }
                                                                    }} ReferralCode={value?.ReferralCode} />
                                                            </div>
                                                        }
                                                    </IonCol>

                                                    <IonCol sizeXl='2.8' sizeLg='3' sizeMd='3.5' offsetLg='0.5' sizeXs={value.AppointmentPincode === null ? '7' : "12"} className='ion-margin-top vorder-border'>
                                                        <IonCol sizeXs='9' offsetXs='0' className='vw-icon-dot'>
                                                            <IonIcon color={getStatusColor(value.StatusId)} icon={ellipseSharp} title={value.StatusName} />
                                                        </IonCol>
                                                        <IonCol><IonText className='vorder-texts'><b>{value.StatusName}</b></IonText><br /></IonCol>
                                                        <IonText>Your Order is {value.StatusName}</IonText><br />
                                                        {(value.AppointmentDate !== null && value.StatusName !== HelperConstant.orderStatus.Pending) && <IonText className='vorder-texts'>{dataLocalization.Appointmenent_Date}{moment(value.AppointmentDate).format("L")}</IonText>} <br />
                                                    </IonCol>

                                                    {value.AppointmentPincode === null ?
                                                        <IonCol sizeXl='2' sizeLg='2' sizeMd='1' offsetLg="1" className='ion-hide-sm-down' >
                                                            <IonButton size='small' onClick={() => routerHandler(value.Id, value.ServiceTypeId)}>{dataLocalization.Continue}</IonButton>
                                                        </IonCol>
                                                        :
                                                        <IonCol sizeXl='2' sizeLg='2' offsetLg="1" className='ion-text-center ion-margin-top ion-hide-sm-down' >
                                                            <IonIcon onClick={() => history.push(`/${getUserLanguage()}${getUserLocationForParam()}/view-orders-details/${value.Id}`)} icon={chevronForwardCircleSharp} className='vw-icon-size cursor-pointer' title='view orders' />
                                                        </IonCol>
                                                    }
                                                    {value.AppointmentPincode === null &&
                                                        <IonCol sizeXl='2' sizeLg='2' sizeXs='5' className='ion-text-center ion-hide-sm-up' >
                                                            <IonButton onClick={() => routerHandler(value.Id, value.ServiceTypeId)}>{dataLocalization.Continue}</IonButton>
                                                        </IonCol>
                                                    }
                                                </IonRow>
                                            </IonCardContent>
                                        </IonCard>
                                    })
                                    :
                                    <IonCardHeader className='header' >
                                        <IonChip>
                                            <IonLabel color='black'>{dataLocalization.No_records_found}</IonLabel>
                                        </IonChip>
                                    </IonCardHeader>
                                }
                            </IonCol>
                            :
                            <IonCol className='ion-padding-horizontal ion-margin-top' sizeXl='12' sizeLg='12' sizeXs='12'>
                                {Array.from({ length: skeletonLength }).map((val, index) => (
                                    <IonCard key={index} className="bg-color-white">
                                        <IonCardContent>
                                            <IonRow>
                                                <IonCol sizeXl='12' sizeLg='12' sizeXs='10' >
                                                    <IonSkeletonText animated className='vw-text'></IonSkeletonText>
                                                </IonCol>
                                                <IonCol sizeXl='2' sizeLg='2' className='ion-text-center ion-margin-top ion-hide-sm-up' >
                                                    <IonIcon icon={chevronForwardCircleSharp} className='vw-icon-size cursor-pointer' title='view orders'></IonIcon>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol sizeXl='1' sizeLg='1' sizeMd='2' sizeXs='6'>
                                                    <IonThumbnail style={{ height: '80px' }} >
                                                        <IonSkeletonText animated className='vw-text'></IonSkeletonText>
                                                    </IonThumbnail>
                                                </IonCol>
                                                <IonCol sizeXl='2' sizeLg='2' sizeMd='2' sizeXs='6' className='ion-margin-top' onMouseLeave={() => setIsReferral(0)}>
                                                    <IonSkeletonText animated className='vw-text'></IonSkeletonText>
                                                    <IonSkeletonText animated className='vw-text'></IonSkeletonText>
                                                </IonCol>
                                                <IonCol sizeXl='2.2' sizeLg='1.5' offsetXl='0' offsetLg='0.5' sizeMd='3' sizeXs='8' className=' ion-margin-top ion-hide-sm-down' onMouseLeave={() => setIsReferral(0)}>
                                                    <IonSkeletonText animated className='vw-text'></IonSkeletonText>
                                                    <IonSkeletonText animated className='vw-text'></IonSkeletonText>
                                                </IonCol>
                                                <IonCol sizeXl='2.8' sizeLg='3' sizeMd='3.5' offsetLg='1' className='ion-margin-top vorder-border'>
                                                    <IonSkeletonText animated className='vw-text'></IonSkeletonText>
                                                    <IonSkeletonText animated className='vw-text'></IonSkeletonText>
                                                </IonCol>
                                                <IonCol sizeXl='2' sizeLg='2' offsetLg="1" className='ion-text-center ion-margin-top ion-hide-sm-down' >
                                                    <IonSkeletonText animated className='vw-text'></IonSkeletonText>
                                                </IonCol>
                                                <IonCol sizeXl='2' sizeLg='2' sizeXs='5' className='ion-text-center ion-hide-sm-up' >
                                                    <IonSkeletonText animated className='vw-text'></IonSkeletonText>
                                                </IonCol>
                                            </IonRow>
                                        </IonCardContent>
                                    </IonCard>
                                ))}
                            </IonCol>
                        }
                    </IonRow>
                </IonGrid> */}
                <IonGrid className="vo_padding-adjustment" dir={Direction()}>
                    <IonRow className='vo-choose-col'>
                        <IonCol sizeLg='6' sizeXs='12' className='align-self-center vo_title-style'>
                            <IonText style={{ fontSize: "20px" }}>{dataLocalization.Orders}</IonText>
                        </IonCol>
                        <IonCol sizeLg='6'>
                            <IonSearchbar className='vw-searchbar' placeholder={dataLocalization.Search} onIonChange={e => searchHandler(e.detail.value!)}></IonSearchbar>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {filteredData && filteredData.length > 0 ?
                            filteredData.map((value: IOrderModel, i) => {
                                return <IonCol sizeLg='4' sizeXl='4' sizeXs='12' sizeMd='6' sizeSm='12' key={i}>
                                    <IonCard className='vo-orders-card dd-card-height'>
                                        <IonRow>
                                            <IonCol sizeLg='12' className='ion-padding-start'>
                                                <IonRow>
                                                    <IonCol sizeLg='12' >
                                                        <IonLabel>{dataLocalization.Order_No}:<b> {value.OrderCode}</b></IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol sizeLg='12'>
                                                <IonCard className="vo-orders-card-inline">
                                                    <IonRow>
                                                        <IonCol size="6" className="vo-orders-card-inline-card vo-orders-card-inline-card-0">
                                                            <IonRow>
                                                                <IonCol size="6" >
                                                                    <CustomImg src={`${HelperConstant.imageAPI}/${value.ThumbnailPath}`} alt={value.ThumbnailPath} style={{ height: '30px' }} />
                                                                </IonCol>
                                                                <IonCol size="6" className="vo-orders-card-inline-adjustment">
                                                                    <IonText>{value.BrandMasterName}</IonText><br />
                                                                    <IonLabel></IonLabel>
                                                                </IonCol>
                                                            </IonRow>
                                                        </IonCol>
                                                        <IonCol size="6" className="vo-orders-card-inline-card">
                                                            <IonRow>
                                                                {/* <IonCol size="3" >
                                                                    <CustomImg src={`${HelperConstant.imageAPI}/${value.ThumbnailPath}`} alt={value.ThumbnailPath} style={{ height: '30px' }} />
                                                                </IonCol> */}
                                                                <IonCol size="12" className="vo-orders-card-inline-adjustment">
                                                                    <IonText>{value.SeriesModelName}</IonText><br />
                                                                    <IonLabel>{value.ModelVariantName}</IonLabel>
                                                                </IonCol>
                                                            </IonRow>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCard>
                                            </IonCol>
                                            <IonCol size="12">
                                                <IonCard className="vo-orders-card-inline-details">
                                                    <IonRow>
                                                        <IonCol size="6" >
                                                            <IonLabel>{dataLocalization.Selling_price}</IonLabel>
                                                        </IonCol>
                                                        <IonCol size="6" >
                                                            <IonText>{currencyByCountry((value?.TotalAmount > 0) ? toAmount(value?.TotalAmount) : 0)}/-</IonText>
                                                            <IonIcon className='cursor-pointer ion-hide-sm-up' src={informationCircleOutline} onMouseEnter={() => setIsReferral(value.Id)} onMouseLeave={() => setIsReferral(0)} /><br />
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCard>
                                            </IonCol>
                                            <IonCol size="12">
                                                <IonCard className="vo-orders-card-inline-details">
                                                    <IonRow>
                                                        <IonCol size="6" >
                                                            <IonLabel>{dataLocalization.Appointmenent_Date}</IonLabel>
                                                        </IonCol>
                                                        <IonCol size="6" >
                                                            {(value.AppointmentDate !== null && value.StatusName !== HelperConstant.orderStatus.Pending) && <IonText className='vorder-texts'>{moment(value.AppointmentDate).format("L")}</IonText>}
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCard>
                                            </IonCol>
                                            <IonCol size="12">
                                                {(isReferral === value.Id) &&
                                                    <div className='ion-hide-sm-up vo-referral'>
                                                        <OrderPayout setIsReferral={setIsReferral} orderPayout={
                                                            {
                                                                Payout:
                                                                {
                                                                    Adjustment: value?.Adjustment,
                                                                    ReferralAmount: value?.ReferralAmount,
                                                                    TotalAmount: value?.TotalAmount,
                                                                    RequoteAmount: value?.RequoteAmount,
                                                                    SuggestedCost: value?.SuggestedCost
                                                                }
                                                            }
                                                        } ReferralCode={value?.ReferralCode} />
                                                    </div>
                                                }
                                                <IonCard className="vo-orders-card-inline-details">
                                                    <IonRow>
                                                        <IonCol size="6" >
                                                            <IonLabel>{dataLocalization.Status}</IonLabel>
                                                        </IonCol>
                                                        <IonCol size="6" >
                                                            <IonIcon color={getStatusColor(value.StatusId)} icon={ellipseSharp} title={value.StatusName} />
                                                            <IonText >{value.StatusName}</IonText>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCard>
                                            </IonCol>
                                            <IonCol size="12" className='btn-vieworder-col'>
                                                <IonRow>
                                                    {value.AppointmentPincode === null ?
                                                        <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeXs='12' >
                                                            <IonButton expand='full' className='btn-vieworder' color='white' onClick={() => routerHandler(value.Id, value.ServiceTypeId)}>{dataLocalization.Continue}</IonButton>
                                                        </IonCol>
                                                        :
                                                        <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeXs='12' className='ion-text-center ' >
                                                            {/* <IonIcon onClick={() => history.push(`/${getUserLanguage()}${getUserLocationForParam()}/view-orders-details/${value.Id}`)} icon={chevronForwardCircleSharp} className='vw-icon-size cursor-pointer' title='view orders' /> */}
                                                            <IonButton expand='full' className='btn-vieworder' color='white' onClick={() => history.push(`/${getUserLanguage()}${getUserLocationForParam()}/view-orders-details/${value.Id}`)}> view</IonButton>
                                                        </IonCol>
                                                    }
                                                    {/* {value.AppointmentPincode === null &&
                                                        <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeXs='12' className='ion-text-center ' >
                                                            <IonButton expand='full' className='btn-vieworder' color='white' onClick={() => routerHandler(value.Id, value.ServiceTypeId)}>{dataLocalization.Continue}</IonButton>
                                                        </IonCol>
                                                    } */}
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                    </IonCard>
                                </IonCol>
                            })
                            :
                            Skeleton()

                        }
                    </IonRow>
                </IonGrid >
            </IonContent >
        </IonPage >
    )
}
export default ViewOrders


