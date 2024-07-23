import { useEffect, useRef, useState } from 'react';

import { IonCard, IonCardHeader, IonSearchbar, IonChip, IonCol, IonGrid, IonLabel, IonRow, IonText, IonPage, IonContent, isPlatform, IonIcon } from '@ionic/react';

import "./SelectModel.css";

import { pageChange } from '../../../features/reducers/selldevice/PageChange.Reducer';
import { InputParamChange } from '../../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../../features/actiontypes/Input.ActionTypes';
import { useTypedDispatch, useTypedSelector } from '../../../features/reduxhooks/ReduxHooks';

import { IModelTypeModel } from '../../../models/ModelType.Model';
import MasterServices from '../../../services/Master.Services';

import { Skeleton } from '../../../components/skeleton/Skeleton';
import { HelperConstant } from '../../../components/helper/HelperConstant';
import { Direction, getUserLanguage, getUserLocationForParam, isIn } from '../../../components/helper/Helper';
import Language from "./SelectModelLanguage.json";
import { useHistory, useParams } from 'react-router-dom';
import { DeviceNameChange } from '../../../features/reducers/devicename/DeviceName.Reducers';
import StepProgressBar from '../../../components/stepprogressbar/StepProgressBar';
import Footer from '../../../components/footer/Footer';
import { closeCircle } from 'ionicons/icons';

type Param = {
    brandNames: string
}

