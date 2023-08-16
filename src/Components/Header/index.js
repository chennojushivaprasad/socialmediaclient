import React from "react";
import "./index.css";
import Logo from "../Logo";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {


  return (
    <div className="header">
      <div className="header-logo-container">
        <Logo />
      </div>
     
        <Link className="link" to="/message">
        <button
          type="button"
          
          className="navigate-message-button"
        >
          <FiSend fontSize="" className="navigate-message-icon" />
        </button>
        </Link>
    
    </div>
  );
};

export default Header;
