import { useEffect, useState } from 'react';
import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonText, IonCard, IonIcon, IonAlert, IonSearchbar } from '@ionic/react';
import { trashBinSharp } from 'ionicons/icons';

import "./MyWishlist.css";

import { IGetWishListModel } from '../../models/GetWishList.Model';
import OrderWishListServices from '../../services/OrderWishList.Services';
import { IOrderWishListModel } from '../../models/OrderWishList.Model';

import { HelperConstant } from '../../components/helper/HelperConstant';
import { currencyByCountry, getLocalStorage, toAmount } from '../../components/helper/Helper';
import { CustomImg } from '../../components/shared/CustomImage';

import Footer from '../../components/footer/Footer';

function MyWishlist() {
  const [selectWishlist, setSelectWishlist] = useState<Array<IGetWishListModel>>([]);
  const personId = getLocalStorage()?.PersonId;

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [value, setvalue] = useState<any>({});

  const myWishListChecked = (ModelVariantId: any) => {
    MyWishListChecked({
      Id: ModelVariantId.Id,
      Created: "",
      CreatedBy: 0,
      Active: true,
      Modified: "",
      ModifiedBy: 0,
      ValidationErrors: {},
      PersonId: personId,
      ModelVariantId: ModelVariantId.ModelVariantId,
      ServiceTypeId: HelperConstant.serviceTypeId.SELL,
      RowOrder: ModelVariantId.RowOrder,
      MaximumValue: ModelVariantId.MaximumValue
    }, ModelVariantId);
  }

  const MyWishListChecked = (MyWishListParam: IOrderWishListModel, ModelVariantId: any) => {
    OrderWishListServices.edit(MyWishListParam).then((res) => {
      if (res.status === 200) {
        // setOrderId(res.data);
        window.location.reload();
      }
    }).catch((e: string) => {
      console.log(e);
    });
  }

  useEffect(() => {
    const getMyWishList = () => {
      console.log(getMyWishList)
      OrderWishListServices.getWishList(personId).then((res: any) => {
        if (res.status === 200)
          setSelectWishlist(res.data);
      }).catch((e: string) => {
        console.log(e);
      });
    }

    getMyWishList();
  }, [personId]);
  return (
    <IonPage>
      <IonContent>
        <IonGrid className='p-0'>
          <IonRow className='sd-header-row'>
            <IonCol>
              <IonText className='sd-header-text'>My Wishlist</IonText>
            </IonCol>
          </IonRow>
          <IonRow className='mwl-row ion-padding'>
            <IonCol sizeLg='3' sizeMd='3' sizeSm='12' sizeXs='12'>
              <IonText className='vw-header-texts'>My Wishlist</IonText>
            </IonCol>
            <IonCol offsetLg='6' sizeLg='3' sizeMd='3' offsetMd='6' sizeXs='12'>
              <IonSearchbar placeholder="Search your wishlist" ></IonSearchbar>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              {
                selectWishlist.map((val: any, i: any) => {
                  return (
                    <IonCard key={val.Id}>
                      <IonRow>
                        <IonCol size='2'>
                          <CustomImg src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`} key={i} className='mwl-image' alt="mywishlist"/>
                        </IonCol>
                        <IonCol size='8'>
                          <IonRow >
                            <IonCol>
                              <IonText key={i} className='vw-text'>{val.SeriesModelName}</IonText><br></br>
                            </IonCol>
                          </IonRow>
                          <IonRow>
                            <IonCol>
                              <IonText key={i}>Variant : {val.DisplayName}</IonText><br />
                            </IonCol>
                          </IonRow>
                          <IonRow>
                            <IonCol>
                              <IonText>Maximum Value : <b>{currencyByCountry(val.MaximumValue ? toAmount(val.MaximumValue) : 0)}</b></IonText>
                            </IonCol>
                          </IonRow>
                        </IonCol>

                        <IonIcon className='mwl-icon' icon={trashBinSharp} onClick={() => { setIsAlertOpen(true); setvalue(val) }}>

                        </IonIcon>
                      </IonRow>
                    </IonCard>
                  )
                })
              }
            </IonCol>
            <IonCol size="2" >
              <IonAlert isOpen={isAlertOpen}
                id={value}
                key={value.Id}
                onDidDismiss={() => setIsAlertOpen(false)}
                header={"Confirmation"}
                subHeader={"Are you sure you want to Delete?"}
                buttons={
                  [{
                    text: "Yes",
                    handler: () => myWishListChecked(value)

                  }, {
                    text: "Cancel",
                    handler: () => setIsAlertOpen(false)
                  }]
                }
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  )
}

export default MyWishlist