import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../css/auth.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schema/login.schema";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onLogin = async (data) => {
    try {
      console.log("=== FRONTEND LOGIN ===");
      console.log("Form data:", data);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });

      console.log("Response status:", response.status);
      console.log("Response OK:", response.ok);

      const result = await response.json();
      console.log("Response data:", result);

      if (!response.ok) {
        console.error("Login failed:", result.message);
        alert(result.message || "Login failed");
        return;
      }

      console.log("✅ Token received:", result.token);
      console.log("✅ User data:", result.user);
      
      // Save token and role to localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.user.role); // Store the role
      
      // Verify it was saved
      const savedToken = localStorage.getItem("token");
      console.log("✅ Token saved to localStorage:", savedToken);
      console.log("✅ Tokens match:", savedToken === result.token);

      console.log("=====================");

      // Role-based redirection logic
      if (result.user.role === 'admin') {
        console.log("Redirecting to Admin Dashboard");
        navigate("/admin-dashboard"); // Ensure this route exists in App.jsx
      } else {
        console.log("Redirecting to User Dashboard");
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("❌ Error during login:", err);
      alert(err.message || "Network error");
    }
  };

  return (
    <div className="container">
      <div className="register-card">
        <h2>Login</h2>
        <p className="subtitle">Please enter valid credentials to login</p>

        <form onSubmit={handleSubmit(onLogin)}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              {...register("email")}
              type="text"
              placeholder="john@example.com"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn">Login</button>

          <p className="login-text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;