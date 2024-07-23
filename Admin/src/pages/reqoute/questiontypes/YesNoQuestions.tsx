import { IonButton, IonCol, IonGrid, IonItem, IonRow, IonText, } from "@ionic/react";
import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { IQuestionTypeModel } from "../../../models/QuestionType.Model";
import { NoneQuestions } from "./NoneQuestions";


interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Array<IQuestionTypeModel>,
  item: IQuestionTypeModel,
  index: any,
  elementRef: any,
  clickHandler: any,
}

export const YesNoQuestions = React.forwardRef(({ data, item, index, elementRef, clickHandler, ...rest }: inputProps, ref) => {

  const subQuestions = data?.filter(options => options.ParentId === item.Identifier);

  const [isSelected, setIsSelected] = useState<any>();
  const multiSelectRef = useRef(null) as any;

  // const onOptionRadioGroup = (Id: any, questions: IQuestionTypeModel[]) => {
  //   if (questions && questions.length > 0) {
  //     for (const list of questions) {
  //       list.Response = (list.Id === Id) ? true : null;
  //       clickHandler(list.Id === Id, list, index);
  //     }
  //   }
  // }

  const onToggleClick = async (toggleValue?: boolean) => {
    // setShowOptionSection(toggleValue ?? false);
    setIsSelected(toggleValue);
    clickHandler(toggleValue, item);
  };

  useEffect(() => {
    setIsSelected(item.Response === null ? true : false);
  }, [item.Response]);


  const onOptionChange = (value: boolean, question: IQuestionTypeModel) => {
    clickHandler(value, question);
  }

  return (
    <IonCol ref={elementRef} size="12" key={index} style={{ height: 'auto' }}>
      <IonRow>
        <IonCol size="12">
          <IonItem className="mb-15">
            {/* <IonIcon icon={phonePortraitOutline} size="small"></IonIcon> */}
            <IonText className="questionaire-question">{item.DisplayName}</IonText>
            <IonItem lines="none" slot="end">
              <IonButton data-bs-toggle="collapse" data-bs-target="#screennotworking" shape="round" className="btn-yes-no" size="small" color={isSelected ? "primary" : "medium"} disabled={isSelected === true} onClick={() => onToggleClick(true)}>Yes</IonButton>
              <IonButton data-bs-toggle="collapse" data-bs-target="#screennotworking" shape="round" className="btn-yes-no" size="small" color={isSelected ? "medium" : "primary"} disabled={isSelected === false} onClick={() => onToggleClick(false)}>No</IonButton>
            </IonItem>
          </IonItem>
        </IonCol>
        <IonCol ref={elementRef} size="12" key={index} className={`pt-0 mt-0 collapse ${isSelected && 'show'}`} id="screennotworking">
          <IonGrid>
            {subQuestions && subQuestions?.length > 0 ?
              <IonRow>
                {subQuestions.map((section: IQuestionTypeModel, cIndex: number) => {
                  return (
                    <NoneQuestions key={cIndex} data={data} item={section} defaultSelected={isSelected} index={`${cIndex}_${index}`} elementRef={multiSelectRef} clickHandler={onOptionChange}></NoneQuestions>
                  )
                })
                }
              </IonRow>
              : ''}
          </IonGrid>
        </IonCol>
      </IonRow>

    </IonCol>
  );
});
