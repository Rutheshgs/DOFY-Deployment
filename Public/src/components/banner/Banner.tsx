import { IonButton, IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import { useTypedSelector } from '../../features/reduxhooks/ReduxHooks';

import { CustomImg } from '../shared/CustomImage';

import "./Banner.css";
import { getUserLanguage, getUserLocationForParam } from '../helper/Helper';

let BannerWebImg = require("../../assets/images/home/bannerweb.png");
let BannerImg = require("../../assets/images/home/banner.png");

type Props = {
    isButtonHide?: boolean
}

function Banner({ isButtonHide }: Props) {
    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    return (
        <IonContent className='banner-content' scrollY={false}>
            {IsMobile ?
                <IonGrid className='container banner-grid'>
                    <IonRow>
                        <IonCol sizeSm='12' sizeLg='12' className='p-0'>
                            <CustomImg src={BannerImg} alt={"banner"} className="banner-image-mob"></CustomImg>
                            {isButtonHide ? null : <IonButton routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`} className='banner-btn' color='white'>Book Now</IonButton>}
                        </IonCol>
                    </IonRow>
                </IonGrid>
                :
                <IonGrid className='container banner-grid-web p-0'>
                    <IonRow className='banner-row'>
                        <IonCol size='12' className='p-0'>
                            <CustomImg src={BannerWebImg} alt={"banner"}></CustomImg>
                            {isButtonHide ? null : <IonButton routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`} className='banner-btn-web' color='white'>Book Now</IonButton>}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            }
        </IonContent>
    )
}

export default Banner