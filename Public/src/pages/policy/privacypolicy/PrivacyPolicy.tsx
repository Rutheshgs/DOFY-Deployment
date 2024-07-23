import { IonGrid, IonRow, IonCol, IonText, IonContent, IonPage, IonItem, IonLabel } from '@ionic/react';
import "./PrivacyPolicy.css"
import Footer from '../../../components/footer/Footer';
import LegalTerms from '../../../components/legalterms/LegalTerms';
import { Direction, getUserLanguage, isRTL } from '../../../components/helper/Helper';
import Language from "./PrivacyPolicyLanguage.json";
import { useTypedSelector } from '../../../features/reduxhooks/ReduxHooks';


function PrivacyPolicy() {
    let dataLocalization = Language[getUserLanguage()];
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);
    let isTablet = useTypedSelector(state => state.FindDevice.isTablet);

    return (
        <IonPage>
            <IonContent>
                {/* <IonGrid className='p-0 pp-grid' dir={Direction()}>
                    <IonRow className='pp-header-row'>
                        <IonCol sizeLg='10' sizeXs='8' className='pp-padding'>
                            <IonText className='pp-header-text'>{dataLocalization.Privacy_Policy}</IonText>
                        </IonCol>
                        <IonCol sizeLg='2' sizeXs='4'>
                            <CustomImg src={policy} className='pp-img' />
                        </IonCol>
                    </IonRow>
                    <IonRow className='pp-row'>
                        <IonCol>
                            <IonRow >
                                <IonCol sizeLg='3' sizeXs='12'>
                                    <LegalTerms />
                                </IonCol>
                                <IonCol sizeLg='9' sizeXs='12' className='pp-text'>
                                    <IonRow>
                                        <IonCol size='12'>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel >
                                                    {dataLocalization.Your_privacy_is_our_priority}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel>
                                                    {dataLocalization.DOFY_collects_some_basic}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel>
                                                    {dataLocalization.When_you_provide_us}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel>
                                                    {dataLocalization.Any_information_relating}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel>
                                                    {dataLocalization.DOFY_assures_protection}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel>
                                                    {dataLocalization.Other_sources_and_situations}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel>
                                                    {dataLocalization.We_have_your_consent}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel>
                                                    {dataLocalization.DOFY_is_dedicated}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel>
                                                    {dataLocalization.We_do_not_share}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel>
                                                    {dataLocalization.We_use_security}
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem lines="none" className='pp-text'>
                                                <IonLabel>
                                                    {dataLocalization.Please_write_to_us} <a href="mailto:info@dofy.in">customercare@dofy.in</a>
                                                </IonLabel>
                                            </IonItem>
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
                            <IonText className='pp_title-style'>{dataLocalization.Privacy_Policy}</IonText>
                        </IonCol>
                        <IonCol size='12'>
                            <LegalTerms />
                        </IonCol>
                        <IonCol size='12' className='tu-text tu-grid'>
                            <IonRow>
                                <IonCol size='12'>
                                    {/* <IonItem lines="none" className='pp-text'>
                                        <IonLabel >
                                            {dataLocalization.Your_privacy_is_our_priority}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.DOFY_collects_some_basic}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.When_you_provide_us}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.Any_information_relating}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.DOFY_assures_protection}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.Other_sources_and_situations}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.We_have_your_consent}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.DOFY_is_dedicated}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.We_do_not_share}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.We_use_security}
                                        </IonLabel>
                                    </IonItem> */}
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.We_value_your_privacy_and_understand}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.When_you_submit_forms_or_register_on_our_website}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.We_also_gather_information}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.DOFY_ensures_the_protection_and_security}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.We_process_personal_data_based_on_our_customers}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.We_use_your_personal_data}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.In_certain_instances}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.DOFY_is_committed_to_safeguarding}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.If_you_have_any_questions_or_concerns}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem lines="none" className='pp-text'>
                                        <IonLabel>
                                            {dataLocalization.Thank_you_for_trusting_DOFY}
                                        </IonLabel>
                                    </IonItem>

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
export default PrivacyPolicy