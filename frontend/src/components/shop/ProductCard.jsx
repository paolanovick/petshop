import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="group cursor-pointer relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Like */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow"
      >
        <Heart className={isLiked ? "fill-primary text-primary" : "text-gray-400"} />
      </button>

      {/* Image */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <ShoppingCart className="w-12 h-12 text-gray-300" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-gray-800">{product.name}</h3>
        <span className="text-xl font-black text-primary">${product.price.toLocaleString()}</span>

        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-primaryDark transition"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}