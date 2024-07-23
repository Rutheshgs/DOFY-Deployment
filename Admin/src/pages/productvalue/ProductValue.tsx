import { useEffect, useMemo, useState } from "react";

import { addOutline, closeCircleOutline, homeOutline, pencilOutline, saveOutline, caretBackCircleOutline, optionsOutline, closeOutline } from "ionicons/icons";
import { IonBadge, IonButton, IonButtons, IonCard, IonCardHeader, IonCheckbox, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRadio, IonRadioGroup, IonRouterLink, IonRow, IonSelect, IonSelectOption, IonText, IonThumbnail, IonTitle, IonToast, } from "@ionic/react";

import "./ProductValue.css";

import { IproductValue, IProductVariantModel } from "../../models/productvalue.Model";
import { ICategoryModel } from "../../models/CategoryList.Model";
import { IThresholdCategoryModel } from "../../models/ThresholdCategory.Model";
import UpdateModelVariantsService from "../../services/UpdateModelVariants.Services";
import ProductTypeServices from "../../services/ProductType.Services";
import MasterService from "../../services/Master.Services";

import { CustomDataTable } from "../../components/shared/custom-data-table/CustomDataTable";
import { ProductVarients } from "./variants/ProductVarients";
import { CustomDropdown } from "../../components/shared/CustomDropdown";
import { HelperConstant } from "../../components/helper/HelperConstant";
import { CustomImg } from "../../components/shared/CustomImage";
import { getLocalStorage, isIn, isValidUser, isValidUserAuthenticate } from "../../components/helper/Helper";
import { getDecodedAccessToken } from "../../components/helper/TokenHelper";
import { useTypedSelector } from "../../features/reduxhooks/ReduxHooks";

