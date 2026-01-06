import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
import ProductsAdmin from "../pages/admin/ProductsAdmin";
import PrivateRoute from "../components/auth/PrivateRoute";
import CategoryDashboard from "../pages/admin/CategoryDashboard";
import FriendsAdmin from "../pages/admin/FriendsAdmin";
import AdvertisementsAdmin from "../pages/admin/AdvertisementsAdmin";

function AppContent() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('cart');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
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

        <Route
          path="/admin/products"
          element={
            <PrivateRoute>
              <ProductsAdmin />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/category/:category"
          element={
            <PrivateRoute>
              <CategoryDashboard />
            </PrivateRoute>
          }
        />
         <Route
  path="/admin/friends"
  element={
    <PrivateRoute>
      <FriendsAdmin />
    </PrivateRoute>
  }
        />
        <Route
  path="/admin/advertisements"
  element={
    <PrivateRoute>
      <AdvertisementsAdmin />
    </PrivateRoute>
  }
/>
      </Routes>
     
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}