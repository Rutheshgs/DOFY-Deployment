import { IonCol, IonGrid, IonRow, IonIcon, IonButton, IonLabel, IonItem, IonContent, IonModal, IonInput, IonAlert, IonHeader, IonTextarea, IonText } from "@ionic/react";
import { timerOutline, } from "ionicons/icons";
import { InputHTMLAttributes, useState } from "react";
import { close } from 'ionicons/icons';

import { IReportDelayModel } from "../../models/ReportDelay.Model";
import { useParams } from "react-router";
import SellOrderServices from "../../services/order/sell/SellOrder.Services";
import React from "react";
import { IGetOrderSummaryModel } from "../../models/GetOrderSummary.Model";
import "./Delay.css";

interface InputParam {
    id: any;
}
interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    setShowToast: any,
    showOnlyIcon?: boolean,
    data?: IGetOrderSummaryModel,
    orderId?: any;
}

export const Delay = React.forwardRef(({ setShowToast, showOnlyIcon, data, orderId, ...rest }: inputProps, ref) => {

    const [showModal, setShowModal] = useState(false);
    const [hoursData, setHoursData] = useState();
    const [commentsData, setCommentsData] = useState<IReportDelayModel>();
    const [isButton, SetisButton] = useState(false);


    const { id } = useParams<InputParam>();

    const ReportDelayOrderData = () => {
        const Data = {
            OrderId: id ? id : orderId,
            DelayHours: hoursData,
            DelayComments: commentsData,
        };
        SellOrderServices.ReportDelayOrder(Data).then(res => {
            if (res.status === 200) {
                setCommentsData(res.data.Items);
                setShowModal(false);
                window.location.reload();
                setShowToast(true);
            }

        })
        SetisButton(true);

    }

    return (
        <IonGrid>
            <IonRow>
                <IonCol sizeLg="2" sizeXs="4">
                    {data?.AssigneeDetails !== null ?
                        <IonButton size="small" onClick={() => setShowModal(true)} color="warning" >
                            <IonIcon icon={timerOutline} onClick={() => { ReportDelayOrderData(); setShowModal(true); }} />
                            {showOnlyIcon ? '' : 'Delay'}
                        </IonButton> : null
                    }

                </IonCol>
                <IonModal isOpen={showModal} animated={true} swipeToClose={true} className="modal-assignee"
                    onDidDismiss={() => setShowModal(false)}>
                    <IonHeader className="d_bg-color">
                        <IonRow>
                            <IonCol className="ion-align-slef-end" sizeLg="2" sizeMd="1" sizeSm="1" sizeXl="2" sizeXs="1">
                                <IonIcon icon={timerOutline} className="D_padding"></IonIcon>
                            </IonCol>
                            <IonCol sizeLg="9" sizeMd="9" sizeSm="10" sizeXl="9" sizeXs="10">
                                <IonText className="D_text"> Set Order Delay with Reason</IonText>
                            </IonCol>
                            <IonCol sizeLg="1" sizeMd="2" sizeSm="1" sizeXl="1" sizeXs="1">
                                <IonIcon icon={close} onClick={() => setShowModal(false)} className="D_padding"></IonIcon>
                            </IonCol>
                        </IonRow>
                    </IonHeader>
                    <IonContent>
                        <IonRow>
                            <IonCol sizeLg="12" sizeXl="12" sizeMd="12" sizeXs="12">
                                <IonItem>
                                    <IonLabel position="stacked">Delay (in hrs)</IonLabel>
                                    <IonInput type="number" onIonChange={(e: any) => setHoursData(e.detail.value)}>
                                    </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Delay Reason</IonLabel>
                                    <IonInput onIonChange={(e: any) => setCommentsData(e.detail.value)}>
                                    </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeXl="6" sizeLg="6" sizeMd="6"
                                sizeXs="6" className="ion-text-end">
                                <IonButton onClick={() => setShowModal(false)}>
                                    Cancel
                                </IonButton>
                            </IonCol>
                            <IonCol sizeXl="6" sizeLg="6" sizeMd="6"
                                sizeXs="6">
                                <IonButton disabled={isButton} color="warning" onClick={() => ReportDelayOrderData()}  >Save</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonContent>
                </IonModal>
            </IonRow>
        </IonGrid>

    );
})

export default Delay;

