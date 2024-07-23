import { IonCol, IonItem, IonRadio, IonRadioGroup, IonRow, IonText, } from "@ionic/react";
import React, { InputHTMLAttributes } from "react";

import { IQuestionTypeModel } from "@/models/QuestionsType.Model";
import { getUserLanguage } from "@/components/helper/Helper";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Array<IQuestionTypeModel>,
  index: any,
  elementRef: any,
  clickHandler: any,
}

export const OptionQuestions = React.forwardRef(({ data, index, elementRef, clickHandler, ...rest }: inputProps, ref) => {

  const onOptionRadioGroup = (Id: any, questions: IQuestionTypeModel[]) => {
    if (questions && questions.length > 0) {
      for (const list of questions) {
        clickHandler(list.Id === Id, list);
      }
    }
  }
  return (
    <IonRadioGroup onIonChange={(e) => onOptionRadioGroup(e.detail.value, data)} className="bg-color-white">
      <IonRow>
        {data?.filter(x => x.DisplayInList === true).map((option: IQuestionTypeModel, oIndex: any) => (
          <IonCol ref={elementRef} key={oIndex} sizeLg="12" className="question-yes-no" sizeMd="12" sizeSm="12" sizeXs="12">
            <IonItem lines="none" className="bg-color-white yes-no-items">
              <IonRadio value={option.Id} key={option.Id} className={`${getUserLanguage() === "ae_ar" ? "oqn-radio-ae" : "oqn-radio"}`} />&nbsp;&nbsp;
              <IonText className="questionaire-option">{option.DisplayName}</IonText>
            </IonItem>
          </IonCol>
        ))
        }
      </IonRow>
    </IonRadioGroup>
  );
});
