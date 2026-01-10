import { Link } from "react-router-dom";
import { ShoppingBag, Calendar } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function FeaturedProductsCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const progressBarRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products?destacado=true`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos destacados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Auto-scroll infinito más rápido
  useEffect(() => {
    if (isPaused || products.length === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 2;
        
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
        
        const maxScroll = scrollRef.current.scrollWidth / 2;
        setScrollProgress((scrollRef.current.scrollLeft % maxScroll) / maxScroll);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused, products]);

  // Arrastrar barra
  const handleBarInteraction = (e) => {
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const barRect = progressBarRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - barRect.left) / barRect.width));
    scrollRef.current.scrollLeft = percentage * (scrollRef.current.scrollWidth / 2);
    setScrollProgress(percentage);
  };

  if (loading) {
    return (
      <section className="mt-24 mb-24">
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
          Productos destacados
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Aprovechá las ofertas que tenemos
        </p>
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando productos destacados...</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="mt-24 mb-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
          Productos destacados
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Aprovechá las ofertas que tenemos
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide pb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-6">
            {[...products, ...products].map((product, index) => (
              <Link
                key={`${product._id}-${index}`}
                to={`/product/${product._id}`}
                className="min-w-[280px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 flex-shrink-0 flex flex-col"
              >
                {/* Imagen con altura fija */}
                <div className="h-[280px] bg-gray-100 rounded-t-2xl overflow-hidden flex items-center justify-center p-4">
                  {product.images?.[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <ShoppingBag className="w-16 h-16 text-gray-300" />
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="font-semibold text-gray-800 text-lg line-clamp-2 mb-2">{product.name}</h4>
                  <p className="text-primary font-bold text-xl mt-auto">${product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div 
            ref={progressBarRef}
            className="relative h-3 bg-gray-200 rounded-full cursor-pointer"
            onMouseDown={(e) => { setIsPaused(true); handleBarInteraction(e); }}
            onMouseMove={(e) => e.buttons === 1 && handleBarInteraction(e)}
            onMouseUp={() => setTimeout(() => setIsPaused(false), 1000)}
            onTouchStart={handleBarInteraction}
            onTouchMove={handleBarInteraction}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 1000)}
          >
            <div 
              className="absolute h-full bg-primary rounded-full transition-all duration-200"
              style={{ width: '15%', left: `${scrollProgress * 85}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
        <Link to="/shop" className="group relative bg-primary hover:bg-primaryDark text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <span className="relative z-10 flex items-center justify-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Explorar productos
          </span>
        </Link>
        <Link to="/turns" className="group bg-white border-3 border-primary text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
          <Calendar className="w-5 h-5" />
          Reservar turno
        </Link>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}