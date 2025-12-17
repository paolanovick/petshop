import { useCart } from "../../context/useCart";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
      {/* Imagen + link */}
      <Link to={`/product/${product.id}`}>
        <div className="bg-gray-100 h-48 flex items-center justify-center">
          <span className="text-gray-400">Imagen</span>
        </div>
      </Link>

      <div className="p-4 flex flex-col gap-2">
        {/* Nombre */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:underline">
            {product.name}
          </h3>
        </Link>

        {/* Precio */}
        <span className="text-primary text-xl font-bold">${product.price}</span>

        {/* Botón */}
        <button
          onClick={() => addToCart({ ...product, quantity: 1 })}
          className="mt-2 bg-primary hover:bg-primaryDark text-white py-2 rounded font-semibold"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
