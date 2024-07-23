import { IonGrid, IonRow, IonCol, IonText, IonContent, IonList, IonPage, IonItem, IonRouterLink, IonLabel } from '@ionic/react';

import "./DataProtection.css";

import policy from '../../../assets/images/policy.png';
import Footer from '../../../components/footer/Footer';
import LegalTerms from '../../../components/legalterms/LegalTerms';

import { CustomImg } from '../../../components/shared/CustomImage';

function Dataprotection() {
  return (
    <IonPage>
      <IonContent>
        <IonGrid className='p-0 gc-grid'>
          <IonRow className='gc-header-row'>
            <IonCol sizeLg='10' sizeXs='8' className='gc-padding'>
              <IonText className='gc-header-text'>Data Protection</IonText>
            </IonCol>
            <IonCol sizeLg='2' sizeXs='4'>
              <CustomImg src={policy} className='gc-img' alt='policy'/>
            </IonCol>
          </IonRow>
          <IonRow className='gc-row'>
            <IonCol>
              <IonRow>
                <IonCol sizeLg='3' sizeXs='12'>
                  <LegalTerms />
                </IonCol>
                <IonCol sizeLg='9' sizeXs='12' className='gc-text gc-header-padding'>
                  <IonRow>
                    <IonCol size='12'>
                      <IonText>Following a clear mandate from our Partners and our Customers, Manak Waste Management Private Limited (Dofy), in 2019, constituted a dedicated cross-functional compliance team and defined the roadmap to GDPR compliance.<br /><br />
                        <b>What is GDPR?</b><br /><br />
                        The General Data Protection Regulation (GDPR), which came into effect from May 25, 2018, empowers European Union (EU) residents by placing them in control of their personal information and upholding strict protocols for organizations that collect and process this information.<br /><br />
                        <b>The GDPR lays down seven core principles. They are:</b>
                      </IonText><br />
                    </IonCol>
                  </IonRow>
                  <IonList>
                    <IonItem lines="none">
                      <IonLabel>1. Lawfulness, fairness, and transparency.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>2. Purpose limitation.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>3. Data minimization.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>4. Accuracy.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>5. Storage limitation.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>6. Integrity and confidentiality (security).</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>7. Accountability.</IonLabel>
                    </IonItem>
                  </IonList>
                  <br />
                  <IonText className="gc-text"><b>The Data We Collect</b><br /><br />
                    GDPR defines Data Controllers as an entity that determines the purposes for which and the means by which personal data is processed. Data Controllers decide ‘why’; and ‘how’; the personal data should be processed. The data processor processes personal data only on behalf of the Controller. Dofy acts a Data controller or Data processor depending on the origin of the transaction.<br /><br />
                    For the transactions that originate on Dofy platform (Website, App), Dofy is Data controller. Dofy is Data processor where it processes data for its partners who are Data controllers. The data controllers specify the kind of data required from the data subject, i.e. the customer. As the data processor, we process data based on the requirements stated by Data controller.<br /><br />
                    This data can be of three types:<br /><br />
                    A. Personal Information (PI): That can identify a person. For instance, email id, mobile number, ID card number, and photo, etc.<br /><br />
                    B. Non-Personal Information (non PI): Such as the first name, last name, and device details, etc.<br /><br />
                    C. Sensitive Personal Information (SPI): Such as biometrics, genetic data, sexual orientation, race, and ethnicity, etc. Explicit Consent from Data Subjects<br /><br />
                    To ensure that our Customers are aware of why all the information is being collected, we have enabled; explicit consent; which has to be obtained from customers before processing their information. Moreover, our privacy policy clearly states ‘what’, ‘why’; and ‘how’; customers personal data is processed.<br /><br />
                    <b>Data Subject Rights</b><br /><br />
                    Dofy has implemented processes to acknowledge and respect Data Subject Rights. A data subject can email us at “info@Dofy.in” and request to exercise Data Subject Rights. Since Dofy is both Data controller and Data Processor (processing data at the behest of Data Controllers), the verification authority to validate the Customers Data Subject Right request is decided basis the origin of transaction.<br /><br />
                    <b>Data Subject Rights consist of:</b></IonText><br />
                  <IonList>
                    <IonItem lines="none">
                      <IonLabel>1. The right to be informed.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>2. The right of access.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>3. The right to rectification.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>4. The right to erasure.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>5. The right to restrict processing.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>6. The right to data portability.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>7. The right to object.</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>8. Rights related to automated decision-making and profiling.</IonLabel>
                    </IonItem>
                  </IonList>
                  <IonText><b>Data Management</b><br /><br />
                    A. Data Storage and Security:  Dofy is hosted on AWS and has put in place industry standard practices for managing the data in transit and data at rest.<br /><br />
                    B. Data retention: Dofy maintains data from the transactions enabled on its own platform and the ones enabled on Widgets/Apps enabled for partners. The retention period is defined in accordance with the business and legal needs. We however understand and appreciate the needs to provide flexibility to Data controllers to define data retention period for their own customers. Such provisions are agreed and defined in the contract between the Partners (Data Controller) and Dofy (Data Processor).<br /><br />
                    The time-frames can be specified in the contract based on the partner’s specific requirements. The partner can choose to have the data deleted from our cloud-based servers as desired. After the termination or expiry of the contract, the partner can place a request to remove all data by writing to us at
                    &nbsp;<IonRouterLink href='mailto:Invent@dofy.in'><b>“info@Dofy.in”</b>.</IonRouterLink>&nbsp;
                    We validate the request and, if needed, seek confirmation from the partner before processing the request. Dofy Customers can also request for deletion of their credentials by writing to us at “info@Dofy.in”. After validating the request, the details are deleted within 15 days of receiving customer request.<br /><br />
                    C. Data Breach Management:  We continually monitor and upgrade our systems and processes to maintain the highest standards of data management and privacy practices. In an unlikely event of a data breach, we intend to notify our partner (Data Controllers) and Data subject (where Dofy is Data controller) immediately and no later than 24 hours after becoming aware of such a breach.<br /><br />
                    Our commitment to world-class standards, In order to meet the world class standards for Data Privacy and Data Security, Dofy has taken steps to be General Data Protection Regulation (GDPR) compliant. Dofy is also ISO 27001:2013 complaint. Dofy is committed to aligning itself with global best practices in data compliance and is dedicated to infosec and data privacy. To that end, the company has a dedicated team working on these requirements.</IonText><br />
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

export default Dataprotection