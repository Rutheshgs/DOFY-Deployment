import React, { InputHTMLAttributes, useEffect, useState } from "react";
import {
  IonCol, IonGrid, IonRow, IonIcon, IonTitle, IonCard, IonText, IonLabel, IonBadge, IonItem, IonCardContent,
  IonFab, IonToast, IonModal, IonButtons, IonContent, IonHeader, IonToolbar, IonAccordionGroup, IonAccordion, IonList,
} from "@ionic/react";
import { callOutline, locationOutline, personCircleOutline, closeOutline, layersOutline, informationCircleOutline, } from "ionicons/icons";

import moment from "moment";

import "./CustomerDetailview.css";

import MasterServices from "../../services/Master.Services";
import { IGetOrderSummaryModel } from "../../models/GetOrderSummary.Model";
import { IOrderHistory } from "../../models/IOrderHistory.Model";
import { IStatusModel } from "../../models/StatusModel";

import Delay from "../reportdelay/Delay";

import { HelperConstant } from "../helper/HelperConstant";
import { countrycodenumber, currencyByCountry, isIn, toAmount } from "../helper/Helper";
import { OrderPayout } from "../orderpayout/OrderPayout";
import CurrencyConvertorServices from "../../services/CurrencyConvertor.Services";
import { AEDConversion } from "../AED/AEDConversion";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: IGetOrderSummaryModel | any,
  isButton: boolean,
  showEdit: boolean,
}

