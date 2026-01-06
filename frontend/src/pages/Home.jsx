import Hero from "../components/home/Hero";
import SponsorsCarousel from "../components/home/SponsorsCarousel";
import FeaturedProductsCarousel from "../components/home/FeaturedProductsCarousel";
import Categories from "../components/home/Categories";
import OurFriends from "../components/home/OurFriends";
import AdPopup from "../components/home/AdPopup";

export default function Home() {
  return (
    <>
       <AdPopup /> {/* ← AGREGAR */}
      <Hero />
      <SponsorsCarousel />
      <FeaturedProductsCarousel />
      <Categories />
      <OurFriends />
    </>
  );
}
