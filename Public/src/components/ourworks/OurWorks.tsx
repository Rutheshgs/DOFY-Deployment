import { IonGrid, IonRow, IonCol, IonText, IonCard } from '@ionic/react';
import { Direction,getUserLanguage, isIn, isRTL } from '../helper/Helper';

import './OurWorks.css'
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Language from './OurWorks.json'

function OurWorks() {
  let dataLocalization = Language[getUserLanguage()];

    return (
        <IonGrid className='ow-grid ow-padding-adjustment' dir={Direction()}>
            <IonGrid className='container'>
                <IonRow>
                    <IonCol size='12'>
                        <IonCard className='ow-card' >
                            <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
                                {({ isVisible }) => (
                                    <IonRow className='ow-card-row'>
                                        <IonCol sizeXl='3' sizeMd='6' sizeXs='12' className={isRTL() ? '' : `ow-card-col-border`}>
                                            <IonText className='ow-card-header-1'>{dataLocalization.Nearing} {isVisible && <CountUp start={0} end={500} duration={5} />}k</IonText><br />
                                            <IonText className='ow-card-header-2'>{dataLocalization.App_Downloads}</IonText>
                                        </IonCol>
                                        <IonCol sizeXl='3' sizeMd='6' sizeXs='12' className={`ow-card-col-border`}>
                                            <IonText className='ow-card-header-1'>{isVisible && <CountUp start={0} end={300} duration={5} />}m +</IonText><br />
                                            <IonText className='ow-card-header-2'>{dataLocalization.Cash_given_and_Counting}</IonText>
                                        </IonCol>
                                        <IonCol sizeXl='3' sizeMd='6' sizeXs='12' className={`ow-card-col-border`}>
                                            <IonText className='ow-card-header-1'>{isVisible && <CountUp start={0} end={50} duration={5} />}k +</IonText><br />
                                            <IonText className='ow-card-header-2'>{dataLocalization.Orders_Completed}</IonText>
                                        </IonCol>
                                        <IonCol sizeXl='3' sizeMd='6' sizeXs='12' className={isRTL() ? `ow-card-col-border` : ''}>
                                            <IonText className='ow-card-header-1'>{isVisible && <CountUp start={0} end={2000} duration={5} />}+</IonText><br />
                                            <IonText className='ow-card-header-2'>{dataLocalization.Areas_Covered}</IonText>
                                        </IonCol>
                                    </IonRow>
                                )}
                            </VisibilitySensor>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonGrid>
    )
}

export default OurWorks
