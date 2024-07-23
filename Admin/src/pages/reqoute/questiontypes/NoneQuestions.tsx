import { IonCol, IonGrid, IonIcon, IonItem, IonText, } from "@ionic/react";
import { phonePortraitOutline } from "ionicons/icons";
import React, { InputHTMLAttributes } from "react";
import { IQuestionTypeModel } from "../../../models/QuestionType.Model";
import { OptionQuestions } from "./OptionsQuestions";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Array<IQuestionTypeModel>,
  item: IQuestionTypeModel,
  index: any,
  elementRef: any
  clickHandler: any,
  defaultSelected?: boolean,
}

export const NoneQuestions = React.forwardRef(({ data, item, index, elementRef, clickHandler, defaultSelected, ...rest }: inputProps, ref) => {
  const subQuestions = data?.filter(options => options.ParentId === item.Identifier);
  return (
    <IonCol ref={elementRef} size="12" key={index} className="pt-0 mt-0">
      <IonItem className="pt-0 mt-0">
        <IonIcon icon={phonePortraitOutline} size="small"></IonIcon>
        <IonText className="questionaire-question">{item.DisplayName}</IonText>
      </IonItem>
      <IonGrid>
        {subQuestions && subQuestions[1]?.AnswerType === "Option" ?
          <OptionQuestions data={subQuestions} index={index} defaultSelected={defaultSelected} elementRef={elementRef} clickHandler={clickHandler}></OptionQuestions>
          : ''}
      </IonGrid>
    </IonCol>
  );
});
