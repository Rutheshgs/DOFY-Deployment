import { IonButton, IonCol, IonItem, IonRow, IonText, } from "@ionic/react";
import React, { InputHTMLAttributes, useRef, useState } from "react";
import { IQuestionTypeModel } from "../../../models/QuestionType.Model";
import { NoneQuestions } from "./NoneQuestions";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Array<IQuestionTypeModel>,
  item: IQuestionTypeModel,
  index: any,
  elementRef: any,
  clickHandler: any,
  questionIndex: number
}

export const YesNoQuestions = React.forwardRef(({ data, item, index, elementRef, clickHandler, questionIndex, ...rest }: inputProps, ref) => {
  const subQuestions = data.filter(options => options.ParentId === item.Identifier);
  const [showOptionSection, setShowOptionSection] = useState<boolean>(item.Response);
  const multiSelectRef = useRef(null) as any;

  const [activeSection, setActiveSection] = useState<"Yes" | "No" | "">("");

  const onToggleClick = async (toggleValue?: boolean) => {
    if (toggleValue == true) {
      setActiveSection("Yes");
    }
    else {
      setActiveSection("No");
    }
    setShowOptionSection(toggleValue ?? false);
    clickHandler(toggleValue, item, index);
  };

  const onOptionChange = (value: boolean, question: IQuestionTypeModel) => {
    clickHandler(value, question, index);
  }

  const setButtonColor = (buttonYes: boolean) => {
    if (showOptionSection === undefined) {
      return 'medium';
    }
    if (buttonYes) {
      return showOptionSection ? 'btn-yes-no-active' : 'medium';
    }

    return showOptionSection === false ? 'danger' : 'medium';
  };

  return (
    <IonCol ref={elementRef} size="12" key={index} style={{ height: 'auto' }} className="xl-mb-25">
      <IonItem className={`custom-ion-item-question bg-color-white ${questionIndex && 'quesion-yes-no'}`} lines="none">
        <IonText className="questionaire-question">{index + 1}. {item.DisplayName}</IonText>
        <IonItem lines="none" slot="end" className="bg-color-white yes-no-items">
          <IonButton className={`btn-yes-no ${setButtonColor(true)}`} size="default" color={`${setButtonColor(true)}`} onClick={() => onToggleClick(true)}>Yes</IonButton>
          <IonButton className="btn-yes-no" size="default" color={`${setButtonColor(false)}`} onClick={() => onToggleClick(false)}>No</IonButton>
        </IonItem>
      </IonItem>
      {item.SubHeading &&
        <IonRow>
          <IonText className="question-sub-heading">{item.SubHeading}</IonText>
        </IonRow>
      }
      {/* {showOptionSection && subQuestions?.length > 0 ?
        (
          <IonRow>
            {subQuestions.map((section: IQuestionTypeModel, cIndex: number) => {
              return (
                <NoneQuestions key={cIndex} data={data} item={section} index={`${cIndex}_${index}`} elementRef={multiSelectRef} clickHandler={onOptionChange} ></NoneQuestions>
              )
            })
            }
          </IonRow>
        ) : ""} */}
      <IonText id={`err-yesno-text-${item.Id}`} className="err-yesno-text err-yesno-text-hide">Please specify a answer for question.</IonText>
    </IonCol>
  );
});
