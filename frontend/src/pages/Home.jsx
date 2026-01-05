import Hero from "../components/home/Hero";
import SponsorsCarousel from "../components/home/SponsorsCarousel";
import FeaturedProductsCarousel from "../components/home/FeaturedProductsCarousel";
import Categories from "../components/home/Categories";
import OurFriends from "../components/home/OurFriends";

export default function Home() {
  return (
    <>
      <Hero />
      <SponsorsCarousel />
      <FeaturedProductsCarousel />
      <Categories />
      <OurFriends />
    </>
  );
}
