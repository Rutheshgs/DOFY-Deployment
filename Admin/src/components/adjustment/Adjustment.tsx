import { useState } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonRow, IonText } from "@ionic/react";

import { currencyByCountry, findPostiveNumber, findedLocation, getUserLanguage, toAmount } from "../helper/Helper";
import "./Adjustment.css";
import { arrowBackCircleOutline } from "ionicons/icons";
import { pageChange } from "../../features/reducers/DocumentScan/PageChange.Reducer";
import { useTypedDispatch } from "../../features/reduxhooks/ReduxHooks";
import SellOrderServices from "../../services/order/sell/SellOrder.Services";

type inputProps = {
  orderPayout: any,
  referralCode: string,
  triggerOrderSummaryById: any
}

export const Adjustment = ({ orderPayout, referralCode, triggerOrderSummaryById }: inputProps) => {

  let dispatch = useTypedDispatch();
  const [finalAdjusmentAmount, setFinalAdjustmentAmount] = useState<any>(orderPayout?.TotalAmount);
  const [finalAdjusmentAmountErr, setFinalAdjustmentAmountErr] = useState<any>(orderPayout?.TotalAmount);
  const submitError = "notValid";

  const save = () => {
    if (finalAdjusmentAmountErr !== submitError && finalAdjusmentAmountErr !== "") {
      let result = ((Number(finalAdjusmentAmount) + orderPayout?.Adjustment) - orderPayout?.TotalAmount);
      SellOrderServices.AddAdjustment(orderPayout.OrderId, result).then(res => {
        if (res.status === 200) {
          triggerOrderSummaryById();
          dispatch(pageChange("SignaturePad"));
        }
      }).catch(e => {
        console.log(e);
      });
    }
    else {
      setFinalAdjustmentAmountErr(submitError);
    }
  };

  const updateTotalAmount = (value: any) => {
    if (value === "") {
      setFinalAdjustmentAmount(value);
      setFinalAdjustmentAmountErr(submitError);
    }
    else {
      setFinalAdjustmentAmountErr(value);
      setFinalAdjustmentAmount(value);
    }
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol className="text-center" style={{ background: "#F7F5F2" }}>
          <IonText className="aj_title">Order Payout</IonText>
          <IonItem lines="none">
            <IonText slot="start">Selling Price</IonText>
            <IonText slot="end">  {currencyByCountry(toAmount(Math.ceil(orderPayout?.SuggestedCost)))}</IonText>
          </IonItem>
          {orderPayout?.ReferralAmount ?
            <IonItem lines="none">
              <IonText slot="start">Referral Bonus <br />({referralCode})</IonText>
              <IonText slot="end"> {currencyByCountry(orderPayout?.ReferralAmount)}</IonText>
            </IonItem>
            :
            null
          }
          {(orderPayout?.RequoteAmount > 0) ?
            <IonItem lines="none">
              <IonText slot="start">Requote Diff.</IonText>
              <IonText slot="end" className={findPostiveNumber(Math.ceil(orderPayout?.RequoteAmount as any) - Math.ceil(orderPayout?.SuggestedCost))}>
                {currencyByCountry(toAmount(Math.ceil(orderPayout?.RequoteAmount as any) - Math.ceil(orderPayout?.SuggestedCost)))}
              </IonText>
            </IonItem>
            :
            null
          }
          {orderPayout?.Adjustment !== 0 || ((Number(finalAdjusmentAmount) + orderPayout?.Adjustment) - orderPayout?.TotalAmount) !== 0 ?
            <IonItem lines="none">
              <IonText slot="start">Adjustment</IonText>
              <IonText slot="end" className={finalAdjusmentAmount ? findPostiveNumber(((Number(finalAdjusmentAmount) + orderPayout?.Adjustment) - orderPayout?.TotalAmount)) : findPostiveNumber(Math.ceil(orderPayout?.Adjustment as any))}>
                {currencyByCountry(finalAdjusmentAmount ? ((Number(finalAdjusmentAmount) + orderPayout?.Adjustment) - orderPayout?.TotalAmount) : toAmount(Math.ceil(orderPayout?.Adjustment as any)))}
              </IonText>
            </IonItem>
            :
            null
          }
          <IonItem lines="full">
            <IonText slot="start">Total</IonText>
            <IonText slot="end"> {currencyByCountry(toAmount(orderPayout?.TotalAmount))}</IonText>
          </IonItem>
          <IonItem>
            <IonText slot="start">Paid Amount</IonText>
            <IonInput slot="end"
              inputMode="numeric"
              type="text"
              value={finalAdjusmentAmount}
              placeholder="Enter Amount"
              onIonChange={(e: any) => { updateTotalAmount(e.detail.value) }}
              className={`ion-text-end Adjustment-field ${finalAdjusmentAmount && findedLocation().CountryCode == "in" ? "Adjustment-field-curruceny" : "Adjustment-field-curruceny-ae"}`}
            />
            {finalAdjusmentAmountErr === submitError ? <IonText color="danger">Please Fill Final Amount</IonText> : ""}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow className="sp-btns">
        <IonCol sizeLg="12" sizeMd="12">
          <IonButton size="small" color="warning" onClick={() => dispatch(pageChange("UploadImagePage"))}>
            <IonIcon icon={arrowBackCircleOutline}></IonIcon> Previous</IonButton>
          <IonButton size="small" color="primary" onClick={() => save()}> Save & Continue </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
