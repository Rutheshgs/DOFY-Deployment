import { IonCol, IonRow, IonItem, IonText, IonCard, IonCardHeader } from "@ionic/react";
import React, { InputHTMLAttributes } from "react";
import { IQuestionTypeModel } from "../../../models/QuestionType.Model";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Array<IQuestionTypeModel>,
  item: IQuestionTypeModel,
  index: any,
  elementRef: any, 
  clickHandler: any,
}

export const MultiSelectQuestions = React.forwardRef(({ data, item, index, elementRef, clickHandler, ...rest }: inputProps, ref) => {
  const subQuestions = data.filter(x => x.ParentId === item.Identifier);
  const onToggleClick = async (toggleValue: boolean, option: IQuestionTypeModel) => {  
    option.Response = toggleValue; 
    clickHandler(toggleValue, option, index);    
  };

  return (
    <IonCol size="12" class="p-0 mb-15" key={index}>
      {/* <IonGrid class="p-0 m-0"> */}
      <IonItem>
        <IonText className="questionaire-question">{item.DisplayName}</IonText>
      </IonItem>
      <IonRow>
        {subQuestions && item?.AnswerType === "Multi_Select" ? (
          subQuestions.map((option: IQuestionTypeModel, oIndex: any) => (
            <IonCol className="" size="12" sizeLg="12" sizeMd="12" sizeXl="12" sizeSm="12" sizeXs="12" class="p-0 mb-0" key={oIndex}>
              {option.Response ?
                (
                  <IonCard onClick={() => onToggleClick(false, option)} class="p-0 m-1" color="primary"  className="pc-card p-0 m-0" style={{ cursor: "pointer"}}>
                    <IonRow>
                      <IonCol size="12">
                        <IonCardHeader class="p-5">
                          <IonText className="pv_questionnaire_name">
                            {option.Name}
                          </IonText>
                        </IonCardHeader>
                      </IonCol>
                    </IonRow>
                  </IonCard>
                )
                :
                (
                  <IonCard onClick={() => onToggleClick(true, option)} class="p-0 m-1" color="white" className="pc-card" style={{ cursor: "pointer" }}>
                    <IonRow>
                      <IonCol size="12">
                        <IonCardHeader class="p-5">
                          <IonText className="pv_questionnaire_name">
                            {option.Name}
                          </IonText>
                        </IonCardHeader>
                      </IonCol>
                    </IonRow>
                  </IonCard>
                )}
            </IonCol>
          )
          ))
          : ""}

      </IonRow>
      {/* </IonGrid> */}
    </IonCol>
  );
});

