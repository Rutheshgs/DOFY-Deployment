import { useEffect, useState } from 'react';

import "./SelectDevice.css";

import { pageChange, routerChange } from '@/features/reducers/selldevice/PageChange.Reducer';
import { InputParamChange } from '@/features/reducers/shared/InputParams.Reducers';
import { ActionType } from '@/features/actiontypes/Input.ActionTypes';
import { useTypedDispatch, useTypedSelector } from '@/features/reduxhooks/ReduxHooks';

import MasterServices from '@/services/Master.Services';
import { HelperConstant } from '@/components/helper/HelperConstant';
import { DeviceNameChange, DeviceNameChangeReset } from '@/features/reducers/devicename/DeviceName.Reducers';
import { Direction, IOSDevice, SSRDetection, androidDevice, capacitorDevice, getUserLanguage, getUserLocationForParam } from '@/components/helper/Helper';
import Language from "./SelectDeviceLanguage.json";
import { useRouter } from 'next/router';
import { IProductTypeModel } from '@/models/ProductType.Model';
import StepProgressBar from '@/components/stepprogressbar/StepProgressBar';
import { closeCircle } from 'ionicons/icons';
import { GetServerSideProps } from 'next';
import Footer from '@/components/footer/Footer';
import ContactUsServices from '@/services/ContactUs.Services';
import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';

type SelectDeviceData = {
    address: any,
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    productList: Array<any>,
    metaTags: ISEOModel
}
const fetchData = async (context: any): Promise<SelectDeviceData> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let productListRes = await MasterServices.GetAllProductType(HelperConstant.serviceTypeId.SELL, header.LanguageCode, header.CountryCode);
    let productList = await (productListRes.status === 200 && productListRes.data);

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.SellYourOldDevice, header.LanguageCode, header.CountryCode);
    let metaTags: ISEOModel = await (metaTagsData.status === 200 && metaTagsData.data);

    let location: string = context.query.location;

    if (metaTags) {
        metaTags.Title = metaTags?.Title?.replaceAll("<DeviceType>", "device")?.replaceAll("<Location>", location);
        metaTags.Description = metaTags.Description?.replaceAll("<DeviceType>", "device")?.replaceAll("<Location>", location);
    }
    return { address, direction, productList, language, metaTags }
}

