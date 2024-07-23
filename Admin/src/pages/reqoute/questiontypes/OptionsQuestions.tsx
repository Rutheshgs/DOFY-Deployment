import { IonCol, IonItem, IonRadio, IonRadioGroup, IonRow, IonText, } from "@ionic/react";
import React, { InputHTMLAttributes, useState } from "react";

import { IQuestionTypeModel } from "../../../models/QuestionType.Model";
import '../Requote.css'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Array<IQuestionTypeModel>,
  index: any,
  elementRef: any,
  clickHandler: any,
  defaultSelected?: boolean
}

export const OptionQuestions = React.forwardRef(({ data, index, elementRef, clickHandler, defaultSelected, ...rest }: inputProps, ref) => {

  let selectedId = data.find(x => x.Response === true)?.Id;
  const [selectedradio, setSelectedRadio] = useState<any>();

  const onOptionRadioGroup = (Id: any, questions: IQuestionTypeModel[]) => {
    if (questions && questions.length > 0) {
      setSelectedRadio(Id);
      for (const list of questions) {
        list.Response = (list.Id === Id) ? true : null;
        clickHandler(list.Id === Id, list, index);
      }
    }
  }
  return (
    <IonRadioGroup value={defaultSelected === false ? selectedradio : selectedId} onIonChange={(e) => onOptionRadioGroup(e.detail.value, data)}>
      <IonRow>
        {data.map((option: IQuestionTypeModel, oIndex: any) => (
          <IonCol ref={elementRef} key={oIndex} sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12">
            <IonItem lines="none" className="p-0 m-0">
              <IonRadio value={option.Id} key={option.Id} style={{ marginRight: '5px' }} />
              <IonText className="questionaire-option"  >{option.DisplayName}</IonText>
            </IonItem>
          </IonCol>
        ))
        }
      </IonRow>
    </IonRadioGroup>
  );
});
