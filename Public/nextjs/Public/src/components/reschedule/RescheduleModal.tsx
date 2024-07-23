import { useState, useEffect } from 'react';
import {
    IonButton,
    IonCard,
    IonCol,
    IonContent,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonText,
    IonTextarea
} from '@ionic/react';

import MasterServices from '../../services/Master.Services';
import { ISellOrderModel } from '../../models/order/sell/SellOrder.Model';
import { IAppointmentModel } from '../../models/Appointment.Model';
import SellOrderServices from '../../services/order/sell/SellOrder.Services';

import { HelperConstant } from '../helper/HelperConstant';
import { CustomDropdown } from '../shared/CustomDropdown';

import { addressPageChange } from '../../features/reducers/address/AddressPageChange.Reducers';
import { useTypedDispatch } from "../../features/reduxhooks/ReduxHooks";
import { InputParamChange } from '../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../features/actiontypes/Input.ActionTypes';

import { SubmitHandler, useForm } from 'react-hook-form';
import moment from "moment";

import './RescheduleModal.css'
import { Direction, getUserLocationForParam } from '../helper/Helper';
import { getUserLanguage } from '../../components/helper/Helper';
import Language from "./RescheduleModelLanguage.json";

import dofylogo from "../../assets/images/phase2/dofy-logo.png";
import { useRouter } from 'next/router';


type props = {
    orderSummary: ISellOrderModel,
    setShowModal: any,
};

