import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import Loader from "./Loader";
import "../styles/login.css";
import "../styles/App.css";
import "../styles/modal.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const localStorageKeys = Object.keys(localStorage);
      const userKeys = localStorageKeys.filter((key) =>
        key.startsWith("user-")
      );

      const userData = userKeys
        .map((key) => JSON.parse(localStorage.getItem(key)))
        .find((user) => user.email === email);

      if (!userData) {
        setErrorMessage("Email not found. Please check and try again.");
        setShowErrorModal(true);
      } else if (userData.password !== password) {
        setErrorMessage("Incorrect password. Please try again.");
        setShowErrorModal(true);
      } else {
        localStorage.setItem("session", JSON.stringify(userData));
        navigate("/dashboard");
      }
      setIsLoading(false);
    }, 4000);
  };

  const handleForgotPassword = () => {
    const localStorageKeys = Object.keys(localStorage);
    const userKeys = localStorageKeys.filter((key) => key.startsWith("user-"));

    const userData = userKeys
      .map((key) => JSON.parse(localStorage.getItem(key)))
      .find((user) => user.email === email);

    if (!userData) {
      setErrorMessage("Email not found. Please check and try again.");
      setShowErrorModal(true);
      return;
    }
    setShowResetPasswordModal(true);
  };

  const handlePasswordReset = () => {
    if (newPassword) {
      const localStorageKeys = Object.keys(localStorage);
      const userKeys = localStorageKeys.filter((key) =>
        key.startsWith("user-")
      );

      const userKey = userKeys.find((key) => {
        const user = JSON.parse(localStorage.getItem(key));
        return user.email === email;
      });

      if (userKey) {
        const userData = JSON.parse(localStorage.getItem(userKey));
        userData.password = newPassword;
        localStorage.setItem(userKey, JSON.stringify(userData));
        setShowResetPasswordModal(false);
        setSuccessMessage(
          "Password successfully reset. You can now log in with the new password."
        );
        setShowSuccessModal(true);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    navigate("/dashboard");
  };

  const handleCloseError = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="container-login login-container">
      {isLoading && <Loader />}
      <a href="/">
        <h1 className="login-logo">Zaapp</h1>
      </a>
      <div className="block">
        <h2 className="header-text">Jump right back in</h2>
        <p className="action-text">Sign in to continue</p>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Sign In to Zaapp</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              New user?{" "}
              <Link to="/signup" className="signup-link">
                Create account
              </Link>
            </p>
            <p>
              Forgot your password?{" "}
              <Link
                to="#"
                onClick={handleForgotPassword}
                className="forgot-password-link"
              >
                Reset Password
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccess} centered>
        <Modal.Header closeButton>
          <Modal.Title className="title">Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage || "Welcome back! Redirecting to your dashboard..."}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            variant="primary"
            onClick={handleCloseSuccess}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseError} centered>
        <Modal.Header closeButton>
          <Modal.Title className="title">Login Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage || "Invalid email or password. Please try again."}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            variant="secondary"
            onClick={handleCloseError}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        show={showResetPasswordModal}
        onHide={() => setShowResetPasswordModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="title">Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control"
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="btn"
            onClick={handlePasswordReset}
          >
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
