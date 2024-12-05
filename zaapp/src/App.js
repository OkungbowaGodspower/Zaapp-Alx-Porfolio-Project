import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import SendMoney from "./components/SendMoney";
import TransactionHistory from "./components/TransactionHistory";
import Investments from "./components/Investments";
import Navbar from "./components/Navbar";
import Home from "./home";
import About from "./about";
import Services from "./services";
import Company from "./company";
import useStickyNav from "./components/useStickyNav";
import useFlexboxGapFix from "./components/useFlexboxGapFix";

const App = () => {
  useStickyNav();
  useFlexboxGapFix();

  useEffect(() => {
    const allLinks = document.querySelectorAll("a:link");
    const headerEl = document.querySelector(".header");

    allLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (href.startsWith("#")) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const sectionEl = document.querySelector(href);
          sectionEl?.scrollIntoView({ behavior: "smooth" });

          if (link.classList.contains("main-nav-link") && headerEl) {
            headerEl.classList.toggle("nav-open");
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    const splashScreen = document.getElementById("splash-screen");
    if (splashScreen) {
      splashScreen.style.opacity = "0"; // Fade-out effect
      setTimeout(() => splashScreen.remove(), 4000); // Remove after fade-out
    }
  }, []);

  return (
    <Router>
      {/* <Navbar /> Navbar should always be visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/company" element={<Company />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
};

export default App;
