import { IonGrid, IonCol, IonRow, IonText, IonContent, IonRouterLink, IonPage } from '@ionic/react';

import LegalTerms from '../../../components/legalterms/LegalTerms';
import policy from '../../../assets/images/policy.png'
import Footer from '../../../components/footer/Footer';

import "./TermsAndCondition.css";

import { CustomImg } from '../../../components/shared/CustomImage';

function TermsAndCondition() {
  return (
    <IonPage>
      <IonContent>
        <IonGrid className='tac-grid'>
          <IonRow className='tac-header-row'>
            <IonCol sizeLg='10' sizeXs='8' className='tac-padding'>
              <IonText className='tac-header-text'>Terms & Conditions</IonText>
            </IonCol>
            <IonCol sizeLg='2' sizeXs='4'>
              <CustomImg src={policy} className='tac-img' alt='policy'/>
            </IonCol>
          </IonRow>
          <IonRow className='tac-row'>
            <IonCol>
              <IonRow>
                <IonCol></IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeLg='12' sizeXs='12'>
                  <LegalTerms />
                </IonCol>
                <IonCol sizeLg='12' sizeXl='12' sizeXs='12' className='tac-text tac-header-padding'>
                  <IonText><b>Terms and Conditions for Dofy services</b><br /><br />
                    By using it, you are agreeing to these Terms &amp; Conditions (defined below). Please read them carefully. Invent SoftLabs (India) Pvt Ltd., formerly known as ReGlobe, doing business as “Dofy”.<br /><br />
                    “Dofy” owns and operates the website,&nbsp;<IonRouterLink href='#'>www.Dofy.in</IonRouterLink>. The mobile touch versions, App on Play store and Apple App store and/or any site(s) we have now or in the future that reference these Terms &amp; Conditions (collectively, “Dofy”), provides a marketplace and platform for consumers and organizations to sell or repair their used, old and other articles, and conduct varied transactions and activities, with third-party companies and other entities and persons (collectively, “Third Parties”). The Dofy marketplace, platform, and related functionality, whether provided through the Site or through other means, are collectively referred to as the services (the “Services”).<br /><br />
                    If you do not agree with any part of these Terms &amp; Conditions, you must not use the Site or Services. Your continued use of the Site or Services will constitute your acceptance of these Terms &amp; Conditions, as they may be modified by us from time to time, with or without notice to you. Please check this page regularly for updates to the Dofy Terms &amp; Conditions.<br /><br />
                    <b>1.Dofy is a marketplace venue</b><br /><br />
                    Dofy is a platform to allow users, subject to compliance with Dofy’s policies, to sell/repair certain goods.Dofy may not be directly involved in the transaction between user(s) and third party professional(s), ensuing no control by reasons whatsoever in any aspect of your transactions with Third Parties, and the Third Parties are solely responsible to you for all aspects of your transactions with them.<br /><br />
                    <b>2. Permitted Use and Compliance with Laws.</b><br /><br />
                    Dofy authorizes you to access, view and use the Site content and software (collectively, the “Invent SoftLabs (India) Pvt Ltd Property”) solely to the extent necessary for you to use the Services. You may not remove any copyright, trademark or other proprietary notices that have been placed on the Dofy Property. You may not engage in systematic retrieval of data or other content from the Dofy Property. Except as expressly permitted by these Terms & Conditions, any modification, reproduction, redistribution, republication, uploading, posting, transmitting, distributing or otherwise exploiting in any way the Dofy Property, or any portion of the Dofy Property, is strictly prohibited without the prior written permission of Invent SoftLabs (India) Pvt Ltd.<br /><br />
                    You agree that you will comply with all applicable laws, regulations and ordinances relating to the Site and Services, the Dofy Property or your use of them, and that in using the Site and Services you will not engage in any conduct that restricts or inhibits any other person from using or enjoying the Services.<br /><br />
                    <b>3. Copyright and trademarks.</b><br /><br />
                    Except as otherwise indicated, all materials in the Site, including, but not limited to text, software, photos, video, graphics, music, sound, the Dofy Logo, ScreenPro logo, ReGlobe Logo and other Dofy ,ScreenPro and ReGlobe trademarks and service marks and the entire contents of the Site are the property of Invent SoftLabs (India) Pvt Ltd and/or its affiliates or licensors, including the Third Parties, and are protected by international/Indian copyright and trademark laws, all rights reserved. Any violation of these restrictions may result in a copyright, trademark, or other intellectual property right infringement that may subject you to civil and/or criminal penalties.<br /><br />
                    Other marks on the site not owned by Dofy may be under license from the trademark owner thereof, in which case such license is for the exclusive benefit and use of Dofy unless otherwise stated, or may be the property of their respective owners. You may not use any of the trademark name, logos, trademarks or brands, or trademarks or brands of others on the Site without Invent SoftLabs (India) Pvt Ltd’s express permission.<br /><br />
                    <b>4.Dofy Services and Third Party Services and Sites</b><br /><br />
                    The information and materials provided in the Site and through the Services are intended for general reference only, and may not describe all of the terms, conditions, and exceptions applicable to Dofy’s Services. Dofy presents information from Third Parties through the Dofy Site and Services, including prices offered for your items, item descriptions, certain Third Party terms of service, and other information (“Third Party Information”).Dofy cannot control, and is not responsible for the accuracy of any Third Party Information.<br /><br />
                    You conduct your actual sales and other transactions directly with the Third Parties and, unless otherwise specifically and clearly indicated, not with Dofy. Dofy cannot control any aspect of your sales and transactions with Third Parties, and the Third Parties are solely responsible to you for all aspects of your sales and transactions with them.<br /><br />
                    At times, the Dofy Site may have links to websites hosted by the Third Parties and other entities (the “Additional Sites”), or such Additional Sites may have links to the Dofy Site. These links are offered as a convenience and for informational purposes only, not as referrals or endorsements by Dofy of the Additional Sites. The Additional Sites are maintained by their respective organizations, and those organizations are solely responsible for the content of their own websites.Dofy does not verify nor make any warranty or representation about the content, accuracy, opinions expressed, warranties, products or services, intellectual property compliance, or links of such Additional Sites. You should read the privacy policies and Terms & Conditions agreements of all Additional Sites<br /><br />
                    <b>5. Privacy and Passwords</b><br /><br />
                    Dofy values and protects the privacy of your information. Please review the Dofy privacy policy, as it contains important information relating to your use of the Site and Services. Some portions of the Site are protected and require a user identification code (“User ID”) and password for access. Unauthorized access or use of such portions of the Site is prohibited. You agree that you will notify Dofy immediately if you believe that a third party has obtained your User ID or password, or if you believe that any unauthorized access or use may occur or has occurred. For your protection, if Dofy believes that any unauthorized access may occur or has occurred, Dofy may terminate access without prior notice to you. You also agree that Dofy is permitted to act upon any instructions received such instructions as authorized by you.<br /><br />
                    <b>6. Membership.</b><br /><br />
                    a.Registration and Basic Membership Terms: Members are visitors to the site and or those using the Services that choose to register with Dofy (“Members”). Once registered, an account is created for each Member (“Account”). If you choose to register as a Member, you represent and warrant to us that: <br /><br />
                    (i) you are of legal age to form a binding contract.<br /><br />
                    (ii) you will provide us with accurate, current and complete registration and contact information, and keep your information updated.<br /><br />
                    (iii) your registration and your use of the Services are not prohibited by law. We reserve the right to suspend or terminate your membership, or your access to the Site and or Services, in the event that you breach any of the Terms & Conditions or other applicable Dofy policies.<br /><br />
                    b. Password and Account Security: In connection with your Account, you will create a password and a user id. You are responsible for keeping your password and secure, and you are responsible for all actions taken using your password.<br /><br />
                    c. Age: To create an Account or to otherwise use this Website, you must be at least eighteen (18) years old or the age of majority in your state or province of residence, whichever is greater.<br /><br />
                    <b>7. Inactive Accounts</b><br /><br />
                    a. Inactive Status: A Member’s Account may be set to inactive if there is no activity associated with that Account for 180 days.<br /><br />
                    <b>8. Warranty Exclusions and Limitations of Liability.</b><br /><br />
                    We warrant that the Services and Dofy Property will conform substantially to the descriptions set forth on the Site. In the event of any breach of this warranty, the Customer’s sole and exclusive remedy, and Dofy’s sole and exclusive liability, shall be (at Dofy’s option) to remedy the failure or to refund the monetary amount paid for the services by the Customer, if any. Except as set forth in the foregoing sentence, we make no representations or warranties of any kind regarding the Services or the Dofy Property. We expressly disclaim any and all warranties, whether express or implied, including: all warranties of merchantability, fitness for a particular purpose, title, non-infringement, and any and all warranties arising from course of dealing and usage of trade; that the services and Dofy  property will meet your requirements, will always be available, accessible, uninterrupted, timely, secure or operate without error, as to the results that may be obtained from the operation, use or other exploitation of the services or Dofy property, and as to the accuracy or reliability of any information obtained from the services or the Dofy property. No advice or information, whether oral or written, obtained not expressly stated herein.<br /><br />
                    Under no circumstances will you be entitled to recover from us any incidental, consequential, indirect, punitive or special damages (including damages for loss of business, loss of profits or loss of use), whether based on contract, tort (including negligence), or otherwise arising from or relating to the services or Dofy property, even if Dofy has been informed or should have known of the possibility of such damages. in any event,Dofy’s maximum aggregate liability for any and all damages arising from the services or the Dofy property shall be a refund of the amount paid by you to us, if any.<br /><br />
                    Some jurisdictions do not allow the limitation or exclusion of warranties or of liability, so some of the above limitations or exclusions may not apply to you.<br /><br />
                    <b>9.Indemnity.</b><br /><br />
                    Customer agrees to indemnify and hold Dofy, our affiliates, suppliers, licensors and partners, and the officers, directors, employees, agents and representatives of each of them harmless, including costs, liabilities and legal fees, from any claim or demand made by any third party due to or arising out of (i) your access to or use of Services, (ii) your violation of these Terms & Conditions, or (iii) the infringement by you, or any third party using your account, of any intellectual property or other right of any person or entity.Dofy reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us and you agree to cooperate with our defense of these claims. You agree not to settle any matter without the prior written consent of Dofy. We will use reasonable efforts to notify you of any such claim, action or proceeding upon becoming aware of it.<br /><br />
                    <b>10. Applicable Law, Jurisdiction, Compliance</b><br /><br />
                    You and Dofy agree that all matters arising from or relating to the use and operation of the Site and/or the Services will be governed by the substantive laws of Republic of India, without regard to its conflicts of laws principles. You agree that all claims you may have arising from or relating to the operation, use or other exploitation of the Site and/or the Services will be heard and resolved in the courts located in New Delhi. You consent to the personal jurisdiction of such courts over you, stipulate to the fairness and convenience of proceeding in such courts, and covenant not to assert any objection to proceeding in such courts.<br /><br />
                    <b>11. Miscellaneous Provisions</b><br /><br />
                    No delay or omission by us in exercising any of our rights occurring upon any noncompliance or default by you with respect to any of these Terms & Conditions will impair any such right or be construed to be a waiver thereof, and a waiver by us of any of the covenants, conditions or agreements to be performed by you will not be construed to be a waiver of any succeeding breach thereof or of any other covenant, condition or agreement hereof contained. As used in these Terms & Conditions, “including” means “including but not limited to.” If any provision of these Terms & Conditions is found by a court of competent jurisdiction to be invalid or unenforceable, then these Terms & Conditions will remain in full force and effect and will be reformed to be valid and enforceable while reflecting the intent of the parties to the greatest extent permitted by law. Except as otherwise expressly provided herein, these Terms & conditions set forth the entire agreement between you and Dofy regarding its subject matter, and supersedes all prior promises, agreements or representations, whether written or oral, regarding such subject matter. You agree that the electronic text of these Terms & Conditions constitutes writing and your assent to the terms and conditions hereof constitutes a “signing” for all purposes.<br /><br />
                    <b>12. Information Collection, Use, and Sharing</b><br /><br />
                    By submitting any Dofy contact form, you understand that you may be contacted by a Dofy representative or a representative from the partner you’ve chosen. You may be contacted via telephone, email, text, or prerecorded message regarding Dofy programs, offers, events, announcements, and offers from Dofy’s third party marketing partners. If you respond to any such offer, your information will be subject to that third party’s terms and conditions. By providing us your phone number, you grant Dofy permission for the use of text messages, prerecorded voice or and/or automatic telephone dialing systems to contact you and/or deliver Dofy related information, offers or announcements.<br /><br />
                    You also agree that Dofy may attempt to contact you via any telephone number you provide, even if it is a mobile telephone number which may result in charges to you. You can opt out from Dofy email and messaging services at any time by writing to &nbsp;
                    <IonRouterLink href='mailto:Invent@dofy.in'>
                      info@dofy.in.
                    </IonRouterLink><br /><br />
                    You understand that agreeing to run diagnostics on the Dofy app program will allow Dofy access to your device, solely in relation to conducting the assessment of the quality parameters of your device. In no matter will your private information and data on the device will be accessed for any other purpose and that such information shall not be downloaded by the Company or used in any other manner.</IonText><br /><br />
                  <IonText className='tac-h2'>Grievance officer</IonText><br /><br />
                  <IonText>In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:<br /><br />
                    Invent SoftLabs (India) Private Limited<br />
                    4/2, 2nd Floor,<br />
                    Balaji Avenue 2nd Street,<br />
                    Thirumalai Pillai Road,<br />
                    T Nagar, Chennai<br />
                    Tamil Nadu 600017<br /><br />
                    Contact us<br />
                    Email:
                    <IonRouterLink href='mailto:Invent@dofy.in'> Invent@dofy.in</IonRouterLink><br />
                    Time: Monday to Friday (10:00 AM – 6:30 PM)</IonText><br />
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

export default TermsAndCondition