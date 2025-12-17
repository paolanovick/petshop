import { useCart } from "../../context/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
      <div className="bg-gray-100 h-48 flex items-center justify-center">
        <span className="text-gray-400">Imagen</span>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>

        <span className="text-primary text-xl font-bold">${product.price}</span>

        <button
          onClick={() => addToCart(product)}
          className="mt-2 bg-primary hover:bg-primaryDark text-white py-2 rounded font-semibold"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
