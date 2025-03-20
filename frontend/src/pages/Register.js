import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [register, { loading, error }] = useMutation(REGISTER_USER);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const handleThemeChange = () => {
      setDarkMode(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: { ...formData } });

      if (data?.register?.token) {
        console.log("✅ Registration successful, calling AuthContext login()");
        
        authLogin(data.register.token, () => navigate("/dashboard")); 
      } else {
        console.error("❌ Registration failed, no token received");
      }
    } catch (err) {
      console.error("❌ Registration Error:", err.message);
    }
  };

  return (
    <div className={`register-container ${darkMode ? "dark" : "light"}`}>
      <h1>🚀 Get Better 1% Every Day</h1>
      <p>Sign up and start improving today!</p>
      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
        </form>
        {error && <p className="error-message">{error.message}</p>}
        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Register;