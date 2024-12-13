import './index.scss'
import {FaRegHeart} from "react-icons/fa";
import image from '/src/assets/image.jpg'
import {IoCartOutline} from "react-icons/io5";

function ProductCard({item}) {

    console.log(item)

    return (
        <section id={"productCard"}>
            <div className={"container"}>
                <div className={"box"}>
                    <div className={"firstWrapper"}>
                        <div className={"status"}>YENİ</div>
                        <FaRegHeart className={"icon"}/>
                    </div>
                    <div className={"imageWrapper"}>
                        <img src={"https://exposite-001-site1.ntempurl.com/files/pictures/" + item?.images[0]}
                             alt={"Image"}/>
                    </div>
                    <p>{item.name}</p>
                    <div className={"textWrapper"}>
                        <div className={"text"}>
                            {/*<div className={"price"}>1.449,99 $</div>*/}
                            <div className={"discountPrice"}>{item?.price}.00 $</div>
                        </div>
                        <button>
                            <IoCartOutline className={"icon"}/>
                            Əlavə et
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductCard;
