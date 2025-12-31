import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../../css/auth.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schema/login.schema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  console.log(errors);
  const onLogin = (data) => {
    console.log(data);
  };

  return (
    <>
      <div class="container">
        <div class="register-card">
          <h2>Login</h2>
          <p class="subtitle">Please Enter Valid Credentials for login</p>

          <form onSubmit={handleSubmit(onLogin)}>
            <div class="form-group">
              <label>Email Address</label>
              <input
                {...register("email")}
                type="text"
                placeholder="john@example.com"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" class="btn">
              Login
            </button>

            <p class="login-text">
              Dont have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
