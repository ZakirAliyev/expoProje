import React, { useEffect } from "react";
import './index.scss';
import { useGetAllProductsQuery } from "../../services/usersApi.jsx";
import AnyLoading from "../AnyLoading/index.jsx";
import ProductsSwiper from "../ProductsSwiper/index.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Sections() {
    const { data: productsData, isLoading: productLoading } = useGetAllProductsQuery();
    const products = productsData?.data;

    // AOS'u belirli bir gecikmeyle başlatmak için useEffect kullanımı
    useEffect(() => {
        const timer = setTimeout(() => {
            AOS.init({
                duration: 1000, // Animasyon süresi
                once: true, // Animasyon sadece bir kez çalışsın
            });
        }, 800); // 2 saniye gecikme

        return () => clearTimeout(timer); // Bileşen unmount olduğunda timer'ı temizle
    }, []);

    return (
        <section id="sections" data-aos="fade-up">
            <div className="container" data-aos="fade-up">
                <h2 data-aos="fade-up">Məhsullar</h2>
                <div className="lineWrapper" data-aos="fade-up">
                    <div
                        className="greenLine"
                        style={{ marginBottom: '20px' }}
                    ></div>
                </div>
                {productLoading && (
                    <AnyLoading data-aos="fade-up" />
                )}
                <ProductsSwiper data-aos="fade-up" />
            </div>
        </section>
    );
}

export default Sections;
