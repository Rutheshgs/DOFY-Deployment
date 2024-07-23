import { useEffect, useRef, useState } from 'react';

import "swiper/css/effect-cards";
import "swiper/css/navigation";
import 'swiper/css/pagination';

import "./SellYourDevice.css";

import { useTypedDispatch, useTypedSelector } from '@/features/reduxhooks/ReduxHooks';
import { ResetSelectedQuestions } from '@/features/reducers/questionnaire/Questionnaire.Reducers';
import Footer from '@/components/footer/Footer';
import { Direction, IOSDevice, SSRDetection, androidDevice, capacitorDevice, findWindow, getUserLanguage } from '@/components/helper/Helper';
import SelectVariant from '@/components/selectvariant/SelectVariant';
import { IVariantTypeModel } from '@/models/VariantType.Model';
import { GetServerSideProps } from 'next';
import MasterServices from '@/services/Master.Services';
import { HelperConstant } from '@/components/helper/HelperConstant';
import ContactUsServices from '@/services/ContactUs.Services';
import SEOServices from '@/services/SEO.Services';
import { ISEOModel } from '@/models/SEO.Model';
import MetaTags from '@/components/metatags/MetaTags';

// import Questionnaire from '@/components/questionaire/Questionnaire';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Questionnaire = dynamic(() => import('@/components/questionaire/Questionnaire'), { ssr: false });

type SelectVariantProps = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    selectVariant: Array<IVariantTypeModel>;
    address: any,
    metaTags: ISEOModel
}

const fetchData = async (context: any): Promise<SelectVariantProps> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let modelId: string = context ? context.query.modelId : findWindow() && window.location.pathname.split('/').at(-1) as string;

    let selectVariantData = await MasterServices.GetModelVariantBySeriesModelName(modelId?.replaceAll('-', '_'), HelperConstant.serviceTypeId.SELL, header.LanguageCode, header.CountryCode);
    let selectVariant = await (selectVariantData.status === 200 && selectVariantData.data);

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.Model, header.LanguageCode, header.CountryCode);
    let metaTags: ISEOModel = await (metaTagsData.status === 200 && metaTagsData.data);

    let location: string = context.query.location;

    if (metaTags) {
        metaTags.Title = metaTags.Title.replaceAll("<brand>", selectVariant[0].BrandMasterName).replaceAll("<model>", selectVariant[0].SeriesModelName).replaceAll("<location>", location);
        metaTags.Description = metaTags.Description.replaceAll("<brand>", selectVariant[0].BrandMasterName).replaceAll("<model>", selectVariant[0].SeriesModelName).replaceAll("<location>", location);

    }
    return { language, direction, selectVariant, address, metaTags }
}

export const getServerSideProps: GetServerSideProps<SelectVariantProps> = async (context) => {
    // const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
    // let selectVariant: never[] = [];
    // let locationlist: never[] = [];
    // let address: never[] = [];
    // let metaTags = {} as ISEOModel;

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { language, direction, selectVariant, address, metaTags } = await fetchData(context);
    return { props: { language, direction, selectVariant, address, metaTags } }
    // }

    // return { props: { language, direction, selectVariant, locationlist, address, metaTags } }

};

function SellDevice({ language, direction, selectVariant, address, metaTags }: SelectVariantProps) {
    let dispatch = useTypedDispatch();
    const { NEXT_PUBLIC_SSR } = process.env;
    let router = useRouter();

    const [routPage] = useState({ selectDevice: "selectdevice", selectBrand: "selectbrand", selectSeries: "selectseries", selectModel: "selectmodel", selectVariant: "selectvariant", questionnaire: "questionnaire" });

    const [variantData, setVariantData] = useState<SelectVariantProps>({ language, direction, selectVariant, address, metaTags })

    let selector = useTypedSelector((state) => state.PageChangeReducer.selectedPage);
    let selectorId = useTypedSelector((state) => state.InputParamChangeReducer);

    const contentRef = useRef<HTMLIonContentElement | null>(null);

    const scrollToTop = (selectorId: any) => {
        contentRef.current && contentRef?.current?.scrollToTop();
    };

    useEffect(() => {

        const resetQuestions = () => {
            if (selector !== routPage.questionnaire) {
                dispatch(ResetSelectedQuestions());
            }
        }

        if (!(router.query.device?.includes("sell-your-old-"))) {
            router.push('/404');
        }
        else if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setVariantData({
                    address: res.address,
                    direction: res.direction,
                    selectVariant: res.selectVariant,
                    language: res.language,
                    metaTags: res.metaTags
                });
            });
        }

        resetQuestions();
        // scrollToTop(selectorId);
    }, [routPage, selector, dispatch, selectorId]);

    return (
        <ion-app data-aos="fade-left">
            <MetaTags metaTags={variantData.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={variantData.language} />
            <ion-content scrollEvents={true}>
                <ion-grid class='p-0 sd-grid' dir={variantData.direction}>
                    <ion-row class='sd-row bg-color-white'>
                        <ion-col size='2' size-xs='0'></ion-col>
                        <ion-col size='8' size-xs='12'>
                            {((selector === routPage.selectVariant || selector === routPage.selectDevice) && variantData.selectVariant.length > 0) &&
                                <SelectVariant direction={variantData.direction} language={variantData.language} selectVariant={variantData.selectVariant} />
                            }
                            {selector === routPage.questionnaire &&
                                <Questionnaire />
                            }
                        </ion-col>
                        <ion-col size='2' size-xs='0'></ion-col>
                    </ion-row>
                </ion-grid>
                {capacitorDevice() &&
                    (variantData.address.Address) &&
                    <Footer address={variantData.address} direction={variantData.direction} language={variantData.language} />
                }
            </ion-content>
        </ion-app>
    )
}

export default SellDevice