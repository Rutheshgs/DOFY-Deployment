import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from "swiper";

import { ResponsiveItemPerView } from '@/components/helper/Helper';

import { useTypedSelector } from '@/features/reduxhooks/ReduxHooks';

import { ICarousalBannerModel } from '@/models/CarousalBanner.Model';

import './CarousalHeader.css';

type Props = {
    banners: Array<ICarousalBannerModel>,
    direction: string
}

function CarousalHeader({ banners, direction }: Props) {

    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);
    const IsTablet = useTypedSelector(state => state.FindDevice.isTablet);
    const isExtraLarge = useTypedSelector(state => state.FindDevice.isExtraLarge);

    SwiperCore.use([Autoplay]);

    return (
        <ion-grid class={"cd-grid"} dir={direction}>
            {IsMobile ?
                <Swiper slidesPerView={1} style={{ height: isExtraLarge ? '300px' : ResponsiveItemPerView(150, 300, 300) + 'px' }} modules={[Pagination]} pagination={{ clickable: true }} autoplay={{ delay: 2000, disableOnInteraction: false }} rewind={false} loop={true} dir={direction}>
                    {banners.filter(x => x.Title === "Mobile").map((val, i) => (
                        <SwiperSlide key={i} className='cd-swiper' style={{
                            backgroundImage: `url(${val.ThumbnailPath})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat"
                        }}
                        >
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
                            </SwiperSlide>
                        ))}
                    </Swiper >
                    :
                    <Swiper slidesPerView={1} style={{ height: isExtraLarge ? '300px' : ResponsiveItemPerView(200, 300, 200) + 'px', width: '100%' }} modules={[Pagination]} pagination={{ clickable: true }} autoplay={{ delay: 2000, disableOnInteraction: false }} rewind={false} loop={true}>
                        {banners.filter(x => x.Title === "Website").map((val, i) => (
                            <SwiperSlide key={i} className='cd-swiper' style={{
                                backgroundImage: `url(${val.ThumbnailPath})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat"
                            }}>
                            </SwiperSlide>
                        ))}
                    </Swiper >
            }
        </ion-grid >
    )
}

export default CarousalHeader