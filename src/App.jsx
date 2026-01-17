import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import PrivateRoutes from "./routes/privateRoute.jsx";
import PublicRoutes from "./routes/publicRoute.jsx";
import AdminDashboard from "./pages/private/AdminDashboard.jsx";
import AdminEventForm from "./pages/private/AdminEventForm.jsx";
import AdminDonors from "./pages/private/AdminDonors.jsx";
import EventDetails from "./pages/private/EventDetails.jsx";

function App() {
  const userRole = localStorage.getItem("role");

  return (
    <Suspense fallback={<div className="loader">Loading BloodLink...</div>}>
      <Routes>
        {/* All Private User Routes point to the PrivateRoutes gatekeeper */}
        <Route path="/dashboard" element={<PrivateRoutes />} />
        <Route path="/profile" element={<PrivateRoutes />} />
        <Route path="/feedback" element={<PrivateRoutes />} />
        <Route path="/donate-blood" element={<PrivateRoutes />} />
        <Route path="/view-events" element={<PrivateRoutes />} />
        
        {/* Admin Specific Routes with Role Protection */}
        <Route 
          path="/admin-dashboard" 
          element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/admin-event-form" 
          element={userRole === "admin" ? <AdminEventForm /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/admin-donors" 
          element={userRole === "admin" ? <AdminDonors /> : <Navigate to="/dashboard" />} 
        />

        <Route path="/event/:id" element={<EventDetails />} />
      

        {/* Public routes (Login, Register, Landing) */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Suspense>
  );
}

export default App;