import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    placeholder?: any,
    selectedValue: any,
    data: Array<any>,
    onIonChange?: any,
    dropDownClassName?: string,
}

export const CustomMaterialDropDown = React.forwardRef(({ label, selectedValue, dropDownClassName, placeholder, data, onIonChange, ...rest }: inputProps, ref) => {
    return (
        <FormControl fullWidth size='small'>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                defaultValue={selectedValue}
                ref={ref} {...rest as any}
                labelId="demo-simple-select-label"
                className={dropDownClassName}
                id="demo-simple-select-label"
                label={label}
                onChange={(e) => onIonChange(e.target.value)}
            >
                {data.map((val, i) => <MenuItem key={i} value={val.Id}>{val?.Name}</MenuItem>)}
            </Select>
        </FormControl>
    );
});