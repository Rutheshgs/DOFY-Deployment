import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonBadge, IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonText, IonTitle } from '@ionic/react'
import { informationCircleOutline } from 'ionicons/icons';

import { currencyByCountry, toAmount } from '../../components/helper/Helper';

import { IGetOrderSummaryModel } from '../../models/GetOrderSummary.Model';
import SellServices from '../../services/Sell.Services';

import './SuccessScreen.css';
import { OrderPayout } from '../../components/orderpayout/OrderPayout';

interface inputProps {
    orderId: string;
}

function SuccessScreen() {

    const { orderId } = useParams<inputProps>();

    const [successData, setSuccessData] = useState<IGetOrderSummaryModel>({} as IGetOrderSummaryModel);
    const [isReferral, setIsReferral] = useState<boolean>(false);

    const homePage = () => {
        // window.location.href = isRider() ? '/technicianhome' : '/HomePage';
        window.location.href = '/HomePage';
    }

    useEffect(() => {
        const getOrderSummaryById = () => {
            SellServices.GetOrderSummary(orderId).then(response => {
                if (response.status === 200) {
                    setSuccessData(response.data);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }

        getOrderSummaryById();
    }, [orderId]);

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonCard className='cardbody' >
                        <IonRow>
                            <IonCol sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12' className='ion-text-center' >
                                <IonText className='success_heading' >
                                    THANK YOU FOR YOUR ORDER
                                </IonText>
                            </IonCol>
                            <IonCol size='12' className='ion-text-center'>
                                <IonText className="orderNumber heading ">ORDER DETAIL - {successData?.OrderCode}</IonText>
                            </IonCol>
                            <IonCol className='ion-text-center' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonTitle color="primary" className="title-font-size  p-0">Brand & Model</IonTitle>
                                    </IonCol>
                                    <IonCol className="BrandMasterName" sizeLg="12" sizeMd="12" sizeSm="12">
                                        <IonBadge color="primary" className="m-1">
                                            <IonLabel>{successData?.BrandMasterName}</IonLabel>
                                        </IonBadge>
                                        <IonBadge color="primary" className="m-1">
                                            {successData?.SeriesModelName}
                                        </IonBadge>
                                        <IonBadge color="primary" className="m-1">
                                            {successData?.ModelVariantName}
                                        </IonBadge>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol sizeLg='12' className='ion-text-center' >
                                <IonRow>
                                    <IonCol size="12">
                                        <IonTitle color="primary" className="title-font-size  p-0">Price</IonTitle>
                                    </IonCol>
                                    <IonCol className="BrandMasterName" sizeLg="12" sizeMd="12" sizeSm="12">
                                        <IonBadge color="success" className="m-1" onMouseLeave={() => setIsReferral(false)}>
                                            <IonLabel>{currencyByCountry (toAmount(successData?.Payout?.TotalAmount))}/-</IonLabel>&nbsp;&nbsp;&nbsp;
                                            <IonIcon src={informationCircleOutline} className="cursor-pointer" onMouseEnter={() => setIsReferral(true)} />
                                        </IonBadge>
                                        {isReferral &&
                                            <OrderPayout orderPayout={successData?.Payout} referralCode={successData?.ReferralCode} customClassName={'referral-card-ss'} />
                                        }
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            <IonCol size='12' >
                                <IonTitle className='heading text-center ' >
                                    Your Order Is Complete!
                                </IonTitle>
                            </IonCol>
                            <IonCol sizeLg='12' className='ion-text-center'  >
                                <IonText className='heading' >
                                    You will be receiving a confirmation email with order details
                                </IonText >
                            </IonCol>
                            <IonCol size='12' className='ion-text-center' >
                                <IonButton color='warning' onClick={() => homePage()} >
                                    Go to HomePage
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default SuccessScreen