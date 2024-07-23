import { useEffect, useRef, useState } from 'react';
import "./SelectModel.css";
import { InputParamChange } from '@/features/reducers/shared/InputParams.Reducers';
import { ActionType } from '@/features/actiontypes/Input.ActionTypes';
import { useTypedDispatch, useTypedSelector } from '@/features/reduxhooks/ReduxHooks';
import { IModelTypeModel } from '@/models/ModelType.Model';
import MasterServices from '@/services/Master.Services';
import { HelperConstant } from '@/components/helper/HelperConstant';
import { Direction, IOSDevice, SSRDetection, androidDevice, capacitorDevice, findWindow, getCookiesFromServer, getLocalStorage, getUserLanguage, getUserLocationForParam, isIn } from '@/components/helper/Helper';
import Language from "./SelectModelLanguage.json";
import { DeviceNameChange } from '@/features/reducers/devicename/DeviceName.Reducers';
import StepProgressBar from '@/components/stepprogressbar/StepProgressBar';
import { closeCircle } from 'ionicons/icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import Footer from '@/components/footer/Footer';
import ContactUsServices from '@/services/ContactUs.Services';
import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import { pageChange } from '@/features/reducers/selldevice/PageChange.Reducer';

const IonSearchbar = dynamic(() => import('@ionic/react').then(mod => mod.IonSearchbar), { ssr: false });

type SelectModelData = {
  address: any,
  language: "in_en" | "ae_en" | "ae_ar",
  direction: string,
  selectModel: Array<any>,
  metaTags: ISEOModel
}

const fetchData = async (context: any): Promise<SelectModelData> => {
  let direction = context ? SSRDetection(context, "dir") : Direction();
  let language = context ? SSRDetection(context, "lan") : getUserLanguage();
  let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

  let ProductTypeNamePath = context ? context.query.device : findWindow() && window.location.pathname.split("/")[2];
  let PathFilter = ProductTypeNamePath.search("old");
  let ProductTypeName = ProductTypeNamePath.slice(PathFilter + "old-".length);

  let BrandName = context ? context.query.brandId : findWindow() && window.location.pathname.split("/").at(-1)

  let selectModalData = await MasterServices.GetSeriesModelByBrandMasterName(ProductTypeName.toLowerCase()?.replaceAll('-', "_"), BrandName.replaceAll('-', '_'), HelperConstant.serviceTypeId.SELL, header.LanguageCode, header.CountryCode);
  let selectModel = await (selectModalData.status === 200 && selectModalData.data);

  let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
  let address = await (addressRes.status === 200 && addressRes.data);

  let metaTagsRes = await SEOServices.GetSEOList(HelperConstant.metaPages.Brand, header.LanguageCode, header.CountryCode);
  let metaTags: ISEOModel = await (metaTagsRes.status === 200 && metaTagsRes.data);

  let location: string = context.query.location;

  if (metaTags) {
    metaTags.Title = metaTags.Title.replaceAll("<brand>", selectModel[0].BrandMasterName).replaceAll("<device>", selectModel[0].ProductTypeName).replaceAll("<location>", location);
    metaTags.Description = metaTags.Description.replaceAll("<brand>", selectModel[0].BrandMasterName).replaceAll("<device>", selectModel[0].ProductTypeName).replaceAll("<location>", location);

  }

  return { address, direction, language, metaTags, selectModel }
}

