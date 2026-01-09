import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Product = React.lazy(() => import("../pages/private/Product"));
const Feedback = React.lazy(() => import("../pages/private/Feedback"));

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<div>Loading private page...</div>}>
      <Routes>
        <Route path="/" element={<Product />} />  {/* This handles /products */}
        <Route path="/feedback" element={<Feedback />} />  {/* This won't work with current setup */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;