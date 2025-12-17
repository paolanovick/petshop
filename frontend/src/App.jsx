import AppRouter from "./app/AppRouter";
import { CartProvider } from "./context/CartProvider";

function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;
