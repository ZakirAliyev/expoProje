import './index.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import {Autoplay, Navigation} from 'swiper/modules';

export default function BannerSwiper() {
    return (
        <section id={"bannerSwiper"}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                speed={1600}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        src={"https://s3-alpha-sig.figma.com/img/7a62/0848/a94287a7c1e08c4b80210ddc7f93b701?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JempG5MqY4xo36GElgw9dGHJ5SdT2Di1skgToeHCWebnmBXbfqP55pahW6fcblumLHHGXOofujwEhXHZTgKZNdZgvkUwKUBa54IaLyKP5VbZLJMHmgF7mg09ms3MxJSScFMbfYCtYRJSYtn7qhaSeW86p6Y6fsC-neRP7BS~52n2lpGY~BVXm8yGtbilZNBao3MZIZ8bw5-5enc411vdiyjwryALbXcQTZQQO5Xe-E6dXWEwEqz6gfnIuwPjihONepFED14iCM4J4TUv7910jyA59avGNYYh-pc8TwiFlRbbRNTsFKoy~KReWr5I6xEV~FXYCLrUTgELmLUAZ2cF-w__"}
                        alt={"Image"} className={"col9img"}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={"https://s3-alpha-sig.figma.com/img/7a62/0848/a94287a7c1e08c4b80210ddc7f93b701?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JempG5MqY4xo36GElgw9dGHJ5SdT2Di1skgToeHCWebnmBXbfqP55pahW6fcblumLHHGXOofujwEhXHZTgKZNdZgvkUwKUBa54IaLyKP5VbZLJMHmgF7mg09ms3MxJSScFMbfYCtYRJSYtn7qhaSeW86p6Y6fsC-neRP7BS~52n2lpGY~BVXm8yGtbilZNBao3MZIZ8bw5-5enc411vdiyjwryALbXcQTZQQO5Xe-E6dXWEwEqz6gfnIuwPjihONepFED14iCM4J4TUv7910jyA59avGNYYh-pc8TwiFlRbbRNTsFKoy~KReWr5I6xEV~FXYCLrUTgELmLUAZ2cF-w__"}
                        alt={"Image"} className={"col9img"}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={"https://s3-alpha-sig.figma.com/img/7a62/0848/a94287a7c1e08c4b80210ddc7f93b701?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JempG5MqY4xo36GElgw9dGHJ5SdT2Di1skgToeHCWebnmBXbfqP55pahW6fcblumLHHGXOofujwEhXHZTgKZNdZgvkUwKUBa54IaLyKP5VbZLJMHmgF7mg09ms3MxJSScFMbfYCtYRJSYtn7qhaSeW86p6Y6fsC-neRP7BS~52n2lpGY~BVXm8yGtbilZNBao3MZIZ8bw5-5enc411vdiyjwryALbXcQTZQQO5Xe-E6dXWEwEqz6gfnIuwPjihONepFED14iCM4J4TUv7910jyA59avGNYYh-pc8TwiFlRbbRNTsFKoy~KReWr5I6xEV~FXYCLrUTgELmLUAZ2cF-w__"}
                        alt={"Image"} className={"col9img"}/>
                </SwiperSlide>
            </Swiper>
        </section>
    );
}
