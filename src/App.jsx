// import "./App.css";
// import { Suspense } from "react";
// import { Routes, Route } from "react-router-dom";

// import PrivateRoutes from "./routes/privateRoute.jsx";
// import PublicRoutes from "./routes/publicRoute.jsx";


// function App() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/*" element={<PublicRoutes />} />

//         {/* Private routes mounted at /dashboard */}
//         <Route path="/dashboard/*" element={<PrivateRoutes />} />
//         <Route path ="/profile/*" element={<PrivateRoutes />} />'
//       </Routes>
//     </Suspense>
//   );
// }

// export default App;


import "./App.css";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoutes from "./routes/privateRoute.jsx";
import PublicRoutes from "./routes/publicRoute.jsx";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Private routes - defined first with specific paths */}
        <Route path="/dashboard" element={<PrivateRoutes />} />
        <Route path="/profile" element={<PrivateRoutes />} />
        <Route path="/feedback" element={<PrivateRoutes />} />
        <Route path="/donate-blood" element={<PrivateRoutes />} />
        
        {/* Public routes - catch everything else */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Suspense>
  );
}

export default App;