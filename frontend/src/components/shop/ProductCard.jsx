import { useCart } from "../../context/useCart";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setShowQuickView(true)}
      onMouseLeave={() => setShowQuickView(false)}
    >
      {/* Badge de oferta */}
      {product.discount && (
        <div className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          -{product.discount}%
        </div>
      )}

      {/* Like button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <Heart
          className={`w-5 h-5 transition-all ${
            isLiked ? "fill-primary text-primary" : "text-gray-400"
          }`}
        />
      </button>

      {/* Image container */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
          {/* Placeholder con patrón */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <pattern
                id="paw-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10 5c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm-3 3c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zm6 0c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2zM10 9c2 0 3 1 3 3 0 1-1 2-2 2H9c-1 0-2-1-2-2 0-2 1-3 3-3z"
                  fill="currentColor"
                />
              </pattern>
              <rect width="100" height="100" fill="url(#paw-pattern)" />
            </svg>
          </div>

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-center text-gray-300">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <span className="text-sm font-medium">Imagen próximamente</span>
            </div>
          )}

          {/* Quick view overlay */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity duration-300 ${
              showQuickView ? "opacity-100" : "opacity-0"
            }`}
          >
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-lg">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category tag */}
        {product.category && (
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
            {product.category}
          </span>
        )}

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-800 text-lg group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < (product.rating || 4)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">
            ({product.reviews || "24"})
          </span>
        </div>

        {/* Price and button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through block">
                ${product.oldPrice}
              </span>
            )}
            <span className="text-2xl font-black text-primary">
              ${product.price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primaryDark text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>

        {/* Stock indicator */}
        {product.stock && (
          <div className="flex items-center gap-2 text-xs">
            <div
              className={`w-2 h-2 rounded-full ${
                product.stock > 10 ? "bg-green-500" : "bg-yellow-500"
              }`}
            ></div>
            <span className="text-gray-500">
              {product.stock > 10
                ? "En stock"
                : `Solo ${product.stock} disponibles`}
            </span>
          </div>
        )}
      </div>

      {/* Hover shadow effect */}
      <div className="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
}
