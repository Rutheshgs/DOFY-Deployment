import { IonCard, IonItem, IonText } from "@ionic/react";
import { ISellOrderModel } from "../../models/order/sell/SellOrder.Model";
import { Direction, authUser, getLocalStorage, getUserLanguage, isIn, onKeyDown } from "../helper/Helper";


import { currencyByCountry, findPostiveNumber, toAmount } from "../helper/Helper";
import "./OrderPayout.css";
import Language from './OrderPayout.json'

type inputProps = {
  orderPayout: ISellOrderModel | any,
  ReferralCode: string,
  setIsReferral:any
}

export const OrderPayout = ({ orderPayout, ReferralCode,setIsReferral }: inputProps) => {

  let dataLocalization = Language[getUserLanguage()];


  return (
    <IonCard className='referral-card' onMouseEnter={()=>setIsReferral(true)} onMouseLeave={()=>setIsReferral(false)}>
      <IonItem lines='none'>
        <IonText slot='start'>{dataLocalization.Selling_Price}</IonText>
        <IonText slot='end'>{currencyByCountry(orderPayout?.Payout?.RequoteAmount > 0 ? toAmount(Math.ceil(orderPayout?.Payout?.RequoteAmount)) : toAmount(orderPayout?.Payout?.SuggestedCost))}</IonText>
      </IonItem>
      {orderPayout?.Payout?.ReferralAmount ?
        <IonItem lines='none'>
          <IonText slot='start'>{dataLocalization.Promo_Bonus} <br /> ({ReferralCode})</IonText>
          <IonText slot='end'>{currencyByCountry(toAmount(orderPayout?.Payout?.ReferralAmount))}</IonText>
        </IonItem>
        :
        null
      }
      {/* {orderPayout?.Payout?.RequoteAmount > 0 ?
        <IonItem lines="none">
          <IonText slot="start">Requote Diff.</IonText>
          <IonText slot="end" className={findPostiveNumber(Math.ceil(orderPayout?.Payout?.RequoteAmount) - Math.ceil(orderPayout?.Payout?.SuggestedCost))}>
            ₹ {toAmount(Math.ceil(orderPayout?.Payout?.RequoteAmount) - Math.ceil(orderPayout?.Payout?.SuggestedCost))}
          </IonText>
        </IonItem>
        :
        null
      } */}
      {orderPayout?.Payout?.Adjustment !== 0 && orderPayout?.Payout?.Adjustment !== null && orderPayout?.Payout?.Adjustment ?
        <IonItem lines="none">
          <IonText slot="start">{dataLocalization.Adjustment}</IonText>
          <IonText slot="end" className={(findPostiveNumber(orderPayout?.Payout?.Adjustment))}>
            {currencyByCountry(toAmount(orderPayout?.Payout?.Adjustment))}
          </IonText>
        </IonItem>
        :
        null
      }
      <hr className="color-white-border" />
      <IonItem lines='none'>
        <IonText slot='start'>{dataLocalization.Total}</IonText>
        <IonText slot='end'>{currencyByCountry(toAmount(orderPayout?.Payout?.TotalAmount))}</IonText>
      </IonItem>
    </IonCard>
  );
};
