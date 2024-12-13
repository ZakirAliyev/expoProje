import './index.scss';
import {useGetAllCategoriesTreeQuery, useGetAllProductsQuery} from "../../services/usersApi.jsx";
import ProductCard from "../ProductCard/index.jsx";
import {MutatingDots, ThreeCircles} from "react-loader-spinner";
import AnyLoading from "../AnyLoading/index.jsx";

function Sections() {
    const {data: productsData, isLoading: productLoading} = useGetAllProductsQuery();
    const products = productsData?.data;

    return (
        <section id="sections">
            <div className="container">
                <h2>Products</h2>
                {productLoading && (
                    <AnyLoading/>
                )}
                <div className="row">
                    {products && products.map((item) => (
                        <div className="col-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                            <ProductCard item={item}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Sections;
