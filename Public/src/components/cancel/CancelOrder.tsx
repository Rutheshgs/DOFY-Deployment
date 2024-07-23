import { useEffect, useState } from "react";
import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow, IonText, IonTextarea, isPlatform } from "@ionic/react";
import { chevronBackCircle } from "ionicons/icons";

import SellOrderServices from "../../services/order/sell/SellOrder.Services";
import MasterServices from "../../services/Master.Services";
import { ICancellationModel } from "../../models/Cancellation.Model";
import { ISellOrderModel } from "../../models/order/sell/SellOrder.Model";

import { Direction, findedLocation, getLocalStorage, getUserLocationForParam } from "../helper/Helper";
import { HelperConstant } from "../helper/HelperConstant";
import { getUserLanguage, onKeyDown, restrictInput } from '../../components/helper/Helper';


import "./CancelOrder.css";

import helpbanner from "../../assets/images/needhelp.png";
import cancelorder from "../../assets/images/cancelorder.png";
import callwithus from "../../assets/images/callwithus.png";

import { CustomImg } from "../shared/CustomImage";
import Language from "./CancelOrderLanguage.json";
import { Button } from "@mui/material";


type props = {
  setIsModelOpen: any;
  orderId: any
};

function CancelOrder({ setIsModelOpen, orderId }: props) {

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [cancelData, setCancelData] = useState<Array<ICancellationModel>>([]);
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [cancellationId, setCancellationId] = useState(0);
  const [reason, setReason] = useState<any>();

  const [isCancelOrderOpen, setIsCancelOrderOpen] = useState(false);

  const [errReason, setErrReason] = useState<boolean>(false);

  const CancelHandler = () => {
    let data: ISellOrderModel = {
      Id: orderId,
      PersonId: getLocalStorage()?.PersonId,
      UserName: getLocalStorage()?.FirstName,
      CancellationTypeId: cancellationId,
      SeriesModelColor: "",
      SeriesModelColorId: null,
      ModelVariantId: 0,
      ServiceTypeId: 0,
      ServiceType: "",
      Created: "2022-04-13T11:46:16.538Z",
      CreatedBy: 0,
      Active: true,
      Modified: "2022-04-13T11:46:16.538Z",
      ModifiedBy: 0,
      ValidationErrors: {},
      StatusId: null,
      OrderCode: "",
      OrderLanguage: findedLocation().LanguageCode,
      Remarks: reason,
      RowOrder: 0,
      OrderDate: undefined,
      ModelVariantName: "",
      ThumbnailPath: "",
      ProductTypeId: 0,
      ProductTypeName: "",
      BrandMasterName: "",
      SeriesModelName: "",
      UserMobile: "",
      SecondaryMobile: "",
      StatusName: "",
      ExternalStatus: "",
      Appointment: null as any,
      AssigneeDetails: null as any,
      OrderDocuments: null as any,
      QuestionnaireResponse: null as any,
      RepairParts: null as any,
      orderSpecificationsList: null as any,
      BrandThumbnailPath: "",
      Payout: null as any,
      ReferralCode: undefined,
      ReferralCodeId: undefined,
    }

    SellOrderServices.CancelOrderRequest(data).then(res => {
      if (res.status === 200) {
        setIsModelOpen(false);
        if (isPlatform("android") || isPlatform("ios")) {
          window.location.href = (`/${getUserLanguage()}${getUserLocationForParam()}/view-orders`);
        }
        else {
          window.location.reload();
        }
      }
    }).catch((e: string) => {
      console.log(e);
    });

  }

  const getCancellationType = () => {
    MasterServices.GetAllCancellationType(HelperConstant.serviceTypeId.SELL).then(res => {
      if (res.status === 200) {
        setCancelData(res.data);
      }
    }).catch((e: string) => {
      console.log(e);
    });
  }

  const getReason = () => {
    if (cancellationId === HelperConstant.cancellationList.othersId) {
      return "ion-margin";
    }
    else {
      return "ion-hide";
    }
  }

  const onClickSubmit = () => {
    if (cancellationId !== HelperConstant.cancellationList.othersId) {
      setErrReason(false)
      setIsAlertOpen(true);
    }
    else if (cancellationId === HelperConstant.cancellationList.othersId && reason) {
      setErrReason(false)
      setIsAlertOpen(true);
    }
    else {
      setErrReason(true);
    }
  }

  useEffect(() => {
    getCancellationType();
  }, []);

  let dataLocalization = Language[getUserLanguage()];

  return (
    <IonContent>
      <IonGrid className="co-grid p-0 " dir={Direction()}>
        {isCancelOrderOpen ?
          <IonRow>
            <IonCol size="12" className="ion-margin-horizontal">
              <IonItem className="cancel-reason-heading">
                <IonIcon size="small" icon={chevronBackCircle} onClick={() => setIsCancelOrderOpen(false)} className="cursor-pointer" />
                <IonText>{dataLocalization.Please_Tell_us_the_reason}</IonText>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonRadioGroup onIonChange={(e) => { setCancellationId(e.detail.value); setIsDefault(true) }}>
                {cancelData &&
                  cancelData.map((val: ICancellationModel, i: number) => (
                    <IonItem key={i} lines="none">
                      <IonLabel>{findedLocation().LanguageCode != "en" ? val.SecondLanguage : val.Name}</IonLabel>
                      <IonRadio value={val.Id} />
                    </IonItem>
                  ))}
              </IonRadioGroup>
            </IonCol>
            <IonCol size="12" className={getReason()}>
              <IonItem>
                <IonLabel position="floating">{dataLocalization.Please_provide_reason}</IonLabel>
                <IonTextarea placeholder="Please provide reason" onIonChange={(e) => { setReason(e.detail.value) }} />
              </IonItem>
              {errReason &&
                <IonText className="text-danger">{dataLocalization.Please_provide_reason}</IonText>
              }
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <Button className="vw-btn-cancel" variant="outlined"   onClick={() => setIsModelOpen(false)}>
              {dataLocalization.Cancel}
              </Button>&nbsp;
              <Button className="vw-btn-schedule" variant="contained" onClick={() => onClickSubmit()}>
              {dataLocalization.Submit}
              </Button>
              {/* <IonButton
                color="white"
                className="cancel-order-btn-cancel"
                onClick={() => setIsModelOpen(false)}
                type="button"
              >
                {dataLocalization.Cancel}
              </IonButton>
              <IonButton
                color="white"
                onClick={() => onClickSubmit()}
                className="cancel-order-btn-schedule"
                disabled={isDefault ? false : true}
                type="button"
              >
                {dataLocalization.Submit}
              </IonButton> */}
            </IonCol>
          </IonRow>
          :
          <IonRow className="help-row">
            <IonCol size="12" className="p-0">
              <CustomImg src={helpbanner} alt="banner" style={{ height: "100px" }}/>
            </IonCol>
            <IonCol size="12" className="ion-margin-top">
              <IonRow>
                <IonCol sizeLg="6" sizeMd="6" sizeXs="6">
                  <a href="tel:+917676320000">
                    <IonCard className="cancel-card">
                      <IonCardHeader>
                        <CustomImg src={callwithus} alt="call" style={{ height: "80px" }} />
                      </IonCardHeader>
                      <IonCardContent>
                        <IonLabel className="card-label">{dataLocalization.Call_to_us}</IonLabel>
                      </IonCardContent>
                    </IonCard>
                  </a>
                </IonCol>
                {/* <IonCol sizeLg="4" sizeMd="4" sizeXs="5">
                  <IonCard className="cancel-card" disabled>
                    <IonCardHeader>
                      <CustomImg src={chatwithus} alt="chat" style={{ height: "80px" }} />
                    </IonCardHeader>
                    <IonCardContent>
                      <IonLabel className="card-label">Chat with us </IonLabel>
                    </IonCardContent>
                  </IonCard>
                </IonCol> */}
                <IonCol sizeLg="6" sizeMd="6" sizeXs="6">
                  <IonCard className="cancel-card cursor-pointer" onClick={() => setIsCancelOrderOpen(true)}>
                    <IonCardHeader>
                      <CustomImg src={cancelorder} alt="cancelorder" style={{ height: "80px" }} />
                    </IonCardHeader>
                    <IonCardContent >
                      <IonLabel className="card-label">{dataLocalization.Cancel_your_order}</IonLabel>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        }

        <IonAlert
          isOpen={isAlertOpen}
          onDidDismiss={() => setIsAlertOpen(false)}
          header={dataLocalization.Confirmation}
          subHeader={
            dataLocalization.Your_cancellation_request
          }
          buttons={[
            {
              text: dataLocalization.No,
              id: 'confirm-button',
              handler: () => {
                setIsAlertOpen(false);
              }
            },
            {
              text: dataLocalization.Yes,
              id: 'confirm-button',
              handler: () => {
                CancelHandler();
              }
            }
          ]}
        />
      </IonGrid>
    </IonContent>
  );
}

export default CancelOrder;