function SelectModel({ address, language, direction, selectModel, metaTags }: SelectModelData) {

  let dispatch = useTypedDispatch();
  let dataLocalization = Language[language];
  let history = useRouter();

  let selector = useTypedSelector((state) => state.PageChangeReducer.selectedPage);
  let columnSize = selector.includes('questionnaire') ? 8 : 12;

  let deviceName = useTypedSelector(state => state.DeviceNameChange.DeviceName);
  let brandName = useTypedSelector(state => state.DeviceNameChange.BrandName);
  let BrandId = useTypedSelector(state => state.InputParamChangeReducer.BrandId);
  let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const [searchText, setSearchText] = useState<any>("");
  const [filteredData, setfilteredData] = useState<Array<IModelTypeModel>>([]);
  const { NEXT_PUBLIC_SSR } = process.env;
  const [selectmodeldata, setSelectmodelData] = useState<SelectModelData>({
    address, direction, language, metaTags, selectModel
  });

  const searchHandler = (data: Array<IModelTypeModel>, searchText: string) => {
    let filteredData = data?.filter(x => x.DisplayInList === true);
    if (searchText === "") {
      return setfilteredData(filteredData);
    }
    var resultArray = Array<IModelTypeModel>();
    filteredData.forEach((item) => {
      if (item.Name.toLowerCase().includes(searchText.toLowerCase())) {
        resultArray.push(item);
      }
    });
    setfilteredData(resultArray);
    return resultArray;
  }

  const modelSelectHandler = (modelId: number, productName: string, brandName: string, displayName: string) => {
    dispatch(pageChange("selectvariant"));
    history.push(`/${getUserLanguage()}${getUserLocationForParam(selectmodeldata.language)}/sell-your-old-${productName.toLowerCase().replaceAll(' ', '-')}/${brandName.toLowerCase().replaceAll(' ', '-')}/${displayName.replaceAll('_', '-')?.toLowerCase()}`);
    dispatch(DeviceNameChange({ payload: displayName.replaceAll('_', " "), type: ActionType.MODEL_ID }));
  }

  const deviceNameHandler = (type: "brand" | "model") => {
    if (type === "brand") {
      history.push(`/${getUserLanguage()}${getUserLocationForParam(selectmodeldata.language)}/sell-your-old-device`);
      dispatch(InputParamChange({ payload: 0, type: ActionType.PRODUCT_ID }));
      dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
      dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
      dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
    }
    if (type === "model") {
      history.push(`/${getUserLanguage()}${getUserLocationForParam(selectmodeldata.language)}/sell-your-old-${deviceName.toLowerCase().replaceAll(' ', '-')}`);
      dispatch(InputParamChange({ payload: BrandId, type: ActionType.BRAND_ID }));
      dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
    }
  }

  const reloadSelectedData = (value: any) => {
    dispatch(DeviceNameChange({ payload: value[0].ProductTypeName, type: ActionType.PRODUCT_ID }));
    dispatch(DeviceNameChange({ payload: value[0].BrandMasterName, type: ActionType.BRAND_ID }));
  }

  useEffect(() => {
    if (!history.query.device?.includes('sell-your-old')) {
      history.push('/404');
    }
    else if (NEXT_PUBLIC_SSR == 'false') {
      fetchData("").then(res => {
        setSelectmodelData({
          address: res.address,
          direction: res.direction,
          language: res.language,
          metaTags: res.metaTags,
          selectModel: res.selectModel
        });
        reloadSelectedData(res.selectModel);
        searchHandler(res.selectModel, searchText);
      });
    }
    else {
      reloadSelectedData(selectModel);
      searchHandler(selectModel, searchText);
    }

  }, [searchText, selectModel]);

  useEffect(() => {
    setfilteredData(selectModel);
  }, []);

  return (
    <ion-app data-aos="fade-left">
      <MetaTags metaTags={selectmodeldata.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={selectmodeldata.language} />
      <ion-content scrollEvents={true} ref={contentRef}>
        <ion-grid class='p-0 sd-grid' dir={selectmodeldata.direction}>
          <ion-row class='sd-row bg-color-white'>
            <ion-col size-md={columnSize.toString()} size-xs='12'>
              {(!isMobile)
                &&
                <ion-row>
                  <ion-col class='ion-padding-top custom-center' >
                    <StepProgressBar language={selectmodeldata.language} />
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
              <ion-grid>
                <ion-row class='ion-text-center'>
                  <ion-col size-lg='12' size-xs='12' class='text-center'>
                    <ion-text class='sm_title-design'>{dataLocalization.Select_your_model}</ion-text>
                    {isIn() ? <ion-row class='justify-content-end'>
                      <ion-col size-lg='4' size-md='5' offset-md='0' offset-lg='0' size-xs='12' class='mt-3'>
                        <IonSearchbar placeholder={dataLocalization.Search_your_model} className='p-0 sm_search-bar' onIonChange={(e) => setSearchText(e.detail.value)} />
                      </ion-col>
                    </ion-row>
                      :
                      <ion-row class='justify-content-end'>
                        <ion-col size-lg='4' size-md='5' offset-md='0' offset-lg='0' size-xs='12' class='mt-3'>
                          <IonSearchbar placeholder={dataLocalization.Search_your_model} className='p-0 sm_search-bar' onIonChange={(e) => setSearchText(e.detail.value)} />
                        </ion-col>
                      </ion-row>
                    }
                  </ion-col>
                  {filteredData && filteredData.length > 0 ?
                    filteredData.map((val: IModelTypeModel, index) => {
                      return <ion-col size-sm='6' size-xs='6' size-xl='3' size-lg='3' size-md='3' key={index} >
                        <ion-card class='sm_card-design cursor-pointer' onClick={() => modelSelectHandler(val.Id, val.ProductTypeName, val.BrandMasterName, val.EnumName)}>
                          <ion-text class='sm_card_text'>{val.Name}</ion-text>
                        </ion-card>
                      </ion-col>
                    })
                    :
                    null
                  }
                </ion-row>
              </ion-grid>
            </ion-col>
            <ion-col size-lg='2' size-xl='2'></ion-col>
          </ion-row>
        </ion-grid>
        {/* <HowItWork /> */}
        {capacitorDevice() &&
          (selectmodeldata.address.Address) && <Footer address={selectmodeldata.address} direction={selectmodeldata.direction} language={selectmodeldata.language} />
        }
      </ion-content>
    </ion-app>

  )
}

export const getServerSideProps: GetServerSideProps<SelectModelData> = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'no-cache, max-age=0, must-revalidate, no-store'
    //  'public, s-maxage=10, stale-while-revalidate=59'
  )

  // const { NEXT_PUBLIC_SSR } = process.env;

  // let direction = "";
  // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
  // let address = {} as any;
  // let metaTags = {} as ISEOModel;
  // let selectModel = [] as any;

  // if (NEXT_PUBLIC_SSR == 'true') {
  const { address, direction, language, metaTags, selectModel } = await fetchData(context);
  return { props: { address, direction, language, metaTags, selectModel } }
  // }

  // return { props: { address, direction, language, metaTags, selectModel } }

}

export default SelectModel