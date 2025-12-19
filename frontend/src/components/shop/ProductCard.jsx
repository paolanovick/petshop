import { useCart } from "../../context/CartContext";

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    subtotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-500 mt-2">
          Agregá productos y volvé acá para finalizar tu compra
        </p>
        <Link
          to="/shop"
          className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">🛒 Tu carrito</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-5 flex gap-6 hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl"
              />

              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-lg text-gray-800">
                  {item.name}
                </h3>

                <p className="text-primary font-black text-xl">
                  ${item.price}
                </p>

                {/* Controles */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Quitar
                  </button>
                </div>
              </div>

              <div className="font-bold text-xl text-gray-800">
                ${item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-28">
          <h2 className="text-xl font-bold mb-4">Resumen</h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-4">
            <span>Envío</span>
            <span className="font-semibold">A coordinar</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-xl font-black">
            <span>Total</span>
            <span className="text-primary">${subtotal}</span>
          </div>

          <button className="mt-6 w-full bg-primary hover:bg-primaryDark text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition hover:scale-105">
            Continuar compra
          </button>
        </div>
      </div>
    </div>
  );
}
