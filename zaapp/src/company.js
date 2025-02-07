import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/index.css";
import "./styles/App.css";
import "./styles/queries.css";
import "./styles/company.css";
import "./components/useStickyNav";

function Company() {
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
        <section className="section-company">
          <div className="container box-width">
            <h2 className="heading-secondary">Who We Are</h2>
            <p className="meal-attribute">
              Zaapp Inc. is a leading fintech company committed to
              revolutionizing the way people save, spend, and grow their money.
              Headquartered in Lagos, Nigeria, we aim to become a global leader
              in digital financial solutions.
            </p>

            <h2 className="heading-secondary">Our Core Values</h2>
            <ul className="list-type meal-attribute">
              <li>
                <span className="blue">Innovation:</span> Staying ahead with
                cutting-edge solutions.
              </li>
              <li>
                <span className="blue">Transparency:</span> Building trust with
                our users.
              </li>
              <li>
                <span className="blue">Customer-first approach:</span> Your
                satisfaction is our priority.
              </li>
              <li>
                <span className="blue">Inclusively:</span> Financial tools for
                everyone, everywhere.
              </li>
            </ul>

            <h2 className="heading-secondary">Leadership</h2>
            <p className="meal-attribute">
              Our team is led by industry experts with years of experience in
              fintech, banking, and technology. With a diverse leadership team,
              Zaapp continues to break new ground in digital finance.
            </p>

            <h2 className="heading-secondary">Careers</h2>
            <p className="meal-attribute-line">
              Interested in joining Zaapp? Visit our
              <span>
                {" "}
                <a href="/">careers page</a>
              </span>{" "}
              to explore opportunities and become part of a dynamic,
              fast-growing company.
            </p>
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

export default Company;
