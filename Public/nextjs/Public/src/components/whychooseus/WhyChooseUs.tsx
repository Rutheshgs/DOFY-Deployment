import whychooseimage from '@/assets/images/whychooseimage.png';
import whychooseimage01 from '@/assets/images/whychooseimage01.png';
import righticon from '@/assets/images/righticon.png';

import './WhyChooseUs.css';

import Language from './WhyChooseUs.json';

type Props = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar"
}

function WhyChooseUs({ direction, language }: Props) {

    let dataLocalization = Language[language];

    return (
        <ion-grid class='wc_grid padding-adjustment' dir={direction}>
            <ion-grid class='container'>
                <ion-row class='tm-header-row'>
                    <ion-col size='12' class='ion-text-center header-padding'>
                        <ion-text class='wc-header-1'>{dataLocalization.Why_Choose_Us}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size-lg='6' size-xs='12' size-md='6' class='ion-padding align-self-center'>
                        {language === "in_en" ?
                            <ion-img class='wc-image' src={whychooseimage.src} alt="why-choose-us"></ion-img>
                            :
                            <ion-img class='wc-image' src={whychooseimage01.src} alt="why-choose-us"></ion-img>
                        }
                    </ion-col>
                    <ion-col size-lg='6' size-xs='12' size-md='6' class='align-self-center ion-padding'>
                        <ion-row class='wc_content-padding'>
                            <ion-col size-lg='1' size-xs='1.5' size-md='1.5'>
                                <ion-img class='wc-righticon' src={righticon.src} alt="why-choose-us"></ion-img>
                            </ion-col>
                            <ion-col size-lg='11' size-xs='10.5' class='text-align-justify'>
                                <ion-text class='wc-content-1'>{dataLocalization.Best_in_market_price}</ion-text><br />
                                <ion-text class='wc-content-2'>{dataLocalization.Dofy_ensures}</ion-text>
                            </ion-col>
                        </ion-row>
                        <ion-row class='wc_content-padding'>
                            <ion-col size-lg='1' size-xs='1.5'>
                                <ion-img class='wc-righticon' src={righticon.src} alt="why-choose-us-icon"></ion-img>
                            </ion-col>
                            <ion-col size-lg='11' size-xs='10.5' class='text-align-justify'>
                                <ion-text class='wc-content-1'>{dataLocalization.Every_transaction}</ion-text><br />
                                <ion-text class='wc-content-2'>{dataLocalization.Our_platform}</ion-text>
                            </ion-col>
                        </ion-row>
                        <ion-row class='wc_content-padding'>
                            <ion-col size-lg='1' size-xs='1.5'>
                                <ion-img class='wc-righticon' src={righticon.src} alt="why-choose-us-icon"></ion-img>
                            </ion-col>
                            <ion-col size-lg='11' size-xs='10.5' class='text-align-justify'>
                                <ion-text class='wc-content-1'>{dataLocalization.Hassle_free}</ion-text><br />
                                <ion-text class='wc-content-2'>{dataLocalization.Embrace_the_ultimate}</ion-text>
                            </ion-col>
                        </ion-row>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-grid>
    )
}

export default WhyChooseUs