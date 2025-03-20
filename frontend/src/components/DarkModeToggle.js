import React, { useState, useEffect } from "react";
import "../styles/navbar.css"; 

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
      <div className={`toggle-circle ${darkMode ? "dark-mode" : "light-mode"}`}></div>
    </div>
  );
};

export default DarkModeToggle;