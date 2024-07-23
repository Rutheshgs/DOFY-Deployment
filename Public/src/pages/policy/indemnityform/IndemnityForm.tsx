import { IonGrid, IonRow, IonCol, IonText, IonContent, IonList, IonPage, IonItem } from '@ionic/react';

import "./IndemnityForm.css";

import LegalTerms from '../../../components/legalterms/LegalTerms';
import policy from '../../../assets/images/policy.png';
import Footer from '../../../components/footer/Footer';

import { CustomImg } from '../../../components/shared/CustomImage';

function IndemnityForm() {
  return (
    <IonPage>
      <IonContent>
        <IonGrid className='p-0 if-grid'>
          <IonRow className='if-header-row' >
            <IonCol sizeLg='10' sizeXs='8' className='if-padding'>
              <IonText className='if-header-text'>Indemnity Form</IonText>
            </IonCol>
            <IonCol sizeLg='2' sizeXs='4'>
              <CustomImg src={policy} className='if-img' alt='policy'/>
            </IonCol>
          </IonRow>
          <IonRow className='if-row'>
            <IonCol>
              <IonRow>
                <IonCol></IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeLg='3' sizeXs='12'>
                  <LegalTerms />
                </IonCol>
                <IonCol sizeLg='9' sizeXs='12' className='if-text'>
                  <IonText><b>INDEMNITY TERMS & CONDITIONS</b><br /><br />
                    <b>“Dofy” is a unit of Invent SoftLabs (India) Pvt. Ltd (“Dofy/Company”),</b> having its registered office at B-39, 1st Floor, Middle Circle, Connaught Place, New Delhi-110001 and is engaged in the business of selling/buying of used/pre-owned electronic gadgets including mobile devices, tablets, laptops, etc.</IonText><br />
                  <IonList >
                    <IonItem>
                      <IonText className='if-list-text'>agree and accept the quote provided by Dofy in exchange of my mobile device.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='if-list-text'>I agree and confirm that the personal details and ID Proof provided by me at the time of selling the mobile device to Dofy are true and correct in all aspects. I accept that my submission of personal information is governed by the Privacy Policy of Dofy.(please note that only the following would be considered as valid ID proof – Passport, Aadhar Card, other Government ID’s bearing Photo and Address of the person)</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='if-list-text'>I agree and confirm that I am the lawful owner of the mobile device and the said device is neither subjected to any third party interests/liability nor is a property of theft etc. I agree that I have the ability to transfer the possession of the mobile device being its sole & lawful owner. If any legal action shall arise regarding the ownership of the mobile device, Dofy shall not be liable for the same in any manner whatsoever.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='if-list-text'>I agree to defend, indemnify and hold harmless, Dofy, its employees, directors, officers, agents and their successors and assigns from and against any and all claims, liabilities, damages, losses, costs and expenses, including attorney’s fees, caused by or arising out of claims based upon my actions or inactions like (i) my access to or use of Services, (ii) my violation of these Terms & Conditions, or (iii) the infringement by me, or any third party using my account, including but not limited to any warranties, representations or undertakings or in relation to the non-fulfillment of any of its obligations under this agreement or arising out of the Customer’s infringement of any applicable laws, regulations, including but not limited to Intellectual Property Rights, payment of statutory dues and taxes, claim of libel, defamation, violation of rights of privacy or publicity, loss of service by other subscribers and infringement of intellectual property or other rights. I agree not to settle any manner without the prior written consent of Dofy. Dofy will use reasonable efforts to notify me of any such claim, action or proceeding upon becoming aware of it. I agree that this defense and indemnification obligation will survive termination, modification or expiration of these Terms and your use of the Service and the Platform.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='if-list-text'>Terms of Use shall be governed by and interpreted and construed in accordance with the laws of India. I agree that all claims will be heard and resolved in the courts located in New Delhi. I release Dofy from all and any losses, claims or damages with respect to the data enclosed or stored therein or on any media used in conjunction with the device.</IonText>
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

export default IndemnityForm