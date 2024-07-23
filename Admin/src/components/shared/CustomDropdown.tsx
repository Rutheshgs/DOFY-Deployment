import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { InputHTMLAttributes } from 'react';
import { isMobile, isTablet } from '../helper/Helper';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: any;
    placeholder?: any,
    data: Array<any>,
    onIonChange?: any,
    dropDownClassName?: string,
    customDataShow?: boolean,
    customLabel?: boolean,
    noRecords?:boolean
}

export const CustomDropdown = React.forwardRef(({ label, dropDownClassName, placeholder, data, customDataShow, onIonChange, ...rest }: inputProps, ref) => {

    const options = {
        cssClass: dropDownClassName ? dropDownClassName : 'my-custom-interface'
    };

    const customActionSheetOptions = {
        header: label,
    };

    return (
        <IonItem className='custom-drp-down'>
            <IonLabel>{label}</IonLabel>
            <IonSelect multipl={true} placeholder={placeholder} interfaceOptions={isMobile() ? customActionSheetOptions : options} ref={ref} {...rest as any}
                onIonChange={(e) => onIonChange(e.detail.value)} interface={isTablet() ? "alert" : isMobile() ? 'action-sheet' : 'popover'}>
                    
                {customDataShow
                    ?
                    data && data?.map((val, i) => {
                        return <IonSelectOption key={i} value={val?.Id}>{val?.Code ? val.Code : ""}</IonSelectOption>
                    })
                    :
                    data && data?.map((val, i) => {
                        return <IonSelectOption key={i} value={val?.Id}>{val?.Name ? val.Name : val?.DisplayName ? val?.DisplayName : (val?.FirstName + ' ' + val?.LastName)}</IonSelectOption>
                    })
                }
            </IonSelect>
        </IonItem>
    );
});