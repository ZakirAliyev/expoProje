import './index.scss'
import {Link} from "react-router";

function BottomNavbar() {
    return (
        <section id={"bottomNavbar"}>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <div className={"logo"}>Categories</div>
                    <div className={"links"}>
                        <Link to={`/about`} className={"link"}>About</Link>
                        <Link to={`/`} className={"link"}>New</Link>
                        <Link to={`/`} className={"link"}>Discounts</Link>
                        <Link to={`/`} className={"link"}>Bestsellers</Link>
                        <Link to={`/`} className={"link"}>Terms</Link>
                        <Link to={`/`} className={"link"}>Contact us</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BottomNavbar;