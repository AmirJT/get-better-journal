import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import Lottie from "lottie-react";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [register, { loading, error }] = useMutation(REGISTER_USER);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  const [signupAnimation, setSignupAnimation] = useState(null);
  const [playSuccessAnim, setPlaySuccessAnim] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      setDarkMode(localStorage.getItem("theme") === "dark");
    };
    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  useEffect(() => {
    fetch("/signup.json")
      .then(res => res.json())
      .then(data => setSignupAnimation(data))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: { ...formData } });

      if (data?.register?.token) {
        setPlaySuccessAnim(true);
        setTimeout(() => {
          authLogin(data.register.token, () => navigate("/dashboard"));
        }, 2500);
      }
    } catch {}
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
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {error && <p className="error-message">{error.message}</p>}

        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Log in</span>
        </p>
      </div>

      {signupAnimation && playSuccessAnim && (
        <div className="signup-success-animation">
          <Lottie animationData={signupAnimation} loop={false} onComplete={() => setPlaySuccessAnim(false)} />
        </div>
      )}
    </div>
  );
};

export default Register;