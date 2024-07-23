import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonRow, IonText, IonIcon, IonToast } from '@ionic/react'
import { useEffect, useState } from 'react'
import { Direction, getUserLanguage } from "../helper/Helper";
import Language from "./FindDevice.json";
import { HelperConstant } from '../helper/HelperConstant';
import MasterServices from '../../services/Master.Services';
import { useForm, SubmitHandler } from "react-hook-form";
import { IFindYourDeviceModel } from '../../models/PublicRequest.Model';
import CantFindServices from '../../services/CantFind.Services';
import './FindDevice.css';
import { CustomMaterialDropDown } from '../shared/CustomMaterialDropDown';
import { CustomMaterialInput } from '../shared/CustomMaterialInput';
import { loginPageChanger, modelChanger, resetModelChanger } from '../../features/reducers/login/LoginModel.Reducer';
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks';
import finddeviceimg from '../../../src/assets/images/finddeviceimg.png';
import { close } from 'ionicons/icons';


function FindDevice() {

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<IFindYourDeviceModel>({
    });

    const [deviceType, setDevicetype] = useState<Array<any>>([]);
    const [showToastUpdate, setShowToastUpdate] = useState(false);


    let dataLocalization = Language[getUserLanguage()];
    let dispatch = useTypedDispatch();

    const onFindDevice: SubmitHandler<IFindYourDeviceModel> = (data) => {
        data.BrandModelName = data.BrandName;
        CantFindServices.createDeviceRequest(data).then((res: any) => {
            if (res.status === 200) {
                setShowToastUpdate(true)
                dispatch(modelChanger(false));
                // dispatch(loginPageChanger("find-location"));
                // console.log(res)
                // window.location.reload();

            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    useEffect(() => {
        const getDevice = (serviceTypeId: number) => {
            MasterServices.GetAllProductType(serviceTypeId).then(res => {
                if (res.status === 200) {
                    setDevicetype(res.data);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }

        getDevice(HelperConstant.serviceTypeId.SELL);
    }, []);

    return (
        <IonContent className='ioncontent' dir={Direction()}>
            <IonGrid className='grid-FindDevice'>
                <form onSubmit={handleSubmit(onFindDevice)}>

                    <IonIcon className='ls-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></IonIcon>

                    <IonRow>
                        <IonCol sizeLg='12' sizeSm="12" sizeXs='12' sizeMd='12' sizeXl="12" className='ion-text-center'>
                            <IonText className='Fd_font-size'>Can't Find Your Devices</IonText>
                        </IonCol>
                        <IonCol sizeLg='12' sizeSm="12" sizeXs='12' sizeMd='12' sizeXl="12" className='Image-FindDevice'>
                            <IonImg className="find-device-img" src={finddeviceimg} alt="can't find device"></IonImg>
                        </IonCol>
                        <IonCol className='fd_margin ion-text-center' sizeLg='12' sizeXl="12" sizeSm="12" sizeXs='12' sizeMd='12'>
                            <IonText className='Fd_font'>Please Provide us with the details of your devices we will get back to yous</IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol className='fd_margin ' sizeXl="6" sizeLg='6' sizeMd='6' sizeSm="12" sizeXs='12'>
                            <CustomMaterialDropDown data={deviceType} selectedValue={undefined} label={dataLocalization.Select_Gadget} {...register("DeviceType", { required: true })} onIonChange={() => { clearErrors("DeviceType"); }} />
                            {errors.DeviceType && <IonText color='danger'>{dataLocalization.Error}</IonText>}
                        </IonCol>
                        <IonCol className='fd_margin ' sizeXl="6" sizeLg='6' sizeMd='6' sizeSm="12" sizeXs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.BrandModelName} {...register("BrandName", { required: true })} onIonChange={() => { clearErrors("BrandName"); } }></CustomMaterialInput>
                            {errors.BrandName && <IonText color='danger'>{dataLocalization.Error}</IonText>}
                        </IonCol>
                        <IonCol className='fd_margin ' sizeXl="6" sizeLg='6' sizeMd='6' sizeSm="12" sizeXs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.Modal} {...register("ModalName", { required: true })} onIonChange={() => { clearErrors("ModalName"); } }></CustomMaterialInput>
                            {errors.ModalName && <IonText color='danger'>{dataLocalization.Error}</IonText>}
                        </IonCol>
                        <IonCol className='fd_margin ' sizeXl="6" sizeLg='6' sizeMd='6' sizeSm="12" sizeXs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.ModalVariant} {...register("ModelVariant", { required: true })} onIonChange={() => { clearErrors("ModelVariant"); } }></CustomMaterialInput>
                            {errors.ModelVariant && <IonText color='danger'>{dataLocalization.Error}</IonText>}
                        </IonCol>
                        <IonCol className='fd_margin ' sizeXl="6" sizeLg='6' sizeMd='6' sizeSm="12" sizeXs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.Full_Name} {...register("Name", { required: true })} onIonChange={() => { clearErrors("Name"); } }></CustomMaterialInput>
                            {errors.Name && <IonText color='danger'>{dataLocalization.Error}</IonText>}
                        </IonCol>
                        <IonCol className='fd_margin ' sizeXl="6" sizeLg='6' sizeMd='6' sizeSm="12" sizeXs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.Mobile_Number} type="number" {...register("MobileNumber", { required: true })} onIonChange={() => { clearErrors("MobileNumber"); } }></CustomMaterialInput>
                            {errors.MobileNumber && <IonText color='danger'>{dataLocalization.Error}</IonText>}
                        </IonCol>
                        <IonCol className='fd_margin ' sizeXl="6" sizeLg='6' sizeMd='6' sizeSm="12" sizeXs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.Email} {...register("Email", { required: true })} onIonChange={() => { clearErrors("Email"); } }></CustomMaterialInput>
                            {errors.Email && <IonText color='danger'>{dataLocalization.Error}</IonText>}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol sizeLg='12' sizeMd="12" sizeSm="12" sizeXs='12' sizeXl="12" className='ion-text-center'>
                            <IonButton className="fd-buttons" type='submit' color='white'>Submit</IonButton>
                        </IonCol>
                    </IonRow>
                </form>
                <IonRow>
                    <IonToast color='success' isOpen={showToastUpdate} onDidDismiss={() =>setShowToastUpdate(false)} message={"Your Device is updated Successfully"} duration={50000}/>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default FindDevice

