import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import { ThemeLayoutProvider } from "./components/ThemeLayoutContext";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");
  
  if (!userData) {
    return <Navigate to="/onboarding" />;
  }
  
  return children;
};

// Public Route component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");
  
  if (userData) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  // Ensure app always starts in light mode
  useEffect(() => {
    document.body.classList.remove("dark-mode");
  }, []);

  return (
    <ThemeLayoutProvider>
      <Router>
        <Routes>
          <Route
            path="/onboarding/*"
            element={
              <PublicRoute>
                <OnboardingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={localStorage.getItem("userData") ? "/dashboard" : "/onboarding"} />
            }
          />
        </Routes>
      </Router>
    </ThemeLayoutProvider>
  );
}

export default App;