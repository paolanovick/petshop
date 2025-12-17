import { useCart } from "../context/useCart";

export default function Checkout() {
  const { totalItems } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <p className="text-gray-600 mb-6">
        Estás a un paso de finalizar tu compra.
      </p>

      <div className="border rounded-lg p-4 mb-6">
        <p className="font-semibold">Productos en carrito: {totalItems}</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 p-4 rounded">
        <p className="text-sm text-yellow-800">
          El pago con Mercado Pago se integrará próximamente.
        </p>
      </div>
    </div>
  );
}
