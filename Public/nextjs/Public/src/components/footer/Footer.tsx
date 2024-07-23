import { useRouter } from 'next/router';
import { chevronForward, logoFacebook, logoInstagram, logoLinkedin, logoTiktok, logoTwitter, logoYoutube } from 'ionicons/icons';

import { pageChange, routerChange } from '../../features/reducers/selldevice/PageChange.Reducer';
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks';
import { RepairpageChange } from '../../features/reducers/repair/RepairPageChange.Reducer';

import appstoreImg from '@/assets/images/appstore.png';
import playstoreImg from '@/assets/images/playstore.png';

import "./Footer.css";
import { HelperConstant } from '../helper/HelperConstant';
import { findBrowser, getUserLanguage, getUserLocationForParam } from '../helper/Helper';

import Language from "./Footer.json"

class Props {
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
    language: "in_en" | "ae_en" | "ae_ar" = "in_en"
}

function Footer({ address, direction, language }: Props) {

    let dataLocalization = Language[language];
    let dispatch = useTypedDispatch();
    let history = useRouter();

    const routerHandler = (type: "/" | "/about-us" | "/contact-us" | "/sell-your-old-device" | "/Repair-Device" | "/faq" | "/terms-of-use" | "/privacy-policy") => {
        dispatch(pageChange("selectdevice"));
        dispatch(RepairpageChange("selectdevice"));
        history.push(`/${getUserLanguage()}${type}`);
    }

    // const [address, setAddress] = useState<{ Address: string, Email: string, Phone: string, PromotionLinks: { faceBook: string, instagram: string, linkedIn: string, tikTok: string, youTube: string, Twitter: string } }>({
    //     Address: "", Email: "", Phone: "",
    //     PromotionLinks: {
    //         faceBook: "",
    //         instagram: "",
    //         linkedIn: "",
    //         youTube: "",
    //         tikTok: "",
    //         Twitter: ""
    //     }
    // });

    // const ServicesBuy = [{ Id: HelperConstant.productTypeId.phone, Name: dataLocalization.Phone }, { Id: HelperConstant.productTypeId.smart_watch, Name: dataLocalization.SmartWatch }, { Id: HelperConstant.productTypeId.laptop, Name: dataLocalization.Laptop }, { Id: HelperConstant.productTypeId.more, Name: dataLocalization.More }, { Id: HelperConstant.productTypeId.tablet, Name: dataLocalization.Tablet }];
    const ServicesBuy = [
        { Id: HelperConstant.productTypeId.phone, Name: dataLocalization.Phone, Router: "Phone" },
        { Id: HelperConstant.productTypeId.smart_watch, Name: dataLocalization.SmartWatch, Router: "SmartWatch" },
        { Id: HelperConstant.productTypeId.laptop, Name: dataLocalization.Laptop, Router: "Laptop" },
        { Id: HelperConstant.productTypeId.more, Name: dataLocalization.More, Router: "More..." },
        { Id: HelperConstant.productTypeId.tablet, Name: dataLocalization.Tablet, Router: "Tablet" }
    ];

    const linkHandler = (type: "android" | "ios") => {
        if (findBrowser()) {
            if (type === "android") {
                window.open(HelperConstant.androidAppLink);
            }
            if (type === "ios") {
                window.open(HelperConstant.iosAppLink);
            }
        }
    }

    const sellServiceRouterHandler = (deviceName: string) => {

        if (deviceName.includes("More...")) {
            return history.push(`/${getUserLanguage()}${getUserLocationForParam(language)}/sell-your-old-device`);
        }

        dispatch(routerChange(deviceName.toLowerCase().replaceAll(' ', '')));
        history.push(`/${getUserLanguage()}${getUserLocationForParam(language)}/sell-your-old-${deviceName.toLowerCase().replaceAll(' ', '')}`);
    }

    // const getAddress = () => {
    //     ContactUsServices.getAddress().then(res => {
    //         if (res.status == 200) {
    //             setAddress(res.data);
    //         }
    //     }).catch(e => { console.log(e) });
    // }

    const facebookSite = () => {
        if (findBrowser()) {
            window.open(address.PromotionLinks.faceBook);
        }
    };

    const instagramSite = () => {
        if (findBrowser()) {
            window.open(address.PromotionLinks.instagram);
        }
    };

    const twitterSite = () => {
        if (findBrowser()) {
            window.open(address.PromotionLinks.Twitter);
        }
    };

    const linkedInSite = () => {
        if (findBrowser()) {
            window.open(address.PromotionLinks.linkedIn);
        }
    };

    const tikTokSIte = () => {
        if (findBrowser()) {
            window.open(address.PromotionLinks.tikTok);
        }
    };

    const youtubeSite = () => {
        if (findBrowser()) {
            window.open(address.PromotionLinks.youTube);
        }
    };

    // useEffect(() => {
    //     getAddress();
    // }, []);

    return (
        <>
            <ion-grid class='foo-grid' dir={direction}>
                <ion-grid >
                    <ion-row>
                        <ion-col size-lg='4.5' size-md='4' size-xs='12' size-sm='12'>
                            <ion-text class='footer_title'>{address.Address.split(';')[0]}</ion-text><br />
                            <ion-text class='foo-content'>{dataLocalization.We_promise_our_users}</ion-text>
                            <ul>
                                {address.PromotionLinks.faceBook != "" &&
                                    <li onClick={() => { facebookSite() }}><ion-icon icon={logoFacebook}></ion-icon></li>
                                }
                                {address.PromotionLinks.Twitter != "" &&
                                    <li onClick={() => { twitterSite() }}><ion-icon icon={logoTwitter} /></li>
                                }
                                {address.PromotionLinks.instagram != "" &&
                                    <li onClick={() => { instagramSite() }}><ion-icon icon={logoInstagram} /></li>
                                }
                                {address.PromotionLinks.linkedIn != "" &&
                                    <li onClick={() => { linkedInSite() }}><ion-icon icon={logoLinkedin} /></li>
                                }
                                {address.PromotionLinks.youTube != "" &&
                                    <li onClick={() => { youtubeSite() }}><ion-icon icon={logoYoutube} /></li>
                                }
                                {address.PromotionLinks.tikTok != "" &&
                                    <li style={{ marginTop: "-2px" }} onClick={() => { tikTokSIte() }}><ion-icon icon={logoTiktok} /></li>
                                }
                            </ul>
                            <ion-row>
                                <ion-img style={{ height: "40px", marginRight: "10px", cursor: "pointer" }} onClick={() => linkHandler("android")} src={playstoreImg.src} alt='playstore-icon' />&nbsp;&nbsp;
                                <ion-img style={{ height: "40px", cursor: "pointer" }} onClick={() => linkHandler("ios")} src={appstoreImg.src} alt='appstore-icon' />
                            </ion-row>
                        </ion-col>
                        <ion-col size-lg='3.5' size-md='4' size-xs='12'>
                            <ion-text class='foo-header'>{dataLocalization.Important_Links}</ion-text>
                            <ion-row>
                                {ServicesBuy.map((val, i) => (
                                    <ion-col style={{ padding: "0px" }} size-lg='6' size-md='6' size-xs='12' key={i}>
                                        <ion-item class='custom-ion-item foo-items' color="white" lines='none'>
                                            <ion-icon icon={chevronForward} />
                                            {/* <ion-label class='cursor-pointer' onClick={() => sellServiceRouterHandler(val.Name)}>{val.Name}</ion-label> */}
                                            <ion-label class='cursor-pointer' onClick={() => sellServiceRouterHandler(val.Router)}>{val.Name}</ion-label>
                                        </ion-item>
                                    </ion-col>
                                ))}
                            </ion-row>
                        </ion-col>
                        <ion-col size-lg='1.7' size-md='2' size-xs='12'>
                            <ion-text class='foo-header'>{dataLocalization.Company}</ion-text>
                            <ion-item class='custom-ion-item foo-items' color="white" lines='none'>
                                <ion-icon icon={chevronForward} />
                                <ion-label class='cursor-pointer' onClick={() => routerHandler("/about-us")}>{dataLocalization.About_Us}</ion-label>
                            </ion-item>
                            <ion-item class='custom-ion-item foo-items' color="white" lines='none'>
                                <ion-icon icon={chevronForward} />
                                <ion-label class='cursor-pointer' onClick={() => routerHandler("/faq")}>{dataLocalization.FAQS}</ion-label>
                            </ion-item>
                        </ion-col>
                        <ion-col size-lg='2.3' size-md='2' size-xs='12'>
                            <ion-text class='foo-header'>{dataLocalization.Help_Support}</ion-text>
                            <ion-item class='custom-ion-item foo-items' color="white" lines='none'>
                                <ion-icon icon={chevronForward} />
                                <ion-label class='cursor-pointer' onClick={() => routerHandler("/contact-us")}>{dataLocalization.Contact_Us}</ion-label>
                            </ion-item>
                            <ion-item class='custom-ion-item foo-items' color="white" lines='none'>
                                <ion-icon icon={chevronForward} />
                                <ion-label class='cursor-pointer' onClick={() => routerHandler("/terms-of-use")}>{dataLocalization.Terms_and_conditions}</ion-label>
                            </ion-item>
                            <ion-item class='custom-ion-item foo-items' color="white" lines='none'>
                                <ion-icon icon={chevronForward} />
                                <ion-label class='cursor-pointer' onClick={() => routerHandler("/privacy-policy")}>{dataLocalization.Privacy_Policy}</ion-label>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-grid>
            <ion-grid class='foo-second-grid'>
                <ion-row>
                    <ion-col size='12' class='ion-text-center foo-copyright'>
                        <ion-text>{dataLocalization.Copyrights} &copy; {new Date().getFullYear()} &nbsp;{dataLocalization.All_rights_reserved} </ion-text>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </>
    )
}

export default Footer