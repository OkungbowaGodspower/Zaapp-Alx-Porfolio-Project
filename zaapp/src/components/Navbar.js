import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";
import "../styles/App.css";
import "../styles/queries.css";
import "../styles/company.css";
import "../components/useStickyNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={`header ${isOpen ? "nav-open" : ""}`}>
      <h1 className="logo">
        <Link to="/" className="header-logo">
          Zaapp
        </Link>
      </h1>
      <nav className={`main-nav ${isOpen ? "nav-open" : ""}`}>
        <ul className="main-nav-list">
          <li>
            <Link to="/" className="main-nav-link hover-effect">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="main-nav-link hover-effect">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="main-nav-link hover-effect">
              Services
            </Link>
          </li>
          <li>
            <Link to="/company" className="main-nav-link hover-effect">
              Company
            </Link>
          </li>
          <li>
            <Link to="/login" className="main-nav-link blank">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/signup" className="main-nav-link nav-cta">
              Sign Up For Free
            </Link>
          </li>
        </ul>
      </nav>
      <button className="btn-mobile-nav" onClick={toggleNav}>
        <ion-icon name="menu-outline" class="icon-mobile-nav"></ion-icon>
        <ion-icon name="close-outline" class="icon-mobile-nav"></ion-icon>
      </button>
    </header>
  );
};

export default Navbar;
