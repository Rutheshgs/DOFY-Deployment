import { IonButton, IonCard, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonText, IonTitle } from "@ionic/react";
import { addCircleOutline, checkmarkCircleOutline, closeCircleOutline, qrCodeOutline, trash } from "ionicons/icons";
import React from "react";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { pageChange } from "../../features/reducers/DocumentScan/PageChange.Reducer";
import { useTypedDispatch } from "../../features/reduxhooks/ReduxHooks";
import { IOrderSpecificationsModel } from "../../models/OrderSpecifications.Model";
import OrderSpecificationsServices from "../../services/OrderSpecifications.Services";
import { restrictInput, onKeyDown } from "../helper/Helper";
import { HelperConstant } from "../helper/HelperConstant";

import "./IMEInumber.css";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  orderId: string;
  statusId: number;
  ProductTypeName?: string
}

type FormValues = {
  device: {
    Active?: boolean
    Created?: any
    CreatedBy?: any
    IEMIVerified?: any
    IMEINumber: string
    Id?: any
    IsValid?: boolean
    Modified?: any
    ModifiedBy?: any
    OrderId?: any
    RowOrder?: any
    id?: any
  }[];
};

export const IMEInumber = React.forwardRef(({ orderId, statusId, ProductTypeName, ...rest }: inputProps, ref) => {

  let dispatch = useTypedDispatch();

  const [ImeiNumber, setImeiNumber] = useState<Array<IOrderSpecificationsModel>>();
  const [showEdit, setShowEdit] = useState(true);
  const [deleteIMEINumber, setDeleteIMEINumber] = useState<Array<any>>([]);

  const { register, control, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
    defaultValues: {
      device: [{ IMEINumber: "", IEMIVerified: 1, OrderId: orderId, RowOrder: 100, Active: true }]
    },
    mode: "onBlur",
    criteriaMode: "all",
  });


  const { fields, append, remove } = useFieldArray({
    name: "device",
    control
  });

  const onSubmit = (data: FormValues) => {
    if (ImeiNumber?.length === 0) {
      OrderSpecificationsServices.SumbitOrderSpecifications(data.device).then((res) => {
        if (res.status === 200) {
          dispatch(pageChange("UploadImagePage"));
        }
      });
    }
    else {
      OrderSpecificationsServices.UpdateOrderSpecifications(data.device).then((res) => {
        if (res.status === 200) {
          dispatch(pageChange("UploadImagePage"));
        }
      })
    }
  }

  const PreviousBtn = () => {
    window.location.href = (`AgentTicketView/${orderId}`)
  }

  const deleteIMEI = (fields: any, indexs: number, field: any) => {
    const deleteState = deleteIMEINumber.map((obj: any, index: number) => {
      if (indexs === index) {
        return { ...obj, Active: false };
      }
      return obj;
    });
    setDeleteIMEINumber(deleteState)
    remove(indexs);
    OrderSpecificationsServices.UpdateOrderSpecifications(deleteState).then((res) => {
      if (res.status === 200) {
      }
    });

  }

  useEffect(() => {
    OrderSpecificationsServices.GetSpecificationsByOrderId(orderId).then(res => {
      if (res.status === 200) {
        // reset(res.data);
        setDeleteIMEINumber(res.data)
        const result = res.data.filter((x: IOrderSpecificationsModel) => x.Active === true)
        // setTimeout(() => {
        reset({ device: res.data });
        // }, 1000);
        setImeiNumber(res.data);
        if ((statusId === HelperConstant.StatusId.CANCELLED || statusId === HelperConstant.StatusId.COMPLETED || statusId === HelperConstant.StatusId.FAILED) && res?.data?.length > 0) {
          setShowEdit(false);
        }
      }
    });
  }, [reset, watch]);

  return (
    <IonGrid>
      <IonCard>
        <IonRow>
          <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
            {ProductTypeName === "Phone" ?
              <IonTitle className="ion-text-center" >
                <IonIcon icon={qrCodeOutline}></IonIcon>&nbsp;
                IMEI NUMBER
              </IonTitle> :
              <IonTitle className="ion-text-center" >
                SERIAL NUMBER
              </IonTitle>
            }
          </IonCol>
          <IonCol sizeLg="12" sizeXl="12" sizeXs="12" sizeMd="12">
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map((field, index) => {
                return (
                  <IonRow key={field.id}>
                    <IonCol sizeLg="8" sizeXl="8" sizeXs="7" sizeMd="8">
                      <IonItem>
                        {ProductTypeName === "Phone" ?
                          <IonLabel position="stacked">IMEI NUMBER {index + 1}  </IonLabel> :
                          <IonLabel position="stacked">SERIAL NUMBER {index + 1}</IonLabel>
                        }
                        {ProductTypeName === "Phone" ?
                          <IonInput
                            maxlength={15}
                            inputMode="numeric"
                            type="text"
                            onKeyDown={onKeyDown}
                            onIonChange={(e: any) => { restrictInput(e, 15) }}
                            {...register(`device.${index}.IMEINumber` as const, { required: true, maxLength: 15, minLength: 15 })}
                            className={errors?.device?.[index]?.IMEINumber ? "error" : ""}
                          />
                          :
                          <IonInput
                            type="text"
                            {...register(`device.${index}.IMEINumber` as const, { required: true })}
                            className={errors?.device?.[index]?.IMEINumber ? "error" : ""}
                          />
                        }
                      </IonItem>
                    </IonCol>
                    <IonCol sizeLg="1" sizeXl="1" sizeXs="1" sizeMd="1">
                      {ProductTypeName === "Phone" ?
                        <>
                          {watch(`device.${index}.IMEINumber`).length === 15 ?
                            <IonIcon className="checkmark_icon" color='success' icon={checkmarkCircleOutline} /> :
                            <IonIcon className="close_icon" color='danger' icon={closeCircleOutline} />
                          }
                        </>
                        :
                        null
                      }
                    </IonCol>
                    <IonCol sizeLg="1.5" sizeXl="1.5" sizeXs="2" sizeMd="1.5">
                      <IonButton size="small" style={{ marginTop: "30px" }} type="button" onClick={() => append({ IMEINumber: "", IEMIVerified: 1, OrderId: orderId, RowOrder: 100, Active: true })}>
                        <IonIcon icon={addCircleOutline} />
                      </IonButton>
                    </IonCol >
                    <IonCol sizeLg="1.5" sizeXl="1.5" sizeXs="2" sizeMd="1.5">

                      <IonButton size="small" style={{ marginTop: "30px" }} color="danger" type="button" disabled={index === 0} onClick={() => deleteIMEI(fields, index, field)}>
                        <IonIcon icon={trash} />
                      </IonButton>
                    </IonCol>
                    {ProductTypeName === "Phone" ?
                      <>
                        {errors?.device?.[index]?.IMEINumber?.type === "required" ? <IonText color='danger'>Please Enter IMEI Number *</IonText> : ""}
                        {errors?.device?.[index]?.IMEINumber?.type === "minLength" ? <IonText color='danger'>IMEI Number should be 15 digits</IonText> : ""}
                        {errors?.device?.[index]?.IMEINumber?.type === "maxLength" ? <IonText color='danger'>IMEI Number should be 15 digits</IonText> : ""}
                      </>
                      :
                      <>
                        {errors?.device?.[index]?.IMEINumber?.type === "required" ? <IonText color='danger'>Please Enter serial number *</IonText> : ""}
                      </>
                    }
                  </IonRow>
                );
              })}
              <IonButton size="small" color="warning" onClick={() => PreviousBtn()} >previous</IonButton>
              <IonButton size="small" color="warning" type='submit'>next</IonButton>
            </form>
          </IonCol>
        </IonRow>
      </IonCard>
    </IonGrid>
  );
});
