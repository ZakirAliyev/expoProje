import './index.scss'
import ProductCard from "../../components/ProductCard/index.jsx";
import {useLocation, useParams} from "react-router-dom";

function FilterAndSort() {
    const currentUrl = window.location.href; // Tam URL

    return (
        <section id={"filterAndSort"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-4 col-md-4 col-sm-12 col-xs-12"} style={{
                        padding: '0'
                    }}>
                        <div className={"wrapper"}>
                            <div className={"box"}>
                                <div className={"row"}>
                                    <div className={"col-6"}>Sort</div>
                                    <div className={"col-6"}>Filter</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-8 col-md-8 col-sm-12 col-xs-12"}>
                        <div className={"wrapper"}>
                            <div className={"box"}>
                                <div className={"row"}>
                                    <div className={"col-6"}>Saya gore</div>
                                    <div className={"col-6"}>Qiymete gore</div>
                                </div>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
                                <ProductCard/>
                            </div>
                            <div className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
                                <ProductCard/>
                            </div>
                            <div className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
                                <ProductCard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FilterAndSort;