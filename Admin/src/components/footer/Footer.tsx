import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react"
import './Footer.css'

function Footer() {
    return (
        <IonGrid className="f-background">
            <IonRow>
                <IonCol className="ion-align-self-center ion-padding">
                    <IonText className="f-textcolor">Copyright @ 2022</IonText>
                    <IonText className="f-textcolor">|</IonText>
                    <IonText className="f-textcolor">Terms & Condition</IonText>
                    <IonText className="f-textcolor">|</IonText>
                    <IonText className="f-textcolor">Privacy Policy</IonText>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default Footer