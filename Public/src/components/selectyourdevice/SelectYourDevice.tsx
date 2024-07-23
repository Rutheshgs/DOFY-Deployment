import { IonGrid, IonRow, IonCol, IonText, IonCard, IonLabel, IonIcon, IonImg } from '@ionic/react';
import { Button } from '@mui/material';

import './SelectYourDevice.css';
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks';
import { InputParamChange } from '../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../features/actiontypes/Input.ActionTypes';
import { pageChange, routerChange } from '../../features/reducers/selldevice/PageChange.Reducer';

import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import MasterServices from '../../services/Master.Services';
import { HelperConstant } from '../helper/HelperConstant';
import { Direction, IsMobile, IsTablet, ResponsiveItemPerView, getUserLanguage, getUserLocationForParam, isMobilePlatform } from '../helper/Helper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DeviceNameChange } from '../../features/reducers/devicename/DeviceName.Reducers';
import { Navigation } from 'swiper';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import Language from './SelectYouDevice.json'

function SelectYourDevice() {

    let dataLocalization = Language[getUserLanguage()];
    let dispatch = useTypedDispatch();
    let history = useHistory();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [productList, setProductList] = useState([]);

    const [isNavigationShow, setIsNavigationShow] = useState<{ start: boolean, end: boolean }>({ start: true, end: false });

    const routerHandler = (type: "/sell-your-old-device") => {
        dispatch(pageChange("selectdevice"));
        history.push(`/${getUserLanguage()}${getUserLocationForParam()}${type}`);
    }

    const deviceSelectHandler = (ProductId: number, validLocation: boolean, deviceName: string) => {
        // dispatch(InputParamChange({ payload: ProductId, type: ActionType.PRODUCT_ID }));
        // dispatch(pageChange("selectbrand"));
        // history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
        // dispatch(DeviceNameChange({ payload: deviceName, type: ActionType.PRODUCT_ID }));

        dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
        dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
        dispatch(DeviceNameChange({ payload: deviceName, type: ActionType.PRODUCT_ID }));
        dispatch(routerChange(deviceName));

        history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-${deviceName.toLowerCase().replaceAll('_', '-')}`);
    }

    const navigationHandler = (sw: any) => {
        if (sw.isBeginning == true || sw.activeIndex == 0) {
            setIsNavigationShow({ start: true, end: false });
        }
        else if (sw.isEnd == true) {
            setIsNavigationShow({ start: false, end: true });
        }
        else {
            setIsNavigationShow({ start: sw.isBeginning, end: sw.isEnd });
        }
    }

    useEffect(() => {
        const getDeviceInfo = (serviceTypeId: number) => {
            MasterServices.GetAllProductType(serviceTypeId).then(res => {
                if (res.status === 200) {
                    let displayInList = res.data?.filter((x: { DisplayInList: boolean; }) => x.DisplayInList === true);
                    setProductList(displayInList);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }
        getDeviceInfo(HelperConstant.serviceTypeId.SELL);
    }, []);

    return (
        <IonGrid className='syd-grid padding-adjustment' dir={Direction()}>
            <IonGrid className='container' dir={Direction()}>
                <IonRow>
                    <IonCol sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12' sizeXl='12' className='ion-text-center header-padding'>
                        <IonText className='syd-header-1'>{dataLocalization.Select_Your_Device}</IonText>
                    </IonCol>
                </IonRow>
                <IonRow className='syd_padding justifu-content-center'>
                    {IsMobile() ? '' :
                        <IonCol sizeXl='1' sizeLg='2' sizeMd='1' sizeXs='0' sizeSm='0' className='icon-col'>
                            <IonIcon ref={navigationPrevRef} className={`cursor-pointer custom-brand-navigation ${isNavigationShow.start && "swiper-hide"}`} icon={getUserLanguage() == 'ae_ar' ? chevronForwardOutline : chevronBackOutline} />
                        </IonCol>
                    }
                    <IonCol sizeLg='8' sizeMd='10' sizeSm='12' sizeXs='12' sizeXl='10' className='ion-text-center ion-padding'>
                        <Swiper modules={[Navigation]} navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }} onInit={(sw) => navigationHandler(sw)} onSlideChange={(sw) => navigationHandler(sw)} slidesPerView={ResponsiveItemPerView(2.2, 4.5, 3.2)} style={{ height: "100%" }} dir={Direction()} >
                            {productList.map((val: any, i) => {
                                return <SwiperSlide key={i} className='ion-text-center ion-padding'>
                                    <IonCard className='syd-card' onClick={() => deviceSelectHandler(val.Id, true, val.EnumName)}>
                                        <img className='syd_product-image' alt={`sell${val.DisplayName}`} src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`} /><br /><br />
                                        <IonLabel className='syd-header-2'>{val.DisplayName}</IonLabel>
                                    </IonCard>
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </IonCol>
                    {IsMobile() ? '' :
                        <IonCol sizeXl='1' sizeLg='2' sizeMd='1' sizeXs='0' sizeSm='0' className='icon-col'>
                            <IonIcon ref={navigationNextRef} className={`cursor-pointer custom-brand-navigation ${isNavigationShow.end && "swiper-hide"}`} icon={getUserLanguage() == 'ae_ar' ? chevronBackOutline : chevronForwardOutline} />
                        </IonCol>
                    }
                </IonRow>
                <IonRow>
                    <IonCol size='12' className='ion-text-center ion-padding'>
                        <Button onClick={() => routerHandler("/sell-your-old-device")} className='syd-btn' variant="outlined">{dataLocalization.View_all_Gadgets}</Button>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonGrid>
    )
}

export default SelectYourDevice
