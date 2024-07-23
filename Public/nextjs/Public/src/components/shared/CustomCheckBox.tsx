import React, { InputHTMLAttributes } from 'react';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    data: Array<any>,
    onIonChange?: any,
}

export const CustomCheckbox = React.forwardRef(({ data, onIonChange, ...rest }: inputProps, ref) => {

    return (
        <>
            {data.map((val, i) => {
                return <ion-item key={i} class="bg-color-white">
                    <ion-label>{val.Name}</ion-label>
                    <ion-checkbox ref={ref} {...rest as any} value={val.Id} onIonChange={(e) => onIonChange(e.detail.value)}></ion-checkbox>
                </ion-item>
            })}
        </>
    );
});