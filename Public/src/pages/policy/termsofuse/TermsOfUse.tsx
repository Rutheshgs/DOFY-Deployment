import { IonGrid, IonRow, IonCol, IonText, IonContent, IonList, IonPage, IonItem, IonLabel, } from '@ionic/react';

import LegalTerms from '../../../components/legalterms/LegalTerms';
import Footer from '../../../components/footer/Footer';

import "./TermsOfUse.css";

import { Direction, IsMobile, getUserLanguage } from '../../../components/helper/Helper';

import Language from "./TermsOfUseLanguage.json";
import { useTypedSelector } from '../../../features/reduxhooks/ReduxHooks';

function TermsOfUse() {
  let isMobile = useTypedSelector(state => state.FindDevice.isMobile);
  let isTablet = useTypedSelector(state => state.FindDevice.isTablet);


  let dataLocalization = Language[getUserLanguage()];
  return (
    <IonPage>
      <IonContent>
        {/* <IonGrid className='p-0 tu-grid' dir={Direction()}>
          <IonRow className='tu-header-row'>
            <IonCol sizeLg='10' sizeXs='8' className='tu-padding'>
              <IonText className='tu-header-text'>{dataLocalization.Terms_of_Use}</IonText>
            </IonCol>
            <IonCol sizeLg='2' sizeXs='4'>
              <CustomImg src={policy} className='tu-img' />
            </IonCol>
          </IonRow>
          <IonRow className='tu-row'>
            <IonCol>
              <IonRow >
                <IonCol sizeLg='12' sizeXs='12'>
                  <LegalTerms />
                </IonCol>
                <IonCol sizeLg='9' sizeXs='12' className='tu-text'>
                  <IonRow>
                    <IonCol size='12'>
                      <IonItem lines='none' className='tu-text'>
                        <IonLabel>
                          {dataLocalization.Terms_of_Use}
                        </IonLabel>
                      </IonItem>
                      <IonItem lines='none' className='tu-text'>
                        <IonLabel>
                          {dataLocalization.This_is_a_legally}
                        </IonLabel>
                      </IonItem>
                      <IonList className='tu-list'>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.You_must_be}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.You_certify_that}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.All_initial_quotes}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.Should_you_be_given}</IonLabel>
                        </IonItem>
                        <IonItem lines='none' className='sub-points'>
                          <IonLabel>{dataLocalization.Agree_to_pay}</IonLabel>
                        </IonItem>
                        <IonItem lines='none' className='sub-points'>
                          <IonLabel>{dataLocalization.A_different_model}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.All_gadgets_sold}</IonLabel>
                        </IonItem>
                        <IonItem lines='none' className='sub-points'>
                          <IonLabel>{dataLocalization.self_attested_ID_proof}</IonLabel>
                        </IonItem>
                        <IonItem lines='none' className='sub-points'>
                          <IonLabel>{dataLocalization.self_attested_indemnity}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.Lawful_Sales_Only}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.It_is_also_your}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.You_understand}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.You_conduct}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.You_understand_that}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.We_reserve}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.Your_use_of_our}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.Terms_and_conditions}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.DOFY_reserves}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.You_may_not_use}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.We_reserve_the_right_to}</IonLabel>
                        </IonItem>
                      </IonList>
                    </IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid> */}
        <IonGrid dir={Direction()} style={{ background: '#fff' }}>
          <IonRow>
            <IonCol size='12' className='text-center mt-3'>
              <IonText className='tc_title-style'>{dataLocalization.Terms_and_Condition}</IonText>
            </IonCol>
            <IonCol size='12'>
              <LegalTerms />
            </IonCol>
            <IonCol size='12' className='tu-text tu-grid '>
              <IonRow>
                <IonCol size='12'>
                  <IonItem lines='none' className='tu-text'>
                    <IonLabel><b> {dataLocalization.Terms_of_Use}</b>

                    </IonLabel>
                  </IonItem>
                  <IonItem lines='none' className='tu-text'>
                    <IonLabel>
                      {dataLocalization.Please_take_a_moment}
                    </IonLabel>
                  </IonItem>
                  <IonList className='tu-list'>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Dofy_electronics}</b><br />{dataLocalization.Dofy_electronics_and_solution}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Eligibilty}</b><br/>{dataLocalization.Eligibility_you_must}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Ownership}</b><br/>{dataLocalization.Ownership_Certification}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Quotations}</b><br />{dataLocalization.Quotations_and_Offers}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Acceptance}</b><br />{dataLocalization.Acceptance_of_Quotes}</IonLabel>
                    </IonItem>
                    <ul>
                      <li> <IonItem lines='none' className='sub-points'>
                        <IonLabel>{dataLocalization.Required}<br />{dataLocalization.Required_Documents}</IonLabel>
                      </IonItem></li>
                      <li> <IonItem lines='none' className='sub-points'>
                        <IonLabel>{dataLocalization.Lawful}<br />{dataLocalization.Lawful_Sales}</IonLabel>
                      </IonItem></li>
                      <li><IonItem lines="none" className='sub-points'>
                        <IonLabel>{dataLocalization.Data}<br />{dataLocalization.Data_Erasure}</IonLabel>
                      </IonItem></li>
                      <li> <IonItem lines='none' className='sub-points'>
                        <IonLabel>{dataLocalization.Returns}<br />{dataLocalization.No_Returns}</IonLabel>
                      </IonItem></li>
                      <li><IonItem lines='none' className='sub-points'>
                        <IonLabel>{dataLocalization.Gifted}<br />{dataLocalization.Gifted_Products}</IonLabel>
                      </IonItem></li>
                    </ul>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Modification}</b><br />{dataLocalization.Modification_of_Agreement}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Agreement}</b><br />{dataLocalization.Agreement_Updates}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Effective} </b><br />{dataLocalization.Effective_Modifications}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Transaction}</b><br />{dataLocalization.Transaction_Cancellation}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Legal_and_Authorized}</b><br />{dataLocalization.Legal_and_Authorized_Use}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Service}</b><br />{dataLocalization.Service_Availability}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel>{dataLocalization.We_encourage_you_to_carefully}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className='tu-text'>
                      <IonLabel><b>{dataLocalization.Thank_you_for_choosing}</b></IonLabel>
                    </IonItem>
                    {/* <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.DOFY_reserves}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.You_may_not_use}</IonLabel>
                        </IonItem>
                        <IonItem lines="none" className='tu-text'>
                          <IonLabel>{dataLocalization.We_reserve_the_right_to}</IonLabel>
                        </IonItem> */}
                  </IonList>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
        {
          (!isMobile && !isTablet) &&
          <Footer />
        }
      </IonContent>
    </IonPage>
  )
}

export default TermsOfUse