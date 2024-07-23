import { ISellOrderModel } from "@/models/order/sell/SellOrder.Model";
import { getUserLanguage } from "../helper/Helper";

import { currencyByCountry, findPostiveNumber, toAmount } from "../helper/Helper";
import "./OrderPayout.css";
import Language from './OrderPayout.json'
import { IonCard, IonItem, IonText } from "@ionic/react";

type inputProps = {
  orderPayout: ISellOrderModel | any,
  ReferralCode: string,
  setIsReferral: any,
  language: "in_en" | "ae_en" | "ae_ar"
}

export const OrderPayout = ({ orderPayout, ReferralCode, setIsReferral, language }: inputProps) => {

  let dataLocalization = Language[getUserLanguage()];

  return (
    <IonCard class='referral-card' onMouseEnter={() => setIsReferral(true)} onMouseLeave={() => setIsReferral(false)}>
      <IonItem lines='none'>
        <IonText slot='start'>{dataLocalization.Selling_Price}</IonText>
        <IonText slot='end'>{currencyByCountry(orderPayout?.Payout?.RequoteAmount > 0 ? toAmount(Math.ceil(orderPayout?.Payout?.RequoteAmount)) : toAmount(orderPayout?.Payout?.SuggestedCost), language)}</IonText>
      </IonItem>
      {orderPayout?.Payout?.ReferralAmount ?
        <IonItem lines='none'>
          <IonText slot='start'>{dataLocalization.Promo_Bonus} <br /> ({ReferralCode})</IonText>
          <IonText slot='end'>{currencyByCountry(toAmount(orderPayout?.Payout?.ReferralAmount), language)}</IonText>
        </IonItem>
        :
        null
      }
      {orderPayout?.Payout?.Adjustment !== 0 && orderPayout?.Payout?.Adjustment !== null && orderPayout?.Payout?.Adjustment ?
        <IonItem lines="none">
          <IonText slot="start">{dataLocalization.Adjustment}</IonText>
          <IonText slot="end" class={(findPostiveNumber(orderPayout?.Payout?.Adjustment))}>
            {currencyByCountry(toAmount(orderPayout?.Payout?.Adjustment), language)}
          </IonText>
        </IonItem>
        :
        null
      }
      <hr className="color-white-border" />
      <IonItem lines='none'>
        <IonText slot='start'>{dataLocalization.Total}</IonText>
        <IonText slot='end'>{currencyByCountry(toAmount(orderPayout?.Payout?.TotalAmount), language)}</IonText>
      </IonItem>
    </IonCard>
  );
};