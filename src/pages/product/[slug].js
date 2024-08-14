import HeadComp from "@/components/shared/HeadComp";
import Header from "@/components/shared/Header/Header";
import axiosInstance from "@/lib/axios";
import { Empty } from "antd";
import dynamic from "next/dynamic";

const ProductInfo = dynamic(
  async () => await import("@/components/product/ProductInfo"),
  {
    ssr: false,
  }
);

const SingleProduct = ({ product }) => {
  return (
    <>
      <HeadComp title="Product Dynamic Page" />
      <Header />

      <div id="product_details">
        <div className="main_container">
          <div className="row mt-2">
            {product ? (
              <ProductInfo product={product} />
            ) : (
              <div className="col-md-9 col-sm-12 mt-5">
                {/* <Empty description="No product found" /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

SingleProduct.getInitialProps = async (ctx) => {
  try {
    const res = await axiosInstance.get(`/product/details/${ctx.query?.slug}`);

    console.log(res);

    return {
      product: res.data?.product,
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default SingleProduct;
