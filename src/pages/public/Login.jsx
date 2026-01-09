import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // added useNavigate
import "../../css/auth.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schema/login.schema";
import { apiCall } from "../../../utils/api";


const Login = () => {
  const navigate = useNavigate(); // for redirect after login

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onLogin = async (data) => {
    try {
      // Call backend login API
      const res = await apiCall("post", "/auth/login", { data });

      // Save JWT token
      localStorage.setItem("token", res.token);

      // Optionally redirect to dashboard/home
      navigate("/dashboard");
    } catch (err) {
      alert(err); // show error from backend
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
