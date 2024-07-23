import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IonCol, IonContent, IonPage, IonRow } from "@ionic/react";

import AddressHome from "../../components/address/home/AddressHome";
import TimeDataSlot from "../sell/timedateslot/TimeDataSlot";
import Footer from "../../components/footer/Footer";

import { useTypedSelector } from "../../features/reduxhooks/ReduxHooks";

import SellOrderServices from "../../services/order/sell/SellOrder.Services";

import { isValidUser } from "../../components/helper/Helper";
import { isPlatform } from "@ionic/core";

import "../schedule/Schedule.css";

interface InputParams {
    id: string;
}

function Address() {
    const { id } = useParams<InputParams>();

    const [route] = useState({ newAddress: "newaddress", currentaddress: "currentaddress", editaddress: "editaddress", timeDataSlot: "timedateslot" });
    const Selector = useTypedSelector(state => state.AddressPageChangeReducer.selectedPage);

    useEffect(() => {
        const getOrderDetail = () => {
            SellOrderServices.GetOrderSummary(id).then(res => {
                if (res.status === 200) {
                    isValidUser(res.data.PersonId);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }

        getOrderDetail();
    }, [id]);

    return (
        <IonPage data-aos="fade-down">
            <IonContent>
                <IonRow className='slot-row slot-padding-adjustment'>
                    <IonCol sizeLg="12" sizeXs="12" className="ion-padding-top">
                        {Selector === route.currentaddress &&
                            <AddressHome />
                        }
                        {Selector === route.timeDataSlot &&
                            <TimeDataSlot />
                        }
                    </IonCol>
                </IonRow>
                {isPlatform("mobile") || isPlatform("ios") ? <></>
                    :
                    <Footer />
                }
            </IonContent>
        </IonPage>
    )
}

export default Address