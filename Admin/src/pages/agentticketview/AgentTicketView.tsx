import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  IonActionSheet,
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  isPlatform,
} from "@ionic/react";
import { arrowForwardCircleOutline, arrowUndoOutline, calculatorOutline, closeCircleOutline, homeOutline } from "ionicons/icons";

import { CustomerDetailView } from "../../components/customerdetailview/CustomerDetailView";
import { TechnicianDetails } from "../../components/techniciandetails/TechnicianDetails";
import { Questionnaire } from "../../components/questionnaire/Questionnaire";
import OrderDocuments from "../../components/orderdocuments/OrderDocuments";
import CancelOrder from "../../components/cancelorder/CancelOrder";

import "./AgentTicketView.css";

import SellServices from "../../services/Sell.Services";
import { IGetOrderSummaryModel } from "../../models/GetOrderSummary.Model";

import { getDecodedAccessToken } from "../../components/helper/TokenHelper";
import { HelperConstant } from "../../components/helper/HelperConstant";
import { getLocalStorage, isValidUser, isValidUserAuthenticateForSeo } from "../../components/helper/Helper";

interface InputParam {
  id: string;
}

function AgentTicketView() {
  const { id } = useParams<InputParam>();
  const [showEdit, setShowEdit] = useState(true);
  const [showReschedule, setShowReschedule] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  let history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  let [orderSummaryInfo, setOrderSummaryInfo] = useState<IGetOrderSummaryModel>();
  const [showActionSheet, setShowActionSheet] = useState(false);
  const RetrieveOrder = (orderId: any) => {
    history.push(`/TimeDateSlot/${orderId}`)
  }

  const RescheduleOrder = (orderId: any) => {
    history.push(`/reschedule/${orderId}`)
  }

  const cancelPopup = () => {
    setShowModal(true);
    setIsCancel(true);
  }

  const RejectPopup = () => {
    setShowModal(true);
    setIsCancel(false);
  }

  useEffect(() => {
    const getOrderSummaryById = () => {
      SellServices.GetOrderSummary(id).then((res) => {
        let data = res.data as IGetOrderSummaryModel;
        setOrderSummaryInfo(res.data);
        let reschedule = data?.StatusId !== HelperConstant.StatusId.COMPLETED && data?.StatusId !== HelperConstant.StatusId.FAILED && data?.StatusId !== HelperConstant.StatusId.CANCELLED && data?.StatusId !== HelperConstant.StatusId.CANCEL_REQUEST ? true : false;
        setShowReschedule(reschedule);
        if (data?.StatusId === HelperConstant.StatusId.CANCELLED || data?.StatusId === HelperConstant.StatusId.COMPLETED
          || data?.StatusId === HelperConstant.StatusId.FAILED || data?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST) {
          setShowEdit(false);
        }
      })
    }
    getOrderSummaryById()
  }, [id])

  const continuebtn = () => {
    window.location.href = "/FinalDocumentVerify/" + id;
  }

  const homebtn = () => {
    window.location.href = '/HomePage';

  }

  const backbtn = () => {
    window.location.href = '/HomePage';
  }

  const RequotePage = () => {
    if (orderSummaryInfo?.ServiceTypeId === HelperConstant.serviceTypeId.SELL) {
      window.location.href = '/requote/' + id;
    }
    else {
      window.location.href = '/RepairRequote/' + id;
    }
  }

  useEffect(() => {
    isValidUser(getDecodedAccessToken(getLocalStorage().Token));
    isValidUserAuthenticateForSeo(getDecodedAccessToken(getLocalStorage().Token));
  }, []);

  return (
    <IonPage>
      <IonContent >
        <IonGrid className="home-bg-color p-0">
          <IonRow className="page-header ion-padding-top">
            <IonCol sizeLg="12" sizeXl="12" sizeXs="12" sizeMd="12">
              <IonItem lines="none" color="transparent">
                <IonButton size="small" color="medium" onClick={() => homebtn()}>
                  <IonIcon size="small" icon={homeOutline} />
                </IonButton>
                <IonText className="orderNumber" >ORDER DETAIL - {orderSummaryInfo?.OrderCode}  {orderSummaryInfo?.ReferralCode && <> :({orderSummaryInfo?.ReferralCode})</>}</IonText>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeMd="12" sizeXl="8" sizeLg="8" sizeXs="12">
              <CustomerDetailView isButton={true} data={orderSummaryInfo} showEdit={showEdit} />
            </IonCol>
            <IonCol sizeMd="12" sizeXl="4" sizeLg="4" sizeXs="12">
              <TechnicianDetails isButton={false} data={orderSummaryInfo} showEdit={showEdit} />
            </IonCol>
          </IonRow>
          <OrderDocuments orderId={id} />
          <IonRow>
            <IonCol size="12">
              <Questionnaire data={orderSummaryInfo} />
            </IonCol>
          </IonRow>
          {isPlatform("android") || isPlatform("ios") ? <IonRow><IonCol className="text-center"><IonButton onClick={() => setShowActionSheet(true)} class="button button-light">
            Show Controllers
          </IonButton><IonActionSheet isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            buttons={[
              {
                text: orderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ? "Retrieve" : (orderSummaryInfo?.AssigneeDetails && orderSummaryInfo?.AssigneeDetails?.Id > 0 && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.FAILED
                  && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.CANCELLED && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.COMPLETED) ? "Continue" : null as any,
                id: orderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ? 'Retrieve-button' : (orderSummaryInfo?.AssigneeDetails && orderSummaryInfo?.AssigneeDetails?.Id > 0) && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.FAILED
                  && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.CANCELLED && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.COMPLETED ? "Retrieve-button" : "Retrieve-buttons",
                icon: orderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ? arrowForwardCircleOutline : (orderSummaryInfo?.AssigneeDetails && orderSummaryInfo?.AssigneeDetails?.Id > 0 && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.FAILED
                  && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.CANCELLED && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.COMPLETED) ? arrowForwardCircleOutline : null as any,
                handler: () => {
                  orderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ? RetrieveOrder(orderSummaryInfo?.Id) : (orderSummaryInfo?.AssigneeDetails && orderSummaryInfo?.AssigneeDetails?.Id > 0) || orderSummaryInfo?.StatusId === HelperConstant.StatusId.FAILED ? continuebtn() : null as any;
                }
              },
              {
                text: showEdit ? 'Re-quote' : null as any,
                id: showEdit ? 'Re-quote' : 'Re-quotes',
                icon: showEdit ? calculatorOutline : null as any,
                handler: () => {
                  showEdit && RequotePage();
                }
              },
              {
                text: showReschedule ? 'Reschedule' : null as any,
                id: showReschedule ? 'Reschedule' : 'Reschedules',
                icon: showReschedule ? arrowForwardCircleOutline : null as any,
                handler: () => {
                  showReschedule && setIsAlertOpen(true);
                }
              },
              {
                text: orderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ? "Cancel Order" : showEdit && "Fail",
                id: orderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ? "cancelOrder" : showEdit ? 'cancel-order' : 'cancel-orders',
                icon: orderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ? closeCircleOutline : showEdit && closeCircleOutline,
                handler: () => {
                  orderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ? cancelPopup() : showEdit && RejectPopup();
                }
              }, {
                text: 'Back',
                id: 'back-button',
                icon: arrowUndoOutline,
                handler: () => {
                  backbtn();
                }
              }

            ]}>
            </IonActionSheet></IonCol></IonRow> :
            <IonRow className="page-header mt-0 ion-justify-content-center" >
              <IonCol className="backbtn" sizeXs="6" sizeSm="6" offsetLg="3.8" offsetXl="5.5" offsetMd="3" sizeLg="1.2" sizeXl="1" sizeMd="1.5">
                <IonButton fill="outline" color="danger" size="small" onClick={() => backbtn()}>
                  <IonIcon icon={arrowUndoOutline}></IonIcon>
                  Back
                </IonButton>
              </IonCol>
              {showEdit &&
                <IonCol sizeXs="6" sizeSm="6" sizeXl="1.2" sizeLg="1.5" sizeMd="2">
                  <IonButton size="small" color="warning" onClick={() => RequotePage()}>
                    <IonIcon icon={calculatorOutline} />Re-quote
                  </IonButton>
                </IonCol>
              }

              <IonCol sizeXs="6" sizeSm="6" sizeXl="1" sizeLg="1.2" sizeMd="1.5">
                {orderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ?
                  <IonButton className="CancelOrderbtn" color="danger" size="small" onClick={() => cancelPopup()}>
                    <IonIcon icon={arrowForwardCircleOutline}></IonIcon>
                    Cancel Order
                  </IonButton> : showEdit ?
                    <IonButton className="backbtn" size="small" color="danger" onClick={() => RejectPopup()}>
                      <IonIcon icon={closeCircleOutline}></IonIcon>
                      Fail&nbsp;&nbsp;
                    </IonButton> : ""}
              </IonCol>
              <>
                {showReschedule ?
                  <IonCol sizeXs="6" sizeSm="6" sizeLg="1.8" sizeXl="1.4" sizeMd="2">
                    <IonButton color="primary" size="small" onClick={() => setIsAlertOpen(true)}>
                      <IonIcon icon={arrowForwardCircleOutline}></IonIcon>
                      Reschedule
                    </IonButton>
                  </IonCol>
                  : ""
                }
                {orderSummaryInfo?.StatusId === HelperConstant.StatusId.CANCEL_REQUEST ?
                  <IonCol offsetLg="1" offsetXl="0.5" offsetMd="1" sizeXs="6" sizeSm="6" sizeLg="1" sizeXl="1" sizeMd="2">
                    <IonButton color="primary" size="small" onClick={() => RetrieveOrder(orderSummaryInfo?.Id)}>
                      <IonIcon icon={arrowForwardCircleOutline}></IonIcon>
                      Retrieve
                    </IonButton>
                  </IonCol> :
                  <>
                    {
                      (orderSummaryInfo?.AssigneeDetails && orderSummaryInfo?.AssigneeDetails?.Id > 0 && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.FAILED
                        && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.CANCELLED && orderSummaryInfo?.StatusId !== HelperConstant.StatusId.COMPLETED) ?
                        <IonCol sizeXs="6" sizeSm="6" sizeLg="1" sizeXl="1" offsetXl="0" offsetLg="0" sizeMd="2">
                          <IonButton size="small" color="primary" onClick={() => continuebtn()}>
                            <IonIcon icon={arrowForwardCircleOutline}></IonIcon>
                            Continue
                          </IonButton>
                        </IonCol> : ""
                    }
                  </>

                }
              </>
            </IonRow>
          }

        </IonGrid>
        <IonModal isOpen={showModal} swipeToClose={true} onDidDismiss={() => setShowModal(false)} >
          <CancelOrder orderSummaryData={orderSummaryInfo} setShowModal={setShowModal} isCancel={isCancel} />
        </IonModal>

        <IonAlert isOpen={isAlertOpen}
          onDidDismiss={() => setIsAlertOpen(false)}
          header={"Confirmation"}
          subHeader={"Are you sure you want to Reschedule?"}
          buttons={[{
            text: "Yes",
            handler: () => RescheduleOrder(orderSummaryInfo?.Id)
          }, {
            text: "No",
            handler: () => setIsAlertOpen(false)
          }]}
        />
      </IonContent>
    </IonPage>
  );
}

export default AgentTicketView;
