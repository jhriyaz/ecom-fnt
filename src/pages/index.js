
import { Inter } from "next/font/google";
import SliderComp from "@/components/home/SliderComp";
import BasicService from "@/components/home/BasicService";
import dynamic from "next/dynamic";
import HeadComp from "@/components/shared/HeadComp";
import CategoriesList from "@/components/home/CategoriesList";
// import FeaturedProduct from "@/components/home/FeaturedProduct";

const FeaturedProduct = dynamic(
  async () => await import("@/components/home/FeaturedProduct"),
  {
    ssr: false,
  }
);

const inter = Inter({ subsets: ["latin"] });

export default function Home({ featuredProduct }) {
  return (
    <>
      <HeadComp />
      {/* <Header /> */}
      <div id="home">
        <div className="main_container">
          <SliderComp />

          <div className="featured">
            <FeaturedProduct featuredProduct={featuredProduct} />
          </div>
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps() {
//   try {
//     const res = await axiosInstance.get(
//       "/product/getFeatured"
//     );
//     if (res.data?.success) {
//       const featuredProduct = res.data?.products;

//       return {
//         props: {
//           featuredProduct,
//         },
//       };
//     }
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         featuredProduct: [],
//       },
//     };
//   }
// }
