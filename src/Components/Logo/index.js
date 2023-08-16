import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to="/" className="link flex-row" >   
      <img src="images/logo.png" alt="logo" className="logo" />
      <h1 className="instagram-heading">Twinsta</h1>
    </Link>
  );
};

export default Logo;
