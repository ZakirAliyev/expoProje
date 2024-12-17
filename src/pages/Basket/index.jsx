import './index.scss';
import {useState} from "react";

function Basket() {

    const [items, setItems] = useState([
        { id: 1, name: 'Məhsul adı', price: 100, discount: 103, quantity: 4 },
        { id: 2, name: 'Məhsul adı', price: 100, discount: 103, quantity: 4 },
        { id: 3, name: 'Məhsul adı', price: 100, discount: 103, quantity: 4 },
        { id: 4, name: 'Məhsul adı', price: 100, discount: 103, quantity: 4 },
    ]);

    const updateQuantity = (id, amount) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };


    return (
        <section id="basket">
            <div className="container">
                <div className={"row"}>
                    <div className={"col-8"}>
                        <div className={"box"}>
                            <div className={"box1"}>Səbət</div>
                            <div className={"wrapper"}>
                                {items.map((item) => (
                                    <div className="basket-item" key={item.id}>
                                        <img src="https://via.placeholder.com/100" alt="product" />
                                        <span className="item-name">{item.name}</span>
                                        <div className="quantity">
                                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <span className="price">{item.price} AZN</span>
                                        <span className="discount">endirim - {item.discount} AZN</span>
                                        <button className="delete" onClick={() => removeItem(item.id)}>
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={"col-4"}>
                        <div className={"box"}>
                            Salam
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Basket;
