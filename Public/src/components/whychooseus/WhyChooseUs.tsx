import { IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/react'
import './WhyChooseUs.css';
import whychooseimage from '../../assets/images/whychooseimage.png';
import whychooseimage01 from '../../assets/images/whychooseimage01.png';
import righticon from '../../assets/images/righticon.png';
import { Direction, getUserLanguage } from '../helper/Helper';
import Language from './WhyChooseUs.json'
function WhyChooseUs() {

    let dataLocalization = Language[getUserLanguage()];

    return (
        <IonGrid className='wc_grid padding-adjustment' dir={Direction()}>
            <IonGrid className='container'>
                <IonRow className='tm-header-row'>
                    <IonCol size='12' className='ion-text-center header-padding'>
                        <IonText className='wc-header-1'>{dataLocalization.Why_Choose_Us}</IonText>
                    </IonCol>
                    {/* <IonCol size='12' className='ion-text-center'>
                    <IonText className='wc-header-2'>{dataLocalization.Selling_your_device}</IonText>
                </IonCol> */}
                </IonRow>
                <IonRow>
                    <IonCol sizeLg='6' sizeXs='12' sizeMd='6' className='ion-padding align-self-center'>
                        {getUserLanguage() === "in_en" ?
                            <IonImg className='wc-image' src={whychooseimage} alt="why-choose-us"></IonImg>
                            :
                            <IonImg className='wc-image' src={whychooseimage01} alt="why-choose-us"></IonImg>
                        }
                    </IonCol>
                    <IonCol sizeLg='6' sizeXs='12' sizeMd='6' className='align-self-center ion-padding'>
                        <IonRow className='wc_content-padding'>
                            <IonCol sizeLg='1' sizeXs='1.5' sizeMd='1.5'>
                                <IonImg className='wc-righticon' src={righticon} alt="why-choose-us"></IonImg>
                            </IonCol>
                            <IonCol sizeLg='11' sizeXs='10.5' className='text-align-justify'>
                                <IonText className='wc-content-1'>{dataLocalization.Best_in_market_price}</IonText><br />
                                <IonText className='wc-content-2'>{dataLocalization.Dofy_ensures}</IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow className='wc_content-padding'>
                            <IonCol sizeLg='1' sizeXs='1.5'>
                                <IonImg className='wc-righticon' src={righticon} alt="why-choose-us-icon"></IonImg>
                            </IonCol>
                            <IonCol sizeLg='11' sizeXs='10.5' className='text-align-justify'>
                                <IonText className='wc-content-1'>{dataLocalization.Every_transaction}</IonText><br />
                                <IonText className='wc-content-2'>{dataLocalization.Our_platform}</IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow className='wc_content-padding'>
                            <IonCol sizeLg='1' sizeXs='1.5'>
                                <IonImg className='wc-righticon' src={righticon} alt="why-choose-us-icon"></IonImg>
                            </IonCol>
                            <IonCol sizeLg='11' sizeXs='10.5' className='text-align-justify'>
                                <IonText className='wc-content-1'>{dataLocalization.Hassle_free}</IonText><br />
                                <IonText className='wc-content-2'>{dataLocalization.Embrace_the_ultimate}</IonText>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonGrid>
    )
}

export default WhyChooseUs