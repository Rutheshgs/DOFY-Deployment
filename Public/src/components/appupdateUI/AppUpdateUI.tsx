import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonModal, IonRow, IonText, isPlatform } from '@ionic/react';
import { logoAndroid, logoApple } from 'ionicons/icons';

import { AppUpdate } from "@robingenz/capacitor-app-update";

import { CustomImg } from '../shared/CustomImage'
import UpdateImage from '../../assets/images/Updateimg.png';

import "./AppUpdateUI.css";

type Props = {
    forcedUpdate: boolean;
    flexibleUpdate: boolean;
    noUpdate: any
}

function AppUpdateUI({ forcedUpdate, flexibleUpdate, noUpdate }: Props) {

    let androidDevice = isPlatform("android");
    let IOSDevice = isPlatform("ios");

    const routeRespectiveStore = () => {
        AppUpdate.openAppStore();
    }

    return (
        <IonGrid>
            <IonContent>
                <IonModal isOpen={(forcedUpdate || flexibleUpdate)} canDismiss={forcedUpdate ? false : true}>
                    <IonContent className='ion-padding'>
                        <IonRow>
                            <IonCol size='12'>
                                <CustomImg src={UpdateImage} className='Ap_image_style'  />
                            </IonCol>
                            <IonCol size='12' className='ion-text-center'>
                                <IonText className='Au_Title'>Time To Update !</IonText>
                            </IonCol>
                            <IonCol size='12' className='ion-text-center mt-2 mb-2 ion-padding'>
                                <IonText className='Au-msg'>
                                    We Added lots of new feature
                                    out fix some bugs to make your
                                    experience as smooth as
                                    possible
                                </IonText>
                            </IonCol>
                            <IonCol size='12' className='ion-text-center'>
                                <IonButton color='transparent' className='Au-update-btn' onClick={() => routeRespectiveStore()}>Update App&nbsp;
                                    {androidDevice ? <IonIcon icon={logoAndroid} />
                                        :
                                        IOSDevice ? <IonIcon icon={logoApple} />
                                            : null}
                                </IonButton>
                                <br /><br />
                                {(!forcedUpdate) ?
                                    <IonText className='Au-cancel' onClick={() => { noUpdate() }}>
                                        Not now
                                    </IonText>
                                    :
                                    null
                                }
                            </IonCol>
                        </IonRow>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonGrid>
    )
}

export default AppUpdateUI