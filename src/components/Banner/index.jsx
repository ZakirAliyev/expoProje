import './index.scss'
import image from '/src/assets/image.jpg'
import BannerSwiper from "../BannerSwiper/index.jsx";
import yan1 from '/src/assets/yan1.jpeg'
import yan2 from '/src/assets/yan2.jpeg'
import {useGetAllRBannersQuery} from "../../services/usersApi.jsx";
import {baseURLRBanners} from "../../constants.js";

function Banner() {

    const {data: rBannersData} = useGetAllRBannersQuery()
    const rBanners = rBannersData?.data

    return (
        <section id={"banner"}>
            <div className={"container"}>
                <div className={"row wrapper"}>
                    <div className={"col-9 col-md-9 col-sm-12 col-xs-12"}>
                        <BannerSwiper/>
                    </div>
                    <div className={"col-3 col-md-3 col-sm-12 col-xs-12"}>
                        <div className={"row"}>
                            {rBanners && rBanners.map((rBanner) => (
                                <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                    <img
                                        src={baseURLRBanners + rBanner?.imageName}
                                        alt={"Image"} className={"col3img"}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;