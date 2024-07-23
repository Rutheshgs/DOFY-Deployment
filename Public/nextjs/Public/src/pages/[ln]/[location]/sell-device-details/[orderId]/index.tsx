import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
// import { useHistory, useParams } from "react-router-dom";
// import { ion-alert, ion-button, ion-card, ion-col, ion-content, ion-grid, ion-icon, IonImg, ion-input, ion-item, ion-label, ion-app ion-row, ion-text, ion-toast } from "@ionic/react"
// import { alertCircleOutline, trashOutline } from "ion-icons/icons";

import { addressPageChange } from "@/features/reducers/address/AddressPageChange.Reducers";
import { ResetInputParam } from "@/features/reducers/shared/InputParams.Reducers";
import { resetPageChange } from "@/features/reducers/selldevice/PageChange.Reducer";
import { useTypedDispatch, useTypedSelector } from "@/features/reduxhooks/ReduxHooks";

import SellOrderServices from "@/services/order/sell/SellOrder.Services";
import RefferalCodeServices from "@/services/RefferalCode.Services";
import { ISellOrderModel } from "@/models/order/sell/SellOrder.Model";
import { IReferralCodeModel } from "@/models/ReferralCode.Model";

import Footer from "@/components/footer/Footer";

import { HelperConstant } from "@/components/helper/HelperConstant";
import { CustomImg } from "@/components/shared/CustomImage";
import { androidDevice, capacitorDevice, currencyByCountry, Direction, findBrowser, findWindow, getLocalStorage, getUserLanguage, getUserLocationForParam, IOSDevice, isValidUser, restrictInput, SSRDetection, toAmount } from "@/components/helper/Helper";

import Language from "./DeviceDetailsLanguage.json";
import moment from "moment";
import './Devicedetails.css';
import { isPlatform } from "@ionic/core";
import ApplyBtn from "../../../assets/images/Applybtn.png";
import { Button, Input, TextField } from "@mui/material";
import { alertCircleOutline, thumbsDown, thumbsUp, trashOutline, thumbsUpSharp, thumbsDownSharp } from "ionicons/icons";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next/types";
import ContactUsServices from "@/services/ContactUs.Services";
import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from "@/models/SEO.Model";
import SEOServices from "@/services/SEO.Services";


type SellDevice = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    orderList: any,
    isPendingOrderDetail: boolean
    ReEvaluteOrder: any,
    metaTags: ISEOModel,
    address: any;
}

const fetchData = async (context: any): Promise<SellDevice> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };
    let Id = context ? context.query.orderId : findWindow() && window.location.pathname.split('/').at(-1)?.toString();
    let isPendingOrderDetail = context ? context.resolvedUrl.includes('/pending-order-detail') : findWindow() && window.location.pathname.includes('/pending-order-detail');

    let ReEvaluteOrderRes = await SellOrderServices.ReEvaluteOrder(Id, header.LanguageCode, header.CountryCode);
    let ReEvaluteOrder = await (ReEvaluteOrderRes.status === 200 && ReEvaluteOrderRes.data);

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let orderListRes = await SellOrderServices.GetOrderSummary(Id, header.LanguageCode, header.CountryCode);
    let orderList = await (orderListRes.status === 200 && orderListRes.data);

    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.SellDevicedetails, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsData.status === 200 && metaTagsData.data);

    return { direction, language, metaTags, ReEvaluteOrder, orderList, isPendingOrderDetail, address }
}

const IonAlert = dynamic(() => import('@ionic/react').then(mod => mod.IonAlert), { ssr: false });
const IonToast = dynamic(() => import('@ionic/react').then(mod => mod.IonToast), { ssr: false });


