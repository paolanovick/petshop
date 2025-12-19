import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600 mb-6">
          No tenés productos en el carrito.
        </p>

        <Link
          to="/shop"
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
      {/* FORM */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <p className="text-gray-600 mb-6">
          Completá tus datos para finalizar la compra
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full border rounded-lg p-3"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="w-full border rounded-lg p-3"
          />
          <input
            type="text"
            placeholder="Dirección"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="button"
            className="w-full bg-primary hover:bg-primaryDark text-white py-4 rounded-xl font-bold mt-4"
          >
            Pagar con Mercado Pago (próximamente)
          </button>
        </form>
      </div>

      {/* RESUMEN */}
      <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">Resumen</h2>

        <div className="space-y-2 text-sm text-gray-600">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>
                ${item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 flex justify-between text-xl font-black">
          <span>Total</span>
          <span className="text-primary">${subtotal}</span>
        </div>
      </div>
    </div>
  );
}
