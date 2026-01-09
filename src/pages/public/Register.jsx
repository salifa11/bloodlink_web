
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../css/auth.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./schema/register.schema";
import { registerUser } from "../../../utils/api.js";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const onRegister = async (data) => {
    setApiError("");
    setIsLoading(true);

    try {
      const result = await registerUser(data);
      console.log("Registration successful:", result);
      
      // Show success message
      alert("Registration successful! Please login.");
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="register-card">
          <h2>Create Account</h2>
          <p className="subtitle">Please fill in all the details to register</p>

          {apiError && (
            <div className="error-banner" style={{ 
              background: '#fee2e2', 
              padding: '12px', 
              borderRadius: '6px', 
              marginBottom: '16px',
              color: '#dc2626',
              border: '1px solid #fecaca'
            }}>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onRegister)}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                {...register("name")}
                type="text"
                placeholder="John Doe"
                disabled={isLoading}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                {...register("email")}
                type="text"
                placeholder="john@example.com"
                disabled={isLoading}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>

            <p className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;