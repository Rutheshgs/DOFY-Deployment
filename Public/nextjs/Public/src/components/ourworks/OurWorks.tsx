import dynamic from 'next/dynamic';

import VisibilitySensor from 'react-visibility-sensor';

import Language from './OurWorks.json'

import './OurWorks.css'

const CountUp = dynamic(
    () => import('react-countup'),
    { ssr: false }
)

type props = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar"
}

function OurWorks({ direction, language }: props) {

    let dataLocalization = Language[language];

    return (
        <ion-grid class='ow-grid ow-padding-adjustment' dir={direction}>
            <ion-grid class='container'>
                <ion-row>
                    <ion-col size='12'>
                        <ion-card class='ow-card' >
                            <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
                                {({ isVisible }: any) => (
                                    <ion-row class='ow-card-row'>
                                        <ion-col size-xl='3' size-md='6' size-xs='12' class={language == "ae_ar" ? '' : `ow-card-col-border`}>
                                            <ion-text class='ow-card-header-1'>{dataLocalization.Nearing} {isVisible && <CountUp start={0} end={500} duration={5} />}k</ion-text><br />
                                            <ion-text class='ow-card-header-2'>{dataLocalization.App_Downloads}</ion-text>
                                        </ion-col>
                                        <ion-col size-xl='3' size-md='6' size-xs='12' class={`ow-card-col-border`}>
                                            <ion-text class='ow-card-header-1'>{isVisible && <CountUp start={0} end={300} duration={5} />}m +</ion-text><br />
                                            <ion-text class='ow-card-header-2'>{dataLocalization.Cash_given_and_Counting}</ion-text>
                                        </ion-col>
                                        <ion-col size-xl='3' size-md='6' size-xs='12' class={`ow-card-col-border`}>
                                            <ion-text class='ow-card-header-1'>{isVisible && <CountUp start={0} end={50} duration={5} />}k +</ion-text><br />
                                            <ion-text class='ow-card-header-2'>{dataLocalization.Orders_Completed}</ion-text>
                                        </ion-col>
                                        <ion-col size-xl='3' size-md='6' size-xs='12' class={language == "ae_ar" ? `ow-card-col-border` : ''}>
                                            <ion-text class='ow-card-header-1'>{isVisible && <CountUp start={0} end={2000} duration={5} />}+</ion-text><br />
                                            <ion-text class='ow-card-header-2'>{dataLocalization.Areas_Covered}</ion-text>
                                        </ion-col>
                                    </ion-row>
                                )}
                            </VisibilitySensor>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-grid>
    )
}

export default OurWorks
