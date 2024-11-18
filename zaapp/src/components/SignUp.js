import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Loader from "./Loader";
import "../styles/signup.css";
import "../styles/App.css";
import "../styles/modal.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [modalMessage, setModalMessage] = useState(""); // State for modal message
  const [isSuccess, setIsSuccess] = useState(false); // State to differentiate between success and error modals
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to generate a random account number
  const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit random account number
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if user already exists by email
    const existingUser = Object.keys(localStorage)
      .filter((key) => key.startsWith("user-"))
      .map((key) => JSON.parse(localStorage.getItem(key)))
      .find((user) => user.email === email);

    if (existingUser) {
      setModalMessage("User already exists! Log in.");
      setIsSuccess(false);
      setShowModal(true);
      setIsLoading(false);
      return;
    }

    // Generate a unique account number and user ID
    const accountNumber = generateAccountNumber();
    const userId = uuidv4();

    const userData = {
      id: userId,
      fullName,
      email,
      password,
      accountNumber,
      balance: 100000,
      createdAt: new Date().toISOString().split("T")[0],
      transactions: [],
      balanceHistory: [],
    };

    // Save user data in local storage under `user-${userId}`
    localStorage.setItem(`user-${userId}`, JSON.stringify(userData));
    localStorage.setItem("session", JSON.stringify(userData));

    // Show success modal and redirect after closing
    setModalMessage("Registration successful! Redirecting to login...");
    setIsSuccess(true);
    setShowModal(true);
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setShowModal(false);
    if (isSuccess) {
      navigate("/login");
    }
  };

  return (
    <div className="container-signup signup-container">
      {isLoading && <Loader />}
      <a href="/">
        <h1 className="signup-logo">Zaapp</h1>
      </a>
      <div className="block">
        <h2 className="header-text">Start your journey</h2>
        <p className="action-text">Sign up to get started</p>
      </div>
      <Card className="card">
        <Card.Body className="card-body">
          <h3 className="card-title text-center mb-4">Sign Up for Zaapp</h3>
          <Form onSubmit={handleSignUp}>
            <Form.Group className="form-group" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="password">
              <Form.Label>Password</Form.Label>
              <div className="password-wrapper1">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  className="form-control"
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
            </Form.Group>

            <Button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Log in
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>

      {/* Re</Link>act Bootstrap Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="title">
            {isSuccess ? "Success" : "Notification"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn" variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
