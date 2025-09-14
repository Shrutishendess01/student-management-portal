import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Welcome!</h1>
      <p>You have successfully logged in.</p>
      <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <button style={{ padding: "12px 28px", fontSize: "1.1rem", borderRadius: "8px", background: "#4dabf7", color: "#fff", border: "none", cursor: "pointer" }} onClick={() => navigate("/")}>Back to Home</button>
        <button style={{ padding: "12px 28px", fontSize: "1.1rem", borderRadius: "8px", background: "#1c7ed6", color: "#fff", border: "none", cursor: "pointer" }} onClick={() => navigate("/students")}>Student List</button>
      </div>
    </div>
  );
};

export default Welcome;
