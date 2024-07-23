import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow, IonText, IonTitle, IonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
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

function ModelVariantEdit() {
    const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm<IModelVariantModel>();

    const { id } = useParams<{ id: any }>();
    const [ProductList, setProductList] = useState<Array<any>>([]);
    const [Brand, setBrand] = useState<Array<any>>([]);
    const [thresholdCategoryList, setThresholdCategoryList] = useState<Array<IThresholdCategoryModel>>([]);
    const [categoryList, setCategoryList] = useState<Array<ICategoryModel>>([]);
    // const [ModelDropDownData, setModelDropDownData] = useState<Array<any>>([]);
    const [series, setSeries] = useState<Array<any>>([]);
    const [view, setView] = useState<IModelVariantModel>({} as IModelVariantModel);
    const [minimumValue, setMinimumValue] = useState<any>(0);
    const [maximumValue, setMaximumValue] = useState<any>(0);
    const [showToast, setShowToast] = useState(false);

    const onSubmit: SubmitHandler<IModelVariantModel> = (data) => {
        if (parseInt(maximumValue) < parseInt(minimumValue)) {
            return setShowToast(true);
        }
        data.Specification = "";
        ModelVariantServices.Edit(data).then((res: any) => {
            if (res.status === 200)
                window.location.href = "/ModelVarientDashbord";
            alert("Edited successfully")
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

    const Cancel = () => {
        window.location.href = "/ModelVarientDashbord";
    }

    const GetSeries = (e: any) => { };
    const GetProduct = (e: any) => { };
    const GetThreshold = (e: any) => { };

    useEffect(() => {
        const GetModelView = (id: number) => {
            ModelVariantServices.GetModel(id).then(res => {
                if (res.status === 200) {
                    setView(res.data);
                    reset(res.data);
                }
            }).catch(e => {
                console.log(e);
            });
        }

        ProductTypeServicesData();
        GetThresholdCategory();
        GetProductCategoryList();
        GetModelView(id);
    }, [id, reset]);


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
                                        <IonItem><IonTitle className="pv_font-weight">ModelVariantEdit</IonTitle> </IonItem>
                                    </IonCol>
                                </IonRow>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <IonRow>
                                        <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Product Type"} data={ProductList} value={view.ProductTypeId} {...register("ProductTypeId", { required: true })} onIonChange={(e: any) => GetBrandMasterByProductId(e)} />
                                            {errors.ProductTypeId && (<IonText color='danger' className="error-padding">Please Select ProductType </IonText>)}
                                        </IonCol>
                                        <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Brand Masters"} data={Brand} value={view.BrandMasterId} {...register("BrandMasterId", { required: true })} onIonChange={(e: any) => GetBrands(e)} />
                                            {errors.BrandMasterId && (<IonText color='danger' className="error-padding">Please Select BrandMaster </IonText>)}
                                        </IonCol>
                                        {/* <IonCol sizeLg="4" sizeXl="4" sizeMd="12" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Brand Series"} data={ModelDropDownData} value={view.BrandSeriesId} {...register("BrandSeriesId", { required: true })} onIonChange={(e: any) => GetModel(e)} />
                                        </IonCol> */}
                                    </IonRow>
                                    <IonRow>
                                        <IonCol sizeLg="4" sizeXl="4" sizeMd="12" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Series Model"} data={series} value={view.SeriesModelId} {...register("SeriesModelId", { required: true })} onIonChange={(e: any) => GetSeries(e)} />
                                            {errors.SeriesModelId && (<IonText color='danger' className="error-padding">Please Select SeriesModel </IonText>)}
                                        </IonCol>
                                        <IonCol sizeLg="4" sizeXl="4" sizeMd="12" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Product Category"} data={categoryList} value={view.ProductCategoryId} {...register("ProductCategoryId", { required: true })} onIonChange={(e: any) => GetProduct(e)} />
                                            {errors.ProductCategoryId && (<IonText color='danger' className="error-padding">Please Select ProductCategory </IonText>)}
                                        </IonCol>
                                        <IonCol sizeLg="4" sizeXl="4" sizeMd="12" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Threshold Category"} data={thresholdCategoryList} value={view.ThresholdCategoryId} {...register("ThresholdCategoryId", { required: true })} onIonChange={(e: any) => GetThreshold(e)} />
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
                                            <IonButton className="bg-success" color="white" size="small" type="submit">Update</IonButton>
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

export default ModelVariantEdit;