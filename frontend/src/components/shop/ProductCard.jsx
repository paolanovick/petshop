import { useState, useId } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useCart } from "../../context/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const patternId = useId(); // evita IDs duplicados

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Discount badge */}
      {product.discount && (
        <div className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
          -{product.discount}%
        </div>
      )}

      {/* Like */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow"
      >
        <Heart
          className={`w-5 h-5 ${
            isLiked ? "fill-primary text-primary" : "text-gray-400"
          }`}
        />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-gray-50 relative overflow-hidden flex items-center justify-center">
          {/* Placeholder pattern */}
          <svg className="absolute inset-0 opacity-5">
            <defs>
              <pattern
                id={patternId}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10 5c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <ShoppingCart className="w-12 h-12 mb-2" />
              <span className="text-sm">Imagen próximamente</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3">
        {product.category && (
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
            {product.category}
          </span>
        )}

        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-800 text-lg line-clamp-2 hover:text-primary transition">
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
            ({product.reviews || 24})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-2xl font-black text-primary">
            ${product.price}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition hover:scale-105"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
