import './index.scss';
import {Link} from "react-router";
import logo from '/src/assets/logo.png';
import BurgerMenu from "../BurgerMenu/index.jsx";

function Navbar() {
    return (
        <section id={"navbar"}>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <div className={"logo"}>
                        <Link to={"/"} className={"logo"}>
                            <img src={logo} alt={"Image"}/>
                        </Link>
                    </div>
                    <BurgerMenu/>
                    <div className={"links"}>
                        <Link className={"link"} to={`/about`}>Haqqımızda</Link>
                        <Link className={"link"} to={`/new-products`}>Yeni məhsullar</Link>
                        <Link className={"link"} to={`/discounts`}>Endirimlər</Link>
                        <Link className={"link"} to={`/terms`}>Qaydalar</Link>
                        <Link className={"link"} to={`/contact`}>Əlaqə</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Navbar;
