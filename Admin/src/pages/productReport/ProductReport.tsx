import { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonPage, IonRow, IonText, IonToast, isPlatform } from '@ionic/react'
import { homeOutline, refreshCircle } from 'ionicons/icons';
import { Filesystem, Directory } from '@capacitor/filesystem';

import { CustomDropdown } from '../../components/shared/CustomDropdown';
import { CustomImg } from '../../components/shared/CustomImage';

import ProductTypeServices from '../../services/ProductType.Services';
import MasterService from "../../services/Master.Services";
import SellOrderServices from '../../services/order/sell/SellOrder.Services';
import { ICategoryModel } from '../../models/CategoryList.Model';
import { IDownloadProductReport } from '../../models/DownloadProductReport.Model';
import UpdateModelVariantsService from "../../services/UpdateModelVariants.Services";

import { HelperConstant } from '../../components/helper/HelperConstant';

import FileSaver from 'file-saver';

import "./productReport.css";

function ProductReport() {

    const [categoryList, setCategoryList] = useState<Array<ICategoryModel>>([]);
    const [ProductList, setProductList] = useState<Array<any>>([]);
    const [brandList, setBrandList] = useState<Array<ICategoryModel>>([]);
    const [seriesModelList, setSeriesModelList] = useState<Array<ICategoryModel>>([]);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [productId, setProductId] = useState<any>();
    const [brandId, setBrandId] = useState<any>();
    const [seriesModelId, setSeriesModelId] = useState<any>();
    const [isDownload, setIsDownload] = useState<boolean>(false);
    const [noRecord, setIsNoRecord] = useState<boolean>(false);

    const GetProductCategoryList = () => {
        MasterService.GetProductCategory().then(res => {
            if (res.status === 200) {
                setCategoryList(res.data);
                ProductTypeServicesData();
                setCategoryId(res.data[0].Id);
            }
        }).catch(e => {
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
        MasterService.GetBrandMasterByProductId(productTypeId, HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setBrandList(res.data);
                setProductId(productTypeId);
                setIsNoRecord(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const GetBrands = (BrandId: any, CategoryId: any) => {
        if (BrandId > 0) {
            setSeriesModelList([]);
            // setSeriesModelId(0);
            setBrandId(BrandId);
            UpdateModelVariantsService.GetVariants(BrandId, "", productId, CategoryId === null ? 0 : CategoryId).then(res => {
                if (res.status === 200) {
                    setSeriesModelList(res.data);
                    setIsNoRecord(false);
                }
                if (res.status === 204) {
                    setIsNoRecord(true);
                }
            }).catch(e => {
                console.log(e);
            });
        }
    }

    const getSeriesModel = (seriesModelId: any) => {
        setSeriesModelId(seriesModelId);
    }

    const screenRefresh = () => {
        window.location.reload();
    }

    const downloadMobileInvoice = async (file: any) => {
        const currentDate = new Date().toLocaleString().replace(/[,:\s]/g, '-');
        const path = `DOFY-${currentDate}-Product-Invoice.csv`;
        Filesystem.writeFile({
            path: path,
            data: file,
            directory: Directory.Documents,
            recursive: true
        });
    }

    const downloadInvoice = () => {
        const data: IDownloadProductReport = {
            CategoryId: categoryId,
            ProductTypeId: productId,
            BrandMasterId: brandId,
            SeriesModelId: seriesModelId,
            SortOrder: "",
            SortOrderColumn: ""
        }
        SellOrderServices.DownloadProductListList(data).then(res => {
            if (res.status === 200) {
                if (isPlatform("android") || isPlatform("ios")) {
                    downloadMobileInvoice(res.data);
                    setIsDownload(true);
                    setTimeout(() => { setIsDownload(false) }, 3000);
                }
                else {
                    const csvContent = atob(res.data);
                    const blob = new Blob([csvContent], { type: "data:application/octet-stream;base64" });
                    const file = new File([blob], `DOFYProductList.csv`, { type: "data:application/octet-stream;base64" });
                    FileSaver.saveAs(file);
                }
            }
        });
    }

    // const reset = () => {
    //     setCategoryList([]);
    //     setCategoryId(0);
    //     setBrandList([]);
    //     setBrandId(0);
    //     setProductList([]);
    //     setProductId(0);
    //     setSeriesModelList([]);
    //     setSeriesModelId(0);
    // }

    useEffect(() => {
        GetProductCategoryList();
    }, []);

    return (
        <IonPage>
            <IonToast
                color="success"
                isOpen={isDownload}
                onDidDismiss={() => setIsDownload(false)}
                message="Downloaded in Documents"
            />
            <IonContent className='pr_background-img'>
                <IonCard className='pr_card-width'>
                    <IonGrid className="p-0">
                        <IonRow>
                            <IonCol sizeLg="12" sizeXl="12" sizeXs="12" className="sa-pattern-bg">
                                <IonItem lines="none" color="transparent">
                                    <IonButton size="small" color="medium" routerLink="/HomePage">
                                        <IonIcon size="small" icon={homeOutline} />
                                    </IonButton>
                                    <IonText className='pr_product'>PRODUCT INVENTORY LIST</IonText>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow className="sa-pattern-bg">
                            <IonCol sizeSm='6' sizeXs='12' sizeLg='12' sizeMd="12" >
                                <CustomDropdown customLabel={true} value={categoryId} label={"Category"} data={categoryList} onIonChange={(e: any) => { setCategoryId(e); GetBrands(brandId, e) }} dropDownClassName="pr_dropdown_width"></CustomDropdown>
                            </IonCol>
                            <IonCol sizeSm='6' sizeXs='12' sizeLg='12' sizeMd="12">
                                <CustomDropdown label={"Gadget"} data={ProductList} onIonChange={(e: any) => GetBrandMasterByProductId(e)} dropDownClassName="pr_dropdown_width"></CustomDropdown>
                            </IonCol>
                            <IonCol sizeSm='6' sizeXs='12' sizeLg='12' sizeMd="12">
                                <CustomDropdown label={"Brand"} data={brandList} onIonChange={(e: any) => GetBrands(e, categoryId)} dropDownClassName="pr_dropdown_width"></CustomDropdown>
                            </IonCol>
                            <IonCol sizeSm='6' sizeXs='12' sizeLg='12' sizeMd="12">
                                {seriesModelList.length > 0 ?
                                    <CustomDropdown label={"Model"} data={seriesModelList} noRecords={false} onIonChange={(e: any) => getSeriesModel(e)} dropDownClassName="pr_dropdown_width"></CustomDropdown>
                                    :
                                    <CustomDropdown label={"Model"} data={seriesModelList} noRecords={true} onIonChange={(e: any) => getSeriesModel(e)} dropDownClassName="pr_dropdown_width"></CustomDropdown>
                                }

                            </IonCol>
                            <IonCol sizeXs='12' sizeLg='12' className='ion-text-center'>
                                <IonButton size='small' color="warning" onClick={() => screenRefresh()}>
                                    <IonIcon icon={refreshCircle}></IonIcon>&nbsp;Reset
                                </IonButton>
                                <IonButton onClick={() => noRecord ? null : downloadInvoice()} color="light" size='small' data-tip="Download">
                                    <CustomImg style={{ height: "30px", cursor: noRecord ? "not-allowed" : "pointer" }} src={require('../../assets/images/excel.png')} alt="download-excel" />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default ProductReport