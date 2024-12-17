import './index.scss';
import {FaRegHeart, FaShoppingBasket} from "react-icons/fa";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {useGetProductByIdQuery} from "../../services/usersApi.jsx";
import {baseURL} from "../../constants.js";
import AnyLoading from "../../components/AnyLoading/index.jsx";

function ProductDetails() {
    const {id} = useParams();
    console.log(id);

    const [count, setCount] = useState(1);

    const handleIncrement = () => setCount(prevCount => prevCount + 1);
    const handleDecrement = () => setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));

    // Fetch product details
    const {data: getProductById, isLoading, isError} = useGetProductByIdQuery(id);
    const product = getProductById?.data;

    console.log(product);

    // Show loader during loading
    if (isLoading) {
        return <AnyLoading/>;
    }

    // Show error message if fetching fails
    if (isError || !product) {
        return (
            <section id="productDetails">
                <div className="container">
                    <h2 style={{textAlign: 'center', margin: '50px 0'}}>Məhsul tapılmadı!</h2>
                </div>
            </section>
        );
    }

    return (
        <section id="productDetails">
            <div className="container">
                <p style={{margin: '8px 8px 4px'}}>Ana səhifə / {product?.categoryName} / {product?.name}</p>
                <div className="row row1">
                    <div className="col-4 col-md-4 col-sm-12 col-xs-12 balaca">
                        <div className="box">
                            <div className="img">
                                {product?.images?.length > 0 ? (
                                    <img src={baseURL + product?.images[0]} alt="Product Image"/>
                                ) : null}
                            </div>
                            <div className="images">
                                <div className="row">
                                    {product?.images?.slice(1).map((image, index) => (
                                        <div className="col-3 box1" key={index}>
                                            <div className="img">
                                                <img
                                                    src={baseURL + image}
                                                    alt={`Product Image ${index + 2}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 col-md-8 col-sm-12 col-xs-12 balaca">
                        <div className="box">
                            <FaRegHeart className="icon"/>
                            <p>{product?.categoryName}</p>
                            <h2>{product?.name}</h2>

                            <div className="wrapper">
                                <div className="priceWrapper">
                                    {product?.isDiscount ? (
                                        <>
                                            <div className="firstPrice">{product?.price} AZN</div>
                                            <div className="discount">
                                                {product?.discountPrice - product?.price} AZN
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                                <h2>
                                    {product?.isDiscount ? product?.discountPrice : product?.price} AZN
                                </h2>
                            </div>

                            <div className="count">
                                <button onClick={handleDecrement}>-</button>
                                <input value={count} readOnly/>
                                <button onClick={handleIncrement}>+</button>
                            </div>

                            <div className="addButton">
                                <button>
                                    <FaShoppingBasket/>
                                    <span>Səbətə əlavə et</span>
                                </button>
                            </div>
                            <div className="line"></div>
                            <h2>Məhsul xüsusiyyətləri: </h2>
                            <p>{product?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/*<h2 className={"similarProducts"}>Oxşar məhsullar</h2>*/}
        </section>
    );
}

export default ProductDetails;
