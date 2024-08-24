
import { Inter } from "next/font/google";
import SliderComp from "@/components/home/SliderComp";
import BasicService from "@/components/home/BasicService";
import dynamic from "next/dynamic";
import HeadComp from "@/components/shared/HeadComp";
import CategoriesList from "@/components/home/CategoriesList";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import LatestProducts from "@/components/home/LatestProducts";
import ShopByCategory from "@/components/home/ShopByCategory";
import ProductByCategory from "@/components/home/ProductByCategory";


export default function Home() {
  return (
    <>
      <HeadComp />
      <div id="home">
        <div className="">
          <SliderComp />

          <BasicService />


          <FeaturedProduct />
          <LatestProducts />

          <ShopByCategory />

          <ProductByCategory />

        </div>
      </div>
    </>
  );
}

