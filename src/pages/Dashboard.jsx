import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="page-container">
      <h1>Welcome to NUST Secure Portal</h1>
      <p>
        This portal helps NUST students improve their cybersecurity awareness.
        Use the tools below:
      </p>
      <div className="cards-grid">
        <Link to="/file-encrypt" className="feature-card">
          <h3>File Encryption & Decryption</h3>
          <p>Encrypt and decrypt files securely in your browser.</p>
        </Link>
        <Link to="/phishing-checker" className="feature-card">
          <h3>Phishing Email Detector</h3>
          <p>Check if an email or message is likely phishing.</p>
        </Link>
        <Link to="/password-strength" className="feature-card">
          <h3>Password Strength Checker</h3>
          <p>Test how strong your password is.</p>
        </Link>
        <Link to="/password-vault" className="feature-card">
          <h3>Password Vault</h3>
          <p>Store your passwords securely (encrypted).</p>
        </Link>
        <Link to="/report-issue" className="feature-card">
          <h3>Harassment / Difficulty Reporting</h3>
          <p>Submit confidential reports or concerns.</p>
        </Link>
        <Link to="/website-safety" className="feature-card">
          <h3>Website Safety Checker</h3>
          <p>Check if a website URL looks suspicious.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;