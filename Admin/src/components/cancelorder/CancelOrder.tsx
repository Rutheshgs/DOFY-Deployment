import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { closeOutline, closeCircleOutline } from "ionicons/icons"
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IGetOrderSummaryModel } from "../../models/GetOrderSummary.Model";
import { IOrderRejectModel } from "../../models/OrderReject.Model";
import MasterServices from "../../services/Master.Services";
import SellOrderServices from "../../services/order/sell/SellOrder.Services";
import { HelperConstant } from "../helper/HelperConstant";
import { isRider } from "../helper/TokenHelper";
import { CustomDropdown } from "../shared/CustomDropdown";
import { CustomInput } from "../shared/CustomInput";

import './CancelOrder.css'

type props = {
    orderSummaryData?: IGetOrderSummaryModel,
    setShowModal?: any,
    isCancel?: boolean,
};

function CancelOrder({ setShowModal, orderSummaryData, isCancel }: props) {

    const riderlogin: boolean = isRider() ?? false;

    const { register, handleSubmit, formState: { errors } } = useForm<IOrderRejectModel>();

    const [section, setSection] = useState<Array<any>>([]);
    const [cancellationType, setCancellationType] = useState<Array<any>>([]);

    const [cancelOrder, setCancelOrder] = useState();

    const [isButton, setisButton] = useState<boolean>(false);
    const [isButton1, setisButton1] = useState<boolean>(false);



    const onCancelOrder: SubmitHandler<IOrderRejectModel> = (data) => {
        const Data = {
            id: 0,
            created: "",
            createdBy: 0,
            active: true,
            modified: "",
            modifiedBy: 0,
            validationErrors: "",
            orderId: orderSummaryData?.Id,
            customerExpectation: 0,
            remarks: data.remarks,
            reason: data.reason
        };
        isCancel ?
            SellOrderServices.CancelOrder(Data).then(res => {
                if (res.status === 200) {
                    if (!riderlogin) {

                        window.location.href = "/HomePage";
                        setShowModal(false);
                    }
                    else {
                        window.location.href = '/technicianhistory';
                        setShowModal(false);
                    }

                }

            }).catch(e => {
                console.log(e);
            })
            :
            SellOrderServices.RejectOrder(Data).then(res => {
                if (res.status === 200) {

                    window.location.href = "/HomePage";
                    setShowModal(false);
                }
            }).catch(e => {
                console.log(e);
            })
            setisButton1(true);
            setisButton(true);


    }


    useEffect(() => {
        MasterServices.GetAllFailureType(HelperConstant.serviceTypeId.SELL).then(response => {
            if (response.status === 200) {
                setSection(response.data);
            }
        }).catch(e => {
            console.log(e);
        });

        MasterServices.GetAllCancellationType(HelperConstant.serviceTypeId.SELL).then(response => {
            if (response.status === 200) {
                setCancellationType(response.data);
            }
        }).catch(exception => console.log(exception));

    }, [])


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonItem lines="none" >
                        <IonTitle onClick={() => setShowModal(false)}> {isCancel ? 'ORDER CANCELLATION' : 'ORDER FAIL'}</IonTitle>
                        <IonButtons className="cursor-pointer" slot="end" onClick={() => setShowModal(false)}>
                            <IonIcon icon={closeOutline}></IonIcon>
                        </IonButtons>
                    </IonItem>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonLabel className="agent-text">{orderSummaryData?.OrderCode}</IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='12'>
                            <form onSubmit={handleSubmit(onCancelOrder)}>
                                <IonCol size='12'>
                                    {isCancel ?
                                        <CustomDropdown className="cancel_order" label={"Select Cancellation Reason"} dropDownClassName="co_dropdown_width" data={cancellationType} {...register("reason", { required: true })} onIonChange={(e: any) => setCancelOrder(e)} />
                                        : <CustomDropdown className="co_failorder" dropDownClassName="co_dropdown_width" label={"Select Failure Reason"} data={section} {...register("reason", { required: true })} onIonChange={(e: any) => setCancelOrder(e)} />}
                                    {errors.reason && <IonText color='danger'>Please select Reason *</IonText>}
                                </IonCol>
                                <IonCol size='12' >
                                    {!isCancel ?
                                        <CustomInput label={"Customer Expectation Amount"} placeholder="amount" type={"number"} {...register("customerExpectation", { required: false })} /> : ""}
                                    {errors.customerExpectation && <IonText className='text-danger'>Please enter the remarks</IonText>}
                                </IonCol>
                                <IonCol size='12' >
                                    <CustomInput label={"Comments"} placeholder="xxxxxx" type={"text"} {...register("remarks", { required: true })} />
                                    {errors.remarks && <IonText className='text-danger'>Please enter the remarks</IonText>}
                                </IonCol>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonItem lines="none" color="transparent">
                                            <IonButton fill="outline" color="medium" slot="end" onClick={() => setShowModal(false)}>
                                                <IonIcon icon={closeOutline}></IonIcon>
                                                Close
                                            </IonButton>
                                            {isCancel ?
                                                <IonButton color="danger" slot="end" type="submit" disabled={isButton1} >
                                                    <IonIcon icon={closeCircleOutline}></IonIcon>
                                                    Cancel Order
                                                </IonButton> :
                                                <IonButton color="danger" slot="end" type="submit" disabled={isButton} >
                                                    <IonIcon icon={closeCircleOutline}></IonIcon>
                                                    Fail Order
                                                </IonButton>}
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default CancelOrder