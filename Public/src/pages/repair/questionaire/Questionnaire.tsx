import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { IonRow, IonCol, IonCard, IonText, IonGrid, IonButton, IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { RepairpageChange } from "../../../features/reducers/repair/RepairPageChange.Reducer";
import { useTypedDispatch, useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";
import { RepairDeviceSummaryInfo } from "../../../features/reducers/repairdevicesummary/RepairDeviceSummary.Reducers";
import { modelChanger } from "../../../features/reducers/login/LoginModel.Reducer";

import RepairOrderServices from "../../../services/order/repair/RepairOrder.Services";
import MasterServices from "../../../services/Master.Services";
import { IRepairTypeModel } from "../../../models/RepairType.Model";
import { IRepairOrderModel, IRepairOrderPostModel } from '../../../models/order/repair/RepairOrder.Model'

import { currencyByCountry, getLocalStorage, getUserLanguage, getUserLocationForParam, toAmount } from "../../../components/helper/Helper";
import { HelperConstant } from "../../../components/helper/HelperConstant";
import { Skeleton } from "../../../components/skeleton/Skeleton";
import { CustomImg } from "../../../components/shared/CustomImage";

function Questionnaire() {

    let history = useHistory();
    let dispatch = useTypedDispatch();

    const personId = getLocalStorage()?.PersonId;

    const SeriesModelId = useTypedSelector(state => state.InputParamChangeReducer.ModelId);
    const colourId = useTypedSelector(state => state.InputParamChangeReducer.ColourId);
    const deviceSummaryPrice = useTypedSelector(state => state.RepairDeviceSummaryInfoReducer.RepairDeviceSummaryInfoPrice);
    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const [damageList, setDamageList] = useState<Array<IRepairTypeModel>>([]);

    const [orderData] = useState<IRepairOrderModel>({
        PersonId: personId,
        ModelVariantId: null,
        SeriesModelColorId: colourId,
        SeriesModelId: SeriesModelId,
        UserName: getLocalStorage()?.FirstName,
        SeriesModelColor: null,
        ServiceTypeId: HelperConstant.serviceTypeId.REPAIR,
        ServiceType: "",
        Id: 0,
        Created: "2022-04-13T11:46:16.538Z",
        CreatedBy: 0,
        Active: true,
        Modified: "2022-04-13T11:46:16.538Z",
        ModifiedBy: 0,
        ValidationErrors: {},
        StatusId: null,
        CancellationTypeId: null,
        OrderCode: "",
        SuggestedCost: 0,
        RequoteAmount: 0,
        FinalPaid: 0,
        RowOrder: 0,
        OrderDate: null,
        ModelVariantName: "",
        ThumbnailPath: "",
        ProductTypeName: "",
        BrandMasterName: "",
        SeriesModelName: "",
        UserMobile: "",
        SecondaryMobile: "",
        StatusName: "",
        Appointment: null as any,
        AssigneeDetails: null as any,
        OrderDocuments: null as any,
        Questionnaire: null as any,
        RepairParts: [],
        QuestionnaireResponse: null as any,
    });

    const submitHandler = () => {

        if (personId) {
            RepairOrderServices.Create({ ...orderData, SuggestedCost: deviceSummaryPrice }).then(res => {
                if (res.status === 200) {
                    // localStorage.setItem("RepairorderId", res.data);
                    history.push(`/${getUserLanguage()}${getUserLocationForParam()}/Repair-Devices-Details/${res.data}`);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }
        else {
            localStorage.setItem("Repairorders", JSON.stringify({ ...orderData, SuggestedCost: deviceSummaryPrice }));

            setTimeout(() => {
                localStorage.removeItem("Repairorders");
            }, 600000);

            if (IsMobile) {
                history.push(`/${getUserLanguage()}${getUserLocationForParam()}/login`);
            }
            else {
                dispatch(modelChanger(true));
            }
        }
    }

    const DeviceAddOrRemoveHandler = (item: IRepairTypeModel, type: "add" | "remove") => {
        if (type === "add" && item) {
            item.Enabled = false;
            let questionObject: IRepairOrderPostModel = bindQuestionModel(item);
            orderData.RepairParts.push(questionObject);
        }

        if (type === "remove" && item) {
            let fIndex = orderData.RepairParts.findIndex(it => it.RepairTypeId === item.Id);
            if (fIndex >= 0) {
                item.Enabled = true;
                orderData.RepairParts.splice(fIndex, 1);
            }
        }

        dispatch(RepairDeviceSummaryInfo([...orderData.RepairParts]));
    }

    const bindQuestionModel = (item: IRepairTypeModel): IRepairOrderPostModel => {
        return {
            RepairTypeId: item.Id,
            OrderId: null,
            PartTypeId: null,
            RepairType: item.Name,
            PartType: null,
            ServiceCharge: item.OfferPrice > 0 ? item.OfferPrice : item.AllocatedPrice,
        };
    }

    const repairTypes = (colourId: any, serviceTypeId: number) => {
        MasterServices.GetRepairTypesForSeries(colourId, serviceTypeId).then((res) => {
            if (res.status === 200) {
                setDamageList(res.data);
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    useEffect(() => {
        repairTypes(colourId, HelperConstant.serviceTypeId.REPAIR);
    }, [colourId]);

    return (
        <IonGrid>
            <IonRow className='sell-devices-header-row'>
                <IonCol>
                    <IonText className='sell-devices-text'>
                        <IonIcon icon={arrowBack} onClick={() => { dispatch(RepairpageChange("selectcolour")) }}
                            className="cursor-pointer" /> Pick your repair service
                    </IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                {damageList.length > 0 ?
                    damageList.map((item, index) => {
                        return (
                            <IonCol key={index} sizeXs="12" sizeLg="4" sizeMd="6" size="6">
                                <IonCard className="rpc-card"
                                    style={{ cursor: 'pointer' }}  >
                                    <IonRow>
                                        <IonCol sizeXs="3" sizeLg="2" >
                                            <CustomImg className="repairtype-image" src={require(`../../../assets/images/RepairParts/${item.ThumbnailPath}`)} alt={item.ThumbnailPath} />
                                        </IonCol>
                                        <IonCol sizeXs="5" sizeLg="6">
                                            <IonRow>
                                                <IonCol sizeXs="8" sizeLg="8">
                                                    <IonText>{item.Name}</IonText>
                                                </IonCol>

                                                <IonCol sizeXs="6" sizeLg="6" >
                                                    {
                                                        item.OfferPrice === 0 ?
                                                            <IonText className="rpc-offerprice">{currencyByCountry((item.AllocatedPrice) ? toAmount(item.AllocatedPrice) : 0)}</IonText>
                                                            :
                                                            <del className="rpc-allocatedrprice">{currencyByCountry((item.AllocatedPrice) ? toAmount(item.AllocatedPrice) : 0)}</del>
                                                    }
                                                </IonCol>
                                                {item.OfferPrice !== 0 &&
                                                    <IonCol sizeXs="6">
                                                        <IonText className="rpc-offerprice">{currencyByCountry((item.OfferPrice) ? toAmount(item.AllocatedPrice) : 0)}</IonText>
                                                    </IonCol>
                                                }
                                            </IonRow>
                                        </IonCol>
                                        <IonCol sizeXs="4" className="rpc-buttonCol" sizeLg="4">
                                            {item.Enabled ?
                                                <IonButton className="rpc-addbutton" size="small" fill="outline" color="white" onClick={() => DeviceAddOrRemoveHandler(item, "add")}   >Add + </IonButton> :
                                                <IonButton className="rpc-removebutton" size="small" fill="outline" color="white" onClick={() => DeviceAddOrRemoveHandler(item, "remove")}  >Remove -</IonButton>
                                            }
                                        </IonCol>
                                    </IonRow>
                                </IonCard>
                            </IonCol>
                        )
                    })
                    :
                    Skeleton("4", "6")
                }
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonButton color="white" disabled={!(orderData.RepairParts.length > 0)} className="sell-devices-btn-continue"
                        onClick={() => submitHandler()}>Finish
                    </IonButton>
                    <IonButton color="white" className="sell-devices-btn-back"
                        onClick={() => dispatch(RepairpageChange("selectcolour"))}>Back
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default Questionnaire
