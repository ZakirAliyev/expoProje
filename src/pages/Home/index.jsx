import './index.scss'
import Banner from "../../components/Banner/index.jsx";
import Sections from "../../components/Sections/index.jsx";
import Brands from "../../components/Brands/index.jsx";
import CategoryWrapper from "../../components/CategoryWrapper/index.jsx";
import Sections1 from "../../components/Sections1/index.jsx";
import {Helmet} from "react-helmet-async";

function Home() {
    return (
        <section id={"home"}>
            <Helmet>
                <title>ExpoHome - Ana Səhifə</title>
            </Helmet>
            <Banner/>
            <Brands/>
            <Sections/>
            <CategoryWrapper/>
            <Sections1/>
        </section>
    );
}

export default Home;