import { useEffect, useRef, useState } from 'react';

import { IonCard, IonCardContent, IonCardHeader, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonText, isPlatform } from '@ionic/react';

import "./SelectBrand.css";

import MasterServices from '../../../services/Master.Services';
import { IBrandMasterModel } from '../../../models/BrandMaster.Model';

import { useTypedSelector, useTypedDispatch } from '../../../features/reduxhooks/ReduxHooks';
import { ActionType } from '../../../features/actiontypes/Input.ActionTypes';
import { routerChange } from '../../../features/reducers/selldevice/PageChange.Reducer';

import { Skeleton } from '../../../components/skeleton/Skeleton';
import { Direction, getUserLocationForParam } from '../../../components/helper/Helper';
import { HelperConstant } from '../../../components/helper/HelperConstant';
import { getUserLanguage } from '../../../components/helper/Helper';
import { CustomImg } from '../../../components/shared/CustomImage';

import Language from "./SelectBrandLanguage.json";
import { DeviceNameChange } from '../../../features/reducers/devicename/DeviceName.Reducers';
import StepProgressBar from '../../../components/stepprogressbar/StepProgressBar';
import { closeCircle } from 'ionicons/icons';
import Footer from '../../../components/footer/Footer';
import { useHistory } from 'react-router-dom';

function SelectBrand() {

    const dispatch = useTypedDispatch();
    let dataLocalization = Language[getUserLanguage()];
    let history = useHistory();

    // let deviceNameFromRouter = (getUserLocationForParam() != "" ? window.location.pathname.split('/')[3].split('-').at(-1) : window.location.pathname.split('/')[2].split('-').at(-1)) as string;

    const deviceNameFromRouter = (): string => {
        let pathIndex = window.location.pathname.search("old");
        return window.location.pathname.slice(pathIndex + "old-".length);
    }

    let selector = useTypedSelector((state) => state.PageChangeReducer.selectedPage);
    let columnSize = selector.includes('questionnaire') ? 8 : 12;

    let deviceName = useTypedSelector(state => state.DeviceNameChange.DeviceName);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const contentRef = useRef<HTMLIonContentElement | null>(null);
    const [selectBrand, setSelectBrand] = useState<Array<any>>([]);
    const [searchText, setSearchText] = useState<any>("");
    const [filteredData, setfilteredData] = useState<Array<IBrandMasterModel>>([]);
    const [isSkelton, setIsSkelton] = useState<boolean>(true);

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
        setIsSkelton(resultArray.length === 0 ? false : true)
        return resultArray;
    }

    const brandSelectHandler = (brandId: number, brandName: string, ProductTypeEnumName: string) => {
        history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-${ProductTypeEnumName.toLowerCase().replaceAll("_", '-')}/${brandName.toLowerCase().replaceAll(' ',"-")}`);
        dispatch(routerChange(ProductTypeEnumName.toLowerCase().replaceAll("_", '-')));
        dispatch(DeviceNameChange({ payload: brandName, type: ActionType.BRAND_ID }));
        dispatch(DeviceNameChange({ payload: ProductTypeEnumName.replaceAll("_", '-'), type: ActionType.PRODUCT_ID }));
    }

    const deviceNameHandler = (type: "brand") => {
        if (type === "brand") {
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
        }
        // if (type === "model") {
        //     history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-${deviceName.toLowerCase()}`);
        //     dispatch(pageChange("selectbrand"));
        //     dispatch(InputParamChange({ payload: BrandId, type: ActionType.BRAND_ID }));
        //     dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
        // }
    }

    const reloadSelectedData = (value: any) => {
        dispatch(DeviceNameChange({ payload: value[0].ProductTypeName, type: ActionType.PRODUCT_ID }));
    }

    useEffect(() => {
        const getBrandById = (productTypeName: string, serviceTypeId: number) => {
            MasterServices.GetBrandMasterByProductName(productTypeName.replaceAll('-', "_"), serviceTypeId).then(res => {
                if (res.status === 200) {
                    setSelectBrand(res.data);
                    reloadSelectedData(res.data);
                    searchHandler(res.data, searchText);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }

        // GetHome(productTypeId);
        getBrandById(deviceNameFromRouter(), HelperConstant.serviceTypeId.SELL);
    }, [searchText]);

    useEffect(() => {
        searchHandler(selectBrand, searchText);
    }, [searchText, selectBrand]);

    return (
        <IonPage data-aos="fade-left">
            <IonContent scrollEvents={true} ref={contentRef}>
                <IonGrid className='p-0 sd-grid' dir={Direction()}>
                    <IonRow className='sd-row bg-color-white'>
                        <IonCol sizeMd={columnSize.toString()} sizeXs='12'>
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
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow className='sd-row bg-color-white'>
                        <IonCol sizeLg='2' sizeXl='2' className='sd_moblie-device'></IonCol>
                        <IonCol sizeMd={columnSize.toString()} sizeXs='12' sizeLg='8' sizeXl='8' sizeSm='12'>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='12' className='ion-text-center'>
                                        <IonText className='sb_title-style'>{dataLocalization.Select_Your_Brands}</IonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    {
                                        filteredData && filteredData.length > 0 ?
                                            filteredData.map((val: IBrandMasterModel, index) => {
                                                return <IonCol sizeSm='4' sizeXs='4' sizeXl='3' sizeLg='3' sizeMd='3' className='sb_design' key={index}>
                                                    <IonCard className='sb_card-design cursor-pointer' onClick={() => brandSelectHandler(val.Id, val.DisplayName, val.ProductTypeEnumName)}>
                                                        <IonCardContent>
                                                            <CustomImg className='sb_img' src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`} alt={`sell${val.Name}`} />
                                                        </IonCardContent>
                                                    </IonCard>
                                                </IonCol>

                                            })
                                            :
                                            isSkelton ?
                                                Skeleton("3", "4", "3", "3", "4") :
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

export default SelectBrand