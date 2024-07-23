import React, { InputHTMLAttributes } from 'react';

import { useTypedSelector } from '../../features/reduxhooks/ReduxHooks';

import { IsTablet } from '../helper/Helper';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    placeholder?: any,
    data: Array<any>,
    onIonChange?: any,
    dropDownClassName?: string,
    isLabelShow?: "Yes" | "No"
}

export const CustomDropdown = React.forwardRef(({ label, dropDownClassName, isLabelShow, placeholder, data, onIonChange, ...rest }: inputProps, ref) => {

    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const options = {
        cssClass: dropDownClassName ? dropDownClassName : 'my-custom-interface'
    };

    const customActionSheetOptions = {
        header: label,
    };

    return (
        <ion-item class="bg-color-white">
            {isLabelShow === "No" ? null : <ion-label>{label}</ion-label>}
            <ion-select className={isLabelShow === "No" ? "full-width" : ""} multipl={true} placeholder={placeholder} style={{whiteSpace:'inherit'}} autocomplete={false} interfaceOptions={IsMobile ? customActionSheetOptions : options} ref={ref} {...rest as any}
                onIonChange={(e) => onIonChange(e.detail.value)} interface={IsTablet() ? "alert" : IsMobile ? 'action-sheet' : 'popover'}>
                {data.map((val, i) => {
                    return <ion-select-option key={i} value={val.Id}>{val?.Name}</ion-select-option>
                })}
            </ion-select>
        </ion-item>
    );
});