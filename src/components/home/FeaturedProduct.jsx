import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Autoplay } from "swiper/modules";
import { Rate } from "antd";
import axiosInstance from "@/lib/axios";

const FeaturedProduct = () => {
  const [featuredProduct, setFeturedProduct] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = () => {
      axios
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
    <div className="featured_product">
      <div className="section_content">
        <Swiper
          pagination={{
            // dynamicBullets: true,
            clickable: true,
          }}
          slidesPerView={5}
          modules={[FreeMode, Autoplay, Navigation]}
          className="mySwiper"
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 3000,
          }}
        // slidesPerView={2}
        // navigation={true}
        >
          {featuredProduct?.length > 0 &&
            featuredProduct?.map((product) => (
              <SwiperSlide key={product?._id}>
                <div className="product_card">
                  <div className="product_card">
                    <div className="produc_image">
                      <div>
                        <Image
                          width={200}
                          height={250}
                          className="mx-auto w-100"
                          src={
                            product?.thumbnail
                              ? product?.thumbnail
                              : "https://via.placeholder.com/250"
                          }
                          alt="Product"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="product_info">
                        <div className="rating">
                          <Rate
                            style={{ fontSize: "16px" }}
                            disabled
                            defaultValue={product?.ratingCount}
                          />
                        </div>

                        <h5>{product?.name}</h5>

                        <div className="product-price">
                          {product?.discount?.value > 0 ? (
                            <>
                              <span className="old-price">
                                ${product.price}
                              </span>
                              {product?.discount?.discountType === "flat" ? (
                                <span className="new-price">
                                  ${product?.price - product?.discount.value}
                                </span>
                              ) : (
                                <span className="new-price">
                                  $
                                  {product.price -
                                    Math.floor(
                                      product.price *
                                      (product.discount.value / 100)
                                    )}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="new-price">${product.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedProduct;
