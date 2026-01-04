import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Turns from "../pages/Turns";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import ScrollToTop from "../components/ScrollToTop";
import Login from "../pages/Login";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import AppointmentsAdmin from "../pages/admin/AppointmentsAdmin";
import PrivateRoute from "../components/auth/PrivateRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Rutas públicas con Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/turns" element={<Turns />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* Login sin Layout */}
        <Route path="/login" element={<Login />} />

        {/* Rutas admin protegidas sin Layout */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/appointments"
          element={
            <PrivateRoute>
              <AppointmentsAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}