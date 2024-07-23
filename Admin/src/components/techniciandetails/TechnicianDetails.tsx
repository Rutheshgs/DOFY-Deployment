import {
  IonAccordion,
  IonAccordionGroup,
  IonButton, IonButtons, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonModal,
  IonRow, IonText, IonTitle, IonToast,
} from "@ionic/react";
import { callOutline, closeOutline, locationOutline, mailOutline, personCircleOutline, } from "ionicons/icons";
import { InputHTMLAttributes, useEffect, useState } from "react";

import "./TechnicianDetails.css";

import { IPersonModel } from "../../models/Person.Model"
import { IGetOrderSummaryModel } from "../../models/GetOrderSummary.Model";
import { CustomDropdown } from "../shared/CustomDropdown";
import PersonServices from "../../services/Person.Services";
import SellServices from "../../services/Sell.Services";
import { useParams } from "react-router-dom";
import React from "react";
import { isRider } from "../helper/TokenHelper";
// import { Rating } from "react-simple-star-rating";
import { HelperConstant } from "../helper/HelperConstant";
import { countrycodenumber } from "../helper/Helper";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: IGetOrderSummaryModel | undefined,
  isButton: boolean,
  showEdit: boolean
}
export const TechnicianDetails = React.forwardRef(({ data, isButton, showEdit, ...rest }: inputProps, ref) => {

  interface InputParam {
    id: string;
  }

  const { id } = useParams<InputParam>();
  const riderlogin: boolean = isRider() ?? false;
  const [savebtndisable, setSavebtndisable] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [AssigneeList, setAssigneeList] = useState<Array<IPersonModel>>([]);
  const [TechnicianAssignId, setTechnicianAssignId] = useState();
  let orderSummaryInfo: IGetOrderSummaryModel | undefined = data;

  useEffect(() => {
    const AssigneeListData = () => {
      PersonServices.GetAssigneeList().then(res => {
        setAssigneeList(res.data);
      })
    }
    AssigneeListData();
  }, [setShowModal])

  const TechnicianAssigneeData = () => {
    SellServices.AssignProcess(id, TechnicianAssignId).then(res => {
      if (res.status === 200) {
        window.location.href = '/AgentTicketView/' + id;
        setShowModal(false);
        setSuccessToast(true);

      }
    })
    setSavebtndisable(true);

  }


  // const gotoTechnician = (technicianId: number) => {
  //   window.location.href = "/technicianhistory/" + technicianId;
  //   // history.push({ pathname: "/technicianhistory", state: { technicianId } })
  // }

  return (
    <IonGrid className="p-0">
      <IonRow>
        <IonCol size="12">
          {riderlogin ? null :
            <IonAccordionGroup>
              <IonAccordion value="assignee details">
                <IonItem slot="header">
                  <IonLabel>
                    <IonRow>
                      <IonCol sizeXl="1" sizeLg="1" sizeXs="1" sizeMd="0.7" sizeSm="0.7">
                        <IonIcon color="medium" icon={personCircleOutline} />
                      </IonCol>
                      <IonCol sizeXl="7.5" sizeLg="7" sizeXs="6.5" sizeMd="9.3" sizeSm="8" className="ion-text-wrap">
                        {orderSummaryInfo?.AssigneeDetails !== null ?
                          <IonText className="td_name_space">{orderSummaryInfo?.AssigneeDetails?.AssigneeName}</IonText>
                          :
                          <IonText className="td_name_space">Technician</IonText>
                        }
                      </IonCol>
                      <IonCol sizeXl="1.5" sizeLg="3" sizeXs="4" sizeMd="2" sizeSm="1">
                        {riderlogin ? null :
                          <>
                            {showEdit ?
                              <>
                                {orderSummaryInfo?.AssigneeDetails === null ?
                                  <IonButton className="Td_btn" size="small" color="primary" onClick={() => setShowModal(true)}>
                                    Assign
                                  </IonButton>
                                  :
                                  <IonButton className="Td_btn" size="small" color="primary" onClick={() => setShowModal(true)}>
                                    ReAssign
                                  </IonButton>
                                }
                              </>
                              : null
                            }
                          </>
                        }
                      </IonCol>
                    </IonRow>
                  </IonLabel>
                </IonItem>
                <IonList slot="content">
                  <IonRow>
                    <IonModal isOpen={showModal} animated={true} swipeToClose={true} className="modal-assignee" onDidDismiss={() => setShowModal(false)}>
                      <IonRow>
                        <IonCol sizeXl="12" sizeXs="12" sizeMd="12" sizeSm="12">
                          <IonItem lines="none">
                            <IonTitle onClick={() => setShowModal(false)} className="Assignee-Order p-0">Assignee Order</IonTitle>
                            <IonButtons className="cursor-pointer" onClick={() => setShowModal(false)}>
                              <IonIcon icon={closeOutline}></IonIcon>
                            </IonButtons>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                      <IonRow >
                        <IonCol sizeXl="12" sizeXs="12" sizeMd="12" sizeSm="12">
                          <CustomDropdown label={"select Assignee"} data={AssigneeList} onIonChange={(e: any) => setTechnicianAssignId(e)} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol className="text-center" size="12">
                          <IonButton color="primary" disabled={savebtndisable} onClick={() => TechnicianAssigneeData()}>OK</IonButton>
                        </IonCol>
                      </IonRow>
                    </IonModal>
                  </IonRow>
                  {orderSummaryInfo?.AssigneeDetails === null ?
                    <IonRow>
                      <IonCol className="ion-text-center">
                        <IonText>Yet to assign Assignee</IonText>
                      </IonCol>
                    </IonRow>
                    :
                    <IonRow>
                      <IonCol sizeXl="12" sizeLg="12" sizeMd="8" sizeSm="12">
                        <IonList>
                          <IonItem lines="none" color="transparent">
                            <IonIcon slot="start" size="small" color="success" icon={callOutline} />
                            <IonText color='primary'>
                              {
                                countrycodenumber(orderSummaryInfo?.AssigneeDetails?.Mobile)
                              }
                              <a href={`tel:${orderSummaryInfo?.AssigneeDetails?.Mobile}`}>
                                {orderSummaryInfo?.AssigneeDetails?.Mobile}
                              </a>
                            </IonText> &nbsp;&nbsp;
                            <IonText color='primary'>
                              {
                                countrycodenumber(orderSummaryInfo?.AssigneeDetails?.SecondaryMobile)
                              }
                              <a  href={`tel:${orderSummaryInfo?.AssigneeDetails?.SecondaryMobile}`}>
                                {orderSummaryInfo?.AssigneeDetails?.SecondaryMobile}
                              </a>
                            </IonText>
                          </IonItem>
                          <IonItem lines="none" color="transparent">
                            <IonIcon slot="start" color="primary" size="small" icon={locationOutline} />
                            <IonText className="text-style">
                              {orderSummaryInfo?.AssigneeDetails?.Address}<br />{orderSummaryInfo?.AssigneeDetails?.Pincode}
                            </IonText>
                          </IonItem>
                          <IonItem lines="none" color="transparent">
                            <IonIcon slot="start" color="primary" size="small" icon={mailOutline} />
                            <IonText className="text-style">
                              {orderSummaryInfo?.AssigneeDetails?.Email}
                            </IonText>
                          </IonItem>
                        </IonList>
                      </IonCol>
                      <IonCol sizeXl="12" sizeLg="12" sizeMd="4" sizeXs="12" sizeSm="12" className="ion-align-self-center ion-text-center">
                        {/* <SpeedoMeter width={100} height={82} currentValueText={`Rating ${rating}`}
                      minValue={0} maxValue={5} value={rating} ringWidth={30} /> */}
                        {/* <Rating initialValue={parseInt(orderSummaryInfo?.AssigneeDetails?.UserRating)} ratingValue={0} size={35} readonly={true} tooltipArray={HelperConstant.RatingTooltip} /> */}
                      </IonCol>
                    </IonRow>
                  }
                </IonList>
              </IonAccordion>
            </IonAccordionGroup>}
        </IonCol>
      </IonRow>
      <IonToast color='success' isOpen={successToast} onDidDismiss={() => setSuccessToast(false)}
        message="Assigned Successfully" duration={2000} />
    </IonGrid>
  );
});