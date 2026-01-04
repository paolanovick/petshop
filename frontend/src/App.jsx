import AppRouter from "./app/AppRouter";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
     <AuthProvider>
      <ToastProvider>  {/* ← PRIMERO ToastProvider */}
        <CartProvider>  {/* ← DESPUÉS CartProvider */}
          <AppRouter />
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;