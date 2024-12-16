import './index.scss';
import {FaChevronLeft, FaChevronRight, FaRegHeart} from "react-icons/fa";
import ProductCard from "../../components/ProductCard/index.jsx";
import {useGetAllProductsQuery} from "../../services/usersApi.jsx";
import AnyLoading from "../../components/AnyLoading/index.jsx";

function NewProducts() {

    const {data: productsData, isLoading: productLoading} = useGetAllProductsQuery();
    const products = productsData?.data;

    return (
        <section id={"newProducts"}>
            <div className={"container"}>
                <h2>Yeni məhsullar</h2>
                <div className={"lineWrapper"}>
                    <div className={"greenLine"}></div>
                </div>
                {productLoading && (
                    <AnyLoading/>
                )}
                <div className={"row"}>
                    {products && products.map((product) => (
                        <div className={"col-3 col-md-3 col-sm-6 col-xs-12"} key={product.id}>
                            <ProductCard item={product}/>
                        </div>
                    ))}
                </div>
                <div className={"pagination"}>
                    <button><FaChevronLeft/></button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button><FaChevronRight/></button>
                </div>
            </div>
        </section>
    );
}

export default NewProducts;
