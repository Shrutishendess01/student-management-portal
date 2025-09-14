import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hashData } from "../utils/crypto";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();
      const hashedEmail = hashData(normalizedEmail);
      const hashedPassword = hashData(normalizedPassword);

      const userRes = await axios.get("http://localhost:4000/users");
      const user = userRes.data.find(
        (u: any) => u.email === hashedEmail && u.password === hashedPassword
      );
      const studentRes = await axios.get("http://localhost:4000/students");
      const student = studentRes.data.find(
        (s: any) => s.email === hashedEmail && s.password === hashedPassword
      );
      if (user || student) {
        navigate("/welcome");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ paddingRight: "40px" ,     width: "80%",
    margin: "auto",}}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px"
          }}
          tabIndex={-1}
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;