const RescheduleModal = ({ setShowModal, orderSummary }: props) => {

    let history = useRouter();
    let dispatch = useTypedDispatch();
    let dataLocalization = Language[getUserLanguage()];


    const { register, handleSubmit, formState: { errors } } = useForm<IAppointmentModel>();

    const [section, setSection] = useState<Array<any>>([]);
    const [remarks, setRemarks] = useState<any>()

    const onCreateAddress: SubmitHandler<IAppointmentModel> = (data) => {
        const Data: IAppointmentModel = {
            Id: orderSummary.Appointment.Id,
            Created: orderSummary.Created,
            CreatedBy: orderSummary.CreatedBy,
            Active: true,
            Modified: orderSummary.Modified,
            ModifiedBy: orderSummary.ModifiedBy,
            OrderId: orderSummary.Appointment.OrderId,
            AssigneeId: null,
            UserAddresId: orderSummary.Appointment.UserAddresId,
            AppointmentDate: orderSummary.Appointment.AppointmentDate,
            StartTime: orderSummary.Appointment.StartTime,
            EndTime: orderSummary.Appointment.EndTime,
            Remarks: remarks,
            TechnicianComments: '',
            RowOrder: 0,
            IsReschedule: true,
            AppointmentCity: "",
            AppointmentPincode: orderSummary.Appointment.AppointmentPincode,
            address: '',
            ValidationErrors: {},
            reasonId: data.reasonId
        }
        SellOrderServices.Reschedule(Data).then(res => {
            if (res.status === 200) {
                setShowModal(false);
                setTimeout(() => {
                    if (HelperConstant.serviceTypeId.SELL === orderSummary.ServiceTypeId) {
                        dispatch(addressPageChange("timedateslot"));
                        history.push(`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/schedule/${orderSummary.Appointment.OrderId}`);
                    }
                    else {
                        dispatch(addressPageChange("repairtimedateslot"));
                        history.push(`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/Repair-schedule/${orderSummary.Appointment.OrderId}`);
                    }
                }, 500);
            }
        })
    }

    useEffect(() => {
        MasterServices.GetAllRescheduledType(HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setSection(res.data);
                dispatch(InputParamChange({ payload: orderSummary.Appointment.UserAddresId, type: ActionType.ADDRESS_ID }));
            }
        }).catch(e => {
            console.log(e);
        });
    }, [dispatch, orderSummary.Appointment.UserAddresId]);

    return (
        <IonPage dir={Direction()}>
            {/* <IonHeader>
                <IonToolbar>
                    <IonItem lines="none">
                        <IonText className='header-title'>{dataLocalization.Please_Provide_Reschedule_Reason}</IonText>
                    </IonItem>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow className='os-main-row'>
                        {orderSummary.Appointment &&
                            <IonCol sizeMd='4' size='6' className='ion-text-center'>
                                <IonText className='main-row-header'>{dataLocalization.Appointment_Date}</IonText><br />
                                <IonText>{moment(orderSummary?.Appointment.AppointmentDate).format('L')}</IonText>
                            </IonCol>
                        }
                        <IonCol sizeMd='4' size='6' className='ion-text-center'>
                            <IonText className='main-row-header'>{dataLocalization.Order_Status}</IonText><br />
                            <IonText >{orderSummary?.ExternalStatus}</IonText>
                        </IonCol>
                        {orderSummary.Appointment &&
                            <IonCol sizeMd='4' size='6' className='ion-text-center last-col'>
                                <IonText className='main-row-header'>{dataLocalization.City}</IonText><br />
                                <IonText>{orderSummary?.Appointment.AppointmentCity}</IonText>
                            </IonCol>
                        }
                    </IonRow>
                    <IonRow>
                        <IonCol size='12'>
                            <form onSubmit={handleSubmit(onCreateAddress)}>
                                <IonCol size='12'>
                                    <CustomDropdown dropDownClassName={'reschedule_modal'} label={"Select Reason *"} data={section} onIonChange={() => { }} {...register("reasonId", { required: true })} />
                                    {errors.reasonId && <IonText color='danger'>{dataLocalization.Please_select_Reason}</IonText>}
                                </IonCol>
                                <IonCol size='12' >
                                    <IonItem>
                                        <IonLabel position="floating">{dataLocalization.Comments}</IonLabel>
                                        <IonTextarea value={remarks} onIonChange={e => setRemarks(e.detail.value)} />
                                    </IonItem>
                                </IonCol>
                                <IonRow>
                                    <IonCol size='12' className='ion-text-center'>
                                        <IonButton className="Reschedule-order-btn-schedule" mode='ios' color="white" type="submit" >{dataLocalization.Save}</IonButton>
                                        <IonButton className="Reschedule-order-btn-cancel" mode='ios' type="button" color='white' onClick={() => setShowModal(false)}>{dataLocalization.Close}</IonButton>
                                    </IonCol>
                                </IonRow>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent> */}

            <IonContent>
                <IonRow className="rm_padding-adjustment">
                    <IonCol sizeLg="2" sizeMd="3" sizeXs="3" sizeXl="2">
                        <img src={dofylogo.src} alt="dofy-logo"></img>
                    </IonCol>
                    <IonCol sizeLg="12" sizeXs="12" sizeMd="12" className="mt-3">
                        <IonText className="rm_signin-text">{dataLocalization.Please_Provide_Reschedule_Reason}</IonText>
                    </IonCol>
                    <IonCol sizeLg="12" sizeMd="12" sizeXs="12" sizeXl="12" className="mt-1 p-0">
                        <IonRow>
                            {orderSummary.Appointment &&
                                <IonCol sizeLg='4' sizeXl='4' sizeXs='12' sizeMd='4' className='text-center '>
                                    <IonCard className='rm_card-style'>
                                        <IonLabel className='rm_card-label'>{dataLocalization.Appointment_Date}</IonLabel><br />
                                        <IonText className='rm_card-text'>{moment(orderSummary?.Appointment.AppointmentDate).format('DD/MM/YYYY')}</IonText>
                                    </IonCard>
                                </IonCol>
                            }
                            <IonCol sizeLg='4' sizeXl='4' sizeXs='12' sizeMd='4' className='text-center'>
                                <IonCard className='rm_card-style'>
                                    <IonLabel className='rm_card-label'>{dataLocalization.Order_Status}</IonLabel><br />
                                    <IonText className='rm_card-text'>{orderSummary?.ExternalStatus}</IonText>
                                </IonCard>
                            </IonCol>
                            {orderSummary.Appointment &&
                                <IonCol sizeLg='4' sizeXl='4' sizeXs='12' sizeMd='4' className='text-center'>
                                    <IonCard className='rm_card-style'>
                                        <IonLabel className='rm_card-label'>{dataLocalization.City}</IonLabel><br />
                                        <IonText className='rm_card-text'>{orderSummary?.Appointment.AppointmentCity}</IonText>
                                    </IonCard>
                                </IonCol>
                            }
                        </IonRow>
                    </IonCol>
                    <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12" className="mt-1">
                        <CustomDropdown dropDownClassName={'reschedule_modal'} label={dataLocalization.Select_Reason} data={section} onIonChange={() => { }} {...register("reasonId", { required: true })} />
                        {errors.reasonId && <IonText color='danger'>{dataLocalization.Please_select_Reason}</IonText>}
                    </IonCol>
                    <IonCol sizeLg='12'>
                        <IonItem color='lig'>
                            <IonLabel position="floating">{dataLocalization.Comments}</IonLabel>
                            <IonTextarea value={remarks} onIonChange={e => setRemarks(e.detail.value)} />
                        </IonItem>
                    </IonCol>
                    <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12" className="text-center mt-2">
                        <IonButton expand="full" className="ls_btn-color" onClick={handleSubmit(onCreateAddress)}
                            color="transparent"
                            title="Continue"
                            type="submit">{dataLocalization.Save}
                        </IonButton>
                    </IonCol>
                    <IonCol sizeLg='12' className='ion-text-center'>
                        <IonText className='rm_close-btn' color='medium' onClick={() => setShowModal(false)} >{dataLocalization.Close}</IonText>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default RescheduleModal;