import './index.scss';
import {Link} from "react-router";
import {useState} from "react";

function BottomNavbar() {
    const [hovered, setHovered] = useState(false);

    return (
        <section id={"bottomNavbar"}>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <div
                        className={"logo"}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <p style={{
                            height: '51px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>Categories</p>
                        {hovered && (
                            <div className="dropdown">
                                <Link to={`/office`} className="sublink">Office Supplies</Link>
                                <Link to={`/food`} className="sublink">Food & Drinks</Link>
                                <Link to={`/tools`} className="sublink">Tools</Link>
                                <div className="nested-dropdown">
                                    <span className="sublink">New Year</span>
                                    <div className="nested-menu">
                                        <div className={"row"}>
                                            <div className={"col-4"}>
                                                <Link to={`/trees`} className="nested-sublink">New Year Trees</Link>
                                            </div>
                                            <div className={"col-4"}>
                                                <Link to={`/decorations`} className="nested-sublink">Decorations</Link>
                                            </div>
                                            <div className={"col-4"}>
                                                <Link to={`/gifts`} className="nested-sublink">Gift Sets</Link>
                                            </div>
                                            <div className={"col-4"}>
                                                <Link to={`/gifts`} className="nested-sublink">Gift Sets</Link>
                                            </div>
                                            <div className={"col-4"}>
                                                <Link to={`/trees`} className="nested-sublink">New Year Trees</Link>
                                            </div>
                                            <div className={"col-4"}>
                                                <Link to={`/decorations`} className="nested-sublink">Decorations</Link>
                                            </div>
                                            <div className={"col-4"}>
                                                <Link to={`/gifts`} className="nested-sublink">Gift Sets</Link>
                                            </div>
                                            <div className={"col-4"}>
                                                <Link to={`/gifts`} className="nested-sublink">Gift Sets</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={"links"}>
                        <Link to={`/about`} className={"link"}>About</Link>
                        <Link to={`/new-products`} className={"link"}>New</Link>
                        <Link to={`/discounts`} className={"link"}>Discounts</Link>
                        <Link to={`/bestsellers`} className={"link"}>Bestsellers</Link>
                        <Link to={`/terms`} className={"link"}>Terms</Link>
                        <Link to={`/contact`} className={"link"}>Contact us</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BottomNavbar;
