import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import PrivateRoutes from "./routes/privateRoute.jsx";
import PublicRoutes from "./routes/publicRoute.jsx";
import AdminDashboard from "./pages/private/AdminDashboard.jsx";
import AdminEventForm from "./pages/private/AdminEventForm.jsx";
import AdminDonors from "./pages/private/AdminDonors.jsx";
import EventDetails from "./pages/private/EventDetails.jsx";
import AdminEventApps from "./pages/private/AdminEventApps.jsx";
import BloodBankList from "./pages/private/Bloodbanklist.jsx";

function App() {
  // Read role dynamically during render via RequireAdmin wrapper below
  const RequireAdmin = ({ children }) => {
    const userRole = localStorage.getItem("role");
    return userRole === "admin" ? children : <Navigate to="/dashboard" />;
  };

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
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin-event-form"
          element={
            <RequireAdmin>
              <AdminEventForm />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin-donors"
          element={
            <RequireAdmin>
              <AdminDonors />
            </RequireAdmin>
          }
        />

        <Route path="/event/:id" element={<EventDetails />} />

        <Route
          path="/admin-event-applications"
          element={
            <RequireAdmin>
              <AdminEventApps />
            </RequireAdmin>
          }
        />

        // Inside App.jsx routes
        <Route path="/blood-banks" element={<BloodBankList />} />

        {/* Public routes (Login, Register, Landing) */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Suspense>
  );
}

export default App;