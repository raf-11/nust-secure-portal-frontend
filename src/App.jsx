import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

import Navbar from "c:/Users/RBTGL/projects/helloworld/NustSecurePortal/Frontend/src/components/navbar";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FileEncryptDecrypt from "./pages/FileEncryptDecrypt.jsx";
import PhishingChecker from "./pages/PhishingChecker.jsx";
import PasswordStrength from "./pages/PasswordStrength.jsx";
import PasswordVault from "./pages/PasswordVault.jsx";
import ReportIssue from "./pages/ReportIssue.jsx";
import WebsiteSafetyChecker from "./pages/WebsiteSafetyChecker.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/file-encrypt"
            element={
              <ProtectedRoute user={user}>
                <FileEncryptDecrypt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/phishing-checker"
            element={
              <ProtectedRoute user={user}>
                <PhishingChecker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password-strength"
            element={
              <ProtectedRoute user={user}>
                <PasswordStrength />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password-vault"
            element={
              <ProtectedRoute user={user}>
                <PasswordVault user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report-issue"
            element={
              <ProtectedRoute user={user}>
                <ReportIssue user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/website-safety"
            element={
              <ProtectedRoute user={user}>
                <WebsiteSafetyChecker />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;