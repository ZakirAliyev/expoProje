import './index.scss';

function Basket() {
    return (
        <section id="basket">
            <div className="container">
                <h2>Basket</h2>
                <div className="row">
                    <div className="box col-8">
                        <table className="basket-table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Məhsul adı</th>
                                <th>Qiymət</th>
                                <th>Say</th>
                                <th>Rəng</th>
                                <th>Cəmi</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <img
                                        src="your-product-image-url"
                                        alt="Product"
                                        className="product-image"
                                    />
                                </td>
                                <td>Ağardıcı Lent "Best" DP-904</td>
                                <td>1.10 $</td>
                                <td>
                                    <div className="quantity-controls">
                                        <button className="decrease">-</button>
                                        <input type="text" value="30" readOnly />
                                        <button className="increase">+</button>
                                    </div>
                                </td>
                                <td>-</td>
                                <td>33.00 $</td>
                                <td>
                                    <button className="remove-btn">X</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="box col-4">
                        <p>Cart</p>
                        <div className={"line"}></div>
                        <div className={"priceWrapper"}>
                            <div>Total</div>
                            <div>33.00 $</div>
                        </div>
                        <div className={"button"}>
                            <button>Confirm the order</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Basket;
