const riskyTlds = [
  ".xyz",
  ".top",
  ".click",
  ".info",
  ".support",
  ".loan",
  ".party",
  ".buzz",
];

export const analyzeUrlSafety = (urlInput) => {
  const url = urlInput.trim().toLowerCase();
  const reasons = [];
  let score = 0;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    score += 1;
    reasons.push("URL does not start with http:// or https://");
  }

  if (url.startsWith("http://")) {
    score += 2;
    reasons.push("Uses HTTP instead of HTTPS");
  }

  riskyTlds.forEach((tld) => {
    if (url.includes(tld)) {
      score += 2;
      reasons.push(`Uses potentially risky domain: ${tld}`); 
    }
  });

  const domainMatch = url.match(
    /https?:\/\/([^/]+)/ // extract domain
  );
  const domain = domainMatch ? domainMatch[1] : "";

  if (domain) {
    const parts = domain.split(".");
    if (parts.length > 3) {
      score += 1;
      reasons.push("Domain has many subdomains (could be deceptive).");
    }

    const normalized = domain.replace(/[\.\-]/g, "");
    if (
      normalized.includes("paypa1") ||
      normalized.includes("micros0ft") ||
      normalized.includes("faceb00k")
    ) {
      score += 3;
      reasons.push("Domain looks like an impersonation (typosquatting).");
    }
  }

  let riskLabel = "Likely Safe";
  if (score >= 6) riskLabel = "High Risk";
  else if (score >= 3) riskLabel = "Moderate Risk";

  return {
    url: urlInput,
    score,
    riskLabel,
    reasons,
  };
};