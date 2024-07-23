import { IonCard, IonCol, IonGrid, IonRow, IonText, isPlatform } from '@ionic/react';
import './HowItWork.css';
import { HowItWorkData } from './HowItWorkData';
import { Direction,getUserLanguage } from '../helper/Helper';
import  Language  from './HowItWorks.json';

function HowItWork() {

    let dataLocalization = Language[getUserLanguage()];

    return (
        <IonGrid className='hiw-grid padding-adjustment' dir={Direction()}>
            <IonGrid className='container'>
                <IonRow>
                    <IonCol sizeLg='12' sizeXs='12' className='ion-text-center header-padding'>
                        <IonText className='hiw-header-1'>{dataLocalization.How_we_made_selling}</IonText>
                    </IonCol>
                    <IonCol size='12' sizeXs='12' className='ion-text-center'>
                        <IonText className='hiw-header-2'>It is easy as 123</IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    {HowItWorkData.map((val, i) => (
                        <IonCol key={i} sizeLg='3' offsetLg='0.8' offsetXs='0'  sizeXs='12' className='ion-text-center ion-padding'>
                            <IonCard className='hiw-card-1'>
                                <IonCard className='hiw-card-2'>
                                    <img className='hiw-view' alt="Traced" style={{ height: "40%" }} src={val.Img1} />
                                    <img alt="Traced" className='hiw-non-view' style={{ height: "40%" }} src={val.Img2} />
                                </IonCard>
                            </IonCard>
                                <IonText className='hiw-card-header-1'>{val.Header1}</IonText><br />
                                <IonText className='hiw-card-header-2'>{val.Header2}</IonText>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </IonGrid>
    )
}

export default HowItWork