import { IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import CurrencyConvertorServices from "../../services/CurrencyConvertor.Services";
import { toAmount } from "../helper/Helper";

type inputProps = {
    aedConversion: number
    InrAmount : {Amount:number}
}

export const AEDConversion = ({ aedConversion,InrAmount }: inputProps) => {

    

    return (
        
        <IonText color="primary" style={{  fontSize: "14px" }}>( ₹ {toAmount(Math.ceil(aedConversion * InrAmount.Amount))})</IonText>
    )

}  