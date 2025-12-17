import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Hero />
      <Categories />
    </div>
  );
}
