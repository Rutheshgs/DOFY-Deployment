import React, { InputHTMLAttributes } from 'react';

export const CustomImg = React.forwardRef(({...rest }: InputHTMLAttributes<HTMLImageElement>, ref) => {
    return (
        <ion-img ref={ref} {...rest as any} />
    )
})