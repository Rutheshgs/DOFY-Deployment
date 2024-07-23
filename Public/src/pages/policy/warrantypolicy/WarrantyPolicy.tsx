import { IonGrid, IonRow, IonCol, IonText, IonList, IonContent, IonRouterLink, IonPage, IonLabel, IonItem } from '@ionic/react';

import LegalTerms from '../../../components/legalterms/LegalTerms';
import policy from '../../../assets/images/policy.png';
import Footer from '../../../components/footer/Footer';

import "./WarrantyPolicy.css";

import { CustomImg } from '../../../components/shared/CustomImage';

function WarrantyPolicy() {
  return (
    <IonPage>
      <IonContent>
        <IonGrid className='p-0 wp-grid'>
          <IonRow className='wp-header-row'>
            <IonCol sizeLg='10' sizeXs='8' className='wp-padding'>
              <IonText className='wp-header-text'>Warranty Policy</IonText>
            </IonCol>
            <IonCol sizeLg='2' sizeXs='4'>
              <CustomImg src={policy} className='wp-img' alt='policy'/>
            </IonCol>
          </IonRow>
          <IonRow className='wp-row'>
            <IonCol>
              <IonRow>
                <IonCol>
                </IonCol>
              </IonRow>
              <IonRow >
                <IonCol sizeLg='3' sizeXs='12'>
                  <LegalTerms />
                </IonCol>
                <IonCol sizeLg='9' sizeXs='12' className='wp-text'>
                  <IonText>Dofy Repair offers you a 6 month + 1 month breakage warranty on every mobile screen repaired/replaced by us from the date of invoice. We also provide 3 months warranty on all the other spare parts that we replace<br /><br />
                    <b>The 6 months + 1 month breakage warranty covers :</b></IonText><br />
                  <IonList>
                    <IonItem>
                      <IonText> Screen/LCD that malfunctions, or does not work as intended or designed.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Any display issues that may arise without any manual intervention and are related to the screen quality specifically touch issues then .</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>One time screen replacement in case of accidental damage, if claimed within 1 month from the date of invoice.</IonText>
                    </IonItem>
                  </IonList>
                  <IonText>If the screen replaced by us causes any above-mentioned issues, you can claim a brand new screen with the continued warranty of 6 months!<br /><br />
                    <b>Please note:</b></IonText><br />
                  <IonList>
                    <IonItem>
                      <IonText>The warranty is valid only for the specific device repaired and the original customer. It is not transferable across devices or if the device is sold or handed over to another individual.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Mobile phone must be switching on and functioning normally other than screen to process claim request.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>In case the old screen of your device is not handed over to the technician, the warranty is applicable only for 3 months.</IonText>
                    </IonItem>
                  </IonList>
                  <IonText><b>To claim your warranty, you need to:</b></IonText><br />
                  <IonList>
                    <IonItem>
                      <IonText>
                        Share the video of the phone with the prevailing display issue at &nbsp;
                        <IonRouterLink href='mailto:support@Dofy.in'>support@Dofy.in</IonRouterLink>&nbsp;
                      </IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>
                        Send us your phone number/order number/IMEI Number. Just about any of it at &nbsp;
                        <IonRouterLink href='mailto:support@Dofy.in'>support@Dofy.in</IonRouterLink> &nbsp;
                      </IonText>
                    </IonItem>
                  </IonList>
                  <IonText><b>How can I claim my warranty?</b><br /><br />
                    You can claim the warranty by writing to us at &nbsp;
                    <IonRouterLink href='mailto:support@Dofy.in'>support@Dofy.in</IonRouterLink>&nbsp;
                    with the service details and the invoice delivered to you at the time of repair. If you need any further assistance, please connect via Chat or write to us at &nbsp;
                    <IonRouterLink href='mailto:support@Dofy.in'>support@Dofy.in</IonRouterLink> <br /> <br />
                    <b>How much time will Dofy Repair take to resolve my query, if it is coming under warranty?</b><br /> <br />
                    Our team generally resolves an issue within 48 hours to 72 hours from the moment you send us a query. You will get acknowledgement over mail for your query and your issue will be sorted as soon as possible.<br /> <br />
                    Warranty is limited to the parts and/or service(s) that were paid for. If only parts were purchased, warranty is limited to the replacement of the parts. If parts and repair service were purchased, warranty extends to cover the labor cost of part replacement and any other repairs specifically resulting from the initial repair. <br /><br />
                    <b>The warranty is not applicable under the following scenarios :</b></IonText><br /><br />
                  <IonList>
                    <IonItem>
                      <IonText className='wp-text'>We do not cover any kind of accidental damage and our warranty stands null and void in all such related cases. Direct damage or damages caused as a consequence of accidents will not be covered under the 6 month warranty.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='wp-text'>Any display issues that may arise without any manual intervention and are related to the screen quality specifically visible lines and blank screen.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText className='wp-text'>Excessive Damage to the device wherein there is a possibility that internal components might have been affected due to excessive or critical damage to the device or screen. Such excessive visible damage might lead to internal components getting damaged and can cause screen or other system malfunctions. Any part replacement wherein such damage is reported at the time of order completion will not be covered under the warranty provided. Such malfunctions can even become visible after immediately opening of the device and reassembly as any component damage/malfunction would become visible after opening the device and reassembly, Dofy Repair or any of its representative will neither be responsible nor liable for such issues.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Subsequent mishandling which causes the frame to bend, twist, or crack will not be entertained.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Subsequent mishandling with the screen such as hard press that may initiate discoloring or lining on the display</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Subsequent accidental or purposeful drops.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Water damage.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Tampering with internal hardware.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Damage resulting from attempted customer self-repairs.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Software issues unrelated to the repair.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Jail-broken devices.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>New damages unrelated to the original repair.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Any loss of data occurring as a result of the repair – customers are advised to back up all data prior to the repair attempt.</IonText>
                    </IonItem>
                  </IonList>
                  <IonText><b>Our warranty also does not cover the outcome of a repair if certain pre-repair conditions exist, including:</b></IonText><br /><br />
                  <IonLabel>
                    <IonItem>
                      <IonText>Existence of known manufacturing and/or performance issues related to the device separate from repair, as noted prior to the repair.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Existence of damage to the device frame, as noted prior to the repair.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Water damage.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Jail-broken devices.</IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>Tampering with internal hardware: Under certain conditions, internal damage may make a repair impossible. Our specialist will be able to explain in detail upon diagnosing your specific device. If you have any doubts, we recommend that you do not attempt to repair the device on your own, as any damage may affect the reparability of your device.</IonText>
                    </IonItem>
                  </IonLabel><br />
                  <IonText><b>Note:</b> Refund is not applicable to the spare part as on screen. Please refer to your order email for more information.</IonText><br />
                </IonCol >
              </IonRow >
            </IonCol>
          </IonRow>
        </IonGrid >
        <Footer />
      </IonContent >
    </IonPage>
  )
}

export default WarrantyPolicy