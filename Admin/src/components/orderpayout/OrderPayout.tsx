import { IonCard, IonItem, IonRow, IonText } from "@ionic/react";

import { currencyByCountry, findPostiveNumber, isIn, toAmount } from "../helper/Helper";
import "./OrderPayout.css";
import { useEffect, useState } from "react";
import CurrencyConvertorServices from "../../services/CurrencyConvertor.Services";
import { AEDConversion } from "../AED/AEDConversion";

type inputProps = {
  orderPayout: any,
  referralCode: string,
  customClassName: string,
}

export const OrderPayout = ({ orderPayout, referralCode, customClassName }: inputProps) => {

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
    <IonCard className={customClassName}>
      {isIn() ?
        <IonItem lines="none">
          <IonText slot="start" >Selling Price</IonText>
          <IonText slot="end"> {currencyByCountry(toAmount(Math.ceil(orderPayout?.SuggestedCost)))}</IonText>
        </IonItem>
        :
        <IonItem lines="none">
          <IonText slot="start">Selling Price</IonText>
          <IonText> {currencyByCountry(toAmount(Math.ceil(orderPayout?.SuggestedCost)))}</IonText>&nbsp;
          <AEDConversion InrAmount={InrAmount} aedConversion={Math.ceil(orderPayout?.SuggestedCost)}></AEDConversion>
        </IonItem>
      }
      {isIn() ?
        <IonRow>
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
          {orderPayout?.Adjustment !== 0 && orderPayout?.Adjustment !== null ?
            <IonItem lines="none">
              <IonText slot="start">Adjustment</IonText>
              <IonText slot="end" className={(findPostiveNumber(orderPayout?.Adjustment))}>
                {currencyByCountry(toAmount(orderPayout?.Adjustment))}
              </IonText>
            </IonItem>
            :
            null
          }
        </IonRow>
        :
        <IonRow>
          {orderPayout?.ReferralAmount ?
            <IonItem lines="none">
              <IonText slot="start">Referral Bonus <br />({referralCode})</IonText>
              <IonText> {currencyByCountry(orderPayout?.ReferralAmount)}</IonText>
              <AEDConversion InrAmount={InrAmount} aedConversion={Math.ceil(orderPayout?.ReferralAmount)}></AEDConversion>
            </IonItem>
            :
            null
          }
          {(orderPayout?.RequoteAmount > 0) ?
            <IonItem lines="none">
              <IonText >Requote Diff.</IonText>
              <IonText slot="end" className={findPostiveNumber(Math.ceil(orderPayout?.RequoteAmount as any) - Math.ceil(orderPayout?.SuggestedCost))}>
                {currencyByCountry(toAmount(Math.ceil(orderPayout?.RequoteAmount as any) - Math.ceil(orderPayout?.SuggestedCost)))}
              </IonText>
              <AEDConversion InrAmount={InrAmount} aedConversion={Math.ceil(orderPayout?.RequoteAmount as any) - Math.ceil(orderPayout?.SuggestedCost)}></AEDConversion>
            </IonItem>
            :
            null
          }
          {orderPayout?.Adjustment !== 0 && orderPayout?.Adjustment !== null ?
            <IonItem lines="none">
              <IonText slot="start">Adjustment</IonText>
              <IonText slot="end" className={(findPostiveNumber(orderPayout?.Adjustment))}>
                {currencyByCountry(toAmount(orderPayout?.Adjustment))}
              </IonText>
              <AEDConversion InrAmount={InrAmount} aedConversion={Math.ceil(orderPayout?.Adjustment)}></AEDConversion>
            </IonItem>
            :
            null
          }
        </IonRow>
      }
      <hr className="color-white" />
      {isIn() ?
        <IonItem lines="none">
          <IonText slot="start">Total</IonText>
          <IonText slot="end" >{currencyByCountry(toAmount(orderPayout?.TotalAmount))}</IonText>
        </IonItem>
        :
        <IonItem lines="none">
          <IonText slot="start">Total</IonText>
          <IonText>{currencyByCountry(toAmount(orderPayout?.TotalAmount))}</IonText>
          <AEDConversion InrAmount={InrAmount} aedConversion={Math.ceil(orderPayout?.TotalAmount)}></AEDConversion>
        </IonItem>
      }
    </IonCard>
  );
};
