import React, { useState } from "react";
import { evaluatePassword } from "../utils/PasswordStrength.js";

const PasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value) {
      setAnalysis(null);
      return;
    }
    setAnalysis(evaluatePassword(value));
  };

  const getBarColor = (score) => {
    switch (score) {
      case 0:
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellowgreen";
      case 4:
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="page-container">
      <h2>Password Strength Checker</h2>
      <p>Type a password to see its estimated strength and suggestions.</p>

      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter a password"
      />

      {analysis && (
        <div className="card">
          <h3>Strength: {analysis.label}</h3>
          <div className="strength-bar-wrapper">
            <div
              className="strength-bar"
              style={{
                width: `${((analysis.score + 1) / 5) * 100}%`,
                backgroundColor: getBarColor(analysis.score),
            }}
            ></div>
          </div>
          <p>Estimated crack time (offline slow hash): {analysis.crackTime}</p>

          {analysis.feedback.warning && (
            <p className="warning">Warning: {analysis.feedback.warning}</p>
          )}
          {analysis.feedback.suggestions &&
            analysis.feedback.suggestions.length > 0 && (
              <>
                <h4>Suggestions:</h4>
                <ul>
                  {analysis.feedback.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            )}
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;