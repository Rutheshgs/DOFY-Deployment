import { IonLabel, IonText } from "@ionic/react";
import { IAssigneeDetailsModel } from "../../models/order/sell/SellOrder.Model";
import { countrycodenumber } from "../helper/Helper";
import "./AssigneeDetails.css";
import RiderImg from '@/assets/images/phase2/riderimg.png'

type Props = {
    data: IAssigneeDetailsModel
}

function AssigneeDetails({ data }: Props) {
    return (
        <ion-grid class="container profile-page">
            <ion-card class="card profile-header">
                <ion-row class="body">
                    <ion-col size-lg="4" size-md="4" size="4">
                        <ion-col class="profile-image float-md-right"> <img src={RiderImg.src} alt="rider-img" /> </ion-col>
                    </ion-col>
                    <ion-col size-lg="8" size-md="8" size="8">
                        <h4 className="m-t-0 m-b-0"><strong>{data.AssigneeName}</strong></h4>
                        <a dir="ltr" href={`tel:${data.Mobile}`}>{countrycodenumber(data.Mobile)}</a>
                    </ion-col>
                </ion-row>
            </ion-card>
        </ion-grid>
    )
}

export default AssigneeDetails