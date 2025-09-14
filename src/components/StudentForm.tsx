import React, { useState } from "react";
import axios from "axios";
import { hashData } from "../utils/crypto";

const StudentForm: React.FC = () => {
  const [student, setStudent] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    course: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = student.email.trim().toLowerCase();
    const normalizedPassword = student.password.trim();
    const normalizedPhone = student.phone.trim();
    const hashedData = {
      ...student,
      email: hashData(normalizedEmail),
      password: hashData(normalizedPassword),
      phone: hashData(normalizedPhone),
    };

    await axios.post("http://localhost:4000/students", hashedData);
    alert("Student registered!");
    setStudent({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      course: "",
      password: "",
    });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Register Student</h2>
      <input name="fullName" placeholder="Full Name" value={student.fullName} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone Number" value={student.phone} onChange={handleChange} required />
      <input type="date" name="dob" value={student.dob} onChange={handleChange} required />
      <input name="gender" placeholder="Gender" value={student.gender} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={student.address} onChange={handleChange} required />
      <input name="course" placeholder="Course Enrolled" value={student.course} onChange={handleChange} required />
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={student.password}
          onChange={handleChange}
          required
          style={{ paddingRight: "40px",  width: "80%",
    margin: "auto" }}
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
      <button type="submit">Register</button>
    </form>
  );
};

export default StudentForm;