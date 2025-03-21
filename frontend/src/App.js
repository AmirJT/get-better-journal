import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; 
import Footer from "./components/Footer";  
import Discover from "./pages/Discover";


const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider> 
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/discover" element={<Layout><Discover /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;