function ProductValue() {

  const [showModal, setShowModal] = useState(false);
  const [ModelDropDownData, setModelDropDownData] = useState<Array<any>>([]);
  const [ProductList, setProductList] = useState<Array<any>>([]);
  const [Brand, setBrand] = useState<Array<any>>([]);
  const [BrandModel, setBrandModel] = useState<Array<IproductValue>>([]);
  const [BrandId, setBrandId] = useState<any>();
  const [ModelId, setModelId] = useState<any>();
  const [ProductType, setProductType] = useState<any>();
  const [ModelVarientedit, setModelVarientedit] = useState<Array<IproductValue>>([]);
  const [UpdateModelVarient] = useState<IproductValue>(
    {
      Id: 0,
      Created: "2022-04-25T11:12:41.409Z",
      CreatedBy: 0,
      Active: true,
      Modified: "2022-04-25T11:12:41.409Z",
      ModifiedBy: 0,
      ValidationErrors: {},
      Name: "string",
      ThumbnailPath: "string",
      RowOrder: 0,
      Variants: [],
    }
  );

  const [CategoryId, setCategoryId] = useState<number>();
  const [showToast, setShowToast] = useState(false);
  const [showToastPrice, setShowToastPrice] = useState(false);
  // const [thresholdCategoryId, setThresholdCategoryId] = useState<number>();

  const [categoryList, setCategoryList] = useState<Array<ICategoryModel>>([]);
  const [thresholdCategoryList, setThresholdCategoryList] = useState<Array<IThresholdCategoryModel>>([]);

  let isMobile = useTypedSelector(state => state.FindDevice.isMobile);
  let isTablet = useTypedSelector(state => state.FindDevice.isTablet);

  const ProductTypeServicesData = () => {
    ProductTypeServices.GetList().then(res => {
      if (res.status === 200) {
        setProductList(res.data);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  const GetProductCategoryList = () => {
    MasterService.GetProductCategory().then(res => {
      if (res.status === 200) {
        setCategoryList(res.data);
        setCategoryId(res.data[0].Id);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  const GetThresholdCategory = () => {
    MasterService.GetThresholdCategory().then(res => {
      if (res.status === 200) {
        setThresholdCategoryList(res.data);
        // setThresholdCategoryId(res.data[0].Id);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    isValidUser(getDecodedAccessToken(getLocalStorage().Token));
    isValidUserAuthenticate(getDecodedAccessToken(getLocalStorage().Token));
    ProductTypeServicesData();
    GetProductCategoryList();
    GetThresholdCategory();
  }, []);

  const onChangeCategory = (e: any) => {
    setCategoryId(e.detail.value);
    setModelDropDownData([]);
    setBrandModel([]);
    if (BrandId > 0) {
      GetBrands(BrandId, e.detail.value);
    }
  }

  const GetBrandMasterByProductId = (productTypeId: number) => {
    setBrandModel([]);
    setBrand([]);
    MasterService.GetBrandMasterByProductId(productTypeId, HelperConstant.serviceTypeId.SELL).then(res => {
      if (res.status === 200) {
        setBrand(res.data);
        setProductType(productTypeId);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  const GetBrands = (BrandId: any, category?: any) => {
    setBrandId(BrandId);
    let categoryData = category > 0 ? category : CategoryId;
    UpdateModelVariantsService.GetVariants(BrandId, "", ProductType, categoryData).then(res => {
      if (res.status === 200) {
        setBrandModel(res.data);
        setModelId("");
        setModelDropDownData(res.data);
        setSearch(res.data);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  const GetModelData = (seriesModelId: any) => {
    UpdateModelVariantsService.GetVariants("", seriesModelId, ProductType, CategoryId).then(res => {
      if (res.status === 200) {
        setBrandModel(res.data);
        setModelId(seriesModelId);
        setBrandId("");
      }
    }).catch(e => {
      console.log(e);
    });
  }

  const UpdateModelVarients = (BrandId: any) => {
    let bPrice = true;
    if (UpdateModelVarient.Variants.length > 0) {
      //var priceCheck = UpdateModelVarient.Variants;
      UpdateModelVarient.Variants.forEach(element => {
        if (element.MinimumValue === null || element.MinimumValue === "" || element.MaximumValue === null || element.MaximumValue === "") {
          bPrice = false;
          return setShowToastPrice(true);
        }
        else if (element.MaximumValue < element.MinimumValue) {
          bPrice = false;
          return setShowToast(true);
        }
      });
      if (bPrice) {
        UpdateModelVariantsService.UpdateModelVarients(UpdateModelVarient).then((res) => {
          if (res.status === 200) {
            setShowModal(false);
            UpdateModelVarient.Variants = [];
            if (BrandId !== "") {
              GetBrands(BrandId);
            }
            if (BrandId === "") {
              GetModelData(ModelId);
            }
          }
        }).catch(e => {
          console.log(e);
        });
      }
    }
  }

  const onChangeCategoryHandler = (item: Array<IProductVariantModel>, value: any, type: "productCategoryName" | "thresholdCategoryName") => {
    if (type === "productCategoryName") {
      for (const res of item) {
        res.ProductCategoryId = value;
      }
      UpdateModelVarient.Variants = item;
    }

    if (type === "thresholdCategoryName") {
      for (const res of item) {
        res.ThresholdCategoryId = value;
      }
      UpdateModelVarient.Variants = item;
    }
  }

  //priceUpdate function
  const priceUpdate = (item: IProductVariantModel, value: any, Id: any, type: "minValue" | "maxValue" | "productCategoryName" | "thresholdCategoryName") => {
    if (type === "minValue") {
      //if (value > item.MaximumValue) { return setShowToast(true); }
      let fIndex = UpdateModelVarient.Variants.findIndex(it => it.Id === item.Id);
      if (fIndex >= 0) {
        // UpdateModelVarient.Id = Id;
        item.MinimumValue = value;
        UpdateModelVarient.Variants[fIndex] = item;
      }
      else {
        item.MinimumValue = value;
        UpdateModelVarient.Variants.push(item);
      }
    }
    if (type === "maxValue") {
      //if (value < item.MinimumValue) { return setShowToast(true); }
      let fIndex = UpdateModelVarient.Variants.findIndex(it => it.Id === item.Id);
      if (fIndex >= 0) {
        // UpdateModelVarient.Id = Id
        item.MaximumValue = value;
        UpdateModelVarient.Variants[fIndex] = item;
      }
      else {
        item.MaximumValue = value;
        UpdateModelVarient.Variants.push(item);
      }
    }
  }

  const changeDisplyList = (value: any, result: any) => {
    if (value) {
      value.DisplayInList = result;
      let index = UpdateModelVarient.Variants.findIndex(item => item.Id === value.Id);
      index >= 0 ? UpdateModelVarient.Variants[index] = value : UpdateModelVarient.Variants.push(value);
    }
  }

  const screenRefresh = () => {
    window.location.reload();
  }

  const [Search, setSearch] = useState([]);
  const handleFilter = (text: any) => {
    if (text !== '') {
      const newData: any = BrandModel.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(text.toLowerCase())
      });
      setBrandModel(newData);
    } else {
      setBrandModel(Search);
    }
  };

  const columns = useMemo(
    () => [
      {
        name: 'Product Name',
        selector: (row: any) => row.Name,
        sortable: true,
        width: isMobile ? "21%" : isTablet ? "18%" : "15%",
        cell: (row: any) =>
          <IonGrid>
            <IonRow>
              <IonCol sizeXs="12">
                <IonThumbnail style={{ alignItems: 'center' }}>
                  <CustomImg style={{ width: '50px' }} src={`${HelperConstant.imageAPI}/${row.ThumbnailPath}`} />
                </IonThumbnail>
                <IonLabel>{row.Name}</IonLabel>
              </IonCol>
            </IonRow>
          </IonGrid>,
      },
      {
        name: 'Variants',
        width: isMobile ? "13.9%" : isTablet ? "30%" : "45%",
        selector: (row: any) => row.Id,
        cell: (row: any) =>
          <IonGrid>
            <IonRow className={isTablet ? "pv-custom-customtable-row" : isMobile ? "pv-custom-customtable-row-mob" : ""}>
              {row.Variants.map((genre: any, i: any) =>
                <IonCol sizeXl="4" sizeLg="6" sizeMd="6" sizeSm="12" className={isTablet ? "pv-custom-customtable-col" : isMobile ? "pv-custom-customtable-col-mob" : ""} key={i}>
                  {<ProductVarients data={genre}></ProductVarients>}
                </IonCol>
              )}
            </IonRow>
          </IonGrid>,
      },
      {
        name: 'Product Category',
        selector: (row: any) => row.Id,
        sortable: false,
        width: isMobile ? "24.7 %" : isTablet ? "20%" : "15%",
        cell: (row: any, index: any, column: any, id: any) => {
          return (
            <IonGrid>
              <IonRow>
                <IonCol sizeXs="12" sizeMd="1" sizeXl="3">
                  <IonBadge color="white">
                    <svg height="42" width="30">
                      <circle cx="20" cy="20" r="5" fill="#6a95f9" />
                    </svg>
                    <IonLabel className="pv-amout-label" color="primary">{row.Variants[0].ProductCategoryName}</IonLabel>
                  </IonBadge>
                </IonCol>
              </IonRow>
            </IonGrid>
          )
        }
      },
      {
        name: 'Threshold Category',
        selector: (row: any) => row.Id,
        sortable: false,
        width: isMobile ? "27.3%" : isTablet ? "21%" : "15%",
        cell: (row: any, index: any, column: any, id: any) => {
          return (
            <IonGrid>
              <IonRow>
                <IonCol sizeXs="12" sizeMd="1" sizeXl="3">
                  <IonBadge color="white" >
                    <svg height="42" width="30">
                      <circle cx="20" cy="20" r="5" fill="#737373" />
                    </svg>
                    <IonLabel className="pv-amout-label" color="teritary">{row.Variants[0].ThresholdCategoryName}</IonLabel>
                  </IonBadge>
                </IonCol>
              </IonRow>
            </IonGrid>
          )
        }
      },
      {
        name: 'Actions',
        selector: (row: any) => row.Id,
        sortable: false,
        width: isMobile ? "13.1%" : isTablet ? "13%" : "10%",
        cell: (row: any, index: any, column: any, id: any) => {
          return (
            <IonRow>
              <IonCol sizeLg="6" sizeMd="1" sizeSm="6" sizeXs="6">
                <IonRouterLink onClick={() => { setShowModal(true); setModelVarientedit([row]) }}>
                  <IonButton size="small" color="primary">
                    <IonIcon icon={pencilOutline} size="small" />
                  </IonButton>
                </IonRouterLink>
              </IonCol>
            </IonRow>
          )
        }
      },
    ],
    [isMobile, isTablet]
  );

  return (
    <IonPage>
      <IonContent>
        <IonGrid className="p-0">
          <IonRow className="page-header ion-padding-top">
            <IonCol sizeLg="12" sizeXl="12" sizeXs="12">
              <IonItem lines="none" color="transparent">
                <IonButton size="small" color="medium" routerLink="/HomePage">
                  <IonIcon size="small" icon={homeOutline} />
                </IonButton>
                <IonTitle>PRODUCT PRICE LIST</IonTitle>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="sa-pattern-bg">
            <IonCol size="12">
              <IonRadioGroup value={CategoryId} onIonChange={(e) => onChangeCategory(e)}>
                <IonRow>
                  <IonCol sizeLg="8" sizeXl="6" sizeXs="12">
                    <IonItem lines="none" color="transparent">
                      <IonIcon icon={optionsOutline} />&nbsp;
                      <IonText>CATEGORY</IonText>
                    </IonItem>
                  </IonCol>
                  {categoryList &&
                    categoryList?.map((val, i) => (
                      <IonCol key={i} sizeLg="1" sizeXl="1.5" sizeXs="6">
                        <IonItem lines="none" color="transparent">
                          <IonRadio value={val.Id}></IonRadio> &nbsp;
                          <IonLabel style={{ color: "white" }}>{val.Name}</IonLabel>
                        </IonItem>
                      </IonCol>
                    ))}
                </IonRow>
              </IonRadioGroup>
            </IonCol>
            <IonCol size="12">
              <IonRow>
                <IonCol sizeXs="12" sizeMd="3">
                  <CustomDropdown label={"Gadget"} data={ProductList} onIonChange={(e: any) => GetBrandMasterByProductId(e)} />
                </IonCol>
                <IonCol sizeXs="12" sizeMd="3">
                  <CustomDropdown label={"Brand"} data={Brand} onIonChange={(e: any) => GetBrands(e)}
                    disabled={!(Brand.length > 0)} />
                </IonCol>
                <IonCol sizeXs="12" sizeMd="3">
                  <CustomDropdown label={"Model"} data={ModelDropDownData} onIonChange={(e: any) => GetModelData(e)}
                    disabled={!(BrandModel.length > 0)} dropDownClassName="pp_dropdown_width" />
                </IonCol>
                <IonCol sizeXs="12" sizeMd="3">
                  <IonRow>
                    <IonCol>
                      <IonButton size="small" onClick={() => screenRefresh()} color="warning">
                        <IonIcon icon={closeCircleOutline}></IonIcon> Reset
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton size="small" onClick={() => window.location.href = "/addproduct"}>
                        <IonIcon icon={addOutline} ></IonIcon>Add Product
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeXl="12" sizeMd="12">
              {BrandModel.length > 0 ?
                <CustomDataTable customPaginationEnable={"No"} headerText={'PRICE LIST'} data={BrandModel} columns={columns}
                  pagination={true} height={'825px'} setsearchData={(e: any) => handleFilter(e)} RecordsCount={BrandModel.length}>
                </CustomDataTable>
                :
                <CustomDataTable headerText={'PRICE LIST'} data={[]} columns={columns}
                  pagination={true} customPaginationEnable={"No"} height={'500px'} setsearchData={(e: any) => handleFilter(e)} RecordsCount={BrandModel.length}>
                </CustomDataTable>}
            </IonCol>
          </IonRow>
          <IonRow>
            {ModelVarientedit?.map((Model, index) => {
              return (
                <IonModal key={index} isOpen={showModal} swipeToClose={true} onDidDismiss={() => setShowModal(false)}
                  className="modal-md">
                  <IonGrid className="ion-padding" style={{ width: '100%' }}>
                    <IonRow>
                      <IonCol size="12" className="ion-text-center">
                        <IonItem>
                          <IonTitle className="pv_font-weight" onClick={() => setShowModal(false)}>{Model.Name}</IonTitle>
                          <IonButtons slot="end" className="cursor-pointer" onClick={() => setShowModal(false)}>
                            <IonIcon icon={closeOutline}></IonIcon>
                          </IonButtons>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                        <IonItem>
                          <IonLabel>Product Category</IonLabel>
                          <IonSelect interface="popover" value={CategoryId} onIonChange={(e) => onChangeCategoryHandler(Model.Variants, e.detail.value, "productCategoryName")}>
                            {categoryList?.map((val, i) => (
                              <IonSelectOption key={i} value={val.Id}>{val.Name}</IonSelectOption>
                            ))}
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol sizeLg="6" sizeXl="6" sizeMd="6" sizeSm="12" sizeXs="12">
                        <IonItem>
                          <IonLabel>Threshold Category</IonLabel>
                          <IonSelect interface="popover" value={Model.Variants[0].ThresholdCategoryId} onIonChange={(e) => onChangeCategoryHandler(Model.Variants, e.detail.value, "thresholdCategoryName")}>
                            {thresholdCategoryList?.map((val, i) => (
                              <IonSelectOption key={i} value={val.Id}>{val.Name}</IonSelectOption>
                            ))}
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    <IonContent scrollY={true} style={{ minHeight: '250px', maxHeight: '60%' }}>
                      <IonRow>
                        {Model.Variants?.map((item, index) => {
                          return (
                            <IonCol key={index} sizeLg="3" sizeMd="6" sizeXl="3" sizeXs="12" sizeSm="12">
                              {isIn()?
                              <IonCard color="#eee">
                              <IonCardHeader color="light" className="pv-card-header">
                                {item.Name}
                              </IonCardHeader>
                              <IonItem>
                                <IonLabel color="danger" className="pv-label" slot="start">₹ MIN</IonLabel>
                                <IonInput type="number" className="pv_input" value={item.MinimumValue}
                                  onIonChange={(e) => priceUpdate(item, e.detail.value, Model.Id, "minValue")} >
                                </IonInput>

                              </IonItem>
                              <IonItem>
                                <IonLabel color="success" className="pv-label" slot="start">₹ MAX</IonLabel>
                                <IonInput type="number" className="pv_input" value={item.MaximumValue}
                                  onIonChange={(e) => priceUpdate(item, e.detail.value, Model.Id, "maxValue")}>
                                </IonInput>
                              </IonItem>
                              <IonItem>
                                <IonLabel color="warning" className="pv-label">Display For Sale</IonLabel>
                                <IonCheckbox checked={item.DisplayInList} onIonChange={(e) => changeDisplyList(item, e.detail.checked)}>DisplayInList</IonCheckbox>
                              </IonItem>
                            </IonCard>
                            :
                            <IonCard color="#eee">
                                <IonCardHeader color="light" className="pv-card-header">
                                  {item.Name}
                                </IonCardHeader>
                                <IonItem>
                                  <IonLabel color="danger" className="pv-label" slot="start">AED MIN</IonLabel>
                                  <IonInput type="number" className="pv_input" value={item.MinimumValue}
                                    onIonChange={(e) => priceUpdate(item, e.detail.value, Model.Id, "minValue")} >
                                  </IonInput>

                                </IonItem>
                                <IonItem>
                                  <IonLabel color="success" className="pv-label" slot="start">AED MAX</IonLabel>
                                  <IonInput type="number" className="pv_input" value={item.MaximumValue}
                                    onIonChange={(e) => priceUpdate(item, e.detail.value, Model.Id, "maxValue")}>
                                  </IonInput>
                                </IonItem>
                                <IonItem>
                                  <IonLabel color="warning" className="pv-label">Display For Sale</IonLabel>
                                  <IonCheckbox checked={item.DisplayInList} onIonChange={(e) => changeDisplyList(item, e.detail.checked)}>DisplayInList</IonCheckbox>
                                </IonItem>
                              </IonCard>}
                            </IonCol>
                          );
                        })}
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
                      <IonRow>
                        <IonToast
                          color='danger'
                          isOpen={showToastPrice}
                          onDidDismiss={() => setShowToastPrice(false)}
                          message="Minimum and Maximum value should not be Empty"
                          duration={5000}
                        />
                      </IonRow>
                    </IonContent>
                    <IonRow>
                      <IonCol size="6" className="text-end">
                        <IonButton color="danger" onClick={() => { setShowModal(false); }}>
                          <IonIcon icon={caretBackCircleOutline}></IonIcon>
                          Close
                        </IonButton>
                      </IonCol>
                      <IonCol size="6">
                        <IonButton color="warning" onClick={() => UpdateModelVarients(BrandId)} >
                          <IonIcon icon={saveOutline}></IonIcon>
                          Save</IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonModal>
              )
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default ProductValue;
