import { useEffect, useState } from 'react';
import "./ViewOrders.css";
import SellOrderServices from "@/services/order/sell/SellOrder.Services";
import { IOrderModel } from '@/models/Order.Model';
import { Direction, SSRDetection, currencyByCountry, getCookiesFromServer, getLocalStorage, getUserLanguage, getUserLocationForParam, toAmount } from '@/components/helper/Helper';
import { HelperConstant } from '@/components/helper/HelperConstant';
import { useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { addressPageChange } from '@/features/reducers/address/AddressPageChange.Reducers';
import Language from "./ViewOrdersLanguage.json";
import moment from "moment";
import { ellipseSharp, informationCircleOutline } from 'ionicons/icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { IGetOrderListModel } from '@/models/order/sell/GetOrderList.Model';
import SEOServices from '@/services/SEO.Services';
import { ISEOModel } from '@/models/SEO.Model';
import MetaTags from '@/components/metatags/MetaTags';

const OrderPayout = dynamic(() => import('@/components/orderpayout/OrderPayout').then(mod => mod.OrderPayout), { ssr: false });
const IonSearchBar = dynamic(() => import('@ionic/react').then(res => res.IonSearchbar), { ssr: false });

type ViewOrdersData = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    orderData: Array<IOrderModel>,
    metaTags: ISEOModel
}

const fetchData = async (context: any): Promise<ViewOrdersData> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let personId = getLocalStorage().PersonId;
    let data: IGetOrderListModel = {
        OffsetStart: 0,
        RowsPerPage: 10,
        SortOrder: '',
        SortOrderColumn: '',
        SearchText: null,
        PersonId: parseInt(personId),
        StatusIds: null,
        FromDate: null,
        ToDate: null
    };
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };
    let orderDataRes = await SellOrderServices.GetPersonOrders(data, header.LanguageCode, header.CountryCode)
    let orderData = await (orderDataRes.status === 200 && orderDataRes.data.Items);
    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.ViewOrder, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsData.status === 200 && metaTagsData.data);

    return { orderData, direction, language, metaTags }
}

