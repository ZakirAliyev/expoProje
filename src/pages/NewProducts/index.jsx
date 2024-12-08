import './index.scss';
import { FaChevronLeft, FaChevronRight, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function NewProducts() {
    const navigate = useNavigate();
    const products = Array.from({ length: 12 }, (_, index) => ({
        id: `${index + 1}`,
    }));

    return (
        <section id={"newProducts"}>
            <div className={"container"}>
                <h2>New Products</h2>
                <div className={"row"}>
                    {products.map((product) => (
                        <div className={"col-3"} key={product.id}>
                            <div className={"box"}>
                                <div className={"panel"}>
                                    <div>New</div>
                                    <FaRegHeart />
                                </div>
                                <img
                                    src={"https://avatars.githubusercontent.com/u/106933941"}
                                    alt={"Image"}
                                    onClick={() => navigate(`/products/${product.id}`)} // Resme tıklandığında yönlendir
                                    style={{ cursor: 'pointer' }} // Kullanıcıya tıklanabilir olduğunu göstermek için
                                />
                                <div className={"title"}>Zakir Aliyev</div>
                                <div className={"price"}>99$</div>
                                <div className={"button"}>
                                    <button onClick={() => {
                                        console.log(product.id);
                                    }}>Add to cart</button>
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

export default NewProducts;
