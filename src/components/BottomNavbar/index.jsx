import './index.scss';
import {HiOutlineSquares2X2} from "react-icons/hi2";
import {BsHandbag} from "react-icons/bs";
import {BiUser} from "react-icons/bi";
import {Link} from "react-router";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function BottomNavbar() {

    const navigate = useNavigate();
    const token = Cookies.get('token');

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
                        <BsHandbag className={"icon"} onClick={() => {
                            navigate('/basket')
                        }}/>
                        <div className={"line1"}></div>
                        <div className="buttonWrapper">
                            {token === "null" ? (
                                <>
                                    <Link to={`/register`}>
                                        <button className="button">Register</button>
                                    </Link>
                                    <Link to={`/login`}>
                                        <button>Login</button>
                                    </Link>
                                </>
                            ) : (
                                <p>Salam, <span style={{
                                    color: '#0DA5B5',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                }}>Elvar!</span></p>
                            )}
                        </div>
                        <BiUser className={"icon1 icon"}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BottomNavbar;
