import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "./Config";


const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post( `${config.backendEndpoint}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="row bg-white shadow-lg rounded" style={{ maxWidth: "800px", width: "100%", overflow: "hidden" }}>
        <div className="col-md-5 col-12 d-flex align-items-center justify-content-center p-4">
          <img
            src="https://www.ve3.global/wp-content/uploads/2023/05/brandmark-design-8.png"
            alt="Brand Logo"
            className="img-fluid rounded"
            style={{ maxWidth: "100%", height: "auto", width: "80%" }}
          />
        </div>
        <div className="col-md-7 col-12 d-flex flex-column align-items-center justify-content-center p-4">
          <h2 className="text-center mb-3">Login</h2>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            {message && <p className="text-danger text-center mt-3">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
