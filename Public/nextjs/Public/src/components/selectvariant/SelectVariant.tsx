import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import "./SelectVariant.css";
import { IVariantTypeModel } from '@/models/VariantType.Model';
import { currencyByCountry, getUserLanguage, getUserLocationForParam } from '@/components/helper/Helper';
import { pageChange } from '@/features/reducers/selldevice/PageChange.Reducer';
import { ResetSelectedQuestions, getQuestions } from '@/features/reducers/questionnaire/Questionnaire.Reducers';
import { useTypedSelector, useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { InputParamChange } from '@/features/reducers/shared/InputParams.Reducers';
import { ActionType } from '@/features/actiontypes/Input.ActionTypes';
import { toAmount } from '@/components/helper/Helper';
import { HelperConstant } from '@/components/helper/HelperConstant';
import Language from "./SelectVariantLanguage.json";
import { closeCircle } from 'ionicons/icons';
import { StepProgressBarInput, StepProgressBarReset } from '@/features/reducers/stepprogressbar/StepProgressBar.Reducers';
import StepProgressBar from '@/components/stepprogressbar/StepProgressBar';
import { DeviceNameChange } from '@/features/reducers/devicename/DeviceName.Reducers';
import { useRouter } from 'next/router';

// import LocationModel from '@/components/location-modal/Location-modal';
const IonModal = dynamic(() => import('@ionic/react').then(mod => mod.IonModal), { ssr: false });
const LocationModel = dynamic(() => import('@/components/locationmodal/LocationModal').then(mod => mod.default), { ssr: false });


type SelectVariantProps = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    selectVariant: Array<IVariantTypeModel>;
}

function SelectVariant({ language, direction, selectVariant }: SelectVariantProps) {

    let dispatch = useTypedDispatch();
    let dataLocalization = Language[language];
    let router = useRouter();
    let modelId = router.query.modelId as string;

    let modelName = useTypedSelector(state => state.DeviceNameChange.ModelName);
    let deviceName = useTypedSelector(state => state.DeviceNameChange.DeviceName);
    let brandName = useTypedSelector(state => state.DeviceNameChange.BrandName);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const userLocation = useTypedSelector(state => state.userLocation.isLocation);

    const [ids, setIds] = useState({ Id: 0, DisplayName: "" });

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

    const deviceNameHandler = (type: "brand" | "model" | "variant") => {
        if (type === "brand") {
            router.push(`/${getUserLanguage()}${getUserLocationForParam(language)}/sell-your-old-device`);
            // dispatch(pageChange("selectdevice"));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.VARIANT_ID }));
            // dispatch(InputParamChange({ payload: 0, type: ActionType.PRODUCT_ID }));
        }
        if (type === "model") {
            router.push(`/${getUserLanguage()}${getUserLocationForParam(language)}/sell-your-old-${deviceName.toLowerCase().replaceAll(' ', '-')}`);
            // dispatch(pageChange("selectbrand"));
            // dispatch(InputParamChange({ payload: BrandId, type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
        }
        if (type === "variant") {
            router.push(`/${getUserLanguage()}${getUserLocationForParam(language)}/sell-your-old-${deviceName.toLowerCase().replaceAll(' ', '-')}/${brandName.toLowerCase()}`);
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

    const getValidLocation = (validLocation: boolean) => {
        if (validLocation) {
            setLocationModel(false);
            setTimeout(() => { modelSelectHandler(ids.Id, ids.DisplayName, true) }, 500);
        }
    }

    useEffect(() => {
        reloadSelectedData(selectVariant);
        dispatch(ResetSelectedQuestions());
        dispatch(StepProgressBarReset());
    }, [modelId]);


    return (
        <>
            <ion-grid class='sv-grid' dir={direction}>
                {(!isMobile)
                    &&
                    <ion-row>
                        <ion-col class='ion-padding-top custom-center' >
                            <StepProgressBar language={language} />
                        </ion-col>
                    </ion-row>
                }
                {modelName &&
                    <ion-row>
                        <ion-col class='ion-padding-top custom-center'>
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
                            {modelName &&
                                <ion-chip class='sd_devicesname'>
                                    <ion-label>{modelName}</ion-label>
                                    <ion-icon onClick={() => deviceNameHandler("variant")} icon={closeCircle}></ion-icon>
                                </ion-chip>}
                        </ion-col>
                    </ion-row>
                }
                <ion-row class='padding-adjustment justify-content-center'>
                    <ion-col size-lg='12' size-sm='12' size-xs='12' size-md='12' class='ion-text-center header-padding'>
                        <ion-text class='sv_title-design'>{dataLocalization.Select_Your_Variant}</ion-text>
                    </ion-col>

                    {selectVariant && selectVariant.length > 0 ?
                        <>
                            {selectVariant.map((val: IVariantTypeModel, index: any) => {
                                return (
                                    <ion-col size-lg='3' size-xl='3' size-sm='12' size-xs='12' size-md='4' key={index}>
                                        <ion-card class='sv_card-design cursor-pointer' onClick={() => modelSelectHandler(val.Id, val.Name, userLocation)}>
                                            {val.Name !== HelperConstant.noVariant && <><ion-text dir='ltr'>{val.Name}</ion-text><br /></>}
                                            <ion-text>
                                                {dataLocalization.Get_upto}
                                            </ion-text>&nbsp;
                                            <ion-text style={{ color: '#2250B2' }} class='ion-text-center sv_text_design'>
                                                <b>{currencyByCountry(val.MaximumValue ? toAmount(val.MaximumValue) : 0, language)}</b>
                                            </ion-text>
                                        </ion-card>
                                    </ion-col>
                                )
                            })}
                        </>
                        :
                        null
                    }
                </ion-row >
                <ion-row>
                    {locationModel &&
                        <IonModal isOpen={locationModel} cssClass="modal-location"
                            onDidDismiss={() => setLocationModel(false)}>
                            <LocationModel isValid={getValidLocation} showModel={setLocationModel} />
                        </IonModal>
                    }
                </ion-row>
            </ion-grid >
        </>
    )
}

export default SelectVariant