import './index.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Navigation} from 'swiper/modules';
import {useGetAllBannersQuery} from "../../services/usersApi.jsx";
import {baseURLBanner} from "../../constants.js";

export default function BannerSwiper() {

    const {data: bannersData} = useGetAllBannersQuery()
    const banners = bannersData?.data

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
                {banners && banners.map((banner, index) => (
                    <SwiperSlide>
                        <img
                            src={baseURLBanner + banner?.imageName}
                            alt={"Image"} className={"col9img"}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
