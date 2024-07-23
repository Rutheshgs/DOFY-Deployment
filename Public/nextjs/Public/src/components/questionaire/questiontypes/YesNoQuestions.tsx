import { IonButton, IonCard, IonCol, IonIcon, IonItem, IonRow, IonText, } from "@ionic/react";
import React, { InputHTMLAttributes, useRef, useState } from "react";
import { IQuestionTypeModel } from "@/models/QuestionsType.Model";
import { NoneQuestions } from "./NoneQuestions";

import { IQuestionnaireThumbnailModel } from "@/models/Questionnaire.Model";
import { useTypedSelector } from "@/features/reduxhooks/ReduxHooks";
import { checkboxOutline, checkmarkDoneOutline, closeOutline } from "ionicons/icons";
import Language from '../QuestionnaireLanguage.json';
import { getUserLanguage } from "@/components/helper/Helper";



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
  const [showOptionSection, setShowOptionSection] = useState<boolean>();
  const multiSelectRef = useRef(null) as any;

  let isMobile = useTypedSelector((state) => state.FindDevice.isMobile);
  let dataLocalization = Language[getUserLanguage()];

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
        {/* <IonIcon icon={phonePortraitOutline} size="small"></IonIcon> */}
        <IonText className="questionaire-question">{index + 1}. {item.DisplayName}</IonText>
        {!isMobile &&
          <IonItem lines="none" slot="end" className="bg-color-white yes-no-items">
            <IonButton className={`btn-yes-no ${setButtonColor(true)}`} size="default" color={`${setButtonColor(true)}`} onClick={() => onToggleClick(true)}>{dataLocalization.Yes}</IonButton>
            <IonButton className="btn-yes-no" size="default" color={`${setButtonColor(false)}`} onClick={() => onToggleClick(false)}>{dataLocalization.No}</IonButton>
          </IonItem>
        }
      </IonItem>
      {item.SubHeading &&
        <IonRow>
          <IonText className="question-sub-heading">{item.SubHeading}</IonText>
        </IonRow>
      }
      {isMobile &&
        <IonRow>
          <IonCol size="6" className="ion-text-center">
            <IonCard className={`mobile-btn-yes-no-card ${activeSection === "Yes" && 'mobile-btn-yes-no-card-active'}`} onClick={() => onToggleClick(true)}>
              <IonItem lines="none" color="white" className="custom-ion-item">
                <IonCard slot="start" className="mobile-btn-yes-no-card-inline">
                  <IonIcon icon={checkmarkDoneOutline} />
                </IonCard>
                <IonText className="mobile-btn-yes-no-card-inline-text">{dataLocalization.Yes}</IonText>
              </IonItem>
            </IonCard>
          </IonCol>
          <IonCol size="6" className="ion-text-center">
            <IonCard className={`mobile-btn-yes-no-card ${activeSection === "No" && 'mobile-btn-yes-no-card-active'}`} onClick={() => onToggleClick(false)}>
              <IonItem lines="none" color="white" className="custom-ion-item">
                <IonCard slot="start" className="mobile-btn-yes-no-card-inline mobile-btn-yes-no-card-inline-red">
                  <IonIcon icon={closeOutline} />
                </IonCard>
                <IonText className="mobile-btn-yes-no-card-inline-text">{dataLocalization.No}</IonText>
              </IonItem>
            </IonCard>
          </IonCol>
        </IonRow>}
      {showOptionSection && subQuestions?.length > 0 ?
        (
          <IonRow>
            {subQuestions.map((section: IQuestionTypeModel, cIndex: number) => {
              return (
                <NoneQuestions key={cIndex} data={data} item={section} index={`${cIndex}_${index}`} elementRef={multiSelectRef} clickHandler={onOptionChange} ></NoneQuestions>
              )
            })
            }
          </IonRow>
        ) : ""}
      <IonText id={`err-yesno-text-${item.Id}`} className="err-yesno-text err-yesno-text-hide">Please specify a answer for question.</IonText>
    </IonCol>
  );
});
