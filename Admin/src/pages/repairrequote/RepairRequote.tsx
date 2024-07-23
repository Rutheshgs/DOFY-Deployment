import { useEffect, useState } from 'react'
import "./RepairRequote.css"

import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonText } from '@ionic/react'
import { closeCircleOutline } from 'ionicons/icons'
import { HelperConstant } from '../../components/helper/HelperConstant';
import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { IGetOrderSummaryModel } from '../../models/GetOrderSummary.Model';
import { IRepairOrderPostModel, IRepairOrderQuestionnaire } from '../../models/Repair/RepairOrder.Model';
import { IRepairTypeModel } from '../../models/Repair/RepairType.Model';
import MasterService from '../../services/Master.Services';
import { RepairDeviceSummaryInfo } from '../../features/reducers/RepairRequote/RepairRequoteSummary.Reducers';
import RepairServices from '../../services/Repair.Services';
import { useHistory } from 'react-router-dom';
import { isRider } from '../../components/helper/TokenHelper';
import { CustomImg } from '../../components/shared/CustomImage';
import { currencyByCountry, toAmount } from '../../components/helper/Helper';

function RepairRequote() {

    const riderlogin: boolean = isRider() ?? false;

    let history = useHistory();

    let dispatch = useTypedDispatch();

    let orderSummaryInfo: IGetOrderSummaryModel = useTypedSelector(state => state.OrderSummaryInfoReducer.OrderSummaryInfoData)

    let repairorderParts: Array<any> = useTypedSelector(state => state.RepairRequoteInfoReducer.RepairDeviceSummaryInfoData)

    const orderIdData = orderSummaryInfo.Appointment.OrderId;


    const [damageList, setDamageList] = useState<Array<any>>([]);

    const [orderParts] = useState<Array<any>>([])

    const bindQuestionModel = (item: IRepairTypeModel): IRepairOrderPostModel => {
        return {
            RepairTypeId: item.Id,
            OrderId: orderIdData,
            PartTypeId: null,
            RepairType: item.Name,
            PartType: null,
            ServiceCharge: item.OfferPrice > 0 ? item.OfferPrice : item.AllocatedPrice,
            RepairTypeName: item.DisplayName
        };
    }
    const defaultData = (data: []) => {
        const result = data.filter((it: IRepairTypeModel) => it.Enabled === false);
        for (const res of result) {
            let questionObject: IRepairOrderPostModel = bindQuestionModel(res);
            orderParts.push(questionObject)
        }
    }

    const DeviceAddOrRemoveHandler = (item: IRepairTypeModel, type: "add" | "remove") => {

        if (type === "add" && item) {
            item.Enabled = false;
            let questionObject: IRepairOrderPostModel = bindQuestionModel(item);
            orderParts?.push(questionObject)
        }

        if (type === "remove" && item) {
            let fIndex = orderParts?.findIndex((it: IRepairOrderQuestionnaire) => it.RepairTypeId === item.Id);
            if (fIndex >= 0) {
                item.Enabled = true;
                orderParts?.splice(fIndex, 1)
            }
        }
        dispatch(RepairDeviceSummaryInfo([...orderParts]));

    }


    const RequoteRepairData = () => {

        RepairServices.RequoteRepair(orderParts).then(res => {
            if (res.status === 200) {
                window.location.href = "/AgentTicketView/" + res.data;
            }
        })
    }

    const backButton = () => {
        history.goBack()
    }

    useEffect(() => {
        const repairTypes = (colourId: any, serviceTypeId: number) => {
            MasterService.GetRepairTypesForSeries(colourId, serviceTypeId).then(result => {
                if (result.status === 200) {
                    for (let res of result.data) {
                        res.Enabled = !orderSummaryInfo.RepairParts.find((x: IRepairOrderQuestionnaire) => x.RepairTypeId === res.Id)?.Enabled;
                    }
                    setDamageList(result.data)
                    defaultData(result.data);
                    return result.data;
                }

            }).catch(e => {
                console.log(e);
            });
        }

        repairTypes(orderSummaryInfo.SeriesModelColorId, HelperConstant.serviceTypeId.REPAIR);

    }, [orderSummaryInfo.SeriesModelColorId]);

    return (
        <IonPage>
            <IonContent>
                <IonGrid className='rr_heading'>
                    <IonRow className='rd-row'>
                        <IonCol sizeLg='8' sizeXl='8' sizeMd='8' sizeSm='12' sizeXs='12'>
                            <IonGrid>
                                <IonRow className='sell-devices-header-row'>
                                    <IonCol>
                                        <IonText className='sell-devices-text'>
                                            Physical Conditions
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    {damageList.map((item, index) => {
                                        return (
                                            <IonCol key={index} sizeXs="12" sizeLg="4" sizeMd="6" size="6">
                                                <IonCard className="rpc-card"
                                                    style={{ cursor: 'pointer' }}  >
                                                    <IonRow>
                                                        <IonCol sizeXs="3" sizeLg="2" >
                                                            <CustomImg className="repairtype-image" src={require(`../../assets/images/RepairParts/${item.ThumbnailPath.replace('.png', '.webp')}`)} alt={item.ThumbnailPath} />
                                                        </IonCol>
                                                        <IonCol sizeXs="5" sizeLg="6">
                                                            <IonRow>
                                                                <IonCol sizeXs="8" sizeLg="8">
                                                                    <IonText>{item.Name}</IonText>
                                                                </IonCol>

                                                                <IonCol sizeXs="6" sizeLg="6" >
                                                                    {
                                                                        item.OfferPrice === 0 ?
                                                                            <IonText className="rpc-offerprice">{(item.AllocatedPrice) ? currencyByCountry ( toAmount(Math.ceil(item.AllocatedPrice))) : 0}</IonText>
                                                                            :
                                                                            <del className="rpc-allocatedrprice">{(item.AllocatedPrice) ? currencyByCountry ( toAmount(Math.ceil(item.AllocatedPrice))) : 0}</del>
                                                                    }
                                                                </IonCol>
                                                                {item.OfferPrice !== 0 &&
                                                                    <IonCol sizeXs="6">
                                                                        <IonText className="rpc-offerprice">₹{item.OfferPrice}</IonText>
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
                                    }
                                </IonRow>
                                <IonRow>
                                    <IonCol sizeLg='2'>
                                        <IonButton color="white" className="repair-devices-btn-continue" onClick={() => backButton()} >Back</IonButton>
                                    </IonCol>
                                    <IonCol sizeLg='2'>
                                        <IonButton color="white" className="repair-devices-btn-back" onClick={() => RequoteRepairData()} >Finish</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>

                        </IonCol>
                        <IonCol sizeLg='4' sizeXl='4' sizeMd='4' sizeSm='12' sizeXs='12' >
                            <IonGrid>
                                <IonRow className='repair-devices-header-row'>
                                    <IonCol>
                                        <IonText className='repair-devices-text'>
                                            Device Summary
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol sizeLg='12' sizeXl='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                                        <IonList>
                                            <IonListHeader>
                                                <IonLabel className='rd-summary-list-header'>Physical Conditions</IonLabel>
                                            </IonListHeader>
                                            {orderParts.length > 0 ?
                                                <IonList>
                                                    {repairorderParts.map((item, index) => {
                                                        return (
                                                            <IonItem key={index} lines="none">
                                                                <IonLabel>
                                                                    {/* <IonIcon icon={closeCircleOutline} className='rd-summary-list-icon'></IonIcon> */}
                                                                    <IonText>{item.RepairTypeName}</IonText>
                                                                </IonLabel>
                                                            </IonItem>
                                                        )
                                                    })}
                                                </IonList>
                                                :
                                                <IonList>
                                                    {orderSummaryInfo.RepairParts?.filter(item => item.Enabled === true).map((item, index) => {
                                                        return (
                                                            <IonItem key={index} lines="none">
                                                                {item.PartTypeId !== undefined &&
                                                                    <IonLabel>
                                                                        {/* <IonIcon icon={closeCircleOutline} className='rd-summary-list-icon'></IonIcon> */}
                                                                        <IonText>{item.RepairType}</IonText>
                                                                    </IonLabel>
                                                                }
                                                            </IonItem>
                                                        )
                                                    })
                                                    }
                                                </IonList>
                                            }
                                        </IonList>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    )
}

export default RepairRequote