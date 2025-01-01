import React, { useEffect } from "react";
import './index.scss';
import { useGetAllCategoriesTreeQuery } from '../../services/usersApi.jsx';
import AnyLoading from "../AnyLoading/index.jsx";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

function CategoryWrapper() {
    const { data: getAllCategories, isLoading, isError } = useGetAllCategoriesTreeQuery();
    const categories = getAllCategories?.data || [];
    const navigate = useNavigate();

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
        <section id="categoryWrapper" data-aos="fade-up">
            <div className="container">
                <h2 className="menim" data-aos="fade-up">Kateqoriyalar</h2>
                <div className="lineWrapper" data-aos="fade-up">
                    <div className="greenLine"></div>
                </div>
                <div className="row">
                    {isLoading && <AnyLoading />}
                    {isError && <p>Kateqoriya tapılmadı</p>}
                    {categories.slice(0, 6).map((category, index) => (
                        <div
                            className="col-4 col-md-4 col-sm-12 col-xs-12"
                            key={category.id || index}
                            data-aos="fade-up"
                        >
                            <div className="box" onClick={() => {
                                navigate(`/category?categoryName=${category.name}&&categoryId=${category.id}`);
                            }}>
                                <span>{category.name}</span>
                            </div>
                        </div>
                    ))}

                    {!isLoading && !isError && categories.length === 0 && (
                        <p>No categories available.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CategoryWrapper;
