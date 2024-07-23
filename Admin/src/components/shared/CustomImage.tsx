import { IonImg } from "@ionic/react";
import React, { InputHTMLAttributes } from 'react';

export const CustomImg = React.forwardRef(({...rest }: InputHTMLAttributes<HTMLImageElement>, ref) => {
    return (
        <IonImg ref={ref} {...rest as any} />
    )
})