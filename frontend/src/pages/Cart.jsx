import { useCart } from "../context/useCart";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-500">Agregá productos desde la tienda</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Carrito</h1>

      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border rounded-lg p-4"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-500 text-sm">
                ${item.price} x {item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-bold">${item.price * item.quantity}</span>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t pt-6 flex justify-between items-center">
        <button onClick={clearCart} className="text-gray-500 hover:underline">
          Vaciar carrito
        </button>

        <div className="text-right">
          <p className="text-xl font-semibold">
            Total: <span className="text-primary">${total}</span>
          </p>

          <button
            className="mt-4 bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded font-bold"
            disabled
          >
            Continuar (Pago próximamente)
          </button>
        </div>
      </div>
    </div>
  );
}
