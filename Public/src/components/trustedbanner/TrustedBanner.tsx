import { IonCol, IonGrid, IonRow } from '@ionic/react';
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { CustomImg } from '../shared/CustomImage';

import "./TrustedBanner.css";

import trustedBanner1 from "../../assets/images/home/trustedbanner1.png";
import trustedBanner from "../../assets/images/home/trustedbanner.png";
import trustedBanner2 from "../../assets/images/home/trustedbanner2.png";

import { useTypedSelector } from '../../features/reduxhooks/ReduxHooks';

function TrustedBanner() {

    SwiperCore.use([Autoplay]);
    
    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    return (
        <IonGrid className='ion-padding-top container trusted-banner-bg'>
            {IsMobile ?
                <IonRow>
                    <Swiper autoplay rewind={true}>
                        <SwiperSlide>
                            <CustomImg className='banner-image' src={trustedBanner1} alt="banner" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CustomImg className='banner-image' src={trustedBanner2} alt="banner" />
                        </SwiperSlide>
                    </Swiper>
                </IonRow>
                :
                <IonRow>
                    <IonCol>
                        <CustomImg className='banner-image' src={trustedBanner} alt="banner" />
                    </IonCol>
                </IonRow>
            }
        </IonGrid>
    )
}

export default TrustedBanner