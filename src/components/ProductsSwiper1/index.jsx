import './index.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductCard from "../ProductCard/index.jsx";
import {useGetAllProductsByNewQuery, useGetAllProductsQuery} from "../../services/usersApi.jsx";

export default function ProductsSwiper1() {
    const {data: productsData, isLoading: productLoading} = useGetAllProductsByNewQuery();
    const products = productsData?.data;

    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={16}
                className="mySwiper"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1440: {
                        slidesPerView: 4,
                    },
                }}
            >
                {products && products.slice(0, 12).map((item, index) => (
                    <SwiperSlide key={index}>
                        <ProductCard item={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
