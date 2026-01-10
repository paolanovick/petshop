import { Link } from "react-router-dom";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function CategoryCarousel({ category, products, hideHeader = false, isSubcategory = false }) {
  const scrollRef = useRef(null);

  // Autoplay - MÁS LENTO
  useEffect(() => {
    if (!scrollRef.current || !products || products.length === 0) return;

    const scrollContainer = scrollRef.current;
    const isMobile = window.innerWidth < 768;
    
    // ARREGLO: Intervalos más lentos - 3s en móvil, 4s en desktop
    const interval = isMobile ? 3000 : 4000;

    const autoScroll = setInterval(() => {
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const currentScroll = scrollContainer.scrollLeft;

      if (currentScroll >= maxScroll - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // ARREGLO: Scroll más pequeño - 200px en vez de 300px
        scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }, interval);

    const handleMouseEnter = () => clearInterval(autoScroll);
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      clearInterval(autoScroll);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <span className="text-6xl mb-4 block">{category.icon}</span>
        <h3 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
          {category.name}
        </h3>
        <p className="text-gray-500">No hay productos disponibles en esta categoría</p>
      </div>
    );
  }

  return (
    <div id={category.id} className="bg-white rounded-2xl p-8 shadow-sm">
      {!hideHeader && (
        <div className="mb-6">
          {isSubcategory ? (
            <div className="inline-flex items-center gap-3">
              <span className="text-4xl">{category.icon}</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize">
                {category.name}
              </h3>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-full">
                {products.length} {products.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          ) : (
            <Link 
              to={`/shop?category=${category.id}`}
              className="inline-flex items-center gap-3 group hover:opacity-80 transition"
            >
              <span className="text-4xl">{category.icon}</span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize group-hover:text-primary transition">
                  {category.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 sm:mt-0">
                  <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition" />
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-full">
                    {products.length} {products.length === 1 ? 'producto' : 'productos'}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      )}

      <div 
        ref={scrollRef}
        className="relative overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-6 pb-4">
          {products.map((product) => {
            const sinStock = product.stock === 0;
            
            return (
              <div
                key={product._id}
                className={`min-w-[280px] max-w-[280px] rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group flex-shrink-0 border flex flex-col ${
                  sinStock 
                    ? 'bg-gray-100 border-gray-200 opacity-75' 
                    : 'bg-white border-gray-100'
                }`}
              >
                <Link to={`/product/${product._id}`} className="block relative">
                  {/* Badge Destacado */}
                  {product.destacado && !sinStock && (
                    <div className="absolute top-0 left-0 z-10 overflow-hidden w-32 h-32 pointer-events-none">
                      <div className="absolute top-6 -left-8 bg-red-600 text-white text-xs font-bold py-1 px-12 rotate-[-45deg] shadow-lg text-center uppercase">
                        Destacado
                      </div>
                    </div>
                  )}

                  {/* Badge Sin Stock */}
                  {sinStock && (
                    <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
                      Sin stock
                    </div>
                  )}
                  
                  {/* Imagen con altura fija de 280px */}
                  <div className={`h-[280px] flex items-center justify-center overflow-hidden p-4 ${
                    sinStock ? 'bg-gray-200' : 'bg-gray-50'
                  }`}>
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className={`max-w-full max-h-full object-contain transition duration-300 ${
                          sinStock ? 'grayscale opacity-50' : 'group-hover:scale-110'
                        }`}
                        loading="lazy"
                      />
                    ) : (
                      <ShoppingBag className={`w-12 h-12 ${sinStock ? 'text-gray-400' : 'text-gray-300'}`} />
                    )}
                  </div>
                </Link>

                <div className="p-5 bg-white">
                  <h4 className={`font-bold mb-2 h-12 overflow-hidden line-clamp-2 ${
                    sinStock ? 'text-gray-500' : 'text-gray-800'
                  }`}>
                    {product.name}
                  </h4>
                  
                  <p className={`text-sm mb-3 h-10 overflow-hidden line-clamp-2 ${
                    sinStock ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {product.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className={`font-bold text-2xl ${
                      sinStock ? 'text-gray-400' : 'text-primary'
                    }`}>
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  {sinStock ? (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-2.5 px-4 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2 mb-3"
                    >
                      <span>Sin stock</span>
                    </button>
                  ) : (
                    <Link
                      to={`/product/${product._id}`}
                      className="w-full bg-primary hover:bg-primaryDark text-white py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mb-3"
                    >
                      <span>Ver detalles</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}