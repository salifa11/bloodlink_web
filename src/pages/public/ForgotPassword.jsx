import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../css/auth.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "./schema/forgotpassword.schema";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onForgotPassword = async (data) => {
    setApiError("");
    setSuccessMessage("");
    setResetUrl("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setApiError(result.message || "Failed to process forgot password request");
        return;
      }

      // Success: Show reset URL (for development) and success message
      setResetUrl(result.resetUrl);
      setSuccessMessage(
        "✅ Password reset link generated successfully! Check your email or click the link below."
      );
    } catch (error) {
      console.error("Forgot password error:", error);
      setApiError(error.message || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="register-card">
        <h2>Forgot Password?</h2>
        <p className="subtitle">
          Enter your email address and we'll send you a link to reset your password
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

        {resetUrl && (
          <div
            style={{
              background: "#f0f9ff",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "16px",
              border: "1px solid #bfdbfe",
            }}
          >
            <p style={{ fontSize: "12px", color: "#1e40af", marginBottom: "8px" }}>
              <strong>Development Note:</strong> Copy the link below or click to reset:
            </p>
            <a
              href={resetUrl}
              style={{
                color: "#ff6b6b",
                fontSize: "13px",
                wordBreak: "break-all",
                textDecoration: "none",
                fontWeight: "600",
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/reset-password?token=${resetUrl.split("token=")[1]}`);
              }}
            >
              {resetUrl}
            </a>
          </div>
        )}

        <form onSubmit={handleSubmit(onForgotPassword)}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="error">{errors.email.message}</p>
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
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div
          className="login-text"
          style={{ marginTop: "24px", textAlign: "center" }}
        >
          <span style={{ color: "#64748b" }}>Remember your password?</span>
          <Link to="/login" style={{ marginLeft: "5px" }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
