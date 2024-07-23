import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
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
        <IonItem className="bg-color-white">
            {isLabelShow === "No" ? null : <IonLabel>{label}</IonLabel>}
            <IonSelect className={isLabelShow === "No" ? "full-width" : ""} multipl={true} placeholder={placeholder} style={{whiteSpace:'inherit'}} autocomplete={false} interfaceOptions={IsMobile ? customActionSheetOptions : options} ref={ref} {...rest as any}
                onIonChange={(e) => onIonChange(e.detail.value)} interface={IsTablet() ? "alert" : IsMobile ? 'action-sheet' : 'popover'}>
                {data.map((val, i) => {
                    return <IonSelectOption key={i} value={val.Id}>{val?.Name}</IonSelectOption>
                })}
            </IonSelect>
        </IonItem>
    );
});