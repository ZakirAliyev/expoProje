import './index.scss';
import { FaChevronLeft, FaChevronRight, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Discounts() {
    const navigate = useNavigate();
    const items = Array.from({ length: 12 }, (_, index) => ({
        id: `${index + 1}`,
    }));

    return (
        <section id={"discounts"}>
            <div className={"container"}>
                <h2>Discounts</h2>
                <div className={"row"}>
                    {items.map((item) => (
                        <div className={"col-3"} key={item.id}>
                            <div className={"box"}>
                                <div className={"panel"}>
                                    <div>New</div>
                                    <FaRegHeart />
                                </div>
                                <img
                                    src={"https://avatars.githubusercontent.com/u/106933941"}
                                    alt={"Image"}
                                    onClick={() => navigate(`/products/${item.id}`)}
                                    style={{ cursor: 'pointer' }}
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
                <div className={"pagination"}>
                    <button><FaChevronLeft /></button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button><FaChevronRight /></button>
                </div>
            </div>
        </section>
    );
}

export default Discounts;
