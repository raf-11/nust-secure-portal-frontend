import React, { useState } from "react";
import { analyzePhishingRisk } from "c:/Users/RBTGL/projects/helloworld/NustSecurePortal/Frontend/src/modules/utils/PhishingRules.js";

const PhishingChecker = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    const analysis = analyzePhishingRisk(input);
    setResult(analysis);
  };

  return (
    <div className="page-container">
      <h2>Phishing Email / Message Checker</h2>
      <p>
        Paste the content of an email or message. This tool uses simple rules to
        highlight potential phishing indicators. It is not perfect but helps you
        think critically.
      </p>

      <textarea
        rows={10}
        placeholder="Paste email text or message content here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAnalyze}>Analyze</button>

      {result && (
        <div className="card">
          <h3>Result: {result.riskLabel}</h3>
          <p>Risk score: {result.score}</p>
          {result.reasons.length > 0 ? (
            <>
              <h4>Reasons:</h4>
              <ul>
                {result.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>No obvious phishing indicators found.</p>
          )}

          {result.urls.length > 0 && (
            <>
              <h4>Detected URLs:</h4>
              <ul>
                {result.urls.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            </>
          )}

          <p className="note">
            Note: This is a simplified educational tool. When in doubt, do not
            click suspicious links and verify with official NUST sources.
          </p>
        </div>
      )}
    </div>
  );
};

export default PhishingChecker;