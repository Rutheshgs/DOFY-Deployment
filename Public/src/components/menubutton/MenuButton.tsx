import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonText, IonBackButton } from '@ionic/react';

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
                    <IonBackButton defaultHref='/' ></IonBackButton>
                </IonButtons>
                }
            </IonToolbar>
        </IonHeader>
    )
}

export default MenuButton