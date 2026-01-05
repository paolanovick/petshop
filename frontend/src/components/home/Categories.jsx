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
import { useEffect, useState } from "react";

const categories = [
  { id: 1, name: "Alimentos", icon: Bone, color: "from-orange-500 to-orange-600", count: "Para perros y gatos" },
  { id: 2, name: "Accesorios", icon: ShoppingBag, color: "from-blue-500 to-blue-600", count: "Collares, correas..." },
  { id: 3, name: "Juguetes", icon: Dog, color: "from-purple-500 to-purple-600", count: "Diversión garantizada" },
  { id: 4, name: "Higiene", icon: Sparkles, color: "from-green-500 to-green-600", count: "Limpieza y cuidado" },
  { id: 5, name: "Otros", icon: Cat, color: "from-pink-500 to-pink-600", count: "Más productos" },
  { id: 6, name: "Turnos", icon: Scissors, color: "from-red-500 to-red-600", count: "Baño y peluquería" },
];

export default function Categories() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">

      

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full text-red-600 font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Explora por categoría
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Todo lo que tu mascota necesita
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Productos y servicios organizados para encontrar todo más rápido
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = index === activeIndex;

            return (
              <button
                key={category.id}
                type="button"
              onClick={() => {
  if (category.id === 6) {
    navigate('/turns');
  } else {
    navigate(`/shop?category=${category.name.toLowerCase()}`);
  }
}}
                className="relative group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-200 hover:-translate-y-2"
              >
                {/* GRADIENT – SUAVE */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color}
                    transition-opacity duration-200
                    ${isActive ? "opacity-60" : "opacity-0 group-hover:opacity-80"}
                  `}
                />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 group-hover:bg-white/20 flex items-center justify-center transition">
                    <Icon className="w-8 h-8 text-gray-700 group-hover:text-white" />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-white">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 group-hover:text-white/80">
                      {category.count}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
