import { Swiper, SwiperSlide } from 'swiper/react';

import playImg from '@/assets/images/phase2/play.png';

import { ResponsiveItemPerView } from '../helper/Helper';

import Language from './OurVideos.json';

import './OurVideos.css'

type props = {
    ourVideos: Array<{ Title: string, ThumbnailPath: string, Content: string, AuthorName: string }>
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar"
}

function OurVideos({ ourVideos, direction, language }: props) {

    let dataLocalization = Language[language];

    return (
        <ion-grid class='ov-grid ov-padding-adjustment' dir={direction}>
            <ion-grid class='container'>
                <ion-row class='ov-header-row'>
                    <ion-col size='12' class='ion-text-center header-padding'>
                        <ion-text class='ov-header-1'>{dataLocalization.Our_Videos}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <Swiper dir={direction} slidesPerView={ResponsiveItemPerView(1.1, 3.2, 3.5)} spaceBetween={10} style={{ height: "100%" }}>
                        {ourVideos.filter(x => x.Title === "OurVideos").map((val, index) => {
                            return <SwiperSlide key={index}>
                                <ion-card class='ov-card'>
                                    <ion-img class='ov-bg-img' src={val.ThumbnailPath.split(',')[0]} alt="OurVideos" />
                                    <ion-row class='ov-card-menus'>
                                        <ion-col offset='0.5' size='11.5'>
                                            <a target='_blank' href={val.ThumbnailPath.split(',')[1]}>
                                                <ion-text class='ov-card-header-1'>{val.Content}</ion-text>
                                            </a>
                                        </ion-col>
                                        <ion-col offset='0.5' size='1.5'>
                                            <ion-avatar class='ov-avatar'>
                                                <a target='_blank' href={val.ThumbnailPath.split(',')[1]}>
                                                    <img alt="Silhouette of a person's head" src={playImg.src} />
                                                </a>
                                            </ion-avatar>
                                        </ion-col>
                                        <ion-col size='9.5' offset-lg='0.5'>
                                            <ion-text class='ov-card-header-3'>{val.AuthorName}</ion-text>
                                        </ion-col>
                                    </ion-row>
                                </ion-card>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </ion-row>
            </ion-grid>
        </ion-grid>
    )
}

export default OurVideos
