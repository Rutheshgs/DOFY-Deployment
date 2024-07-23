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

export const MaterialCustomDropDown = React.forwardRef(({ label, selectedValue, dropDownClassName, placeholder, data, onIonChange, ...rest }: inputProps, ref) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                ref={ref} {...rest as any}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue}
                label="Age"
                onChange={onIonChange}
            >
                {data.map((val, i) => <MenuItem key={i} value={val.Id}>{val?.Name}</MenuItem>)}
            </Select>
        </FormControl>
    );
});