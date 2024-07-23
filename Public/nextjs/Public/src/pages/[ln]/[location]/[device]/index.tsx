import { useEffect, useRef, useState } from 'react';
import type { GetServerSideProps } from 'next';
// import "./SelectBrand.css";
import selectBrandStyle from "./SelectBrand.module.css";

import MasterServices from '@/services/Master.Services';
import { IBrandMasterModel } from '@/models/BrandMaster.Model';

import { useTypedSelector, useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { ActionType } from '@/features/actiontypes/Input.ActionTypes';
import { routerChange } from '@/features/reducers/selldevice/PageChange.Reducer';

import { Direction, IOSDevice, SSRDetection, androidDevice, capacitorDevice, findWindow, getUserLocationForParam } from '@/components/helper/Helper';
import { HelperConstant } from '@/components/helper/HelperConstant';
import { getUserLanguage } from '@/components/helper/Helper';
import Language from "./SelectBrandLanguage.json";
import { DeviceNameChange } from '@/features/reducers/devicename/DeviceName.Reducers';
import StepProgressBar from '@/components/stepprogressbar/StepProgressBar';
import { closeCircle } from 'ionicons/icons';
import { useRouter } from 'next/router';
import Footer from '@/components/footer/Footer';
import ContactUsServices from '@/services/ContactUs.Services';

import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import SEOContent from '@/components/seocontent/SEOContent';

type SelectBrandprops = {
    address: any,
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    selectBrand: any,
    metaTags: ISEOModel
}



const fetchData = async (context: any): Promise<SelectBrandprops> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let ProductTypeNamePath = context ? context.query.device : findWindow() && window.location.pathname.split('/').at(-1) as string;
    let PathFilter = ProductTypeNamePath.search("old");
    let ProductTypeName = ProductTypeNamePath.slice(PathFilter + "old-".length);

    let branddata = await MasterServices.GetBrandMasterByProductName(ProductTypeName?.replaceAll('-', "_"), HelperConstant.serviceTypeId.SELL, header.LanguageCode, header.CountryCode);
    let selectBrand = await (branddata.status === 200 && branddata.data);

    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.Device, header.LanguageCode, header.CountryCode);
    let metaTags: ISEOModel = await (metaTagsData.status === 200 && metaTagsData.data);

    let location: string = context.query.location;

    if (metaTags) {
        metaTags.Title = metaTags.Title?.replaceAll("<DeviceType>", selectBrand[0].ProductTypeName)?.replaceAll("<Location>", location);
        metaTags.Description = metaTags.Description?.replaceAll("<DeviceType>", selectBrand[0].ProductTypeName)?.replaceAll("<Location>", location);

        metaTags.SeoContent = metaTags.SeoContent?.replaceAll("<Devicetype>", selectBrand[0].ProductTypeName)?.replaceAll("<Location>", location)?.replaceAll("||",'<br/>');
        metaTags.SeocontentTitle = metaTags.SeocontentTitle?.replaceAll("<Devicetype>",selectBrand[0].ProductTypeName)?.replaceAll("<Location>", location);
    }
    return { address, direction, language, selectBrand, metaTags }
}