export const CustomerDetailView = React.forwardRef(({ data, isButton, showEdit, ...rest }: inputProps, ref) => {

  const [showToast, setShowToast] = useState(false);
  const [isReferral, setIsReferral] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const [statusToDisplay, setStatusToDisplay] = useState<IStatusModel[]>();
  const [OrderSummaryInfo, setOrderSummaryInfo] = useState<IGetOrderSummaryModel>({} as IGetOrderSummaryModel)
  // let OrderSummaryInfo: IGetOrderSummaryModel | any = data;

  // const PriceAmount = OrderSummaryInfo?.RepairParts?.reduce((total, currentValue) => total = total + currentValue.ServiceCharge, 0);

  useEffect(() => {
    setOrderSummaryInfo(data);
  }, [data]);

  useEffect(() => {
    const GetAllStatusToDisplay = (serviceTypeId: number) => {
      MasterServices.GetAllStatusToDisplay(serviceTypeId).then(response => {
        if (response.status === 200) {
          setStatusToDisplay(response.data);
        }
      }).catch((e: string) => {
        console.log(e);
      });
    }
    GetAllStatusToDisplay(HelperConstant.serviceTypeId.SELL);
  }, [])

  const [InrAmount, setInrAmount] = useState<{ Amount: number }>({ Amount: 0 });

  useEffect(() => {
    const Inrconversion = () => {
      CurrencyConvertorServices.Get().then(res => {
        if (res.status === 200) {
          setInrAmount(res.data);
        }
      }).catch(e => console.log(e));
    }
    Inrconversion();
  }, []);

  return (
    <IonGrid className="p-0">
      <IonRow>
        <IonCol size="12">
          <IonAccordionGroup>
            <IonAccordion value="assignee details">
              <IonItem slot="header">
                <IonLabel>
                  <IonRow>
                    <IonCol sizeXl="0.3" sizeLg="0.3" sizeXs="0.7" sizeMd="0.7" sizeSm="0.7">
                      <IonIcon color="medium" icon={personCircleOutline} />
                    </IonCol>
                    <IonCol sizeXl="11.2" sizeLg="11.2" sizeXs="10" sizeMd="10" sizeSm="10">
                      <IonLabel className="cd_name_space">{OrderSummaryInfo?.UserName}</IonLabel>
                    </IonCol>
                    <IonCol sizeXl="0.5" sizeLg="0.5" sizeXs="1" sizeMd="1" sizeSm="1">
                      {isButton &&
                        <IonFab >
                          <IonIcon onClick={() => setShowModal(true)} icon={layersOutline} color="primary" size="medium" />
                          <IonModal isOpen={showModal} swipeToClose={true} onDidDismiss={() => setShowModal(false)}>
                            <IonHeader>
                              <IonToolbar>
                                <IonItem lines="none">
                                  <IonTitle>Order Status</IonTitle>
                                  <IonButtons className="cursor-pointer" slot="end" onClick={() => setShowModal(false)}>
                                    <IonIcon icon={closeOutline}></IonIcon>
                                  </IonButtons>
                                </IonItem>
                              </IonToolbar>
                            </IonHeader>
                            <IonContent>
                              <IonRow>
                                <IonCol className="" size="12" sizeLg="12" sizeMd="12" sizeXl="12" sizeSm="12" sizeXs="12">
                                  {OrderSummaryInfo?.OrderHistoryList?.map((item: IOrderHistory, index: any) => (
                                    <IonCard className="db-cardcontent" hidden={((item.StatusName === 'Scheduled' || item.StatusName === 'Re-Scheduled') && item.AppointmentDate === null)} key={index} style={{ borderColor: `${item.ColorCode}` }}>
                                      <IonRow>
                                        <IonCol sizeXl="7" sizeLg="7" sizeXs="7" sizeSm="8" sizeMd="7" className="ion-align-self-center">
                                          <IonRow>
                                            <IonCol className="db-brandName" sizeXl="6" sizeLg="6" sizeXs="6" sizeSm="6" sizeMd="6">
                                              <IonText>{moment(item.TransactionDate).format("DD-MMM-YYYY")}  {moment(item.TransactionDate).format('LT')}</IonText>
                                            </IonCol>
                                            <IonCol sizeXl="6" sizeLg="6" sizeXs="6" sizeSm="6" sizeMd="6">
                                              <IonText>{item.StatusName}</IonText>
                                            </IonCol>
                                            {(item.StatusName === 'Scheduled' || item.StatusName === 'Re-Scheduled') ?
                                              <IonCol className="db-brandName" sizeXl="6" sizeLg="6" sizeXs="6" sizeSm="6" sizeMd="6">
                                                <IonText>{moment(item.AppointmentDate).format("DD-MMM-YYYY")} {moment(item.AppointmentDate).format('LT')}</IonText>
                                              </IonCol>
                                              :
                                              null
                                            }
                                          </IonRow>
                                        </IonCol>
                                        <IonCol sizeXl="5" sizeLg="5" sizeXs="5" sizeSm="4" sizeMd="5" className="ion-align-self-center">
                                          <IonRow>
                                            <IonCol className="db-brandName" sizeXl="6" sizeLg="6" sizeXs="12" sizeSm="6" sizeMd="6">
                                              <IonText className="cd_text-wrap">{item.AssigneeName}</IonText>
                                            </IonCol>
                                            <IonCol sizeXl="6" sizeLg="6" sizeXs="12" sizeSm="6" sizeMd="6">
                                              <IonText>{(item.Amount) ? currencyByCountry(toAmount(Math.ceil(item.Amount))) : ''}</IonText>
                                            </IonCol>
                                            <IonCol sizeXl="12" sizeLg="12" sizeXs="12" sizeSm="12" sizeMd="12">
                                              <IonText>{item.Comments}</IonText>
                                            </IonCol>
                                          </IonRow>
                                        </IonCol>
                                      </IonRow>
                                    </IonCard>
                                  ))}
                                </IonCol>
                              </IonRow>
                            </IonContent>
                          </IonModal>
                        </IonFab>
                      }
                    </IonCol>
                  </IonRow>
                </IonLabel>
              </IonItem>
              <IonList slot="content">
                <IonRow>
                  <IonCol size="12">
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol sizeLg="12" sizeSm="12" sizeMd="12" sizeXl="7" sizeXs="12">
                    <IonItem lines="none" color="transparent">

                      <IonIcon slot="start" size="small" color="success" icon={callOutline} />

                      <IonText color="primary">
                        {
                          countrycodenumber(OrderSummaryInfo?.UserMobile)
                        }
                        <a href={`tel:${OrderSummaryInfo?.UserMobile}`}>
                          {OrderSummaryInfo?.UserMobile}
                        </a>
                      </IonText>
                      &nbsp;&nbsp;
                      <IonText color="primary">
                        {
                          countrycodenumber(OrderSummaryInfo?.SecondaryMobile)
                        }
                        <a href={`tel:${OrderSummaryInfo?.SecondaryMobile}`}>
                          {OrderSummaryInfo?.SecondaryMobile}
                        </a>
                      </IonText>

                    </IonItem>
                    <IonItem lines="none" color="transparent">
                      <IonIcon slot="start" color="primary" size="small" icon={locationOutline} />
                      <IonText className="text-style ">
                        {OrderSummaryInfo?.Appointment?.Address + ','}
                        {OrderSummaryInfo?.Appointment?.Address1 ? (OrderSummaryInfo?.Appointment?.Address1 + ",") : ' '}
                        {OrderSummaryInfo?.Appointment?.LandMark ? (OrderSummaryInfo?.Appointment?.LandMark + ",") : ' '}<br />
                        {isIn() ?
                          OrderSummaryInfo?.Appointment?.AppointmentCity +' - '+ OrderSummaryInfo?.Appointment?.AppointmentPincode
                          :
                          OrderSummaryInfo?.Appointment?.AppointmentPincode}
                      </IonText>
                    </IonItem>
                    <IonRow>
                      <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="6">
                        <IonRow>
                          <IonCol sizeLg="12" sizeMd="4" sizeSm="12" sizeXs="12">
                            <IonTitle color="primary" className="title-font-size p-0">Service Type</IonTitle>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12" className="cd-service_type">
                            <IonBadge style={{ marginLeft: '4px' }} color="warning">{OrderSummaryInfo?.ServiceType?.replace('a device', '')}</IonBadge>
                            <IonBadge style={{ marginLeft: '4px' }} color="medium">{OrderSummaryInfo?.ProductTypeName}</IonBadge>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                      <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="6">
                        <IonRow>
                          <IonCol size="12">
                            <IonTitle color="primary" className="title-font-size  p-0">Brand & Model</IonTitle>
                          </IonCol>
                          <IonCol className="BrandMasterName" sizeLg="12" sizeMd="12" sizeSm="12">
                            <IonBadge color="medium" className="m-1">
                              <IonLabel>{OrderSummaryInfo?.BrandMasterName}</IonLabel>
                            </IonBadge>
                            <IonBadge color="medium" className="m-1 ion-text-left ion-text-wrap">
                              {OrderSummaryInfo?.SeriesModelName}
                            </IonBadge>
                            <IonBadge color="medium" className="m-1">
                              {OrderSummaryInfo?.ModelVariantName}
                            </IonBadge>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonCol>
                  <IonCol sizeXl="2.5" sizeLg="6" sizeSm="6" sizeXs="6" sizeMd="6">
                    <IonCard className="summary-card">
                      <IonItem color="light" lines="none" className="m-0">
                        <IonText className="title-font-size" color="primary">Scheduled</IonText>
                      </IonItem>
                      <IonCardContent style={{ padding: '10px 5px' }}>
                        <IonBadge className="text-styles" color="light">
                          {moment(OrderSummaryInfo?.Appointment?.AppointmentDate).format('L')}
                        </IonBadge>
                        <IonBadge color="light">
                          {moment(OrderSummaryInfo?.Appointment?.StartTime).format('LT')} - {moment(OrderSummaryInfo?.Appointment?.EndTime).format('LT')}
                        </IonBadge>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  {isIn() ?
                    <IonCol sizeXl="2.5" sizeLg="6" sizeSm="6" sizeXs="6" sizeMd="6">
                      <IonCard className="summary-card p-0" onMouseLeave={() => setIsReferral(false)}>
                        <IonItem color="light" lines="none" className="m-0" >
                          <IonText className="title-font-size" color="primary">Cost Expected</IonText>&nbsp;&nbsp;
                          <IonIcon size="small" src={informationCircleOutline} className="cursor-pointer" onMouseEnter={() => setIsReferral(true)} />
                        </IonItem>
                        <IonCardContent className="cd_card-height">
                          {/* {OrderSummaryInfo?.ServiceTypeId === HelperConstant.serviceTypeId.SELL ? */}
                          {/* {OrderSummaryInfo?.RequoteAmount > 0 ?
                        <>
                          <IonItem color="transparent" lines="none">
                            <IonText className="rs-style-small cd_text_decoration" color="success"><b>₹{(OrderSummaryInfo?.ReferralAmount) ? toAmount(Math.ceil(OrderSummaryInfo.SuggestedCost) + Math.ceil(OrderSummaryInfo.ReferralAmount)) : toAmount(Math.ceil(OrderSummaryInfo.SuggestedCost))}/-</b></IonText>
                          </IonItem>
                          <IonItem color="transparent" lines="none">
                            <IonText className="rs-style-small" color="success">₹{(OrderSummaryInfo?.TotalAmount) ? toAmount(Math.ceil(OrderSummaryInfo?.TotalAmount)) : 0}/-</IonText>
                          </IonItem>
                        </>
                        : */}
                          <IonItem color="transparent" lines="none">
                            <IonText className="rs-style" color="success"><b>{currencyByCountry(toAmount(Math.ceil(OrderSummaryInfo?.Payout?.TotalAmount)))}/-</b></IonText>
                          </IonItem>
                          {/* <AEDConversion InrAmount={InrAmount} aedConversion={Math.ceil(OrderSummaryInfo?.Payout?.TotalAmount)}></AEDConversion> */}
                          {/* } */}
                        </IonCardContent>
                      </IonCard>
                      {isReferral &&
                        <div onMouseEnter={() => setIsReferral(true)} onMouseLeave={() => setIsReferral(false)}>
                          <OrderPayout orderPayout={OrderSummaryInfo?.Payout} referralCode={OrderSummaryInfo?.ReferralCode} customClassName={"referral-card-cdv"} />
                        </div>
                      }
                    </IonCol>
                    :
                    <IonCol sizeXl="2.5" sizeLg="6" sizeSm="6" sizeXs="6" sizeMd="6">
                      <IonCard className="summary-card p-0" onMouseLeave={() => setIsReferral(false)}>
                        <IonItem color="light" lines="none" className="m-0" >
                          <IonText className="title-font-size" color="primary">Cost Expected</IonText>&nbsp;&nbsp;
                          <IonIcon size="small" src={informationCircleOutline} className="cursor-pointer" onMouseEnter={() => setIsReferral(true)} />
                        </IonItem>
                        <IonCardContent className="cd_card-height">
                          {/* {OrderSummaryInfo?.ServiceTypeId === HelperConstant.serviceTypeId.SELL ? */}
                          {/* {OrderSummaryInfo?.RequoteAmount > 0 ?
                      <>
                        <IonItem color="transparent" lines="none">
                          <IonText className="rs-style-small cd_text_decoration" color="success"><b>₹{(OrderSummaryInfo?.ReferralAmount) ? toAmount(Math.ceil(OrderSummaryInfo.SuggestedCost) + Math.ceil(OrderSummaryInfo.ReferralAmount)) : toAmount(Math.ceil(OrderSummaryInfo.SuggestedCost))}/-</b></IonText>
                        </IonItem>
                        <IonItem color="transparent" lines="none">
                          <IonText className="rs-style-small" color="success">₹{(OrderSummaryInfo?.TotalAmount) ? toAmount(Math.ceil(OrderSummaryInfo?.TotalAmount)) : 0}/-</IonText>
                        </IonItem>
                      </>
                      : */}
                          <IonItem color="transparent" lines="none">
                            <IonText className="rs-style" color="success"><b>{currencyByCountry(toAmount(Math.ceil(OrderSummaryInfo?.Payout?.TotalAmount)))}/-</b></IonText>
                          </IonItem>
                          <AEDConversion InrAmount={InrAmount} aedConversion={Math.ceil(OrderSummaryInfo?.Payout?.TotalAmount)}></AEDConversion>
                          {/* } */}
                        </IonCardContent>
                      </IonCard>
                      {isReferral &&
                        <div onMouseEnter={() => setIsReferral(true)} onMouseLeave={() => setIsReferral(false)}>
                          <OrderPayout orderPayout={OrderSummaryInfo?.Payout} referralCode={OrderSummaryInfo?.ReferralCode} customClassName={"referral-card-cdv"} />
                        </div>
                      }
                    </IonCol>
                  }

                </IonRow>
                <IonRow>
                  <IonCol sizeXl="12" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="4">
                    {showEdit ? <Delay setShowToast={setShowToast} data={OrderSummaryInfo} /> : ""}
                    {((OrderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST || OrderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCELLED) && OrderSummaryInfo?.Appointment?.Remarks) ?
                      <IonRow>
                        <IonCol sizeXl="3" sizeLg="3" sizeXs="6" sizeSm="6" sizeMd="3">
                          <IonText className="title-font-size" color="primary">Comments :</IonText>
                        </IonCol>
                        <IonCol sizeXl="9" sizeLg="9" sizeXs="6" sizeSm="6" sizeMd="9">
                          <IonText className="title-font-size">{OrderSummaryInfo?.Appointment?.Remarks}</IonText>
                        </IonCol>
                      </IonRow>
                      :
                      null
                    }
                  </IonCol>
                  {OrderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ?
                    <IonCol sizeXl="12" sizeLg="12" sizeMd="12" sizeXs="12">
                      <IonRow>
                        <IonCol sizeXl="1" sizeLg="3" sizeMd="3" sizeXs="4" >
                          <IonText className="title-font-size" color="primary">REASON</IonText>
                        </IonCol>
                        <IonCol sizeLg="0.2" sizeMd="1" sizeSm="1" sizeXs="1">
                          <IonText>:</IonText>
                        </IonCol>
                        <IonCol sizeXl="6" sizeMd="6" sizeSm="6" sizeXs="6">
                          <IonText class="title-font" >{OrderSummaryInfo?.CancellationType}</IonText>
                        </IonCol>

                        <IonCol sizeXl="1" sizeLg="3" sizeMd="3" sizeXs="4" >
                          <IonText className="title-font-size" color="primary" >status</IonText>
                        </IonCol>
                        <IonCol sizeXl="0.2" sizeLg="1" sizeMd="1" sizeSm="1" sizeXs="1">
                          <IonText>:</IonText>
                        </IonCol>
                        {statusToDisplay?.filter((x: IStatusModel) => x.Id === OrderSummaryInfo?.StatusId).map((item, index) => {
                          return (
                            <IonCol key={index} sizeXl="3" sizeMd="3" sizeSm="1" sizeXs="3">
                              <IonText class="title-font-size" style={{ color: `${item.ColorCode}` }}>{OrderSummaryInfo?.StatusName}</IonText>
                            </IonCol>
                          )
                        })}

                      </IonRow>
                    </IonCol> : null}

                  {OrderSummaryInfo?.StatusId !== HelperConstant.StatusId.CANCEL_REQUEST ?
                    <IonCol offsetXl="7" sizeXl="5" sizeLg="6" sizeMd="6" offsetMd="6" sizeSm="6" sizeXs="8" offsetXs="4" className="ion-align-self-center" >
                      <IonRow>
                        <IonCol sizeXl="2.5" sizeLg="3" sizeMd="4" sizeXs="4" >
                          <IonText className="title-font-size" color="primary">status</IonText>
                        </IonCol>
                        <IonCol sizeXl="0.2" sizeLg="1" sizeMd="1" sizeSm="1" sizeXs="1">
                          <IonText>:</IonText>
                        </IonCol>
                        {statusToDisplay?.filter((x: IStatusModel) => x.Id === OrderSummaryInfo?.StatusId).map((item, index) => {
                          return (
                            <IonCol key={index} sizeXl="8">
                              <IonText class="title-font-size" style={{ color: `${item.ColorCode}` }}>{OrderSummaryInfo?.StatusName}</IonText>
                            </IonCol>
                          )
                        })}
                      </IonRow>
                    </IonCol>
                    : null
                  }

                </IonRow>
              </IonList>
            </IonAccordion>
          </IonAccordionGroup>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonToast
          color='warning'
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Your delay response have been saved."
          duration={2000}
        />
      </IonRow>
    </IonGrid>
  );
});
