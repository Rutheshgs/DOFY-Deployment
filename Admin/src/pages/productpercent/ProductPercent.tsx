import { IonButton, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonPage, IonRow, IonText, IonTitle, IonToast } from '@ionic/react';
import { filterCircleOutline, homeOutline, refreshCircleOutline, saveOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { CustomDropdown } from '../../components/shared/CustomDropdown';

import { IThresholdModel } from '../../models/Threshold.Model';
import { IUpdatethresholdModel } from '../../models/UpdateThreshold.Model';

import MasterServices from '../../services/Master.Services';
import ProductTypeServices from '../../services/ProductType.Services';
import QuestionnaireTemplateServices from '../../services/QuestionnaireTemplate.Services';
import { QuestionnaireItem } from './QustionnaireItem/QuestionnaireItem';

import "./ProductPercent.css";
import { getLocalStorage, isValidUser, isValidUserAuthenticate } from '../../components/helper/Helper';
import { getDecodedAccessToken } from '../../components/helper/TokenHelper';

function ProductPercent() {
  const [successToast, setSucessToast] = useState(false);
  const [warningToast, setWarningToast] = useState(false);
  const [ProductList, setProductList] = useState<Array<any>>([])
  const [ProductTypevalue, setProductTypevalue] = useState<any>(0);
  const [catergoryValue, setCategoryValue] = useState<any>(0);
  const [OsTypevalue, setOsTypevalue] = useState<any>(0);
  const [OsType, setOsType] = useState<Array<any>>([]);
  const [Categories, setCategories] = useState<Array<any>>([]);
  const [Threshold, setThreshold] = useState<Array<IThresholdModel>>([]);
  const [result, setResult] = useState<Array<IUpdatethresholdModel>>([]);
  const [savebtndisable, setSavebtndisable] = useState<boolean>();

  useEffect(() => {
    const ProductTypeServicesData = () => {
      screenRefresh();
      ProductTypeServices.GetList().then(res => {
        setProductList(res.data);
      });
    }
    ProductTypeServicesData();
    isValidUser(getDecodedAccessToken(getLocalStorage().Token));
    isValidUserAuthenticate(getDecodedAccessToken(getLocalStorage().Token));

    return () => {
      //your cleanup code codes here
      screenRefresh();
    };
  }, [])

  const GetOSTypebyGadgetId = (productTypeId: any) => {
    setOsType([]);
    setCategories([]);
    setOsTypevalue(0);
    setCategoryValue(0);
    setProductTypevalue(productTypeId);
    setResult([]);
    MasterServices.GetOSTypebyGadgetId(productTypeId).then(res => {
      setOsType(res.data);
    });
  }

  const GetCategorybyOSTypeGadgetId = (osTypeId: any) => {
    setCategories([]);
    setCategoryValue(0);
    setOsTypevalue(osTypeId);
    setResult([]);
    MasterServices.GetCategorybyOSTypeGadgetId(ProductTypevalue, osTypeId).then(res => {
      setCategories(res.data);
    });
  }

  const GetQuestionaireTemplateByCategory = (categoryId: any) => {
    setCategoryValue(categoryId);
    setResult([]);
    if (OsTypevalue > 0 && categoryId > 0) {
      QuestionnaireTemplateServices.GetQuestionaireTemplateByCategory(ProductTypevalue, OsTypevalue, categoryId).then(res => {
        setThreshold(res.data);
        bindResponseData(res.data);
      });
    }
  }

  // const headingCountError = () => {
  //   const total = result.filter((x) => x.type === "Heading")
  //   let sum = total.reduce(function (prev, current) {
  //     return prev + +current.threshold
  //   }, 0)
  //   return sum <= 100;
  // }


  const SubmitOrUpdateTemplate = () => {
    // if (!headingCountError()) {
    GetQuestionaireTemplateByCategory([]);
    setSavebtndisable(false);
    QuestionnaireTemplateServices.SubmitOrUpdateTemplate(result).then((res) => {
      if (res.status === 200) {
        setResult([]);
        setThreshold([]);
        bindResponseData([]);
        setSucessToast(true);
        setSavebtndisable(false);
      }
    }).catch(e => {
      console.log(e);
    })
    // }
    // else {
    //   setWarningToast(true);
    //   setResult(result);
    // }
  }

  //threshold Update function
  const thresholdUpdate = (item: IThresholdModel, value: any) => {
    setSavebtndisable(true);
    let Identifier = item.Identifier;
    let fIndex = result.findIndex(it => it.identifier === Identifier);
    const tempResult: IUpdatethresholdModel = bindData(item, value);
    if (fIndex === -1) {
      result.push(tempResult);
    }
    else {
      result[fIndex] = tempResult;
    }
    setResult(result);
  }

  const bindResponseData = (data: Array<IThresholdModel>) => {
    for (const res of data) {
      const tempResult: IUpdatethresholdModel = bindData(res, res.Threshold);
      result.push(tempResult);
      setResult(result);
    }
  }

  const bindData = (item: IThresholdModel, value: any): IUpdatethresholdModel => {
    return {
      id: item.Id,
      created: item.Created,
      createdBy: item.CreatedBy,
      CategoryId: item.CategoryId,
      active: item.Active,
      modified: item.Modified,
      modifiedBy: item.ModifiedBy,
      validationErrors: {},
      productTypeId: item.ProductTypeId,
      questionnaireTypeId: item.QuestionnaireTypeId,
      questionnaireTypeName: item.QuestionnaireTypeName,
      osTypeId: item.OSTypeId,
      modelVariantId: item.ModelVariantId,
      identifier: item.Identifier,
      parentId: item.ParentId,
      name: item.Name,
      displayName: item.DisplayName,
      enumName: item.EnumName,
      SubHeading: item.SubHeading,
      type: item.Type,
      answerType: item.AnswerType,
      threshold: value,
      rowOrder: item.RowOrder,
      displayInList: item.DisplayInList,
      thresholdLevel: item.ThresholdLevel,
      enabled: item.Enabled,
      thumbnailPath: item.ThumbnailPath,
      isEditable: item.IsEditable,
    };
  }


  const screenRefresh = () => {
    // window.location.reload();
    setCategories([]);
    setThreshold([]);
    setOsType([]);
    setProductTypevalue(0);
    setOsTypevalue(0);
    setCategoryValue(0);
  }

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
                <IonTitle className='pt-title'>PRODUCT THRESHOLD PAGE</IonTitle>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="sa-pattern-bg">
              <IonGrid>
                <IonRow>
                  <IonCol sizeXs="12" sizeMd="3.2">
                    <CustomDropdown label={"Gadget"} data={ProductList} value={ProductTypevalue} onIonChange={(e: any) => GetOSTypebyGadgetId(e)} />
                  </IonCol>
                  <IonCol sizeXs="12" sizeMd="3.5">
                    <CustomDropdown label={"OsType"} data={OsType} value={OsTypevalue} onIonChange={(e: any) => GetCategorybyOSTypeGadgetId(e)} disabled={!(OsType.length > 0)} />
                  </IonCol>
                  <IonCol sizeXs="12" sizeMd="3.3">
                    <CustomDropdown label={"Categories"} data={Categories} value={catergoryValue} onIonChange={GetQuestionaireTemplateByCategory} disabled={!(Categories.length > 0)} />
                  </IonCol>
                  <IonCol sizeXs="12" sizeMd="2">
                    <IonButton className='ion-float-right' onClick={() => screenRefresh()} color="warning">
                      <IonIcon icon={refreshCircleOutline}></IonIcon>
                      Reset
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
          {Threshold.length > 0 ?
            <IonRow>
              <IonCol sizeLg='12' sizeXs='12' sizeMd='12'>
                <QuestionnaireItem data={Threshold} onChangeHandler={thresholdUpdate}></QuestionnaireItem>
              </IonCol>
              <IonCol size='12' offset='6'>
                <IonButton disabled={!savebtndisable} color="warning" onClick={() => SubmitOrUpdateTemplate()}>
                  <IonIcon icon={saveOutline}></IonIcon>
                  Save</IonButton>
                <IonButton color="danger" routerLink='/HomePage' >Cancel</IonButton>
              </IonCol>
            </IonRow>
            :
            <IonCard>
              <IonCardHeader className='ion-text-center' color='light'>
                <IonIcon color='danger' icon={filterCircleOutline}></IonIcon>
                <IonText color='danger'>Choose criteria to view product threshold.</IonText>
              </IonCardHeader>
            </IonCard>
          }

          <IonToast color='success' isOpen={successToast} onDidDismiss={() => setSucessToast(false)}
            message="Your screen have been saved." duration={2000} />
          <IonToast color='danger' isOpen={warningToast} onDidDismiss={() => setWarningToast(false)}
            message="Heading Value Sholud be equal to 100" duration={2000} />
        </IonGrid>

      </IonContent>
    </IonPage>
  )
}

export default ProductPercent;