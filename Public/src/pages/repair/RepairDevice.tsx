import { useEffect, useRef, useState } from "react";
import { IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonText } from "@ionic/react";

import { useTypedDispatch, useTypedSelector } from "../../features/reduxhooks/ReduxHooks";
import { PriceRepairDeviceSummaryInfo, resetRepairDeviceSummaryInfo } from "../../features/reducers/repairdevicesummary/RepairDeviceSummary.Reducers";

import SelectBrand from "./selectbrand/SelectBrand";
import SelectDevice from "./selectdevice/SelectDevice";
import SelectModel from "./selectmodel/SelectModel";
import SelectColour from "./selectcolour/SelectColour";
import Questionnaire from "./questionaire/Questionnaire";
import Banner from "../../components/banner/Banner";
import Footer from "../../components/footer/Footer";
import TrustedBanner from "../../components/trustedbanner/TrustedBanner";

import { IRepairOrderPostModel } from "../../models/order/repair/RepairOrder.Model";

import { HelperConstant } from "../../components/helper/HelperConstant";
import { CustomImg } from "../../components/shared/CustomImage";

import './RepairDevice.css';
import { currencyByCountry, toAmount } from "../../components/helper/Helper";

function RepairDevice() {

    let dispatch = useTypedDispatch();

    const [routPage] = useState({ selectDevice: "selectdevice", selectBrand: "selectbrand", selectSeries: "selectseries", selectModel: "selectmodel", selectColour: "selectcolour", questionnaire: "questionnaire" });
    let selector = useTypedSelector((state) => state.RepairPageChangeReducer.selectedPage);
    let selectorId = useTypedSelector((state) => state.InputParamChangeReducer);
    let columnSize = selector.includes('questionnaire') ? 8 : 12;

    let repairOrderSummaryInfo: Array<any> = useTypedSelector(state => state.RepairDeviceSummaryInfoReducer.RepairDeviceSummaryInfoData);
    let QuestionsThumbnailPath: string = useTypedSelector(state => state.RepairDeviceSummaryInfoReducer.QuestionsThumbnailPath);

    const contentRef = useRef<HTMLIonContentElement | null>(null);

    const scrollToTop = (selectorId: any) => {
        contentRef.current && contentRef.current.scrollToTop();
    };

    useEffect(() => {
        const resetQuestions = () => {
            if (selector !== routPage.questionnaire) {
                dispatch(resetRepairDeviceSummaryInfo());
            }
        }

        const getSuggestCost = () => {
            let sum = 0;
            for (const price of repairOrderSummaryInfo) {
                sum += price.ServiceCharge;
            }
            dispatch(PriceRepairDeviceSummaryInfo(sum));
        }

        getSuggestCost();
        resetQuestions();
        scrollToTop(selectorId);
    }, [dispatch, selector, routPage, repairOrderSummaryInfo, selectorId]);

    return (
        <IonPage>
            <IonContent scrollEvents={true} ref={contentRef}>
                <IonGrid className='p-0 rd-grid'>
                    <IonRow className='rd-header-row'>
                        <IonCol>
                            <IonText className='rd-header-text'> Repair Your Devices </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className='rd-row'>
                        <IonCol sizeMd={columnSize.toString()} sizeXs='12'>
                            {selector === routPage.selectDevice &&
                                <SelectDevice />
                            }
                            {selector === routPage.selectBrand &&
                                <SelectBrand />
                            }
                            {selector === routPage.selectModel &&
                                <SelectModel />
                            }
                            {selector === routPage.selectColour &&
                                <SelectColour />
                            }
                            {selector === routPage.questionnaire && (
                                <Questionnaire />
                            )}
                        </IonCol>
                        <IonCol sizeMd='4' hidden={columnSize === 12}>
                            <IonGrid>
                                <IonRow className='repair-devices-header-row'>
                                    <IonCol>
                                        <IonText className='repair-devices-text'>
                                            Price Summary
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol sizeMd='8'>
                                        <IonList>
                                            <IonListHeader>
                                                <IonLabel className='rd-summary-list-header'>Physical Conditions</IonLabel>
                                            </IonListHeader>
                                            {repairOrderSummaryInfo.length > 0 &&
                                                repairOrderSummaryInfo.map((item: IRepairOrderPostModel, index) => {
                                                    return (
                                                        <IonItem key={index} lines="none">
                                                            {item.PartTypeId !== undefined &&
                                                                <IonLabel>
                                                                    <IonText>{item.RepairType}</IonText>
                                                                    <IonText className="rd-summary-list-text">{currencyByCountry((item.ServiceCharge) ? toAmount(item.ServiceCharge) : 0)}</IonText>
                                                                </IonLabel>
                                                            }
                                                        </IonItem>
                                                    )
                                                })}
                                        </IonList>
                                    </IonCol>
                                    <IonCol sizeMd='4'>
                                        <CustomImg src={`${HelperConstant.imageAPI}/${QuestionsThumbnailPath}`} alt={QuestionsThumbnailPath} className={"img-fluid mt-2"} />
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <Banner />
                <TrustedBanner />
                <Footer />
            </IonContent>
        </IonPage>
    )
}

export default RepairDevice