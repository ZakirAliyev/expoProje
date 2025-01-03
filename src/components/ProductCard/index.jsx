import './index.scss'
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {IoCartOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {
    useDeleteWishlistRemoveMutation,
    useGetAllProductByNameQuery,
    useGetAllProductsByCategoryIdQuery,
    useGetAllProductsQuery,
    useGetBasketItemsQuery,
    useGetWishlistItemsQuery,
    usePostAddBasketItemMutation,
    usePostWishlistAddMutation
} from "../../services/usersApi.jsx";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function ProductCard({item, query, categoryId}) {

    const navigate = useNavigate();
    const [postAddBasketItem] = usePostAddBasketItemMutation()

    async function addToCart(productId, count) {
        const response = await postAddBasketItem({productId, count}).unwrap()
        refetch()
    }

    const {data, refetch} = useGetBasketItemsQuery()
    const [postWishlistAdd] = usePostWishlistAddMutation()
    const [deleteWishlistRemove] = useDeleteWishlistRemoveMutation()
    const {data: newProdRefData, refetch: newProdRef} = useGetAllProductsQuery()

    const {data: productsData, isLoading: productLoading, refetch: wishRefetch} = useGetWishlistItemsQuery();
    const products = productsData?.data?.items

    const {data: getAllProductByName, isLoading, refetch: myRefetch} = useGetAllProductByNameQuery(query);

    const {
        data: productsDataa,
        isLoading: productLoadinga,
        refetch: myrefetch1
    } = useGetAllProductsByCategoryIdQuery(categoryId);

    async function addHeart(productId) {
        const response = await postWishlistAdd({productId})
        newProdRef()
        wishRefetch()
        myRefetch()
        myrefetch1()
    }

    async function removeHeart(productId) {
        const response = await deleteWishlistRemove({productId})
        newProdRef()
        wishRefetch()
        myRefetch()
        myrefetch1()
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
        <section id={"productCard"}>
            <div className={"container"}>
                <div className={"box"}>
                    <div className={"firstWrapper"}>
                        {expoToken === "null" ? (
                            <FaRegHeart onClick={() => getmessage()} className={"icon red"}/>
                        ) : (
                            item?.isWishlist ? (
                                <FaHeart onClick={() => removeHeart(item?.id)} className={"icon red"}/>
                            ) : (
                                <FaRegHeart onClick={() => addHeart(item?.id)} className={"icon red"}/>
                            )
                        )}
                        <div className={"status"}>
                            {item?.isDiscount ? 'Endirim' : 'Yeni'}
                        </div>
                    </div>
                    <div className={"imageWrapper"} onClick={() => {
                        navigate(`/products/${item?.id}`)
                    }} style={{
                        cursor: "pointer"
                    }}>
                        <div className={"img"}>
                            <img src={"https://exposite-001-site1.ntempurl.com/files/pictures/" + item?.images[0]}
                                 alt={"Image"}/>
                        </div>
                    </div>
                    <p>{item?.name}</p>
                    <div className={"textWrapper"}>
                        <div className={"text"}>
                            {item?.isDiscount ? (
                                <>
                                    <div className={"price"}>{item?.price} AZN</div>
                                    <div className={"discountPrice"}>{item?.discountPrice} AZN</div>
                                </>
                            ) : (
                                <div className={"discountPrice"}>{item?.price} AZN</div>
                            )}
                        </div>
                        {expoToken === "null" ? (
                            <button onClick={getmessage}>
                                <IoCartOutline className={"icon"}/>
                                Əlavə et
                            </button>
                        ) : (
                            <button onClick={() => addToCart(item?.id, 1)}>
                                <IoCartOutline className={"icon"}/>
                                Əlavə et
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
        ;
}

export default ProductCard;
