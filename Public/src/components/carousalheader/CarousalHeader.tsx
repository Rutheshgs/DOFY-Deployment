import { IonCol, IonGrid, IonRow } from '@ionic/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from "swiper";

import { IsTablet, ResponsiveItemPerView, getUserLanguage } from '../helper/Helper';

import { useTypedSelector } from '../../features/reduxhooks/ReduxHooks';

import "./CarousalHeader.css";
import { useEffect, useState } from 'react';
import CarousalBannerServices from '../../services/CarousalBannerServices';
import { ICarousalBannerModel } from '../../models/CarousalBanner.Model';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';


function CarousalHeader() {
    const history = useHistory();

    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);
    const IsTablet = useTypedSelector(state => state.FindDevice.isTablet);
    const isExtraLarge = useTypedSelector(state => state.FindDevice.isExtraLarge);

    const [banners, setBanners] = useState<Array<ICarousalBannerModel>>([]);

    const getCarousalBanner = () => {
        CarousalBannerServices.GetCarousalBanner().then(res => {
            if (res.status === 200) {
                setBanners(res.data);
            }
        }).catch(e => console.log(e));
    }

    const routerHandler = (type: "/sell-your-old-device") => {
        history.push(`/${getUserLanguage()}${type}`);

    }
    useEffect(() => {
        getCarousalBanner();
    }, []);


    SwiperCore.use([Autoplay]);

    return (
        <IonGrid className='cd-grid'>
            {IsMobile ?
                <Swiper slidesPerView={1} style={{ height: isExtraLarge ? '300px' : ResponsiveItemPerView(150, 300, 300) + 'px' }} modules={[Pagination]} pagination={{ clickable: true }} autoplay={{ delay: 2000, disableOnInteraction: false }} rewind={false} loop={true}>
                    {banners.filter(x => x.Title === "Mobile").map((val, i) => (
                        <SwiperSlide key={i} className='cd-swiper' style={{
                            backgroundImage: `url(${val.ThumbnailPath})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat"
                        }}
                        >
                            {/* <IonRow>
                                <IonCol size='12' className='cd-sell-col'>
                                    <Button size='small' variant="contained" onClick={() => routerHandler("/sell-your-old-device")}>Sell now</Button>
                                </IonCol>
                            </IonRow> */}
                        </SwiperSlide>
                    ))
                    }
                </Swiper >
                :
                IsTablet ?
                    <Swiper slidesPerView={1} style={{ height: isExtraLarge ? '300px' : ResponsiveItemPerView(200, 300, 200) + 'px', width: '100%' }} modules={[Pagination]} pagination={{ clickable: true }} autoplay={{ delay: 2000, disableOnInteraction: false }} rewind={false} loop={true}>
                        {banners.filter(x => x.Title === "Tablet").map((val, i) => (
                            <SwiperSlide key={i} className='cd-swiper' style={{
                                backgroundImage: `url(${val.ThumbnailPath})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat"
                            }}>
                                {/* <IonRow>
                            <IonCol size='12' className='cd-sell-col'>
                                <Button size='small' variant="contained" onClick={() => routerHandler("/sell-device")}>Sell now</Button>
                            </IonCol>
                        </IonRow> */}
                            </SwiperSlide>
                        ))}
                    </Swiper >
                    :
                    <Swiper slidesPerView={1} style={{ height: isExtraLarge ? '300px' : ResponsiveItemPerView(200, 300, 200) + 'px', width: '100%' }} modules={[Pagination]} pagination={{ clickable: true }} autoplay={{ delay: 2000, disableOnInteraction: false }} rewind={false} loop={true}>
                        {banners.filter(x => x.Title === "Website").map((val, i) => (
                            <SwiperSlide key={i} className='cd-swiper' style={{
                                backgroundImage: `url(${val.ThumbnailPath})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat"
                            }}>
                                {/* <IonRow>
                                <IonCol size='12' className='cd-sell-col'>
                                    <Button size='small' variant="contained" onClick={() => routerHandler("/sell-your-old-device")}>Sell now</Button>
                                </IonCol>
                            </IonRow> */}
                            </SwiperSlide>
                        ))}
                    </Swiper >
            }
        </IonGrid >
    )
}

export default CarousalHeader


// :
                    // <>
                    //     <SwiperSlide className='cd-swiper' style={{
                    //         backgroundImage: `url(${deviceImg})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: 'fixed'
                    //     }}>
                    //         {/* <IonRow>
                    //             <IonCol size='12' className='cd-sell-col'>
                    //                 <Button size='small' variant="contained" onClick={() => routerHandler("/sell-your-old-device")}>Sell now</Button>
                    //             </IonCol>
                    //         </IonRow> */}
                    //     </SwiperSlide>
                    //     <SwiperSlide className='carousalheader-swiper' style={{
                    //         backgroundImage: `url(${deviceImg1})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat"
                    //     }}>
                    //         {/* <IonRow>
                    //             <IonCol size='12' className='cd-sell-col'>
                    //                 <Button size='small' variant="contained" onClick={() => routerHandler("/sell-your-old-device")}>Sell now</Button>
                    //             </IonCol>
                    //         </IonRow> */}
                    //     </SwiperSlide>
                    //     <SwiperSlide onClick={() => routerHandler("/sell-your-old-device")} className='carousalheader-swiper' style={{
                    //         backgroundImage: `url(${deviceImg2})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat"
                    //     }}>
                    //         {/* <IonRow>
                    //             <IonCol size='12' className='cd-sell-col'>
                    //                 <Button size='small' variant="contained" onClick={() => routerHandler("/sell-your-old-device")}>Sell now</Button>
                    //             </IonCol>
                    //         </IonRow> */}
                    //     </SwiperSlide>
                    //     <SwiperSlide onClick={() => routerHandler("/sell-your-old-device")} className='carousalheader-swiper' style={{
                    //         backgroundImage: `url(${deviceImg3})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat"
                    //     }}>
                    //         {/* <IonRow>
                    //             <IonCol size='12' className='cd-sell-col'>
                    //                 <Button size='small' variant="contained" onClick={() => routerHandler("/sell-your-old-device")}>Sell now</Button>
                    //             </IonCol>
                    //         </IonRow> */}
                    //     </SwiperSlide>

                    // </>