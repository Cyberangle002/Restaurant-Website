import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Carousel() {
  return (
    <Swiper autoplay={{ delay: 2500 }} loop={true}>
      <SwiperSlide>
        <img src="/food1.jpg" className="w-full h-96 object-cover" />
      </SwiperSlide>

      <SwiperSlide>
        <img src="/food2.jpg" className="w-full h-96 object-cover" />
      </SwiperSlide>

      <SwiperSlide>
        <img src="/food3.jpg" className="w-full h-96 object-cover" />
      </SwiperSlide>
    </Swiper>
  );
}
