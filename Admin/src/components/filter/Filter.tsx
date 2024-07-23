import { InputHTMLAttributes, useEffect, useState } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow, IonText, IonDatetime } from "@ionic/react";
import { caretDown } from "ionicons/icons";

import { FilterDataId } from "../../features/reducers/filterdata/FilterData.Reducers";
import { UserNameData } from "../../features/reducers/username/UserName.Reducers";
import { useTypedDispatch, useTypedSelector } from "../../features/reduxhooks/ReduxHooks";

import MasterServices from "../../services/Master.Services";
import MasterService from "../../services/Master.Services";
import ProductTypeServices from "../../services/ProductType.Services";

import { HelperConstant } from "../helper/HelperConstant";
import { CustomDropdown } from "../shared/CustomDropdown";

import moment from "moment";

import './Filter.css';
import { useParams } from "react-router";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    onClickSell: any,
    onClickRepair: any,
}

interface Param {
    orderId: string
}

function Filter({ onClickSell, onClickRepair }: inputProps) {

    let dispatch = useTypedDispatch();
    const { orderId } = useParams<Param>();

    let isCompletedTile: boolean = parseInt(orderId) === HelperConstant.dashboardNameIndex.CompletedOrders ? true : false;

    let productId = useTypedSelector(state => state.FilterDataReducers.productId);
    let brandId = useTypedSelector(state => state.FilterDataReducers.BrandId);
    let modelId = useTypedSelector(state => state.FilterDataReducers.ModelId);
    let cityId = useTypedSelector(state => state.FilterDataReducers.CityId);
    let PromoCode = useTypedSelector(state => state.FilterDataReducers.PromoCode);
    let FromDate = useTypedSelector(state => state.FilterDataReducers.FromDate);
    let ToDate = useTypedSelector(state => state.FilterDataReducers.ToDate);
    let CompletedStartDate = useTypedSelector(state => state.FilterDataReducers.CompletedStartDate);
    let CompletedEndDate = useTypedSelector(state => state.FilterDataReducers.CompletedEndDate);

    const [productList, setProductList] = useState<Array<any>>([]);
    const [brandList, setBrandList] = useState<Array<any>>([]);
    const [modelList, setModelList] = useState<Array<any>>([]);
    const [cityList, setCityList] = useState<Array<any>>([]);
    const [PromoCodes, setPromoCodes] = useState<Array<any>>([]);
    const [showFormDate, setShowFromDate] = useState(false);
    const [showToDate, setShowToDate] = useState(false);
    const [selected, setSelected] = useState<string>('');
    const [fromDate, setFromDate] = useState<any>('');
    const [toDate, setToDate] = useState<any>('');
    const [ProductTypevalue, setProductTypevalue] = useState<any>(0);
    const [brandValue, setBrandValue] = useState<any>(0);
    const [modelvalue, setModelvalue] = useState<any>(0);
    const [CityValue, setCityValue] = useState<any>(0);
    const [PromoCodeValue, setPromoCodeValue] = useState<any>(0);
    const [showCompletedFormDate, setShowCompletedFromDate] = useState(false);
    const [showCompletedToDate, setShowCompletedToDate] = useState(false);
    const [completedFromDate, setCompletedFromDate] = useState<any>('');
    const [completedToDate, setCompletedToDate] = useState<any>('');

    const ProductTypeServicesData = () => {
        setProductList([]);
        setBrandValue(0);
        setModelvalue(0);
        ProductTypeServices.GetList().then(res => {
            if (res.status === 200) {
                setProductList(res.data);
            }
        }).catch(res => {
            console.log(res);
        });
    }

    const GetBrandMasterByProductId = (ProductId: any, holdValue?: "yes" | "no") => {
        setBrandValue(0);
        setModelvalue(0);
        setProductTypevalue(ProductId);
        if (ProductId > 0) {
            MasterService.GetBrandMasterByProductId(ProductId, HelperConstant.serviceTypeId.SELL).then(res => {
                if (res.status === 200) {
                    if (ProductId && ProductId > 0) {
                        setBrandList(res.data);
                        dispatch(FilterDataId({ payload: parseInt(ProductId), type: "ProductId" }));
                        if (holdValue !== "yes") {
                            dispatch(FilterDataId({ payload: null, type: "BrandId" }));
                            dispatch(FilterDataId({ payload: null, type: "ModelId" }));
                        }
                    }
                }
            });
        }
    }

    const GetSeriesModelByBrandMasterId = (BrandId: any, holdValue?: "yes" | "no") => {
        setModelList([]);
        setModelvalue(0);
        setBrandValue(BrandId);
        if (BrandId > 0) {
            MasterService.GetSeriesModelByBrandMasterId(BrandId, HelperConstant.serviceTypeId.SELL).then(res => {
                if (res.status === 200) {
                    if (BrandId && BrandId > 0) {
                        setModelList(res.data);
                        dispatch(FilterDataId({ payload: parseInt(BrandId), type: "BrandId" }));
                        if (holdValue !== "yes") {
                            dispatch(FilterDataId({ payload: null, type: "ModelId" }));
                        }
                    }

                }
            }).catch(res => {
                console.log(res);
            });
        }
    }

    const GetModelId = (ModelId: any) => {
        if (ModelId && ModelId > 0) {
            dispatch(FilterDataId({ payload: parseInt(ModelId), type: "ModelId" }));
            setModelvalue(ModelId);
        }
    }

    const GetCityList = () => {
        setCityList([]);
        MasterServices.GetDistrictList(HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setCityList(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const GetPromoCodes = () => {
        MasterServices.GetPromoCodes().then(res => {
            if (res.status === 200) {
                setPromoCodes(res.data);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const cityFilterData = (city: any) => {
        if (city && city > 0) {
            dispatch(FilterDataId({ payload: city, type: "CityId" }));
            setCityValue(city);
        }
    }

    const PromoCodeFilterData = (PromoCode: any) => {
        if (PromoCode && PromoCode > 0) {
            dispatch(FilterDataId({ payload: PromoCode, type: "PromoCode" }));
            setPromoCodeValue(PromoCode);
        }
    }

    const reset = () => {
        let today = new Date();
        let priorDate = new Date(new Date().setDate(today.getDate() - 90));

        setProductTypevalue(0);
        setBrandValue(0);
        setModelvalue(0);
        setCityValue(0);
        setPromoCodeValue(0);
        dispatch(UserNameData(''));
        dispatch(FilterDataId({ payload: null, type: "CityId" }));
        dispatch(FilterDataId({ payload: 0, type: "ProductId" }));
        dispatch(FilterDataId({ payload: null, type: "BrandId" }));
        dispatch(FilterDataId({ payload: null, type: "ModelId" }));
        dispatch(FilterDataId({ payload: null, type: "PromoCode" }));
        dispatch(FilterDataId({ payload: priorDate, type: "FromDate" }));
        dispatch(FilterDataId({ payload: null, type: "ToDate" }));
        dispatch(FilterDataId({ payload: null, type: "CompletedStartDate" }));
        dispatch(FilterDataId({ payload: null, type: "CompletedEndDate" }));

        setSelected("");
    }

    const datetime = (value: any) => {
        if (value) {
            dispatch(FilterDataId({ payload: value, type: "FromDate" }));
            if (moment(value).format("L") > moment(ToDate).format("L")) {
                dispatch(FilterDataId({ payload: null, type: "ToDate" }));
            }
            setTimeout(() => { setShowFromDate(false) }, 300);
        }
    }

    const datetime2 = (value: any) => {
        if (value) {
            dispatch(FilterDataId({ payload: value, type: "ToDate" }));
            setTimeout(() => { setShowToDate(false) }, 300);
        }
    }

    const dateValidation = () => {
        if (FromDate !== null) {
            const result = moment(FromDate).format();
            setFromDate(result);
        }
        if (ToDate !== null) {
            const result = moment(ToDate).format();
            setToDate(result);
        }
        if (CompletedStartDate !== null) {
            const result = moment(CompletedStartDate).format();
            setCompletedFromDate(result);
        }
        if (CompletedEndDate !== null) {
            const result = moment(CompletedEndDate).format();
            setCompletedToDate(result);
        }
    }

    const completedStarttime = (value: any) => {
        if (value) {
            dispatch(FilterDataId({ payload: value, type: "CompletedStartDate" }));
            if (moment(value).format("L") > moment(CompletedEndDate).format("L")) {
                dispatch(FilterDataId({ payload: null, type: "CompletedEndDate" }));
            }
            setTimeout(() => { setShowCompletedFromDate(false) }, 300);
        }
    }

    const completedEndtime2 = (value: any) => {
        if (value) {
            dispatch(FilterDataId({ payload: value, type: "CompletedEndDate" }));
            setTimeout(() => { setShowCompletedToDate(false) }, 300);
        }
    }

    useEffect(() => {
        ProductTypeServicesData();
        GetCityList();
        GetPromoCodes();
        dateValidation();
    }, []);

    useEffect(() => {
        const autoTriggerMasters = () => {
            productId > 0 && GetBrandMasterByProductId(productId, "yes");
            brandId > 0 && GetSeriesModelByBrandMasterId(brandId, "yes");
            modelId > 0 && GetModelId(modelId);
        }
        autoTriggerMasters();
    }, []);

    return (
        <IonGrid>
            <IonRow>
                <IonCol sizeXl="6" sizeLg="6" sizeMd="12" sizeXs="12">
                    <IonItem>
                        <IonCol sizeXs='12' sizeMd='12' sizeLg="12" sizeXl="12">
                            <IonText className="cursor-pointer" onClick={() => setShowFromDate(!showFormDate)}>From date</IonText>
                            {FromDate ? <IonText>&nbsp;- {moment(FromDate).format("DD-MMM-YYYY")}</IonText> : null}
                            <IonIcon className="fl-Icon cursor-pointer" icon={caretDown} onClick={() => setShowFromDate(!showFormDate)}></IonIcon>
                            {showFormDate && <IonDatetime value={fromDate} presentation="date" onIonChange={(e) => { datetime(e.detail.value); setFromDate(e.detail.value); }}></IonDatetime>}
                        </IonCol>
                    </IonItem>
                </IonCol>
                <IonCol sizeXl="6" sizeLg="6" sizeMd="12" sizeXs="12">
                    <IonItem>
                        <IonCol sizeXs='12' sizeMd='12' sizeLg="12" sizeXl="12">
                            <IonText className="cursor-pointer" onClick={() => setShowToDate(!showToDate)}>To date</IonText>
                            {ToDate ? <IonText>&nbsp;- {moment(ToDate).format("DD-MMM-YYYY")}</IonText> : null}
                            <IonIcon className="fl-Icon cursor-pointer" icon={caretDown} onClick={() => setShowToDate(!showToDate)}></IonIcon>
                            {(showToDate && (fromDate === "" || FromDate === null)) ?
                                <IonText color="danger"><br /> Please Select the From date</IonText>
                                :
                                (showToDate && (fromDate || FromDate)) && <IonDatetime value={toDate} presentation="date" min={fromDate} onIonChange={(e) => { datetime2(e.detail.value); setToDate(e.detail.value) }}></IonDatetime>}
                        </IonCol>
                    </IonItem>
                </IonCol>
                {isCompletedTile === true ?
                    <>
                        <IonCol sizeXl="6" sizeLg="6" sizeMd="12" sizeXs="12">
                            <IonItem>
                                <IonCol sizeXs='12' sizeMd='12' sizeLg="12" sizeXl="12">
                                    <IonText className="cursor-pointer" onClick={() => setShowCompletedFromDate(!showCompletedFormDate)}>Completed From Date</IonText>
                                    {CompletedStartDate ? <IonText>&nbsp;- {moment(CompletedStartDate).format("DD-MMM-YYYY")}</IonText> : null}
                                    <IonIcon className="fl-Icon cursor-pointer" icon={caretDown} onClick={() => setShowCompletedFromDate(!showCompletedFormDate)}></IonIcon>
                                    {showCompletedFormDate && <IonDatetime value={completedFromDate} presentation="date" onIonChange={(e) => { completedStarttime(e.detail.value); setCompletedFromDate(e.detail.value); }}></IonDatetime>}
                                </IonCol>
                            </IonItem>
                        </IonCol>
                        <IonCol sizeXl="6" sizeLg="6" sizeMd="12" sizeXs="12">
                            <IonItem>
                                <IonCol sizeXs='12' sizeMd='12' sizeLg="12" sizeXl="12">
                                    <IonText className="cursor-pointer" onClick={() => setShowCompletedToDate(!showCompletedToDate)}>Completed To Date</IonText>
                                    {CompletedEndDate ? <IonText>&nbsp;- {moment(CompletedEndDate).format("DD-MMM-YYYY")}</IonText> : null}
                                    <IonIcon className="fl-Icon cursor-pointer" icon={caretDown} onClick={() => setShowCompletedToDate(!showCompletedToDate)}></IonIcon>
                                    {(showCompletedToDate && (completedFromDate === "" || CompletedStartDate === null)) ?
                                        <IonText color="danger"><br /> Please Select the From date</IonText>
                                        :
                                        (showCompletedToDate && (completedFromDate || CompletedStartDate)) && <IonDatetime value={completedToDate} presentation="date" min={completedFromDate} onIonChange={(e) => { completedEndtime2(e.detail.value); setCompletedToDate(e.detail.value); }}></IonDatetime>}
                                </IonCol>
                            </IonItem>
                        </IonCol>
                    </>
                    :
                    <></>
                }

                <IonCol sizeXs='12' sizeMd='12' sizeLg="6" sizeXl="6">
                    <CustomDropdown label={"City"} data={cityList} value={CityValue !== 0 ? CityValue : cityId} onIonChange={(e: any) => cityFilterData(e)} />
                </IonCol>
                <IonCol sizeXs='12' sizeMd='12' sizeLg="6" sizeXl="6">
                    <CustomDropdown label={"Promo code"} data={PromoCodes} value={PromoCodeValue !== 0 ? PromoCodeValue : PromoCode} onIonChange={(e: any) => PromoCodeFilterData(e)} />
                </IonCol>
                <IonCol sizeXs='12' sizeMd='12' sizeLg="12" sizeXl="12">
                    <CustomDropdown label={"Gadget"} data={productList} value={ProductTypevalue !== 0 ? ProductTypevalue : productId} onIonChange={(e: any) => GetBrandMasterByProductId(e)} />
                </IonCol>
                <IonCol sizeXs='12' sizeMd='12' sizeLg="12" sizeXl="12">
                    <CustomDropdown label={"Brand"} data={brandList} value={brandValue !== 0 ? brandValue : brandId} onIonChange={(e: any) => GetSeriesModelByBrandMasterId(e)} disabled={!(brandList.length > 0)} />
                </IonCol>
                <IonCol sizeXs='12' sizeMd='12' sizeLg="12" sizeXl="12">
                    <CustomDropdown label={"Model"} data={modelList} value={modelvalue !== 0 ? modelvalue : modelId} onIonChange={(e: any) => GetModelId(e)} disabled={!(modelList.length > 0)} />
                </IonCol>
                <IonCol sizeXs='4' sizeMd='4' sizeLg="4" sizeXl="4">
                    <IonRadioGroup allowEmptySelection value={"sell"} onIonChange={e => setSelected(e.detail.value)} >
                        <IonItem lines="none" color="transparent" className="filter-items">
                            <IonRadio onClick={onClickSell} value="sell" />&nbsp;
                            <IonLabel>Sell</IonLabel>
                        </IonItem>
                    </IonRadioGroup>
                </IonCol>
                <IonCol sizeXs='4' sizeMd='4' sizeLg="4" sizeXl="4">
                    <IonRadioGroup allowEmptySelection value={selected} onIonChange={e => setSelected(e.detail.value)} >
                        <IonItem disabled={true} lines="none" color="transparent" className="filter-items">
                            <IonRadio onClick={onClickRepair} value="repair" />&nbsp;
                            <IonLabel>Repair</IonLabel>
                        </IonItem>
                    </IonRadioGroup>
                </IonCol>
                {/* <IonCol className="ion-align-self-center" sizeXs='6' sizeMd='3' sizeLg="2" sizeXl="3">
                    <IonButtons>
                        <IonButton onClick={() => downloadInvoice()} color="default" size='small' data-tip="Download">
                            <CustomImg style={{ height: "30px" }} src={require('../../assets/images/excel.png')} alt="download-excel" />
                        </IonButton>
                    </IonButtons>
                </IonCol> */}
                <IonCol className="ion-align-self-center" sizeXs='4' sizeMd='4' sizeLg="4" sizeXl="4">
                    <IonButton size="small" color="warning" onClick={() => reset()} >Reset</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid >
    )
}

export default Filter