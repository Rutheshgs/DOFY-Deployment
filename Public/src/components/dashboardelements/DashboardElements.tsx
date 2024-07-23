import { Link } from 'react-router-dom';
import { IonAvatar, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonText, IonTitle } from '@ionic/react';
import { chevronForwardCircle } from 'ionicons/icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import 'swiper/css/pagination';

import { HelperConstant } from '../helper/HelperConstant';
import { CustomImg } from '../shared/CustomImage';
import { IDashBoardModel } from '../../models/DashBoardElements.Model';

import "./DashboardElements.css";

type Props = {
    DashBoardData: Array<IDashBoardModel>,
    IsMobile: boolean
}

function DashboardElements({ DashBoardData, IsMobile }: Props) {
    return (
        <IonGrid className={`container ${IsMobile ? 'dashboard-element-grid-mob' : 'dashboard-element-grid'}`}>
            <IonRow>
                <IonCol sizeLg='6' sizeXl='6' sizeMd='5.9' sizeSm='12' sizeXs='12'>
                    <IonRow>
                        <IonCol size='12'>
                            <IonTitle>Testimonials</IonTitle>
                        </IonCol>
                    </IonRow>
                    <Swiper className="testimonial-swiper" modules={[Pagination]} pagination={{ clickable: true }}>
                        {DashBoardData.filter(it => it.EntityTypeId === HelperConstant.dashboardEntityTypeId.Testimonial).map((val, i) => (
                            <SwiperSlide key={i}>
                                <IonCard className={`p-0 ${IsMobile ? 'dashboard-card-mob' : 'dashboard-card'}`}>
                                    <IonCardContent className='p-0'>
                                        <IonRow>
                                            <IonCol sizeLg='3.2' sizeMd='3' sizeXl='2.4' sizeSm='12' sizeXs='12' className='pl-5'>
                                                <IonAvatar className={`dashboard-avatar ${IsMobile ? 'image-center' : ''}`}>
                                                    <CustomImg src={`${HelperConstant.imageAPI}/images/${val.ThumbnailPath}`} alt={val.AuthorName} className="testimonial-img" />
                                                </IonAvatar>
                                            </IonCol>
                                            <IonCol sizeLg='8.8' sizeMd='9' sizeXl='9.6' sizeXs='12' sizeSm='12' className='ion-margin-top'>
                                                <IonItem lines='none' color='transparent'>
                                                    <IonText slot="start" className='testimonial-text'>{val.Content}</IonText>
                                                </IonItem>
                                                <IonItem lines='none' color='transparent'>
                                                    <IonText slot='start' className='testimonial-desc'> - {val.AuthorName}</IonText>
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </IonCol>
                <IonCol sizeLg='6' sizeXl='6' sizeMd='6' sizeSm='12' sizeXs='12' className='ion-padding-start'>
                    <IonRow>
                        <IonCol size='12'>
                            <IonTitle className='blogs-header'>Blogs</IonTitle>
                        </IonCol>
                    </IonRow>
                    <Swiper direction="horizontal" modules={[Pagination]} pagination={{ clickable: true }}>
                        {DashBoardData.filter(it => it.EntityTypeId === HelperConstant.dashboardEntityTypeId.Blogs).map((val, i) => (
                            <SwiperSlide key={i}>
                                <IonCard className={`p-0 ${IsMobile ? 'dashboard-card-mob' : 'dashboard-card'}`}>
                                    <IonCardContent className='p-0'>
                                        <IonRow>
                                            <IonCol sizeLg='3.2' sizeMd='3' sizeXl='2.4' sizeSm='12' sizeXs='12'>
                                                <IonAvatar className={`dashboard-avatar ${IsMobile ? 'image-center' : ''}`}>
                                                    <CustomImg src={`${HelperConstant.imageAPI}/images/${val.ThumbnailPath}`} alt={val.AuthorName} className="testimonial-img" />
                                                </IonAvatar>
                                            </IonCol>
                                            <IonCol sizeLg='8.8' sizeMd='9' sizeXl='9.6' sizeXs='12' sizeSm='12' className='ion-margin-top'>
                                                <IonItem lines='none' color='transparent'>
                                                    <IonText slot="start" className='testimonial-text'>{val.Content}</IonText>
                                                </IonItem>
                                                <IonItem lines='none' color='transparent'>
                                                    <Link to="#" slot='start'>
                                                        <IonItem lines='none' color='transparent'>
                                                            <IonIcon color='medium' size='small' icon={chevronForwardCircle}></IonIcon>
                                                            <IonText className='read-more'>Read more...</IonText>
                                                        </IonItem>
                                                    </Link>
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default DashboardElements