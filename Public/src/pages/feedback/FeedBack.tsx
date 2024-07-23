import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonItem, IonPage, IonRadioGroup, IonRow, IonText } from '@ionic/react'
import MenuButton from '../../components/menubutton/MenuButton';
import { CustomTextArea } from '../../components/shared/CustomTextArea';
import red1 from '../../assets/images/feedback/red1.png'
import red2 from '../../assets/images/feedback/red2.png'
import red3 from '../../assets/images/feedback/red3.png'
import brown from '../../assets/images/feedback/brown.png'
import green from '../../assets/images/feedback/green5.png'

import "./FeedBack.css";
import { CustomImg } from '../../components/shared/CustomImage';

function FeedBack() {
    const checkboxList = [
        { Id: 1, text: "Pickup time", isChecked: false },
        { Id: 2, text: "Price", isChecked: false },
        { Id: 3, text: "Communication", isChecked: false },
        { Id: 4, text: "Professionlism", isChecked: false },
        { Id: 5, text: "Easy of Transaction", isChecked: false },
        { Id: 6, text: "Other", isChecked: false },
    ];
    const tooltipArray = [
        'Terrible',
        'Bad',
        'Average',
        'Great',
        'Excellent',
    ]
    return (
        <IonPage className='pt-5'>
            <MenuButton pageName={undefined} backButton={'yes'} />
            <IonContent>
                <IonGrid className='ion-padding'>
                    <form>
                        <IonRow>
                            <IonCol>
                                <IonText className='styletext'>How would you rate our service</IonText>
                                <IonItem lines='none'>
                                    {/* <Rating ratingValue={0} showTooltip tooltipArray={tooltipArray} /> */}
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonText className='styletext'>What could be better?</IonText>
                                {checkboxList.map(({ Id, text, isChecked }, i) => (
                                    <IonItem key={i} lines="none">
                                        <IonCheckbox slot="start"
                                            value={Id}
                                            checked={isChecked} />
                                        <IonText>{text}</IonText>
                                    </IonItem>
                                ))}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonText className='styletext'>How likely will you recommend us?</IonText>
                                <IonRadioGroup>
                                    <IonItem lines='none'>
                                        <CustomImg src={red1} className="label" alt="feedback-ratings"/>
                                        <CustomImg src={red2} className="label" alt="feedback-ratings"/>
                                        <CustomImg src={red3} className="label" alt="feedback-ratings"/>
                                        <CustomImg src={brown} className="label" alt="feedback-ratings"/>
                                        <CustomImg src={green} className="label" alt="feedback-ratings"/>
                                    </IonItem>
                                </IonRadioGroup>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <CustomTextArea label={"Leave a command"} placeholder="type here" />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol offsetLg='9' offsetSm='6' offsetXs='6' offsetMd='8' offsetXl='10'>
                                <IonButton color="danger">Cancel</IonButton>
                                <IonButton color="success">Save</IonButton>
                            </IonCol>
                        </IonRow>
                    </form>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default FeedBack