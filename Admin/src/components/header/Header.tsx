import { useEffect, useState } from 'react';
import { IonAlert, IonAvatar, IonButton, IonButtons, IonCol, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonMenuButton, IonRouterLink, IonRow, IonText, IonToast, IonToolbar } from '@ionic/react';
import { logOut, personOutline, personSharp, saveOutline } from 'ionicons/icons';

import dofylogo from '../../assets/images/dofy-logo-white.png';
import { CustomImg } from '../shared/CustomImage';

import { ITokenModel } from '../../models/LocalStorage.Model';
import { IUserModel } from '../../models/User.Model';
import PersonalDetailsServices from '../../services/PersonalDetails.Services';

import './Header.css';

import jwt_decode from 'jwt-decode';

function Header() {

    let token: string = localStorage.getItem("token") as string;
    const [detail, setDetail] = useState<IUserModel>();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [profileImage, setProfileImage] = useState<any>();

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    const dofylogohandler = () => {
        // if (!riderlogin) {
        //     window.location.href = '/HomePage';
        // }
        // else {
        //     window.location.href = '/';
        // }
        // history.push("/HomePage");
        window.location.href = '/HomePage';
    }

    let LoginId = (jwt_decode(token) as ITokenModel).PersonId;

    const getMyAccount = (LoginId: number) => {
        PersonalDetailsServices.getUser(LoginId).then((res) => {
            if (res.status === 200) {
                setDetail(res.data);
            }
        });
    }

    const riderProfilePage = () => {
        window.location.href = "/Profile/" + detail?.Id;
    }

    useEffect(() => {
        const GetUserProfile = () => {
            PersonalDetailsServices.GetBase64ProfileImage(LoginId).then((res) => {
                if (res.status === 200) {
                    let base64ImageString: any = `data:image/png;base64,${res.data}`;
                    setProfileImage(base64ImageString);
                }
            }).catch(e => {
                console.log(e);
            });
        }
        getMyAccount(LoginId);
        GetUserProfile();
    }, [LoginId]);

    return (
        <IonHeader style={{ backgroundColor: '#004E73' }}>
            <IonToolbar color='#004E73'>
                <IonRow>
                    <IonCol sizeLg='0.5'>
                        <IonButtons color='default'>
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                    </IonCol>
                    <IonCol sizeLg='2' className='align-self-center'>
                        <IonButtons>
                            <IonButtons onClick={() => dofylogohandler()}  >
                                <CustomImg className="db-headerlogo" src={dofylogo} />
                            </IonButtons>
                        </IonButtons>
                    </IonCol>
                    <IonCol sizeLg='7.5'>
                    </IonCol>
                    <IonCol sizeLg='2' className='align-self-center'>
                        <IonButtons>
                            <IonText className='db-person' slot='start'>Welcome {detail?.FirstName}</IonText>
                            <IonFab edge={true} horizontal="end" slot="fixed">
                                {profileImage ?
                                    <IonFabButton size='small' color='light'>
                                        <IonAvatar style={{ height: "100%" }}>
                                            <IonImg src={profileImage} />
                                        </IonAvatar>
                                    </IonFabButton>
                                    :
                                    <IonFabButton size='small' color='light'>
                                        <IonIcon size='small' icon={personOutline} />
                                    </IonFabButton>
                                }
                                <IonFabList side="start">
                                    <IonRouterLink onClick={() => riderProfilePage()}>
                                        <IonFabButton size="small" color='warning'>
                                            <IonIcon icon={personSharp} />
                                        </IonFabButton>
                                    </IonRouterLink>
                                    <IonFabButton size='small' color='warning' onClick={() => setIsAlertOpen(true)}>
                                        <IonIcon icon={logOut} />
                                    </IonFabButton>
                                </IonFabList>
                            </IonFab>
                        </IonButtons>
                    </IonCol>
                </IonRow>
            </IonToolbar>
            <IonAlert isOpen={isAlertOpen}
                onDidDismiss={() => setIsAlertOpen(false)}
                header={"Confirmation"}
                subHeader={"Are you sure you want to Logout?"}
                buttons={[{
                    text: "Yes",
                    handler: () => logout()
                }, {
                    text: "Cancel",
                    handler: () => setIsAlertOpen(false)
                }]}
            />
        </IonHeader>
    )
}

export default Header