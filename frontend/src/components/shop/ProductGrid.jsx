import { useCart } from "../../context/useCart";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">

      {/* IMAGE + LINK */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <ShoppingCart className="w-12 h-12 mb-2" />
              <span className="text-sm">Imagen próximamente</span>
            </div>
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4 space-y-3">

        {/* LIKE */}
        <div className="flex justify-end">
          <button
            onClick={handleLike}
            className="text-gray-400 hover:text-primary"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-primary text-primary" : ""
              }`}
            />
          </button>
        </div>

        {/* NAME */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-800 hover:text-primary transition">
            {product.name}
          </h3>
        </Link>

        {/* RATING */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* PRICE + CTA */}
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xl font-black text-primary">
            ${product.price}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
