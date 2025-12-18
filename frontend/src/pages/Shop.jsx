import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/shop/ProductGrid";

export default function Shop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Tienda</h1>
      <ProductGrid />
    </div>
  );
}
