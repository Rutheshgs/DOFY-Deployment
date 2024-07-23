import { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonLabel, IonPage, IonRouterLink, IonRow, IonText, IonTitle, IonToast, isPlatform } from '@ionic/react';
import { callOutline, mailOutline, mapOutline } from 'ionicons/icons';

import { useForm, SubmitHandler } from "react-hook-form";

import { CustomTextArea } from '../../components/shared/CustomTextArea';
import { CustomInput } from '../../components/shared/CustomInput';
import { HelperConstant } from '../../components/helper/HelperConstant';
import { Direction, getUserLanguage, isIn, onKeyDown, restrictInput } from '../../components/helper/Helper';

import Footer from '../../components/footer/Footer';

import "./Contact.css";

import { IContactUsModel } from '../../models/ContactUs.Model';
import ContactUsServices from '../../services/ContactUs.Services';

import Language from "./ContactLanguage.json";
import contactbg from '../../assets/images/contactbg.png';
import { ContactData } from './ContactData';
import MetaTags from '../../components/metatags/MetaTags';
import { Button, InputAdornment, TextField } from '@mui/material';
import { useTypedSelector } from '../../features/reduxhooks/ReduxHooks';

import call from '../../assets/images/call.png';
import mail from '../../assets/images/mail.png';

function ContactUs() {

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<IContactUsModel>({});
    const pattern = HelperConstant.emailPattern.pattern;
    const [showToast1, setShowToast1] = useState(false);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);
    let isTablet = useTypedSelector(state => state.FindDevice.isTablet);


    const [address, setAddress] = useState<{ Address: string, Email: string, Phone: string, PromotionLinks: { faceBook: string, instagram: string, linkedIn: string, tikTok: string, youTube: string, Twitter: string } }>({
        Address: "", Email: "", Phone: "",
        PromotionLinks: {
            faceBook: "",
            instagram: "",
            linkedIn: "",
            youTube: "",
            tikTok: "",
            Twitter: ""
        }
    });

    let dataLocalization = Language[getUserLanguage()];

    const onContactSubmit: SubmitHandler<IContactUsModel> = (data) => {
        ContactUsServices.create(data).then(res => {
            if (res.status === 200)
                setShowToast1(true);
            window.location.reload();
        }).catch((e: string) => {
            console.log(e);
        });
    }

    const getAddress = () => {
        ContactUsServices.getAddress().then(res => {
            if (res.status == 200) {
                setAddress(res.data);
            }
        }).catch(e => { console.log(e) });
    }

    const facebookSite = () => {
        window.open(address.PromotionLinks.faceBook);
    };

    const instagramSite = () => {
        window.open(address.PromotionLinks.instagram);
    };

    const twitterSite = () => {
        window.open(address.PromotionLinks.Twitter);
    };

    const linkedInSite = () => {
        window.open(address.PromotionLinks.linkedIn);
    };

    const tikTokSIte = () => {
        window.open(address.PromotionLinks.tikTok);
    };

    const youtubeSite = () => {
        window.open(address.PromotionLinks.youTube);
    };

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <IonPage data-aos="fade-left">
            <MetaTags pageName={'contact-us'} />
            <IonContent>
                <IonGrid className='contact-grid' style={{ background: '#fff' }} dir={Direction()}>
                    <IonRow className='justify-content-center'>
                        <IonCol sizeLg='12' sizeXs='12' className='text-center cn_title-padding'>
                            <IonText className='cn_title-style'>{dataLocalization.Get_in_Touch}</IonText><br />
                            <IonText className='cn_text-style'>{dataLocalization.We_love_to_hear_from_you}</IonText>
                        </IonCol>
                        <IonCol sizeLg='2.5' sizeMd='4' sizeXs='6' className='cn_card-padding p-0'>
                            <IonCard className='cn_card-style' >
                                <IonImg className='cn_card-image' src={call}  alt="contact-phone"></IonImg>
                                {/* <IonCardSubtitle style={{ whiteSpace: "nowrap" }} className='text-center cn_card-fontsize'>{address?.Phone} </IonCardSubtitle> */}
                                <IonText className='cn_card-fontsize'> {address?.Phone}  </IonText>
                            </IonCard>
                        </IonCol>
                        <IonCol sizeLg='2.5' sizeMd='4' sizeXs='6' className='cn_card-padding p-0'>
                            <IonCard className='cn_card-style' >
                                <IonImg className='cn_card-image' src={mail}  alt="contact-mail"></IonImg>
                                {/* <IonCardSubtitle style={{ whiteSpace: "nowrap" }} className='text-center cn_card-fontsize'>{address?.Email} </IonCardSubtitle> */}
                                <IonText className='cn_card-fontsize'> {address?.Email} </IonText>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow className='cn_cardcontent-style'>
                        <IonCol sizeLg='6' sizeMd='12' className='cn_img'>
                            <IonImg src={contactbg} >
                            </IonImg>
                            <IonRow className='contact_address'>
                                <IonCol sizeLg='9' sizeXs='8' sizeMd='10' offsetLg='0.5' offsetMd='0.5' offsetXs='0.5'>
                                    <IonText className='contact_address-text'>
                                        {address?.Address?.split(';')[0]}
                                    </IonText><br />
                                </IonCol>
                                <IonCol sizeLg='8' sizeXs='8' sizeMd='9' offsetLg='0.5' offsetMd='0.5' offsetXs='0.5'>
                                    <IonLabel className='contact_label'>
                                        {address?.Address?.split(';').slice(1)}
                                    </IonLabel>
                                </IonCol>
                                {isMobile &&
                                    <IonCol size='12'>
                                        <ul>
                                            {address.PromotionLinks.faceBook != "" &&
                                                <li onClick={() => { facebookSite() }}><i className="fab fa-facebook" aria-hidden="true"></i></li>
                                            }
                                            {address.PromotionLinks.Twitter != "" &&
                                                <li onClick={() => { twitterSite() }}><i className="fab fa-twitter" aria-hidden="true"></i></li>
                                            }
                                            {address.PromotionLinks.instagram != "" &&
                                                <li onClick={() => { instagramSite() }}><i className="fab fa-instagram" aria-hidden="true"></i></li>
                                            }
                                            {address.PromotionLinks.linkedIn != "" &&
                                                <li onClick={() => { linkedInSite() }}><i className="fab fa-linkedin" aria-hidden="true"></i></li>
                                            }
                                            {address.PromotionLinks.youTube != "" &&
                                                <li onClick={() => { youtubeSite() }}><i className="fab fa-youtube" aria-hidden="true"></i></li>
                                            }
                                            {address.PromotionLinks.tikTok != "" &&
                                                <li style={{ marginTop: "-2px" }} onClick={() => { tikTokSIte() }}><svg fill='white' height="1em" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" /></svg></li>
                                            }
                                        </ul>
                                    </IonCol>
                                }
                            </IonRow>
                        </IonCol>
                        <IonCol sizeLg='6' sizeMd='12' sizeXs='12'>
                            <IonCard className={`${getUserLanguage() === "ae_ar" ? 'cn_message-card-left' : 'cn_message-card-right'}`}>
                                <IonCardHeader className='cn_card-header text-center'>{dataLocalization.Write_us_a_message}</IonCardHeader>
                                <IonCardContent>
                                    <form onSubmit={handleSubmit(onContactSubmit)}>
                                        <IonRow className='mt-3 ct_padding'>
                                            <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='12'>
                                                <CustomInput label={dataLocalization.Name} {...register("name", { required: true })} placeholder='Ex:John' onIonChange={() => { clearErrors("name"); }} />
                                                {errors.name?.type === "required" && <IonText color='danger'>Enter a Name</IonText>}
                                            </IonCol>
                                            <IonCol sizeLg='6' sizeXs='12' sizeSm='12' sizeMd='12'>
                                                <CustomInput label={dataLocalization.Email} {...register("email", { required: true, pattern: pattern })}
                                                    onIonChange={() => { clearErrors("email"); }} placeholder='email@address.com' />
                                                {errors.email?.type === "required" && <IonText color='danger'>Enter a Email Address</IonText>}
                                                {(errors.email?.type === "pattern") && <IonText color='danger'>Enter a valid Email Address</IonText>}
                                            </IonCol>


                                            {isIn() ?
                                                <IonCol sizeLg='12' sizeXs='12' sizeSm='12' sizeMd='12'>
                                                    <CustomInput label={dataLocalization.Mobile} type="number" placeholder="+91- 9123456780" onKeyDown={onKeyDown} {...register("mobile", { required: true, minLength: 10, maxLength: 10 })}
                                                        onIonChange={(e: any) => { restrictInput(e, 10); clearErrors("mobile"); }} />
                                                    {errors.mobile?.type === "required" && <IonText color='danger'>Enter a Mobile Number</IonText>}
                                                    {(errors.mobile?.type === "minLength" || errors.mobile?.type === "maxLength") && <IonText color='danger'>Enter a valid Mobile Number</IonText>}
                                                </IonCol>
                                                :
                                                <IonCol sizeLg='12' sizeXs='12' sizeSm='12' sizeMd='12'>
                                                    <TextField
                                                        style={{ width: "100%" }}
                                                        variant="standard"
                                                        id="outlined-start-adornment"
                                                        label={dataLocalization.Mobile}
                                                        sx={{ width: '25ch' }}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">+971</InputAdornment>,
                                                            size: "medium"
                                                        }}
                                                        type="number"
                                                        {...register("mobile", { required: true, minLength: 9, maxLength: 10, onChange: (e: any) => { restrictInput(e, 10); clearErrors("mobile") } })}
                                                    />
                                                    {errors.mobile?.type === "required" && <IonText color='danger'>Enter a Mobile Number</IonText>}
                                                    {(errors.mobile?.type === "minLength" || errors.mobile?.type === "maxLength") && <IonText color='danger'>Enter a valid Mobile Number</IonText>}
                                                </IonCol>
                                            }
                                            <IonCol sizeLg='12' sizeXs='12'>
                                                <CustomTextArea label={dataLocalization.Description} {...register("description", { required: true })} onIonChange={() => { clearErrors("description"); }} />
                                                {errors.description && <IonText color='danger'>Enter Description</IonText>}
                                            </IonCol>
                                            <IonCol sizeLg='12' sizeXs='12' sizeSm='12' sizeMd='12' className="text-center">
                                                <Button variant="contained" type="submit" style={{ background: '#2250B2' }}> {dataLocalization.Submit}</Button>

                                            </IonCol>
                                        </IonRow>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {
                    (!isMobile && !isTablet) &&
                    <Footer />
                }
            </IonContent>
        </IonPage>
    )
}
export default ContactUs