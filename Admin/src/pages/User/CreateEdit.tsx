import { IonContent, IonPage, IonGrid } from "@ionic/react";
import MenuButton from "../../components/menubutton/MenuButton";
import "./CreateEdits.css";
import INDCreateEdit from "./INDCreateEdit";
import UAECreateEdit from "./UAECreateEdit";
import { findedLocation, getUserLanguage } from "../../components/helper/Helper";

function CreateEdit() {
  return (
    <IonPage>
      <MenuButton pageName={"User"} backButton="yes" />
      <IonContent fullscreen={true}>
        <IonGrid className="ion-no-padding">
          {findedLocation().CountryCode == "in" ? INDCreateEdit() : UAECreateEdit()}
        </IonGrid>
      </IonContent >
    </IonPage >
  );
}

export default CreateEdit;