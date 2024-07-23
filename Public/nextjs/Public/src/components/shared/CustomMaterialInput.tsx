import { TextField } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    placeholder: any,
    onIonChange?: any,
    hasFocus?: boolean
    customPostion?: "yes" | "No"
}

export const CustomMaterialInput = React.forwardRef(({ label, placeholder, onIonChange, hasFocus, customPostion, ...rest }: inputProps, ref) => {

    const validOnChanges = () => { }

    return (
        <TextField fullWidth ref={ref} autocomplete={false} {...rest as any} id="outlined-basic" label={label} variant="outlined" size="small" placeholder={placeholder} onChange={(e: any) => { onIonChange ? onIonChange(e) : validOnChanges() }} />
    );
});






