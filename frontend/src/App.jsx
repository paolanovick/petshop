import AppRouter from "./app/AppRouter";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>  {/* ← AGREGAR */}
          <AppRouter />
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;