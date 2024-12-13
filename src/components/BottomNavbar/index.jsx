import './index.scss';
import {Link} from "react-router";
import {useState} from "react";
import {HiOutlineSquares2X2} from "react-icons/hi2";
import {BsHandbag} from "react-icons/bs";
import {LuUserRound} from "react-icons/lu";
import {BiUser} from "react-icons/bi";

function BottomNavbar() {
    const [hovered, setHovered] = useState(false);

    return (
        <section id={"bottomNavbar"}>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <div className={"catalogWrapper"}>
                        <HiOutlineSquares2X2 className={"icon"}/>
                        <span>Kataloq</span>
                    </div>
                    <input placeholder={"Axtar..."}/>
                    <div className={"actionWrapper"}>
                        <BsHandbag className={"icon"}/>
                        <div className={"line1"}></div>
                        <div className={"buttonWrapper"}>
                            <button className={"button"}>Register</button>
                            <button>Login</button>
                        </div>
                        <BiUser className={"icon1 icon"} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BottomNavbar;
