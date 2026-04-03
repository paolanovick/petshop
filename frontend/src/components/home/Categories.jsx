import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = [
  'from-orange-500 to-orange-600',
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
  'from-pink-500 to-pink-600',
  'from-red-500 to-red-600',
  'from-teal-500 to-teal-600',
  'from-yellow-500 to-yellow-600',
];

// Categoría fija de Turnos (no es una categoría de producto)
const TURNOS = {
  slug: 'turnos',
  name: 'Turnos',
  icon: '✂️',
  description: 'Baño y peluquería',
};

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`);
        const data = await res.json();
        setCategories([...data, TURNOS]);
      } catch {
        console.error('Error al cargar categorías');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [categories]);

  const handleClick = (cat) => {
    if (cat.slug === 'turnos') {
      navigate('/turns');
    } else {
      navigate(`/shop?category=${cat.slug}`);
    }
  };

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
            const isActive = index === activeIndex;
            const color = COLORS[index % COLORS.length];

            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => handleClick(category)}
                className="relative group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-200 hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color}
                    transition-opacity duration-200
                    ${isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-80'}
                  `}
                />
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 group-hover:bg-white/20 flex items-center justify-center transition text-3xl">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-white">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 group-hover:text-white/80">
                      {category.description}
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
