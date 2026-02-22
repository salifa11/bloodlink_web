import React, { Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Standard Imports
import Profile from "../pages/private/Profile.jsx";
import DonateBlood from "../pages/private/DonateBlood.jsx";
import AdminDonors from "../pages/private/AdminDonors.jsx";
import AdminDashboard from "../pages/private/AdminDashboard.jsx";

// Lazy Loaded Components
const Dashboard = React.lazy(() => import("../pages/private/Dashboard.jsx"));
const Feedback = React.lazy(() => import("../pages/private/Feedback.jsx"));
const ViewEvents = React.lazy(() => import("../pages/private/ViewEvents.jsx"));


const PrivateRoutes = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  // Normalize the path: remove trailing slashes and convert to lowercase
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");

  // Debugging logs to verify token status during navigation
  console.log("=== PRIVATE ROUTE DEBUG ===");
  console.log("Normalized Path:", currentPath);
  console.log("Auth Token Found:", !!token);
  console.log("===========================");

  // If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Component router based on the normalized path
  const renderComponent = () => {
    switch (currentPath) {
      case '/dashboard':
        return <Dashboard />;
      case '/profile':
        return <Profile />;
      case '/feedback':
        return <Feedback />;
      case '/donate-blood':
        return <DonateBlood />; 
      case '/view-events': // This must match your Navbar Link exactly
        return <ViewEvents />; 
      case '/history':
        return <History />;
      case '/admin-donors':
        return <AdminDonors />;    
      case '/admin-dashboard':
        return <AdminDashboard />;  
      default:
        // If path is unknown, stay on dashboard instead of kicking to login
        return <Navigate to="/register" replace />;
    }
  };

  return (
    <Suspense fallback={<div className="admin-loader">Loading Content...</div>}>
      {renderComponent()}
    </Suspense>
  );
};

export default PrivateRoutes;