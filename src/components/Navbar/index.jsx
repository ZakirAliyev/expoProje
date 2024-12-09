import './index.scss';
import { Link } from "react-router";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import {IoIosSearch} from "react-icons/io";

function Navbar() {
    return (
        <section id={"navbar"}>
            <div className={"container"}>
                <div className={"actionWrapper"}>
                    <button className={"button1"}>
                        <Link to={`/login`} className={"link"}>Login</Link>
                    </button>
                    <button className={"button2"}>
                        <Link to={`/register`} className={"link"}>Register</Link>
                    </button>
                </div>
                <div className={"wrapper"}>
                    <Link to={`/`} className={"logo"}>
                        <img src={"https://los.az/lucky/images/logo/logo-header.svg"} alt={"Image"} />
                    </Link>
                    <div style={{
                        width: "100%",
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <div className={"searchWrapper"}>
                            <input placeholder={"Search..."}/>
                            <IoIosSearch className={"searchIcon"}/>
                        </div>
                    </div>
                    <div className={"links"}>
                        <Link to={`/basket`} className={"link"}>
                            <FaShoppingCart className={"icon"}/>
                            <span className={"badge"}>1</span>
                        </Link>
                        <Link to={`/wishlist`} className={"link"}>
                            <FaHeart className={"icon"} />
                            <span className={"badge"}>1</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Navbar;
