import React, { Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Profile from "../pages/private/Profile.jsx";
import DonateBlood from "../pages/private/DonateBlood.jsx";

const Dashboard = React.lazy(() => import("../pages/private/Dashboard.jsx"));
const Feedback = React.lazy(() => import("../pages/private/Feedback.jsx"));

const PrivateRoutes = () => {
  const location = useLocation();
  
  // Check if token exists
  const token = localStorage.getItem('token');
  
  console.log("=== PRIVATE ROUTES CHECK ===");
  console.log("Current path:", location.pathname);
  console.log("Token from localStorage:", token);
  console.log("Token exists:", !!token);
  console.log("==========================");

  // If no token, redirect to login
  if (!token) {
    console.log("❌ No token - Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("✅ Token found - Allowing access");

  // Route to the correct component based on current path
  const renderComponent = () => {
    switch (location.pathname) {
      case '/dashboard':
        return <Dashboard />;
      case '/profile':
        return <Profile />;
      case '/feedback':
        return <Feedback />;
      case '/donate-blood':
        return <DonateBlood />;  
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <Suspense fallback={<div style={{padding: '20px', fontSize: '18px'}}>Loading...</div>}>
      {renderComponent()}
    </Suspense>
  );
};

export default PrivateRoutes;

