import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error al cargar producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Link to="/shop" className="text-orange-600 hover:underline mt-4 inline-block">
          ← Volver a la tienda
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a la tienda
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Imagen */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <span className="text-3xl font-bold text-orange-600">
            ${product.price}
          </span>

          <p className="text-gray-600">{product.description}</p>

          <div className="text-sm text-gray-500">
            <p>Categoría: <span className="capitalize font-semibold">{product.category}</span></p>
            <p className="mt-1">Stock disponible: <span className="font-semibold">{product.stock}</span></p>
          </div>

          {/* Cantidad */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Cantidad</span>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 hover:bg-gray-100 transition"
              >
                −
              </button>

              <span className="px-6 py-2 font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-2 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAdd}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5" />
              {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>

            <Link
              to="/cart"
              className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-bold hover:bg-orange-500 hover:text-white transition"
            >
              Ver carrito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}