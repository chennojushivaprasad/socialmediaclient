// RegistrationForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { uploadUserImageToFirebase } from "../../firebase/uploadMedia";

const base_url = process.env.REACT_APP_BASE_URL;
const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userImage: "",
  });

  const [registeredSuccessFully, setRegisteredSuccessFully] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    // Implement your registration logic here (e.g., send form data to the server)

    async function upload() {
      try {
        return await uploadUserImageToFirebase(selectedFile);
      } catch (error) {
        console.error("Error occurred during image upload:", error);
        return;
      }
    }
    const userImageUrl = await upload();

    const url = `${base_url}/api/auth/signup`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        userImage: userImageUrl,
        email: email,
        password: password,
      }),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      setRegisteredSuccessFully(true);
    } else {
      setRegisteredSuccessFully(false);
    }

    setSelectedFile("");
    setFormData({
      username: "",
      email: "",
      password: "",
      userImage: "",
    });

    setTimeout(function () {
      setRegisteredSuccessFully(false);
    }, 3000); // Simulating a 2-second registration process

    const data = await response.json();
  };

  return (
    <div className="registration-form-container">
      <div className="container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2 className="heading">Registration Form</h2>
          <div className="registration-form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="registration-form-group">
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
          <div className="registration-form-group">
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
          <div className="upload-input">
            <button type="button" className="upload-image-button">
              <input
                type="file"
                className="hide-input-file"
                onChange={handleFileInputChange}
                placeholder="Drag photos and videos here"
              />
              Upload Profile
            </button>
          </div>

          <button className="registration-button" type="submit">
            Register
          </button>
        </form>
        <Link to="/login" className="navigate-login-link">
          <button className="navigate-login-button">Login</button>
        </Link>
      </div>
      {registeredSuccessFully && (
        <div class="notification">Registered successfully!</div>
      )}
    </div>
  );
};

export default Registration;