function ViewOrders({ orderData, direction, language, metaTags }: ViewOrdersData) {
    let dataLocalization = Language[getUserLanguage()];
    const skeletonLength = 25;
    const [filteredData, setfilteredData] = useState<Array<IOrderModel>>([]);
    const [isReferral, setIsReferral] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    let history = useRouter();
    let dispatch = useTypedDispatch();

    const { NEXT_PUBLIC_SSR } = process.env;
    const [vieworderData, seVieworderData] = useState<ViewOrdersData>({
        orderData, direction, language, metaTags,
    });

    const searchHandler = (searchText: string) => {
        if (searchText === "") {
            setfilteredData(vieworderData.orderData);
        }
        else {
            let resultArray = Array<IOrderModel>();
            vieworderData.orderData.forEach((data, i) => {
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
            history.push(`/${getUserLanguage()}${getUserLocationForParam(vieworderData.language)}/pending-order-detail/${id}`);
        }
        if (type === HelperConstant.serviceTypeId.REPAIR) {
            localStorage.setItem("RepairorderId", id);
            dispatch(addressPageChange("currentaddress"));
            history.push(`/${getUserLanguage()}${getUserLocationForParam(vieworderData.language)}/Repair-schedule/${id}`);
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
        // if (NEXT_PUBLIC_SSR == 'false') {
        fetchData("").then(res => {
            seVieworderData({
                orderData: res.orderData,
                direction: res.direction,
                language: res.language,
                metaTags: res.metaTags,
            });
            setfilteredData(res.orderData);
        });
        // }
        // else {
        //     setfilteredData(orderData);
        // }
        setLoading(false);
        removeLocalOrders();
    }, []);
    return (
        <ion-app data-aos="fade-down">
            <MetaTags metaTags={vieworderData.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={vieworderData.language} />
            <ion-content>
                <ion-grid class="vo_padding-adjustment" dir={vieworderData.direction}>
                    <ion-row class='vo-choose-col'>
                        <ion-col size-lg='6' size-xs='12' class='align-self-center vo_title-style'>
                            <ion-text style={{ fontSize: "20px" }}>{dataLocalization.Orders}</ion-text>
                        </ion-col>
                        <ion-col size-lg='6'>
                            <IonSearchBar className='vw-searchbar' placeholder={dataLocalization.Search} onIonChange={(e) => searchHandler(e.detail.value!)}></IonSearchBar>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        {filteredData && filteredData.length > 0 ?
                            filteredData.map((value: IOrderModel, i) => {
                                return <ion-col size-lg='4' size-xl='4' size-xs='12' size-md='6' size-sm='12' key={i}>
                                    <ion-card class='vo-orders-card dd-card-height'>
                                        <ion-row>
                                            <ion-col size-lg='12' class='ion-padding-start'>
                                                <ion-row>
                                                    <ion-col size-lg='12' >
                                                        <ion-label>{dataLocalization.Order_No}: <b> {value.OrderCode}</b></ion-label>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-col>
                                        </ion-row>
                                        <ion-row>
                                            <ion-col size-lg='12'>
                                                <ion-card class="vo-orders-card-inline">
                                                    <ion-row>
                                                        <ion-col size="6" class="vo-orders-card-inline-card vo-orders-card-inline-card-0">
                                                            <ion-row>
                                                                <ion-col size="6" >
                                                                    <img src={`${HelperConstant.imageAPI}/${value.ThumbnailPath}`} alt={value.ThumbnailPath} style={{ height: '30px' }} />
                                                                </ion-col>
                                                                <ion-col size="6" class="vo-orders-card-inline-adjustment">
                                                                    <ion-text>{value.BrandMasterName}</ion-text><br />
                                                                    <ion-label></ion-label>
                                                                </ion-col>
                                                            </ion-row>
                                                        </ion-col>
                                                        <ion-col size="6" class="vo-orders-card-inline-card">
                                                            <ion-row>
                                                                <ion-col size="12" class="vo-orders-card-inline-adjustment">
                                                                    <ion-text>{value.SeriesModelName}</ion-text><br />
                                                                    <ion-label>{value.ModelVariantName}</ion-label>
                                                                </ion-col>
                                                            </ion-row>
                                                        </ion-col>
                                                    </ion-row>
                                                </ion-card>
                                            </ion-col>
                                            <ion-col size="12">
                                                <ion-card class="vo-orders-card-inline-details">
                                                    <ion-row>
                                                        <ion-col size="6" >
                                                            <ion-label>{dataLocalization.Selling_price}</ion-label>
                                                        </ion-col>
                                                        <ion-col size="6" >
                                                            <ion-text>{currencyByCountry((value?.TotalAmount > 0) ? toAmount(value?.TotalAmount) : 0, vieworderData.language)}/-</ion-text>
                                                            <ion-icon class='cursor-pointer ion-hide-sm-up' src={informationCircleOutline} onMouseEnter={() => setIsReferral(value.Id)} onMouseLeave={() => setIsReferral(0)} /><br />
                                                        </ion-col>
                                                    </ion-row>
                                                </ion-card>
                                            </ion-col>
                                            <ion-col size="12">
                                                <ion-card class="vo-orders-card-inline-details">
                                                    <ion-row>
                                                        <ion-col size="6" >
                                                            <ion-label>{dataLocalization.Appointmenent_Date}</ion-label>
                                                        </ion-col>
                                                        <ion-col size="6" >
                                                            {(value.AppointmentDate !== null && value.StatusName !== HelperConstant.orderStatus.Pending) && <ion-text class='vorder-texts'>{moment(value.AppointmentDate).format("L")}</ion-text>}
                                                        </ion-col>
                                                    </ion-row>
                                                </ion-card>
                                            </ion-col>
                                            <ion-col size="12">
                                                {(isReferral === value.Id) &&
                                                    <div className='ion-hide-sm-up vo-referral'>
                                                        <OrderPayout language={vieworderData.language} setIsReferral={setIsReferral} orderPayout={
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
                                                <ion-card class="vo-orders-card-inline-details">
                                                    <ion-row>
                                                        <ion-col size="6" >
                                                            <ion-label>{dataLocalization.Status}</ion-label>
                                                        </ion-col>
                                                        <ion-col size="6" >
                                                            <ion-icon color={getStatusColor(value.StatusId)} icon={ellipseSharp} title={value.StatusName} />
                                                            <ion-text >{value.StatusName}</ion-text>
                                                        </ion-col>
                                                    </ion-row>
                                                </ion-card>
                                            </ion-col>
                                            <ion-col size="12" class='btn-vieworder-col'>
                                                <ion-row>
                                                    {value.AppointmentPincode === null ?
                                                        <ion-col size-xl='12' size-lg='12' size-md='12' size-xs='12' >
                                                            <ion-button expand='full' class='btn-vieworder' color='white' onClick={() => routerHandler(value.Id, value.ServiceTypeId)}>{dataLocalization.Continue}</ion-button>
                                                        </ion-col>
                                                        :
                                                        <ion-col size-xl='12' size-lg='12' size-md='12' size-xs='12' class='ion-text-center ' >
                                                            <ion-button expand='full' class='btn-vieworder' color='white' onClick={() => history.push(`/${getUserLanguage()}${getUserLocationForParam(vieworderData.language)}/view-orders-details/${value.Id}`)}> view</ion-button>
                                                        </ion-col>
                                                    }
                                                </ion-row>
                                            </ion-col>
                                        </ion-row>
                                    </ion-card>
                                </ion-col>
                            })
                            : null
                        }
                    </ion-row>
                </ion-grid>
            </ion-content>
        </ion-app>
    )
}

// export const getServerSideProps: GetServerSideProps<ViewOrdersData> = async (context) => {
//     // const { NEXT_PUBLIC_SSR } = process.env;

//     // let direction = "";
//     // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
//     // let orderData = [] as any;
//     // let metaTags = {} as ISEOModel;

//     // if (NEXT_PUBLIC_SSR == 'true') {
//     const { orderData, direction, language, metaTags } = await fetchData(context);
//     return { props: { orderData, direction, language, metaTags } }
//     // }

//     // return { props: { orderData, direction, language, metaTags } }

// }
export default ViewOrders
