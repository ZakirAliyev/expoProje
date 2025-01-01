import './index.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Pagination} from 'swiper/modules';
import logo from '/src/assets/logo.png';
import {useGetAllBrandsQuery} from "../../services/usersApi.jsx";
import {baseURLBrand} from "../../constants.js";

export default function BrandsSwiper() {

    const {data: brandsData} = useGetAllBrandsQuery()
    const brands = brandsData?.data

    return (
        <div
            id="brandsSwiper"
            style={{
                backgroundColor: 'white',
                padding: '16px 32px',
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
                {brands && brands.map((brand) => (
                    <SwiperSlide key={brand?.id}>
                        <img src={baseURLBrand + brand?.imageName} alt={"Brand"}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
