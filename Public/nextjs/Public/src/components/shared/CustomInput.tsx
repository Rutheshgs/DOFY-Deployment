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
        <ion-item class={`bg-color-white ${hasFocus && 'item-has-focus'}`}>
            <ion-label class={customPostion === "yes" ? "custom-label-inp" : ""} position={customPostion === "yes" ? "fixed" : "floating"}>{label}</ion-label>
            <ion-input placeholder={placeholder} ref={ref} autocomplete={false} {...rest as any} onIonChange={(e) => { onIonChange ? onIonChange(e) : validOnChanges() }} />
        </ion-item>
    );
});






