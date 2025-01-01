import './index.scss';
import {FaHeart, FaRegHeart, FaShoppingBasket} from "react-icons/fa";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {Modal} from "antd"; // AntD Modal
import {LeftOutlined, RightOutlined} from "@ant-design/icons"; // Chevron ikonlar
import {
    useDeleteWishlistRemoveMutation,
    useGetBasketItemsQuery,
    useGetProductByIdQuery, useGetWishlistItemsQuery,
    usePostAddBasketItemMutation,
    usePostWishlistAddMutation
} from "../../services/usersApi.jsx";
import {baseURL} from "../../constants.js";
import AnyLoading from "../../components/AnyLoading/index.jsx";
import SimilarSwiper from "../../components/SimilarSwiper/index.jsx";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function ProductDetails() {
    const {id} = useParams();
    const [count, setCount] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const {data: productData, isLoading, isError, refetch: refetchProduct} = useGetProductByIdQuery(id);
    const {data: basketData, refetch: refetchBasket} = useGetBasketItemsQuery();
    const {data: zakir, refetch: zakir1} = useGetWishlistItemsQuery()

    const [postAddBasketItem] = usePostAddBasketItemMutation();
    const [postWishlistAdd] = usePostWishlistAddMutation();
    const [deleteWishlistRemove] = useDeleteWishlistRemoveMutation();

    const product = productData?.data;

    const handleIncrement = () => setCount(prevCount => prevCount + 1);
    const handleDecrement = () => setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));

    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsModalVisible(true);
    };

    const closeModal = () => setIsModalVisible(false);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product?.images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product?.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (isLoading) {
        return <AnyLoading/>;
    }

    if (isError || !product) {
        return (
            <section id="productDetails">
                <div className="container">
                    <h2 style={{textAlign: 'center', margin: '50px 0'}}>Məhsul tapılmadı!</h2>
                </div>
            </section>
        );
    }

    async function addHeart(productId) {
        const response = await postWishlistAdd({productId})
        zakir1()
        refetchProduct()
    }

    async function removeHeart(productId) {
        const response = await deleteWishlistRemove({productId})
        zakir1()
        refetchProduct()
    }

    async function addToCart(productId, count) {
        const response = await postAddBasketItem({productId, count}).unwrap()
        zakir1()
        refetchProduct()
        refetchBasket()
    }

    const expoToken = Cookies.get("expoToken");

    const getmessage = async () => {
        await Swal.fire({
            position: "center",
            icon: "warning",
            title: "Hesabınıza giriş edin",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <section id="productDetails">
            <div className="container">
                <p style={{margin: '8px 8px 4px'}}>Ana səhifə / {product?.categoryName} / {product?.name}</p>
                <div className="row row1">
                    <div className="col-5 col-md-4 col-sm-12 col-xs-12 balaca">
                        <div className="box">
                            <div className="img">
                                {product?.images?.length > 0 && (
                                    <img
                                        src={baseURL + product?.images[0]}
                                        alt="Product Image"
                                        onClick={() => openModal(0)}
                                    />
                                )}
                            </div>
                            <div className="images">
                                <div className="row">
                                    {product?.images?.slice(1).map((image, index) => (
                                        <div className="col-3 box1" key={index}>
                                            <div className="img">
                                                <img
                                                    src={baseURL + image}
                                                    alt={`Product Image ${index + 2}`}
                                                    onClick={() => openModal(index + 1)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-7 col-md-8 col-sm-12 col-xs-12 balaca">
                        <div className="box">
                            {expoToken === "null" ? (
                                <FaRegHeart onClick={() => getmessage()} className={"icon red"}/>
                            ) : (
                                product?.isWishlist ? (
                                    <FaHeart onClick={() => removeHeart(product?.id)} className={"icon red"}/>
                                ) : (
                                    <FaRegHeart onClick={() => addHeart(product?.id)} className={"icon red"}/>
                                )
                            )}
                            <p>{product?.categoryName}</p>
                            <h2>{product?.name}</h2>

                            <div className="wrapper">
                                <div className="priceWrapper">
                                    {product?.isDiscount && (
                                        <>
                                            <div className="firstPrice">{product?.price} AZN</div>
                                            <div className="discount">
                                                {product?.discountPrice - product?.price} AZN
                                            </div>
                                        </>
                                    )}
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
                                {expoToken === "null" ? (
                                    <button onClick={() => getmessage()}>
                                        <FaShoppingBasket/>
                                        <span>Səbətə əlavə et</span>
                                    </button>
                                ) : (
                                    <button onClick={() => addToCart(product.id, count)}>
                                        <FaShoppingBasket/>
                                        <span>Səbətə əlavə et</span>
                                    </button>
                                )}
                            </div>
                            <div className="line"></div>
                            <h2>Məhsul xüsusiyyətləri: </h2>
                            <p>{product?.description}</p>
                        </div>
                    </div>
                </div>
                <div style={{margin: '100px 0'}}>
                    <h2 className={"ortaSoz"}>Oxşar məhsullar</h2>
                    <div className={"lineWrapper"}>
                        <div className={"greenLine"}></div>
                    </div>
                    <SimilarSwiper categoryId={product?.categoryId} productId={product.id}/>
                </div>
            </div>

            {/* AntD Modal */}
            <Modal
                visible={isModalVisible}
                onCancel={closeModal}
                footer={null}
                centered
                width={400}
            >
                <div style={{position: 'relative', textAlign: 'center'}}>
                    <img
                        src={baseURL + product?.images[currentImageIndex]}
                        alt="Product Modal"
                        style={{width: '100%', height: 'auto', aspectRatio: '1/1', objectFit: 'cover'}}
                    />
                    <LeftOutlined
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '-25px',
                            transform: 'translateY(-50%)',
                            fontSize: '24px',
                            cursor: 'pointer'
                        }}
                        onClick={handlePrevImage}
                    />
                    <RightOutlined
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '-25px',
                            transform: 'translateY(-50%)',
                            fontSize: '24px',
                            cursor: 'pointer'
                        }}
                        onClick={handleNextImage}
                    />
                </div>
            </Modal>
        </section>
    );
}

export default ProductDetails;
