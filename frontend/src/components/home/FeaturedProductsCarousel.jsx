import { Link } from "react-router-dom";
import { ShoppingBag, Calendar } from "lucide-react";


const featuredProducts = [
  {
    id: 1,
    name: "Alimento Premium Perro",
    price: 12500,
    image: "/products/dog-food.jpg",
  },
  {
    id: 2,
    name: "Juguete Interactivo",
    price: 4200,
    image: "/products/toy.jpg",
  },
  {
    id: 3,
    name: "Cama Confort Gato",
    price: 18900,
    image: "/products/cat-bed.jpg",
  },
  {
    id: 4,
    name: "Correa Reforzada",
    price: 7600,
    image: "/products/leash.jpg",
  },
  {
    id: 5,
    name: "Shampoo Canino",
    price: 5300,
    image: "/products/shampoo.jpg",
  },
];

export default function FeaturedProductsCarousel() {
  return (
    <section className="mt-24 mb-24">
      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
        Productos destacados
      </h3>

      <div className="relative overflow-hidden mb-16">
        <div className="flex gap-6 animate-scroll">
          {[...featuredProducts, ...featuredProducts].map((product, index) => (
            <Link
              key={index}
              to={`/product/${product.id}`}
              className="min-w-[260px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Imagen</span>
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
