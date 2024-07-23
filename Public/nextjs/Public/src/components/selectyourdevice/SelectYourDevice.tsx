import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './SelectYourDevice.css';

import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks';
import { ActionType } from '../../features/actiontypes/Input.ActionTypes';
import { pageChange, routerChange } from '../../features/reducers/selldevice/PageChange.Reducer';
import { DeviceNameChange } from '../../features/reducers/devicename/DeviceName.Reducers';

import { HelperConstant } from '../helper/HelperConstant';
import { IsMobile, ResponsiveItemPerView, getUserLanguage, getUserLocationForParam } from '../helper/Helper';

import Language from './SelectYouDevice.json'
import dynamic from 'next/dynamic';

type Props = {
    productList: Array<any>,
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar"
}

const IonRow = dynamic(() => import('@ionic/react').then(mod => mod.IonRow), { ssr: false });
const IonCol = dynamic(() => import('@ionic/react').then(mod => mod.IonCol), { ssr: false });
const IonCard = dynamic(() => import('@ionic/react').then(mod => mod.IonCol), { ssr: false });

function SelectYourDevice({ productList, direction, language }: Props) {

    let dataLocalization = Language[language];
    let dispatch = useTypedDispatch();
    let history = useRouter();


    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [isNavigationShow, setIsNavigationShow] = useState<{ start: boolean, end: boolean }>({ start: true, end: false });

    const routerHandler = (type: "/sell-your-old-device") => {
        dispatch(pageChange("selectdevice"));
        history.push(`/${getUserLanguage()}${getUserLocationForParam(language)}${type}`);
    }

    const deviceSelectHandler = (ProductId: number, validLocation: boolean, deviceName: string) => {
        dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
        dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
        dispatch(DeviceNameChange({ payload: deviceName, type: ActionType.PRODUCT_ID }));
        dispatch(routerChange(deviceName));

        history.push(`/${getUserLanguage()}${getUserLocationForParam(language)}/sell-your-old-${deviceName.toLowerCase().replaceAll('_', '-')}`);
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

    // useEffect(() => {
    //     const getDeviceInfo = (serviceTypeId: number) => {
    //         MasterServices.GetAllProductType(serviceTypeId).then(res => {
    //             if (res.status === 200) {
    //                 let displayInList = res.data?.filter((x: { DisplayInList: boolean; }) => x.DisplayInList === true);
    //                 setProductList(displayInList);
    //             }
    //         }).catch((e: string) => {
    //             console.log(e);
    //         });
    //     }
    //     getDeviceInfo(HelperConstant.serviceTypeId.SELL);
    // }, []);

    return (
        <ion-grid class='syd-grid padding-adjustment' dir={direction}>
            <ion-grid class='container' dir={direction}>
                <ion-row>
                    <ion-col size-lg='12' size-md='12' size-sm='12' size-xs='12' size-xl='12' class='ion-text-center header-padding'>
                        <ion-text class='syd-header-1'>{dataLocalization.Select_Your_Device}</ion-text>
                    </ion-col>
                </ion-row>
                <IonRow class='syd_padding justifu-content-center'>
                    {IsMobile() ? '' :
                        <IonCol size-xl='1' size-lg='2' size-md='1' class='icon-col'>
                            <ion-icon ref={navigationPrevRef} class={`cursor-pointer custom-brand-navigation ${isNavigationShow.start ? "swiper-hide" : "swiper-show"}`} icon={language == 'ae_ar' ? chevronForwardOutline : chevronBackOutline} />
                        </IonCol>
                    }
                    <IonCol size-lg='8' size-md='10' size-sm='12' size-xs='12' size-xl='10' class='ion-text-center ion-padding'>
                        <Swiper modules={[Navigation]} navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }} onInit={(sw) => navigationHandler(sw)} onSlideChange={(sw) => navigationHandler(sw)} slidesPerView={ResponsiveItemPerView(2.2, 4.5, 3.2)} style={{ height: "100" }} dir={direction} >
                            {productList.map((val: any, i) => {
                                return <SwiperSlide key={i} className='ion-text-center ion-padding'>
                                    <ion-card class='syd-card' onClick={() => deviceSelectHandler(val.Id, true, val.EnumName)}>
                                        <img className='syd_product-image' alt={`sell${val.DisplayName}`} src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`} /><br /><br />
                                        <ion-label class='syd-header-2'>{val.DisplayName}</ion-label>
                                    </ion-card>
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </IonCol>
                    {IsMobile() ? '' :
                        <IonCol size-xl='1' size-lg='2' size-md='1' class='icon-col'>
                            <ion-icon ref={navigationNextRef} class={`cursor-pointer custom-brand-navigation ${isNavigationShow.end ? "swiper-hide" : "swiper-show"}`} icon={language == 'ae_ar' ? chevronBackOutline : chevronForwardOutline} />
                        </IonCol>
                    }
                </IonRow>
                <ion-row>
                    <ion-col size='12' class='ion-text-center ion-padding'>
                        <Button onClick={() => routerHandler("/sell-your-old-device")} className='syd-btn' variant="outlined">{dataLocalization.View_all_Gadgets}</Button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-grid>
    )
}

export default SelectYourDevice
