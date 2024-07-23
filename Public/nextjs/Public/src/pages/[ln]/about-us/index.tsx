import Aboutimage from '@/assets/images/Aboutbg.png';
import "./About.css";
import { Direction, SSRDetection, capacitorDevice, getCookiesFromServer, getLocalStorage, getUserLanguage } from '@/components/helper/Helper';
import Language from "./AboutLanguage.json";
import { useEffect, useRef, useState } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css/navigation';
import { modelChanger } from '@/features/reducers/login/LoginModel.Reducer';
import { useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { GetServerSideProps } from 'next';
import Footer from "@/components/footer/Footer";
import ContactUsServices from '@/services/ContactUs.Services';
import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import { HelperConstant } from '@/components/helper/HelperConstant';

type AboutUsData = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    address: any,
    metaTags: ISEOModel
    personId: any,
}

const fetchData = async (context: any): Promise<AboutUsData> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };
    let personId = getCookiesFromServer(context.req).personId != undefined ? getCookiesFromServer(context.req).personId : 0;

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);
    let metaTagsRes = await SEOServices.GetSEOList(HelperConstant.metaPages.About, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsRes.status === 200 && metaTagsRes.data);

    return { address, direction, language, metaTags, personId }
}

function AboutUs({ direction, language, address, metaTags, personId }: AboutUsData) {

    let dispatch = useTypedDispatch();
    const { NEXT_PUBLIC_SSR } = process.env;
    let dataLocalization = Language[language];

    const [aboutData, setAboutData] = useState<AboutUsData>({
        address, direction, language, metaTags, personId
    });

    // let personId = getLocalStorage()?.PersonId;
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const loginHandler = () => {
        dispatch(modelChanger(true));
    }

    useEffect(() => {
        if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setAboutData({
                    address: res.address,
                    direction: res.direction,
                    language: res.language,
                    metaTags: res.metaTags,
                    personId: res.personId
                });
            });
        }
    }, []);

    SwiperCore.use([Navigation]);

    return (
        <ion-app data-aos="fade-left">
            <MetaTags metaTags={aboutData.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={language} />
            <ion-content>
                <ion-grid class='ab-grid as-padding-adjustment' dir={aboutData.direction}>
                    <ion-grid class='container'>
                        <ion-row>
                            <ion-col size-lg='6' size-xs='12' >
                                <ion-img class='ab_image' src={Aboutimage.src} alt="about-us"></ion-img>
                            </ion-col>
                            <ion-col size-lg='6' size-xs='12' class='text-align-justify'>
                                <ion-text class='ab_title'>
                                    {dataLocalization.About_Us}
                                </ion-text><br />
                                <ion-text class='ab_text'>
                                    {dataLocalization.Welcome_to_dofy}
                                </ion-text>
                                <br /><br />
                                <ion-text class='ab_text'>
                                    {dataLocalization.We_introduce_dofy}
                                </ion-text>
                                <br /><br />
                                <ion-text class='ab_text'>
                                    {dataLocalization.At_Dofy}
                                </ion-text>
                                <br /><br />
                                <ion-text class='ab_text'>
                                    {dataLocalization.Together_lets_give}
                                </ion-text>
                                <br /><br />
                                <ion-text class='ab_text'>
                                    {dataLocalization.Sell_your_smartphone}
                                </ion-text>
                                {!(personId > 0) ?
                                    <ion-row>
                                        <ion-col class='ab_submit'>
                                            <ion-button color='white' class='ab_btn' onClick={loginHandler}>
                                                {dataLocalization.Join_Us}
                                            </ion-button>
                                        </ion-col>
                                    </ion-row> : ""}
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-grid>
                {capacitorDevice() &&
                    (aboutData.address.Address) && <Footer address={aboutData.address} direction={aboutData.direction} language={aboutData.language} />
                }
            </ion-content>
        </ion-app>
    )
}

export const getServerSideProps: GetServerSideProps<AboutUsData> = async (context) => {
    // const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
    // let address = {};
    // let metaTags = {} as ISEOModel;
    // let personId = "";

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { address, direction, language, metaTags, personId } = await fetchData(context);
    return { props: { address, direction, language, metaTags, personId } }
    // }

    // return { props: { address, direction, language, metaTags, personId } }

}

export default AboutUs


