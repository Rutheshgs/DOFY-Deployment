import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow, IonText, IonTitle, IonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { onKeyDown } from "../../../components/helper/Helper";
import { HelperConstant } from "../../../components/helper/HelperConstant";
import MenuButton from "../../../components/menubutton/MenuButton";
import { CustomDropdown } from "../../../components/shared/CustomDropdown";
import { CustomInput } from "../../../components/shared/CustomInput";
import { ICategoryModel } from "../../../models/CategoryList.Model";
import { IModelVariantModel } from "../../../models/ModelVarient.Model";
import { IThresholdCategoryModel } from "../../../models/ThresholdCategory.Model";
import MasterServices from "../../../services/Master.Services";
import ModelVariantServices from "../../../services/ModelVariant.Services";
import ProductTypeServices from "../../../services/ProductType.Services";

function ModelVariantCreate() {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<IModelVariantModel>();

    const [ProductList, setProductList] = useState<Array<any>>([]);
    const [Brand, setBrand] = useState<Array<any>>([]);
    const [categoryList, setCategoryList] = useState<Array<ICategoryModel>>([]);
    const [thresholdCategoryList, setThresholdCategoryList] = useState<Array<IThresholdCategoryModel>>([]);
    // const [ModelDropDownData, setModelDropDownData] = useState<Array<any>>([]);
    const [series, setSeries] = useState<Array<any>>([]);
    const [minimumValue, setMinimumValue] = useState<any>(0);
    const [maximumValue, setMaximumValue] = useState<any>(0);
    const [showToast, setShowToast] = useState(false);


    const onSubmit: SubmitHandler<IModelVariantModel> = (data) => {
        if (parseInt(maximumValue) < parseInt(minimumValue)) {
            return setShowToast(true);
        }
        var enumname = data.Name;
        var name = enumname.split(' ').join('_');
        data.ComingSoon = true;
        data.DisplayName = data.Name;
        data.EnumName = name;
        data.Specification = "";
        data.ThumbnailPath = "";
        data.active = true;
        data.DisplayInList = true;
        data.DisplayForSale = true;
        ModelVariantServices.Create(data).then((res: any) => {
            if (res.status === 200)
                if (res.data === -1) {
                    alert("ModelVariant already exists")
                }
                else {
                    window.location.href = "/ModelVarientDashbord";
                    alert("Created successfully")
                }
        }).catch((e: string) => {
            console.log(e);
        });

    }

    const ProductTypeServicesData = () => {
        ProductTypeServices.GetList().then(res => {
            if (res.status === 200) {
                setProductList(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const GetBrandMasterByProductId = (productTypeId: number) => {
        setBrand([]);
        MasterServices.GetBrandMasterByProductId(productTypeId, HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setBrand(res.data);
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const GetBrands = (BrandId: number) => {
        MasterServices.GetSeriesModelByBrandMasterId(BrandId, HelperConstant.serviceTypeId.SELL).then(res => {
            setSeries(res.data);
        })
    }

    const GetThresholdCategory = () => {
        MasterServices.GetThresholdCategory().then(res => {
            if (res.status === 200) {
                setThresholdCategoryList(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const GetProductCategoryList = () => {
        MasterServices.GetProductCategory().then(res => {
            if (res.status === 200) {
                setCategoryList(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    // const GetModel = (seriesId:number) => {
    //     MasterServices.GetSeriesModelByBrandSeriesId(seriesId, HelperConstant.serviceTypeId.SELL).then(res => {
    //         setSeries(res.data);
    //     })
    // }

    const Cancel = () => {
        window.location.href = "/ModelVarientDashbord";
    }

    useEffect(() => {
        ProductTypeServicesData();
        GetThresholdCategory();
        GetProductCategoryList();
    }, []);


    return (
        <IonPage>
            <MenuButton pageName={"SeriesModelDashBoard"} backButton="yes" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol offsetXl="0.5" sizeXl="11" sizeLg="12" sizeMd="12" sizeXs="12" className="">
                            <IonCard>
                                <IonRow>
                                    <IonCol size="12" className="ion-text-center">
                                        <IonItem><IonTitle className="pv_font-weight">ModelVariantCreate</IonTitle> </IonItem>
                                    </IonCol>
                                </IonRow>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <IonRow>
                                        <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Product Type"} data={ProductList} {...register("ProductTypeId", { required: true })} onIonChange={(e: any) => { clearErrors("ProductTypeId"); GetBrandMasterByProductId(e) }} />
                                            {errors.ProductTypeId && (<IonText color='danger' className="error-padding">Please Select ProductType </IonText>)}
                                        </IonCol>
                                        <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Brand Masters"} data={Brand} {...register("BrandMasterId", { required: true })} onIonChange={(e: any) => { GetBrands(e); clearErrors("BrandMasterId"); }} />
                                            {errors.BrandMasterId && (<IonText color='danger' className="error-padding">Please Select BrandMaster </IonText>)}
                                        </IonCol>
                                        {/* <IonCol sizeLg="4" sizeXl="4" sizeMd="6" sizeSm="12" sizeXs="12">
                                    <CustomDropdown label={"Brand Series"} data={ModelDropDownData} {...register("BrandSeriesId", { required: true })} onIonChange={(e: any) => GetModel(e)} />
                                    </IonCol> */}
                                    </IonRow>
                                    <IonRow>
                                        <IonCol sizeLg="4" sizeXl="4" sizeMd="6" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Series Model"} data={series} {...register("SeriesModelId", { required: true })} onIonChange={() => { clearErrors("SeriesModelId"); }} />
                                            {errors.SeriesModelId && (<IonText color='danger' className="error-padding">Please Select SeriesModel </IonText>)}
                                        </IonCol>
                                        <IonCol sizeLg="4" sizeXl="4" sizeMd="6" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Product Category"} data={categoryList} {...register("ProductCategoryId", { required: true })} onIonChange={() => { clearErrors("ProductCategoryId"); }} />
                                            {errors.ProductCategoryId && (<IonText color='danger' className="error-padding">Please Select ProductCategory </IonText>)}
                                        </IonCol>
                                        <IonCol sizeLg="4" sizeXl="4" sizeMd="6" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Threshold Category"} data={thresholdCategoryList} {...register("ThresholdCategoryId", { required: true })} onIonChange={() => { clearErrors("ThresholdCategoryId"); }} />
                                            {errors.ThresholdCategoryId && (<IonText color='danger' className="error-padding">Please Select ThresholdCategory </IonText>)}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol sizeLg="4" sizeXl="4" sizeMd="4" sizeSm="12" sizeXs="12">
                                            <CustomInput label={"Variant"} {...register("Name", { required: true })} placeholder="typehere" onIonChange={() => { clearErrors("Name"); }} />
                                            {errors.Name && (<IonText color='danger' className="error-padding">Please Enter Name </IonText>)}
                                        </IonCol>
                                        <IonCol sizeLg="4" sizeXl="4" sizeMd="4" sizeSm="12" sizeXs="12">
                                            <CustomInput label={"MinimumValue"} {...register("MinimumValue", { required: true })} placeholder="typehere" type="number" onKeyDown={onKeyDown} onIonChange={(e: any) => { clearErrors("MinimumValue"); setMinimumValue(e.detail.value) }} />
                                            {errors.MinimumValue && (<IonText color='danger' className="error-padding">Please Enter MinimumValue </IonText>)}
                                        </IonCol>
                                        <IonCol sizeLg="4" sizeXl="4" sizeMd="4" sizeSm="12" sizeXs="12">
                                            <CustomInput label={"MaximumValue"} {...register("MaximumValue", { required: true })} placeholder="typehere" type="number" onKeyDown={onKeyDown} onIonChange={(e: any) => { clearErrors("MaximumValue"); setMaximumValue(e.detail.value) }} />
                                            {errors.MaximumValue && (<IonText color='danger' className="error-padding">Please Enter MaximumValue </IonText>)}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-margin-top ion-margin-bottom">
                                        <IonCol sizeXl="12" sizeSm="12" sizeMd="12" sizeXs="12" sizeLg="12" className="ion-text-center">
                                            <IonButton color="white" className="bg-danger" size="small" type="button" onClick={() => Cancel()}> Cancel</IonButton>
                                            <IonButton className="bg-success" color="white" size="small" type="submit">Save</IonButton>
                                        </IonCol>
                                    </IonRow>
                                </form>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonToast
                            color='danger'
                            isOpen={showToast}
                            onDidDismiss={() => setShowToast(false)}
                            message="Maximum value should be greater than the Minimum value"
                            duration={5000}
                        />
                    </IonRow>
                </IonGrid>
            </IonContent >
        </IonPage >
    );
}

export default ModelVariantCreate;