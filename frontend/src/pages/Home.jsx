import Hero from "../components/home/Hero";
import SponsorsCarousel from "../components/home/SponsorsCarousel";
import FeaturedProductsCarousel from "../components/home/FeaturedProductsCarousel";
import Categories from "../components/home/Categories";
import OurFriends from "../components/home/OurFriends";
import AdPopup from "../components/home/AdPopup";
import { useSEO } from "../hooks/useSEO";

export default function Home() {
  useSEO({
    title: 'Todo para tu mascota',
    description: 'Pet Shop Vagabundo: alimentos, accesorios, juguetes, higiene y peluquería para perros y gatos. Productos premium con envíos a todo el país.',
    url: '/',
  });

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
