import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext); 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { loading, error }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { ...formData } });

      if (data?.login?.token) {
        console.log("✅ Login successful, calling AuthContext login()");
        
        authLogin(data.login.token, () => navigate("/dashboard")); 
      } else {
        console.error("❌ Login failed, no token received");
      }
    } catch (err) {
      console.error("❌ Login Error:", err.message);
    }
  };

  return (
    <div className="login-container">
      <h1>🚀 Welcome Back!</h1>
      <p>Log in to continue your journey.</p>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Log In"}</button>
        </form>
        {error && <p className="error-message">{error.message}</p>}
        <p className="signup-link">
          Don't have an account? <span onClick={() => navigate("/register")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;