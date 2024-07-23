import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonText, IonCard, IonButton, IonCardHeader } from "@ionic/react"
import { CustomInput } from "../../../components/shared/CustomInput"
import { useForm, SubmitHandler } from "react-hook-form";
import dofylogo from '../../../assets/images/dofy-logo-blue.png';
import { IPasswordReset } from "../../../models/PasswordReset.Model";
import { useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";
import AuthServices from "../../../services/Auth.Services";
import { IResetPassword } from "../../../models/ResetPassword";
import { CustomImg } from "../../../components/shared/CustomImage";
import { useHistory } from "react-router-dom";

function PasswordReset() {

    let history = useHistory();

    let UserNameData = useTypedSelector(state => state.UserNameReducers.UserNameInfoData)
    let OtpData: any = useTypedSelector(state => state.OtpReducers.OtpData)
    const { register, handleSubmit, formState: { errors } } = useForm<IPasswordReset>({});

    const onSubmit: SubmitHandler<IPasswordReset> = (data) => {
        const loginsdata: IResetPassword = {
            UserName: UserNameData,
            PassWord: OtpData,
            ConfirmPassword: data.Password,
            IVKey: "",
            Salt: ""
        }
        let Form = new FormData()
        Form.append('logins', JSON.stringify(loginsdata))
        AuthServices.ResetPassword(loginsdata).then(res => {
            if (res.status === 200) {
                window.location.href = "/login"
            }
        })
    }

    return (
        <IonPage>
            <IonContent fullscreen={true}>
                <IonGrid className="ion-no-padding">
                    <IonRow className="login-header">
                        <IonCol>
                            <CustomImg className="login-logo" src={dofylogo} />
                        </IonCol>
                    </IonRow>
                    {/* <IonRow >
                        <IonCol sizeXs="12" offsetXs='1' sizeLg='6' offsetLg='3' className="login-card">
                            <IonText className="login-cardheader">Password Reset</IonText>
                        </IonCol>
                    </IonRow> */}
                    <IonRow className='ion-justify-content-center'>
                        <IonCol sizeMd="4" offsetMd="7" sizeXs="12" sizeLg="4" offsetLg="6" sizeSm="12" sizeXl="4">
                            <IonCard className="login-cardform">
                                <IonCardHeader >
                                    <IonCol offsetLg='2'>
                                        <IonText className="login-cardheader">Password Reset</IonText><br />
                                    </IonCol>
                                </IonCardHeader>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <IonGrid className="ion-padding">
                                        <IonRow  >
                                            <IonCol>
                                                <CustomInput label={"New Password"} placeholder="xxxxxxxxx" type={"password"} {...register("Password", { required: true })} />
                                                {errors.Password && <IonText className='text-danger'>Please check the Password</IonText>}
                                            </IonCol>
                                        </IonRow>
                                        <IonRow  >
                                            <IonCol>
                                                <CustomInput label={"Confirm Password"} placeholder="xxxxxxxxx" type={"password"} {...register("ConfirmPassword", { required: true })} />
                                                {errors.ConfirmPassword && <IonText className='text-danger'>Please check the Password</IonText>}
                                            </IonCol>
                                        </IonRow>
                                        <br />
                                        <IonRow>
                                            <IonCol sizeLg="6" sizeXs="6" offsetLg="1">
                                                <IonButton className="login-button" color="warning" type="submit">Reset Password</IonButton>
                                            </IonCol>
                                            <IonCol sizeLg="4" sizeXs="6">
                                                <IonButton className="login-button" color="warning" routerLink="/">Cancel</IonButton>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </form>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default PasswordReset