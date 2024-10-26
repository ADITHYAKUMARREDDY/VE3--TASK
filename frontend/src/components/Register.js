import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "./Config";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(`${config.backendEndpoint}/auth/register`, formData);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.error || "Error registering user");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="row bg-white shadow-lg rounded" style={{ maxWidth: "800px", width: "100%" }}>
        <div className="col-md-5 col-12 d-flex align-items-center justify-content-center p-4">
          <img
            src="https://www.ve3.global/wp-content/uploads/2023/05/brandmark-design-8.png"
            alt="Brand Logo"
            className="img-fluid rounded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-7 col-12 d-flex flex-column align-items-center justify-content-center p-4">
          <h2 className="text-center mb-3">Register</h2>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="form-control mb-3"
            />
            <input
              type="email"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="form-control mb-3"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control mb-3"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
            {message && <p className="text-danger text-center mt-3">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
