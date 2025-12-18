import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ProductGrid from "../components/shop/ProductGrid";
import CategoryChips from "../components/shop/CategoryChips";

export default function Shop() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  useEffect(() => {
    // Siempre que cambia la categoría, subimos arriba
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">
          {category ? `Categoría: ${category}` : "Tienda"}
        </h1>

        {category && (
          <p className="text-gray-500">
            Mostrando productos para <strong>{category}</strong>
          </p>
        )}
      </div>

      {/* Chips de categorías */}
      <CategoryChips />

      {/* ⬇️⬇️⬇️ ESTE ES EL CAMBIO IMPORTANTE ⬇️⬇️⬇️ */}
      <div id="products-grid">
        <ProductGrid category={category} />
      </div>
      {/* ⬆️⬆️⬆️ FIN DEL CAMBIO ⬆️⬆️⬆️ */}
    </div>
  );
}
