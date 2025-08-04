import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout.jsx";
import AuthLogin from "./pages/auth/login.jsx";
import AuthRegister from "./pages/auth/register.jsx";
import AdminLayout from "./components/admin-view/layout.jsx";
import AdminProducts from "./pages/admin-view/products.jsx";
import AdminOrders from "./pages/admin-view/order.jsx";
import AdminFeatures from "./pages/admin-view/features.jsx";
import AdminDashboard from "./pages/admin-view/dashbord.jsx";
import ShoppingLayout from "./components/shopping-view/layout.jsx";
import NotFound from "./pages/not-found/index.jsx";
import ShoppingHome from "./pages/shopping-view/home.jsx";
import ShoppingListing from "./pages/shopping-view/listing.jsx";
import ShoppingAccount from "./pages/shopping-view/account.jsx";
import ShoppingCheckout from "./pages/shopping-view/checkout.jsx";
import CheckAuth from "./components/common/check-auth";
import React from "react";
import UnauthPage from "./pages/unauth-page";

function App() {
  const isAuthenticated = false; // Replace with actual authentication logic
  const user = null; // Replace with actual user data
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* <Route path="/" element={<h2>Home Page</h2>} /> */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
        {/* Placeholder for shopping routes */}
      </Routes>
    </div>
  );
}

export default App;
