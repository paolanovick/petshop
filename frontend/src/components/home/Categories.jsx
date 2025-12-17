import { Dog, Cat, Scissors, Bone, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
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
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/shop?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    {/* Icon container */}
                    <div
                      className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all group-hover:scale-110 duration-300`}
                    >
                      <Icon
                        className={`w-8 h-8 ${category.textColor} group-hover:text-white transition-colors`}
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors mt-1">
                        {category.count}
                      </p>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl"></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
