import './index.scss';
import {FaTrash} from "react-icons/fa";
import {
    useDeleteBasketItemMutation,
    useGetBasketItemsQuery,
    usePostAddBasketItemMutation,
    usePutDecreaseBasketItemCountMutation
} from "../../services/usersApi.jsx";
import {baseURL} from "../../constants.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Basket() {
    const {data: getBasketItems, refetch} = useGetBasketItemsQuery();
    const basket = getBasketItems?.data || [];
    useEffect(() => {
        refetch();
    }, [refetch]);

    const [postAddBasketItem] = usePostAddBasketItemMutation();
    const [putDecreaseBasketItemCount] = usePutDecreaseBasketItemCountMutation();
    const [deleteBasketItem] = useDeleteBasketItemMutation();

    const updateQuantity = async (productId, count) => {
        const item = basket.find((item) => item.productId === productId);
        if (!item) return;

        if (item.count + count < 1) {
            console.warn("Sayı 1-dən aşağı sala bilməzsiniz.");
            return;
        }

        try {
            await postAddBasketItem({productId, count}).unwrap();
            refetch();
        } catch (error) {
            console.error("Error updating basket:", error);
        }
    };


    const updateQuantity1 = async (basketItemId) => {
        const item = basket.find((item) => item.basketItemId === basketItemId);
        if (!item) return;

        try {
            await putDecreaseBasketItemCount({basketItemId}).unwrap();
            refetch();
        } catch (error) {
            console.error("Error updating basket:", error);
        }
    };

    const removeItem = async (basketItemId) => {
        try {
            const response = await deleteBasketItem({basketItemId}).unwrap();
            refetch();
        } catch (error) {
            console.error("Error updating basket:", error);
        }
    };

    const navigate = useNavigate()

    return (
        <section id="basket">
            <div className="container">
                <div className="row">
                    <div className="col-8 col-md-8 col-sm-12 col-xs-12">
                        <div className="box">
                            <div className="box1">Səbət</div>
                            {basket && basket.length === 0 ? (
                                <div className={"wrapper"}>
                                    <h2 style={{
                                        textAlign: "center",
                                        padding: '30px 0',
                                        color: '#454545'
                                    }}>Məhsul yoxdur :(</h2>
                                </div>
                            ) : (
                                <div className="wrapper">
                                    <table className="basket-table">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        {basket.map((item) => (
                                            <>
                                                <tr key={item.basketItemId}>
                                                    <td style={{
                                                        height: "80px",
                                                        margin: '20px 0'
                                                    }}><img src={
                                                        baseURL + item?.images?.[0]
                                                    } alt="product" onClick={() => {
                                                        navigate(`/products/${item?.productId}`)
                                                    }} style={{
                                                        cursor: 'pointer'
                                                    }}/></td>
                                                    <td onClick={() => {
                                                        navigate(`/products/${item?.productId}`)
                                                    }} style={{
                                                        fontWeight: '600',
                                                        cursor: 'pointer'
                                                    }}>
                                                <span style={{
                                                    fontWeight: '600',
                                                }}>Məhsul adı</span>
                                                        {item.productName.length > 8
                                                            ? item.productName.substring(0, 8) + '..'
                                                            : item.productName}</td>
                                                    <td><span style={{
                                                        fontWeight: '600',
                                                    }}>Qiymət</span>{item?.price} AZN
                                                    </td>
                                                    <td style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'row',
                                                        height: '100px',
                                                    }}>
                                                        < button onClick={() => updateQuantity1(item.basketItemId)}>-
                                                        </button>
                                                        <input value={item.count} readOnly/>
                                                        <button onClick={() => updateQuantity(item.productId, 1)}>+
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="delete"
                                                                onClick={() => removeItem(item.basketItemId)}>
                                                            <FaTrash className="icon" style={{
                                                                margin: '4px 0 0 1px'
                                                            }}/>
                                                        </button>
                                                    </td>
                                                    <td><span style={{
                                                        fontWeight: '600',
                                                    }}>Cəmi: </span>{item.totalPrice} AZN
                                                        <br/>
                                                        {item?.totalDiscount === 0 ? (
                                                            <></>
                                                        ) : (
                                                            <div style={{
                                                                backgroundColor: '#EBFDE8',
                                                                borderRadius: '5px',
                                                                padding: '5px',
                                                                fontSize: '10px',
                                                                marginBottom: '10px',
                                                            }}>Endirim:
                                                                <div style={{
                                                                    color: '#15DC03',
                                                                    display: 'inline',
                                                                    fontWeight: '600',
                                                                    marginLeft: '5px',
                                                                }}>-{item.totalDiscount} AZN</div>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="box">
                            <div className="box1">Cəmi sifariş</div>
                            <div className="wrapper">
                                <div className="boxx">
                                    <span>Cəmi məhsul</span>
                                    <span>
                                      {basket.reduce((acc, item) => acc + item.price * item.count, 0)} AZN
                                    </span>
                                </div>
                                <div className="boxx">
                                    <span>Çatdırılma</span>
                                    <span>Pulsuz</span>
                                </div>
                                <div className="boxx1">
                                    <div className="boxx2">
                                        <span>Toplam endirim</span>
                                        <span style={{color: '#15DC03', fontWeight: '600'}}>
                                            {basket.reduce((acc, item) => acc + item.totalDiscount, 0)} AZN
                                        </span>
                                    </div>
                                    <div style={{fontSize: '10px', maxWidth: '200px', width: '100%', padding: '0 8px'}}>
                                        Expohome ekskluziv endirimindən faydalandın.
                                    </div>
                                </div>
                                <div className="line"></div>
                                <div className="boxx boxx3">
                                    <span>Cəmi</span>
                                    <span>{basket.reduce((acc, item) => acc + item.price * item.count, 0)} AZN</span>
                                </div>
                            </div>
                        </div>
                        <button className={"testiq"}>Səbəti təstiqlə</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Basket;