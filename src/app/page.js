import React from "react";
import Banner from "./componensts/banner";
import Navbar from "./componensts/navbar";
import ShowcaseSection from "./componensts/showcaseSection";
import Whatsappbutton from "./componensts/whatsappbutton";
import Footer from "./componensts/footer";
import ProductSection from "./componensts/product-section";
import HomeMarquees from "./componensts/home-marquees";
import Marquee from "./componensts/marquee";
import CarouselMarquee from "./componensts/carousel-marquee";
import CategoryBox from "./componensts/category-box";
import { Skiper50 } from "./componensts/reviews";
import FAQ from "./componensts/faq";
import ExitIntentPopup from "./componensts/exit-intent-popup";
import { fetchCatagory, fetchProductsbyCategories } from "./actions/products";

export const revalidate = 21600;
async function Page() {
  const stageOne = await fetchProductsbyCategories();
  const categories = await fetchCatagory();

  return (
    <div className="bg-white">
      <Navbar />
      <Banner />
      <CategoryBox category={categories} />
      <ProductSection data={stageOne} />
      <ShowcaseSection />
      <Skiper50 />
      <HomeMarquees />
      <FAQ />
      <Whatsappbutton />
      <Footer />
    </div>
  );
}

export default Page;
