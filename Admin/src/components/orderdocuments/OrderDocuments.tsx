import { IonAccordion, IonAccordionGroup, IonCard, IonCardHeader, IonCol, IonGrid, IonImg, IonItem, IonLabel, IonList, IonRow, IonText } from '@ionic/react'
import { useEffect, useState } from 'react'
import { IOrderSpecificationsModel } from '../../models/OrderSpecifications.Model';
import OrderDocumentsServices from '../../services/OrderDocuments.Services';
import OrderSpecificationsServices from '../../services/OrderSpecifications.Services';
import { HelperConstant } from '../helper/HelperConstant';

type inputProps = {
    orderId: any,
}

function OrderDocuments({ orderId }: inputProps) {
    const [ImeiNumber, setImeiNumber] = useState([]);
    const [orders, setOrders] = useState<Array<any>>([]);
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
    const [ImageSignature, setImageSignature] = useState<any>();
    const [DataToDisplay, setDataToDisplay] = useState("")

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
        Signature: HelperConstant.documentTypeId.Signature
    });
    useEffect(() => {
        OrderSpecificationsServices.GetSpecificationsByOrderId(orderId).then(res => {
            if (res.status === 200) {
                setImeiNumber(res.data);
            }
        }).catch(e => {
            console.log(e);
        });

        const GetDisplayDocuments = () => {
            OrderDocumentsServices.GetOrderDocuments(orderId).then((response) => {
                setOrders(response.data);
                setDataToDisplay("ok")
                for (const res of orders) {
                    const documentTypeIdData = res.DocumentTypeId;
                    OrderDocumentsServices.GetOrderDocument(orderId, documentTypeIdData).then((res) => {
                        var base64ImageString: any = `data:image/png;base64,${res.data}`;
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
                        if (DocumentType.Signature === documentTypeIdData) {
                            setImageSignature(base64ImageString);
                        }
                    }
                    );
                }
            });
        };
        GetDisplayDocuments();

    }, [DocumentType, DataToDisplay]);
    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    {ImeiNumber.length === 0 ? "" :
                        <IonAccordionGroup>
                            <IonAccordion value="assignee details">
                                <IonItem slot="header">
                                    <IonLabel>Documents</IonLabel>
                                </IonItem>
                                <IonList slot='content'>
                                    {ImeiNumber ? <>
                                        {ImeiNumber.map((item: IOrderSpecificationsModel, i) => {
                                            <IonLabel>IMEINumber</IonLabel>
                                            return (
                                                <IonRow key={i}>
                                                    <IonCol sizeLg="12" sizeMd="12" sizeXl="12" sizeXs="12">
                                                        <IonLabel>IMEINumber:</IonLabel>
                                                        <IonText>&nbsp;{item.IMEINumber} </IonText>
                                                    </IonCol>
                                                </IonRow>
                                            )
                                        })}
                                    </> : ""}

                                    <IonRow>
                                        {imageSelfie ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${imageSelfie}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>Selfie</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                        {imageIdproofFront ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${imageIdproofFront}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>IdProofFront</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                        {imageIdproofBack ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${imageIdproofBack}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>IdproofBack</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                        {imageBill ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${imageBill}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>Bill</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                        {imagewarranty ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${imagewarranty}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>Warranty</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                        {ImageTop ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${ImageTop}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>Top</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                    </IonRow>
                                    <IonRow>
                                        {ImageBottom ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${ImageBottom}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>Bottom</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                        {ImageLeft ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${ImageLeft}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>Left</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                        {ImageRight ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${ImageRight}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>Right</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                        {ImageFront ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${ImageFront}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>Front</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                        {ImageBack ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${ImageBack}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>Back</IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                        {ImageSignature ?
                                            <IonCol sizeLg='2' sizeXs="4" sizeMd='3' sizeSm='4'>
                                                <IonCard className="image_card" >
                                                    <IonCardHeader>
                                                        <IonImg className="upload_image" src={`${ImageSignature}`} />
                                                    </IonCardHeader>
                                                    <IonItem>
                                                        <IonLabel>Signature </IonLabel>
                                                    </IonItem>
                                                </IonCard>
                                            </IonCol> : ""}
                                    </IonRow>
                                </IonList>
                            </IonAccordion>
                        </IonAccordionGroup>
                    }
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default OrderDocuments

