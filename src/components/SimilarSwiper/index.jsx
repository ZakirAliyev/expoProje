import './index.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {useGetAllProductsByCategoryIdQuery} from "../../services/usersApi.jsx";
import ProductCard from "../ProductCard/index.jsx";

export default function SimilarSwiper({categoryId, productId}) {
    const {data: productsData, isLoading: productLoading} = useGetAllProductsByCategoryIdQuery(categoryId);
    const products = productsData?.data?.filter(item => item.id !== productId); // productId ilə eyni olan məhsulu süzürük

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
                {products && products.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ProductCard item={item} categoryId={categoryId} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
