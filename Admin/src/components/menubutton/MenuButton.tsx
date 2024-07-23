import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonText, IonBackButton } from '@ionic/react';
import { returnDownBack } from 'ionicons/icons';

type Props = {
    pageName: any;
    backButton: "yes" | "no";
}

function MenuButton({ pageName, backButton }: Props) {

    let backButtonShow = backButton === "yes" ? true : false

    return (
        <IonHeader>
            <IonToolbar >
                <IonButtons slot='start'>
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonText>{pageName}</IonText>
                {backButtonShow && <IonButtons slot='end'>
                    <IonBackButton defaultHref='/' icon={returnDownBack} text={"back"}></IonBackButton>
                </IonButtons>
                }
            </IonToolbar>
        </IonHeader>
    )
}

export default MenuButton