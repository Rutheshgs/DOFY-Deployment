import React, { InputHTMLAttributes, useState } from "react";
import { IonCol, IonGrid, IonIcon, IonItem, IonModal, IonText, } from "@ionic/react";
import { phonePortraitOutline, resizeOutline } from "ionicons/icons";

import SearchModal from "../../../components/searchmodal/SearchModal";

import { IQuestionTypeModel } from "../../../models/QuestionType.Model";

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
    const selectedDisplayName = subQuestions.find(x => x.Response === true)?.DisplayName;
    const selectedId = subQuestions.find(x => x.Response === true)?.Id;

    return (
        <IonCol ref={elementRef}  sizeXl="12" sizeLg="12" sizeMd="12" sizeSm="12" sizeXs="12" key={index} className="pt-0 mt-0">
            <IonItem className="pt-0 mt-0 bg-color-white cursor-pointer" lines="none" onClick={() => setShowModel(true)}>
                <IonIcon icon={phonePortraitOutline} size="small"></IonIcon>
                <IonText className="questionaire-question">{item.DisplayName}</IonText>               
                <IonIcon slot="end" icon={resizeOutline} size="small"></IonIcon>
            </IonItem>
            <IonItem className="pt-0 mt-0 bg-color-white cursor-pointer" onClick={() => setShowModel(true)}>               
                {(selectedValue?.DisplayName || selectedDisplayName) && 
                <IonText style={{ marginLeft: '20px', color: "#3880ff" }} className="questionaire-question Sub_Questionaire">{selectedValue.DisplayName ? selectedValue.DisplayName : selectedDisplayName}</IonText>}
            </IonItem>
            <IonGrid>
                <IonModal isOpen={showModel} swipeToClose={true} onDidDismiss={() => setShowModel(false)}>
                    <SearchModal showModel={setShowModel} data={subQuestions} index={index} elementRef={elementRef}
                        clickHandler={clickHandler} selected={setSelectedValue} defaultSelected={selectedValue} heading={item} selectedId={selectedId} />
                </IonModal>
            </IonGrid>
        </IonCol>
    );
});
