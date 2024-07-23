import { IonGrid, IonRow, IonCol, IonText, IonContent, IonList, IonPage, IonItem, } from '@ionic/react';

import "./RefurbishedPhones.css";

import policy from '../../../assets/images/policy.png'
import Footer from '../../../components/footer/Footer';
import LegalTerms from '../../../components/legalterms/LegalTerms';

import { CustomImg } from '../../../components/shared/CustomImage';

function RefurbishedPhones() {
  return (
    <IonPage>
      <IonContent>
        <IonGrid className='p-0 rps-grid'>
          <IonRow className='rps-header-row'>
            <IonCol sizeLg='10' sizeXs='8' className='rps-padding'>
              <IonText className='rps-header-text'>Refurbished Phones</IonText>
            </IonCol>
            <IonCol sizeLg='2' sizeXs='4'>
              <CustomImg src={policy} className='rps-img' alt='policy'/>
            </IonCol>
          </IonRow>
          <IonRow className='cp-row'>
            <IonCol>
              <IonRow>
                <IonCol></IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeLg='3' sizeXs='12'>
                  <LegalTerms />
                </IonCol>
                <IonCol sizeLg='9' sizeXs='12' className='rps-text'>
                  <IonText><b>What is a Refurbished Phone?</b></IonText><br />
                  <IonList>
                    <IonItem>
                      <IonText>The term ‘refurbished phone’ generally refers to a pre-owned handset that has been diagnosed corrected (if required) and repackaged so that it becomes fit for reuse.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Not all phones described as refurbished had been at one stage faulty, though. Some networks and retailers classify ‘refurbished phones’ as handsets that were returned by customers who changed their mind within the 30-day cooling-off period after they purchased the new mobile phone. These are devices, which hadn’t been returned because they were faulty. They undergo necessary tests before they can be re-sold.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Before they are sold, all refurbished phones are thoroughly checked and tested to ensure that they’re in full working order and/or upgraded to new or like-new condition phones.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Tests carried out by Dofy typically include charging and battery condition, buttons, camera(s), audio quality, screen responsiveness and WiFi/Data connection.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>In keeping with the Data Protection Act, Dofy securely wipes any data on every phone. So to all intents and purposes, the customer always starts afresh with a like-new condition phone.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>In addition, we update the refurbished handsets to the latest version of the operating system that powers it.</IonText>
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  )
}

export default RefurbishedPhones