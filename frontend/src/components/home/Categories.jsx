import {
  Dog,
  Cat,
  Scissors,
  Bone,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeaturedProductsCarousel from "./FeaturedProductsCarousel";

const categories = [
  { id: 1, name: "Perros", icon: Dog },
  { id: 2, name: "Gatos", icon: Cat },
  { id: 3, name: "Accesorios", icon: ShoppingBag },
  { id: 4, name: "Alimentos", icon: Bone },
  { id: 5, name: "Peluquería", icon: Scissors },
  { id: 6, name: "Premium", icon: Sparkles },
];

export default function Categories() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/shop?category=${category.toLowerCase()}`);
    // pequeño delay para que cargue la página
    setTimeout(() => {
      const el = document.getElementById("products-grid");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Carrusel destacado */}
        <div className="mb-16">
          <FeaturedProductsCarousel />
        </div>

        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-3">
            Explorá por categoría
          </h2>
          <p className="text-gray-600">
            Todo lo que tu mascota necesita, organizado
          </p>
        </div>

        {/* Categorías */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => handleClick(cat.name)}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                <span className="font-semibold text-gray-800">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
