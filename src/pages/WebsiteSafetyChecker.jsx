import React, { useState } from "react";
import { analyzeUrlSafety } from "c:/Users/RBTGL/projects/helloworld/NustSecurePortal/Frontend/src/modules/utils/URLSafetyRules.js";

const WebsiteSafetyChecker = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    if (!url.trim()) return;
    const res = analyzeUrlSafety(url);
    setResult(res);
  };

  return (
    <div className="page-container">
      <h2>Website Safety Checker</h2>
      <p>
        Enter a URL to check for basic risk indicators. This does not do real
        malware scanning, but it highlights suspicious patterns.
      </p>

      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleCheck}>Check Safety</button>

      {result && (
        <div className="card">
          <h3>Result: {result.riskLabel}</h3>
          <p>Risk score: {result.score}</p>
          <p>URL: {result.url}</p>
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
            <p>No obvious issues detected.</p>
          )}
          <p className="note">
            Always double-check URLs and avoid entering your credentials on
            untrusted sites.
          </p>
        </div>
      )}
    </div>
  );
};

export default WebsiteSafetyChecker;