import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonLabel, IonRow, IonText, IonToast } from '@ionic/react'
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
import { CustomMaterialInput } from '../shared/CustomMaterialInput'
import { loginPageChanger, modelChanger, resetModelChanger } from '../../features/reducers/login/LoginModel.Reducer'
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks'
import { close } from "ionicons/icons";
import { CustomDropdown } from '../shared/CustomDropdown'
import { CustomInput } from '../shared/CustomInput'


function FindLocation() {

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
                // console.log("Created successfully");
                // window.location.reload();
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    const getProduct = (serviceTypeId: number) => {
        MasterServices.GetAllProductType(serviceTypeId).then(res => {
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
        MasterServices.GetCityList(HelperConstant.serviceTypeId.SELL).then(res => {
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
        getProduct(HelperConstant.serviceTypeId.SELL);
        getCityList();
    }, []);


    return (
        <IonContent className='fl_content-style' dir={Direction()}>
            <IonGrid className='location-grid'>
                <form onSubmit={handleSubmit(onCreateNewLocation)} >
                    <IonIcon className='fl_close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>
                    <IonRow>
                        <IonCol sizeLg='12' sizeXs='12' sizeMd='12' className='fl_label text-center'>
                            <IonText className='findLocation-title'><b>{dataLocalization.Cant_Find_Your_Location}</b></IonText>
                        </IonCol>
                        <IonCol size="1" sizeXs='1'></IonCol>
                        <IonCol size='10' sizeXs='10'>
                            <IonImg src={newLocation} alt="Can't find location"/>
                        </IonCol>
                        <IonCol size="1" sizeXs='1'></IonCol>
                        <IonCol size="0.5" sizeXs='0.5'></IonCol>
                        <IonCol size='11' sizeXs='11' className='lt-caption'>
                            <IonText className='location-caption' style={{ color: "#000000" }}>Please Provide us with the Location we will get back to you</IonText>
                        </IonCol>
                        <IonCol size="0.5" sizeXs='0.5'></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='1'></IonCol>
                        <IonCol size='12'>
                            <IonRow>
                                <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='6' className='fL_margin'>
                                    <CustomDropdown label={dataLocalization.Select_Gadget} data={Product} onIonChange={getBrands}   {...register("Product", { required: true })}  />
                                    {errors.Product && <IonLabel color='danger'>{dataLocalization.Error} </IonLabel>}
                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='6' className='fL_margin'>
                                    <CustomDropdown label={dataLocalization.Select_Brand} data={Brand} onIonChange={getModels} {...register("BrandName", { required: true })} />
                                    {errors.BrandName && <IonLabel color='danger'>{dataLocalization.Error} </IonLabel>}
                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='6' className='fL_margin'>
                                    <CustomDropdown label={dataLocalization.Select_Model} data={Model} onIonChange={getVariant} {...register("Model", { required: true })}></CustomDropdown>
                                    {errors.Model && <IonLabel color='danger'>{dataLocalization.Error}</IonLabel>}
                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='6' className='fL_margin'>
                                    <CustomDropdown label={dataLocalization.Select_Varient} data={Variant} onIonChange={selectModel} {...register("ModelVariant", { required: true })}></CustomDropdown>
                                    {errors.ModelVariant && <IonLabel color='danger'>{dataLocalization.Error} </IonLabel>}
                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='6' className='fL_margin'>
                                    <CustomInput placeholder={undefined} label={dataLocalization.Full_Name} {...register("Name", { required: true })} onIonChange={() => { clearErrors("Name") }}></CustomInput>
                                    {errors.Name && <IonLabel color='danger'>{dataLocalization.Error}</IonLabel>}

                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='6'>
                                    <CustomInput label={dataLocalization.Mobile_Number} placeholder="+971- 912345678" {...register("MobileNumber", { required: true })} ></CustomInput>
                                    {errors.MobileNumber && <IonLabel color='danger'>{dataLocalization.Error}</IonLabel>}
                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='6'>
                                    <CustomInput placeholder={undefined} label={dataLocalization.Email} {...register("Email", { required: true })} onIonChange={() => { clearErrors("Email") }}></CustomInput>
                                    {errors.Email && <IonLabel color='danger'>{dataLocalization.Error}</IonLabel>}

                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='6' className='fL_margin'>
                                    <CustomDropdown label={dataLocalization.City} data={City} onIonChange={getCityList} {...register("CityId", { required: true })}></CustomDropdown>
                                    {errors.CityId && <IonLabel color='danger'>{dataLocalization.Error}</IonLabel>}

                                </IonCol>
                                <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='6' className='fL_margin'>
                                    <CustomInput placeholder={undefined} label={dataLocalization.Area} {...register("Area", { required: true })}></CustomInput>
                                    {errors.Area && <IonLabel color='danger'>{dataLocalization.Error}</IonLabel>}
                                </IonCol>
                                <IonCol size='12' className='text-center'>
                                    {/* <IonButton color='danger'>{dataLocalization.Cancel}</IonButton> */}
                                    <IonButton className="location-btn" type='submit'>{dataLocalization.Update}</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol size='1'></IonCol>
                    </IonRow>
                </form>
                <IonRow>
                    <IonToast color='success' isOpen={showToastUpdate} onDidDismiss={() =>setShowToastUpdate(false)} message={"Your location is updated Successfully"} duration={5000000}/>
                </IonRow>
            </IonGrid>
        </IonContent >
    )
}

export default FindLocation