function SelectBrand({ address, direction, language, selectBrand, metaTags }: SelectBrandprops) {
    const dispatch = useTypedDispatch();
    let dataLocalization = Language[language];
    let router = useRouter();
    const { NEXT_PUBLIC_SSR } = process.env;

    const deviceNameFromRouter = (): string => {
        let pathIndex = window.location.pathname.search("old");
        return window.location.pathname.slice(pathIndex + "old-".length);
    }

    const [selectBrandData, setSelectBrandData] = useState<SelectBrandprops>({ address, direction, language, selectBrand, metaTags })

    let selector = useTypedSelector((state) => state.PageChangeReducer.selectedPage);
    let columnSize = selector.includes('questionnaire') ? 8 : 12;

    let deviceName = useTypedSelector(state => state.DeviceNameChange.DeviceName);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const contentRef = useRef<HTMLIonContentElement | null>(null);
    const [searchText, setSearchText] = useState<any>("");
    const [filteredData, setfilteredData] = useState<Array<IBrandMasterModel>>([]);

    const searchHandler = (data: Array<IBrandMasterModel>, searchText: string) => {
        let filteredData = data?.filter(x => x.DisplayInList === true);
        if (searchText === "") {
            return setfilteredData(filteredData);
        }
        var resultArray = Array<IBrandMasterModel>();
        filteredData.forEach((item) => {
            if (item.Name.toLowerCase().includes(searchText.toLowerCase())) {
                resultArray.push(item);
            }
        });
        setfilteredData(resultArray);
        return resultArray;
    }

    const brandSelectHandler = (brandId: number, brandName: string, ProductTypeEnumName: string) => {
        router.push(`/${getUserLanguage()}${getUserLocationForParam(selectBrandData.language)}/sell-your-old-${ProductTypeEnumName.toLowerCase()?.replaceAll("_", '-')}/${brandName.toLowerCase()?.replaceAll(' ', "-")}`);
        dispatch(routerChange(ProductTypeEnumName.toLowerCase()?.replaceAll("_", '-')));
        dispatch(DeviceNameChange({ payload: brandName, type: ActionType.BRAND_ID }));
        dispatch(DeviceNameChange({ payload: ProductTypeEnumName?.replaceAll("_", '-'), type: ActionType.PRODUCT_ID }));
    }

    const deviceNameHandler = (type: "brand") => {
        if (type === "brand") {
            router.push(`/${getUserLanguage()}${getUserLocationForParam(selectBrandData.language)}/sell-your-old-device`);
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
        }
    }

    const reloadSelectedData = (value: any) => {
        dispatch(DeviceNameChange({ payload: value[0].ProductTypeName, type: ActionType.PRODUCT_ID }));
    }

    useEffect(() => {
        if (!(router.query.device?.includes("sell-your-old-"))) {
            router.push('/404');
        }
        else if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setSelectBrandData({
                    address: res.address,
                    selectBrand: res.selectBrand,
                    direction: res.direction,
                    language: res.language,
                    metaTags: res.metaTags
                });
                reloadSelectedData(res.selectBrand);
                searchHandler(res.selectBrand, searchText);
            });
        }
        else {
            reloadSelectedData(selectBrand);
            searchHandler(selectBrand, searchText);
        }

    }, [searchText, selectBrand]);

    let PathFilter = (router?.query?.device as string).search("old");
    let ProductTypeName = (router?.query?.device as string).slice(PathFilter + "old-".length);

    return (
        <ion-app data-aos="fade-left">
            <MetaTags metaTags={selectBrandData.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={selectBrandData.language} />
            <ion-content scrollEvents={true} ref={contentRef}>
                <ion-grid class={`p-0 ${selectBrandStyle.sd_grid}`} dir={selectBrandData.direction}>
                    <ion-row class='sd-row bg-color-white'>
                        <ion-col size-md={columnSize.toString()} size-xs='12'>
                            {(!isMobile)
                                &&
                                <ion-row>
                                    <ion-col class={`ion-padding-top ${selectBrandStyle.custom_center}`} >
                                        <StepProgressBar language={selectBrandData.language} />
                                    </ion-col>
                                </ion-row>
                            }
                            <ion-row>
                                <ion-col class={`ion-padding-top ${selectBrandStyle.sd_margin_mob} ${selectBrandStyle.custom_center}`}>
                                    {deviceName &&
                                        <ion-chip class={selectBrandStyle.sd_devicesname}>
                                            <ion-label>{deviceName}</ion-label>
                                            <ion-icon onClick={() => deviceNameHandler("brand")} icon={closeCircle}></ion-icon>
                                        </ion-chip>
                                    }
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                    <ion-row class='sd-row bg-color-white'>
                        <ion-col size-lg='2' size-xl='2' class={selectBrandStyle.sd_moblie_device}></ion-col>
                        <ion-col size-md={columnSize.toString()} size-xs='12' size-lg='8' size-xl='8' size-sm='12'>
                            <ion-grid>
                                <ion-row>
                                    <ion-col size='12' class='ion-text-center'>
                                        <ion-text class={selectBrandStyle.sb_title_style}>{dataLocalization.Select_Your_Brands}</ion-text>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    {
                                        filteredData && filteredData.length > 0 ?
                                            filteredData.map((val: IBrandMasterModel, index) => {
                                                return <ion-col size-sm='4' size-xs='4' size-xl='3' size-lg='3' size-md='3' key={index}>
                                                    <ion-card class={`${selectBrandStyle.sb_card_design} cursor-pointer`} onClick={() => brandSelectHandler(val.Id, val.DisplayName, val.ProductTypeEnumName)}>
                                                        <ion-card-content>
                                                            <ion-img class={selectBrandStyle.sb_img} src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`} alt={`sell${val.Name}`} />
                                                        </ion-card-content>
                                                    </ion-card>
                                                </ion-col>

                                            })
                                            : null
                                    }

                                </ion-row>
                                <ion-row>
                                { metaTags.SeocontentTitle &&
                                    <SEOContent SeocontentTitle={metaTags.SeocontentTitle} SeoContent={metaTags.SeoContent} />
                                }
                            </ion-row>
                            </ion-grid>
                        </ion-col>
                        <ion-col size-lg='2' size-xl='2'></ion-col>
                    </ion-row>
                </ion-grid>
                {/* <HowItWork /> */}
                {capacitorDevice() &&
                    (selectBrandData.address.Address) &&
                    <Footer address={selectBrandData.address} direction={selectBrandData.direction} language={selectBrandData.language} />
                }
            </ion-content>
        </ion-app>
    )
}

export const getServerSideProps: GetServerSideProps<SelectBrandprops> = async (context) => {
    // const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
    // let selectBrand: never[] = [];
    // let address: never[] = [];
    // let metaTags = {} as ISEOModel;

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { address, direction, language, selectBrand, metaTags } = await fetchData(context);
    return { props: { address, direction, language, selectBrand, metaTags } }
    // }

    // return { props: { address, direction, language, selectBrand, metaTags } }
}

export default SelectBrand