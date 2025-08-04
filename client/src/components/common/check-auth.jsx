import React from "react";
import { useLocation, Navigate } from "react-router-dom";

// now this functin recive some of the props
function CheckAuth({ isAuthenticated, children, user }) {
  const location = useLocation();

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  if (
    isAuthenticated &&
    location.pathname.includes("/admin") &&
    user?.role !== "admin"
  ) {
    return <Navigate to="/unauth-page" />;
  }
  if (
    isAuthenticated &&
    location.pathname.includes("/shop") &&
    user?.role === "admin"
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <>{children}</>;
}
export default CheckAuth;
