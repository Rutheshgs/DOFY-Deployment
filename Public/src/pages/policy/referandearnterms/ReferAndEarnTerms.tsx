import { IonGrid, IonRow, IonCol, IonText, IonContent, IonList, IonPage, IonItem, } from '@ionic/react';

import "./ReferAndEarnTerms.css";

import policy from '../../../assets/images/policy.png';
import Footer from '../../../components/footer/Footer';
import LegalTerms from '../../../components/legalterms/LegalTerms';

import { CustomImg } from '../../../components/shared/CustomImage';

function ReferAndEarnTerms() {
  return (
    <IonPage>
      <IonContent>
        <IonGrid className='p-0 raet-grid'>
          <IonRow className='raet-header-row'>
            <IonCol sizeLg='10' sizeXs='8' className='raet-padding'>
              <IonText className='raet-header-text'>Refer & Earn Terms</IonText>
            </IonCol>
            <IonCol sizeLg='2' sizeXs='4'>
              <CustomImg src={policy} className='raet-img' alt='policy'/>
            </IonCol>
          </IonRow>
          <IonRow className='raet-row'>
            <IonCol>
              <IonRow>
                <IonCol></IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeLg='3' sizeXs='12' >
                  <LegalTerms />
                </IonCol>
                <IonCol sizeLg='9' sizeXs='12' className='raet-text' >
                  <IonText ><b>Refer & Earn Terms</b></IonText>
                  <IonList>
                    <IonItem>
                      <IonText>Your friend must not have registered with us before.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>The phone number which your friend will use to sign up shouldn’t have been used earlier for a Dofy transaction.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Dofy App should not be installed using App runtime for Chrome, emulators or simulators.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='rp-text'>It is only for the users based in India. The mobile number provided to receive OTP should be an Indian mobile number.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='rp-text'>If your friend uses someone else’s Promo Code, the person whose Promo Code is used will get the benefits even if you had referred him/her first.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Points earned from Refer & Earn will be credited to Dofy Wallet as “My Points”.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='rp-text'>Points have validity. Please check this information in the Dofy Wallet section. If unutilised, points will cease to exist & will not be renewed.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Points can neither be exchanged nor be transferred.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Only registered users can use My Points.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>The maximum referral bonus that can be earned by a referrer is capped and may differ for each referral offer.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>You cannot add funds directly to your Dofy wallet account. Only referral amount will get added to the wallet.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Dofy reserves all rights to change the amounts conferred under Refer and Earn program at any point in time.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='rp-text'>Dofy may suspend or terminate the Refer and Earn program or any user’s ability to participate in the program at any time for any reason at their discretion. Points earned as a result of fraudulent activities will be revoked and deemed invalid.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='rp-text'>Dofy reserves the right to amend these terms and conditions at any time without any prior notice. Modifications of these terms will be effective from the time they are updated in the Terms and Conditions section.</IonText>
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

export default ReferAndEarnTerms