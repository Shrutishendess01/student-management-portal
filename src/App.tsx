
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import Welcome from "./components/Welcome";
import "./App.css";

const AppHeader: React.FC = () => (
  <div className="main-header">
    <div className="main-header-title" style={{ padding: "30px" }}>
      STUDENT MANAGEMENT PORTAL
    </div>
    <nav className="main-header-nav">
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/students" style={{ display: "none" }}>
        Student List
      </Link>
    </nav>
  </div>
);

const App: React.FC = () => {
  const location = useLocation();

  // hide header on welcome & students page
  const hideHeaderRoutes = ["/welcome", "/students"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <AppHeader />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<StudentForm />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </>
  );
};

const RootApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
