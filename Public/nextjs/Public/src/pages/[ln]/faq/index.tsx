import "./FAQ.css";
import Language from "./FAQLanguage.json";
import { useEffect, useState } from 'react';
import { useTypedSelector } from '@/features/reduxhooks/ReduxHooks';
import ContactUsServices from '@/services/ContactUs.Services';
import { addCircle, closeCircle } from "ionicons/icons";
import { GetServerSideProps } from "next";
import Footer from "@/components/footer/Footer";
import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import { Direction, IOSDevice, SSRDetection, androidDevice, capacitorDevice, getUserLanguage } from "@/components/helper/Helper";
import { HelperConstant } from "@/components/helper/HelperConstant";

class FaqData {
    address: { Address: string, Email: string, Phone: string, PromotionLinks: { faceBook: string, instagram: string, linkedIn: string, tikTok: string, youTube: string, Twitter: string } } =
        {
            Address: "", Email: "", Phone: "",
            PromotionLinks: {
                faceBook: "",
                instagram: "",
                linkedIn: "",
                youTube: "",
                tikTok: "",
                Twitter: ""
            }
        };
    direction: string = "";
    language: "in_en" | "ae_en" | "ae_ar" = "in_en";
    metaTags: ISEOModel = {} as ISEOModel;
}

const fetchData = async (context: any): Promise<FaqData> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.Faq, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsData.status === 200 && metaTagsData.data);

    return { address, direction, language, metaTags }
}

