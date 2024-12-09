import './index.scss';
import {FaHeart} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

function Wishlist() {
    const navigate = useNavigate();
    const items = Array.from({length: 20}, (_, index) => ({
        id: `${index + 1}`,
    }));

    return (
        <section id={"wishlist"}>
            <div className={"container"}>
                <h2>Wishlist</h2>
                <div className={"row"}>
                    {items.map((item) => (
                        <div className={"col-3"} key={item.id}>
                            <div className={"box"}>
                                <div className={"panel"}>
                                    <div>New</div>
                                    <FaHeart/>
                                </div>
                                <img
                                    src={"https://avatars.githubusercontent.com/u/106933941"}
                                    alt={"Image"}
                                    onClick={() => navigate(`/products/${item.id}`)}
                                    style={{cursor: 'pointer'}}
                                />
                                <div className={"title"}>Zakir Aliyev</div>
                                <div className={"priceWrapper"}>
                                    <div className={"price"}>66 $</div>
                                    <div className={"price price1"}>99 $</div>
                                </div>
                                <div className={"button"}>
                                    <button>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Wishlist;
