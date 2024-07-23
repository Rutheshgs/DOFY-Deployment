import { IonLabel, IonText } from "@ionic/react";
import { IAssigneeDetailsModel } from "../../models/order/sell/SellOrder.Model";
import { countrycodenumber } from "../helper/Helper";
import "./AssigneeDetails.css";

type Props = {
    data: IAssigneeDetailsModel
}

function AssigneeDetails({ data }: Props) {
    return (
        <div className="container profile-page">
            <div className="card profile-header">
                <div className="body">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-4">
                            <div className="profile-image float-md-right"> <img src={require('../../assets/images/phase2/riderimg.png')} alt="" /> </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-8">
                            <h4 className="m-t-0 m-b-0"><strong>{data.AssigneeName}</strong></h4>
                            <a dir="ltr" href={`tel:${data.Mobile}`}>{countrycodenumber(data.Mobile)}</a>
                            {/* <span className="job_post">{data.Email}</span><br></br> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssigneeDetails