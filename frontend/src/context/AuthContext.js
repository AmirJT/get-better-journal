import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setUser(token ? { token } : null);
      console.log("User updated from localStorage:", token); 
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (token, callback) => {
    localStorage.setItem("token", token);
    setUser({ token });

    console.log("User logged in:", { token });
    if (callback) {
      callback();
    }
  };

  const logout = (callback) => {
    localStorage.removeItem("token");
    setUser(null);

    console.log("User logged out");
    if (callback) {
      callback();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};