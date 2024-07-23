import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow, IonText, IonTitle } from "@ionic/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { HelperConstant } from "../../../../components/helper/HelperConstant";
import MenuButton from "../../../../components/menubutton/MenuButton";
import { CustomDropdown } from "../../../../components/shared/CustomDropdown";
import { CustomInput } from "../../../../components/shared/CustomInput";
import { ISeriesModel } from "../../../../models/Series.Model";
import MasterServices from "../../../../services/Master.Services";
import ProductTypeServices from "../../../../services/ProductType.Services";
import SeriesModelServices from "../../../../services/SeriesModel.Services";
import "../../SeriesModel.css"

function SeriesModelEdit() {
    const { id } = useParams<{ id: any }>();
    const { register, handleSubmit, reset, formState: { errors }} = useForm<ISeriesModel>();
    const [ProductList, setProductList] = useState<Array<any>>([]);
    const [Brand, setBrand] = useState<Array<any>>([]);
    const [OsType, setOsType] = useState<Array<any>>([]);
    const [view, setView] = useState<ISeriesModel>({} as ISeriesModel);

    const onEditSeries: SubmitHandler<ISeriesModel> = (views) => {
        views.BrandSeriesId = view.BrandSeriesId;
        views.Specification = "";
        SeriesModelServices.Edit(views).then((res: any) => {
            if (res.status === 200)
                window.location.href = "/SeriesModelDashbord";
            alert("Edited success fully")
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
        MasterServices.GetOSTypebyGadgetId(productTypeId).then(res => {
            setOsType(res.data);
        });
    }

    const GetBrands = (BrandId: number) => {
        MasterServices.GetBrandSeriesByBrandMasterId(BrandId, HelperConstant.serviceTypeId.SELL).then(res => {
        })
    }

    const GetOsType = (e: any) => { };

    const Cancel = () => {
        window.location.href = "/SeriesModelDashbord";
    }

    useEffect(() => {
        const GetSeriesView = (id: number) => {
            SeriesModelServices.View(id).then(res => {
                if (res.status === 200) {
                    setView(res.data);
                    reset(res.data)
                }
            }).catch(e => {
                console.log(e);
            });
        }
        ProductTypeServicesData();
        GetSeriesView(id);
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
                                        <IonItem><IonTitle className="pv_font-weight">SeriesModelEdit</IonTitle> </IonItem>
                                    </IonCol>
                                </IonRow>
                                <form onSubmit={handleSubmit(onEditSeries)}>
                                    <IonRow>
                                        <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Product Type"} value={view.ProductTypeId} data={ProductList} {...register("ProductTypeId", { required: true })} onIonChange={(e: any) => GetBrandMasterByProductId(e)} />
                                            {errors.ProductTypeId && (<IonText color='danger' className="error-padding">Please Select ProductType </IonText>)}
                                        </IonCol>
                                        <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                            <CustomDropdown label={"Brand Masters"} value={view.BrandMasterId} data={Brand} {...register("BrandMasterId", { required: true })} onIonChange={(e: any) => GetBrands(e)} />
                                            {errors.BrandMasterId && (<IonText color='danger' className="error-padding">Please Select BrandMaster </IonText>)}
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol sizeLg="12" sizeXl="12" sizeMd="12" sizeSm="12" sizeXs="12">
                                            <IonRow>
                                                <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                                    <CustomDropdown label={"OsType"} value={view.OsTypeId} data={OsType} {...register("OsTypeId", { required: true })} onIonChange={(e: any) => GetOsType(e)} />
                                                    {errors.OsTypeId && (<IonText color='danger' className="error-padding">Please Select OsType </IonText>)}
                                                </IonCol>
                                                <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                                                    <CustomInput label={"Name"} placeholder="typehere" {...register("Name", { required: true })} />
                                                    {errors.Name && (<IonText color='danger' className="error-padding">Please Enter Name </IonText>)}
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                        {/* <IonCol>
                                            <IonRow>
                                                <IonCol sizeLg="6" sizeXl="6" offsetLg="3" offsetXl="3" sizeMd="12" sizeSm="12" sizeXs="12">
                                                    <IonGrid>
                                                        <IonCard >
                                                            <IonCardHeader >
                                                                <IonImg src={`${HelperConstant.imageAPI}/${view.ThumbnailPath}`} className="imagesize" />
                                                            </IonCardHeader>
                                                            <IonCardContent className="text-center"> <IonLabel>Series</IonLabel> </IonCardContent>
                                                        </IonCard>
                                                    </IonGrid>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol> */}
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
                </IonGrid>
            </IonContent >
        </IonPage >
    );
}

export default SeriesModelEdit;