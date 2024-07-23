import React from 'react';
import { star } from 'ionicons/icons';

import { Swiper, SwiperSlide } from 'swiper/react';

import { ResponsiveItemPerView } from '../helper/Helper';

import quoteImg from '@/assets/images/phase2/quote.png';
import userImg from '@/assets/images/phase2/user.png';

import "./Testimonial.css";

import Language from "./Testimonial.json";

type Props = {
    testimonialData: Array<{ Title: string, ThumbnailPath: string, Content: string, AuthorName: string }>,
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar"
}

function Testimonial({ testimonialData,direction,language }: Props) {

    let dataLocalization = Language[language];

    return (
        <ion-grid class='tm-grid testimonial-padding-adjustment' dir={direction}>
            <ion-grid class='container' dir={direction}>
                <ion-row class='tm-header-row'>
                    <ion-col size='12' class='ion-text-center header-padding'>
                        <ion-text class='tm-header-1'>{dataLocalization.What_our_customers_are_saying}</ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <Swiper dir={direction} spaceBetween={10} slidesPerView={ResponsiveItemPerView(1.1, 3, 1.8)} style={{ height: "100%" }}>
                        {testimonialData.filter(x => x.Title == "NewTestimonials").map((val, index) => {
                            return <SwiperSlide key={index}>
                                <ion-card class='tm-card'>
                                    <ion-content class="tm-card-content">
                                        <ion-img class='tm-card-quote' src={quoteImg.src} alt="qsuote" />
                                        <ion-text>{val.Content}</ion-text>
                                    </ion-content>
                                </ion-card>
                                <ion-row >
                                    <ion-col offset='0.3' size-lg='2' size-md='2' size-xs='2.5' size-sm="2" class='ion-padding-start'>
                                        <ion-avatar style={{ height: "50px", width: "50px" }}>
                                            <img alt="Silhouette of a person's head" src={userImg.src} />
                                        </ion-avatar>
                                    </ion-col>
                                    <ion-col size-lg='7' size-md="7" size-xs="6.5" size-sm="5.5" class='ion-padding-start'>
                                        <ion-text class='tm-card-header-1'>{val.AuthorName}</ion-text><br />
                                        <ion-text style={{ position: "absolute", marginTop: "2px" }}>
                                            {Array.from({ length: 5 }).map((val, i) => (
                                                <ion-icon style={{ color: "#ffd700" }} key={i} icon={star} />
                                            ))}
                                        </ion-text>
                                    </ion-col>
                                </ion-row>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </ion-row>
            </ion-grid>
        </ion-grid>
    )
}

export default Testimonial