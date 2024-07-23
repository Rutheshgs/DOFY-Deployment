import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import { SubmitHandler, useForm } from "react-hook-form";

import { HelperConstant } from '@/components/helper/HelperConstant';
import { Direction, SSRDetection, capacitorDevice, getUserLanguage, onKeyDown, restrictInput } from '@/components/helper/Helper';
import Footer from '@/components/footer/Footer';

import "./Contact.css";

import { IContactUsModel } from '@/models/ContactUs.Model';
import ContactUsServices from '@/services/ContactUs.Services';

import Language from "./ContactLanguage.json";
import contactbg from '@/assets/images/contactbg.png';
import { Button, InputAdornment, TextField } from '@mui/material';
import { useTypedSelector } from '@/features/reduxhooks/ReduxHooks';


import call from '@/assets/images/call.png';
import mail from '@/assets/images/mail.png';
import { logoFacebook, logoInstagram, logoLinkedin, logoTiktok, logoTwitter, logoYoutube } from 'ionicons/icons';
import SEOServices from '@/services/SEO.Services';
import { ISEOModel } from '@/models/SEO.Model';
import MetaTags from '@/components/metatags/MetaTags';

class Contact {
    address: { Address: string, Email: string, Phone: string, PromotionLinks: { faceBook: string, instagram: string, linkedIn: string, tikTok: string, youTube: string, Twitter: string } } =
        {
            Address: "", Email: "", Phone: "",
            PromotionLinks: {
                faceBook: "",
                instagram: "",
                linkedIn: "",
                youTube: "",
                tikTok: "",
                Twitter: ""
            }
        };
    direction: string = "";
    language: "in_en" | "ae_en" | "ae_ar" = "in_en";
    metaTags: ISEOModel = {} as ISEOModel;
}

const fetchData = async (context: any): Promise<Contact> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.ContactUs, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsData.status === 200 && metaTagsData.data);

    return { address, direction, language, metaTags }
}




