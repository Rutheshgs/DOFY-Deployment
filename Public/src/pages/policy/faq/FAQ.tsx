import { IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonText, isPlatform } from '@ionic/react';
import "./FAQ.css";
import Footer from '../../../components/footer/Footer';
import Language from "./FAQLanguage.json";
import { Direction, getUserLanguage } from '../../../components/helper/Helper';
import MetaTags from '../../../components/metatags/MetaTags';
import { closeCircle, addCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../../features/reduxhooks/ReduxHooks';
import ContactUsServices from '../../../services/ContactUs.Services';

function FAQ() {
    let dataLocalization = Language[getUserLanguage()];
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);
    let isTablet = useTypedSelector(state => state.FindDevice.isTablet);

    const [activeAccordion, setActiveAccordion] = useState(null);
    const [address, setAddress] = useState<{ Address: string, Email: string, Phone: string, PromotionLinks: { faceBook: string, instagram: string, linkedIn: string, tikTok: string, youTube: string, Twitter: string } }>({
        Address: "", Email: "", Phone: "",
        PromotionLinks: {
            faceBook: "",
            instagram: "",
            linkedIn: "",
            youTube: "",
            tikTok: "",
            Twitter: ""
        }
    });

    const toggleAccordions = (index: any) => {
        if (activeAccordion === index) {
            setActiveAccordion(null); // Close the accordion if it's already open
        } else {
            setActiveAccordion(index); // Open the clicked accordion
        }
    };

    const replaceString = (orginalString: string, replaceString: string) => {
        let data = orginalString.split(';');
        data[1] = replaceString;
        return data.toString().replaceAll(',', ' ');
    }

    const getAddress = () => {
        ContactUsServices.getAddress().then(res => {
            if (res.status == 200) {
                setAddress(res.data);
            }
        }).catch(e => { console.log(e) });
    }

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <IonPage data-aos="fade-left">
            <MetaTags pageName={'faq'} />
            <IonContent>
                <IonGrid className='p-0 Fq-grid' style={{ background: '#fff' }} dir={Direction()}>
                    <IonRow className='justify-content-center' style={{ background: '#fff' }}>
                        <IonCol sizeLg='12' sizeXs='12' sizeMd='12' sizeXl='12' sizeSm='12' className='text-center ion-padding' >
                            <IonText className='faq_title-style'>{dataLocalization.FAQ}</IonText><br />
                            <IonText className='faq_text-style'>{dataLocalization.Need_answers_Find_them_here}</IonText>
                        </IonCol>

                        <IonCol className='faq_padding ion-padding'>
                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(1)} className={activeAccordion === 1 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.How_to_sell_my_mobile_phone_in_DOFY}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 1 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 1 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel className='faq-answer'>{dataLocalization.We_made_Selling}</IonLabel><br />
                                            <IonLabel>{dataLocalization.Once_signed_up_logged_in}</IonLabel><br />
                                            <IonLabel>{dataLocalization.Select_your_device_and_conditions}</IonLabel><br />
                                            <IonLabel>{dataLocalization.You_will_get_the_value_of_the_phone}</IonLabel><br />
                                            <IonLabel>{dataLocalization.Once_you_get_the_value_schedule_the_pick_up}</IonLabel><br />
                                            <IonLabel>{dataLocalization.Enter_pickup_address_payment_mode_to_complete_the_process}</IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(2)} className={activeAccordion === 2 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.How_do_you_fix_the_price_for_my_device}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 2 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 2 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.The_device_will_be_fixed}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(3)} className={activeAccordion === 3 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.Is_there_any_charge_for_the_pick_up}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 3 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 3 && (
                                        <IonCardContent className='accordion-lable text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.No_there_is_no_fees_charged}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(4)} className={activeAccordion === 4 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.What_if_I_get_lesser_price_than_assured}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 4 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 4 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.Chances_are_very_less}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(5)} className={activeAccordion === 5 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.What_to_do_if_my_pick_up_delayed}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 5 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 5 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.We_assure_to_serve}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(6)} className={activeAccordion === 6 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.My_phone_is_broken_but_under_warranty}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 6 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 6 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.As_per_general_warranty_conditions_of_any_device}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(7)} className={activeAccordion === 7 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.Whether_original_Invoice_is_required}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 7 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 7 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.It_is_mandatory_if_you_want_to_claim_your_device_to_be_under_warranty}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(8)} className={activeAccordion === 8 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.What_if_I_have_lost_misplaced_my_invoice_but_my_device_is_still_under_warranty}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 8 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 8 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.It_is_mandatory_if_you_want_to_claim_your_device_to_be_under_warranty_In_this_case_your_device}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(9)} className={activeAccordion === 9 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.What_if_during_pick_up_the_condition_of_the_phone_doesn_match}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 9 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 9 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.Our_executive_during_pickup}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(10)} className={activeAccordion === 10 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.What_do_you_do_with_my_old_phone}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 10 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 10 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.Before_completing_the_pick_up_of_your_device}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(11)} className={activeAccordion === 11 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.How_much_time_do_you_take_to_arrange_the_pickup}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 11 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 11 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.In_most_of_the_cases_pickup_shall_be_done_within_next_24_48}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(12)} className={activeAccordion === 12 ? 'accordion-open' : ''}>
                                        <IonLabel className={activeAccordion ? 'labelblue' : ''}>
                                            {dataLocalization.How_I_will_be_paid_instantly_or_after_pickup_person_takes_the_device_to_your_office}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 12 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 12 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.Payment_will_be_done_instantly_by_our_executive_after_the_required_check_up}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(13)} className={activeAccordion === 13 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.After_the_device_is_picked_up_is_completed}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 13 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 13 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.After_completing_the_order_and_amount_is_paid_it_is_the_responsibility_of_DOFY}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(14)} className={activeAccordion === 14 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.Whether_reschedule_of_the_pickup_of_my_phone_is_available}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 14 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 14 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.Yes_reschedule_of_the_pickup_is_available}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(15)} className={activeAccordion === 15 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.Can_I_change_mode_of_payment_during_the_pick_up}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 15 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 15 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.At_present_we_provide_only_account_transfer_UPI}

                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(16)} className={activeAccordion === 16 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.What_are_the_mobile_phones_gadgets_we_can_sell}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 16 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 16 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.We_take_almost_all_mobile_device_full_list_of_device_is_available_on_our_webite_app}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(17)} className={activeAccordion === 17 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.Do_you_purchase_anything_else_except_Mobiles}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 17 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 17 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.No_we_are_currently_dealing_with_the_mobile_only_Very_shortly_we_are_launching_the_service_for_other_gadgets}

                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(18)} className={activeAccordion === 18 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.What_happens_if_the_mobile_I_am_selling_isn_working_at_the_time_of_pickup}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 18 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 18 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.Our_executive_during_pickup_checks_your_phone}

                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(19)} className={activeAccordion === 19 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.Is_it_compulsory_to_give_my_mobile_charger_along_with_phone}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 19 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 19 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.It_is_not_compulsory_to_give_the_charger}


                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(20)} className={activeAccordion === 20 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.Will_you_take_mobiles_under_dead_condition_too}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 20 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 20 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.Yes_we_take_dead_mobiles_as_well_for_salvage_value}


                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(21)} className={activeAccordion === 21 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.Should_I_format_my_phone_before_pickup}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 21 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 21 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.No_as_Its_necessary_to_complete}


                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(22)} className={activeAccordion === 22 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.what_are_the_chances_of_tampering_of_phone_by_the_pickup_executive_while_checking}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 22 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 22 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.Your_phone_is_in_safe_hands}


                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(23)} className={activeAccordion === 23 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.Can_I_sell_a_device_bought_using_EMI}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 23 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 23 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {dataLocalization.You_are_free_to_sell_devices_purchased_on_EMI_only}


                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>

                            <IonCol sizeLg='12'>
                                <div className="accordion-container">
                                    <IonItem lines='none' onClick={() => toggleAccordions(24)} className={activeAccordion === 24 ? 'accordion-open' : ''}>
                                        <IonLabel className='accordion-lable'>
                                            {dataLocalization.How_to_reach_for_any_query_related_to_placed_order_and_order_placement}
                                        </IonLabel>
                                        <IonIcon slot="end" icon={activeAccordion === 24 ? closeCircle : addCircle} />
                                    </IonItem>
                                    {activeAccordion === 24 && (
                                        <IonCardContent className='text-align-justify'>
                                            <IonLabel>
                                                {replaceString(dataLocalization.You_can_reach_us_at, address.Phone)}
                                            </IonLabel>
                                        </IonCardContent>
                                    )}
                                </div>
                            </IonCol>
                        </IonCol>

                    </IonRow>
                    {
                        (!isMobile && !isTablet) &&
                        <Footer />
                    }
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default FAQ