function FAQ({ address, direction, language, metaTags }: FaqData) {
    let dataLocalization = Language[language];
    const { NEXT_PUBLIC_SSR } = process.env;
    const [faqdata, setFaqData] = useState<FaqData>({
        address, direction, language, metaTags,
    });

    useEffect(() => {
        if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setFaqData({
                    address: res.address,
                    direction: res.direction,
                    language: res.language,
                    metaTags: res.metaTags,
                });
            });
        }
    }, []);

    const [activeAccordion, setActiveAccordion] = useState(null);
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
    return (
        <ion-app data-aos="fade-left">
            <MetaTags metaTags={faqdata.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={faqdata.language} />
            <ion-content>
                <ion-grid class='p-0 Fq-grid' style={{ background: '#fff' }} dir={faqdata.direction}>
                    <ion-row class='justify-content-center' style={{ background: '#fff' }}>
                        <ion-col size-lg='12' size-xs='12' size-md='12' size-xl='12' size-sm='12' class='ion-text-center ion-padding ' >
                            <ion-text class='faq_title-style'>{dataLocalization.FAQ}</ion-text><br />
                            <ion-text class='faq_text-style'>{dataLocalization.Need_answers_Find_them_here}</ion-text>
                        </ion-col>
                        <ion-col size-lg="12" class='faq_padding ion-padding'>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(1)} class={activeAccordion === 1 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.How_to_sell_my_mobile_phone_in_DOFY}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 1 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 1 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label class='faq-answer'>{dataLocalization.We_made_Selling}</ion-label><br />
                                            <ion-label>{dataLocalization.Once_signed_up_logged_in}</ion-label><br />
                                            <ion-label>{dataLocalization.Select_your_device_and_conditions}</ion-label><br />
                                            <ion-label>{dataLocalization.You_will_get_the_value_of_the_phone}</ion-label><br />
                                            <ion-label>{dataLocalization.Once_you_get_the_value_schedule_the_pick_up}</ion-label><br />
                                            <ion-label>{dataLocalization.Enter_pickup_address_payment_mode_to_complete_the_process}</ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(2)} class={activeAccordion === 2 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.How_do_you_fix_the_price_for_my_device}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 2 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 2 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.The_device_will_be_fixed}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(3)} class={activeAccordion === 3 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.Is_there_any_charge_for_the_pick_up}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 3 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 3 && (
                                        <ion-card-content class='accordion-lable text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.No_there_is_no_fees_charged}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(4)} class={activeAccordion === 4 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.What_if_I_get_lesser_price_than_assured}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 4 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 4 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.Chances_are_very_less}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(5)} class={activeAccordion === 5 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.What_to_do_if_my_pick_up_delayed}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 5 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 5 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.We_assure_to_serve}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(6)} class={activeAccordion === 6 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.My_phone_is_broken_but_under_warranty}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 6 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 6 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.As_per_general_warranty_conditions_of_any_device}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(7)} class={activeAccordion === 7 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.Whether_original_Invoice_is_required}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 7 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 7 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.It_is_mandatory_if_you_want_to_claim_your_device_to_be_under_warranty}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(8)} class={activeAccordion === 8 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.What_if_I_have_lost_misplaced_my_invoice_but_my_device_is_still_under_warranty}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 8 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 8 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.It_is_mandatory_if_you_want_to_claim_your_device_to_be_under_warranty_In_this_case_your_device}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(9)} class={activeAccordion === 9 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.What_if_during_pick_up_the_condition_of_the_phone_doesn_match}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 9 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 9 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.Our_executive_during_pickup}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(10)} class={activeAccordion === 10 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.What_do_you_do_with_my_old_phone}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 10 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 10 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.Before_completing_the_pick_up_of_your_device}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(11)} class={activeAccordion === 11 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.How_much_time_do_you_take_to_arrange_the_pickup}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 11 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 11 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.In_most_of_the_cases_pickup_shall_be_done_within_next_24_48}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(12)} class={activeAccordion === 12 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.How_I_will_be_paid_instantly_or_after_pickup_person_takes_the_device_to_your_office}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 12 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 12 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.Payment_will_be_done_instantly_by_our_executive_after_the_required_check_up}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(13)} class={activeAccordion === 13 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.After_the_device_is_picked_up_is_completed}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 13 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 13 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.After_completing_the_order_and_amount_is_paid_it_is_the_responsibility_of_DOFY}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(14)} class={activeAccordion === 14 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.Whether_reschedule_of_the_pickup_of_my_phone_is_available}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 14 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 14 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.Yes_reschedule_of_the_pickup_is_available}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(15)} class={activeAccordion === 15 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.Can_I_change_mode_of_payment_during_the_pick_up}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 15 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 15 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.At_present_we_provide_only_account_transfer_UPI}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(16)} class={activeAccordion === 16 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.What_are_the_mobile_phones_gadgets_we_can_sell}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 16 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 16 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.We_take_almost_all_mobile_device_full_list_of_device_is_available_on_our_webite_app}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(17)} class={activeAccordion === 17 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.Do_you_purchase_anything_else_except_Mobiles}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 17 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 17 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.No_we_are_currently_dealing_with_the_mobile_only_Very_shortly_we_are_launching_the_service_for_other_gadgets}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(18)} class={activeAccordion === 18 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.What_happens_if_the_mobile_I_am_selling_isn_working_at_the_time_of_pickup}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 18 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 18 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.Our_executive_during_pickup_checks_your_phone}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(19)} class={activeAccordion === 19 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.Is_it_compulsory_to_give_my_mobile_charger_along_with_phone}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 19 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 19 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.It_is_not_compulsory_to_give_the_charger}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(20)} class={activeAccordion === 20 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.Will_you_take_mobiles_under_dead_condition_too}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 20 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 20 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.Yes_we_take_dead_mobiles_as_well_for_salvage_value}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(21)} class={activeAccordion === 21 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.Should_I_format_my_phone_before_pickup}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 21 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 21 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.No_as_Its_necessary_to_complete}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(22)} class={activeAccordion === 22 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.what_are_the_chances_of_tampering_of_phone_by_the_pickup_executive_while_checking}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 22 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 22 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.Your_phone_is_in_safe_hands}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(23)} class={activeAccordion === 23 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.Can_I_sell_a_device_bought_using_EMI}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 23 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 23 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {dataLocalization.You_are_free_to_sell_devices_purchased_on_EMI_only}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                            <ion-col size-lg='12'>
                                <div className="accordion-container">
                                    <ion-item lines='none' onClick={() => toggleAccordions(24)} class={activeAccordion === 24 ? 'accordion-open' : ''}>
                                        <ion-label class='accordion-lable'>
                                            {dataLocalization.How_to_reach_for_any_query_related_to_placed_order_and_order_placement}
                                        </ion-label>
                                        <ion-icon slot="end" icon={activeAccordion === 24 ? closeCircle : addCircle} />
                                    </ion-item>
                                    {activeAccordion === 24 && (
                                        <ion-card-content class='text-align-justify'>
                                            <ion-label>
                                                {replaceString(dataLocalization.You_can_reach_us_at, address.Phone)}
                                            </ion-label>
                                        </ion-card-content>
                                    )}
                                </div>
                            </ion-col>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                {capacitorDevice() && 
                    (faqdata.address.Address) && <Footer address={faqdata.address} direction={faqdata.direction} language={faqdata.language} />
                }
            </ion-content>
        </ion-app>
    )
}

export const getServerSideProps: GetServerSideProps<FaqData> = async (context) => {
    // const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
    // let address = {} as any;
    // let metaTags = {} as ISEOModel;

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { address, direction, language, metaTags } = await fetchData(context);
    return { props: { address, direction, language, metaTags } }
    // }

    // return { props: { address, direction, language, metaTags } }

}
export default FAQ