import './index.scss'
import shortLogo from '/src/assets/shortLogo.png'
import {FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaYoutube} from "react-icons/fa";
import {Link} from "react-router";

function Footer() {
    return (
        <section id={"footer"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
                        <img src={shortLogo} alt={"Logo"}/>
                    </div>
                    <div className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
                        <h2>Linklər</h2>
                        <Link className={"p"} to={`/about`}>Haqqımızda</Link>
                        <Link className={"p"} to={`/new-products`}>Yeni məhsullar</Link>
                        <Link className={"p"} to={`/terms`}>Qaydalar</Link>
                        <Link className={"p"} to={`/contact`}>Əlaqə</Link>
                    </div>
                    <div className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
                        <h2>Əlaqə</h2>
                        <p className={"p"}>Nömrə</p>
                        <p className={"p"}>Email</p>
                        <p className={"p"}>Ünvan</p>
                    </div>
                </div>
                <div className={"links"}>
                    <a href={""} className={"link"}><FaInstagram/></a>
                    <a href={""} className={"link"}><FaFacebook/></a>
                    <a href={""} className={"link"}><FaTwitter/></a>
                    <a href={""} className={"link"}><FaTelegram/></a>
                    <a href={""} className={"link"}><FaYoutube/></a>
                </div>
                <div className={"line"}></div>
                <div className={"row wrapper1"}>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12 wrapper"}>
                        <span>Powered by </span>
                        <h3>QAVO</h3>
                    </div>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12 text"}>
                        © Bütün haqqlar qorunur
                        <div className={"text1"}>
                            Expo Home by AKİAB
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;