import { Dog, Cat, Scissors, Bone, ShoppingBag, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeaturedProductsCarousel from "./FeaturedProductsCarousel";
import { useEffect, useState } from "react";

const categories = [
  { id: 1, name: "Perros", icon: Dog, color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50", textColor: "text-blue-600", count: "120+ productos" },
  { id: 2, name: "Gatos", icon: Cat, color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50", textColor: "text-purple-600", count: "85+ productos" },
  { id: 3, name: "Accesorios", icon: ShoppingBag, color: "from-green-500 to-green-600", bgColor: "bg-green-50", textColor: "text-green-600", count: "200+ productos" },
  { id: 4, name: "Alimentos", icon: Bone, color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50", textColor: "text-orange-600", count: "150+ productos" },
  { id: 5, name: "Peluquería", icon: Scissors, color: "from-pink-500 to-pink-600", bgColor: "bg-pink-50", textColor: "text-pink-600", count: "Servicios" },
  { id: 6, name: "Premium", icon: Sparkles, color: "from-red-500 to-red-600", bgColor: "bg-red-50", textColor: "text-red-600", count: "Exclusivos" },
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
    <section className="py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-20">
          <FeaturedProductsCarousel />
        </div>

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
            const isActive = activeIndex === index;

            return (
              <div
                key={category.id}
                onClick={() =>
                  navigate(`/shop?category=${category.name.toLowerCase()}`)
                }
                className={`cursor-pointer group relative bg-white rounded-2xl p-6 shadow-md transition-all duration-300
                  ${isActive ? "shadow-2xl -translate-y-2" : "hover:shadow-2xl hover:-translate-y-2"}
                `}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color}
                  ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                  transition-opacity`}
                />

                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center
                    ${isActive ? "bg-white/20 scale-110" : `${category.bgColor} group-hover:bg-white/20`}
                  `}
                  >
                    <Icon className={`w-8 h-8 ${isActive ? "text-white" : category.textColor}`} />
                  </div>

                  <div>
                    <h3 className={`font-bold ${isActive ? "text-white" : "text-gray-900 group-hover:text-white"}`}>
                      {category.name}
                    </h3>
                    <p className={`text-xs ${isActive ? "text-white/80" : "text-gray-500 group-hover:text-white/80"}`}>
                      {category.count}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
