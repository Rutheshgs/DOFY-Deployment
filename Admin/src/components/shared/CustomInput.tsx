import { IonInput, IonItem, IonLabel } from '@ionic/react';
import React, { InputHTMLAttributes } from 'react';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    placeholder?: any,
    onIonChange?: any
}

export const CustomInput = React.forwardRef(({ label, placeholder, onIonChange, ...rest }: inputProps, ref) => {

    const validOnChanges = () => { }
    return (
        <IonItem>
            <IonLabel position="floating">{label}</IonLabel>
            <IonInput placeholder={placeholder} ref={ref} {...rest as any} onIonChange={(e) => { onIonChange ? onIonChange(e) : validOnChanges() }} />
        </IonItem>
    );
});


