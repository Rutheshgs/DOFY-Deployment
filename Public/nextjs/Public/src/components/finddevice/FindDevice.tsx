import { useEffect, useState } from 'react'
import { Direction, countrycodenumber, getUserLanguage } from "../helper/Helper";
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
import { useRouter } from 'next/router';
import { headers } from 'next/dist/client/components/headers';
import dynamic from 'next/dynamic';

const IonToast = dynamic(() => import('@ionic/react').then(mod => mod.IonToast), { ssr: false });

type Props = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar"
}

function FindDevice({ direction, language }: Props) {

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<IFindYourDeviceModel>({
    });

    const [deviceType, setDevicetype] = useState<Array<any>>([]);
    const [showToastUpdate, setShowToastUpdate] = useState(false);


    let dataLocalization = Language[getUserLanguage()];
    let dispatch = useTypedDispatch();
    let history = useRouter();


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
        const getDevice = (serviceTypeId: number, LanguageCode: any, CountryCode: any) => {
            MasterServices.GetAllProductType(serviceTypeId, LanguageCode, CountryCode).then(res => {
                if (res.status === 200) {
                    setDevicetype(res.data);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }

        getDevice(HelperConstant.serviceTypeId.SELL, '', '');
    }, []);

    return (
        <ion-content class='ioncontent' dir={direction}>
            <ion-grid class='grid-FindDevice'>
                <form onSubmit={handleSubmit(onFindDevice)}>

                    <ion-icon class='ls-close-icon' icon={close} onClick={() => dispatch(resetModelChanger())}></ion-icon>

                    <ion-row>
                        <ion-col size-lg='12' size-sm="12" size-xs='12' size-md='12' size-xl="12" class='ion-text-center'>
                            <ion-text class='Fd_font-size'>Can't Find Your Devices</ion-text>
                        </ion-col>
                        <ion-col size-lg='12' size-sm="12" size-xs='12' size-md='12' size-xl="12" class='Image-FindDevice'>
                            <ion-img class="find-device-img" src={finddeviceimg.src} alt="can't find device"></ion-img>
                        </ion-col>
                        <ion-col class='fd_margin ion-text-center' size-lg='12' size-xl="12" size-sm="12" size-xs='12' size-md='12'>
                            <ion-text class='Fd_font'>Please Provide us with the details of your devices we will get back to yous</ion-text>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class='fd_margin ' size-xl="6" size-lg='6' size-md='6' size-sm="12" size-xs='12'>
                            <CustomMaterialDropDown data={deviceType} selectedValue={undefined} label={dataLocalization.Select_Gadget} {...register("DeviceType", { required: true })} onIonChange={() => { clearErrors("DeviceType"); }} />
                            {errors.DeviceType && <ion-text color='danger'>{dataLocalization.Error}</ion-text>}
                        </ion-col>
                        <ion-col class='fd_margin ' size-xl="6" size-lg='6' size-md='6' size-sm="12" size-xs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.BrandModelName} {...register("BrandName", { required: true })} onIonChange={() => { clearErrors("BrandName"); }}></CustomMaterialInput>
                            {errors.BrandName && <ion-text color='danger'>{dataLocalization.Error}</ion-text>}
                        </ion-col>
                        <ion-col class='fd_margin ' size-xl="6" size-lg='6' size-md='6' size-sm="12" size-xs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.Modal} {...register("ModalName", { required: true })} onIonChange={() => { clearErrors("ModalName"); }}></CustomMaterialInput>
                            {errors.ModalName && <ion-text color='danger'>{dataLocalization.Error}</ion-text>}
                        </ion-col>
                        <ion-col class='fd_margin ' size-xl="6" size-lg='6' size-md='6' size-sm="12" size-xs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.ModalVariant} {...register("ModelVariant", { required: true })} onIonChange={() => { clearErrors("ModelVariant"); }}></CustomMaterialInput>
                            {errors.ModelVariant && <ion-text color='danger'>{dataLocalization.Error}</ion-text>}
                        </ion-col>
                        <ion-col class='fd_margin ' size-xl="6" size-lg='6' size-md='6' size-sm="12" size-xs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.Full_Name} {...register("Name", { required: true })} onIonChange={() => { clearErrors("Name"); }}></CustomMaterialInput>
                            {errors.Name && <ion-text color='danger'>{dataLocalization.Error}</ion-text>}
                        </ion-col>
                        <ion-col class='fd_margin ' size-xl="6" size-lg='6' size-md='6' size-sm="12" size-xs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.Mobile_Number} type="number" {...register("MobileNumber", { required: true })} onIonChange={() => { clearErrors("MobileNumber"); }}></CustomMaterialInput>
                            {errors.MobileNumber && <ion-text color='danger'>{dataLocalization.Error}</ion-text>}
                        </ion-col>
                        <ion-col class='fd_margin ' size-xl="6" size-lg='6' size-md='6' size-sm="12" size-xs='12'>
                            <CustomMaterialInput placeholder={undefined} label={dataLocalization.Email} {...register("Email", { required: true })} onIonChange={() => { clearErrors("Email"); }}></CustomMaterialInput>
                            {errors.Email && <ion-text color='danger'>{dataLocalization.Error}</ion-text>}
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size-lg='12' size-md="12" size-sm="12" size-xs='12' size-xl="12" class='ion-text-center'>
                            <ion-button class="fd-buttons" type='submit' color='white'>Submit</ion-button>
                        </ion-col>
                    </ion-row>
                </form>
                <ion-row>
                    <IonToast color='success' isOpen={showToastUpdate} onDidDismiss={() => setShowToastUpdate(false)} message={"Your Device is updated Successfully"} duration={50000} />
                </ion-row>
            </ion-grid>
        </ion-content>
    )
}

export default FindDevice

