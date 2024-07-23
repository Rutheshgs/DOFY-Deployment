import { IonItem, IonLabel, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/react';
import React, { InputHTMLAttributes } from 'react';


interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    placeholder?: any,
    data: Array<any>
}

export const CustomMultipleDropdown = React.forwardRef(({ label, placeholder, data, ...rest }: inputProps, ref) => {

    return (
        <IonItem>
            <IonLabel >{label}</IonLabel>
            <IonSelect multiple={true} placeholder={placeholder} ref={ref} {...rest as any} cancelText="cancel" okText="Ok">
                {data.map((val, i) => {
                    return (
                    <IonSelectOption key={i} value={val.Id}>{val.Name}</IonSelectOption>)
                })}
            </IonSelect>
        </IonItem>
    );
});