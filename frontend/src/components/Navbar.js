import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import Lottie from "lottie-react";
import "../styles/navbar.css";
import "../styles/global.css";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [hoverPosition, setHoverPosition] = useState({ left: 0 });
    const [handAnimation, setHandAnimation] = useState(null);

    const navigate = useNavigate();

    const isDesktop = window.innerWidth > 768;

    useEffect(() => {
        fetch("/hand.json")
            .then((res) => res.json())
            .then((data) => setHandAnimation(data))
            .catch((err) => console.error("Error loading hand.json:", err));
    }, []);

    const handleLogout = () => {
        logout(() => navigate("/login"));
        setMenuOpen(false);
    };

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    const handleMouseEnter = (e) => {
        const rect = e.target.getBoundingClientRect();
        setHoverPosition({ left: rect.left + rect.width / 2 });
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
    };

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
                    <Link
                        to="/"
                        className="nav-item"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={closeMenu}
                    >
                        Home
                    </Link>
                    <Link
                        to="/discover"
                        className="nav-item"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={closeMenu}
                    >
                        Discover
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="nav-item"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={closeMenu}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/profile"
                                className="nav-item"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={closeMenu}
                            >
                                Meditation
                            </Link>
                            <button
                                className="nav-item logout"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleLogout}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="nav-item"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={closeMenu}
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/login"
                                className="nav-item"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={closeMenu}
                            >
                                Sign In
                            </Link>
                        </>
                    )}
                </div>

                <DarkModeToggle />

                {menuOpen && <div className="nav-backdrop open" onClick={closeMenu} />}

                {isDesktop && hovering && handAnimation && (
                    <div
                        className="hand-animation"
                        style={{ left: `${hoverPosition.left}px` }}
                    >
                        <Lottie animationData={handAnimation} loop={false} />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;