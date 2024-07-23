import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { CustomImg } from '../shared/CustomImage';

import "./ServicesBanner.css"

import servicesBanner from '../../assets/images/home/servicesbanner1.png';
import servicesBannerApp from '../../assets/images/home/servicesbanner1.png';

import { useTypedSelector } from '../../features/reduxhooks/ReduxHooks';

function ServicesBanner() {

  const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

  return (
    <IonGrid className='container services-banner-bg video-wrap' style={{ backgroundColor: '#566181' }}>
      <IonRow>
        <IonCol>
          <CustomImg src={IsMobile ? servicesBannerApp : servicesBanner} alt="services" className='service-banner-image' />
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default ServicesBanner