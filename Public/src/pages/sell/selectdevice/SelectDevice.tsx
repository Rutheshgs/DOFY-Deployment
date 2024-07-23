import { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonChip, IonCol, IonGrid, IonLabel, IonRow, IonText } from '@ionic/react';

import "./SelectDevice.css";

import { pageChange, routerChange } from '../../../features/reducers/selldevice/PageChange.Reducer';
import { InputParamChange } from '../../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../../features/actiontypes/Input.ActionTypes';
import { useTypedDispatch, useTypedSelector } from '../../../features/reduxhooks/ReduxHooks';

import MasterServices from '../../../services/Master.Services';
import { HelperConstant } from '../../../components/helper/HelperConstant';
import { DeviceNameChange, DeviceNameChangeReset } from '../../../features/reducers/devicename/DeviceName.Reducers';
import { IProductTypeModel } from '../../../models/ProductType.Model';
import { Skeleton } from '../../../components/skeleton/Skeleton';
import { getUserLanguage, getUserLocationForParam } from '../../../components/helper/Helper';
import Language from "./SelectDeviceLanguage.json";
import { useHistory } from 'react-router-dom';

function SelectDevice() {

    let dispatch = useTypedDispatch();
    let history = useHistory();

    const [selectDevice, setSelectDevice] = useState<Array<IProductTypeModel>>([]);
    const [isSkelton, setIsSkelton] = useState<boolean>(true);
    let selector = useTypedSelector((state) => state.PageChangeReducer.selectedPage);

    let dataLocalization = Language[getUserLanguage()];

    const deviceSelectHandler = (ProductId: number, deviceName: string) => {
        dispatch(InputParamChange({ payload: ProductId, type: ActionType.PRODUCT_ID }));
        // dispatch(pageChange("selectbrand"));
        // dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
        // dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));

        dispatch(DeviceNameChange({ payload: deviceName.replaceAll("_", " "), type: ActionType.PRODUCT_ID }));
        dispatch(routerChange(deviceName.replaceAll("_", "-")));

        history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-${deviceName.replaceAll("_", "-").toLowerCase()}`);
    }

    useEffect(() => {
        const getDevice = (serviceTypeId: number) => {
            MasterServices.GetAllProductType(serviceTypeId).then(res => {
                if (res.status === 200) {
                    setSelectDevice(res.data);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }

        getDevice(HelperConstant.serviceTypeId.SELL);
        if (selector) {
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.VARIANT_ID }));
            dispatch(InputParamChange({ payload: 0, type: ActionType.PRODUCT_ID }));
        }
    }, []);

    return (
        <IonGrid data-aos="fade-left">
            <IonRow>
                <IonCol sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12' sizeXl='12' className='ion-text-center header-padding'>
                    <IonText className='syd-header-1'>{dataLocalization.CHOOSE_DEVICE_TYPE}</IonText>
                </IonCol>
            </IonRow>
            <IonRow className={`${getUserLanguage() === "ae_ar" ? 'sd_mobile-content-center-india' : 'sd_mobile-content-center-uae'}`}>
                {selectDevice.length > 0 ? selectDevice.map((val, i) => {
                    return <IonCol key={i} sizeXl='3' sizeLg='3' sizeMd='4' sizeXs='6' className='ion-padding' >
                        <IonCard className='syd-card' onClick={() => deviceSelectHandler(val.Id, val.EnumName)}>
                            <img className='syd_product-image' alt={`sell${val.DisplayName}`} src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`} /><br /><br />
                            <IonLabel className='syd-header-2'>{val.DisplayName}</IonLabel>
                        </IonCard>
                    </IonCol>
                })
                    :
                    isSkelton ?
                        Skeleton("4", "3", "3", "1.5", "6") :
                        <IonCardHeader className='header' >
                            <IonChip>
                                <IonLabel color='black'>{dataLocalization.No_records_found}</IonLabel>
                            </IonChip>
                        </IonCardHeader>
                }
            </IonRow>
        </IonGrid>

    )
}

export default SelectDevice