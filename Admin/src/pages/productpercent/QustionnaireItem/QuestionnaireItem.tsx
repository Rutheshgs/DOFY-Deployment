import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonIcon, IonInput, IonItem, IonRow, IonText, } from "@ionic/react";
import { caretForwardCircleOutline, constructOutline } from "ionicons/icons";
import React, { InputHTMLAttributes } from "react";
import { Dictionary, groupBy, map } from "underscore";
import { IThresholdModel } from "../../../models/Threshold.Model";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    data: Array<IThresholdModel>,
    onChangeHandler: any,
}

export const QuestionnaireItem = React.forwardRef(({ data, onChangeHandler, ...rest }: inputProps, ref) => {
    let groupedQuestionaire: Dictionary<IThresholdModel[]> = groupBy(data ?? [], "QuestionnaireTypeName");
    return (
        <IonRow className="p-0">
            {groupedQuestionaire && map(groupedQuestionaire, (value: Array<IThresholdModel>, index) => {
                const key = value[0].QuestionnaireTypeName;
                return (
                    <IonCol key={index} sizeLg="4" sizeMd="4" sizeXl="4" sizeSm="12" sizeXs="12">
                        <IonCard className="m-0 p-0" style={{ height: '100%' }}>
                            <IonCardHeader className="propercent-card m-0 p-0">
                                <IonItem>
                                    <IonIcon icon={constructOutline} size="small"></IonIcon>&nbsp;
                                    <IonCardSubtitle color='primary' className='case-upper'>{key}</IonCardSubtitle>
                                    <IonItem slot="end" lines="none" color="transparent" className="m-0 p-0">
                                        <IonInput maxlength={3} slot="end" value={value[0].Threshold} placeholder="0"
                                            onIonChange={(e) => onChangeHandler(value[0], e.detail.value)}></IonInput>
                                    </IonItem>
                                </IonItem>
                            </IonCardHeader>
                            <IonCardContent className="propercent-card m-0 p-0">
                                {value.map((item: IThresholdModel, iIndex: any) => {
                                    return (
                                        <IonItem key={iIndex} lines={item.ParentId === 0 ? 'none' : 'inset'}
                                            hidden={item.Type === 'Heading'}>
                                            <IonIcon icon={caretForwardCircleOutline} color="tertiary" size="small"
                                                hidden={item.AnswerType === 'None' || item.ParentId === 0}>
                                            </IonIcon>
                                            <IonText className={item.ParentId === 0 || item.AnswerType === 'None'
                                                ? 'pv_questionnaire_title' : 'pv_questionnaire_name'}>
                                                {item.DisplayName}
                                            </IonText>
                                            <IonItem slot="end" lines="none" color="transparent" className="m-0 p-0"
                                                hidden={!item.IsEditable}>
                                                <IonInput maxlength={3} slot="end" value={item.Threshold} placeholder="0"
                                                    onIonChange={(e) => onChangeHandler(item, e.detail.value)}></IonInput>
                                            </IonItem>
                                        </IonItem>
                                    )
                                }
                                )}
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                )
            }
            )}
        </IonRow>
    );
});
