import { useParams } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useState } from "react";

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
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
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
          <label className="font-semibold">Cantidad</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
        </div>

        <button
          onClick={handleAdd}
          className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded font-bold w-fit"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
