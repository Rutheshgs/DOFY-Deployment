import { IonGrid, IonRow, IonCol, IonText, IonContent, IonList, IonPage, IonItem, IonRouterLink } from '@ionic/react';

import "./WastePolicy.css";

import policy from '../../../assets/images/policy.png';
import LegalTerms from '../../../components/legalterms/LegalTerms';
import Footer from '../../../components/footer/Footer';

import { CustomImg } from '../../../components/shared/CustomImage';

function WastePolicy() {
  return (
    <IonPage>
      <IonContent>
        <IonGrid className='p-0 wsp-grid'>
          <IonRow className='wsp-header-row '>
            <IonCol sizeLg='10' sizeXs='8' className='wsp-padding'>
              <IonText className='wsp-header-text'>E-Waste Policy</IonText>
            </IonCol>
            <IonCol sizeLg='2' sizeXs='4'>
              <CustomImg src={policy} className='wsp-img' alt='policy'/>
            </IonCol>
          </IonRow>
          <IonRow className='wsp-row' >
            <IonCol>
              <IonRow>
                <IonCol ></IonCol>
              </IonRow>
              <IonRow  >
                <IonCol sizeLg='3' sizeXs='12'>
                  <LegalTerms />
                </IonCol>
                <IonCol sizeLg='9' sizeXs='12' className='wsp-text'>
                  <IonText><b>Recycle with joy at Invent SoftLabs (India) Private Limited.</b><br /><br />
                    Invent SoftLabs (India) Private Limited (Dofy) has joined a CPCB authorised Producer Responsibility Organisation (PRO) Karo Sambhav Private Limited (Authorisation No.: B-29016(6)/PRO/18/WM-III dated 29-08-2018) to fulfil its Extended Producer Responsibility (EPR) compliance. For more information on our PRO, please visit
                    &npsb;<IonRouterLink href="#"> www.Dofy.com</IonRouterLink>.<br /><br />
                    At Dofy, we are committed to responsible recycling of our end-of-life products and urge all our customers to join our cohesive e-waste movement.<br /><br />
                    <b>What is “E-Waste”? </b><br /><br />
                    As per the E-waste (Management) Rules, 2016, ‘E-waste’ means electrical and electronic equipment, whole or in part discarded as waste by the consumer or bulk consumer as well as rejects from manufacturing, refurbishment and repair processes.<br /><br />
                    Electronics such as mobile phones, TVs, laptops, printers, fax machines or even their parts, which have reached the end of their useful life are called “E-Waste”. If not recycled in an environmentally sound way, e-waste poses a range of environmental risks.<br /><br />
                    <b>Where and how can you learn more about your E-Waste?</b><br /><br />
                    For any queries related to e-waste management, please reach out to Karo Sambhav at<br /><br />
                    <IonRouterLink href='mailto:engage@karosambhav.com'> engage@karosambhav.com</IonRouterLink>. You can also call Karo Sambhav’s toll-free number at 1800 2121 434.<br /><br />
                    <b>Important Do’s and Don’ts</b></IonText>
                  <IonList>
                    <IonItem>
                      <IonText>As our valued customer, we encourage you to channelize your e-waste only through the collection channels set up by Karo Sambhav.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Do not dismantle any electronics/ electrical devices at home. Improper dismantling or recycling of e-waste is harmful for the environment.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Do not mix e-waste in your home dustbins with other municipal waste.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Do not sell the e-waste to any unauthorised agencies/scrap dealer/informal waste collector.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Keep the product in isolated area, after it becomes non-functional/un-repairable in order to prevent its accidental breakage.</IonText>
                    </IonItem>
                  </IonList>
                  <IonText><b>Bulk Consumer Programme</b><br /><br />
                    The objective of the Bulk Consumer Programme is to provide a responsible E-waste management solution to bulk consumers in India. The Programme serves the E-waste management needs of offices, government institutions, schools, universities, hospitals, hotels, retailers, banks or any other organizations.<br /><br />
                    If you are a bulk consumer, please reach out to our Karo Sambhav at engage@krosambhav.com for responsible management of your e-waste or call Karo Sambhav’s toll-free number 18002121434.<br /><br />
                    <b>Waste Collector Programme</b><br /><br />
                    The waste collector programme focuses on formalizing the waste pickers and aggregators. By being a part of the programme, waste pickers and waste aggregators become a collection channel of the PRO and bring transparency to their processes.<br /><br />
                    <b>Residential Welfare Associations (RWAs) Programme</b><br /><br />
                    The objective of the Residential Welfare Associations (RWAs) Programme is to establish collection channels and provide a responsible E-waste management solution to the individual consumers in urban areas of India. <br /><br />
                    The Programme serves the E-waste management needs of Residents of Apartment Complexes and Residential Welfare Associations, wherein collection drives are held, and consumers are educated on issues related to e-waste.<br /><br />
                    <b>Collection Network</b></IonText><br /><br />
                  <IonRow className='wsp-list'>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'><b>S.No.</b></IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'><b>State</b></IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'><b>City</b></IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'><b>Address</b></IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'><b>Collection Point Name</b></IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'><b>Contact Person Name</b></IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'><b>Contact Number</b></IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'><b>STATUS</b></IonCol>
                  </IonRow>
                  <IonRow className='wsp-list' >
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>1</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Uttar Pradesh</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Ghaziabad	</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Shipra Mall -9, Vaibhav Khand, Indirapuram, Ghaziabad, Uttar Pradesh – 201014</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Dofy</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Sanem</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>8448381659</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Active</IonCol>
                  </IonRow>
                  <IonRow className='wsp-list'>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>2</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Haryana </IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Faridabad</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Crown Interior-12/7, Delhi Mathura Road, Near Sarai Khwaja, Sector-35, Faridabad-121003</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Dofy</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>John</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>8448381657</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Active</IonCol>
                  </IonRow>
                  <IonRow className='wsp-list'>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>3</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Uttar Pradesh</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Ghaziabad	</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Mahagun Metro Mall-Ground floor, Near W store, Next to Escalator, Mahagun Metro Mall, Near Vaishali Metro station, Ghaziabad – 201010</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Dofy</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Cheychey</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>8448381658</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Active</IonCol>
                  </IonRow>
                  <IonRow className='wsp-list'>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>4</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Delhi</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>New Delhi</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>1st Floor, Near TATA Mia Showroom, Pacific Mall, Subhash Nagar, New Delhi 110027</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Dofy</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Ayhan</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>8448381660</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Active</IonCol>
                  </IonRow>
                  <IonRow className='wsp-list'>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>5</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Haryana</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Gurgaon</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Cyber Hub-Ground Floor, Building No.10, Tower A, Wooden Platform, Dlf Cyber City, Gurgaon – 122002</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Dofy</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Deran</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>8448381666</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Active</IonCol>
                  </IonRow>
                  <IonRow className='wsp-list'>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>6</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Uttar Pradesh</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Ghaziabad	</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>DLF Mall of India-Ground Floor, Race Track Atrium, Opp GAP store, Mall of India, Noida -201301</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Dofy</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Nihar</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>8448381678</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Active</IonCol>
                  </IonRow>
                  <IonRow className='wsp-list'>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>7</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Uttar Pradesh</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Ghaziabad	</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>Logix City Centre-Ist Floor, Near Biba store, Logix City Center, Sector-32, Noida 201301</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Dofy</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Ayla</IonCol>
                    <IonCol className='wsp-col' sizeLg='2' sizeXs='2'>8448381600</IonCol>
                    <IonCol className='wsp-col' sizeLg='1' sizeXs='1'>Active</IonCol>
                  </IonRow>
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

export default WastePolicy