// import { IonIcon } from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/index.css";
import "./styles/App.css";
import "./styles/queries.css";

import customer1 from "../src/static/img/customers/customer-1.jpg";
import customer2 from "../src/static/img/customers/customer-2.jpg";
import customer3 from "../src/static/img/customers/customer-3.jpg";
import customer4 from "../src/static/img/customers/customer-4.jpg";
import customer5 from "../src/static/img/customers/customer-5.jpg";
import customer6 from "../src/static/img/customers/customer-6.jpg";

import brand1 from "../src/static/img/logos/business-insider.png";
import brand2 from "../src/static/img/logos/forbes.png";
import brand3 from "../src/static/img/logos/the-new-york-times.png";
import brand4 from "../src/static/img/logos/techcrunch.png";
import brand5 from "../src/static/img/logos/usa-today.png";

import customerReview1 from "../src/static/img/customers/ben.jpg";
import customerReview2 from "../src/static/img/customers/dave.jpg";
import customerReview3 from "../src/static/img/customers/steve.jpg";
import customerReview4 from "../src/static/img/customers/hannah.jpg";
function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the nav
  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="body">
      {/* <header className="header">
        <h1 className="logo">Zaapp</h1>
        <nav className="main-nav">
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
        </nav> */}
      {/* <button className="btn-mobile-nav">
          <IonIcon name="menu-outline" className="icon-mobile-nav" />
          <IonIcon name="close-outline" className="icon-mobile-nav" />
        </button> */}
      {/* <button className="btn-mobile-nav">
          <ion-icon name="menu-outline" className="icon-mobile-nav"></ion-icon>
          <ion-icon name="close-outline" className="icon-mobile-nav"></ion-icon>
        </button>
      </header> */}
      <header className={`header ${isOpen ? "nav-open" : ""}`}>
        <h1 className="logo">Zaapp</h1>
        <nav className={`main-nav ${isOpen ? "nav-open" : ""}`}>
          <ul className="main-nav-list">
            <li>
              <Link to="/" className="main-nav-link">
                Home
              </Link>
            </li>
            <li>
              <a href="./404.html" className="main-nav-link">
                About <span className="dd"></span>
              </a>
            </li>
            <li>
              <a href="./404.html" className="main-nav-link">
                Services <span className="dd"></span>
              </a>
            </li>
            <li>
              <a href="./404.html" className="main-nav-link">
                Company <span className="dd"></span>
              </a>
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

      {/* <main> */}
      <section className="section-hero">
        <div className="hero">
          <div className="hero-text-box">
            <h1 className="heading-primary">
              Transform Your Finances With Digital Solutions
            </h1>
            <p className="hero-description">
              Zaapp helps over 100,000 customers achieve their financial goals.
            </p>
            <div className="position-btn">
              <li className="direct-signup">
                <Link to="/signup" className="btn btn--CTA margin-right-sm">
                  Create Account
                </Link>
              </li>
              <a href="#learn" className="btn btn--outline">
                Learn More &darr;
              </a>
            </div>
            <div className="delivered-meals">
              <div className="delivered-img">
                <img src={customer1} alt="customer-photo" />
                <img src={customer2} alt="customer-photo" />
                <img src={customer3} alt="customer-photo" />
                <img src={customer4} alt="customer-photo" />
                <img src={customer5} alt="customer-photo" />
                <img src={customer6} alt="customer-photo" />
              </div>
              <p className="delivered-text">
                <span>
                  Get a <i className="light">little</i> richer everyday!
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-featured" id="learn">
        <div className="container">
          <h2 className="heading-featured-in">As featured in</h2>
          <div className="logo-container">
            <img src={brand1} alt="brand-photo" />
            <img src={brand2} alt="brand-photo" />
            <img src={brand3} alt="brand-photo" />
            <img src={brand4} alt="brand-photo" />
            <img src={brand5} alt="brand-photo" />
          </div>
        </div>
      </section>

      <section className="section-how" id="how-it-works">
        <div className="container">
          <h2 className="heading-secondary">Why choose Zaapp?</h2>
        </div>

        <div className="container grid grid--3-cols grid--center-vertically">
          <div className="step-text-box bg-1">
            <p className="step-number">
              <ion-icon className="icon-pad" name="bar-chart"></ion-icon>
            </p>
            <h3 className="heading-tertiary">Goal Savings</h3>
            <p className="step-description">
              Reach all your savings goals faster. Save towards multiple goals
              on your own.
            </p>
          </div>

          <div className="step-text-box bg-2">
            <p className="step-number">
              <ion-icon className="icon-pad" name="send"></ion-icon>
            </p>
            <h3 className="heading-tertiary">Transfer & Spend</h3>
            <p className="step-description">
              Send money for free to any user account with unlimited free
              transfers every month.
            </p>
          </div>

          <div className="step-text-box bg-3">
            <p className="step-number">
              <ion-icon className="icon-pad" name="cash-outline"></ion-icon>
            </p>
            <h3 className="heading-tertiary">Loans</h3>
            <p className="step-description">
              Get up to ₦1,000,000 in your Zaapp account easily and repay in
              convenient installments.
            </p>
          </div>
        </div>
      </section>

      <section className="section-meals" id="meals">
        <div className="container center-text">
          <h2 className="heading-secondary">
            Getting started with the Zaapp app
          </h2>
        </div>
        <div className="container grid grid--3-cols">
          <div className="meal">
            <div className="meal-content">
              <div className="meal-tag">
                <span className="tag tag--zaapp">01</span>
              </div>
              <p className="meal-title">Download the app</p>
              <ul className="meal-attributes">
                <li className="meal-attribute">
                  <span>
                    Get the Zaapp App on GitHub by cloning, using this link{" "}
                    <a href="https://github.com/your-repo/zaapp">Zaapp App</a>{" "}
                    or using <a href="https://www.netlify.com">Netlify</a>.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="meal">
            <div className="meal-content">
              <div className="meal-tag">
                <span className="tag tag--zaapp">02</span>
              </div>
              <p className="meal-title">Create an account</p>
              <ul className="meal-attributes">
                <li className="meal-attribute">
                  <span>
                    Sign up for an account with a few details about you, your
                    full name and email.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="meal">
            <div className="meal-content">
              <div className="meal-tag">
                <span className="tag tag--zaapp">03</span>
              </div>
              <p className="meal-title">Start Banking Now</p>
              <ul className="meal-attributes">
                <li className="meal-attribute">
                  <span>
                    You're ready to go. Carry out all your banking transactions
                    within the app.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-testimonial" id="testimonial">
        <div className="testimonials-container">
          <h2 className="heading-secondary">Why not give it a try?</h2>
          <div className="testimonials">
            <figure className="testimonial">
              <img
                src={customerReview2}
                alt="customer-photo"
                className="testimonial-img"
              />
              <blockquote className="testimonial-text">
                This is the best banking app! I’m enjoying seamless banking plus
                the free transfers to other users is a thing of joy.
              </blockquote>
              <p className="testimonial-name">&mdash; Dave</p>
            </figure>

            <figure className="testimonial">
              <img
                src={customerReview1}
                alt="customer-photo"
                className="testimonial-img"
              />
              <blockquote className="testimonial-text">
                Just joined the best Digital Bank in Nigeria I have no
                complaints whatsoever since I started using Zaapp.
              </blockquote>
              <p className="testimonial-name">&mdash; Ben</p>
            </figure>

            <figure className="testimonial">
              <img
                src={customerReview3}
                alt="customer-photo"
                className="testimonial-img"
              />
              <blockquote className="testimonial-text">
                Definitely worthy of a five star rating, kudos to Zaapp. They
                are wonderful and unique in every aspect I highly recommend this
                app for everyone.
              </blockquote>
              <p className="testimonial-name">&mdash; Steve</p>
            </figure>

            <figure className="testimonial">
              <img
                src={customerReview4}
                alt="customer-photo"
                className="testimonial-img"
              />
              <blockquote className="testimonial-text">
                The loan process is incredible, very convenient for emergency
                situations, Zaapp helped me so much!
              </blockquote>
              <p className="testimonial-name">&mdash; Hannah</p>
            </figure>
          </div>
        </div>
      </section>

      <section className="section-pricing" id="pricing"></section>

      <section className="section-cta" id="cta">
        <div className="container">
          <div className="cta">
            <div className="cta-text-box">
              <h2 className="heading-secondary">
                Join 100,000+ people who save and invest with us
              </h2>
              <p className="cta-text">
                Sign up for free. Start investing today.
              </p>
              <form className="cta-form" name="sign-up" netlify="true">
                <div>
                  <label htmlFor="full-name">Full name</label>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="John Smith"
                    name="full-name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="me@example.com"
                    name="email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="select-where">
                    Where did you learn about us?
                  </label>
                  <select id="select-where" name="select-where" required>
                    <option value="">Choose an option:</option>
                    <option value="family">Family and friends</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube video</option>
                    <option value="podcast">Podcast</option>
                    <option value="facebook">Facebook ad</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <button type="submit" className="btn btn--form">
                  Sign Up For Free
                </button>
              </form>
            </div>

            <div
              className="cta-img-box"
              role="alert"
              aria-label="Woman enjoying food"
            ></div>
          </div>
        </div>
      </section>

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
      {/* </main> */}
    </div>
  );
}

export default Home;
