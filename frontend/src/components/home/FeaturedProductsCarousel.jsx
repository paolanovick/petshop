import { Link } from "react-router-dom";
import { ShoppingBag, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export default function FeaturedProductsCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <section className="mt-24 mb-24">
        <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
          Productos destacados
        </h3>
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando productos destacados...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-24 mb-24">
      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
        Productos destacados
      </h3>

     <div className="relative overflow-hidden mb-24 pb-12">

        <div className="flex gap-6 animate-scroll">
          {/* Duplicamos el array para efecto infinito */}
          {[...products, ...products].map((product, index) => (
            <Link
              key={`${product._id}-${index}`}
              to={`/product/${product._id}`}
              className="min-w-[260px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShoppingBag className="w-12 h-12 text-gray-300" />
                )}
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-gray-800">{product.name}</h4>
                <p className="text-primary font-bold mt-2">
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
        <Link
          to="/shop"
          className="group relative bg-primary hover:bg-primaryDark text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Explorar productos
          </span>
        </Link>

        <Link
          to="/turns"
          className="group bg-white border-3 border-primary text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
        >
          <Calendar className="w-5 h-5" />
          Reservar turno
        </Link>
      </div>
    </section>
  );
}