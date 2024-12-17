import './index.scss'
import shortLogo from '/src/assets/shortLogo.png'
import {FaInstagram} from "react-icons/fa";

function Footer() {
    return (
        <section id={"footer"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-3 col-md-6 col-sm-12 col-xs-12"}>
                        <img src={shortLogo} alt={"Logo"}/>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-12 col-xs-12"}>
                        <h2>Kateqoriyalar</h2>
                        <p>Parket</p>
                        <p>Parket</p>
                        <p>Parket</p>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-12 col-xs-12"}>
                        <h2>Linklər</h2>
                        <p>Home</p>
                        <p>Home</p>
                        <p>Home</p>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-12 col-xs-12"}>
                        <h2>Əlaqə</h2>
                        <p>+994 (50) 448-45-23</p>
                        <p>E-mail</p>
                        <p>Ünvan</p>
                    </div>
                </div>
                <div className={"links"}>
                    <a href={""} className={"link"}><FaInstagram /></a>
                    <a href={""} className={"link"}><FaInstagram /></a>
                    <a href={""} className={"link"}><FaInstagram /></a>
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