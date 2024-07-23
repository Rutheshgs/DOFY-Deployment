import React, { InputHTMLAttributes, useState } from "react";
import { IonCol, IonGrid, IonIcon, IonItem, IonModal, IonText, } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";

import SearchModal from "../../../../components/searchmodal/SearchModal";

import { IQuestionTypeModel } from "../../../../models/QuestionsType.Model";

import { CustomImg } from "../../../../components/shared/CustomImage";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    data: Array<IQuestionTypeModel>,
    item: IQuestionTypeModel,
    index: any,
    elementRef: any
    clickHandler: any,
}

export const PopupQustions = React.forwardRef(({ data, item, index, elementRef, clickHandler, ...rest }: inputProps, ref) => {

    const [showModel, setShowModel] = useState(false);
    const [selectedValue, setSelectedValue] = useState<IQuestionTypeModel>({} as IQuestionTypeModel);

    const subQuestions = data.filter(options => options.ParentId === item.Identifier);

    return (
        <IonCol ref={elementRef} size="12" key={index} className="pt-0 mt-0">
            <IonItem className="pt-0 mt-0 bg-color-white cursor-pointer" onClick={() => setShowModel(true)}>
                <CustomImg
                    src={require(`../../../../assets/images/questionaire/icons/${item.EnumName}.png`)}
                    style={{ height: "32px", marginRight: "10px" }} />
                <IonText className="questionaire-question">{item.DisplayName}</IonText>
                {selectedValue?.DisplayName && <IonText style={{ marginLeft: '20px', color: "#3880ff" }} className="questionaire-question no-wrap">- {selectedValue.DisplayName}</IonText>}
                <IonIcon slot="end" icon={settingsOutline} size="small"></IonIcon>
            </IonItem>
            <IonGrid>
                <IonModal className="question-popup" isOpen={showModel} canDismiss={true} onDidDismiss={() => setShowModel(false)}>
                    <SearchModal showModel={setShowModel} data={subQuestions} index={index} elementRef={elementRef}
                        clickHandler={clickHandler} selected={setSelectedValue} defaultSelected={selectedValue} heading={item} />
                </IonModal>
            </IonGrid>
            <IonText id={`err-yesno-text-${item.Id}`} className="err-yesno-text err-yesno-text-hide">Please specify a answer for question.</IonText>
        </IonCol>
    );
});
