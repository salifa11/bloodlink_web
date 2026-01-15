import "./App.css";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoutes from "./routes/privateRoute.jsx";
import PublicRoutes from "./routes/publicRoute.jsx";
import AdminDashboard from "./pages/private/AdminDashboard.jsx"; // Ensure this import exists
import AdminEventForm from "./pages/private/AdminEventForm.jsx";

function App() {
  const userRole = localStorage.getItem("role");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Private routes */}
        <Route path="/dashboard" element={<PrivateRoutes />} />
        <Route path="/profile" element={<PrivateRoutes />} />
        <Route path="/feedback" element={<PrivateRoutes />} />
        <Route path="/donate-blood" element={<PrivateRoutes />} />
        
        {/* Admin Specific Route */}
        <Route 
          path="/admin-dashboard" 
          element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/admin-event-form" 
          element={userRole === "admin" ? <AdminEventForm /> : <Navigate to="/dashboard" />} 
        />

        {/* Public routes - catch everything else */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Suspense>
  );
}

export default App;