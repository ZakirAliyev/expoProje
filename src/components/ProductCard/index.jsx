import './index.scss'
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {IoCartOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {
    useDeleteWishlistRemoveMutation, useGetAllProductsQuery,
    useGetBasketItemsQuery,
    usePostAddBasketItemMutation,
    usePostWishlistAddMutation
} from "../../services/usersApi.jsx";

function ProductCard({item}) {

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

    async function addHeart(productId) {
        const response = await postWishlistAdd({productId})
        newProdRef()
    }

    async function removeHeart(productId) {
        const response = await deleteWishlistRemove({productId})
        newProdRef()
    }


    return (
        <section id={"productCard"}>
            <div className={"container"}>
                <div className={"box"}>
                    <div className={"firstWrapper"}>
                        {item?.isWishlist ? (
                            <FaHeart onClick={() => removeHeart(item?.id)} className={"icon red"}/>
                        ) : (
                            <FaRegHeart onClick={() => addHeart(item?.id)} className={"icon red"}/>
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
                        <img src={"https://exposite-001-site1.ntempurl.com/files/pictures/" + item?.images[0]}
                             alt={"Image"}/>
                    </div>
                    <p>{item?.name}</p>
                    <div className={"textWrapper"}>
                        <div className={"text"}>
                            {item?.isDiscount ? (
                                <>
                                    <div className={"price"}>{item?.price}.00 $</div>
                                    <div className={"discountPrice"}>{item?.discountPrice}.00 $</div>
                                </>
                            ) : (
                                <div className={"discountPrice"}>{item?.price}.00 $</div>
                            )}
                        </div>
                        <button onClick={() => addToCart(item?.id, 1)}>
                            <IoCartOutline className={"icon"}/>
                            Əlavə et
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
        ;
}

export default ProductCard;
