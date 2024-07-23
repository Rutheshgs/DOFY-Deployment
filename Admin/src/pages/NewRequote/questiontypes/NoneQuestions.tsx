import { IonCol, IonGrid, IonItem, IonText, } from "@ionic/react";
import React, { InputHTMLAttributes } from "react";
import { IQuestionTypeModel } from "../../../models/QuestionType.Model";
import { OptionQuestions } from "./OptionsQuestions";
import 'swiper/css';
import 'swiper/css/pagination';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Array<IQuestionTypeModel>,
  item: IQuestionTypeModel,
  index: any,
  elementRef: any
  clickHandler: any,
}

export const NoneQuestions = React.forwardRef(({ data, item, index, elementRef, clickHandler, ...rest }: inputProps, ref) => {
  const subQuestions = data.filter(options => options.ParentId === item.Identifier);

  return (
    <IonCol style={{ borderBottom: "1px solid #f7f4f4" }} ref={elementRef} size="12" key={index} className="pt-0 mt-0">
      <IonItem className="pt-0 mt-0 bg-color-white yes-no-items" lines="none">
        <IonText className="questionaire-sub-question">{item.DisplayName}</IonText>
      </IonItem>
      <IonGrid>
        {subQuestions && subQuestions[1]?.AnswerType === "Option" ?
          <OptionQuestions data={subQuestions} index={index} elementRef={elementRef} clickHandler={clickHandler}></OptionQuestions>
          : ''}
      </IonGrid>
      <IonText id={`err-yesno-text-${item.Id}`} className="err-yesno-text err-yesno-text-hide">Please specify a answer for question.</IonText>
    </IonCol>
  );
});
