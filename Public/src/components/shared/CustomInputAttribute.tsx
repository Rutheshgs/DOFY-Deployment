import { IonBadge, IonInput, IonItem, IonLabel } from '@ionic/react';
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
            setInput(newValue.slice(0, 10));            
        }       
    }

    useEffect(() => {
        setInput(scopeInput);
    },[])

    return (
        <IonItem className="bg-color-white">
            <IonLabel position='floating'>{label}</IonLabel>
            <IonInput placeholder={placeholder} value={input} onIonChange={(e) => customOnChange(e)} max={maximum} ref={ref} {...rest as any} />
            {input?.length > maximum ? <IonBadge color='danger' slot='end'>"Please enter only 10 digits"</IonBadge> : ""}
        </IonItem>
    );
});






