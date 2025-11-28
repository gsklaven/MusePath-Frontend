import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-logo">
          <img src="/assets/logo.png" alt="Logo" /> 
        </div>
        <h1 className="welcome-title">Welcome!</h1>
        <p className="welcome-subtitle">Discover the world of culture with MusePath</p>
        <div className="welcome-buttons">
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
