import { useEffect, useRef, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonModal, IonRow, IonText, IonTitle } from '@ionic/react'
import { useHistory } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { ResponsiveItemPerView, getUserLanguage, getUserLocationForParam } from '../helper/Helper';

import './ChooseYourDevice.css';

import { IProductTypeModel } from '../../models/ProductType.Model';

import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { pageChange } from '../../features/reducers/selldevice/PageChange.Reducer';
import { InputParamChange } from '../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../features/actiontypes/Input.ActionTypes';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { HelperConstant } from '../helper/HelperConstant';
import { CustomImg } from '../shared/CustomImage';
import LocationModel from '../locationmodal/LocationModal';


function ChooseYourDevice() {

    let deviceInfo: Array<any> = useTypedSelector(state => state.DeviceInfoReducer.DeviceInfoData);
    const userLocation = useTypedSelector(state => state.userLocation.isLocation);
    let dispatch = useTypedDispatch();
    let history = useHistory();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [locationlist, setLocationList] = useState<Array<any>>([]);
    const [locationModel, setLocationModel] = useState(false);
    const [productId, setProductId] = useState(0);

    const getGeoLocation = () => {
        // MasterServices.GetAllDofyGeo(HelperConstant.serviceTypeId.SELL).then(res => {
        //     if (res.status === 200) {
        //         setLocationList(res.data);
        //     }
        // }).catch(e => {
        //     console.log(e);
        // });
    }

    const getValidLocation = (validLocation: boolean) => {
        if (validLocation) {
            setLocationModel(false);
            setTimeout(() => { getBrand(productId, validLocation) }, 500);
        }
    }

    const getBrand = (ProductId: number, validLocation: boolean) => {
        dispatch(InputParamChange({ payload: ProductId, type: ActionType.PRODUCT_ID }));
        if (validLocation) {
            dispatch(pageChange("selectbrand"));
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
        }
        else {
            setProductId(ProductId);
            setLocationModel(true);
        }
    }

    useEffect(() => {
        getGeoLocation();
    }, [])

    return (
        <IonGrid className='chooseyourdevice-grid container'>
            <IonRow>
                <IonCol sizeXl='11' sizeLg='10' sizeMd='10' sizeXs='8' className='ion-padding ion-text-start'>
                    <IonTitle size='large'>Sell</IonTitle>
                </IonCol>
                <IonCol sizeXl='1' sizeLg='2' sizeMd='2' sizeXs='4' className='custom-brand-nav ion-padding'>
                    <IonIcon ref={navigationPrevRef} className="cursor-pointer" icon={chevronBackOutline} /> &nbsp;
                    <IonIcon ref={navigationNextRef} className="cursor-pointer" icon={chevronForwardOutline} />
                </IonCol>
            </IonRow>
            <IonRow >
                <IonCol size='12' className='ion-align-content-center'>
                    <Swiper modules={[Navigation]} navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }} slidesPerView={ResponsiveItemPerView(1.7, 6.3, 4, 8)} spaceBetween={10}>
                        {deviceInfo.map((item: IProductTypeModel, index) => {
                            return <SwiperSlide key={index}>
                                <IonCard className='chooseyourdevice-card cursor-pointer' onClick={() => getBrand(item.Id, userLocation)}>
                                    <IonCardHeader>
                                        <CustomImg src={`${HelperConstant.imageAPI}/${item.ThumbnailPath}`} alt={item.Name} style={{ height: '80px' }} />
                                    </IonCardHeader>
                                    <IonCardContent >
                                        <IonCardTitle className='ion-text-center'>
                                            <IonText className='tod-text'>{item.Name}</IonText>
                                        </IonCardTitle>
                                    </IonCardContent>
                                </IonCard>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonModal isOpen={locationModel} className="modal-location" canDismiss={true}
                    onDidDismiss={() => setLocationModel(false)}>
                    <LocationModel isValid={getValidLocation} showModel={setLocationModel} locationlist={locationlist} />
                </IonModal>
            </IonRow>
        </IonGrid>
    )
}

export default ChooseYourDevice   