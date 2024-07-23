import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonIcon, IonLoading, IonRow, IonText, IonTitle, IonToast } from "@ionic/react";
import { arrowBackCircleOutline, informationCircleOutline } from "ionicons/icons";

import SignPad from "react-signature-canvas";
import Popup from "reactjs-popup";

import { useTypedDispatch } from "../../features/reduxhooks/ReduxHooks";
import { pageChange } from "../../features/reducers/DocumentScan/PageChange.Reducer";

import OrderDocumentsServices from "../../services/OrderDocuments.Services";
import { IGetOrderSummaryModel } from "../../models/GetOrderSummary.Model";

import { HelperConstant } from "../helper/HelperConstant";
import { currencyByCountry, toAmount } from "../helper/Helper";

import { CustomImg } from "../shared/CustomImage";

import "./SignaturePad.css";
import SellServices from "../../services/Sell.Services";
import { getPersonId } from "../helper/TokenHelper";
import { useHistory } from "react-router";
import { OrderPayout } from "../orderpayout/OrderPayout";
import SellOrderServices from "../../services/order/sell/SellOrder.Services";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  orderId: string,
  statusId: number,
  data?: IGetOrderSummaryModel | undefined,
}

export const SignaturePad = React.forwardRef(({ orderId, statusId, data, ...rest }: inputProps, ref) => {

  let dispatch = useTypedDispatch();
  let history = useHistory();

  const signatureCanvas = useRef({} as SignPad);
  const [orderPayoutData, setOrderPayoutData] = useState<any>();
  const [ImageSignature, setImageSignature] = useState<any>();
  const [signatureValidation, setsignatureValidation] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState(false);
  const [sign, setSign] = useState<any>();
  const signatureTypeId = HelperConstant.documentTypeId.Signature;
  const [photostype] = useState({ signature: "signature.png" });
  const [showEdit, setShowEdit] = useState(true);
  const [isReferral, setIsReferral] = useState<boolean>(false);
  const [isRender, setIsRender] = useState<boolean>(false);

  const submitHandler = () => {
    dispatch(pageChange("OtpScreen"));
  }

  const clear = () => { signatureCanvas.current?.clear(); };

  const SkipOTP = () => {
    const data = {
      OrderId: orderId,
      personId: getPersonId(),
      password: 0,
      emailTemplateId: 0
    };

    SellServices.SkipOTP(data).then(res => {
      if (res.status === 200 && res.data === true) {
        setSuccessToast(true);
        history.push(`/SuccessScreen/${orderId}`)
      }
    }).catch(ex => console.log(ex));
  }

  const save = (photostypes: any, signatureTypeId: any, close: any, skipOtp: boolean) => {

    if (signatureCanvas.current.isEmpty()) {
      setsignatureValidation(true)
    }
    else {
      const imgSave = signatureCanvas.current?.getTrimmedCanvas().toDataURL("image/jpg");
      const imageFile = dataURLtoFile(imgSave, photostypes);
      dataURLtoFile(imgSave, photostypes);
      setSign(imgSave);

      const formData = new FormData();
      formData.append("OrdersId", orderId);
      formData.append("DocumentTypeId", signatureTypeId);
      formData.append("DocumentPath", "");
      formData.append("RowOrder", "100");
      formData.append("UploadFiles", imageFile);
      formData.append("FileName", imageFile.name);
      formData.append("Specifics", "10");

      OrderDocumentsServices.AddOrderDocument(formData).then((res) => {
        if (res.status === 200) {
          close();
          if (skipOtp === true) {
            SkipOTP();
          }
          else {
            submitHandler();
          }
        }
      }).catch(e => {
        console.log(e);
      });
    }

  };
  const dataURLtoFile = (dataurl: any, filename: string) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const deleteImage = (signatureData: any) => {
    OrderDocumentsServices.DeleteOrderDocument(orderId, signatureData).then(res => {
      if (res.status === 200) {
        setImageSignature("");
      }
    }).catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    const GetDisplayDocuments = () => {
      SellOrderServices.GetOrderPayout(orderId).then((res) => {
        if (res.status === 200) {
          setIsRender(true);
          setOrderPayoutData(res.data);
        }
      }).catch(e => {
        console.log(e);
      });

      OrderDocumentsServices.GetOrderDocument(orderId, signatureTypeId).then(res => {
        if (res.status === 200) {
          if (res.data !== null) {
            var base64ImageString = `data:image/png;base64,${res.data}`;
            setImageSignature(base64ImageString);
            if ((statusId === HelperConstant.StatusId.CANCELLED || statusId === HelperConstant.StatusId.COMPLETED || statusId === HelperConstant.StatusId.FAILED) && res?.data?.length > 0) {
              setShowEdit(false);
            }
          }
          else {
            setImageSignature("");
          }
        }
      });
    }

    GetDisplayDocuments();
  }, [orderId, signatureTypeId, statusId]);

  return (
    <IonGrid>
      {isRender ?
        <>
          <IonRow>
            {ImageSignature ?
              <IonCol sizeLg="4" className="ion-align-self-center" >
                <IonCard >
                  <IonCardHeader className="signature_heading">signature</IonCardHeader>
                  <IonCardHeader>
                    <CustomImg src={`${ImageSignature}`} style={{ width: 100, height: 100 }} />
                  </IonCardHeader>
                  {showEdit ?
                    <IonCardContent className="text-center">
                      <IonButton size="small" color="danger" onClick={() => deleteImage(signatureTypeId)}> Delete </IonButton>
                    </IonCardContent> : ""
                  }
                </IonCard>
              </IonCol>
              :
              <IonCol className="text-center">
                <IonTitle>SignaturePad</IonTitle>
                <Popup
                  overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
                  modal
                  trigger={<IonButton>Open Signature Pad</IonButton>}
                  open={true}
                  closeOnDocumentClick={false}
                >

                  {(close: any) => (
                    <>
                      <>
                        <IonRow className="finalamount_display">
                          <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeXs="6" className="ion-padding">
                            <IonTitle>Final Selling Price</IonTitle>
                          </IonCol>
                          {/* <IonCol sizeXl="6" sizeLg="12" sizeMd="6" sizeXs="12" className="ion-padding">
                        <IonItem lines="none" onMouseLeave={() => setIsReferral(false)} >
                          <IonText slot="" color="success" className="text-bold">₹ {toAmount(orderPayoutData?.TotalAmount)}/-</IonText>
                          <IonIcon slot="" src={informationCircleOutline} className="cursor-pointer"  onMouseLeave={() => setIsReferral(false)} onMouseEnter={() => setIsReferral(true)} /> 
                        </IonItem>
                        { isReferral &&
                          <OrderPayout orderPayout={orderPayoutData} referralCode={data?.ReferralCode} />
                        }
                      </IonCol> */}
                          <IonCol sizeXl="5" sizeLg="5" sizeMd="4" sizeXs="4" className="ion-padding ">
                            <IonText style={{color:"#4BB543"}}  className="text-bold sp_refericon"> {currencyByCountry (toAmount(orderPayoutData?.TotalAmount))}/-</IonText>
                          </IonCol>
                          <IonCol sizeXs="2" sizeMd="2" sizeXl="1" sizeLg="1" className="ion-padding sp_refericon-size mt-1" onMouseLeave={() => setIsReferral(false)}>
                            <IonIcon src={informationCircleOutline} className="cursor-pointer" onMouseEnter={() => setIsReferral(true)} />
                            {isReferral &&
                              <div onMouseLeave={() => setIsReferral(false)}>
                                <OrderPayout orderPayout={orderPayoutData} referralCode={data?.ReferralCode} customClassName={"referral-card-sp"} />
                              </div>
                            }
                          </IonCol>
                        </IonRow>
                      </>
                      <SignPad ref={signatureCanvas} canvasProps={{ className: "signatureCanvas" }} />
                      <IonButton size="small" color="danger" onClick={close}>close</IonButton>
                      <IonButton size="small" color="warning" onClick={clear}>clear</IonButton>
                      <IonButton size="small" color="primary" onClick={() => save(photostype.signature, signatureTypeId, close, true)}> Skip Otp & Complete </IonButton>
                      <IonButton size="small" color="primary" onClick={() => save(photostype.signature, signatureTypeId, close, false)}> Save & Continue </IonButton>
                    </>
                  )}
                </Popup>
                {sign && <CustomImg className="signimg" src={sign} />}
              </IonCol>
            }
          </IonRow>
          <IonRow className="sp-btns">
            <IonCol sizeLg="12" sizeMd="12">
              <IonButton size="small" color="warning" onClick={() => dispatch(pageChange("Adjustment"))}>
                <IonIcon icon={arrowBackCircleOutline}></IonIcon> Previous</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonToast
              isOpen={signatureValidation}
              onDidDismiss={() => setsignatureValidation(false)}
              message="Your signature is required."
              duration={2000}
              color="danger"
            />
            <IonToast color='success' isOpen={successToast} onDidDismiss={() => setSuccessToast(false)}
              message="Order completed Successfully" duration={2000} />
          </IonRow>
        </>
        :
        <IonLoading
          cssClass='my-custom-class'
          isOpen={!isRender}
          message={'Please wait...'}
        />
      }
    </IonGrid>
  );
});
