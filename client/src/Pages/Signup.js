import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup({ onSignupSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, form);
      if (onSignupSuccess) {
        onSignupSuccess();
      } else {
        navigate("/login");
      }
    } catch (err) {
      alert("Signup failed. Email might already be in use.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <div className="auth-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-title">Signup</h2>
            <input className="auth-input" name="name" placeholder="Name" onChange={handleChange} required />
            <input className="auth-input" name="email" placeholder="Email" onChange={handleChange} required />
            <input className="auth-input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input className="auth-input" name="phone" placeholder="Phone" onChange={handleChange} required />
            <button className="auth-button" type="submit">Signup</button>
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