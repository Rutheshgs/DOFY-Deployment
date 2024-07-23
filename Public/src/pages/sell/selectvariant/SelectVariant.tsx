import { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonChip, IonCol, IonGrid, IonIcon, IonLabel, IonModal, IonRow, IonText } from '@ionic/react';
import "./SelectVariant.css";

import { IVariantTypeModel } from '../../../models/VariantType.Model';
import MasterServices from '../../../services/Master.Services';
import { Direction, currencyByCountry, getUserLanguage, getUserLocationForParam } from '../../../components/helper/Helper';

import { pageChange } from '../../../features/reducers/selldevice/PageChange.Reducer';
import { ResetSelectedQuestions, getQuestions } from '../../..//features/reducers/questionnaire/Questionnaire.Reducers';
import { useTypedSelector, useTypedDispatch } from '../../../features/reduxhooks/ReduxHooks';
import { InputParamChange } from '../../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../../features/actiontypes/Input.ActionTypes';
import { toAmount } from '../../../components/helper/Helper';
import { HelperConstant } from '../../../components/helper/HelperConstant';
import { Skeleton } from '../../../components/skeleton/Skeleton';

import Language from "./SelectVariantLanguage.json";
import { useHistory, useParams } from 'react-router-dom';
import { closeCircle } from 'ionicons/icons';
import { StepProgressBarInput, StepProgressBarReset } from '../../../features/reducers/stepprogressbar/StepProgressBar.Reducers';
import StepProgressBar from '../../../components/stepprogressbar/StepProgressBar';
import { DeviceNameChange } from '../../../features/reducers/devicename/DeviceName.Reducers';
import LocationModel from '../../../components/locationmodal/LocationModal';

type Param = {
    modelId: string
}

