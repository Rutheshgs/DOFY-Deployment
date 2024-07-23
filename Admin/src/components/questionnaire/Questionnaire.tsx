import { IonAccordion, IonAccordionGroup, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonText, IonTitle } from '@ionic/react';
import { Dictionary, groupBy, map } from "underscore";
import "./Questionnaire.css";
import { IGetOrderSummaryModel } from "../../models/GetOrderSummary.Model";
import { IRequoteModel } from '../../models/Requote.Model';
import { HelperConstant } from '../helper/HelperConstant';
import { currencyByCountry, toAmount } from '../helper/Helper';
import { InputHTMLAttributes } from 'react';
import React from 'react';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: IGetOrderSummaryModel | undefined
}

export const Questionnaire = React.forwardRef(({ data, ...rest }: inputProps, ref) =>{
  
  let orderSummaryInfo: IGetOrderSummaryModel |undefined = data;
  let orderedQuestionaire: Dictionary<IRequoteModel[]> = groupBy(orderSummaryInfo?.QuestionnaireResponse?.filter(x => x.Threshold >= 0 || x.QuestionnaireTypeId === HelperConstant.questionnaireType.DeviceAge ) ?? [], "QuestionnaireType");

  return (
    <IonGrid className=''>
      <IonRow>
        <IonCol sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12' className='ion-padding'>
        {orderSummaryInfo?.ServiceTypeId === HelperConstant.serviceTypeId.SELL ?
          <IonTitle>
            DEVICE DETAILS
          </IonTitle> :
          <IonTitle>
            PARTS DETAILS
          </IonTitle>
        }
        </IonCol>
      </IonRow>
      {orderSummaryInfo?.ServiceTypeId === HelperConstant.serviceTypeId.SELL &&
        <IonRow>
          <IonCol size='12'>
            <IonRow>
              {orderedQuestionaire && map(orderedQuestionaire, (value: Array<any>) => {
                const key = value[0].QuestionnaireType;
                return (
                  <IonCol key={key} sizeLg='6' sizeXl='4' sizeXs='12' sizeMd='12'>
                    <IonCard style={{ height: '100%' }}>
                      <IonCardHeader>
                        <IonCardTitle className='qu_title' color='primary'><IonLabel>{key}</IonLabel></IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonList slot="content">
                          {value.map((item: any, index: any) => {
                            return (
                              <IonRow key={index} >
                                <IonCol sizeLg="6" sizeXl='8' sizeXs='7' >
                                  <IonText>{item.Question}</IonText>
                                </IonCol>
                                <IonCol sizeLg="6" sizeXl='4' sizeXs='5'>
                                  <IonText>{item.ResponseText ? item.ResponseText : "--"}</IonText>
                                </IonCol>
                              </IonRow>
                            )
                          })}
                        </IonList>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                )
              })}
            </IonRow>
          </IonCol>
        </IonRow>}
      {orderSummaryInfo?.ServiceTypeId === HelperConstant.serviceTypeId.REPAIR &&
        <IonRow>
          <IonCol sizeLg='12'>
            <IonCard className='card-size-fourth'>
              <IonAccordionGroup value="open">
                <IonAccordion value="open">
                  <IonItem slot="header">
                    <IonTitle color="primary" className="qu_font-size">
                      Physical Condition
                    </IonTitle>
                  </IonItem>
                  <IonList className="p-2" slot="content">
                    <IonRow>
                      <IonCol size="3">
                        <IonText className='qu_repairName text-bold'>Repair Type</IonText>
                      </IonCol>
                      <IonCol size="7">
                        <IonText className='qu_repairName text-bold'>Part Name</IonText>
                      </IonCol>
                      <IonCol size="2">
                        <IonText className='qu_repairName text-bold '>Amount</IonText>
                      </IonCol>
                    </IonRow>
                    {orderSummaryInfo?.RepairParts?.filter(x => x.Enabled === true).map((item: any, index) => {
                      return (
                        <IonRow key={index}>
                          <IonCol size="3">
                            <IonText className='qu_repairName'>{item.RepairTypeName}</IonText>
                          </IonCol>
                          <IonCol size="7">
                            <IonText className='qu_repairName'>{item.RepairType}</IonText>
                          </IonCol>
                          <IonCol size="2">
                            <IonText className='qu_repairName'>{(item.ServiceCharge) ? currencyByCountry (item.ServiceCharge ?toAmount(item.ServiceCharge):0): "Nil"}</IonText>
                          </IonCol>
                        </IonRow>
                      );
                    })}
                  </IonList>
                </IonAccordion>
              </IonAccordionGroup>
            </IonCard>
          </IonCol>
        </IonRow>
      }
    </IonGrid >
  )
});