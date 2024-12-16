import './index.scss';
import {useGetAllProductsQuery} from "../../services/usersApi.jsx";
import AnyLoading from "../AnyLoading/index.jsx";
import ProductsSwiper from "../ProductsSwiper/index.jsx";

function Sections() {
    const {data: productsData, isLoading: productLoading} = useGetAllProductsQuery();
    const products = productsData?.data;

    return (
        <section id="sections">
            <div className="container">
                <h2>Məhsullar</h2>
                <div className={"lineWrapper"}>
                    <div className={"greenLine"} style={{
                        marginBottom: '20px'
                    }}></div>
                </div>
                {productLoading && (
                    <AnyLoading/>
                )}
                <ProductsSwiper/>
            </div>
        </section>
    );
}

export default Sections;
