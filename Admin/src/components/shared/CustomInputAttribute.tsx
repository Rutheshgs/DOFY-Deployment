import { IonBadge, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react';
import { checkboxSharp, checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    placeholder?: any,
    scopeInput?: any,
    maximum?: any,
}

export const CustomInputAttribute = React.forwardRef(({ label, placeholder, scopeInput, maximum, ...rest }: inputProps, ref) => {

    const [input, setInput] = useState<any>();

    const customOnChange = (value : any) => {
        setInput(value.detail.value);
        let newValue = value.detail.value;
        if (newValue.length === maximum + 1){
            setInput(newValue.slice(0,15));            
        }       
    }

    useEffect(() => {
        setInput(scopeInput);
    },[])

    return (
        <IonItem className="bg-color-white">
            <IonLabel position='floating'>{label}</IonLabel>
            <IonInput placeholder={placeholder} value={input} onIonChange={(e) => customOnChange(e)} ref={ref} {...rest as any} />
            {input?.length === 15 ?
                <IonIcon slot='end' color='success' icon={checkmarkCircleOutline} />
            : ""}
            {input?.length <= 14 ? 
            <IonIcon slot='end' color='danger' icon={closeCircleOutline} />
           : ""}
        </IonItem>
    );
});






