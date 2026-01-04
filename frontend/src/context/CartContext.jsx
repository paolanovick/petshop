/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id);

      if (existing) {
        showToast(`Cantidad de ${product.name} actualizada`, 'success');
        return prev.map((p) =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }
      
      showToast(`${product.name} agregado al carrito`, 'success');
      return [...prev, { ...product, quantity }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
    showToast('Cantidad actualizada', 'success');
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p._id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
    showToast('Cantidad actualizada', 'success');
  };

  const removeFromCart = (id) => {
    const product = cart.find((p) => p._id === id);
    setCart((prev) => prev.filter((p) => p._id !== id));
    showToast(`${product?.name || 'Producto'} eliminado del carrito`, 'info');
  };

  const clearCart = () => {
    setCart([]);
    showToast('Carrito vaciado', 'info');
  };

  const subtotal = cart.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  const totalItems = cart.reduce(
    (acc, p) => acc + p.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}