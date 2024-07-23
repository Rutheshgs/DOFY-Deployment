import { IonItem, IonLabel, IonTextarea } from '@ionic/react';
import React, { InputHTMLAttributes } from 'react';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    placeholder?: any,
    onIonChange?:any,
}

export const CustomTextArea = React.forwardRef(({ label, placeholder, onIonChange, ...rest }: inputProps, ref) => {

    return (
        <IonItem className="bg-color-white">
            <IonLabel position='floating'>{label}</IonLabel>
            <IonTextarea placeholder={placeholder} ref={ref} {...rest as any} onIonChange={(e) => onIonChange(e)} />
        </IonItem>
    );
});






