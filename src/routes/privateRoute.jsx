
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Dashboard = React.lazy(() => import("../pages/private/Dashboard.jsx"));
const Product = React.lazy(() => import("../pages/private/Product.jsx"));
const Feedback = React.lazy(() => import("../pages/private/Feedback.jsx"));

const PrivateRoutes = () => {
  // Check if token exists
  const token = localStorage.getItem('token');
  
  console.log("=== PRIVATE ROUTES CHECK ===");
  console.log("Token from localStorage:", token);
  console.log("Token exists:", !!token);
  console.log("==========================");

  // If no token, redirect to login
  if (!token) {
    console.log(" No token - Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("Token found - Allowing access");

  // If token exists, show the routes
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="product" element={<Product />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;