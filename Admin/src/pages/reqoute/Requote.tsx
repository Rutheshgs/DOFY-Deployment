import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonPage, IonRow, IonTitle } from '@ionic/react'
import { homeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CustomerDetailView } from '../../components/customerdetailview/CustomerDetailView';
import { TechnicianDetails } from '../../components/techniciandetails/TechnicianDetails';
import { IGetOrderSummaryModel } from '../../models/GetOrderSummary.Model';
import SellServices from '../../services/Sell.Services';
import { FunctionalCondition } from './functional/FunctionalCondition';

import "./Requote.css";
import Questionnaire from '../NewRequote/Questionnaire';

interface InputParam {
  id: string;
}

function Requote() {
  const { id } = useParams<InputParam>();

  const [orderSummaryInfo, setOrderSummaryInfo] = useState<IGetOrderSummaryModel>();

  useEffect(() => {
    const GetOrderSummaryWithTemplate = () => {
      if (id) {
        SellServices.GetOrderSummaryWithTemplate(id).then((res: any) => {
          setOrderSummaryInfo(res.data);
        })
      }
    }

    GetOrderSummaryWithTemplate();
  }, [id])

  return (
    <IonPage>
      <IonContent>
        <IonGrid className="home-bg-color p-0">
          <IonRow className="page-header ion-padding-top">
            <IonCol sizeLg="12" sizeXl="12" sizeXs="12">
              <IonItem lines="none" color="transparent">
                <IonButton size="small" color="medium" routerLink="/HomePage">
                  <IonIcon size="small" icon={homeOutline} />
                </IonButton>
                <IonTitle className="requote">ORDER REQUOTE - {orderSummaryInfo?.OrderCode}</IonTitle>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeMd="12" sizeXl="8" sizeLg="8" sizeXs="12">
              <CustomerDetailView isButton={false} data={orderSummaryInfo} showEdit={false} />
            </IonCol>
            <IonCol sizeMd="12" sizeXl="4" sizeLg="4" sizeXs="12">
              <TechnicianDetails isButton={true} data={orderSummaryInfo} showEdit={false} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeXs='12'>
              <Questionnaire data={orderSummaryInfo} id={'0'} />
              {/* <FunctionalCondition data={orderSummaryInfo} id={"0"}/> */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>

  )
}

export default Requote