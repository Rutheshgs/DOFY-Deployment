import { useEffect, useState } from 'react';
import { IonAccordion, IonAccordionGroup, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonPage, IonRow, IonIcon, IonText, IonFooter, IonMenuButton, IonRouterLink, IonCard, IonAlert, IonModal } from '@ionic/react';
import { bagCheckSharp, chatbubblesSharp, location, logOut, swapHorizontal } from 'ionicons/icons';

import { Direction, getLocalStorage, getUserLocationForParam, localStorageClearHandler } from '../../components/helper/Helper';
import { getUserLanguage } from '../../components/helper/Helper';


import { resetAddressPageChange } from '../../features/reducers/address/AddressPageChange.Reducers';
import { ResetuserOrdersPageChange } from '../../features/reducers/orders/Orders.Reducers';
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks';
import { IRegistrationModel } from '../../models/Registration.Model';
import PersonServices from '../../services/Person.Services';

import "./profile.css";
import Language from "./ProfileLanguage.json";

import MyAccount from '../../components/myaccount/MyAccount';

function Profile() {

  const [showModal, setShowModal] = useState(false);
  let dispatch = useTypedDispatch();

  let locationPermision = localStorage.getItem('permission');

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

  // const locationHandler = () => {
  //   Geolocation.getCurrentPosition().then((res) => {
  //     getExactAddress(res.coords.latitude, res.coords.longitude);
  //   }).catch((error) => {
  //     if (error) {
  //       localStorage.setItem('permission', 'deny');
  //       // alert('Please provide a location so we can guide you properly');
  //     }
  //   });
  // }

  // const getExactAddress = (lat: number, lan: number) => {
  //   let api = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lan}&key=03c48dae07364cabb7f121d8c1519492&no_annotations=1&language=en`
  //   axios.get(api).then(res => {
  //     if (res.status === 200) {
  //       let countryCode = res.data.results[0].components.country_code;
  //       localStorage.setItem('permission', 'allow');
  //       if (countryCode == 'in') {
  //         localStorage.setItem("Ln", 'in_en');
  //       }
  //       window.location.reload();
  //     }
  //   }).catch(e => console.log(e));
  // }

  useEffect(() => {
    const getMyAccount = (personId: number) => {
      PersonServices.GetUserByPersonId(personId ?? 0).then((res) => {
        if (res.status === 200)
          setDetail(res.data);
      }).catch((e: string) => {
        console.log(e);
      })
    }

    getMyAccount(personId);
  }, [personId])


  const myAccount = () => {
    setShowModal(true);
  }

  return (
    <IonPage className='profile-page' dir={Direction()}>
      <IonContent className='profile-bg-cont'>
        <IonGrid className="profile-bg" dir={Direction()}>
          <IonRow className='ion-padding profile-detail cursor-pointer' onClick={() => myAccount()}>
            <IonCol sizeLg='3' sizeMd='3' sizeXl='3' sizeXs='3' >
              <IonCard button className='profile-avator' >
                <IonRow className='ion-justify-content-center'>
                  <IonText >{detail?.FirstName.charAt(0)}</IonText>
                </IonRow>
              </IonCard>
            </IonCol>
            <IonCol sizeLg='9' sizeMd='9' sizeXl='9' sizeXs='9' className='profile-text'>
              <IonText>{detail?.FirstName}</IonText> <br />
              <IonText className='p_font-size'>{detail?.Email}</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className='ion-text-center'>
              <IonAccordionGroup className='profile_acc-grop' style={{ backgroundColor: 'transparent' }}>
                {/* <IonRouterLink onClick={() => myAccount()}>
                  <IonMenuButton>
                    <IonAccordion >
                      <IonItem slot="header">
                        <IonIcon icon={personSharp} slot="start"></IonIcon>
                        <IonLabel className='profile-accordion-text'>{dataLocalization.My_Account}</IonLabel>
                      </IonItem>
                    </IonAccordion>
                  </IonMenuButton>
                </IonRouterLink> */}

                <IonRouterLink routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/saved-address`} onClick={() => dispatch(resetAddressPageChange())}>
                  <IonMenuButton className='profile_menu-btn' >
                    <IonAccordion toggleIcon='' className='profile-btn-gap'>
                      <IonItem lines='none' slot="header" color='' className='profile_item-btn'>
                        <IonIcon icon={chatbubblesSharp} slot="start"></IonIcon>
                        <IonLabel className='profile-accordion-text'> {dataLocalization.Saved_Addresses}</IonLabel>
                      </IonItem>
                    </IonAccordion>
                  </IonMenuButton>
                </IonRouterLink>

                <IonRouterLink routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/view-orders`} onClick={() => dispatch(ResetuserOrdersPageChange())}>
                  <IonMenuButton className='profile_menu-btn' >
                    <IonAccordion toggleIcon='' className='profile-btn-gap'>
                      <IonItem lines='none' slot="header" className='profile_item-btn'>
                        <IonIcon icon={bagCheckSharp} slot="start"></IonIcon>
                        <IonLabel className='profile-accordion-text' > {dataLocalization.Orders}</IonLabel>
                      </IonItem>
                    </IonAccordion>
                  </IonMenuButton>
                </IonRouterLink>
                {/* {locationPermision == "deny" &&
                  <IonRouterLink onClick={() => locationHandler()}>
                    <IonMenuButton className='profile_menu-btn'>
                      <IonAccordion toggleIcon='' className='profile-btn-gap'>
                        <IonItem lines='none' slot="header" className='profile_item-btn'>
                          <IonIcon size='medium' icon={location} ></IonIcon>
                          <IonLabel className='profile-accordion-text' style={{ marginLeft: '30px' }}>{dataLocalization.Allow_Location}</IonLabel>
                        </IonItem>
                      </IonAccordion>
                    </IonMenuButton>
                  </IonRouterLink>
                } */}
                <IonRouterLink onClick={() => setIsAlertOpen(true)}>
                  <IonMenuButton className='profile_menu-btn'>
                    <IonAccordion toggleIcon='' className='profile-btn-gap'>
                      <IonItem lines='none' slot="header" className='profile_item-btn' onClick={() => setIsAlertOpen(true)}>
                        <IonIcon size='medium' icon={logOut} ></IonIcon>
                        <IonLabel className='profile-accordion-text' style={{ marginLeft: '30px' }}> {dataLocalization.Logout} </IonLabel>
                      </IonItem>
                    </IonAccordion>
                  </IonMenuButton>
                </IonRouterLink>

                {/* <IonMenuButton>
                  <IonAccordion className='profile-btn-gap'>
                  <IonItem  onClick={() => setIsAlertOpen(true)}>
                    <IonIcon size='medium' icon={logOut} slot="start"></IonIcon>
                    <IonLabel className='profile-accordion-text'> {dataLocalization.Logout} </IonLabel>
                  </IonItem>
                  </IonAccordion>

                </IonMenuButton> */}

              </IonAccordionGroup>


            </IonCol>
          </IonRow>
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

        </IonGrid>
      </IonContent>
      {/* <IonFooter onClick={() => myAccount()}>
        <IonRow className='ion-padding profile-detail cursor-pointer'>
          <IonCol sizeLg='3' sizeMd='3' sizeXl='3' sizeXs='3' >
            <IonCard button className='profile-avator' >
              <IonRow className='ion-justify-content-center'>
                <IonText >{detail?.FirstName.charAt(0)}</IonText>
              </IonRow>
            </IonCard>
          </IonCol>
          <IonCol sizeLg='9' sizeMd='9' sizeXl='9' sizeXs='9' className='profile-text'>
            <IonText>{detail?.FirstName}</IonText> <br />
            <IonText className='p_font-size'>{detail?.Email}</IonText>
          </IonCol>
        </IonRow>
      </IonFooter> */}
      <IonModal className='pr_modal' isOpen={showModal} canDismiss={true} onDidDismiss={() => setShowModal(false)}>
        <MyAccount datatoclose={setShowModal} />
      </IonModal>
    </IonPage>
    // <IonPage className='profile-page' dir={Direction()}>
    //   {personId &&
    //     <IonHeader collapse="fade" translucent={true}>
    //       <IonToolbar>
    //         <IonRow>
    //           <IonCol className='profile-close'>
    //             <IonMenuButton>
    //               <IonIcon color="light" icon={close}></IonIcon>
    //             </IonMenuButton>
    //           </IonCol>
    //         </IonRow>
    //         <IonRow className='ion-padding profile-detail'>
    //           <IonCol size='3' offset='4' >
    //             <IonCard className='profile-avator'>
    //               <IonRow className='ion-justify-content-center'>
    //                 <IonText>{detail?.FirstName.charAt(0)}</IonText>
    //               </IonRow>
    //             </IonCard>
    //           </IonCol>
    //           <IonCol size='12' className='ion-text-center profile-text'>
    //             <IonText>{detail?.FirstName}</IonText>
    //           </IonCol>
    //           <IonCol size='12' className='ion-text-center profile-text'>
    //             <IonText>{detail?.Email}</IonText>
    //           </IonCol>
    //         </IonRow>
    //       </IonToolbar>
    //     </IonHeader>
    //   }
    //   <IonContent>
    //     <IonGrid className="profile-bg" dir={Direction()}>
    //       <IonRow>
    //         <IonCol className='ion-text-center'>
    //           <IonAccordionGroup style={{ backgroundColor: 'transparent' }}>
    //             <IonRouterLink onClick={() => myAccount()}>
    //               <IonMenuButton>
    //                 <IonAccordion toggleIcon=''>
    //                   <IonItem slot="header">
    //                     <IonIcon icon={personSharp} slot="start"></IonIcon>
    //                     <IonLabel className='profile-accordion-text'>{dataLocalization.My_Account}</IonLabel>
    //                   </IonItem>
    //                 </IonAccordion>
    //               </IonMenuButton>
    //             </IonRouterLink>

    //             <IonRouterLink routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/saved-address`} onClick={() => dispatch(resetAddressPageChange())}>
    //               <IonMenuButton>
    //                 <IonAccordion toggleIcon=''>
    //                   <IonItem slot="header">
    //                     <IonIcon icon={chatbubblesSharp} slot="start"></IonIcon>
    //                     <IonLabel className='profile-accordion-text'> {dataLocalization.Saved_Addresses}</IonLabel>
    //                   </IonItem>
    //                 </IonAccordion>
    //               </IonMenuButton>
    //             </IonRouterLink>

    //             <IonRouterLink routerLink={`/${getUserLanguage()}${getUserLocationForParam()}/view-orders`} onClick={() => dispatch(ResetuserOrdersPageChange())}>
    //               <IonMenuButton>
    //                 <IonAccordion toggleIcon=''>
    //                   <IonItem slot="header">
    //                     <IonIcon icon={bagCheckSharp} slot="start"></IonIcon>
    //                     <IonLabel className='profile-accordion-text' > {dataLocalization.Orders}</IonLabel>
    //                   </IonItem>
    //                 </IonAccordion>
    //               </IonMenuButton>
    //             </IonRouterLink>

    //             <IonRouterLink routerLink='/mywishlist' onClick={() => dispatch(ResetuserOrdersPageChange())} >
    //               <IonMenuButton>
    //                 <IonAccordion toggleIcon=''>
    //                   <IonItem slot="header">
    //                     <IonIcon icon={heart} slot="start"></IonIcon>
    //                     <IonLabel className='profile-accordion-text' >Wish List</IonLabel>
    //                   </IonItem>
    //                 </IonAccordion>
    //               </IonMenuButton>
    //             </IonRouterLink>

    //           </IonAccordionGroup>
    //         </IonCol>
    //       </IonRow>
    //       <IonAlert isOpen={isAlertOpen}
    //         onDidDismiss={() => setIsAlertOpen(false)}
    //         header={"Confirmation"}
    //         subHeader={"Are you sure you want to Logout?"}
    //         buttons={[{
    //           text: "Yes",
    //           handler: () => logout()
    //         }, {
    //           text: "Cancel",
    //           handler: () => setIsAlertOpen(false)
    //         }]}
    //       />
    //     </IonGrid>
    //   </IonContent>
    //   <IonFooter>
    //     <IonItem className='cursor-pointer' onClick={() => setIsAlertOpen(true)}>
    //       <IonIcon size='medium' icon={logOut} slot="start"></IonIcon>
    //       <IonLabel className='profile-accordion-text'> {dataLocalization.Logout} </IonLabel>
    //     </IonItem>
    //   </IonFooter>
    // </IonPage>
  )

}

export default Profile

