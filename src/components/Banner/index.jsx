import './index.scss'
import image from '/src/assets/image.jpg'
import BannerSwiper from "../BannerSwiper/index.jsx";

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
                                    src={"https://s3-alpha-sig.figma.com/img/b96b/5a9e/6fc2919855f99f8dc93935125e2d6a76?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YJU8IYrLGuzd3CUD0cGnR0tLYoqHQFS~3qCv4BS-dT~tsUITh8h0bCM-CEnyHoHtZANfMtGlvdnCJDxuarPrYfzcKKBJszpZQxukErSII7~hOWdfuuRP-0TwdhQaQBvsEXX6arQ5u6Eu4LZgbhMi7ZpiCxkAvIY6HP8R1xnyOHinaj~g~-f0XNOv3YAK-8STljMBX1ivOG3J7gcLvCwJl11cjziBFDg7syHn~KdktywNvYdeFsHAUWGR7smiIvbI-tKgNd6JcdreFSrGSrZTc6nheJtjxilgXzcShrzdKSfI4zPwBFrn4eZ-YpwOfnN2j~RTqSPsBuFrdMPRPQupDA__"}
                                    alt={"Image"} className={"col3img"}/>
                            </div>
                            <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                <img
                                    src={"https://s3-alpha-sig.figma.com/img/73e6/cff5/549b75e98f63710083d43333d23a4df2?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wl8-Za2hXNNUNdNxSIH1qihmXsVLQxrWfuuKcrTJtkb585ndYEHK73dsW1M6ZxsVg~oeiLr1MSYLqDGyqpyOTwF1OhP~JgqKEjP-GmlcdNcTVdZ8DTKcbx3sbXpU1YHWYFgSjvALuX2~xbGjquZm9ybtHvzBx7GgypxMcKA3Xe-JZzVdGggqM9Ll6mT8js1PY1eLKdIhKaWeVKM5iyh5GEkdZZvkNyV9sRw3CM8AXQPH2NUVVTWBT~rNzxh4n6yk24Z9yalVnGOdn6tp~NE7AOxdBuQLAkhbfKF5iaNIuReQtYUXa-o~6cpva~02B3x3VxNEnuSwd-utYv6RCDT0aA__"}
                                    alt={"Image"} className={"col3img"}/>
                            </div>
                            <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                <img
                                    src={"https://s3-alpha-sig.figma.com/img/b96b/5a9e/6fc2919855f99f8dc93935125e2d6a76?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YJU8IYrLGuzd3CUD0cGnR0tLYoqHQFS~3qCv4BS-dT~tsUITh8h0bCM-CEnyHoHtZANfMtGlvdnCJDxuarPrYfzcKKBJszpZQxukErSII7~hOWdfuuRP-0TwdhQaQBvsEXX6arQ5u6Eu4LZgbhMi7ZpiCxkAvIY6HP8R1xnyOHinaj~g~-f0XNOv3YAK-8STljMBX1ivOG3J7gcLvCwJl11cjziBFDg7syHn~KdktywNvYdeFsHAUWGR7smiIvbI-tKgNd6JcdreFSrGSrZTc6nheJtjxilgXzcShrzdKSfI4zPwBFrn4eZ-YpwOfnN2j~RTqSPsBuFrdMPRPQupDA__"}
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