import './index.scss'
import {FaRegHeart} from "react-icons/fa";
import {IoCartOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

function ProductCard({item}) {

    const navigate = useNavigate();

    return (
        <section id={"productCard"}>
            <div className={"container"}>
                <div className={"box"}>
                    <div className={"firstWrapper"}>
                        <FaRegHeart className={"icon"}/>
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
                        <button>
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
