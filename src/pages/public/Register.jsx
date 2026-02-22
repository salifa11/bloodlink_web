
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });
  const password = watch("password");

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
              <div style={{ position: "relative" }}>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
              {password && (
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "8px",
                    padding: "8px",
                    background: "#f8fafc",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <p style={{ color: "#64748b", marginBottom: "4px" }}>
                    <strong>Password requirements:</strong>
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <li
                      style={{
                        color: password.length >= 8 ? "#15803d" : "#94a3b8",
                        marginBottom: "2px",
                      }}
                    >
                      ✓ At least 8 characters
                    </li>
                    <li
                      style={{
                        color: /[A-Z]/.test(password) ? "#15803d" : "#94a3b8",
                        marginBottom: "2px",
                      }}
                    >
                      ✓ One uppercase letter (A-Z)
                    </li>
                    <li
                      style={{
                        color: /[0-9]/.test(password) ? "#15803d" : "#94a3b8",
                        marginBottom: "2px",
                      }}
                    >
                      ✓ One number (0-9)
                    </li>
                    <li
                      style={{
                        color: /[!@#$%^&*]/.test(password) ? "#15803d" : "#94a3b8",
                      }}
                    >
                      ✓ One special character (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
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