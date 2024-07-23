import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { homeOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CustomerDetailView } from "../../components/customerdetailview/CustomerDetailView";

import { IMEInumber } from "../../components/imeinumber/IMEInumber";
import { Adjustment } from "../../components/adjustment/Adjustment";
import { SignaturePad } from "../../components/signaturepad/SignaturePad";
import { TechnicianDetails } from "../../components/techniciandetails/TechnicianDetails";
import { UploadImage } from "../../components/uploadimage/UploadImage";

import { useTypedSelector } from "../../features/reduxhooks/ReduxHooks";
import { IGetOrderSummaryModel } from "../../models/GetOrderSummary.Model";
import SellServices from "../../services/Sell.Services";

import "./FinalDocumentVerify.css";
import { OtpScreen } from "../../components/otpscreen/OtpScreen";

interface InputParam {
  id: string;
}

function FinalDocumentVerify() {

  const { id } = useParams<InputParam>();

  const [orderSummaryInfo, setOrderSummaryInfo] = useState<IGetOrderSummaryModel>();

  const selectedPage = useTypedSelector((state) => state.PageChangeReducer.selectedPage);

  const [route] = useState({
    IMEIPage: "IMEIPage",
    UploadImagePage: "UploadImagePage",
    Adjustment: "Adjustment",
    SignaturePad: "SignaturePad",
    OtpScreen: "OtpScreen"
  });

  const homebtn = () => {
    window.location.href = '/HomePage';
  }

  const getOrderSummaryById = () => {
    SellServices.GetOrderSummary(id).then(res => {
      if (res.status === 200) {
        setOrderSummaryInfo(res.data);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    getOrderSummaryById();
  }, [id]);

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow className="page-header ion-padding-top">
            <IonCol sizeLg="12" sizeXl="12" sizeXs="12">
              <IonItem lines="none" color="transparent">
                <IonButton size="small" color="medium" onClick={() => homebtn()}>
                  <IonIcon size="small" icon={homeOutline} />
                </IonButton>
                <IonTitle className="orderNumber" >ORDER DETAIL - {orderSummaryInfo?.OrderCode}</IonTitle>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeLg="8" sizeXs="12">
              <CustomerDetailView isButton={true} data={orderSummaryInfo} showEdit={false} />
            </IonCol>
            <IonCol sizeLg="4" sizeXs="12">
              <TechnicianDetails isButton={true} data={orderSummaryInfo} showEdit={false} />
            </IonCol>
          </IonRow>
          <IonRow>
            {selectedPage === route.IMEIPage && <IMEInumber orderId={id} statusId={orderSummaryInfo?.StatusId} ProductTypeName={orderSummaryInfo?.ProductTypeName} />}
            {selectedPage === route.UploadImagePage && <UploadImage orderId={id} statusId={orderSummaryInfo?.StatusId} />}
            {selectedPage === route.Adjustment && <Adjustment orderPayout={orderSummaryInfo?.Payout} referralCode={orderSummaryInfo?.ReferralCode} triggerOrderSummaryById={getOrderSummaryById} />}
            {selectedPage === route.SignaturePad && <SignaturePad orderId={id} data={orderSummaryInfo} statusId={orderSummaryInfo?.StatusId} />}
            {selectedPage === route.OtpScreen && <OtpScreen orderId={id} />}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default FinalDocumentVerify;
