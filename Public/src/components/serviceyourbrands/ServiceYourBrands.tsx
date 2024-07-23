import { IonCard, IonCardHeader, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonRow, IonSegment, IonSegmentButton, IonTitle } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import "swiper/css/navigation";

import "./ServiceYourBrands.css";

import { ResponsiveItemPerView } from '../helper/Helper';
import { IBrandMasterModel } from '../../models/BrandMaster.Model';
import { IProductTypeModel } from '../../models/ProductType.Model';
import MasterServices from '../../services/Master.Services';

import { useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { HelperConstant } from '../helper/HelperConstant';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { CustomImg } from '../shared/CustomImage';

import comingSoon from "../../assets/images/coming-soon.png";

function ServiceYourBrands() {

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [brandMasterData, setBrandMasterData] = useState([]);

  let deviceInfo: Array<any> = useTypedSelector(state => state.DeviceInfoReducer.DeviceInfoData);

  const [selectedSegment, setSelectedSegment] = useState<any>();

  const getBrands = (ProductId: number, serviceTypeId: number, EnumName?: string) => {
    MasterServices.GetBrandMasterByProductId(ProductId, serviceTypeId).then(res => {
      if (res.status === 200)
        setSelectedSegment(EnumName);
      setBrandMasterData(res.data);
    }).catch((e: string) => {
      console.log(e)
    })
  }

  // const getModel = (BrandId: number) => {
  //   dispatch(InputParamChange({ payload: BrandId, type: ActionType.BRAND_ID }));
  //   dispatch(pageChange("selectmodel"));
  //   history.push("/sellyourdevice");
  // }

  useEffect(() => {
    if (deviceInfo && deviceInfo.length > 0) {
      getBrands(deviceInfo[0].Id ?? HelperConstant.defaultProductTypeId, HelperConstant.serviceTypeId.SELL, deviceInfo[0].EnumName);
    }
  }, [deviceInfo])

  // const serviceSliderbreakPoints = {
  //   280: {
  //     slidesPerView: 1.3,
  //     spaceBetween: 0,
  //   },
  //   320: {
  //     slidesPerView: 2.3,
  //     spaceBetween: 0,
  //   },
  //   480: {
  //     slidesPerView: 2.3,
  //     spaceBetween: 0,
  //   },
  //   640: {
  //     slidesPerView: 2.3,
  //     spaceBetween: 0,
  //   },
  //   768: {
  //     slidesPerView: 4.5,
  //     spaceBetween: 0,
  //   },
  //   1024: {
  //     slidesPerView: 7.5,
  //     spaceBetween: 0,
  //   },
  // };

  // const serviceBrandBreakpoints = {
  //   375: {
  //     slidesPerView: 2.3,
  //     spaceBetween: 10,
  //   },
  //   510: {
  //     slidesPerView: 2.3,
  //     spaceBetween: 10,
  //   },
  //   640: {
  //     slidesPerView: 2,
  //     spaceBetween: 10,
  //   },
  //   768: {
  //     slidesPerView: 4,
  //     spaceBetween: 10,
  //   },
  //   1024: {
  //     slidesPerView: 9.3,
  //     spaceBetween: 10,
  //   },
  // };

  return (
    <IonGrid className='container select-your-brands-grid '>
      <IonRow>
        <IonCol sizeXl='11' sizeLg='10' sizeMd='10' sizeXs='8' sizeSm='8' className='ion-padding'>
          <IonTitle size='large'>Repair</IonTitle>
        </IonCol>
        <IonCol sizeXl='1' sizeLg='2' sizeMd='2' sizeXs='4' sizeSm='4' className='custom-brand-nav ion-padding'>
          <IonIcon ref={navigationPrevRef} className="cursor-pointer" icon={chevronBackOutline} /> &nbsp;
          <IonIcon ref={navigationNextRef} className="cursor-pointer" icon={chevronForwardOutline} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <Swiper freeMode={true} slidesPerView={ResponsiveItemPerView(2.3, 8.1, 5, 8)} speed={100} centerInsufficientSlides={false}>
            <IonSegment scrollable={true} selectOnFocus={true} value={selectedSegment}>
              {deviceInfo.map((val: IProductTypeModel, i) => {
                return <SwiperSlide key={i} className='brand-swiper-wrapper'>
                  <IonSegmentButton className={`select-your-brands-segment ${val.EnumName === selectedSegment && "slide-active"}`} value={val.EnumName} onClick={() => getBrands(val.Id, HelperConstant.serviceTypeId.SELL, val.EnumName)}>
                    <IonLabel>{val.Name}</IonLabel>
                  </IonSegmentButton>
                </SwiperSlide>
              })}
            </IonSegment>
          </Swiper>
        </IonCol>
      </IonRow>
      <IonRow>
        <Swiper modules={[Navigation]} className="brand-swipper" speed={100} navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }} slidesPerView={ResponsiveItemPerView(2.4, 8.1, 5, 11.1)}>
          {brandMasterData.map((val: IBrandMasterModel, index) => {
            return <SwiperSlide key={index}>
              <IonImg src={comingSoon} className="repair-coming-soon" alt='comingSoon'></IonImg>
              <IonCard className='service-card'>
                <IonCardHeader className='coming-soon-container'>
                  <CustomImg src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`} alt={val.Name} style={{ height: '80px' }} />
                </IonCardHeader>
              </IonCard>
            </SwiperSlide>
          })}
        </Swiper>
      </IonRow>
    </IonGrid>
  )
}

export default ServiceYourBrands