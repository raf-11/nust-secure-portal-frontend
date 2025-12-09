import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const ReportIssue = ({ user }) => {
  const [category, setCategory] = useState("harassment");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.trim()) {
      setError("Please describe your issue.");
      return;
    }
    setError("");
    try {
      await addDoc(collection(db, "reports"), {
        userId: user.uid,
        email: user.email,
        category,
        details,
        createdAt: new Date(),
      });
      setSubmitted(true);
      setDetails("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit report.");
    }
  };

  return (
    <div className="page-container">
      <h2>Harassment / Difficulty Reporting</h2>
      <p>
        Use this form to report harassment, bullying, academic difficulty, or
        any other concern. Your report is stored securely and not visible to
        other students.
      </p>

      <form onSubmit={handleSubmit} className="report-form">
        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="harassment">Harassment / Bullying</option>
            <option value="cyberbullying">Cyberbullying</option>
            <option value="academic">Academic Difficulty</option>
            <option value="mental-health">Mental Health</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Details (avoid sharing passwords or very sensitive info)
          <textarea
            rows={6}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Submit Report</button>
      </form>

      {submitted && (
        <p className="success-text">
          Thank you for sharing. Your report has been submitted.
        </p>
      )}
    </div>
  );
};

export default ReportIssue;