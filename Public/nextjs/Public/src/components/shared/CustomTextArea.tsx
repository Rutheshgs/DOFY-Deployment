import React, { InputHTMLAttributes } from 'react';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    placeholder?: any,
    onIonChange?:any,
}

export const CustomTextArea = React.forwardRef(({ label, placeholder, onIonChange, ...rest }: inputProps, ref) => {

    return (
        <ion-item class="bg-color-white">
            <ion-label position='floating'>{label}</ion-label>
            <ion-textarea placeholder={placeholder} ref={ref} {...rest as any} onIonChange={(e) => onIonChange(e)} />
        </ion-item>
    );
});






