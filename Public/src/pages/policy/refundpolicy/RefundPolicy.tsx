import { IonGrid, IonRow, IonCol, IonText, IonContent, IonList, IonRouterLink, IonPage, IonItem, } from '@ionic/react';

import "./RefundPolicy.css"

import policy from '../../../assets/images/policy.png'
import Footer from '../../../components/footer/Footer';
import LegalTerms from '../../../components/legalterms/LegalTerms';

import { CustomImg } from '../../../components/shared/CustomImage';

function RefundPolicy() {
  return (
    <IonPage>
      <IonContent>
        <IonGrid className='p-0 rp-grid'>
          <IonRow className='rp-header-row'>
            <IonCol sizeLg='10' sizeXs='8' className='rp-padding'>
              <IonText className='rp-header-text'>Refund Policy</IonText>
            </IonCol>
            <IonCol sizeLg='2' sizeXs='4'>
              <CustomImg src={policy} className='rp-img' alt='policy'/>
            </IonCol>
          </IonRow>
          <IonRow className='rp-row' >
            <IonCol>
              <IonRow>
                <IonCol></IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeLg='3' sizeXs='12' >
                  <LegalTerms />
                </IonCol>
                <IonCol sizeLg='9' sizeXs='12' className='rp-text'>
                  <IonText><b>Dofy Repair offers you a 6 month warranty along with a refund</b> <br /><br />
                    <b>Here is how you can claim your refund for the Screen replaced with us:</b></IonText><br />
                  <IonList>
                    <IonItem>
                      <IonText>We provide a 6 months warranty with a refund on every screen replacement under the following conditions –</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Screen/LCD that malfunction, or does not work as intended or designed.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='rp-text'>ANY display issues that may arise without any manual intervention and are related to the screen quality specifically dead pixels and touch issues.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='rp-text'>If the screen replaced by us causes any above-mentioned issues, you can claim a brand new screen with the continued warranty of 6 months! or get a refund of your screen within 7 days of service date by returning our screen back. All you need to do is:</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>
                        Share the video of the phone with the prevailing display issue @ &nbsp;
                        <IonRouterLink href='mailto:support@Dofy.in'>
                          support@Dofy.in.
                        </IonRouterLink>
                      </IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>
                        Send us your phone number/order number/IMEI Number. Just about any of it @ &nbsp;
                        <IonRouterLink href='mailto:support@Dofy.in'>
                          support@Dofy.in.
                        </IonRouterLink>
                      </IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Our Customer Service Associate will respond to you within 48 hours and schedule our technician visit to replace your screen!</IonText>
                    </IonItem>
                  </IonList>
                  <IonText> Warranty & Refund is limited to the parts and/or service(s) that were paid for. If only parts were purchased, warranty & refund is limited to the replacement of the parts. If parts and repair service were purchased, warranty extends to cover the labor cost of part replacement and any other repairs specifically resulting from the initial repair.<br /><br />
                    Please note: Slot charges are applicable only if an order is completed. Refund is applicable only on Service prices<br /><br />
                    *Refund is only applicable to screen & not any other spare parts replaced by us.</IonText><br />
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage >
  )
}

export default RefundPolicy