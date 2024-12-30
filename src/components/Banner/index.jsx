import './index.scss'
import image from '/src/assets/image.jpg'
import BannerSwiper from "../BannerSwiper/index.jsx";
import yan1 from '/src/assets/yan1.jpeg'
import yan2 from '/src/assets/yan2.jpeg'

function Banner() {
    return (
        <section id={"banner"}>
            <div className={"container"}>
                <div className={"row wrapper"}>
                    <div className={"col-9 col-md-9 col-sm-12 col-xs-12"}>
                        <BannerSwiper/>
                    </div>
                    <div className={"col-3 col-md-3 col-sm-12 col-xs-12"}>
                        <div className={"row"}>
                            <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                <img
                                    src={yan1}
                                    alt={"Image"} className={"col3img"}/>
                            </div>
                            <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                <img
                                    src={yan2}
                                    alt={"Image"} className={"col3img"}/>
                            </div>
                            <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                <img
                                    src={yan1}
                                    alt={"Image"} className={"col3img"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;