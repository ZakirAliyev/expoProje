import './index.scss'
import BrandsSwiper from "../BrandsSwiper/index.jsx";

function Brands() {
    return (
        <section id={"brands"}>
            <div className={"container"}>
                <BrandsSwiper/>
            </div>
        </section>
    );
}

export default Brands;