import { IonInput, IonItem, IonLabel } from '@ionic/react';
import React, { InputHTMLAttributes } from 'react';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    placeholder?: any,
    onIonChange?: any,
    hasFocus?: boolean
    customPostion?: "yes" | "No"
}

export const CustomInput = React.forwardRef(({ label, placeholder, onIonChange, hasFocus, customPostion, ...rest }: inputProps, ref) => {

    const validOnChanges = () => { }

    return (
        <IonItem className={`bg-color-white ${hasFocus && 'item-has-focus'}`}>
            <IonLabel className={customPostion === "yes" ? "custom-label-inp" : ""} position={customPostion === "yes" ? "fixed" : "floating"}>{label}</IonLabel>
            <IonInput placeholder={placeholder} ref={ref} autocomplete={false} {...rest as any} onIonChange={(e) => { onIonChange ? onIonChange(e) : validOnChanges() }} />
        </IonItem>
    );
});