function SelectModel() {

    let dispatch = useTypedDispatch();
    let dataLocalization = Language[getUserLanguage()];
    let history = useHistory();

    let { brandNames } = useParams<Param>();

    let defaultPath = window.location.pathname.includes("sell-your-old") ? (getUserLocationForParam() != "" ? window.location.pathname?.split('/')[3]?.split('-')?.at(-1) : window.location.pathname?.split('/')[2]?.split('-')?.at(-1)) : "phone";
    let routerPath = useTypedSelector(state => state.PageChangeReducer.page);

    let selector = useTypedSelector((state) => state.PageChangeReducer.selectedPage);
    let columnSize = selector.includes('questionnaire') ? 8 : 12;

    let deviceName = useTypedSelector(state => state.DeviceNameChange.DeviceName);
    let brandName = useTypedSelector(state => state.DeviceNameChange.BrandName);
    let BrandId = useTypedSelector(state => state.InputParamChangeReducer.BrandId);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const contentRef = useRef<HTMLIonContentElement | null>(null);

    const [selectModel, setSelectModel] = useState<Array<any>>([]);
    const [searchText, setSearchText] = useState<any>("");
    const [filteredData, setfilteredData] = useState<Array<IModelTypeModel>>([]);
    const [isSkelton, setIsSkelton] = useState<boolean>(true);

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
        setIsSkelton(resultArray.length === 0 ? false : true);
        return resultArray;
    }

    const modelSelectHandler = (modelId: number, productName: string, brandName: string, displayName: string) => {
        history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-${productName.toLowerCase().replaceAll(' ', '-')}/${brandName.toLowerCase().replaceAll(' ', '-')}/${displayName.replaceAll('_', '-')?.toLowerCase()}`);
        // dispatch(pageChange("selectvariant"));
        dispatch(DeviceNameChange({ payload: displayName.replaceAll('_', " "), type: ActionType.MODEL_ID }));
    }

    const getModel = (ProductTypeName: string, BrandName: string, serviceTypeId: number) => {
        MasterServices.GetSeriesModelByBrandMasterName(ProductTypeName, BrandName, serviceTypeId).then(res => {
            if (res.status === 200) {
                reloadSelectedData(res.data);
                setSelectModel(res.data);
                setfilteredData(res.data);
            }
        }).catch((e: string) => {
            console.log(e)
        })
    }

    const deviceNameHandler = (type: "brand" | "model") => {
        if (type === "brand") {
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
            // dispatch(pageChange("selectdevice"));
            dispatch(InputParamChange({ payload: 0, type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
        }
        if (type === "model") {
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-${deviceName.toLowerCase().replaceAll(' ', '-')}`);
            // dispatch(pageChange("selectbrand"));
            dispatch(InputParamChange({ payload: BrandId, type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
        }
    }

    const reloadSelectedData = (value: any) => {
        dispatch(DeviceNameChange({ payload: value[0].ProductTypeName, type: ActionType.PRODUCT_ID }));
        dispatch(DeviceNameChange({ payload: value[0].BrandMasterName, type: ActionType.BRAND_ID }));
    }

    useEffect(() => {
        getModel((routerPath ? routerPath?.toLowerCase()?.replaceAll('-', "_") : defaultPath?.toLowerCase()?.replaceAll('-', "_")) as string, brandNames.replaceAll('-','_'), HelperConstant.serviceTypeId.SELL);
    }, []);

    useEffect(() => {
        searchHandler(selectModel, searchText);
    }, [searchText, selectModel])

    return (
        <IonPage data-aos="fade-left">
            <IonContent scrollEvents={true} ref={contentRef}>
                <IonGrid className='p-0 sd-grid' dir={Direction()}>
                    <IonRow className='sd-row bg-color-white'>
                        <IonCol sizeMd={columnSize.toString()} sizeXs='12'>
                            {/* { (!isMobile || selector === routPage.selectDevice) */}
                            {(!isMobile)
                                &&
                                <IonRow>
                                    <IonCol className='ion-padding-top custom-center' >
                                        <StepProgressBar />
                                    </IonCol>
                                </IonRow>
                            }

                            <IonRow>
                                <IonCol className='ion-padding-top sd_margin-mob custom-center'>
                                    {deviceName &&
                                        <IonChip className='sd_devicesname'>
                                            <IonLabel>{deviceName}</IonLabel>
                                            <IonIcon onClick={() => deviceNameHandler("brand")} icon={closeCircle}></IonIcon>
                                        </IonChip>
                                    }
                                    {brandName &&
                                        <IonChip className='sd_devicesname'>
                                            <IonLabel>{brandName}</IonLabel>
                                            <IonIcon onClick={() => deviceNameHandler("model")} icon={closeCircle}></IonIcon>
                                        </IonChip>
                                    }
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow className='sd-row bg-color-white'>
                        <IonCol sizeLg='2' sizeXl='2' className='sd_moblie-device'></IonCol>
                        <IonCol sizeMd={columnSize.toString()} sizeXs='12' sizeLg='8' sizeXl='8' sizeSm='12'>
                            <IonGrid>
                                <IonRow className='ion-text-center'>
                                    <IonCol sizeLg='12' sizeXs='12' className='text-center'>
                                        <IonText className='sm_title-design'>{dataLocalization.Select_your_model}</IonText>
                                        {isIn() ? <IonRow className='justify-content-end'>
                                            <IonCol sizeLg='4' sizeMd='5' offsetMd='0' offsetLg='0' sizeXs='12' className='mt-3'>
                                                <IonSearchbar placeholder={dataLocalization.Search_your_model} className='p-0 sm_search-bar' onIonChange={(e) => setSearchText(e.detail.value)} />
                                            </IonCol>
                                        </IonRow>
                                            :
                                            <IonRow className='justify-content-end'>
                                                <IonCol sizeLg='4' sizeMd='5' offsetMd='0' sizeXs='12' className='mt-3'>
                                                    <IonSearchbar placeholder={dataLocalization.Search_your_model} className='p-0 sm_search-bar' onIonChange={(e) => setSearchText(e.detail.value)} />
                                                </IonCol>
                                            </IonRow>
                                        }
                                    </IonCol>
                                    {filteredData && filteredData.length > 0 ?
                                        filteredData.map((val: IModelTypeModel, index) => {
                                            return <IonCol sizeSm='6' sizeXs='6' sizeXl='3' sizeLg='3' sizeMd='3' key={index} >
                                                <IonCard className='sm_card-design cursor-pointer' onClick={() => modelSelectHandler(val.Id, val.ProductTypeName, val.BrandMasterName, val.EnumName)}>
                                                    <IonText className='sm_card_text'>{val.Name}</IonText>
                                                </IonCard>
                                            </IonCol>
                                        })
                                        :
                                        isSkelton ?
                                            Skeleton("3", "3", "2.4", "2", "6") :
                                            <IonCardHeader className='header' >
                                                <IonChip>
                                                    <IonLabel color='black'>{dataLocalization.No_records_found}</IonLabel>
                                                </IonChip>
                                            </IonCardHeader>
                                    }
                                </IonRow>
                            </IonGrid>
                        </IonCol>
                        <IonCol sizeLg='2' sizeXl='2'></IonCol>
                    </IonRow>
                </IonGrid>
                {/* <HowItWork /> */}
                {isPlatform("android") || isPlatform("ios") ? <></> :
                    <Footer />
                }
            </IonContent>
        </IonPage>

    )
}

export default SelectModel