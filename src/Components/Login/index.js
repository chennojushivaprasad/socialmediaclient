// LoginForm.js
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { Link, Navigate } from "react-router-dom";
import fetchFromApi from "../../fetchFromApi";
import { AppContext } from "../../Context";

const base_url = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const { isValidUser, setIsValidUser } = useContext(AppContext);
  const userId = Cookies.get("userId");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your login logic here (e.g., send form data to the server)
    const url = `${base_url}/api/auth/login`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();

      Cookies.set("accessToken", data.accessToken, { expires: 30 });
      Cookies.set("userId", data.userId, { expires: 30 });
      setIsValidUser(true);
    } else {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000);
      return;
    }
  };

  useEffect(() => {
    if (userId) {
      const getUserData = async () => {
        const response = await fetchFromApi(`/api/user/${userId}`, "GET");
        if (response.ok) {
          setIsValidUser(true);
        }
      };
      getUserData();
    }
  }, [isValidUser, userId,setIsValidUser]);

  if (isValidUser) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="login-form-container">
      <div className="container">
        <div className="login-form-logo">
          <img src="images/logo.png" alt="logo" className="logo" />
          <h1 className="instagram-heading">Twinsta</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        {errorMessage && (
          <p className="error-message">Username and password do not match </p>
        )}
        <Link to="/register" className="navigate-register-link link">
          <button type="button" className="navigate-register">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
