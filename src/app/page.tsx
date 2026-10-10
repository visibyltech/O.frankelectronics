import BrandsRow from "./components/BrandsRow";
import CategoriesSection from "./components/CategoriesSection";
import Hero from "./components/Hero";
import ProductRail from "./components/ProductRail";
import Promotions from "./components/Promotions";
import TrustSection from "./components/TrustSection";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandsRow />
      <CategoriesSection />
      <Promotions />
      <ProductRail heading="New arrivals" query="sort=newest&limit=8" href="/shop" />
      <TrustSection />
    </>
  );
}
