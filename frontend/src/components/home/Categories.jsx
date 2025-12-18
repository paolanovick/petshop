import { Dog, Cat, Scissors, Bone, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturedProductsCarousel from "./FeaturedProductsCarousel";
import { useEffect, useState } from "react";

const categories = [
  {
    id: 1,
    name: "Perros",
    icon: Dog,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    count: "120+ productos",
  },
  {
    id: 2,
    name: "Gatos",
    icon: Cat,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    count: "85+ productos",
  },
  {
    id: 3,
    name: "Accesorios",
    icon: ShoppingBag,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    count: "200+ productos",
  },
  {
    id: 4,
    name: "Alimentos",
    icon: Bone,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    count: "150+ productos",
  },
  {
    id: 5,
    name: "Peluquería",
    icon: Scissors,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
    count: "Servicios",
  },
  {
    id: 6,
    name: "Premium",
    icon: Sparkles,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    count: "Exclusivos",
  },
];

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Featured products */}
        <div className="mb-24">
          <FeaturedProductsCarousel />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full text-red-600 font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Explora por categoría</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Todo lo que tu mascota necesita
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra productos y servicios de calidad premium organizados por
            categorías
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = activeIndex === index;

            return (
              <Link
                key={category.id}
                to={`/shop?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div
                  className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-md transition-all duration-300
                    ${
                      isActive
                        ? "shadow-2xl -translate-y-2"
                        : "hover:shadow-2xl hover:-translate-y-2"
                    }`}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      category.color
                    }
                      transition-opacity duration-500
                      ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                        ${
                          isActive
                            ? "bg-white/20 scale-110"
                            : `${category.bgColor} group-hover:bg-white/20 group-hover:scale-110`
                        }`}
                    >
                      <Icon
                        className={`w-8 h-8 transition-colors duration-300
                          ${
                            isActive
                              ? "text-white"
                              : `${category.textColor} group-hover:text-white`
                          }`}
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <h3
                        className={`font-bold transition-colors duration-300
                          ${
                            isActive
                              ? "text-white"
                              : "text-gray-900 group-hover:text-white"
                          }`}
                      >
                        {category.name}
                      </h3>

                      <p
                        className={`text-xs mt-1 transition-colors duration-300
                          ${
                            isActive
                              ? "text-white/80"
                              : "text-gray-500 group-hover:text-white/80"
                          }`}
                      >
                        {category.count}
                      </p>
                    </div>
                  </div>

                  {/* Decorative blobs */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-xl" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full blur-xl" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