function SelectDevice({ direction, language, productList, address, metaTags }: SelectDeviceData) {

    let dispatch = useTypedDispatch();
    let history = useRouter();

    let selector = useTypedSelector((state) => state.PageChangeReducer.selectedPage);

    let columnSize = selector.includes('questionnaire') ? 8 : 12;

    let deviceName = useTypedSelector(state => state.DeviceNameChange.DeviceName);
    let brandName = useTypedSelector(state => state.DeviceNameChange.BrandName);
    let BrandId = useTypedSelector(state => state.InputParamChangeReducer.BrandId);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    let dataLocalization = Language[language];
    const { NEXT_PUBLIC_SSR } = process.env;

    const [selectdevicedata, setSelectdeviceData] = useState<SelectDeviceData>({
        address, direction, productList, language, metaTags,
    });

    useEffect(() => {
        if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setSelectdeviceData({
                    address: res.address,
                    direction: res.direction,
                    productList: res.productList,
                    language: res.language,
                    metaTags: res.metaTags,
                });
            });
        }
    }, []);

    const deviceSelectHandler = (ProductId: number, deviceName: string) => {
        dispatch(InputParamChange({ payload: ProductId, type: ActionType.PRODUCT_ID }));

        dispatch(DeviceNameChange({ payload: deviceName?.replaceAll("_", " "), type: ActionType.PRODUCT_ID }));
        dispatch(routerChange(deviceName?.replaceAll("_", "-")));

        history.push(`/${getUserLanguage()}${getUserLocationForParam(selectdevicedata.language)}/sell-your-old-${deviceName?.replaceAll("_", "-").toLowerCase()}`);
    }

    const deviceNameHandler = (type: "brand" | "model") => {
        if (type === "brand") {
            dispatch(pageChange("selectdevice"));
            dispatch(InputParamChange({ payload: 0, type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
        }
        if (type === "model") {
            dispatch(pageChange("selectbrand"));
            dispatch(InputParamChange({ payload: BrandId, type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
        }
    }

    useEffect(() => {

        if (selector) {
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.VARIANT_ID }));
            dispatch(InputParamChange({ payload: 0, type: ActionType.PRODUCT_ID }));
        }
    }, []);

    return (
        <ion-app data-aos="fade-left">
            <MetaTags metaTags={selectdevicedata.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={selectdevicedata.language} />
            <ion-content >
                <ion-grid class='p-0 sd-grid' dir={selectdevicedata.direction}>
                    <ion-row class='sd-row bg-color-white'>
                        <ion-col size-md={columnSize.toString()} size-xs='12'>
                            {(!isMobile)
                                &&
                                <ion-row>
                                    <ion-col class='ion-padding-top custom-center' >
                                        <StepProgressBar language={selectdevicedata.language} />
                                    </ion-col>
                                </ion-row>
                            }
                            <ion-row>
                                <ion-col class='ion-padding-top sd_margin-mob custom-center'>
                                    {deviceName &&
                                        <ion-chip class='sd_devicesname'>
                                            <ion-label>{deviceName}</ion-label>
                                            <ion-icon onClick={() => deviceNameHandler("brand")} icon={closeCircle}></ion-icon>
                                        </ion-chip>
                                    }
                                    {brandName &&
                                        <ion-chip class='sd_devicesname'>
                                            <ion-label>{brandName}</ion-label>
                                            <ion-icon onClick={() => deviceNameHandler("model")} icon={closeCircle}></ion-icon>
                                        </ion-chip>
                                    }
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                    <ion-row class='sd-row bg-color-white'>
                        <ion-col size-lg='2' size-xl='2' class='sd_moblie-device'></ion-col>
                        <ion-col size-md={columnSize.toString()} size-xs='12' size-lg='8' size-xl='8' size-sm='12'>
                            <ion-row>
                                <ion-col size-lg='12' size-md='12' size-sm='12' size-xs='12' size-xl='12' class='ion-text-center header-padding'>
                                    <ion-text class='syd-header-1'>{dataLocalization.CHOOSE_DEVICE_TYPE}</ion-text>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-row class={`${selectdevicedata.language === "ae_ar" ? 'sd_mobile-content-center-india' : 'sd_mobile-content-center-uae'}`}>
                                    {selectdevicedata.productList.map((val: any, i) => {
                                        return <ion-col key={i} size-xl='3' size-lg='3' size-md='4' size-xs='6' class="ion-padding" >
                                            <ion-card class='syd-cards' onClick={() => deviceSelectHandler(val.Id, val.EnumName)}>
                                                <img className='syd_product-image' alt={`sell${val.DisplayName}`} src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`} /><br /><br />
                                                <ion-label class='syd-header-2'>{val.DisplayName}</ion-label>
                                            </ion-card>
                                        </ion-col>
                                    })}
                                </ion-row>
                            </ion-row>
                        </ion-col>
                        <ion-col size-lg='2' size-xl='2'></ion-col>
                    </ion-row>
                </ion-grid>
                {capacitorDevice() &&
                    (selectdevicedata.address.Address) &&
                    <Footer address={selectdevicedata.address} direction={selectdevicedata.direction} language={selectdevicedata.language} />
                }
            </ion-content>
        </ion-app>
    )
}
export const getServerSideProps: GetServerSideProps<SelectDeviceData> = async (context) => {
    // const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
    // let address = {} as any;
    // let metaTags = {} as ISEOModel;
    // let productList = [] as any;

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { address, direction, productList, language, metaTags } = await fetchData(context);
    return { props: { address, direction, productList, language, metaTags } }
    // }

    // return { props: { address, direction, productList, language, metaTags } }

}

export default SelectDevice