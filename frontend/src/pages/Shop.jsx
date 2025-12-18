import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ProductGrid from "../components/shop/ProductGrid";

export default function Shop() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-6">
        {category ? `Categoría: ${category}` : "Tienda"}
      </h1>

      <ProductGrid category={category} />
    </div>
  );
}
