import { useEffect, useRef, useState } from 'react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow, isPlatform } from '@ionic/react';

import "swiper/css/effect-cards";
import "swiper/css/navigation";
import 'swiper/css/pagination';

import SelectVariant from '../sell/selectvariant/SelectVariant';
import Footer from '../../components/footer/Footer';

import "./SellYourDevice.css";

import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { ResetSelectedQuestions } from '../../features/reducers/questionnaire/Questionnaire.Reducers';
import { Direction } from '../../components/helper/Helper';
import Questionnaire from '../sell/questionaire/Questionnaire';


function SellDevice() {
    let dispatch = useTypedDispatch();

    const [routPage] = useState({ selectDevice: "selectdevice", selectBrand: "selectbrand", selectSeries: "selectseries", selectModel: "selectmodel", selectVariant: "selectvariant", questionnaire: "questionnaire" });

    let selector = useTypedSelector((state) => state.PageChangeReducer.selectedPage);
    let selectorId = useTypedSelector((state) => state.InputParamChangeReducer);

    const contentRef = useRef<HTMLIonContentElement | null>(null);

    const scrollToTop = (selectorId: any) => {
        contentRef.current && contentRef.current.scrollToTop();
    };

    useEffect(() => {
        const resetQuestions = () => {
            if (selector !== routPage.questionnaire) {
                dispatch(ResetSelectedQuestions());
            }
        }

        resetQuestions();
        scrollToTop(selectorId);
    }, [routPage, selector, dispatch, selectorId]);

    return (
        <IonPage data-aos="fade-left">
            <IonContent scrollEvents={true} ref={contentRef} >
                <IonGrid className='p-0 sd-grid' dir={Direction()}>
                    <IonRow className='sd-row bg-color-white'>
                        <IonCol size='2' sizeXs='0'></IonCol>
                        <IonCol size='8' sizeXs='12'>
                            {(selector === routPage.selectVariant || selector === routPage.selectDevice) &&
                                <SelectVariant />
                            }
                            {selector === routPage.questionnaire &&
                                <Questionnaire />
                            }
                        </IonCol>
                        <IonCol size='2' sizeXs='0'></IonCol>
                    </IonRow>
                </IonGrid>
                {isPlatform("android") || isPlatform("ios") ? <></> :
                    <Footer />
                }
            </IonContent>
        </IonPage>
    )
}

export default SellDevice