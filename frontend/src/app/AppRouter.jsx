import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Turns from "../pages/Turns";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/turns" element={<Turns />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
