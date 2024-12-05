import React from "react";
import "../styles/loader.css";
const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="cube-face"></div>
        <div className="cube-face"></div>
        <div className="cube-face"></div>
        <div className="cube-face"></div>
        <div className="cube-face"></div>
        <div className="cube-face"></div>
      </div>
    </div>
  );
};

export default Loader;
