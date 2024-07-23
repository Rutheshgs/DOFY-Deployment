import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IonAlert, IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonToast } from "@ionic/react"
import { alertCircleOutline, trashOutline } from "ionicons/icons";

import { addressPageChange } from "../../../features/reducers/address/AddressPageChange.Reducers";
import { ResetInputParam } from "../../../features/reducers/shared/InputParams.Reducers";
import { resetPageChange } from "../../../features/reducers/selldevice/PageChange.Reducer";
import { useTypedDispatch, useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";

import SellOrderServices from "../../../services/order/sell/SellOrder.Services";
import RefferalCodeServices from "../../../services/RefferalCode.Services";
import { ISellOrderModel } from "../../../models/order/sell/SellOrder.Model";
import { IReferralCodeModel } from "../../../models/ReferralCode.Model";

import Footer from "../../../components/footer/Footer";

import { HelperConstant } from "../../../components/helper/HelperConstant";
import { CustomImg } from "../../../components/shared/CustomImage";
import { currencyByCountry, Direction, getLocalStorage, getUserLanguage, getUserLocationForParam, isValidUser, restrictInput, toAmount } from "../../../components/helper/Helper";

import Language from "./DeviceDetailsLanguage.json";
import moment from "moment";

import './Devicedetails.css';
import { isPlatform } from "@ionic/core";
import ApplyBtn from "../../../assets/images/Applybtn.png";
import { Button } from "@mui/material";

interface InputParams {
    id: string;
}

function DevicesDetails() {

    const { id } = useParams<InputParams>();

    let dispatch = useTypedDispatch();
    let history = useHistory();
    let dataLocalization = Language[getUserLanguage()];
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const isPendingOrderDetail = window.location.pathname.includes("pending-order-detail");
    const personId = getLocalStorage().PersonId;

    const [orderList, setOrderList] = useState<ISellOrderModel>({} as ISellOrderModel);
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
            SellOrderServices.UpdateReferalCode(referralCode, parseInt(id)).then(res => {
                if (res.status === 200) {
                    // console.log("ok");
                }
            }).catch(e => {
                console.log(e);
            });
        }
        dispatch(addressPageChange("currentaddress"));
        history.push(`/${getUserLanguage()}${getUserLocationForParam()}/schedule/${id}`);
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
            RefferalCodeServices.RemoveReferralCodeFromOrder(referralCodeData.Code, personId, parseInt(id)).catch(e => {
                console.log(e);
            });
        }
    }

    const checkValidReferralCode = () => {
        RefferalCodeServices.GetReferralCode(referralCode, personId, parseInt(id)).then(res => {
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
        RefferalCodeServices.RemoveReferralCode(referralCode, personId, parseInt(id)).then(res => {
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
                let amountVariation = `Price is revised from ${currencyByCountry(data.OrderHistoryList[1].Amount)} to ${currencyByCountry(data.OrderHistoryList[0].Amount)} based on the current market price.`
                setIsAmountVariation(amountVariation);
            }
            else {
                setIsAmountVariation("");
            }
        }
    }

    useEffect(() => {
        const getReEvaluateOrderDetail = () => {
            SellOrderServices.ReEvaluteOrder(id).then(res => {
                if (res.status === 200) {
                    if (res.data.ReferralAmount > 0) {
                        setReferralCodeData({ Amount: res.data.ReferralAmount, Code: res.data.ReferralCode, Id: res.data.ReferralCodeId });
                        setReferralCodeMessage(orderHaveCode);
                    }
                    setOrderList(res.data);
                    validateAmountChanges(res.data);
                    isValidUser(res.data.PersonId);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }

        const getOrderDetail = () => {
            SellOrderServices.GetOrderSummary(id).then(res => {
                if (res.status === 200) {
                    if (res.data.ReferralAmount > 0) {
                        setReferralCodeData({ Amount: res.data.ReferralAmount, Code: res.data.ReferralCode, Id: res.data.ReferralCodeId });
                        setReferralCodeMessage(orderHaveCode);
                    }
                    setOrderList(res.data);
                    isValidUser(res.data.PersonId);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }
        dispatch(ResetInputParam());
        dispatch(resetPageChange());
        if (isPendingOrderDetail) {
            getReEvaluateOrderDetail();
        }
        else {
            getOrderDetail();
        }
    }, [id, dispatch]);

    useEffect(() => {
        localStorage.removeItem("UTM");
    }, []);

    return (
        <IonPage>
            {orderList &&
                <IonContent data-aos="zoom-out">
                    <IonGrid className="dd_padding-adjustment" dir={Direction()}>
                        {isAmountVariation !== "" && <IonRow>
                            <IonCol sizeXs="12" className="ion-text-center">
                                <IonText className="amount-variation"><IonIcon icon={alertCircleOutline} /> {isAmountVariation}</IonText>
                            </IonCol>
                        </IonRow>
                        }
                        <IonRow>
                            <IonCol sizeXl="4" sizeLg="4" sizeXs="12" sizeMd="6">
                                <IonCard className="dd-orders-card dd-card-height">
                                    <IonRow>
                                        <IonCol size="12" className="ion-padding-start">
                                            <IonRow>
                                                <IonCol size="5">
                                                    <IonText className="--dofy-color-primary-new">{dataLocalization.Order_Details}</IonText>
                                                </IonCol>
                                                <IonCol size="7" className="ion-text-end ion-padding-end">
                                                    <IonLabel> # <b>{orderList?.OrderCode}</b></IonLabel>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol size="12">
                                            <IonCard className="dd-orders-card-inline">
                                                <IonRow>
                                                    <IonCol size="5" >
                                                        <IonLabel>{dataLocalization.Order_Date}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7" >
                                                        <IonText>{moment(orderList?.OrderDate).format("L")}</IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol sizeLg="12">
                                            <IonCard className="dd-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol sizeLg='12' sizeXs="12" className="dd-orders-card-inline-card">
                                                        <IonRow>
                                                            <IonCol sizeLg="5" sizeXs="5" sizeMd="5">
                                                                <CustomImg src={`${HelperConstant.imageAPI}/${orderList?.BrandThumbnailPath}`} alt={`sell${orderList?.ThumbnailPath}`} className={`${getUserLanguage() === "ae_ar" ? "dd-device-img-ar" : "dd-device-img"}`} />
                                                            </IonCol>
                                                            <IonCol sizeLg="7" sizeXs="7" sizeMd="7" className={`${getUserLanguage() === "ae_ar" ? "dd-orders-card-inline-adjustment-ar " : "dd-orders-card-inline-adjustment"}`}>
                                                                {/* <IonText>{dataLocalization.Device_Brand}</IonText><br /> */}
                                                                <IonLabel className="ion-text-wrap">{orderList?.SeriesModelName}</IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>

                                        <IonCol size="12">
                                            <IonCard className="dd-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="5" >
                                                        <IonLabel>{dataLocalization.variant}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7" >
                                                        <IonLabel>{orderList?.ModelVariantName}</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                    </IonRow>
                                </IonCard>
                            </IonCol>
                            {(isMobile) &&
                                <IonCol size="12" className="text-center ion-padding-horizontal mt-3">
                                    <IonButton onClick={() => routerHandler()} color='white' className="dd_confrim-mobbtn1" >{dataLocalization.Sell_Now}</IonButton>
                                </IonCol>
                            }
                            <IonCol sizeLg="4" sizeXs="12" sizeMd="6">
                                <IonCard className="dd-orders-card dd-card-height">
                                    <IonRow>
                                        <IonCol size="12" className="ion-padding-start">
                                            <IonRow>
                                                <IonCol>
                                                    <IonText className="--dofy-color-primary-new">{dataLocalization.Price_Details}</IonText>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                        <IonCol sizeLg="12" sizeXs="12">
                                            <IonCard className="dd-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="5">
                                                        <IonLabel>{dataLocalization.Selling_Price}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        {orderList?.Payout?.SuggestedCost && <IonText>{currencyByCountry(toAmount(orderList?.Payout?.SuggestedCost))}</IonText>}
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol size="12">
                                            <IonCard className="dd-orders-card-inline-details">
                                                <IonRow>
                                                    <IonCol size="5">
                                                        <IonLabel>{dataLocalization.Total}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        {orderList?.Payout?.SuggestedCost && <IonText>{(referralCodeData.Amount && (referralCodeMessage === validMessage || referralCodeMessage === orderHaveCode)) ? `${currencyByCountry(toAmount(orderList?.Payout?.SuggestedCost + referralCodeData.Amount))}` : `${currencyByCountry(toAmount(orderList?.Payout?.SuggestedCost))}`}</IonText>}
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol size="12">
                                            {(referralCodeData.Amount && (referralCodeMessage === validMessage || referralCodeMessage === orderHaveCode)) &&
                                                <IonCard className="dd-orders-card-inline-details">
                                                    <IonRow>
                                                        <IonCol size="5" className="align-self-center">
                                                            <IonLabel className="dd_selling-price">{dataLocalization.promo_Bonus} </IonLabel>
                                                        </IonCol>
                                                        <IonCol size="7">
                                                            <IonText className="price" >{currencyByCountry(referralCodeData.Amount)} - ({referralCodeData.Code})</IonText> &nbsp;&nbsp;
                                                            <IonIcon style={{ position: "absolute" }} onClick={() => { deleteReferralCodeFromOrder() }} className="cursor-pointer" size="small" color="danger" icon={trashOutline} />
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCard>
                                            }
                                            {(referralCodeMessage !== validMessage && referralCodeMessage !== orderHaveCode) &&
                                                <IonCard className="dd-orders-card-inline-details">
                                                    <IonRow>
                                                        <IonCol size="4.5" className="align-self-center">
                                                            <IonLabel className="dd_selling-price">{dataLocalization.promo_code}</IonLabel>
                                                        </IonCol>
                                                        <IonCol size="7.5">
                                                            <IonItem lines="none" color="white">
                                                                <IonRow>
                                                                    <IonCol>
                                                                        <IonInput placeholder={dataLocalization.promo_code} value={referralCode} onIonChange={(e) => { setReferralCode(e.detail.value); restrictInput(e, 20); btnUIController(e.detail.value); hasWhiteSpace(e.detail.value as string) }} />
                                                                        {(referralCode !== "" && (referralCodeMessage === inValidMessage || referralCodeMessage === ""))
                                                                            ?
                                                                            <Button className="text-center" onClick={() => checkValidReferralCode()} size="small" variant="outlined">Apply</Button>
                                                                            //     <IonCard className="btncard">
                                                                            //     <IonImg src={ApplyBtn} className="cursor-pointer dd-apply" onClick={() => checkValidReferralCode()}  alt="apply-now"></IonImg>
                                                                            // </IonCard>
                                                                            :
                                                                            null
                                                                        }
                                                                    </IonCol>
                                                                </IonRow>

                                                            </IonItem>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCard>
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
                                        </IonCol>
                                        <IonCol size="12">
                                            <IonCard className="dd-orders-card-inline-cost">
                                                <IonRow>
                                                    <IonCol size="5">
                                                        <IonLabel>{dataLocalization.Grand_Total}</IonLabel>
                                                    </IonCol>
                                                    <IonCol size="7">
                                                        {orderList?.Payout?.SuggestedCost && <IonText  >{(referralCodeData.Amount && (referralCodeMessage === validMessage || referralCodeMessage === orderHaveCode)) ? `${currencyByCountry(toAmount(orderList?.Payout?.SuggestedCost + referralCodeData.Amount))}` : `${currencyByCountry(toAmount(orderList?.Payout?.SuggestedCost))}`}</IonText>}
                                                    </IonCol>
                                                </IonRow>
                                            </IonCard>
                                        </IonCol>
                                    </IonRow>
                                </IonCard>
                            </IonCol>
                            <IonCol sizeLg="4" sizeXs="12" sizeMd="12" className="dd_questioncard-margin-bottom">
                                <IonCard className="dd-orders-card dd-card-height">
                                    <IonRow>
                                        <IonCol size="12" className="ion-padding-start">
                                            <IonRow>
                                                <IonCol>
                                                    <IonText className="--dofy-color-primary-new">{dataLocalization.Devices_Details}</IonText>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                        {orderList?.QuestionnaireResponse?.filter(x => x.Threshold > 0 || x.QuestionnaireTypeId === HelperConstant.questionnaireType.DeviceAge)?.map((val: any, index) => (
                                            <IonCol sizeLg="12" sizeXs="12" sizeMd="12" key={index}>
                                                <ul className="dd_chip-style">
                                                    <li className={`${index === 0 ? '' : "icon-margin"}`}>{index + 1}. {val.Question}{(val.ResponseText == notWorking) ? <i className="fa fa-thumbs-down icon-thumb"></i> : (val.ResponseText == available) ? <i className="fa fa-thumbs-up icon-thumb-up"></i> : <IonText className="--dofy-color-primary-new"> - {val.ResponseText}</IonText>}</li>
                                                </ul>
                                            </IonCol>
                                        ))}
                                    </IonRow>
                                </IonCard>
                            </IonCol>
                            {(!isMobile) &&
                                <IonCol sizeLg="12" className="ion-padding-top text-center mt-2">
                                    <IonButton onClick={() => routerHandler()} color='white' className="dd_confrim-btn" >{dataLocalization.Sell_Now}</IonButton>
                                </IonCol>

                            }
                        </IonRow>
                    </IonGrid>
                    {isPlatform("mobile") || isPlatform("ios") ? <></>
                        :
                        <Footer />
                    }
                </IonContent>
            }
        </IonPage>
    )
}

export default DevicesDetails