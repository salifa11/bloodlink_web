import "./App.css";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./routes/privateRoute.jsx";
import PublicRoutes from "./routes/publicRoute.jsx";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Private routes mounted at /dashboard */}
        <Route path="/dashboard/*" element={<PrivateRoutes />} />
      </Routes>
    </Suspense>
  );
}

export default App;