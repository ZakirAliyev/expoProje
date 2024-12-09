import './index.scss'
import {Link} from "react-router";

function Navbar() {
    return (
        <section id={"navbar"}>
            <div className={"container"}>
                <div className={"actionWrapper"}>
                    <button>
                        <Link to={`/login`} className={"link"}>Login</Link>
                    </button>
                    <button>
                        <Link to={`/register`} className={"link"}>Register</Link>
                    </button>
                </div>
                <div className={"wrapper"}>
                    <Link to={`/`} className={"logo"}>Expo</Link>
                    <input placeholder={"Search..."}/>
                    <div className={"links"}>
                        <Link to={`/basket`} className={"link"}>Basket</Link>
                        <Link to={`/wishlist`} className={"link"}>Wishlist</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Navbar;