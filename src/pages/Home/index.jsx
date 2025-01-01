import './index.scss'
import Banner from "../../components/Banner/index.jsx";
import Sections from "../../components/Sections/index.jsx";
import Brands from "../../components/Brands/index.jsx";
import CategoryWrapper from "../../components/CategoryWrapper/index.jsx";
import Sections1 from "../../components/Sections1/index.jsx";

function Home() {
    return (
        <section id={"home"}>
            <Banner/>
            <Brands/>
            <Sections/>
            <CategoryWrapper/>
            <Sections1/>
        </section>
    );
}

export default Home;