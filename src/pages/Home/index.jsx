import React, { useState, useEffect } from "react";
import "./index.scss";
import Banner from "../../components/Banner/index.jsx";
import Sections from "../../components/Sections/index.jsx";
import Brands from "../../components/Brands/index.jsx";
import CategoryWrapper from "../../components/CategoryWrapper/index.jsx";
import Sections1 from "../../components/Sections1/index.jsx";
import { Helmet } from "react-helmet-async";
import logo from "/src/assets/logo.png";
import AnyLoading from "../../components/AnyLoading/index.jsx";

function Home() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // LocalStorage kontrolü
        const hasVisited = localStorage.getItem("hasVisited");
        if (!hasVisited) {
            setIsLoading(true);
            localStorage.setItem("hasVisited", "true");
        }

        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000); // 2 saniye bekleme süresi
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    return (
        <div className={isLoading ? "home-container loading" : "home-container"}>
            {isLoading && (
                <div className="loading-screen">
                    <div className="loading-content">
                        <img src={logo} alt={"Logo"} />
                        <AnyLoading />
                    </div>
                </div>
            )}
            <section id="home">
                <Helmet>
                    <title>ExpoHome - Ana Səhifə</title>
                </Helmet>
                <Banner />
                <Brands />
                <Sections />
                <CategoryWrapper />
                <Sections1 />
            </section>
        </div>
    );
}

export default Home;
