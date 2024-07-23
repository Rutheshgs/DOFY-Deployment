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

type OrderTrack = {
    activePage: Array<number>,
    isCancel: "cancel" | "complete" | "none",
}

function OrderTrack({ activePage, isCancel }: OrderTrack) {

    return (
        <div className="container-step-order">
            <div className="steps-order">
                <span className={`circle-order ${activePage.includes(1) && 'complete-active-order'} ${activePage.includes(1) && 'active'}`}>
                    <img src={(activePage.includes(1) ? ScheduleWhite : Schedule).src} style={{ width: "25px" }} alt="Schedule" />
                </span>
                <span className={`circle-order ${activePage.includes(2) && 'complete-active-order'} ${activePage.includes(2) && 'active'}`}>
                    <img src={(activePage.includes(2) ? OrderWhite : Order).src} style={{ width: "25px" }} alt="Order" />
                </span>
                {isCancel === "complete" ?
                    <span className={`circle-order ${activePage.includes(3) && 'complete-active-order'} ${activePage.includes(3) && 'active'}`}>
                        <img src={(activePage.includes(3) ? CompletedWhite : Completed).src} style={{ width: "25px" }} alt="Completed" />
                    </span>
                    :
                    isCancel === "cancel" ?
                        <span className={`circle-order ${activePage.includes(3) && 'complete-active-order'} ${activePage.includes(3) && 'active'}`}>
                            <img src={(activePage.includes(3) ? canceledWhite : canceled).src} style={{ width: "25px" }} alt="Canceled" />
                        </span>
                        :
                        <span className={`circle-order ${activePage.includes(3) && 'active'}`}>
                            <img src={combinedIcon.src} style={{ width: "25px" }} alt="combinedIcon" />
                        </span>
                }
                <div className="progress-bar-order">
                    <span style={{ width: `${activePage.length * 25}%` }} className="indicator-order"></span>
                </div>
            </div>
            <div className="steps-heading-order">
                <span > <img src={Schedule.src} style={{ width: "20px" }} alt="Schedule" /><ion-label>Schedule</ion-label> </span>
                <span > <img src={Order.src} style={{ width: "20px" }} alt="Order" /><ion-label>In-Progress </ion-label></span>
                <span > <img src={Completed.src} style={{ width: "20px" }} alt="Completed" /><ion-label>Completed</ion-label> </span>
                <span > <img src={canceled.src} style={{ width: "20px" }} alt="Canceled" /><ion-label>Cancel/Failed </ion-label></span>
            </div>
        </div>
    )
}

export default OrderTrack