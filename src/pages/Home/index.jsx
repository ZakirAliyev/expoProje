import './index.scss'
import Banner from "../../components/Banner/index.jsx";
import Sections from "../../components/Sections/index.jsx";
import Brands from "../../components/Brands/index.jsx";
import ProductCard from "../../components/ProductCard/index.jsx";

function Home() {
    return (
        <section id={"home"}>
            <Banner/>
            <Brands/>
            <Sections/>
        </section>
    );
}

export default Home;