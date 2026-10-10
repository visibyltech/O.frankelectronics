import BrandsRow from "./components/BrandsRow";
import CategoriesSection from "./components/CategoriesSection";
import Hero from "./components/Hero";
import ProductRail from "./components/ProductRail";
import TrustSection from "./components/TrustSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <BrandsRow />
      <ProductRail heading="New arrivals" query="sort=newest&limit=8" href="/shop" />
      <ProductRail
        heading="Hot deals"
        subtitle="Marked-down prices on selected products."
        query="onSale=true&limit=4"
        href="/shop"
      />
      <TrustSection />
    </>
  );
}
