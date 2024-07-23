import { useState } from "react";
import { IonCol, IonContent, IonPage, IonRow, IonText } from "@ionic/react";


import AddressHome from "../../../components/address/home/AddressHome";
import TimeDataSlot from "../../sell/timedateslot/TimeDataSlot";

import { useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";
import RepairTimeDataSlot from "../repairtimedateslot/RepairTimeDataSlot";

function RepairSchedule() {

  const [route] = useState({ newAddress: "newaddress", currentaddress: "currentaddress", editaddress: "editaddress", timeDataSlot: "timedateslot", repairTimeDataSlot: "repairtimedateslot" });

  const Selector = useTypedSelector(state => state.AddressPageChangeReducer.selectedPage);

  return (
    <IonPage>
      {/* <MenuButton pageName={"Address Details"} backButton={"yes"} /> */}
      <IonContent>
        <IonRow className='sd-header-row'>
          <IonCol>
            {Selector === route.currentaddress &&
              <IonText className='sd-header-text'>Saved Address</IonText>
            }
            {Selector === route.editaddress &&
              <IonText className='sd-header-text'>Saved Address</IonText>
            }
            {Selector === route.newAddress &&
              <IonText className='sd-header-text'>Saved Address</IonText>
            }
            {
              Selector === route.timeDataSlot &&
              <IonText className='sd-header-text'>Schedule Appointment</IonText>
            }
            {
              Selector === route.repairTimeDataSlot &&
              <IonText className='sd-header-text'>Schedule Appointment</IonText>
            }
          </IonCol>
        </IonRow>
        <IonRow className='rd-row'>
          <IonCol size="12">
            {Selector === route.currentaddress &&
              <AddressHome />
            }
            {/* {Selector === route.newAddress &&
              <AddressForm />
            } */}
            {Selector === route.timeDataSlot &&
              <TimeDataSlot />
            }
            {Selector === route.repairTimeDataSlot &&
              <RepairTimeDataSlot />
            }
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  )
}

export default RepairSchedule