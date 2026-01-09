import "./App.css";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoutes from "./routes/privateRoute.jsx";
import PublicRoutes from "./routes/publicRoute.jsx";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes - accessible to everyone */}
        <Route path="/*" element={<PublicRoutes />} />
        
        {/* Private routes - need wildcard for nested routes */}
        <Route 
          path="/products/*" 
          element={token ? <PrivateRoutes /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/feedback/*" 
          element={token ? <PrivateRoutes /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </Suspense>
  );
}

export default App;