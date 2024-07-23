import { useEffect, useState } from 'react';
import { bagCheckSharp, chatbubblesSharp, location, logOut, swapHorizontal, closeCircle, closeOutline } from 'ionicons/icons';

import { Direction, findWindow, getLocalStorage, getUserLocationForParam, localStorageClearHandler } from '@/components/helper/Helper';
import { getUserLanguage } from '@/components/helper/Helper';


import { resetAddressPageChange } from '@/features/reducers/address/AddressPageChange.Reducers';
import { ResetuserOrdersPageChange } from '@/features/reducers/orders/Orders.Reducers';
import { useTypedDispatch } from '@/features/reduxhooks/ReduxHooks';
import { IRegistrationModel } from '@/models/Registration.Model';
import PersonServices from '@/services/Person.Services';

import "./Profile.css";
import Language from "./ProfileLanguage.json";
import dynamic from 'next/dynamic';
import router from 'next/router';
import { loginPageChanger, modelChanger } from '@/features/reducers/login/LoginModel.Reducer';

const IonCol = dynamic(() => import('@ionic/react').then(mod => mod.IonCol), { ssr: false });
const IonAlert = dynamic(() => import('@ionic/react').then(mod => mod.IonAlert), { ssr: false });

function Profile() {

  let dispatch = useTypedDispatch();

  let personId = getLocalStorage().PersonId;
  let dataLocalization = Language[getUserLanguage()];

  const [detail, setDetail] = useState<IRegistrationModel>();

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const logout = () => {
    localStorageClearHandler();
    window.location.href = "/";
  }

  const locationHandler = () => {
    alert('Please provide a location, so we can guide you properly');
    localStorage.removeItem('permission');
    localStorage.removeItem('Ln');
    window.location.href = '/';
  }


  const closeNav = () => {
    let close = document.getElementById('mySidenav');
    close!.style.width = '0px';
  }

  const SavedAddress = () => {
    router.push(`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/saved-address`);
    dispatch(resetAddressPageChange());
    closeNav();

  }

  const ViewOrders = () => {
    router.push(`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/view-orders`);
    dispatch(ResetuserOrdersPageChange())
    closeNav();

  }
  const SignOut = () => {
    setIsAlertOpen(true);
    closeNav();
  }

  useEffect(() => {
    const getMyAccount = (personId: number) => {
      PersonServices.GetUserByPersonId(personId ?? 0).then((res) => {
        if (res.status === 200)
          setDetail(res.data);
      }).catch((e: string) => {
        console.log(e);
      })
    }

    if (personId > 0) {
      getMyAccount(personId);
    }
  }, [personId])



  const myAccount = () => {
    let close = document.getElementById('mySidenav');
    close!.style.width = '0px';
    dispatch(loginPageChanger("my-account"));
    dispatch(modelChanger(true));
  }

  return (
    <ion-content class='profile-bg-cont'>
      <ion-grid class="profile-bg" dir={Direction()}>
        <ion-row></ion-row>
        <ion-row class='ion-padding profile-detail cursor-pointer account-col' onClick={() => myAccount()}>
          <IonCol size-lg='3' size-md='3' size-xl='3' size-xs='3' >
            <ion-card button class='profile-avator' >
              <ion-row class='ion-justify-content-center'>
                <ion-text >{detail?.FirstName?.charAt(0)}</ion-text>
              </ion-row>
            </ion-card>
          </IonCol>
          <IonCol size-lg='9' size-md='9' size-xl='9' size-xs='9' class='profile-text'>
            <ion-text>{detail?.FirstName}</ion-text> <br />
            <ion-text class='p_font-size'>{detail?.Email}</ion-text>
          </IonCol>
        </ion-row>
        <ion-row>
          <IonCol class='ion-text-center'>
            <ion-card onClick={SavedAddress} class='menu-cards'>
              <ion-item style={{ backgroundColor: '#fff' }}>
                <ion-icon icon={chatbubblesSharp}></ion-icon>
                <ion-label class='profile-accordion-text'>{dataLocalization.Saved_Addresses}</ion-label>
              </ion-item>
            </ion-card>
            <ion-card onClick={ViewOrders} class='menu-cards'>
              <ion-item>
                <ion-icon icon={bagCheckSharp} style={{ fontSize: '20px' }}></ion-icon>
                <ion-label class='profile-accordion-text' > {dataLocalization.Orders}</ion-label>
              </ion-item>
            </ion-card>
            <ion-card onClick={SignOut} class='menu-cards'>
              <ion-item>
                <ion-icon size='medium' icon={logOut} onClick={SignOut}></ion-icon>
                <ion-label class='profile-accordion-text' > {dataLocalization.Logout} </ion-label>
              </ion-item>
            </ion-card>
          </IonCol>
        </ion-row>
        <IonAlert isOpen={isAlertOpen}
          onDidDismiss={() => setIsAlertOpen(false)}
          header={"Confirmation"}
          subHeader={dataLocalization.Are_You_Sure}
          buttons={[{
            text: dataLocalization.Yes,
            handler: () => logout()
          }, {
            text: dataLocalization.Cancel,
            handler: () => setIsAlertOpen(false)
          }]}
        />
      </ion-grid>
    </ion-content>
  )
}

export default Profile

