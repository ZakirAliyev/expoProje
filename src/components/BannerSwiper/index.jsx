import './index.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import banner1 from '/src/assets/banner1.jpeg'
import {Autoplay, Navigation} from 'swiper/modules';

export default function BannerSwiper() {
    return (
        <section id={"bannerSwiper"}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                speed={1600}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        src={banner1}
                        alt={"Image"} className={"col9img"}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={banner1}
                        alt={"Image"} className={"col9img"}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={banner1}
                        alt={"Image"} className={"col9img"}/>
                </SwiperSlide>
            </Swiper>
        </section>
    );
}
