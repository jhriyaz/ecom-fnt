// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const SliderComp = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/settings/getsliders")
      .then((res) => setSliders(res.data?.sliders))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home_slider">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        spaceBetween={50}
        modules={[Pagination, FreeMode, Autoplay]}
        className="mySwiper"
        loop={true}
        // freeMode={true}
        autoplay={{
          delay: 3000,
        }}
      // slidesPerView={2}
      >
        {sliders?.map((slider) => (
          <SwiperSlide key={slider?.index}>
            <img
              className="slider_img"
              src={slider?.image}
              alt={`Image-${slider?.title}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderComp;
