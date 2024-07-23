import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonLabel, IonText, } from "@ionic/react";
import React, { InputHTMLAttributes } from "react";
import "./ProductVarients.css";
import { isIn } from "../../../components/helper/Helper";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: any,
}

export const ProductVarients = React.forwardRef(({ data, ...rest }: inputProps, ref) => {
  return (
    <IonCard className="pv_card">
      <IonCardHeader color="light" className="pv_cardheader">
        <IonText color="medium"><b>{data.Name}</b></IonText>
      </IonCardHeader>
      {isIn()?
      <IonCardContent className="pv_card-content">
      <IonBadge color="white" className="pv_badge">
        <IonLabel className="pv-amout-label" color="danger">MIN: ₹{data.MinimumValue}</IonLabel>
      </IonBadge>
      <IonBadge color="white" style={{ border: '1px solid lightgrey' }}>
        <IonLabel className="pv-amout-label" color="success">MAX: ₹{data.MaximumValue}</IonLabel>
      </IonBadge>
    </IonCardContent>
    :
    <IonCardContent className="pv_card-content">
        <IonBadge color="white" className="pv_badge">
          <IonLabel className="pv-amout-label" color="danger">MIN:{data.MinimumValue} AED</IonLabel>
        </IonBadge>
        <IonBadge color="white" style={{ border: '1px solid lightgrey' }}>
          <IonLabel className="pv-amout-label" color="success">MAX:{data.MaximumValue} AED</IonLabel>
        </IonBadge>
      </IonCardContent>
      }
    </IonCard>
  );
});
