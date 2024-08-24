import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Autoplay, Pagination } from "swiper/modules";
import axiosInstance from "@/lib/axios";

import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from "./ProductCard";

const FeaturedProduct = () => {
  const [featuredProduct, setFeturedProduct] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = () => {
      axiosInstance
        .get("/product/getFeatured")
        .then((res) => {
          if (res.data?.success) {
            setFeturedProduct(res.data?.products);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchFeaturedProducts();
  }, []);


  return (
    <>
      {
        featuredProduct.length !== 0 ?
          <div className="featured_product main_container">

            <h3 className="home_section_title">Featured Products</h3>

            <div className="section_content">
              <Swiper
                breakpoints={{
                  480: {
                    slidesPerView: 2
                  },
                  860: {
                    slidesPerView: 3
                  },

                  1200: {
                    slidesPerView: 4
                  },

                  1440: {
                    slidesPerView: 5
                  }
                }}
                navigation={{
                  nextEl: '#featured_next_el',
                  prevEl: '#featured_prev_el'
                }}
                spaceBetween={20}
                modules={[FreeMode, Autoplay, Navigation, Pagination]}
                className="mySwiper"
                loop={true}
                freeMode={true}
                autoplay={{
                  delay: 3000,
                }}
              >
                {featuredProduct?.length > 0 &&
                  featuredProduct?.map((product) => (
                    <SwiperSlide key={product?._id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <div className="navigation_buttons">
                <button id="featured_next_el">
                  <Image src={'/svgs/home/nextEl.svg'} height={30} width={30} alt="next button" />
                </button>
                <button id="featured_prev_el">
                  <Image src={'/svgs/home/prevEl.svg'} height={30} width={30} alt="prev button" />
                </button>
              </div>
            </div>
          </div>
          :
          ""
      }
    </>
  );

};

export default FeaturedProduct;
