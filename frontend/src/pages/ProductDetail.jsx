import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

import { useState } from "react";
import { Link } from "react-router-dom";


const mockProducts = [
  {
    id: 1,
    name: "Alimento Premium Perro",
    price: 12000,
    description:
      "Alimento balanceado premium para perros adultos. Mejora la digestión y el pelaje.",
  },
  {
    id: 2,
    name: "Alimento Gato Adulto",
    price: 9800,
    description:
      "Fórmula completa para gatos adultos. Rico en proteínas y taurina.",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      </div>
    );
  }

 const handleAdd = () => {
  addToCart(product, quantity);
};



  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
      {/* Galería */}
      <div className="bg-gray-100 h-96 flex items-center justify-center rounded">
        <span className="text-gray-400">Galería</span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>

        <span className="text-3xl font-bold text-primary">
          ${product.price}
        </span>

        <p className="text-gray-600">{product.description}</p>

        {/* Cantidad */}
        <div className="flex items-center gap-4">
          <span className="font-semibold">Cantidad</span>

          <div className="flex items-center border rounded">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 text-xl"
            >
              −
            </button>

            <span className="px-4">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 text-xl"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAdd}
            className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded font-bold"
          >
            Agregar al carrito
          </button>

          <Link
            to="/cart"
            className="border border-primary text-primary px-6 py-3 rounded font-bold hover:bg-primary hover:text-white transition"
          >
            Ver carrito
          </Link>
          <Link
            to="/shop"
            className="mt-4 inline-block text-gray-500 hover:underline"
          >
            ← Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
