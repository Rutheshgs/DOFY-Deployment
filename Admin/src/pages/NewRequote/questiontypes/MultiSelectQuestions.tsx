import { IonCol, IonRow, IonText, IonCard, isPlatform } from "@ionic/react";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { IQuestionModel } from "../../../models/QuestionType.Model";
import { IQuestionTypeModel } from "../../../models/QuestionType.Model";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Array<IQuestionTypeModel>,
  item: IQuestionTypeModel,
  index: any,
  elementRef: any,
  response: Array<IQuestionModel>,
  clickHandler: any,
}

export const MultiSelectQuestions = React.forwardRef(({ data, item, index, elementRef, response, clickHandler, ...rest }: inputProps, ref) => {
  const subQuestions = data.filter(x => x.ParentId === item.Identifier);

  const [isToggle, setIsToggle] = useState(false);

  const onToggleClick = async (toggleValue: boolean, option: IQuestionTypeModel) => {
    clickHandler(toggleValue, option);
    setIsToggle(!isToggle);
  };

  const toggleHandler = (key: boolean) => {
    setIsToggle(key);
  }

  useEffect(() => {
    toggleHandler(isToggle);
  }, [isToggle]);

  return (
    <IonCol size="12" class="p-0 mb-15" key={index}>
      {/* <IonGrid class="p-0 m-0"> */}
      <IonRow>
        <IonCol sizeLg="12" sizeXs="12">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonText className="questionaire-question">{item.DisplayName}</IonText>
            </IonCol>
          </IonRow>
          <IonRow style={{ textAlign: "-webkit-center" }} >
            {subQuestions && item?.AnswerType === "Multi_Select" ? (
              subQuestions.map((option: IQuestionTypeModel, oIndex: any) => (
                <IonCol sizeLg="3" sizeMd="4" sizeXl="4" sizeSm="12" sizeXs="4" key={oIndex}>
                  {(response?.find(x => x.QuestionnaireTemplateId === option.Id)?.Selected === true) ?
                    (
                      <IonCard onClick={() => onToggleClick(false, option)} class="mb-1" color="light" className={`pc-card ${option.AppreciateCalculation ? 'card-selected-theme' : 'card-selected-red'}`} style={{ cursor: "pointer" }}>
                        {option && option.EnumName ?
                          <img className='pc-img' alt={`sell-${option.DisplayName}`} src={require(`../../../assets/images/questionaire/icons/${option.EnumName}_selected.png`)} />
                          : ""
                        }
                        <br />
                        {!(isPlatform("android") || isPlatform("ios")) && <br />}
                        <p className="pv_questionnaire_name" style={{ color: option.AppreciateCalculation ? '#2250b2' : '#FC3C3C' }}>
                          {option.DisplayName}
                        </p>
                      </IonCard>
                    )
                    :
                    (
                      <IonCard onClick={() => onToggleClick(true, option)} class="mb-1" color="light" className="pc-card" style={{ cursor: "pointer" }}>
                        {option && option.EnumName ?
                          <img className='pc-img' alt={`sell-${option.DisplayName}`} src={require(`../../../assets/images/questionaire/icons/${option.EnumName}_notselected.png`)} />
                          : ""
                        }
                        <br />
                        {!(isPlatform("android") || isPlatform("ios")) && <br />}
                        <p className="pv_questionnaire_name">
                          {option.DisplayName}
                        </p>
                      </IonCard>
                    )}
                </IonCol>
              )
              ))
              : ""}

          </IonRow>
        </IonCol>
      </IonRow>
      {/* </IonGrid> */}
    </IonCol>
  );
});

