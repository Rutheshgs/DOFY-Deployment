import { IonGrid, IonPage } from '@ionic/react'
import InProgress from '../../assets/images/Inprogress.png';
import { CustomImg } from '../../components/shared/CustomImage';
import "./AddProduct.css";

function AddProduct() {
  // const [ProductList, setProductList] = useState<Array<any>>([]);
  // const [Brand, setBrand] = useState<Array<any>>([]);
  // const [ProductType, setProductType] = useState<any>();
  // const [BrandModel, setBrandModel] = useState<Array<IproductValue>>([]);


  // useEffect(() => {
  //   const ProductTypeServicesData = () => {
  //     ProductTypeServices.GetList().then(res => {
  //       setProductList(res.data)
  //     })
  //   }
  //   ProductTypeServicesData()
  // }, [])

  // const GetBrandMasterByProductId = (productTypeId: number) => {
  //   MasterService.GetBrandMasterByProductId(productTypeId, 2).then(res => {
  //     setBrand(res.data)
  //     setProductType(productTypeId)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
  // const GetVariants = (BrandId: any) => {
  //   UpdateModelVariantsServices.GetVariants(BrandId, "", ProductType).then(res => {
  //     // console.log(res.data, "varients")
  //     setBrandModel(res.data)
  //   })
  // }


  return (
    <IonPage>
      {/* <IonContent> */}
        <IonGrid>
          {/* <IonRow className="page-header ion-padding-top">
            <IonCol sizeLg="12" sizeXl="12" sizeXs="12">
              <IonItem lines="none" color="transparent">
                <IonButton size="small" color="medium" routerLink="/dashboard">
                  <IonIcon size="small" icon={homeOutline} />
                </IonButton>
                <IonTitle>Add New Device</IonTitle>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonRow>
                <IonCol sizeXs="12" sizeMd="3">
                  <CustomDropdown label={"Gadget"} data={ProductList} onIonChange={(e: any) => GetBrandMasterByProductId(e)} />
                </IonCol>
                <IonCol sizeXs="12" sizeMd="3">
                  <CustomDropdown label={"Brand"} data={Brand} onIonChange={(e: any) => GetVariants(e)}
                    disabled={!(Brand.length > 0)} />
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow> */}
          <CustomImg src={InProgress} className="Ap_Image"/>
        </IonGrid>
      {/* </IonContent> */}


    </IonPage>
  )
}

export default AddProduct