import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import "../../css/auth.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "./schema/resetpassword.schema";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const newPassword = watch("newPassword");

  const onResetPassword = async (data) => {
    if (!token) {
      setApiError("Invalid reset link. Token is missing.");
      return;
    }

    setApiError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setApiError(result.message || "Failed to reset password");
        return;
      }

      // Success: Show message and redirect after brief delay
      setSuccessMessage(
        "✅ Password reset successfully! Redirecting to login..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);
      setApiError(error.message || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if token is missing
  if (!token) {
    return (
      <div className="container">
        <div className="register-card">
          <h2>Invalid Link</h2>
          <p className="subtitle" style={{ color: "#dc2626" }}>
            This password reset link is invalid or expired. Please request a new one.
          </p>
          <button
            className="btn"
            onClick={() => navigate("/forgot-password")}
            style={{ marginTop: "24px" }}
          >
            Request New Reset Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="register-card">
        <h2>Reset Password</h2>
        <p className="subtitle">
          Enter your new password below to complete the reset
        </p>

        {apiError && (
          <div
            className="error-banner"
            style={{
              background: "#fee2e2",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "16px",
              color: "#dc2626",
              border: "1px solid #fecaca",
            }}
          >
            {apiError}
          </div>
        )}

        {successMessage && (
          <div
            className="success-banner"
            style={{
              background: "#dcfce7",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "16px",
              color: "#15803d",
              border: "1px solid #bbf7d0",
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onResetPassword)}>
          {/* New Password Field */}
          <div className="form-group">
            <label>New Password</label>
            <div style={{ position: "relative" }}>
              <input
                {...register("newPassword")}
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
            {errors.newPassword && (
              <p className="error">{errors.newPassword.message}</p>
            )}
            {/* Password Requirements */}
            {newPassword && (
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
                  <li style={{
                    color: newPassword.length >= 8 ? "#15803d" : "#94a3b8",
                    marginBottom: "2px",
                  }}>
                    ✓ At least 8 characters
                  </li>
                  <li style={{
                    color: /[A-Z]/.test(newPassword) ? "#15803d" : "#94a3b8",
                    marginBottom: "2px",
                  }}>
                    ✓ One uppercase letter (A-Z)
                  </li>
                  <li style={{
                    color: /[0-9]/.test(newPassword) ? "#15803d" : "#94a3b8",
                    marginBottom: "2px",
                  }}>
                    ✓ One number (0-9)
                  </li>
                  <li style={{
                    color: /[!@#$%^&*]/.test(newPassword) ? "#15803d" : "#94a3b8",
                  }}>
                    ✓ One special character (!@#$%^&*)
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
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

          <button
            className="btn"
            type="submit"
            disabled={isLoading}
            style={{
              background: isLoading ? "#e2e8f0" : "#1e293b",
            }}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div
          className="login-text"
          style={{ marginTop: "24px", textAlign: "center" }}
        >
          <span style={{ color: "#64748b" }}>
            Already have a new password?
          </span>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "none",
              border: "none",
              color: "#ff6b6b",
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "700",
              marginLeft: "5px",
              borderBottom: "2px solid transparent",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.borderColor = "#ff6b6b")
            }
            onMouseLeave={(e) =>
              (e.target.style.borderColor = "transparent")
            }
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
