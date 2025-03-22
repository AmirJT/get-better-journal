import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/navbar.css";
import "../styles/global.css";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(() => navigate("/login"));
        setMenuOpen(false);
    };

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo" onClick={closeMenu}>
                    GetBetter
                </Link>

                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    ☰
                </button>

                <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <Link to="/" className="nav-item" onClick={closeMenu}>
                        Home
                    </Link>
                    <Link to="/discover" className="nav-item" onClick={closeMenu}>
                        Discover
                    </Link>

                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-item" onClick={closeMenu}>
                                Dashboard
                            </Link>
                            <Link to="/profile" className="nav-item" onClick={closeMenu}>
                                Meditation
                            </Link>
                            <button className="nav-item logout" onClick={handleLogout}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="nav-item" onClick={closeMenu}>
                                Sign Up
                            </Link>
                            <Link to="/login" className="nav-item" onClick={closeMenu}>
                                Sign In
                            </Link>
                        </>
                    )}
                </div>

                <DarkModeToggle />

                {menuOpen && <div className="nav-backdrop open" onClick={closeMenu} />}
            </div>
        </nav>
    );
};

export default Navbar;