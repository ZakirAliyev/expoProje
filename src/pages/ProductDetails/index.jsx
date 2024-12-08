import './index.scss'
import {FaRegHeart} from "react-icons/fa";

function ProductDetails(props) {

    const products = Array.from({length: 4});

    return (
        <section id={"productDetails"}>
            <div className={"container"}>
                <p>Home page / Products / Zakir Aliyev</p>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <img className={"productImg"} src={"https://avatars.githubusercontent.com/u/106933941"}
                             alt={"Image"}/>
                    </div>
                    <div className={"col-8"}>
                        <p>Zakir Aliyev</p>
                        <p>Price : 66 $ <span>99 $</span></p>
                        <div className={"wrapper"}>
                            <button>-</button>
                            <div>count</div>
                            <button>+</button>
                            <button>Add to cart</button>
                        </div>
                    </div>
                </div>
                <h2>Similar products</h2>
                <div className={"row"}>
                    {products.map((product) => (
                        <div className={"col-3"}>
                            <div className={"box"}>
                                <div className={"panel"}>
                                    <FaRegHeart/>
                                </div>
                                <img src={"https://avatars.githubusercontent.com/u/106933941"} alt={"Image"}/>
                                <div className={"title"}>Zakir Aliyev</div>
                                <div className={"price"}>99$</div>
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

export default ProductDetails;