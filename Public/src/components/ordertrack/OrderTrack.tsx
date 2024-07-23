import "./OrderTrack.css";

import Schedule from '../../assets/images/phase2/Schedule.png';
import Order from '../../assets/images/phase2/Order.png';
import Completed from '../../assets/images/phase2/Completed.png';
import canceled from '../../assets/images/phase2/canceled.png';

import ScheduleWhite from '../../assets/images/phase2/Schedulewhite.png';
import OrderWhite from '../../assets/images/phase2/orderedwhite.png';
import CompletedWhite from '../../assets/images/phase2/completewhite.png';
import canceledWhite from '../../assets/images/phase2/cancelwhite.png';

import combinedIcon from '../../assets/images/phase2/combinedicon.png';

import { IonImg, IonLabel } from "@ionic/react";

type Props = {
    activePage: Array<number>;
    isCancel: "cancel" | "complete" | "none"
}

function OrderTrack({ activePage, isCancel }: Props) {

    return (
        <div className="container-step-order">
            <div className="steps-order">
                <span className={`circle-order ${activePage.includes(1) && 'complete-active-order'} ${activePage.includes(1) && 'active'}`}>
                    <IonImg src={activePage.includes(1) ? ScheduleWhite : Schedule} style={{ width: "25px" }} alt="Schedule"/>
                </span>
                <span className={`circle-order ${activePage.includes(2) && 'complete-active-order'} ${activePage.includes(2) && 'active'}`}>
                    <IonImg src={activePage.includes(2) ? OrderWhite : Order} style={{ width: "25px" }} alt="Order"/>
                </span>
                {isCancel === "complete" ?
                    <span className={`circle-order ${activePage.includes(3) && 'complete-active-order'} ${activePage.includes(3) && 'active'}`}>
                        <IonImg src={activePage.includes(3) ? CompletedWhite : Completed} style={{ width: "25px" }} alt="Completed"/>
                    </span>
                    :
                    isCancel === "cancel" ?
                        <span className={`circle-order ${activePage.includes(3) && 'complete-active-order'} ${activePage.includes(3) && 'active'}`}>
                            <IonImg src={activePage.includes(3) ? canceledWhite : canceled} style={{ width: "25px" }} alt="Canceled"/>
                        </span>
                        :
                        <span className={`circle-order ${activePage.includes(3) && 'active'}`}>
                            <IonImg src={combinedIcon} style={{ width: "25px" }} alt="combinedIcon"/>
                        </span>
                }
                <div className="progress-bar-order">
                    <span style={{ width: `${activePage.length * 25}%` }} className="indicator-order"></span>
                </div>
            </div>
            <div className="steps-heading-order">
                <span > <IonImg src={Schedule} style={{ width: "20px" }} alt="Schedule"/><IonLabel>Schedule</IonLabel> </span>
                <span > <IonImg src={Order} style={{ width: "20px" }} alt="Order"/><IonLabel>In-Progress </IonLabel></span>
                <span > <IonImg src={Completed} style={{ width: "20px" }} alt="Completed"/><IonLabel>Completed</IonLabel> </span>
                <span > <IonImg src={canceled} style={{ width: "20px" }} alt="Canceled"/><IonLabel>Cancel/Failed </IonLabel></span>
            </div>
        </div>
    )
}

export default OrderTrack