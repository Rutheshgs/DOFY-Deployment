import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonCard, IonCol, IonGrid, IonRow, IonText, IonIcon, IonModal, IonCardContent, IonTitle } from '@ionic/react';
import { alarmOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { ResponsiveItemPerView, currencyByCountry, getUserLanguage, getUserLocationForParam, toAmount } from '../helper/Helper';
import { Navigation, Mousewheel } from 'swiper';

import QuestionnaireTypeServices from '../../services/questionaire/sell/QuestionnaireType.Services';
import MasterServices from '../../services/Master.Services';
import { IHotSellingModel } from '../../models/HotSelling.Model';
import { IQuestionnaireModel } from '../../models/Questionnaire.Model';

import { HelperConstant } from '../helper/HelperConstant';

import "./HotSelling.css";

import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { InputParamChange } from '../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../features/actiontypes/Input.ActionTypes';
import { pageChange } from '../../features/reducers/selldevice/PageChange.Reducer';
import { getQuestions } from '../../features/reducers/questionnaire/Questionnaire.Reducers';
import { CustomImg } from '../shared/CustomImage';

import LocationModel from '../locationmodal/LocationModal';

type Props = {
    hotSelling: Array<IHotSellingModel>
}

function HotSelling({ hotSelling }: Props) {
    let histoty = useHistory();
    let dispatch = useTypedDispatch();

    const userLocation = useTypedSelector(state => state.userLocation.isLocation);

    const [locationModel, setLocationModel] = useState(false);
    const [locationlist, setLocationList] = useState<Array<any>>([]);
    const [ids, setids] = useState({ ProductTypeId: 0, BrandMasterId: 0, SeriesModelId: 0, ModelVariantId: 0 });

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const getGeoLocation = () => {
        MasterServices.GetAllDofyGeo(HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setLocationList(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    // const percentageHandler = (min: number, max: number) => {
    //     const diff = (max - min);
    //     const offer = Math.ceil((diff / max) * 100);

    //     return offer;
    // }

    const getValidLocation = (validLocation: boolean) => {
        if (validLocation) {
            setLocationModel(false);
            setTimeout(() => { routerHandler(ids.ProductTypeId, ids.BrandMasterId, ids.SeriesModelId, ids.ModelVariantId, validLocation) }, 500);
        }
    }

    const routerHandler = (ProductTypeId: number, BrandMasterId: number, SeriesModelId: number, ModelVariantId: number, validLocation: boolean) => {
        setids({ ProductTypeId: ProductTypeId, BrandMasterId: BrandMasterId, SeriesModelId: SeriesModelId, ModelVariantId: ModelVariantId });
        dispatch(InputParamChange({ payload: ProductTypeId, type: ActionType.PRODUCT_ID }));
        dispatch(InputParamChange({ payload: BrandMasterId, type: ActionType.BRAND_ID }));
        dispatch(InputParamChange({ payload: SeriesModelId, type: ActionType.MODEL_ID }));
        dispatch(InputParamChange({ payload: ModelVariantId, type: ActionType.VARIANT_ID }));

        modelSelectHandler(ModelVariantId, ProductTypeId, validLocation);
    }

    const modelSelectHandler = (ModelVariantId: number, productTypeId: number, validLocation: boolean) => {
        getQuestionnaire({
            ProductTypeId: productTypeId,
            QuestionnaireTypeId: null,
            OSTypeId: HelperConstant.osTypeId.ANDROID,
            ModelVariantId: ModelVariantId,
            ParentId: null
        }, ModelVariantId, validLocation);
    }

    const getQuestionnaire = (QuestionnaireParam: IQuestionnaireModel, ModelVariantId: number, validLocation: boolean) => {
        if (validLocation) {
            QuestionnaireTypeServices.getQuestionnaireTemplate(QuestionnaireParam).then((res: any) => {
                if (res.status === 200) {
                    dispatch(getQuestions({ payload: res.data.Sections, type: "QuestionData" }));
                    dispatch(getQuestions({ payload: hotSelling[0].ThumbnailPath, type: "questionsThumbnailPath" }));
                    dispatch(InputParamChange({ payload: ModelVariantId, type: ActionType.VARIANT_ID }));
                    dispatch(pageChange("selectvariant"));
                    histoty.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
                }
            }).catch((e: any) => {
                console.log(e);
            });
        }
        else {
            setLocationModel(true);
        }
    }

    useEffect(() => {
        getGeoLocation();
    }, [])

    return (
        <IonGrid className='hot-selling-grid container'>
            <IonRow>
                <IonCol sizeXl='11' sizeLg='10' sizeMd='10' sizeXs='8.5' sizeSm='8.5' className='ion-padding'>
                    <IonTitle size='large'>Top Picks</IonTitle>
                </IonCol>
                <IonCol sizeXl='1' sizeLg='2' sizeMd='2' sizeXs='3.5' sizeSm='3.5' className='custom-brand-nav ion-padding'>
                    <IonIcon ref={navigationPrevRef} className="cursor-pointer" icon={chevronBackOutline} />
                    <IonIcon ref={navigationNextRef} className="cursor-pointer" icon={chevronForwardOutline} />
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <Swiper modules={[Navigation, Mousewheel]} navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }} slidesPerView={ResponsiveItemPerView(1.4, 5.3, 3.5, 7.2)} speed={200} mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true }}>
                        {hotSelling.map((val, i) => (
                            <SwiperSlide key={i}>
                                <IonCard className='cursor-pointer hot-selling-card' onClick={() => { routerHandler(val.ProductTypeId, val.BrandMasterId, val.SeriesModelId, val.Id, userLocation) }}>
                                    <IonCardContent>
                                        <IonRow>
                                            <IonCol size='12'>
                                                <CustomImg src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`} alt={val.ThumbnailPath} className={"img-fluid mt-2"} style={{ height: '70px' }} />
                                                {/* <IonBadge color="danger" className='offer-end-soon'><small>Get upto</small> {percentageHandler(val.MinimumValue, val.MaximumValue)}%</IonBadge> */}
                                            </IonCol>
                                            <IonCol className='ion-text-center' size='12'>
                                                <IonText className='hot-selling-name'>{val.SeriesModelName}</IonText>
                                            </IonCol>
                                            <IonCol size='12' className='ion-text-center'>
                                                <IonText color='primary' className='hot-selling-price-original'>{currencyByCountry((val.MaximumValue) ? toAmount(val.MaximumValue) : 0)} </IonText>
                                                {/* <IonText color='primary' className='hot-selling-price-drop'>₹{(val.MinimumValue) ? toAmount(val.MinimumValue) : 0} </IonText> */}
                                                {/* <IonText className='hot-selling-price-offer'> ({percentageHandler(val.MinimumValue, val.MaximumValue)})% off </IonText><br /> */}
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                    <IonRow>
                                        <IonCol size='12' className='ion-text-center hot-selling-card-footer'>
                                            <IonText color='medium'>
                                                <IonIcon icon={alarmOutline}></IonIcon>
                                                <IonText> Offer ends soon!</IonText>
                                            </IonText>
                                        </IonCol>
                                    </IonRow>
                                </IonCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonModal isOpen={locationModel} className="modal-location" canDismiss={true}
                    onDidDismiss={() => setLocationModel(false)}>
                    <LocationModel isValid={getValidLocation} showModel={setLocationModel} locationlist={locationlist} />
                </IonModal>
            </IonRow>
        </IonGrid>
    )
}

export default HotSelling