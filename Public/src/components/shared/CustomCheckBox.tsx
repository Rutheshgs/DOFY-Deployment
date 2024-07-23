import { IonCheckbox, IonItem, IonLabel } from '@ionic/react';
import React, { InputHTMLAttributes } from 'react';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    data: Array<any>,
    onIonChange?: any,
}

export const CustomCheckbox = React.forwardRef(({ data, onIonChange, ...rest }: inputProps, ref) => {

    return (
        <>
            {data.map((val, i) => {
                return <IonItem key={i} className="bg-color-white">
                    <IonLabel>{val.Name}</IonLabel>
                    <IonCheckbox ref={ref} {...rest as any} value={val.Id} onIonChange={(e) => onIonChange(e.detail.value)}></IonCheckbox>
                </IonItem>
            })}
        </>
    );
});