import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">NUST Secure Portal</span>
        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/file-encrypt">File Encryption</Link>
            <Link to="/phishing-checker">Phishing Checker</Link>
            <Link to="/password-strength">Password Strength</Link>
            <Link to="/password-vault">Password Vault</Link>
            <Link to="/report-issue">Report Issue</Link>
            <Link to="/website-safety">Website Safety</Link>
          </>
        )}
      </div>
      <div className="nav-right">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
        {user && (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;