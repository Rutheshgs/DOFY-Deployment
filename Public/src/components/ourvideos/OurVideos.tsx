import { IonGrid, IonRow, IonCol, IonText, IonCard, IonImg, IonAvatar } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Direction, ResponsiveItemPerView, getUserLanguage } from '../helper/Helper';
import { OurVideoData } from './OurVideosData';
import Language from './OurVideos.json'

import './OurVideos.css'
import { useEffect, useState } from 'react';
import DashboardElementsServices from '../../services/DashboardElements.Services';

type props = {
    setIsShow: any
}

function OurVideos({ setIsShow }: props) {

    const [ourVideos, setOurVideos] = useState<Array<{ Title: string, ThumbnailPath: string, Content: string, AuthorName: string }>>([]);

    const getOurVideos = () => {
        DashboardElementsServices.GetAllDashboardElements().then(res => {
            if (res.data.filter((x:any) => x.Title === "OurVideos").length ==0) {
                setIsShow(false);
            }
            if (res.status === 200) {
                setOurVideos(res.data);
            }
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        getOurVideos();
    }, []);

    let dataLocalization = Language[getUserLanguage()];


    return (
        <IonGrid className='ov-grid ov-padding-adjustment' dir={Direction()}>
            <IonGrid className='container'>
                <IonRow className='ov-header-row'>
                    <IonCol size='12' className='ion-text-center header-padding'>
                        <IonText className='ov-header-1'>{dataLocalization.Our_Videos}</IonText>
                    </IonCol>
                    {/* <IonCol size='12' className='ion-text-center'>
                        <IonText className='ov-header-2'>Lorem ipsum dolor sit amet</IonText>
                    </IonCol> */}
                </IonRow>
                <IonRow>
                    <Swiper slidesPerView={ResponsiveItemPerView(1.1, 3.2, 3.5)} style={{ height: "100%" }}>
                        {ourVideos.filter(x => x.Title === "OurVideos").map((val, index) => {
                            return <SwiperSlide key={index}>
                                <IonCard className='ov-card'>
                                    <IonImg className='ov-bg-img' src={val.ThumbnailPath.split(',')[0]} alt="OurVideos"/>
                                    <IonRow className='ov-card-menus'>
                                        <IonCol offset='0.5' size='11.5'>
                                            {/* <IonText className='ov-card-header-1'>{val.Header1}</IonText><br />
                                            <IonText className='ov-card-header-2'>{val.Header2}</IonText> */}
                                            <a target='_blank' href={val.ThumbnailPath.split(',')[1]}>
                                                <IonText className='ov-card-header-1'>{val.Content}</IonText>
                                            </a>
                                        </IonCol>
                                        <IonCol offset='0.5' size='1.5'>
                                            <IonAvatar className='ov-avatar'>
                                                {/* <img alt="Silhouette of a person's head" src={require('../../assets/images/phase2/play.png')} /> */}
                                                <a target='_blank' href={val.ThumbnailPath.split(',')[1]}>
                                                    <img alt="Silhouette of a person's head" src={require('../../assets/images/phase2/play.png')} />
                                                </a>
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol size='9.5' offsetLg='0.5'>
                                            <IonText className='ov-card-header-3'>{val.AuthorName}</IonText>
                                        </IonCol>
                                    </IonRow>
                                </IonCard>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </IonRow>
            </IonGrid>
        </IonGrid>
    )
}

export default OurVideos
