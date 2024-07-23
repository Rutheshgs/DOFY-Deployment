import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonText, IonTitle, } from "@ionic/react";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import "./UploadImage.css";
import plusImg from "../../assets/images/Pluimg.png";

import { pageChange } from "../../features/reducers/DocumentScan/PageChange.Reducer";
import { useTypedDispatch } from "../../features/reduxhooks/ReduxHooks";

import OrderDocumentsServices from "../../services/OrderDocuments.Services";
import { arrowBackCircleOutline, arrowForwardCircleOutline, trashBin } from "ionicons/icons";
import { HelperConstant } from "../helper/HelperConstant";
import React from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  orderId: string,
  statusId: number
}

export const UploadImage = React.forwardRef(({ orderId, statusId, ...rest }: inputProps, ref) => {

  let dispatch = useTypedDispatch();

  const [imageSelfie, setImageSelfie] = useState<any>();
  const [imageIdproofFront, setIdproofFront] = useState<any>();
  const [imageIdproofBack, setIdproofBack] = useState<any>();
  const [imageBill, setImageBill] = useState<any>();
  const [imagewarranty, setImagewarranty] = useState<any>();
  const [ImageTop, setImageTop] = useState<any>();
  const [ImageBottom, setImageBottom] = useState<any>();
  const [ImageLeft, setImageLeft] = useState<any>();
  const [ImageRight, setImageRight] = useState<any>();
  const [ImageBack, setImageBack] = useState<any>();
  const [ImageFront, setImageFront] = useState<any>();
  const [showEdit, setShowEdit] = useState(true);

  const [DataToDisplay, setDataToDisplay] = useState("")

  const [orders, setOrders] = useState<Array<any>>([]);

  const uploadImage = (imageFile: any, documentTypeIdData: any) => {
    let formData = new FormData();

    formData.append("OrdersId", orderId);
    formData.append("DocumentTypeId", documentTypeIdData);
    formData.append("DocumentPath", "");
    formData.append("RowOrder", "100");
    formData.append("UploadFiles", imageFile);
    formData.append("FileName", imageFile.name);
    formData.append("Specifics", "10");
    OrderDocumentsServices.AddOrderDocument(formData).then((res) => {
      if (res.status === 200) {
      }
    });
  };

  const [photostype] = useState({
    selfie: "Selfie.png",
    IdproofFront: "Id_Front.png",
    IproofBack: "Id_Back.png",
    Bill: "Bill.png",
    warranty: "Warranty.png",
    Top: "Top.png",
    Bottom: "Bottom.png",
    Left: "Left.png",
    Right: "Right.png",
    Back: "back.png",
    Front: "Front.png"
  });

  const [DocumentType] = useState({
    selfie: HelperConstant.documentTypeId.Selfie,
    IdproofFront: HelperConstant.documentTypeId.Id_Front,
    IdproofBack: HelperConstant.documentTypeId.Id_Back,
    Bill: HelperConstant.documentTypeId.Bill,
    warranty: HelperConstant.documentTypeId.Warranty,
    Top: HelperConstant.documentTypeId.Top,
    Bottom: HelperConstant.documentTypeId.Bottom,
    Left: HelperConstant.documentTypeId.Left,
    Right: HelperConstant.documentTypeId.Right,
    Back: HelperConstant.documentTypeId.Back,
    Front: HelperConstant.documentTypeId.Front,
  });

  const takePicture = async (photostypes: any, documentTypeIdData: any) => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    const imageFile = dataURLtoFile(image.dataUrl, photostypes);
    const UploadFiles: any = image.dataUrl;

    if (photostypes === photostype.selfie && documentTypeIdData === DocumentType.selfie) {
      uploadImage(imageFile, documentTypeIdData);
      setImageSelfie(UploadFiles)
    }
    if (photostypes === photostype.IdproofFront && documentTypeIdData === DocumentType.IdproofFront) {
      uploadImage(imageFile, documentTypeIdData);
      setIdproofFront(UploadFiles)
    }
    if (photostypes === photostype.IproofBack && documentTypeIdData === DocumentType.IdproofBack) {
      uploadImage(imageFile, documentTypeIdData);
      setIdproofBack(UploadFiles)
    }
    if (photostypes === photostype.Bill && documentTypeIdData === DocumentType.Bill) {
      uploadImage(imageFile, documentTypeIdData);
      setImageBill(UploadFiles)
    }
    if (photostypes === photostype.warranty && documentTypeIdData === DocumentType.warranty) {
      uploadImage(imageFile, documentTypeIdData);
      setImagewarranty(UploadFiles);
    }
    if (photostypes === photostype.Top && documentTypeIdData === DocumentType.Top) {
      uploadImage(imageFile, documentTypeIdData);
      setImageTop(UploadFiles);
    }
    if (photostypes === photostype.Bottom && documentTypeIdData === DocumentType.Bottom) {
      uploadImage(imageFile, documentTypeIdData);
      setImageBottom(UploadFiles);
    }
    if (photostypes === photostype.Left && documentTypeIdData === DocumentType.Left) {
      uploadImage(imageFile, documentTypeIdData);
      setImageLeft(UploadFiles);
    }
    if (photostypes === photostype.Right && documentTypeIdData === DocumentType.Right) {
      uploadImage(imageFile, documentTypeIdData);
      setImageRight(UploadFiles);
    }
    if (photostypes === photostype.Front && documentTypeIdData === DocumentType.Front) {
      uploadImage(imageFile, documentTypeIdData);
      setImageFront(UploadFiles);
    }
    if (photostypes === photostype.Back && documentTypeIdData === DocumentType.Back) {
      uploadImage(imageFile, documentTypeIdData);
      setImageBack(UploadFiles);
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


  const deleteImage = (documentTypeId: any) => {
    OrderDocumentsServices.DeleteOrderDocument(orderId, documentTypeId).then(
      (res) => {
        if (DocumentType.selfie === documentTypeId) {
          setImageSelfie("");
        }
        if (DocumentType.IdproofFront === documentTypeId) {
          setIdproofFront("");
        }
        if (DocumentType.IdproofBack === documentTypeId) {
          setIdproofBack("");
        }
        if (DocumentType.Bill === documentTypeId) {
          setImageBill("");
        }
        if (DocumentType.warranty === documentTypeId) {
          setImagewarranty("");
        }
        if (DocumentType.Top === documentTypeId) {
          setImageTop("");
        }
        if (DocumentType.Bottom === documentTypeId) {
          setImageBottom("");
        }
        if (DocumentType.Left === documentTypeId) {
          setImageLeft("");
        }
        if (DocumentType.Right === documentTypeId) {
          setImageRight("");
        }
        if (DocumentType.Front === documentTypeId) {
          setImageFront("");
        }
        if (DocumentType.Back === documentTypeId) {
          setImageBack("");
        }
      }
    );
  };


  useEffect(() => {
    const GetDisplayDocuments = () => {
      OrderDocumentsServices.GetOrderDocuments(orderId).then((response) => {
        if (response.status === 200) {
          setOrders(response.data);
          if ((statusId === HelperConstant.StatusId.CANCELLED || statusId === HelperConstant.StatusId.COMPLETED || statusId === HelperConstant.StatusId.FAILED) && response?.data?.length > 0) {
            setShowEdit(false);
          }
          setDataToDisplay("ok")
          for (const res of orders) {
            const documentTypeIdData = res.DocumentTypeId;
            OrderDocumentsServices.GetOrderDocument(orderId, documentTypeIdData).then((res) => {
              if (res.status === 200) {
                let base64ImageString: any = `data:image/png;base64,${res.data}`;
                if (DocumentType.selfie === documentTypeIdData) {
                  setImageSelfie(base64ImageString);
                }
                if (DocumentType.IdproofFront === documentTypeIdData) {
                  setIdproofFront(base64ImageString);
                }
                if (DocumentType.IdproofBack === documentTypeIdData) {
                  setIdproofBack(base64ImageString);
                }
                if (DocumentType.Bill === documentTypeIdData) {
                  setImageBill(base64ImageString);
                }
                if (DocumentType.warranty === documentTypeIdData) {
                  setImagewarranty(base64ImageString);
                }
                if (DocumentType.Top === documentTypeIdData) {
                  setImageTop(base64ImageString);
                }
                if (DocumentType.Bottom === documentTypeIdData) {
                  setImageBottom(base64ImageString);
                }
                if (DocumentType.Left === documentTypeIdData) {
                  setImageLeft(base64ImageString);
                }
                if (DocumentType.Right === documentTypeIdData) {
                  setImageRight(base64ImageString);
                }
                if (DocumentType.Front === documentTypeIdData) {
                  setImageFront(base64ImageString);
                }
                if (DocumentType.Back === documentTypeIdData) {
                  setImageBack(base64ImageString);
                }
              }
            }).catch(e => {
              console.log(e);
            });
          }
        }
      }).catch(e => {
        console.log(e);
      });
    };
    GetDisplayDocuments();
  }, [DataToDisplay]);

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonTitle color="primary">
            Image upload Section
          </IonTitle>
        </IonCol>
      </IonRow>
      <IonCard>
        <IonRow className="imageCardHeader">
          <IonCol sizeXs="12" sizeLg="12" >
            <IonText className="Sub_heading" color="primary" >Customer Details</IonText>
          </IonCol>
          {/* <IonCol sizeXs="6" sizeLg="2" sizeMd="3">
            <IonGrid>
              {imageSelfie ? (
                <IonCard className="image_card" >
                  <IonCardHeader>
                    <IonImg className="upload_image" src={`${imageSelfie}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>Selfie</IonLabel>
                    {showEdit ?
                    <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.selfie)} icon={trashBin} slot="end" />
                    :null}
                  </IonItem>
                </IonCard>

              ) :
                <IonCard onClick={() => { takePicture(photostype.selfie, HelperConstant.documentTypeId.Selfie); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>Selfie</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol> */}
          <IonCol sizeXs="6" sizeLg="2" sizeMd="3" >
            <IonGrid>
              {imageIdproofFront ? (
                <IonCard >
                  <IonCardHeader>
                    <IonImg className="ui-image" src={`${imageIdproofFront}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>IdProofFront</IonLabel>
                    {showEdit ?
                      <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.IdproofFront)} icon={trashBin} slot="end" />
                      : null}
                  </IonItem>
                </IonCard>

              ) :
                <IonCard onClick={() => { takePicture(photostype.IdproofFront, HelperConstant.documentTypeId.Id_Front); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>IdFront</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol>
          <IonCol sizeXs="6" sizeLg="2" sizeMd="3">
            <IonGrid>
              {imageIdproofBack ? (
                <IonCard >
                  <IonCardHeader>
                    <IonImg className="ui-image" src={`${imageIdproofBack}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>IdproofBack</IonLabel>
                    {showEdit ?
                      <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.IdproofBack)} icon={trashBin} slot="end" />
                      : null}
                  </IonItem>
                </IonCard>

              ) :
                <IonCard onClick={() => { takePicture(photostype.IproofBack, HelperConstant.documentTypeId.Id_Back); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>IdBack</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol>
          <IonCol sizeXs="6" sizeLg="2" sizeMd="3">
            <IonGrid>
              {imageBill ? (
                <IonCard >
                  <IonCardHeader>
                    <IonImg className="ui-image" src={`${imageBill}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>Bill(optional)</IonLabel>
                    {showEdit ?
                      <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.Bill)} icon={trashBin} slot="end" />
                      : null}
                  </IonItem>
                </IonCard>

              ) :
                <IonCard onClick={() => { takePicture(photostype.Bill, HelperConstant.documentTypeId.Bill); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>Bill(optional)</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol>
          {/* <IonCol sizeXs="6" sizeLg="2" sizeMd="3">
            <IonGrid>
              {imagewarranty ? (
                <IonCard >
                  <IonCardHeader>
                    <IonImg className="ui-image" src={`${imagewarranty}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>warranty</IonLabel>
                    {showEdit ?
                    <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.warranty)} icon={trashBin} slot="end" />
                    :null}
                  </IonItem>
                </IonCard>

              ) :
                <IonCard onClick={() => { takePicture(photostype.warranty, HelperConstant.documentTypeId.Warranty); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>Warranty</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol> */}
        </IonRow>
        <IonRow>
          <IonCol sizeXs="12" sizeLg="12" sizeMd="12" >
            <IonText className="Sub_heading" color="primary" >Device Photos</IonText>
          </IonCol>
          <IonCol sizeXs="6" sizeLg="2" sizeMd="3">
            <IonGrid>
              {ImageTop ? (
                <IonCard >
                  <IonCardHeader>
                    <IonImg className="ui-image" src={`${ImageTop}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>Top</IonLabel>
                    {showEdit ?
                      <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.Top)} icon={trashBin} slot="end" />
                      : null}
                  </IonItem>
                </IonCard>

              ) :
                <IonCard onClick={() => { takePicture(photostype.Top, HelperConstant.documentTypeId.Top); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>Top</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol>

          <IonCol sizeXs="6" sizeLg="2" sizeMd="3">
            <IonGrid>
              {ImageBottom ? (
                <IonCard >
                  <IonCardHeader>
                    <IonImg className="ui-image" src={`${ImageBottom}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>Bottom</IonLabel>
                    {showEdit ?
                      <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.Bottom)} icon={trashBin} slot="end" />
                      : null}
                  </IonItem>
                </IonCard>
              ) :
                <IonCard onClick={() => { takePicture(photostype.Bottom, HelperConstant.documentTypeId.Bottom); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>Bottom</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol>

          <IonCol sizeXs="6" sizeLg="2" sizeMd="3">
            <IonGrid>
              {ImageLeft ? (
                <IonCard>
                  <IonCardHeader>
                    <IonImg className="ui-image" src={`${ImageLeft}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>Left</IonLabel>
                    {showEdit ?
                      <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.Left)} icon={trashBin} slot="end" />
                      : null}
                  </IonItem>
                </IonCard>
              ) :
                <IonCard onClick={() => { takePicture(photostype.Left, HelperConstant.documentTypeId.Left); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>Left</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol>

          <IonCol sizeXs="6" sizeLg="2" sizeMd="3">
            <IonGrid>
              {ImageRight ? (
                <IonCard>
                  <IonCardHeader>
                    <IonImg className="ui-image" src={`${ImageRight}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>Right</IonLabel>
                    {showEdit ?
                      <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.Right)} icon={trashBin} slot="end" />
                      : null}
                  </IonItem>
                </IonCard>
              ) :
                <IonCard onClick={() => { takePicture(photostype.Right, HelperConstant.documentTypeId.Right); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>Right</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol>

          <IonCol sizeXs="6" sizeLg="2" sizeMd="3">
            <IonGrid>
              {ImageFront ? (
                <IonCard>
                  <IonCardHeader>
                    <IonImg className="ui-image" src={`${ImageFront}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>Front</IonLabel>
                    {showEdit ?
                      <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.Front)} icon={trashBin} slot="end" />
                      : null}
                  </IonItem>
                </IonCard>
              ) :
                <IonCard onClick={() => { takePicture(photostype.Front, HelperConstant.documentTypeId.Front); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>Front</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol>

          <IonCol sizeXs="6" sizeLg="2" sizeMd="3">
            <IonGrid>
              {ImageBack ? (
                <IonCard>
                  <IonCardHeader>
                    <IonImg className="ui-image" src={`${ImageBack}`} />
                  </IonCardHeader>
                  <IonItem>
                    <IonLabel>Back</IonLabel>
                    {showEdit ?
                      <IonIcon size="medium" color='danger' onClick={() => deleteImage(DocumentType.Back)} icon={trashBin} slot="end" />
                      : null}
                  </IonItem>
                </IonCard>
              ) :
                <IonCard onClick={() => { takePicture(photostype.Back, HelperConstant.documentTypeId.Back); }}>
                  <IonCardHeader >
                    <IonImg src={plusImg} />
                  </IonCardHeader>
                  <IonCardContent className="text-center"> <IonLabel>Back</IonLabel> </IonCardContent>
                </IonCard>}
            </IonGrid>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="6" offsetLg="8" sizeLg="2" sizeMd="3">
            <IonButton size="small" color="warning" onClick={() => dispatch(pageChange("IMEIPage"))}>
              <IonIcon icon={arrowBackCircleOutline}></IonIcon> Previous</IonButton>
          </IonCol>
          <IonCol sizeXs="4" sizeLg="2" >
            <IonButton disabled={!imageIdproofFront || !imageIdproofBack || !ImageTop || !ImageBottom || !ImageLeft || !ImageRight || !ImageFront || !ImageBack} size="small" color="warning" onClick={() => dispatch(pageChange("Adjustment"))}>
              <IonIcon icon={arrowForwardCircleOutline}></IonIcon>Continue
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCard>
    </IonGrid>
  );
});
