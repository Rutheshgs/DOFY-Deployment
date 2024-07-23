import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonGrid, IonIcon, IonItem, IonList, IonRow, IonTitle } from '@ionic/react'
import { constructOutline } from 'ionicons/icons';
import React from 'react';
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { Dictionary, groupBy, map } from 'underscore';
import { HelperConstant } from '../../../components/helper/HelperConstant';

import { IGetOrderSummaryModel } from '../../../models/GetOrderSummary.Model';
import { IQuestionTypeModel } from '../../../models/QuestionType.Model';
import { IRequoteModel } from '../../../models/Requote.Model';
import SellOrderServices from "../../../services/order/sell/SellOrder.Services";
import { MultiSelectQuestions } from '../questiontypes/MultiSelectQuestions';
import { NoneQuestions } from '../questiontypes/NoneQuestions';
import { PopupQustions } from '../questiontypes/PopupQuestions';
import { YesNoQuestions } from '../questiontypes/YesNoQuestions';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: IGetOrderSummaryModel | undefined,
  id: string
}

export const FunctionalCondition = React.forwardRef(({ data, id, ...rest }: inputProps, ref) => {
  const [questionnaireData, setQuestionnaireData] = useState<Array<IQuestionTypeModel>>([]);
  let orderSummaryInfo: IGetOrderSummaryModel | undefined = data;
  const [orderedQuestionaire, setOrderedQuestionaire] = useState<Dictionary<IQuestionTypeModel[]>>();
  const [orderData, setOrderData] = useState<Array<IRequoteModel>>([]);
  const [questionTypes] = useState({ YES_OR_NO: "Yes_No", MULTI_SELECT: "Multi_Select", OPTION: "Option", NONE: 'None', POPUP: "Popup" });
  const [isButton, SetisButton] = useState<boolean>(false);

  const multiSelectRef = useRef(null) as any;

  const onRadioChange = (value: boolean, question: IQuestionTypeModel, index: number) => {
    onCheckMarkHandler(value, question, index);
  }

  const onMultiSelectHandler = (value: boolean, question: IQuestionTypeModel, index: number) => {
    onCheckMarkHandler(value, question, index);
  }

  const onCheckMarkHandler = (checked: boolean, question: IQuestionTypeModel, index?: number) => {
    const Id = question.Id;
    const fIndex = orderData.findIndex(it => it.QuestionnaireTemplateId === Id);
    const questionObject: IRequoteModel = bindQuestionModel(question, checked);


    const iIndex = questionnaireData?.findIndex(it => it.Id === question.Id);
    if (iIndex !== -1) {
      questionnaireData[iIndex] = question;
      setQuestionnaireData(questionnaireData);
      setOrderedQuestionaire(groupBy(questionnaireData ?? [], "QuestionnaireTypeName"));
    }

    if (fIndex === -1) {
      orderData.push(questionObject);
    } else {
      orderData[fIndex] = questionObject;
    }

    setOrderData(orderData);
  }

  const bindQuestionModel = (question: IQuestionTypeModel, checked: any): IRequoteModel => {
    return {
      Id: 0,
      Name: question.DisplayName,
      AnswerType: question.AnswerType,
      QuestionnaireTypeEnumName: question.QuestionnaireTypeEnumName,
      QuestionnaireTemplateId: question.Id,
      Selected: checked,
      Threshold: question.Threshold,
      RowOrder: question.RowOrder,
      Identifier: question.Identifier,
      ParentId: question.ParentId,
      OrderId: orderSummaryInfo?.Id,
      QuestionnaireTypeId: question.QuestionnaireTypeId,
      NextQuestionNo: question.NextQuestionNo
    };
  }

  const submitRequoteHandler = () => {
    switchSelectionForScreen();

    // var yesnoquestions = orderData?.filter(x => x.NextQuestionNo > 0 && x.Selected === true);
    // if (yesnoquestions?.length > 0) {
    //   for (const res of yesnoquestions) {
    //     orderedQuestionaire && map(orderedQuestionaire, (value: Array<IQuestionTypeModel>, i: any) => {
    //       let options = value?.filter(x => x.QuestionnaireTypeId === res.QuestionnaireTypeId && x.Type === questionTypes.OPTION);
    //       if (options?.length > 0) {
    //         options?.forEach(item => {
    //           onCheckMarkHandler(false, item)
    //         });
    //       }
    //     })
    //   }
    // }

    let yesnoquestions = orderData?.filter(x => x.AnswerType === "Yes_No" && x.Selected === true);
    if (yesnoquestions?.length > 0) {
      for (const res of yesnoquestions) {
        orderedQuestionaire && map(orderedQuestionaire, (value: Array<any>, i: any) => {
          const screenType = value?.filter(question => res.Identifier === question.ParentId);
          if (screenType.length > 0) {
            for (const screenResult of screenType) {
              const screenOptions = value?.filter(question => screenResult.Identifier === question.ParentId);
              if (screenOptions.length > 0) {
                for (const resScreenOption of screenOptions) {
                  onCheckMarkHandler(false, resScreenOption);
                }
              }
            }
          }
        });
      }
    }

    let result: Array<IRequoteModel> = orderData?.filter(x => x.Selected === true);

    SellOrderServices.RequoteOrder(result).then(res => {
      if (res.status === 200) {

        window.location.href = '/AgentTicketView/' + res.data;
      }
    }).catch(e => {
      console.log(e);
    });
    SetisButton(true);

  }

  const switchSelectionForScreen = () => {
    var data: Array<IQuestionTypeModel> = [];
    let list = questionnaireData?.filter(x => x.AnswerType === "Yes_No");
    list?.forEach(x => {
      data.push(x);
    });

    if (data?.length > 0) {
      data?.forEach(item => {
        let index = orderData?.findIndex(x => x.QuestionnaireTemplateId === item.Id);
        let selected = (orderData[index]?.Selected === null || orderData[index]?.Selected === true) ? false : true;
        if (index >= 0) {
          onCheckMarkHandler(selected, item)
        }
      });
    }
  }

  useEffect(() => {

    const bindQuestionModel = (question: IQuestionTypeModel, checked: any): IRequoteModel => {
      return {
        Id: 0,
        Name: question.DisplayName,
        AnswerType: question.AnswerType,
        QuestionnaireTypeEnumName: question.QuestionnaireTypeEnumName,
        QuestionnaireTemplateId: question.Id,
        Selected: checked,
        Threshold: question.Threshold,
        RowOrder: question.RowOrder,
        Identifier: question.Identifier,
        ParentId: question.ParentId,
        OrderId: orderSummaryInfo?.Id,
        QuestionnaireTypeId: question.QuestionnaireTypeId,
        NextQuestionNo: question.NextQuestionNo
      };
    }

    const GroupData = () => {
      let questions = data?.Questionnaire as Array<IQuestionTypeModel>;
      questions?.sort((a, b) => a.RowOrder > b.RowOrder ? 1 : -1).forEach((question) => {
        let result = orderSummaryInfo?.QuestionnaireResponse?.find(x => x.QuestionnaireTemplateId === question.Id);
        question.Response = result?.Selected ?? null;
        let requote = bindQuestionModel(question, question.Response);

        orderData.push(requote);
        questionnaireData.push(question)

      });

      setOrderedQuestionaire(groupBy(questions ?? [], "QuestionnaireTypeName"));
    }
    GroupData();
  }, [data, orderData, orderSummaryInfo?.Id, orderSummaryInfo?.QuestionnaireResponse, questionnaireData])

  return (
    <IonGrid>
      <IonRow>
        <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeXs='12' sizeSm='12' className='ion-text-center'>
          <IonTitle>Requote Questionnaire Details</IonTitle>
        </IonCol>
      </IonRow>
      {orderSummaryInfo?.ServiceTypeId === HelperConstant.serviceTypeId.SELL &&
        <IonRow>
          <IonCol size='12'>
            <IonRow>
              {orderedQuestionaire && map(orderedQuestionaire, (value: Array<any>) => {
                const key = value[0].QuestionnaireTypeName;
                const parentQuestions = value?.filter(question => question.ParentId === 0 && question.Type !== "Heading");
                // const childQuestions = value?.filter(question => question.ParentId > 0 && question.AnswerType === questionTypes.NONE);

                // console.log(parentQuestions)
                return (
                  <IonCol key={key} sizeLg='4' sizeXl='4' sizeXs='12' sizeMd='6'>
                    <IonCard style={{ height: '100%' }}>
                      <IonCardHeader>
                        <IonItem>
                          <IonIcon icon={constructOutline} size="small"></IonIcon>&nbsp;
                          <IonCardSubtitle color='primary' className='case-upper'>{key}</IonCardSubtitle>
                        </IonItem>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonList slot="content">
                          {parentQuestions?.map((item: any, index: any) => {
                            return (
                              <IonRow key={`${key}_${index}`}>
                                {item && item.AnswerType === questionTypes.YES_OR_NO ?
                                  <YesNoQuestions data={value} item={item} index={index} elementRef={multiSelectRef} clickHandler={onRadioChange}></YesNoQuestions> : ''
                                }
                                {item && item.AnswerType === questionTypes.NONE ?
                                  <NoneQuestions data={value} item={item} index={index} elementRef={multiSelectRef} clickHandler={onRadioChange}></NoneQuestions> : ''
                                }
                                {item && item.AnswerType === questionTypes.POPUP ?
                                  <PopupQustions data={value} item={item} index={index} elementRef={multiSelectRef} clickHandler={onRadioChange}></PopupQustions> : ''
                                }
                                {item && item.AnswerType === questionTypes.MULTI_SELECT ?
                                  <MultiSelectQuestions data={value} item={item} index={index} elementRef={multiSelectRef} clickHandler={onMultiSelectHandler} ></MultiSelectQuestions> : ''
                                }
                              </IonRow>
                            )
                          })}
                          {/* {childQuestions?.map((item: any, index: any) => {
                            return (
                              <IonRow key={`${key}_${index}`}>
                                {item && item.AnswerType === questionTypes.YES_OR_NO ?
                                  <YesNoQuestions data={value} item={item} index={index} elementRef={multiSelectRef} clickHandler={onRadioChange}></YesNoQuestions> : ''
                                }
                                {item && item.AnswerType === questionTypes.NONE ?
                                  <NoneQuestions data={value} item={item} index={index} elementRef={multiSelectRef} clickHandler={onRadioChange}></NoneQuestions> : ''
                                }
                              </IonRow>
                            )
                          })} */}
                        </IonList>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                )
              })}
            </IonRow>
          </IonCol>
        </IonRow>}
      <IonRow>
        <IonCol sizeLg='12' sizeMd='12' sizeXl='12' sizeXs='12' className=' ion-text-center ion-padding'>
          <IonButton color="danger" size="small" routerLink={`/AgentTicketView/${orderSummaryInfo?.Id}`}>Back</IonButton>
          <IonButton color="warning" size="small" onClick={() => submitRequoteHandler()} disabled={isButton}>Submit</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
})

