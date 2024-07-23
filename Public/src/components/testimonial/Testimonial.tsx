import { IonAvatar, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonText } from '@ionic/react'
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Direction, ResponsiveItemPerView, getUserLanguage } from '../helper/Helper';
import { CustomImg } from '../shared/CustomImage';

import "./Testimonial.css";
import { star } from 'ionicons/icons';
import DashboardElementsServices from '../../services/DashboardElements.Services';
import Language from "./Testimonial.json";


function Testimonial() {

    const [testimonialData, setTestimonialData] = useState<Array<{ Title: string, ThumbnailPath: string, Content: string, AuthorName: string }>>([]);
    let dataLocalization = Language[getUserLanguage()];


    const getTestimonial = () => {
        DashboardElementsServices.GetAllDashboardElements().then(res => {
            if (res.status == 200) {
                setTestimonialData(res.data);
            }
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        getTestimonial();
    }, []);

    return (
        <IonGrid className='tm-grid testimonial-padding-adjustment' dir={Direction()}>
            <IonGrid className='container' dir={Direction()}>
                <IonRow className='tm-header-row'>
                    <IonCol size='12' className='ion-text-center header-padding'>
                        <IonText className='tm-header-1'>{dataLocalization.What_our_customers_are_saying}</IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <Swiper dir={Direction()} slidesPerView={ResponsiveItemPerView(1.1, 3, 1.8)} style={{ height: "100%" }}>
                        {testimonialData.filter(x => x.Title == "NewTestimonials").map((val, index) => {
                            return <SwiperSlide key={index} >
                                <IonCard className='tm-card'>
                                    <IonCardContent className="tm-card-content">
                                        <IonImg className='tm-card-quote' src={require('../../assets/images/phase2/quote.png')} alt="qsuote"/>
                                        <IonText>{val.Content}</IonText>
                                    </IonCardContent>
                                </IonCard>
                                <IonRow >
                                    <IonCol offset='0.3' sizeLg='2' sizeMd='2' sizeXs='2.5' sizeSm="2" className='ion-padding-start'>
                                        <IonAvatar style={{ height: "50px", width: "50px" }}>
                                            <img alt="Silhouette of a person's head" src={require('../../assets/images/phase2/user.png')} />
                                        </IonAvatar>
                                    </IonCol>
                                    <IonCol sizeLg='7' sizeMd="7" sizeXs="6.5" sizeSm="5.5" className='ion-padding-start'>
                                        <IonText className='tm-card-header-1'>{val.AuthorName}</IonText><br />
                                        <IonText style={{ position: "absolute", marginTop: "2px" }}>
                                            {Array.from({ length: 5 }).map((val, i) => (
                                                <IonIcon style={{ color: "#ffd700" }} key={i} icon={star} />
                                            ))}
                                        </IonText>
                                    </IonCol>
                                </IonRow>

                            </SwiperSlide>
                        })}
                    </Swiper>
                </IonRow>
            </IonGrid>
        </IonGrid>
    )
}

export default Testimonial