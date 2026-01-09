import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = React.lazy(() => import("../pages/public/Home"));
const AboutUs = React.lazy(() => import("../pages/public/aboutus"));
const Contact = React.lazy(() => import("../pages/public/Contact"));
const Donate = React.lazy(() => import("../pages/public/Donate"));
const Login = React.lazy(() => import("../pages/public/Login"));
const Register = React.lazy(() => import("../pages/public/Register"));

const PublicRoutes = () => {
  return (
    <Suspense fallback={<div>Loading public page...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;