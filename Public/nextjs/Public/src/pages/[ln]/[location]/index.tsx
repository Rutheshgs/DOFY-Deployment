import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import CarousalHeader from '@/components/carousalheader/CarousalHeader';
import Testimonial from '@/components/testimonial/Testimonial';
import OurVideos from '@/components/ourvideos/OurVideos';
import OurWorks from '@/components/ourworks/OurWorks';
import SelectYourDevice from '@/components/selectyourdevice/SelectYourDevice';
import WhyChooseUs from '@/components/whychooseus/WhyChooseUs';
import Footer from '@/components/footer/Footer';

import { useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { DeviceNameChangeReset } from '@/features/reducers/devicename/DeviceName.Reducers';

import { App } from '@capacitor/app';

import { Direction, IOSDevice, SSRDetection, androidDevice, capacitorDevice, findBrowser, getLocalStorage, getUserLanguage } from '@/components/helper/Helper';
import { HelperConstant } from '@/components/helper/HelperConstant';

import DashboardElementsServices from '@/services/DashboardElements.Services';
import ContactUsServices from '@/services/ContactUs.Services';
import CarousalBannerServices from '@/services/CarousalBannerServices';
import MasterServices from '@/services/Master.Services';
import { ICarousalBannerModel } from '@/models/CarousalBanner.Model';
import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import dynamic from 'next/dynamic';
import SEOContent from '@/components/seocontent/SEOContent';

const IonAlert = dynamic(() => import("@ionic/react").then(mod => mod.IonAlert), { ssr: false });

type HomeData = {
    productList: Array<any>,
    DashboardElement: Array<any>,
    DashboardElementHide: boolean,
    address: any,
    banners: Array<ICarousalBannerModel>,
    direction: string,
    language: any
    metaTags: ISEOModel
}

const fetchData = async (context: any): Promise<HomeData> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let bannersRes = await CarousalBannerServices.GetCarousalBanner(header.LanguageCode, header.CountryCode);
    let banners = await (bannersRes.status === 200 && bannersRes.data);

    let productListRes = await MasterServices.GetAllProductType(HelperConstant.serviceTypeId.SELL, header.LanguageCode, header.CountryCode);
    let productList = await (productListRes.status === 200 && productListRes.data);

    let DashboardElementRes = await DashboardElementsServices.GetAllDashboardElements(header.LanguageCode, header.CountryCode);
    let DashboardElement = await (DashboardElementRes.status === 200 && DashboardElementRes.data);
    let DashboardElementHide = DashboardElement.filter((x: any) => x.Title === "OurVideos").length == 0;

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let metaTagsRes = await SEOServices.GetSEOList(HelperConstant.metaPages.Home, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsRes.status === 200 && metaTagsRes.data);

    return { banners, productList, DashboardElement, DashboardElementHide, address, direction, language, metaTags }
}

function index({ banners, productList, DashboardElement, DashboardElementHide, address, direction, language, metaTags }: HomeData) {

    let dispatch = useTypedDispatch();
    const { NEXT_PUBLIC_SSR } = process.env;

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const [homeData, setHomeData] = useState<HomeData>({
        banners, productList, DashboardElement, DashboardElementHide, address, direction, language, metaTags
    });

    const backtoExit = () => {
        App.exitApp();
    }

    if (findBrowser()) {
        App.addListener("backButton", () => {
            if (window.location.pathname.includes("home")) {
                setIsAlertOpen(true);
            }
        });
    }

    useEffect(() => {
        dispatch(DeviceNameChangeReset());
    }, [dispatch]);

    useEffect(() => {
        if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setHomeData({
                    banners: res.banners,
                    productList: res.productList,
                    DashboardElement: res.DashboardElement,
                    DashboardElementHide: res.DashboardElementHide,
                    address: res.address,
                    direction: res.direction,
                    language: res.language,
                    metaTags: res.metaTags
                });
            });
        }
    }, []);

    return (
        <ion-app>
            <MetaTags metaTags={metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={language} />

            <ion-content>
                <CarousalHeader banners={homeData.banners} direction={homeData.direction} />
                {metaTags.SeocontentTitle &&
                    <SEOContent SeocontentTitle={metaTags.SeocontentTitle} SeoContent={metaTags.SeoContent} />
                }
                {homeData.productList.length > 0 &&
                    <SelectYourDevice productList={homeData.productList} direction={homeData.direction} language={homeData.language} />
                }
                {homeData.direction &&
                    <WhyChooseUs direction={homeData.direction} language={homeData.language} />
                }
                {homeData.DashboardElement.length > 0 &&
                    <Testimonial testimonialData={homeData.DashboardElement} direction={homeData.direction} language={homeData.language} />
                }
                {homeData.DashboardElement.length > 0 &&
                    !homeData.DashboardElementHide && <OurVideos ourVideos={homeData.DashboardElement} direction={homeData.direction} language={homeData.language} />
                }
                {homeData.language &&
                    <OurWorks direction={homeData.direction} language={homeData.language} />
                }
                {capacitorDevice() &&
                    (homeData.address.Address && homeData.language) &&
                    <Footer address={homeData.address} direction={homeData.direction} language={homeData.language} />
                }
                {findBrowser() &&
                    <IonAlert isOpen={isAlertOpen}
                        onDidDismiss={() => setIsAlertOpen(false)}
                        header={"Confirmation"}
                        subHeader={"Are you sure to want exit this app?"}
                        buttons={[{
                            text: "Yes",
                            handler: () => backtoExit()
                        }, {
                            text: "Cancel",
                            handler: () => setIsAlertOpen(false)
                        }]}
                    />
                }
            </ion-content>
        </ion-app>
    )
}

export const getServerSideProps: GetServerSideProps<HomeData> = async (context) => {
    // const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "";
    // let banners: never[] = [];
    // let productList: never[] = [];
    // let DashboardElement: never[] = []
    // let DashboardElementHide = true
    // let address: never[] = [];
    // let metaTags = {} as ISEOModel;

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { banners, productList, DashboardElement, DashboardElementHide, address, direction, language, metaTags } = await fetchData(context);
    return { props: { banners, productList, DashboardElement, DashboardElementHide, address, direction, language, metaTags } }
    // }

    // return { props: { banners, productList, DashboardElement, DashboardElementHide, address, direction, language, metaTags } }

}

export default index