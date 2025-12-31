import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";

const Login = React.lazy(() => import("./pages/public/Login"));
const Register = React.lazy(() => import("./pages/public/Register"));

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
