import { useEffect, useState } from "react";
import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonText } from "@ionic/react";
import { closeOutline } from "ionicons/icons";

import { IQuestionTypeModel } from "../../models/QuestionsType.Model";

type Props = {
    showModel: any,
    data: Array<any>,
    clickHandler: any,
    index: any,
    elementRef: any,
    selected: any,
    defaultSelected: IQuestionTypeModel,
    heading: IQuestionTypeModel
}

function SearchModal({ showModel, data, clickHandler, index, selected, elementRef, defaultSelected, heading }: Props) {

    const [filterData, setFilterData] = useState<Array<any>>([]);
    const [radioSelected, setRadioSelected] = useState<any>(defaultSelected.Id);

    const backToHomeHandler = (notValid: boolean) => {
        showModel(notValid);
    }

    const filterHandler = (keyWord: any) => {
        if (keyWord === "") {
            return setFilterData(data);
        }
        if (keyWord) {
            const res = data.filter(x => x.Name.toLowerCase().includes(keyWord.toLowerCase()));
            if (res && res.length > 0) {
                return setFilterData(res);
            }
        }
    }

    const onOptionRadioGroup = (Id: any, questions: IQuestionTypeModel[]) => {
        if (questions && questions.length > 0) {

            for (const list of questions) {
                clickHandler(list.Id === Id, list);
                if (list.Id === Id) {
                    selected(list);
                    setRadioSelected(list.Id);
                }
            }
            showModel(false);
        }
    }

    useEffect(() => {
        setFilterData(data);
    }, [data]);

    return (
        <IonPage>
            <IonHeader>
                <IonRow>
                    <IonCol size="12">
                        <IonItem lines="none">
                            <IonText onClick={() => backToHomeHandler(false)}><b>{heading.DisplayName}</b></IonText>
                            <IonButtons slot="end" className="cursor-pointer" onClick={() => backToHomeHandler(false)}>
                                <IonIcon style={{ fontSize: "26px" }} icon={closeOutline}></IonIcon>
                            </IonButtons>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow className="ion-padding-top">
                        <IonCol size="12" className="popup-search">
                            <IonSearchbar placeholder={`Search ${heading.DisplayName}`}
                                onIonChange={(e) => filterHandler(e.detail.value)} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            <IonRadioGroup defaultChecked={radioSelected} onIonChange={(e) => onOptionRadioGroup(e.detail.value, data)} className="bg-color-white">
                                <IonRow>
                                    {filterData &&
                                        filterData.map((val: IQuestionTypeModel, i) => (
                                            <IonCol ref={elementRef} className="cursor-pointer" sizeXl="6" sizeLg="4" sizeMd="6" sizeXs="12" key={i}>
                                                <IonItem lines="none" className="location-items location-items-question">
                                                    <IonRadio value={val.Id} key={val.Id} style={{ marginRight: '5px' }} />
                                                    <IonLabel>{val.DisplayName}</IonLabel>
                                                </IonItem>
                                            </IonCol>
                                        ))}
                                </IonRow>
                            </IonRadioGroup>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default SearchModal