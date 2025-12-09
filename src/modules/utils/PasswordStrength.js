import zxcvbn from "zxcvbn";

export const evaluatePassword = (password) => {
  const result = zxcvbn(password);
  const score = result.score; // 0-4
  const crackTimes = result.crack_times_display.offline_slow_hashing_1e4_per_second;

  let label;
  if (score <= 1) label = "Very Weak";
  else if (score === 2) label = "Weak";
  else if (score === 3) label = "Good";
  else label = "Strong";

  return {
    score,
    label,
    feedback: result.feedback,
    crackTime: crackTimes,
  };
};