import './index.scss'
import {Link} from "react-router";

function Navbar() {
    return (
        <section id={"navbar"}>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <Link to={`/`} className={"logo"}>Expo</Link>
                    <div className={"links"}>
                        <Link to={`/`} className={"link"}>Basket</Link>
                        <Link to={`/`} className={"link"}>Wishlist</Link>
                        <Link to={`/register`} className={"link"}>Register</Link>
                        <Link to={`/login`} className={"link"}>Login</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Navbar;