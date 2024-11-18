import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Zaapp
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {user ? (
            <>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </li>
              {/* Add additional nav items for logged-in users if needed */}
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                {" "}
                {/* Corrected the link */}
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
