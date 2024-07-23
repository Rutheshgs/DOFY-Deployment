import "./PrivacyPolicy.css"
import LegalTerms from '@/components/legalterms/LegalTerms';
import Language from "./PrivacyPolicyLanguage.json";
import { GetServerSideProps } from "next";
import Footer from "@/components/footer/Footer";
import { Direction, IOSDevice, SSRDetection, androidDevice, capacitorDevice, getUserLanguage } from "@/components/helper/Helper";
import ContactUsServices from "@/services/ContactUs.Services";
import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import { HelperConstant } from "@/components/helper/HelperConstant";
import { useEffect, useState } from "react";


type PrivacyPolicyProps = {
    address: any,
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    metaTags: ISEOModel
}

const fetchData = async (context: any): Promise<PrivacyPolicyProps> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.PrivacyPolicy, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsData.status === 200 && metaTagsData.data);

    return { address, direction, language, metaTags }
}

function PrivacyPolicy({ address, language, direction, metaTags }: PrivacyPolicyProps) {
    let dataLocalization = Language[language];
    const { NEXT_PUBLIC_SSR } = process.env;
    const [privacypolicydata, setPrivacypolicyData] = useState<PrivacyPolicyProps>({
        address, direction, language, metaTags,
    });

    useEffect(() => {
        if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setPrivacypolicyData({
                    address: res.address,
                    direction: res.direction,
                    language: res.language,
                    metaTags: res.metaTags,
                });
            });
        }
    }, []);


    return (
        <ion-app>
            <MetaTags metaTags={privacypolicydata.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={privacypolicydata.language} />
            <ion-content>
                <ion-grid dir={privacypolicydata.direction} style={{ background: '#fff' }}>
                    <ion-row>
                        <ion-col size='12' class='ion-text-center mt-3'>
                            <ion-text class='pp_title-style'>{dataLocalization.Privacy_Policy}</ion-text>
                        </ion-col>
                        <ion-col size='12'>
                            <LegalTerms language={privacypolicydata.language} />
                        </ion-col>
                        <ion-col size='12' class='tu-text tu-grid'>
                            <ion-row>
                                <ion-col size='12'>
                                    <ion-item lines="none" class='pp-text'>
                                        <ion-label>
                                            {dataLocalization.We_value_your_privacy_and_understand}
                                        </ion-label>
                                    </ion-item>
                                    <ion-item lines="none" class='pp-text'>
                                        <ion-label>
                                            {dataLocalization.When_you_submit_forms_or_register_on_our_website}
                                        </ion-label>
                                    </ion-item>
                                    <ion-item lines="none" class='pp-text'>
                                        <ion-label>
                                            {dataLocalization.We_also_gather_information}
                                        </ion-label>
                                    </ion-item>
                                    <ion-item lines="none" class='pp-text'>
                                        <ion-label>
                                            {dataLocalization.DOFY_ensures_the_protection_and_security}
                                        </ion-label>
                                    </ion-item>
                                    <ion-item lines="none" class='pp-text'>
                                        <ion-label>
                                            {dataLocalization.We_process_personal_data_based_on_our_customers}
                                        </ion-label>
                                    </ion-item>
                                    <ion-item lines="none" class='pp-text'>
                                        <ion-label>
                                            {dataLocalization.We_use_your_personal_data}
                                        </ion-label>
                                    </ion-item>
                                    <ion-item lines="none" class='pp-text'>
                                        <ion-label>
                                            {dataLocalization.In_certain_instances}
                                        </ion-label>
                                    </ion-item>
                                    <ion-item lines="none" class='pp-text'>
                                        <ion-label>
                                            {dataLocalization.DOFY_is_committed_to_safeguarding}
                                        </ion-label>
                                    </ion-item>
                                    <ion-item lines="none" class='pp-text'>
                                        <ion-label>
                                            {dataLocalization.If_you_have_any_questions_or_concerns}
                                        </ion-label>
                                    </ion-item>
                                    <ion-item lines="none" class='pp-text'>
                                        <ion-label>
                                            {dataLocalization.Thank_you_for_trusting_DOFY}
                                        </ion-label>
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                {capacitorDevice() &&
                    (privacypolicydata.address.Address) &&
                    <Footer address={privacypolicydata.address} direction={privacypolicydata.direction} language={privacypolicydata.language} />
                }
            </ion-content>
        </ion-app>
    )
}
export const getServerSideProps: GetServerSideProps<PrivacyPolicyProps> = async (context) => {
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
export default PrivacyPolicy