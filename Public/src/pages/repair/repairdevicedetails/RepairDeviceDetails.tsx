import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonText } from "@ionic/react"

import RepairOrderServices from '../../../services/order/repair/RepairOrder.Services';

import { addressPageChange } from "../../../features/reducers/address/AddressPageChange.Reducers";
import { resetPageChange } from "../../../features/reducers/repair/RepairPageChange.Reducer";
import { ResetInputParam } from "../../../features/reducers/shared/InputParams.Reducers";
import { useTypedDispatch } from "../../../features/reduxhooks/ReduxHooks";

import { IRepairOrderModel } from "../../../models/order/repair/RepairOrder.Model";
import { HelperConstant } from "../../../components/helper/HelperConstant";

import TrustedBanner from "../../../components/trustedbanner/TrustedBanner";
import Banner from "../../../components/banner/Banner";
import Footer from "../../../components/footer/Footer";
import { CustomImg } from "../../../components/shared/CustomImage";
import { currencyByCountry, getUserLanguage, getUserLocationForParam, toAmount } from "../../../components/helper/Helper";

interface InputParams {
    id: string;
}

function RepairDevicesDetails() {

    const { id } = useParams<InputParams>();

    let dispatch = useTypedDispatch();
    let history = useHistory();

    const [orderSummary, setOrderSummary] = useState<IRepairOrderModel>();

    const routerHandler = () => {
        dispatch(addressPageChange("currentaddress"));
        dispatch(ResetInputParam());
        dispatch(resetPageChange());

        history.push(`/${getUserLanguage()}${getUserLocationForParam()}/Repair-schedule/${id}`);
    }
    // const routerHandlers = () => {
    //     dispatch(RepairpageChange("questionnaire"));
    //     history.push(`/RepairDevicesDetails/${id}`)
    // }

    useEffect(() => {
        const GetOrderSummary = () => {
            RepairOrderServices.GetOrderSummary(id).then(res => {
                if (res.status === 200) {
                    setOrderSummary(res.data);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }

        GetOrderSummary();
    }, [id, dispatch]);

    return (
        <IonPage>
            {/* <MenuButton pageName={"Device Details"} backButton={"yes"} /> */}
            {orderSummary &&
                <IonContent>
                    <IonGrid className="p-0">
                        <IonRow className='sd-header-row'>
                            <IonCol>
                                <IonText className='sd-header-text'> Repair Your Devices </IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow className='rd-row'>
                            <IonCol sizeMd="12">
                                <IonRow className='sell-devices-header-row'>
                                    <IonCol sizeMd="8" size="8">
                                        <IonText className='sell-devices-text'>
                                            Devices Details
                                        </IonText>
                                    </IonCol>
                                    <IonCol size="4">
                                        {/* <IonText className="dd-price">Rs. 55,000</IonText> */}
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol sizeMd="9" size="12">
                                        <IonList>
                                            <IonListHeader>
                                                <IonLabel className='sd-summary-list-header'>{orderSummary?.BrandMasterName}</IonLabel>
                                            </IonListHeader>
                                            <IonItem>
                                                <IonLabel>Device Type :</IonLabel>
                                                <IonLabel><b>{orderSummary?.ProductTypeName}</b></IonLabel>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel>Device Brand :</IonLabel>
                                                <IonLabel><b>  {orderSummary?.SeriesModelName} - {orderSummary.SeriesModelColor}</b></IonLabel>
                                            </IonItem>
                                        </IonList>
                                    </IonCol>
                                    <IonCol sizeMd="1" size="2">
                                        <CustomImg src={`${HelperConstant.imageAPI}/${orderSummary?.ThumbnailPath}`} alt={orderSummary?.ThumbnailPath} className={"img-fluid mt-2"} style={{ height: "100px" }} />
                                    </IonCol>
                                    <IonCol sizeMd="2" size="8">
                                        <IonText className="final-price">{currencyByCountry(Math.ceil(orderSummary?.SuggestedCost) ? toAmount(orderSummary?.SuggestedCost) : 0)}</IonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size='12' >
                                        <IonText className='cursor-pointer os-header accordion-button'
                                            data-bs-toggle="collapse" data-bs-target="#RepairTypes">Device Summary</IonText>
                                    </IonCol>
                                    <IonCol size='12' className='collapse show' id="RepairTypes">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">RepairParts</th>
                                                    <th className='ion-text-center' scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderSummary?.RepairParts?.filter(x => x.ServiceCharge > 0).map((val, index) => (
                                                    <tr key={index}>
                                                        <td >{index + 1}</td>
                                                        <td>{val.RepairType}</td>
                                                        <td className='ion-text-center'>{currencyByCountry((val.ServiceCharge) ? toAmount(val.ServiceCharge) : 0)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol offsetLg="8">
                                        {/* <IonButton color="white" className="sell-devices-btn-back" onClick={() => dispatch(RepairpageChange("section1"))}>back</IonButton> */}
                                        <IonButton color="white" onClick={() => routerHandler()} className="sell-devices-btn-continue" >Repair Now</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <Banner />
                    <TrustedBanner />
                    <Footer />
                </IonContent>
            }
        </IonPage>
    )
}

export default RepairDevicesDetails

