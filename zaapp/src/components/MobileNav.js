import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`header ${isOpen ? "nav-open" : ""}`}>
      <button className="btn-mobile-nav" onClick={toggleNav}>
        <IonIcon
          name={isOpen ? "close-outline" : "menu-outline"}
          className="icon-mobile-nav"
        />
      </button>

      <nav className={`main-nav ${isOpen ? "nav-open" : ""}`}>
        <ul className="main-nav-list">
          <li>
            <a href="/" className="main-nav-link">
              Home
            </a>
          </li>
          <li>
            <a href="./404.html" className="main-nav-link">
              About <span className="dd">&#9660;</span>
            </a>
          </li>
          <li>
            <a href="./404.html" className="main-nav-link">
              Services <span className="dd">&#9660;</span>
            </a>
          </li>
          <li>
            <a href="./404.html" className="main-nav-link">
              Company <span className="dd">&#9660;</span>
            </a>
          </li>
          <li>
            <a href="/login" className="main-nav-link blank">
              Sign In
            </a>
          </li>
          <li>
            <a href="/signup" className="main-nav-link nav-cta">
              Sign Up For Free
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
