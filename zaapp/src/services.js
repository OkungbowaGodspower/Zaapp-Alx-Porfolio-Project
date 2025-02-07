import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/index.css";
import "./styles/App.css";
import "./styles/queries.css";
import "./styles/service.css";
import "./components/useStickyNav";

import vector1 from "../src/static/vectors/savings.jpg";
import vector2 from "../src/static/vectors/loan.jpg";
import vector3 from "../src/static/vectors/pay-bills.jpg";
import vector4 from "../src/static/vectors/send-funds.jpg";
import vector5 from "../src/static/vectors/track-expenses.jpg";

function Services() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the nav
  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="body">
      <div className="sentinel"></div>{" "}
      {/* This will be the reference point for sticky */}
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
                About <span className="dd"></span>
              </Link>
            </li>
            <li>
              <Link to="/services" className="main-nav-link hover-effect">
                Services <span className="dd"></span>
              </Link>
            </li>
            <li>
              <Link to="/company" className="main-nav-link hover-effect">
                Company <span className="dd"></span>
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
      <main>
        <section className="section-services">
          <div className="container">
            <h2 className="heading-secondary">Banking Simplified</h2>
            <p className="description meal-attribute">
              Zaapp provides a comprehensive range of services designed to make
              your financial life easier.
            </p>
            <div className="service-list grid grid--4-cols">
              <div className="service">
                <div className="card-image">
                  <img src={vector1} alt="Personal Savings"></img>
                </div>
                <h3 className="meal-title">Personal Savings</h3>
                <p className="meal-attribute">
                  Save towards your financial goals with our customizable
                  savings goal plans.
                </p>
              </div>

              <div className="service">
                <div className="card-image">
                  <img src={vector2} alt="Loan"></img>
                </div>
                <h3 className="meal-title">Loan Services</h3>
                <p className="meal-attribute">
                  Access quick and convenient loans up to ₦10,000,000, with
                  flexible repayment plans.
                </p>
              </div>
              <div className="service">
                <div className="card-image">
                  <img src={vector3} alt="Bills Payment"></img>
                </div>
                <h3 className="meal-title">Bills Payments</h3>
                <p className="meal-attribute">
                  Pay your bills—electricity, internet, subscriptions—directly
                  from the app with ease.
                </p>
              </div>
              <div className="service">
                <div className="card-image">
                  <img src={vector4} alt="Free Transfer"></img>
                </div>
                <h3 className="meal-title">Free Transfers</h3>
                <p className="meal-attribute">
                  Send money instantly to any Zaapp user for free, anywhere and
                  anytime.
                </p>
              </div>
              <div className="service">
                <div className="card-image">
                  <img src={vector5} alt="Track Expenses"></img>
                </div>
                <h3 className="meal-title">Expense Tracking</h3>
                <p className="meal-attribute">
                  Monitor your expenses and understand your spending habits with
                  our smart analytics tools.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="section-footer">
        <div className="container grid grid--footer">
          <div className="logo-col">
            <a href="/" className="footer-logo">
              <h1 className="logo">Zaapp</h1>
            </a>

            <ul className="social-links">
              <li>
                <a href="/" className="footer-link" title="Instagram">
                  <ion-icon
                    name="logo-instagram"
                    className="social-icon"
                  ></ion-icon>
                </a>
              </li>
              <li>
                <a href="/" className="footer-link" title="Facebook">
                  <ion-icon
                    name="logo-facebook"
                    className="social-icon"
                  ></ion-icon>
                </a>
              </li>
              <li>
                <a href="/" className="footer-link" title="Twitter">
                  <ion-icon
                    name="logo-twitter"
                    className="social-icon"
                  ></ion-icon>
                </a>
              </li>
              <li>
                <a href="/" className="footer-link" title="WhatsApp">
                  <ion-icon
                    name="logo-whatsapp"
                    className="social-icon"
                  ></ion-icon>
                </a>
              </li>
            </ul>

            <p className="copyright">
              Copyright &copy; <span className="year">2024</span> by Zaapp Inc.
              <br />
              All rights reserved.
            </p>
          </div>

          <div className="address-col">
            <p className="footer-heading">Contact Us</p>
            <address className="contacts">
              <p className="address">123 Geepee St. Lagos, Nigeria.</p>
              <p>
                <a className="footer-link" href="tel:+2344196661234">
                  +234 419 666 1234
                </a>
                <br />
                <a className="footer-link" href="mailto:hello@zaapp.com">
                  hello@zaapp.com
                </a>
              </p>
              <ul className="footer-nav">
                <li>
                  <a className="footer-link" href="/">
                    WhatsApp <span>&#8599;</span>
                  </a>
                </li>
              </ul>
            </address>
          </div>

          <nav className="nav-col">
            <p className="footer-heading">Accounts</p>
            <ul className="footer-nav">
              <li>
                <a className="footer-link" href="/">
                  Create account
                </a>
              </li>
              <li>
                <a className="footer-link" href="/">
                  Sign in
                </a>
              </li>
              <li>
                <a className="footer-link" href="/">
                  iOS app
                </a>
              </li>
              <li>
                <a className="footer-link" href="/">
                  Android app
                </a>
              </li>
            </ul>
          </nav>

          <nav className="nav-col">
            <p className="footer-heading">Company</p>
            <ul className="footer-nav">
              <li>
                <a className="footer-link" href="/">
                  About Zaapp
                </a>
              </li>
              <li>
                <a className="footer-link" href="/">
                  For Business
                </a>
              </li>
              <li>
                <a className="footer-link" href="/">
                  Complaints
                </a>
              </li>
              <li>
                <a className="footer-link" href="/">
                  Careers
                </a>
              </li>
            </ul>
          </nav>

          <nav className="nav-col">
            <p className="footer-heading">Resources</p>
            <ul className="footer-nav">
              <li>
                <a className="footer-link" href="/">
                  Security
                </a>
              </li>
              <li>
                <a className="footer-link" href="/">
                  Help center
                </a>
              </li>
              <li>
                <a className="footer-link" href="/">
                  Privacy & terms
                </a>
              </li>
              <li>
                <a className="footer-link" href="/">
                  FAQs
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Services;
