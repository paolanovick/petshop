import AppRouter from "./app/AppRouter";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;