import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from '../images/Logo.png';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    const user = rawUser && rawUser !== "undefined" ? JSON.parse(rawUser) : null;
    
    if (user && !initialLoad) {  
      alert("Please Logout First");
      if (user.role === "project-manager") {
        navigate("/add-project");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/store");
      }
    }
    setInitialLoad(true); 
  }, [navigate, initialLoad]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
        
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email: form.email,
        password: form.password,
      });

      const { role, token, userId } = response.data;
      localStorage.setItem("user", JSON.stringify({ _id: userId, token, role }));
      
      if (role === "project-manager") {
        navigate("/add-project");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/store");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <img src={Logo} alt="Logo" width="350" />
        <div className="auth-container" style={{ minHeight: '10vh', padding: '16px', backgroundColor: '#f8f9fa' }}>
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-title">Login</h2>
            <input
              className="auth-input"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button className="auth-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
     <footer
        style={{
          backgroundColor: "#333",
          color: "white",
          padding: "20px 15px",
          textAlign: "center",
          marginTop: "auto",
          borderRadius: "25px",
          width: "100%",
          boxSizing: "border-box",
          wordBreak: "break-word",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Contact Us</h3>
        <div style={{ marginBottom: "10px" }}>
          Phone: 9370808882, 9145275734
        </div>
        <div>Email: hrishikeshrshinde2003@gmail.com</div>
        <div>chakaneomkar887@gmail.com</div>
      </footer>
    </div>
  );
}