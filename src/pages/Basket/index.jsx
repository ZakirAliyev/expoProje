import './index.scss';
import {FaTrash} from "react-icons/fa";
import {useGetBasketItemsQuery, usePostAddBasketItemMutation} from "../../services/usersApi.jsx";

function Basket() {
    const {data: getBasketItems, refetch} = useGetBasketItemsQuery();
    const basket = getBasketItems?.data || [];

    const [postAddBasketItem] = usePostAddBasketItemMutation();

    const updateQuantity = async (productId, count) => {
        try {
            await postAddBasketItem({productId, count}).unwrap();
            refetch();
        } catch (error) {
            console.error("Error updating basket:", error);
        }
    };

    const removeItem = (id) => {
        console.log(`Remove item with id: ${id}`);
    };

    return (
        <section id="basket">
            <div className="container">
                <div className="row">
                    <div className="col-8 col-md-8 col-sm-12 col-xs-12">
                        <div className="box">
                            <div className="box1">Səbət</div>
                            <div className="wrapper">
                                <table className="basket-table">
                                    <thead>
                                    <tr>
                                        <th>Şəkil</th>
                                        <th>Adı</th>
                                        <th>Qiyməti</th>
                                        <th>Sayı</th>
                                        <th>Əməliyyat</th>
                                        <th>Ümumi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {basket.map((item) => (
                                        <tr key={item.basketItemId}>
                                            <td><img src="https://via.placeholder.com/100" alt="product"/></td>
                                            <td>{item.productName.length > 8
                                                ? item.productName.substring(0, 8) + '..'
                                                : item.productName}</td>
                                            <td>1 AZN</td>
                                            <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                < button onClick={() => updateQuantity(item.productId, -1)}>-</button>
                                                <input value={item.count} readOnly/>
                                                <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
                                            </td>
                                            <td>
                                                <button className="delete"
                                                        onClick={() => removeItem(item.basketItemId)}>
                                                    <FaTrash className="icon" style={{
                                                        margin: '4px 0 0 1px'
                                                    }}/>
                                                </button>
                                            </td>
                                            <td>{item.totalPrice} AZN</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="box">
                            <div className="box1">Cəmi sifariş</div>
                            <div className="wrapper">
                                <div className="boxx">
                                    <span>Cəmi məhsul</span>
                                    <span>300 AZN</span>
                                </div>
                                <div className="boxx">
                                    <span>Çatdırılma</span>
                                    <span>20 AZN</span>
                                </div>
                                <div className="boxx1">
                                    <div className="boxx2">
                                        <span>Toplam endirim</span>
                                        <span style={{color: '#15DC03', fontWeight: '600'}}>-103 AZN</span>
                                    </div>
                                    <div style={{fontSize: '10px', maxWidth: '200px', width: '100%', padding: '0 8px'}}>
                                        Expohome ekskluziv endirimindən faydalandın.
                                    </div>
                                </div>
                                <div className="line"></div>
                                <div className="boxx boxx3">
                                    <span>Cəmi</span>
                                    <span>217 AZN</span>
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
