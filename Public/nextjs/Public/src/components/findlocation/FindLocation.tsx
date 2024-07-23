import { useEffect, useState } from 'react'
import MasterServices from '../../services/Master.Services'
import { HelperConstant } from '../helper/HelperConstant'
import { Direction, getUserLanguage } from '../helper/Helper'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IFindLocation } from '../../models/PublicRequest.Model'
import Language from "./FindLocation.json";
import CantFindServices from '../../services/CantFind.Services'
import "./FindLocation.css"
import { CustomMaterialDropDown } from '../shared/CustomMaterialDropDown'
import newLocation from '../../../src/assets/images/findLocation.png'
import { modelChanger, resetModelChanger } from '../../features/reducers/login/LoginModel.Reducer'
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks'
import { close } from "ionicons/icons";
import { CustomDropdown } from '../shared/CustomDropdown'
import { CustomInput } from '../shared/CustomInput'
import dynamic from 'next/dynamic'

const IonToast = dynamic(() => import('@ionic/react').then(mod => mod.IonToast), { ssr: false });

type Props = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar"
}

function FindLocation({ direction, language }: Props) {

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<IFindLocation>({

    });

    let dataLocalization = Language[getUserLanguage()];
    let dispatch = useTypedDispatch();

    const [Product, setProduct] = useState<Array<any>>([]);
    const [Brand, setBrand] = useState([]);
    const [Model, setModel] = useState([]);
    const [Variant, setVariant] = useState<Array<any>>([]);
    const [City, setCity] = useState<Array<any>>([]);
    const [ProductId, setproductId] = useState<any>('');
    const [BrandId, setBrandId] = useState<any>('');
    const [ModelId, setModelId] = useState<any>('');
    const [showToastUpdate, setShowToastUpdate] = useState(false);



    const onCreateNewLocation: SubmitHandler<IFindLocation> = (data) => {
        data.BrandModelName = data.BrandName;
        CantFindServices.createLocationRequest(data).then((res: any) => {
            if (res.status === 200) {
                setShowToastUpdate(true)
                dispatch(modelChanger(false));

            }
        }).catch((e: string) => {
            console.log(e);
        });
    }


    const getProduct = (serviceTypeId: number, LanguageCode: any, CountryCode: any) => {
        MasterServices.GetAllProductType(serviceTypeId, LanguageCode, CountryCode).then(res => {
            if (res.status === 200) {
                setProduct(res.data);

            }
        }).catch((e: string) => {
            console.log(e);
        });
    }


    const getBrands = (ProductId: number) => {
        MasterServices.GetBrandMasterByProductId(ProductId, HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setBrand(res.data);
                setproductId(ProductId);
            }
        }).catch((e: string) => {
            console.log(e)
        });
    }

    const getModels = (BrandId: number) => {
        setBrandId(BrandId);
        MasterServices.GetSeriesModelByBrandMasterId(BrandId, HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setModel(res.data);

            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    const getVariant = (ModelId: number) => {
        MasterServices.GetModelVariantBySeriesModelId(ModelId, HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setVariant(res.data);
                setModelId(ModelId);
            }
        }).catch((e: any) => {
            console.log(e)
        })
    }

    const getCityList = () => {
        MasterServices.GetCityList(HelperConstant.serviceTypeId.SELL, "", "").then(res => {
            if (res.status === 200) {
                setCity(res.data);

            }
        }).catch(e => {
            console.log(e);
        });
    }

    const selectModel = () => {
    };

    useEffect(() => {
        getProduct(HelperConstant.serviceTypeId.SELL, '', '');
        getCityList();
    }, []);


    return (
        <ion-content class='fl_content-style' dir={direction}>
            <ion-grid class='location-grid'>
                <form onSubmit={handleSubmit(onCreateNewLocation)} >
                    <ion-icon class='fl_close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>
                    <ion-row>
                        <ion-col size-lg='12' size-xs='12' size-md='12' class='fl_label text-center'>
                            <ion-text class='findLocation-title'><b>{dataLocalization.Cant_Find_Your_Location}</b></ion-text>
                        </ion-col>
                        <ion-col size="1" size-xs='1'></ion-col>
                        <ion-col size='10' size-xs='10'>
                            <ion-img src={newLocation.src} alt="Can't find location" />
                        </ion-col>
                        <ion-col size="1" size-xs='1'></ion-col>
                        <ion-col size="0.5" size-xs='0.5'></ion-col>
                        <ion-col size='11' size-xs='11' class='lt-caption'>
                            <ion-text class='location-caption' style={{ color: "#000000" }}>Please Provide us with the Location we will get back to you</ion-text>
                        </ion-col>
                        <ion-col size="0.5" size-xs='0.5'></ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size='1'></ion-col>
                        <ion-col size='12'>
                            <ion-row>
                                <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='6' class='fL_margin'>
                                    <CustomMaterialDropDown label={dataLocalization.Select_Gadget} data={Product} onIonChange={getBrands}   {...register("Product", { required: true })} />
                                    {errors.Product && <ion-label color='danger'>{dataLocalization.Error} </ion-label>}
                                </ion-col>
                                <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='6' class='fL_margin'>
                                    <CustomMaterialDropDown label={dataLocalization.Select_Brand} data={Brand} onIonChange={getModels} {...register("BrandName", { required: true })} />
                                    {errors.BrandName && <ion-label color='danger'>{dataLocalization.Error} </ion-label>}
                                </ion-col>
                                <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='6' class='fL_margin'>
                                    <CustomMaterialDropDown label={dataLocalization.Select_Model} data={Model} onIonChange={getVariant} {...register("Model", { required: true })}></CustomMaterialDropDown>
                                    {errors.Model && <ion-label color='danger'>{dataLocalization.Error}</ion-label>}
                                </ion-col>
                                <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='6' class='fL_margin'>
                                    <CustomMaterialDropDown label={dataLocalization.Select_Varient} data={Variant} onIonChange={selectModel} {...register("ModelVariant", { required: true })}></CustomMaterialDropDown>
                                    {errors.ModelVariant && <ion-label color='danger'>{dataLocalization.Error} </ion-label>}
                                </ion-col>
                                <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='6' class='fL_margin'>
                                    <CustomInput placeholder={undefined} label={dataLocalization.Full_Name} {...register("Name", { required: true })} onIonChange={() => { clearErrors("Name") }}></CustomInput>
                                    {errors.Name && <ion-label color='danger'>{dataLocalization.Error}</ion-label>}

                                </ion-col>
                                <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='6'>
                                    <CustomInput label={dataLocalization.Mobile_Number} placeholder="+971- 912345678" {...register("MobileNumber", { required: true })} ></CustomInput>
                                    {errors.MobileNumber && <ion-label color='danger'>{dataLocalization.Error}</ion-label>}
                                </ion-col>
                                <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='6'>
                                    <CustomInput placeholder={undefined} label={dataLocalization.Email} {...register("Email", { required: true })} onIonChange={() => { clearErrors("Email") }}></CustomInput>
                                    {errors.Email && <ion-label color='danger'>{dataLocalization.Error}</ion-label>}

                                </ion-col>
                                <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='6' class='fL_margin'>
                                    <CustomDropdown label={dataLocalization.City} data={City} onIonChange={getCityList} {...register("CityId", { required: true })}></CustomDropdown>
                                    {errors.CityId && <ion-label color='danger'>{dataLocalization.Error}</ion-label>}

                                </ion-col>
                                <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='6' class='fL_margin'>
                                    <CustomInput placeholder={undefined} label={dataLocalization.Area} {...register("Area", { required: true })}></CustomInput>
                                    {errors.Area && <ion-label color='danger'>{dataLocalization.Error}</ion-label>}
                                </ion-col>
                                <ion-col size='12' class='text-center'>
                                    <ion-button class="location-btn" type='submit'>{dataLocalization.Update}</ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                        <ion-col size='1'></ion-col>
                    </ion-row>
                </form>
                <ion-row>
                    <IonToast color='success' isOpen={showToastUpdate} onDidDismiss={() => setShowToastUpdate(false)} message={"Your location is updated Successfully"} duration={5000000} />
                </ion-row>
            </ion-grid>
        </ion-content >
    )
}

export default FindLocation