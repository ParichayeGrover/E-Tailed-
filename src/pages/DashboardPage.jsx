import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";

export default function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("userData");
    if (!userData) {
      navigate("/onboarding");
      return;
    }
  }, [navigate]);

  return <Dashboard />;
}
