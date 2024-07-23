import { useEffect, useState } from "react";
import { chevronBackCircle } from "ionicons/icons";

import SellOrderServices from "@/services/order/sell/SellOrder.Services";
import MasterServices from "@/services/Master.Services";
import { ICancellationModel } from "@/models/Cancellation.Model";
import { ISellOrderModel } from "@/models/order/sell/SellOrder.Model";

import { Direction, IOSDevice, androidDevice, findedLocation, getLocalStorage, getUserLocationForParam } from "../helper/Helper";
import { HelperConstant } from "../helper/HelperConstant";
import { getUserLanguage, onKeyDown, restrictInput } from '@/components/helper/Helper';


import "./CancelOrder.css";

import helpbanner from "@/assets/images/needhelp.png";
import cancelorder from "@/assets/images/cancelorder.png";
import callwithus from "@/assets/images/callwithus.png";

import Language from "./CancelOrderLanguage.json";
import { Button, TextField } from "@mui/material";
import { IonAlert, IonRadio, IonRadioGroup } from "@ionic/react";


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
        if (androidDevice() || IOSDevice()) {
          window.location.href = (`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/view-orders`);
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
    <ion-content>
      <ion-grid class="co-grid p-0 " dir={Direction()}>
        {isCancelOrderOpen ?
          <ion-row>
            <ion-col size="12" class="ion-margin-horizontal">
              <ion-item class="cancel-reason-heading">
                <ion-icon size="small" icon={chevronBackCircle} onClick={() => setIsCancelOrderOpen(false)} class="cursor-pointer" />
                <ion-text>{dataLocalization.Please_Tell_us_the_reason}</ion-text>
              </ion-item>
            </ion-col>
            <ion-col size="12">
              <IonRadioGroup onIonChange={(e) => { setCancellationId(e.detail.value); setIsDefault(true) }}>
                {cancelData &&
                  cancelData.map((val: ICancellationModel, i: number) => (
                    <ion-item key={i} lines="none">
                      <ion-label>{findedLocation().LanguageCode != "en" ? val.SecondLanguage : val.Name}</ion-label>
                      <IonRadio value={val.Id} />
                    </ion-item>
                  ))}
              </IonRadioGroup>
            </ion-col>
            <ion-col size="12" class={getReason()}>
              <ion-item>
                <TextField variant="standard" multiline label={dataLocalization.Please_provide_reason} fullWidth onChange={(e) => { setReason(e.target.value) }} />
              </ion-item>
              {errReason &&
                <ion-text color="danger">{dataLocalization.Please_provide_reason}</ion-text>
              }
            </ion-col>
            <ion-col size="12" class="ion-text-center">
              <Button className="vw-btn-cancel" variant="outlined" onClick={() => setIsModelOpen(false)}>
                {dataLocalization.Cancel}
              </Button>&nbsp;
              <Button className="vw-btn-schedule" variant="contained" onClick={() => onClickSubmit()}>
                {dataLocalization.Submit}
              </Button>
            </ion-col>
          </ion-row>
          :
          <ion-row class="help-row">
            <ion-col size="12" class="p-0">
              <ion-img src={helpbanner.src} alt="banner" style={{ height: "100px" }} />
            </ion-col>
            <ion-col size="12" class="ion-margin-top">
              <ion-row>
                <ion-col size-lg="6" size-md="6" size-xs="6">
                  <a href="tel:+917676320000">
                    <ion-card class="cancel-card">
                      <ion-card-header>
                        <ion-img src={callwithus.src} alt="call" style={{ height: "80px" }} />
                      </ion-card-header>
                      <ion-card-content>
                        <ion-label class="card-label">{dataLocalization.Call_to_us}</ion-label>
                      </ion-card-content>
                    </ion-card>
                  </a>
                </ion-col>
                <ion-col size-lg="6" size-md="6" size-xs="6">
                  <ion-card class="cancel-card cursor-pointer" onClick={() => setIsCancelOrderOpen(true)}>
                    <ion-card-header>
                      <ion-img src={cancelorder.src} alt="cancelorder" style={{ height: "80px" }} />
                    </ion-card-header>
                    <ion-card-content>
                      <ion-label class="card-label">{dataLocalization.Cancel_your_order}</ion-label>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
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
              handler: () => {
                setIsAlertOpen(false);
              }
            },
            {
              text: dataLocalization.Yes,
              handler: () => {
                CancelHandler();
              }
            }
          ]}
        />

      </ion-grid>
    </ion-content>
  );
}

export default CancelOrder;