function SelectVariant() {

    const { modelId } = useParams<Param>();

    let dispatch = useTypedDispatch();

    let dataLocalization = Language[getUserLanguage()];
    let history = useHistory();

    let modelName = useTypedSelector(state => state.DeviceNameChange.ModelName);
    let deviceName = useTypedSelector(state => state.DeviceNameChange.DeviceName);
    let brandName = useTypedSelector(state => state.DeviceNameChange.BrandName);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const userLocation = useTypedSelector(state => state.userLocation.isLocation);

    const [selectVariant, setSelectVariant] = useState<Array<any>>([]);
    const [searchText, setSearchText] = useState<any>("");
    const [filteredData, setFilteredData] = useState<any>("");
    const [isSkelton, setIsSkelton] = useState<boolean>(true);
    const [ids, setIds] = useState({ Id: 0, DisplayName: "" });

    const [locationlist, setLocationList] = useState<Array<any>>([]);
    const [locationModel, setLocationModel] = useState(false);

    const modelSelectHandler = (ModelVariantId: number, displayName: string, validLocation: boolean) => {
        setIds({ Id: ModelVariantId, DisplayName: displayName });
        if (validLocation) {
            dispatch(InputParamChange({ payload: ModelVariantId, type: ActionType.VARIANT_ID }));
            dispatch(DeviceNameChange({ payload: displayName, type: ActionType.VARIANT_ID }));
            dispatch(getQuestions({ payload: selectVariant[0].ThumbnailPath, type: "questionsThumbnailPath" }));
            dispatch(StepProgressBarInput([1, 2]));
            dispatch(pageChange("questionnaire"));
        }
        else {
            setLocationModel(true);
        }
    }

    const searchEvent = (inputData: Array<IVariantTypeModel>, searchText: string) => {
        let filteredData = inputData?.filter(x => x.DisplayInList === true);
        if (searchText === "")
            return setFilteredData(filteredData);

        var resultObject = Array<IVariantTypeModel>();
        filteredData.forEach((eachData) => {
            let searchData = `${eachData.Name} ${eachData.MaximumValue}`;
            if (searchData.toLowerCase().includes(searchText.toLowerCase()))
                resultObject.push(eachData);
        });
        setFilteredData(resultObject);
        setIsSkelton(resultObject.length === 0 ? false : true);
        return resultObject;
    }

    const getVariant = (modelId: string, serviceTypeId: number) => {
        MasterServices.GetModelVariantBySeriesModelName(modelId?.replaceAll('-', ' '), serviceTypeId).then(res => {
            if (res.status === 200) {
                setSelectVariant(res.data);
                setFilteredData(res.data);
                reloadSelectedData(res.data);
            }
        }).catch((e: any) => {
            console.log(e)
        })
    }

    const deviceNameHandler = (type: "brand" | "model" | "variant") => {
        if (type === "brand") {
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
            // dispatch(pageChange("selectdevice"));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.VARIANT_ID }));
            // dispatch(InputParamChange({ payload: 0, type: ActionType.PRODUCT_ID }));
        }
        if (type === "model") {
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-${deviceName.toLowerCase().replaceAll(' ', '-')}`);
            // dispatch(pageChange("selectbrand"));
            // dispatch(InputParamChange({ payload: BrandId, type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
        }
        if (type === "variant") {
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-${deviceName.toLowerCase().replaceAll(' ', '-')}/${brandName.toLowerCase().replaceAll(' ', '-')}`);
            // dispatch(pageChange("selectmodel"));
            // dispatch(InputParamChange({ payload: selectVariant[0].SeriesModelId, type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
        }
    }

    const reloadSelectedData = (value: any) => {
        dispatch(DeviceNameChange({ payload: value[0].ProductTypeName, type: ActionType.PRODUCT_ID }));
        dispatch(DeviceNameChange({ payload: value[0].BrandMasterName, type: ActionType.BRAND_ID }));
        dispatch(DeviceNameChange({ payload: value[0].SeriesModelName, type: ActionType.MODEL_ID }));
        dispatch(InputParamChange({ payload: value[0].ProductTypeId, type: ActionType.PRODUCT_ID }));
        dispatch(InputParamChange({ payload: value[0].BrandMasterId, type: ActionType.BRAND_ID }));
        dispatch(InputParamChange({ payload: value[0].SeriesModelId, type: ActionType.MODEL_ID }));
    }

    const getGeoLocation = () => {
        MasterServices.GetAllDofyGeo(HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setLocationList(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const getValidLocation = (validLocation: boolean) => {
        if (validLocation) {
            setLocationModel(false);
            setTimeout(() => { modelSelectHandler(ids.Id, ids.DisplayName, true) }, 500);
        }
    }

    useEffect(() => {
        getVariant(modelId.replaceAll('-', '_'), HelperConstant.serviceTypeId.SELL);
        dispatch(ResetSelectedQuestions());
        dispatch(StepProgressBarReset());
        getGeoLocation();
    }, [modelId]);

    useEffect(() => {
        searchEvent(selectVariant, searchText);
    }, [searchText, selectVariant]);

    return (
        <>
            <IonGrid className='sv-grid' dir={Direction()}>
                {(!isMobile)
                    &&
                    <IonRow>
                        <IonCol className='ion-padding-top custom-center' >
                            <StepProgressBar />
                        </IonCol>
                    </IonRow>
                }
                {modelName &&
                    <IonRow>
                        <IonCol className='ion-padding-top custom-center'>
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
                            {modelName &&
                                <IonChip className='sd_devicesname'>
                                    <IonLabel className='sv_chipfontsize'>{modelName}</IonLabel>
                                    <IonIcon onClick={() => deviceNameHandler("variant")} icon={closeCircle}></IonIcon>
                                </IonChip>}
                        </IonCol>
                    </IonRow>
                }
                <IonRow className='padding-adjustment justify-content-center'>
                    <IonCol sizeLg='12' sizeSm='12' sizeXs='12' sizeMd='12' className='ion-text-center header-padding'>
                        <IonText className='sv_title-design'>{dataLocalization.Select_Your_Variant}</IonText>
                    </IonCol>
                    {filteredData && filteredData.length > 0 ?
                        <>
                            {filteredData.map((val: IVariantTypeModel, index: any) => {
                                return (
                                    <IonCol sizeLg='3' sizeXl='3' sizeSm='12' sizeXs='12' sizeMd='4' key={index}>
                                        <IonCard className='sv_card-design cursor-pointer' onClick={() => modelSelectHandler(val.Id, val.Name, userLocation)}>
                                            {val.Name !== HelperConstant.noVariant && <><IonText dir='ltr'>{val.Name}</IonText><br /></>}
                                            <IonText>
                                                {dataLocalization.Get_upto}
                                            </IonText>&nbsp;
                                            <IonText style={{ color: '#2250B2' }} className='ion-text-center sv_text_design'><b>{currencyByCountry(val.MaximumValue ? toAmount(val.MaximumValue) : 0)}</b></IonText>
                                        </IonCard>
                                    </IonCol>
                                )
                            })}
                        </>
                        :
                        isSkelton ?
                            Skeleton("4", "12", "3", "3", "12") :
                            <IonCardHeader className='header' >
                                <IonChip>
                                    <IonLabel color='black'>{dataLocalization.No_records_found}</IonLabel>
                                </IonChip>
                            </IonCardHeader>}

                </IonRow >
                <IonRow>
                    <IonModal isOpen={locationModel} className="modal-location" canDismiss={true}
                        onDidDismiss={() => setLocationModel(false)}>
                        <LocationModel isValid={getValidLocation} showModel={setLocationModel} locationlist={locationlist} />
                    </IonModal>
                </IonRow>
            </IonGrid >
        </>
    )
}

export default SelectVariant