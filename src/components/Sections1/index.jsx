import React, { useEffect } from "react";
import './index.scss';
import { useGetAllProductsQuery } from "../../services/usersApi.jsx";
import AnyLoading from "../AnyLoading/index.jsx";
import ProductsSwiper1 from "../ProductsSwiper1/index.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Sections1() {
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
                <h2 data-aos="fade-up">Yeni məhsullar</h2>
                <div className="lineWrapper" data-aos="fade-up">
                    <div
                        className="greenLine"
                        style={{ marginBottom: '20px' }}
                    ></div>
                </div>
                {productLoading && (
                    <AnyLoading data-aos="fade-up" />
                )}
                <ProductsSwiper1 data-aos="fade-up" />
            </div>
        </section>
    );
}

export default Sections1;
