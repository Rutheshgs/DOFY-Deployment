import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonCard, IonCol, IonGrid, IonIcon, IonModal, IonRow, IonText } from '@ionic/react';
import { pricetagsSharp, searchSharp } from 'ionicons/icons';

import { CustomDropdown } from '../shared/CustomDropdown';

import "./SearchAnything.css";

import MasterServices from '../../services/Master.Services';

import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { pageChange } from '../../features/reducers/selldevice/PageChange.Reducer';
import { InputParamChange } from '../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../features/actiontypes/Input.ActionTypes';
import { HelperConstant } from '../helper/HelperConstant';

import LocationModel from '../locationmodal/LocationModal';

import { Direction, getUserLanguage, getUserLocationForParam } from '../../components/helper/Helper';

import Language from "./SearchAnything.json";

type Props = {
    IsMobile: boolean
    IsTablet: boolean
}

function SearchAnything({ IsTablet, IsMobile }: Props) {

    let dispatch = useTypedDispatch();
    let history = useHistory();

    let dataLocalization = Language[getUserLanguage()];

    const deviceSelectRef = useRef<HTMLSelectElement>(null);
    const brandSelectRef = useRef<HTMLSelectElement>(null);
    const modelSelectRef = useRef<HTMLSelectElement>(null);
    

    let gadget: Array<any> = useTypedSelector(state => state.DeviceInfoReducer.DeviceInfoData);
    const userLocation = useTypedSelector(state => state.userLocation.isLocation);

    const [brand, setBrand] = useState([]);
    const [model, setModel] = useState([]);
    const [data, setData] = useState({ productId: 0, brandId: 0, modelId: 0 });

    const [locationlist, setLocationList] = useState<Array<any>>([]);
    const [locationModel, setLocationModel] = useState(false);

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
            setTimeout(() => { submitHandler(validLocation) }, 500);
        }
    }

    const getBrands = (ProductId: number) => {
        MasterServices.GetBrandMasterByProductId(ProductId, HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setData({ ...data, productId: ProductId });
                let displayInList = res.data?.filter((x: { DisplayInList: boolean; }) => x.DisplayInList === true);
                setBrand(displayInList);
                brandSelectRef.current?.click();
            }
        }).catch((e: string) => {
            console.log(e)
        });
    }

    const getModels = (BrandId: number) => {
        MasterServices.GetSeriesModelByBrandMasterId(BrandId, HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setData({ ...data, brandId: BrandId });
                let displayInList = res.data?.filter((x: { DisplayInList: boolean; }) => x.DisplayInList === true);
                setModel(displayInList);
                modelSelectRef.current?.click();
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    const selectModel = (modelId: any) => {
        setData({ ...data, modelId: modelId });
    }

    const submitHandler = (usersLocation: boolean) => {
        if (usersLocation) {

            if (gadget.length > 0 && data.productId !== 0) {
                dispatch(InputParamChange({ payload: data.productId, type: ActionType.PRODUCT_ID }));
                dispatch(pageChange("selectbrand"));
            }

            if (brand.length > 0 && data.brandId !== 0) {
                dispatch(InputParamChange({ payload: data.brandId, type: ActionType.BRAND_ID }));
                dispatch(pageChange("selectmodel"));
            }

            if (model.length > 0 && data.modelId !== 0) {
                dispatch(InputParamChange({ payload: data.modelId, type: ActionType.MODEL_ID }));
                dispatch(pageChange("selectvariant"));
            }

            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
        }
        else {
            setLocationModel(true);
        }
    }

    // const repairSubmitHandler = () => {
    //     if (gadget.length > 0 && data.productId !== 0) {
    //         dispatch(InputParamChange({ payload: data.productId, type: ActionType.PRODUCT_ID }));
    //         dispatch(RepairpageChange("selectbrand"));
    //     }

    //     if (brand.length > 0 && data.brandId !== 0) {
    //         dispatch(InputParamChange({ payload: data.brandId, type: ActionType.BRAND_ID }));
    //         dispatch(RepairpageChange("selectmodel"));
    //     }

    //     if (model.length > 0 && data.modelId !== 0) {
    //         dispatch(InputParamChange({ payload: data.modelId, type: ActionType.MODEL_ID }));
    //         dispatch(RepairpageChange("selectcolour"));
    //     }

    //     history.push("/RepairDevice");
    // }

    useEffect(() => {
        getGeoLocation();
    }, []);

    return (
        <IonGrid className='ion-padding sa-grid sa-pattern-bg container-fluid' dir={Direction()}>
            <IonGrid className='container'>
                <IonRow>
                    <IonCol>
                        <IonText className='sa-header-text'>
                            <IonIcon className="icon-small" icon={searchSharp} />{dataLocalization['Search_anything...']}
                        </IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol sizeXs='12' sizeMd='3' sizeLg='3' sizeXl='3.3' className={`${IsMobile ? '' : 'p-0'}`}>
                        <IonCard className={`swiper-card`}>
                            <CustomDropdown label={dataLocalization.Device} isLabelShow={data.productId > 0 ? "No" : "Yes"} data={gadget} onIonChange={getBrands}
                                dropDownClassName={'search-anything-select'} ref={deviceSelectRef} />
                        </IonCard>
                    </IonCol>
                    <IonCol sizeXs='12' sizeMd='3' sizeLg='3' sizeXl='3.3' className={`${IsMobile ? '' : 'p-0'}`} hidden={IsMobile ? brand.length === 0 : false}>
                        <IonCard className={`swiper-card`}>
                            <CustomDropdown label={dataLocalization.Brand} isLabelShow={data.brandId > 0 ? "No" : "Yes"} data={brand} onIonChange={getModels}
                                disabled={!(brand.length > 0)} dropDownClassName={'search-anything-select'} ref={brandSelectRef} />
                        </IonCard>
                    </IonCol>
                    <IonCol sizeXs='12' sizeMd='3' sizeLg='3' sizeXl='3.3' className={`${IsMobile ? '' : 'p-0'}`} hidden={IsMobile ? model.length === 0 : false}>
                        <IonCard className={`swiper-card`}>
                            <CustomDropdown label={dataLocalization.Pick_Model} data={model} isLabelShow={data.modelId > 0 ? "No" : "Yes"} onIonChange={selectModel}
                                disabled={!(model.length > 0)} dropDownClassName={'search-anything-select'} ref={modelSelectRef} />
                        </IonCard>
                    </IonCol>

                    <IonCol sizeXs='12' sizeSm='12' sizeMd='3' sizeLg='3' sizeXl='2.1' className={IsTablet ? "ion-margin-top ion-text-center" : IsMobile ? 'ion-text-center' : 'p-0'}>
                        <IonButton color='white' onClick={() => { submitHandler(userLocation) }}>
                            <IonIcon className="icon-small" icon={pricetagsSharp} /> {dataLocalization.Sell}
                        </IonButton>
                        {/* <IonButton color='white' disabled>
                            <IonIcon className="icon-small" icon={constructSharp} /> Repair <br />
                            <IonText className='sa-coming-soon'><small>Coming soon...</small></IonText>
                        </IonButton> */}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonModal isOpen={locationModel} className="modal-location" canDismiss={true}
                        onDidDismiss={() => setLocationModel(false)}>
                        <LocationModel isValid={getValidLocation} showModel={setLocationModel} locationlist={locationlist} />
                    </IonModal>
                </IonRow>
            </IonGrid>
        </IonGrid>

    )
}

export default SearchAnything