function ContactUs({ address, direction, language, metaTags }: Contact) {

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<IContactUsModel>({});
    const pattern = HelperConstant.emailPattern.pattern;
    const [showToast1, setShowToast1] = useState(false);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);
    let isTablet = useTypedSelector(state => state.FindDevice.isTablet);

    let dataLocalization = Language[language];
    const { NEXT_PUBLIC_SSR } = process.env;
    const [contactdata, setContactData] = useState<Contact>({
        address, direction, language, metaTags,
    });

    useEffect(() => {
        if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setContactData({
                    address: res.address,
                    direction: res.direction,
                    language: res.language,
                    metaTags: res.metaTags,
                });
            });
        }
    }, []);

    const onContactSubmit: SubmitHandler<IContactUsModel> = (data: any) => {
        ContactUsServices.create(data).then(res => {
            if (res.status === 200)
                setShowToast1(true);
            window.location.reload();
        }).catch((e: string) => {
            console.log(e);
        });
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

    return (
        <ion-app data-aos="fade-left">
            <MetaTags metaTags={contactdata.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={contactdata.language} />
            <ion-content>
                <ion-grid class='contact-grid' style={{ background: '#fff' }} dir={contactdata.direction}>
                    <ion-row class='justify-content-center'>
                        <ion-col size-lg='12' size-xs='12' class='ion-text-center cn_title-padding'>
                            <ion-text class='cn_title-style'>{dataLocalization.Get_in_Touch}</ion-text><br />
                            <ion-text class='cn_text-style'>{dataLocalization.We_love_to_hear_from_you}</ion-text>
                        </ion-col>
                        <ion-col size-lg='2.5' size-md='4' size-xs='6' class='cn_card-padding p-0'>
                            <ion-card class='cn_card-style' >
                                <ion-img class='cn_card-image' src={call.src} alt="contact-phone"></ion-img>
                                <ion-text class='cn_card-fontsize'> {contactdata.address?.Phone}  </ion-text>
                            </ion-card>
                        </ion-col>
                        <ion-col size-lg='2.5' size-md='4' size-xs='6' class='cn_card-padding p-0'>
                            <ion-card class='cn_card-style' >
                                <ion-img class='cn_card-image' src={mail.src} alt="contact-mail"></ion-img>
                                <ion-text class='cn_card-fontsize'> {contactdata.address?.Email} </ion-text>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                    <ion-row class='cn_cardcontent-style'>
                        <ion-col size-lg='6' size-md='12' class='cn_img'>
                            <ion-img src={contactbg.src} >
                            </ion-img>
                            <ion-row class='contact_address'>
                                <ion-col size-lg='9' size-xs='8' size-md='10' offset-lg='0.5' offset-md='0.5' offset-xs='0.5'>
                                    <ion-text class='contact_address-text'>
                                        {contactdata.address?.Address?.split(';')[0]}
                                    </ion-text><br />
                                </ion-col>
                                <ion-col size-lg='8' size-xs='8' size-md='9' offset-lg='0.5' offset-md='0.5' offset-xs='0.5'>
                                    <ion-label class='contact_label'>
                                        {contactdata.address?.Address?.split(';').slice(1)}
                                    </ion-label>
                                </ion-col>
                                {isMobile &&
                                    <ion-col size='12'>
                                        <ul>
                                            {contactdata.address.PromotionLinks.faceBook != "" &&
                                                <li onClick={() => { facebookSite() }}><ion-icon icon={logoFacebook} /></li>
                                            }
                                            {contactdata.address.PromotionLinks.Twitter != "" &&
                                                <li onClick={() => { twitterSite() }}><ion-icon icon={logoTwitter} /></li>
                                            }
                                            {contactdata.address.PromotionLinks.instagram != "" &&
                                                <li onClick={() => { instagramSite() }}><ion-icon icon={logoInstagram} /></li>
                                            }
                                            {contactdata.address.PromotionLinks.linkedIn != "" &&
                                                <li onClick={() => { linkedInSite() }}><ion-icon icon={logoLinkedin} /></li>
                                            }
                                            {contactdata.address.PromotionLinks.youTube != "" &&
                                                <li onClick={() => { youtubeSite() }}><ion-icon icon={logoYoutube} /></li>
                                            }
                                            {contactdata.address.PromotionLinks.tikTok != "" &&
                                                <li style={{ marginTop: "-2px" }} onClick={() => { tikTokSIte() }}><ion-icon icon={logoTiktok} /></li>
                                            }
                                        </ul>
                                    </ion-col>
                                }
                            </ion-row>
                        </ion-col>
                        <ion-col size-lg='6' size-md='12' size-xs='12'>
                            <ion-card class={`${contactdata.language === "ae_ar" ? 'cn_message-card-left' : 'cn_message-card-right'}`}>
                                <ion-card-header class='cn_card-header ion-text-center'>{dataLocalization.Write_us_a_message}</ion-card-header>
                                <ion-card-content>
                                    <form onSubmit={handleSubmit(onContactSubmit)}>
                                        <ion-row class='mt-3 ct_padding'>
                                            <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='12'>
                                                <TextField style={{ width: "100%" }} label={dataLocalization.Name} {...register("name", { required: true })} placeholder='Ex:John' onChange={() => { clearErrors("name"); }} />
                                                {errors.name?.type === "required" && <ion-text color='danger'>Enter a Name</ion-text>}
                                            </ion-col>
                                            <ion-col size-lg='6' size-xs='12' size-sm='12' size-md='12'>
                                                <TextField style={{ width: "100%" }} label={dataLocalization.Email} {...register("email", { required: true, pattern: pattern })}
                                                    onChange={() => { clearErrors("email"); }} placeholder='email@address.com' />
                                                {errors.email?.type === "required" && <ion-text color='danger'>Enter a Email Address</ion-text>}
                                                {(errors.email?.type === "pattern") && <ion-text color='danger'>Enter a valid Email Address</ion-text>}
                                            </ion-col>


                                            {contactdata.language === 'in_en' ?
                                                <ion-col size-lg='12' size-xs='12' size-sm='12' size-md='12'>
                                                    <TextField style={{ width: "100%" }} label={dataLocalization.Mobile} type="number" placeholder="+91- 9123456780" onKeyDown={onKeyDown} {...register("mobile", { required: true, minLength: 10, maxLength: 10 })}
                                                        onChange={(e: any) => { restrictInput(e, 10); clearErrors("mobile"); }} />
                                                    {errors.mobile?.type === "required" && <ion-text color='danger'>Enter a Mobile Number</ion-text>}
                                                    {(errors.mobile?.type === "minLength" || errors.mobile?.type === "maxLength") && <ion-text color='danger'>Enter a valid Mobile Number</ion-text>}
                                                </ion-col>
                                                :
                                                <ion-col size-lg='12' size-xs='12' size-sm='12' size-md='12'>
                                                    <TextField
                                                        style={{ width: "100%" }}
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
                                                    {errors.mobile?.type === "required" && <ion-text color='danger'>Enter a Mobile Number</ion-text>}
                                                    {(errors.mobile?.type === "minLength" || errors.mobile?.type === "maxLength") && <ion-text color='danger'>Enter a valid Mobile Number</ion-text>}
                                                </ion-col>
                                            }
                                            <ion-col size-lg='12' size-xs='12'>
                                                <TextField style={{ width: "100%" }} multiline minRows={2} label={dataLocalization.Description} {...register("description", { required: true })} onChange={() => { clearErrors("description"); }} />
                                                {errors.description && <ion-text color='danger'>Enter Description</ion-text>}
                                            </ion-col>
                                            <ion-col size-lg='12' size-xs='12' size-sm='12' size-md='12' class="ion-text-center">
                                                <Button variant="contained" type="submit" style={{ background: '#2250B2' }}> {dataLocalization.Submit}</Button>

                                            </ion-col>
                                        </ion-row>
                                    </form>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                {capacitorDevice() &&
                    (contactdata.address.Address) && <Footer address={contactdata.address} direction={contactdata.direction} language={contactdata.language} />
                }
            </ion-content>
        </ion-app>
    )
}

export const getServerSideProps: GetServerSideProps<Contact> = async (context) => {
    // const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
    // let address = {} as any;
    // let metaTags = {} as ISEOModel;

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { address, direction, language, metaTags } = await fetchData(context);
    return { props: { address, direction, language, metaTags } }
    // }

    // return { props: { address, direction, language, metaTags } }

}

export default ContactUs