function DevicesDetails({ language, direction, orderList, isPendingOrderDetail, ReEvaluteOrder, metaTags, address }: SellDevice) {
    const { NEXT_PUBLIC_SSR } = process.env;
    let dispatch = useTypedDispatch();
    let history = useRouter();
    let dataLocalization = Language[language];
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const [sellDeviceData, setSellDeviceData] = useState<SellDevice>({ language, direction, orderList, isPendingOrderDetail, ReEvaluteOrder, metaTags, address });

    const personId = getLocalStorage().PersonId;
    const Id = history.query.orderId;

    const [referralCode, setReferralCode] = useState<any>("");
    const [referralCodeData, setReferralCodeData] = useState<IReferralCodeModel>({} as IReferralCodeModel);
    const [referralCodeMessage, setReferralCodeMessage] = useState<string>("");
    const [buttondisabled, setButtonDisabled] = useState(false);
    const [isAmountVariation, setIsAmountVariation] = useState("");
    const validMessage = dataLocalization.promo_code_is_applied;
    const orderHaveCode = "OrderHaveCode";
    const spaceApplied = dataLocalization.Remove_Space;
    const inValidMessage = dataLocalization.Invalid_promo_Code;
    const codeUsedInMultiOrders = dataLocalization.You_have_already_applied_the_code;
    const notWorking = "Not Working";
    const available = "Available";
    const routerHandler = () => {
        if (referralCodeMessage === validMessage) {
            SellOrderServices.UpdateReferalCode(referralCode, Id).then(res => {
                if (res.status === 200) {
                }
            }).catch(e => {
                console.log(e);
            });
        }
        dispatch(addressPageChange("currentaddress"));
        history.push(`/${getUserLanguage()}${getUserLocationForParam(sellDeviceData.language)}/schedule/${Id}`);
    }

    const codeApplied = (data: any) => {
        setReferralCodeData(data);
        setReferralCodeMessage(validMessage);
        setButtonDisabled(false);
    }

    const deleteReferralCodeFromOrder = () => {
        setReferralCode("");
        setReferralCodeMessage("");
        if (referralCodeMessage === orderHaveCode) {
            RefferalCodeServices.RemoveReferralCodeFromOrder(referralCodeData.Code, personId, Id).catch(e => {
                console.log(e);
            });
        }
    }

    const checkValidReferralCode = () => {
        RefferalCodeServices.GetReferralCode(referralCode, personId, Id).then(res => {
            if (res.status === 200) {
                if (res.data.Message) {
                    setReferralCodeMessage(res.data.Message);
                    res.data.Message !== codeUsedInMultiOrders && setTimeout(() => { setReferralCodeMessage("") }, 3000);
                    setButtonDisabled(true);
                }
                else {
                    codeApplied(res.data);
                }
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const validateAssociatedOrderReferral = () => {
        RefferalCodeServices.RemoveReferralCode(referralCode, personId, Id).then(res => {
            if (res.status === 200) {
                codeApplied(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const btnUIController = (referralCode: any) => {
        if (referralCode === "") {
            return setButtonDisabled(false);
        }
        else {
            setReferralCodeMessage("");
            return setButtonDisabled(true);
        }
    }

    const hasWhiteSpace = (value: string) => {
        if (value.indexOf(' ') === 0) {
            setReferralCodeMessage(spaceApplied);
        }
        else {
            setReferralCodeMessage("");
        }
    }

    const validateAmountChanges = (data: ISellOrderModel) => {
        if (data.OrderHistoryList && data.OrderHistoryList.length > 1) {
            if (data.OrderHistoryList[0].StatusId === HelperConstant.orderStatusId.Modified) {
                let amountVariation = `Price is revised from ${currencyByCountry(data.OrderHistoryList[1].Amount, language)} to ${currencyByCountry(data.OrderHistoryList[0].Amount, language)} based on the current market price.`
                setIsAmountVariation(amountVariation);
            }
            else {
                setIsAmountVariation("");
            }
        }
    }

    useEffect(() => {
        dispatch(ResetInputParam());
        dispatch(resetPageChange());

        if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setSellDeviceData({
                    direction: res.direction,
                    language: res.language,
                    metaTags: res.metaTags,
                    orderList: res.orderList,
                    ReEvaluteOrder: res.ReEvaluteOrder,
                    isPendingOrderDetail: res.isPendingOrderDetail,
                    address: res.address
                });
                if (res.isPendingOrderDetail) {
                    if (res.ReEvaluteOrder.ReferralAmount > 0) {
                        setReferralCodeData({ Amount: res.ReEvaluteOrder.ReferralAmount, Code: res.ReEvaluteOrder.ReferralCode, Id: res.ReEvaluteOrder.ReferralCodeId });
                        setReferralCodeMessage(orderHaveCode);
                    }
                    validateAmountChanges(res.ReEvaluteOrder);
                    isValidUser(res.ReEvaluteOrder.PersonId);
                }
                else {
                    if (res.orderList.ReferralAmount > 0) {
                        setReferralCodeData({ Amount: res.orderList.ReferralAmount, Code: res.orderList.ReferralCode, Id: res.orderList.ReferralCodeId });
                        setReferralCodeMessage(orderHaveCode);
                    }
                }
            });
        }
        else if (isPendingOrderDetail) {
            if (ReEvaluteOrder.ReferralAmount > 0) {
                setReferralCodeData({ Amount: ReEvaluteOrder.ReferralAmount, Code: ReEvaluteOrder.ReferralCode, Id: ReEvaluteOrder.ReferralCodeId });
                setReferralCodeMessage(orderHaveCode);
            }
            validateAmountChanges(ReEvaluteOrder);
            isValidUser(ReEvaluteOrder.PersonId);
        }
        else {
            if (orderList.ReferralAmount > 0) {
                setReferralCodeData({ Amount: orderList.ReferralAmount, Code: orderList.ReferralCode, Id: orderList.ReferralCodeId });
                setReferralCodeMessage(orderHaveCode);
            }
        }
    }, [Id, dispatch]);

    useEffect(() => {
        localStorage.removeItem("UTM");
    }, []);

    return (
        <ion-app>
            <MetaTags metaTags={sellDeviceData.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={sellDeviceData.language} />
            {orderList &&
                <ion-content data-aos="zoom-out">
                    <ion-grid class="dd_padding-adjustment" dir={sellDeviceData.direction}>
                        {isAmountVariation !== "" && <ion-row>
                            <ion-col size-xs="12" class="ion-text-center">
                                <ion-text class="amount-variation"><ion-icon icon={alertCircleOutline} /> {isAmountVariation}</ion-text>
                            </ion-col>
                        </ion-row>
                        }
                        <ion-row class="dd_margin-adjustment">
                            <ion-col size-xl="4" size-lg="4" size-xs="12" size-md="6">
                                <ion-card class="dd-orders-card dd-card-height">
                                    <ion-row>
                                        <ion-col size="12" class="ion-padding-start">
                                            <ion-row>
                                                <ion-col size="5">
                                                    <ion-text class="--dofy-color-primary-new">{dataLocalization.Order_Details}</ion-text>
                                                </ion-col>
                                                <ion-col size="7" class="ion-text-end ion-padding-end">
                                                    <ion-label> # <b>{sellDeviceData.orderList?.OrderCode}</b></ion-label>
                                                </ion-col>
                                            </ion-row>
                                        </ion-col>
                                    </ion-row>
                                    <ion-row>
                                        <ion-col size="12">
                                            <ion-card class="dd-orders-card-inline">
                                                <ion-row>
                                                    <ion-col size="5" >
                                                        <ion-label>{dataLocalization.Order_Date}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7" >
                                                        <ion-text>{moment(sellDeviceData.orderList?.OrderDate).format("L")}</ion-text>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col size-lg="12">
                                            <ion-card class="dd-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size-lg='12' size-xs="12" class="dd-orders-card-inline-card">
                                                        <ion-row>
                                                            <ion-col size-lg="5" size-xs="5" size-md="5">
                                                                <img src={`${HelperConstant.imageAPI}/${sellDeviceData.orderList?.BrandThumbnailPath}`} alt={`sell${sellDeviceData.orderList?.ThumbnailPath}`} className={`${sellDeviceData.language === "ae_ar" ? "dd-device-img-ar" : "dd-device-img"}`} />
                                                            </ion-col>
                                                            <ion-col size-lg="7" size-xs="7" size-md="7" class={`${sellDeviceData.language === "ae_ar" ? "dd-orders-card-inline-adjustment-ar " : "dd-orders-card-inline-adjustment"}`}>
                                                                <ion-label class="ion-text-wrap">{sellDeviceData.orderList?.SeriesModelName}</ion-label>
                                                            </ion-col>
                                                        </ion-row>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>

                                        <ion-col size="12">
                                            <ion-card class="dd-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="5" >
                                                        <ion-label>{dataLocalization.variant}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7" >
                                                        <ion-label>{sellDeviceData.orderList?.ModelVariantName}</ion-label>
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                    </ion-row>
                                </ion-card>
                            </ion-col>
                            {
                                isMobile ?
                                    <ion-col sizeSm="12" size-lg="12" class="sell-button">
                                        <Button variant="contained" onClick={() => routerHandler()} className="dd_confrim-mobbtn1" >{dataLocalization.Sell_Now}</Button>
                                    </ion-col>
                                    :
                                    null
                            }
                            <ion-col size-lg="4" size-xs="12" size-md="6">
                                <ion-card class="dd-orders-card dd-card-height">
                                    <ion-row>
                                        <ion-col size="12" class="ion-padding-start">
                                            <ion-row>
                                                <ion-col>
                                                    <ion-text class="--dofy-color-primary-new">{dataLocalization.Price_Details}</ion-text>
                                                </ion-col>
                                            </ion-row>
                                        </ion-col>
                                        <ion-col size-lg="12" size-xs="12">
                                            <ion-card class="dd-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="5">
                                                        <ion-label>{dataLocalization.Selling_Price}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7">
                                                        {sellDeviceData.orderList?.Payout?.SuggestedCost && <ion-text>{currencyByCountry(toAmount(sellDeviceData.orderList?.Payout?.SuggestedCost), sellDeviceData.language)}</ion-text>}
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col size="12">
                                            <ion-card class="dd-orders-card-inline-details">
                                                <ion-row>
                                                    <ion-col size="5">
                                                        <ion-label>{dataLocalization.Total}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7">
                                                        {sellDeviceData.orderList?.Payout?.SuggestedCost && <ion-text>{(referralCodeData.Amount && (referralCodeMessage === validMessage || referralCodeMessage === orderHaveCode)) ? `${currencyByCountry(toAmount(sellDeviceData.orderList?.Payout?.SuggestedCost + referralCodeData.Amount), sellDeviceData.language)}` : `${currencyByCountry(toAmount(sellDeviceData.orderList?.Payout?.SuggestedCost), sellDeviceData.language)}`}</ion-text>}
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col size="12">
                                            {(referralCodeData.Amount && (referralCodeMessage === validMessage || referralCodeMessage === orderHaveCode)) &&
                                                <ion-card class="dd-orders-card-inline-details">
                                                    <ion-row>
                                                        <ion-col size="5" class="align-self-center">
                                                            <ion-label class="dd_selling-price">{dataLocalization.promo_Bonus} </ion-label>
                                                        </ion-col>
                                                        <ion-col size="7">
                                                            <ion-text class="price">{currencyByCountry(referralCodeData.Amount, language)} - ({referralCodeData.Code})</ion-text> &nbsp;&nbsp;
                                                            <ion-icon style={{ position: "absolute" }} onClick={() => { deleteReferralCodeFromOrder() }} class="cursor-pointer" size="small" color="danger" icon={trashOutline} />
                                                        </ion-col>
                                                    </ion-row>
                                                </ion-card>
                                            }
                                            {(referralCodeMessage !== validMessage && referralCodeMessage !== orderHaveCode) &&
                                                <ion-card class="dd-orders-card-inline-details">
                                                    <ion-row>
                                                        <ion-col size="4.5" class="align-self-center">
                                                            <ion-label class="dd_selling-price">{dataLocalization.promo_code}</ion-label>
                                                        </ion-col>
                                                        <ion-col size="7.5">
                                                            <ion-item lines="none" color="white">
                                                                <ion-row>
                                                                    <ion-col>
                                                                        <TextField variant="standard" placeholder={dataLocalization.promo_code} value={referralCode} onChange={(e) => { setReferralCode(e.target.value); restrictInput(e, 20); btnUIController(e.target.value); hasWhiteSpace(e.target.value as string) }} />
                                                                        {(referralCode !== "" && (referralCodeMessage === inValidMessage || referralCodeMessage === ""))
                                                                            ?
                                                                            <Button className="text-center" onClick={() => checkValidReferralCode()} size="small" variant="outlined" style={{ marginTop: "5px" }}>Apply</Button>
                                                                            :
                                                                            null
                                                                        }
                                                                    </ion-col>
                                                                </ion-row>
                                                            </ion-item>
                                                        </ion-col>
                                                    </ion-row>
                                                </ion-card>
                                            }
                                            <IonToast message={referralCodeMessage} isOpen={(referralCodeMessage !== "" && referralCodeMessage !== codeUsedInMultiOrders && referralCodeMessage !== orderHaveCode)} color={referralCodeMessage === validMessage ? "success" : "danger"} position="top" duration={5000} />
                                            <IonAlert
                                                isOpen={referralCodeMessage === codeUsedInMultiOrders}
                                                header={dataLocalization.Do_you_want_to_apply}
                                                message={codeUsedInMultiOrders}
                                                buttons={[
                                                    {
                                                        text: dataLocalization.Cancel,
                                                        role: 'cancel',
                                                        handler: () => {
                                                            setReferralCodeMessage("");
                                                        },
                                                    },
                                                    {
                                                        text: dataLocalization.OK,
                                                        role: 'confirm',
                                                        handler: () => {
                                                            validateAssociatedOrderReferral();
                                                        },
                                                    },
                                                ]}
                                            />
                                        </ion-col>
                                        <ion-col size="12">
                                            <ion-card class="dd-orders-card-inline-cost">
                                                <ion-row>
                                                    <ion-col size="5">
                                                        <ion-label>{dataLocalization.Grand_Total}</ion-label>
                                                    </ion-col>
                                                    <ion-col size="7">
                                                        {sellDeviceData.orderList?.Payout?.SuggestedCost && <ion-text  >{(referralCodeData.Amount && (referralCodeMessage === validMessage || referralCodeMessage === orderHaveCode)) ? `${currencyByCountry(toAmount(sellDeviceData.orderList?.Payout?.SuggestedCost + referralCodeData.Amount), sellDeviceData.language)}` : `${currencyByCountry(toAmount(sellDeviceData.orderList?.Payout?.SuggestedCost), sellDeviceData.language)}`}</ion-text>}
                                                    </ion-col>
                                                </ion-row>
                                            </ion-card>
                                        </ion-col>
                                    </ion-row>
                                </ion-card>
                            </ion-col>
                            <ion-col size-lg="4" size-xs="12" size-md="12" class="dd_question-card-margin-bottom">
                                <ion-card class="dd-orders-card dd-card-height">
                                    <ion-row>
                                        <ion-col size="12" class="ion-padding-start" style={{ marginTop: "5px" }}>
                                            <ion-text class="--dofy-color-primary-new">{dataLocalization.Devices_Details}</ion-text>
                                        </ion-col>
                                        {sellDeviceData.orderList?.QuestionnaireResponse?.filter((x: any) => x.Threshold > 0 || x.QuestionnaireTypeId === HelperConstant.questionnaireType.DeviceAge)?.map((val: any, index: any) => (
                                            <ion-col size-lg="12" size-xs="12" size-md="12" key={index}>
                                                <ul className="dd_chip-style">
                                                    <li className={`${index === 0 ? '' : "icon-margin"}`}>{index + 1}. {val.Question}{(val.ResponseText == notWorking) ? <ion-icon class="icon-thumb-down" icon={thumbsDownSharp} /> : (val.ResponseText == available) ? <ion-icon class="icon-thumb-up" icon={thumbsUpSharp} /> : <ion-text class="--dofy-color-primary-new"> - {val.ResponseText}</ion-text>}</li>
                                                </ul>
                                            </ion-col>
                                        ))}
                                    </ion-row>
                                </ion-card>
                            </ion-col>
                            {
                                isMobile ?
                                    null
                                    :
                                    <ion-col size-lg="12" class="sell-button">

                                        <Button variant="contained" onClick={() => routerHandler()} className="dd_confrim-mobbtn1" >{dataLocalization.Sell_Now}</Button>
                                    </ion-col>
                            }
                        </ion-row>
                    </ion-grid>
                    {capacitorDevice() &&
                        (sellDeviceData.address.Address) &&
                        <Footer address={sellDeviceData.address} direction={sellDeviceData.direction} language={sellDeviceData.language} />
                    }
                </ion-content>
            }
        </ion-app>
    )
}

export const getServerSideProps: GetServerSideProps<SellDevice> = async (context) => {

    // const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
    // let ReEvaluteOrder = [] as any;
    // let orderList = [] as any;
    // let isPendingOrderDetail = true;
    // let metaTags = {} as ISEOModel;
    // let address = {} as any;

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { direction, language, metaTags, ReEvaluteOrder, orderList, isPendingOrderDetail, address } = await fetchData(context);
    return { props: { direction, language, metaTags, ReEvaluteOrder, orderList, isPendingOrderDetail, address } }
    // }

    // return { props: { direction, language, metaTags, ReEvaluteOrder, orderList, isPendingOrderDetail, address } }
}

export default DevicesDetails