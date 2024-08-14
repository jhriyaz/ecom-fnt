import { Rate } from "antd";
import { useEffect, useState } from "react";
import SliderImage from "react-zoom-slider";

const ProductInfo = ({ product }) => {
  const [images, setImages] = useState([]);
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    if (!product) return;

    setImages([
      {
        image: product?.thumbnail,
        text: "",
      },
    ]);

    product?.gallery?.length > 0 &&
      product?.gallery?.map((gImage) => {
        setImages((prev) => [...prev, { image: gImage, text: "" }]);
      });
  }, [product]);

  return (
    <div className="col-md-9 col-sm-12">
      <div className="row background_white">
        <div className="col-md-6 col-sm-12 product_image">
          <div className="row">
            {images?.length > 0 && (
              <SliderImage
                data={images}
                width="500px"
                showDescription={true}
                direction="right"
              />
            )}
          </div>
        </div>

        <div className="col-md-6 col-sm-12 product_info mt-3">
          <h1 className="product_name text-capitalize">{product?.name}</h1>
          <div className="review">
            <span>
              <Rate
                style={{ fontSize: "16px" }}
                disabled
                value={product?.ratingCount}
              />
            </span>
            <span>({product?.ratingCount || 0} reviews)</span>
          </div>

          <div className="sku">
            <span className="key">
              SKU: {product?.sku ? product?.sku : "N/A"}
            </span>
          </div>

          <div className="price">{product?.disc}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
