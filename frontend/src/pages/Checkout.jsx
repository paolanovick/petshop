import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Store, Truck } from "lucide-react";

export default function Checkout() {
  const { cart, subtotal } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    deliveryMethod: "delivery", // "delivery" o "pickup"
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600 mb-6">
          No tenés productos en el carrito.
        </p>

        <Link
          to="/shop"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold inline-block transition"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const ENVIO_COSTO = 5000;
  const ENVIO_MINIMO = 30000;

  const shouldShowEnvio = () => {
    return formData.deliveryMethod === "delivery" && subtotal < ENVIO_MINIMO;
  };

  const calculateTotal = () => {
    const envio = shouldShowEnvio() ? ENVIO_COSTO : 0;
    return subtotal + envio;
  };

  const handleCheckout = () => {
    // Validar datos
    if (!formData.name || !formData.phone) {
      alert('Por favor completá tu nombre y teléfono');
      return;
    }

    if (formData.deliveryMethod === "delivery" && !formData.address) {
      alert('Por favor completá tu dirección para el envío');
      return;
    }

    const total = calculateTotal();
    const envio = shouldShowEnvio() ? ENVIO_COSTO : 0;

    // Armar mensaje para WhatsApp
    let mensaje = `🐾 *NUEVA ORDEN - Pet Shop Vagabundo*\n\n`;
    
    mensaje += `👤 *Cliente:*\n`;
    mensaje += `Nombre: ${formData.name}\n`;
    mensaje += `Email: ${formData.email || 'No especificado'}\n`;
    mensaje += `Teléfono: ${formData.phone}\n`;
    
    if (formData.deliveryMethod === "delivery") {
      mensaje += `Dirección: ${formData.address}\n`;
      mensaje += `📦 *Método: Envío a domicilio*\n\n`;
    } else {
      mensaje += `📦 *Método: Retiro en tienda*\n`;
      mensaje += `📍 Pueyrredón 888, R. Mejía\n\n`;
    }
    
    mensaje += `🛒 *Productos:*\n`;
    cart.forEach((item) => {
      mensaje += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    mensaje += `\n💰 *Resumen:*\n`;
    mensaje += `Subtotal: $${subtotal.toLocaleString()}\n`;
    
    if (formData.deliveryMethod === "delivery") {
      if (envio > 0) {
        mensaje += `Envío: $${envio.toLocaleString()}\n`;
      } else {
        mensaje += `Envío: GRATIS (compra mayor a $${ENVIO_MINIMO.toLocaleString()})\n`;
      }
    }
    
    mensaje += `*TOTAL: $${total.toLocaleString()}*\n\n`;
    
    if (formData.deliveryMethod === "pickup") {
      mensaje += `✅ *El pago se realizará en la tienda al retirar*`;
    } else {
      mensaje += `📲 *Por favor enviame el link de Mercado Pago para confirmar el pago*`;
    }

    // Número de WhatsApp (CAMBIAR POR EL TUYO)
    const telefono = '5491161891880';
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    // Limpiar carrito y abrir WhatsApp
    localStorage.removeItem('cart');
    window.location.href = url;
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Finalizar compra</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* FORM */}
        <div className="md:col-span-2 space-y-6">
          {/* Método de entrega */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">¿Cómo querés recibir tu pedido?</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Envío a domicilio */}
              <button
                onClick={() => setFormData({ ...formData, deliveryMethod: "delivery" })}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.deliveryMethod === "delivery"
                    ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <Truck className={`w-8 h-8 mb-3 ${
                  formData.deliveryMethod === "delivery" ? 'text-orange-500' : 'text-gray-400'
                }`} />
                <h3 className="font-bold text-lg mb-2">Envío a domicilio</h3>
                <p className="text-sm text-gray-600">
                  Recibilo en tu casa
                  {subtotal >= ENVIO_MINIMO ? (
                    <span className="block text-green-600 font-semibold mt-1">¡Envío GRATIS!</span>
                  ) : (
                    <span className="block text-gray-500 mt-1">${ENVIO_COSTO.toLocaleString()}</span>
                  )}
                </p>
              </button>

              {/* Retiro en tienda */}
              <button
                onClick={() => setFormData({ ...formData, deliveryMethod: "pickup" })}
                className={`p-6 rounded-xl border-2 transition-all ${
                  formData.deliveryMethod === "pickup"
                    ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <Store className={`w-8 h-8 mb-3 ${
                  formData.deliveryMethod === "pickup" ? 'text-orange-500' : 'text-gray-400'
                }`} />
                <h3 className="font-bold text-lg mb-2">Retiro en tienda</h3>
                <p className="text-sm text-gray-600">
                  Pueyrredón 888, R. Mejía
                  <span className="block text-green-600 font-semibold mt-1">Sin cargo - Pagás en tienda</span>
                </p>
              </button>
            </div>
          </div>

          {/* Datos personales */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Tus datos</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Juan Pérez"
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-orange-500 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="1144691400"
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-orange-500 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (opcional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ejemplo@email.com"
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-orange-500 focus:outline-none transition"
                />
              </div>

              {formData.deliveryMethod === "delivery" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección de envío *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Calle 123, Piso 4, Depto B"
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-orange-500 focus:outline-none transition"
                    required
                  />
                </div>
              )}
            </form>
          </div>

          {/* Botón finalizar */}
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Finalizar compra por WhatsApp
          </button>
        </div>

        {/* RESUMEN */}
        <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-6">
          <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

          <div className="space-y-3 text-sm">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-start">
                <span className="flex-1">
                  {item.name} <span className="text-gray-500">x{item.quantity}</span>
                </span>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toLocaleString()}</span>
            </div>

            {formData.deliveryMethod === "delivery" && (
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                {shouldShowEnvio() ? (
                  <span className="font-semibold">${ENVIO_COSTO.toLocaleString()}</span>
                ) : (
                  <span className="text-green-600 font-semibold">GRATIS</span>
                )}
              </div>
            )}

            {formData.deliveryMethod === "pickup" && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <Store className="w-4 h-4" />
                <span>Retiro en tienda - Pagás allá</span>
              </div>
            )}
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between text-xl font-black">
            <span>Total</span>
            <span className="text-orange-600">${calculateTotal().toLocaleString()}</span>
          </div>

          {formData.deliveryMethod === "delivery" && subtotal < ENVIO_MINIMO && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              💡 Agregá ${(ENVIO_MINIMO - subtotal).toLocaleString()} más para envío gratis
            </div>
          )}
        </div>
      </div>
    </div>
  );
}