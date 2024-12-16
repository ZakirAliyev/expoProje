import './index.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Pagination} from 'swiper/modules';
import logo from '/src/assets/logo.png';

export default function BrandsSwiper() {
    const slides = Array(16).fill(null);

    return (
        <div
            id="brandsSwiper"
            style={{
                backgroundColor: 'white',
                padding: '32px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                borderRadius: '20px',
            }}
        >
            <Swiper
                slidesPerView={6}
                spaceBetween={30}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                speed={1600}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                    1440: {
                        slidesPerView: 6,
                    },
                }}
            >
                {slides.map((_, index) => (
                    <SwiperSlide key={index}>
                        <img src={logo} alt={`Logo ${index + 1}`}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
