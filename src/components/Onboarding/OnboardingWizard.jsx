import React, { useState, useEffect } from "react";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2BusinessInfo from "./Step2BusinessInfo";
import Step3Preferences from "./Step3Preferences";
import ProgressBar from "./ProgressBar";
import { useNavigate, useLocation } from "react-router-dom";

const steps = [
  { label: "Personal Info", component: Step1PersonalInfo },
  { label: "Business Info", component: Step2BusinessInfo },
  { label: "Preferences", component: Step3Preferences },
];

const initialData = {
  name: "",
  email: "",
  company: "",
  industry: "",
  size: "",
  theme: "light",
  layout: "default",
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Only redirect if not already on onboarding route
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData && !location.pathname.startsWith("/onboarding")) {
      navigate("/dashboard");
    }
  }, [navigate, location]);

  const validateStep = (currentStep) => {
    let stepErrors = {};
    
    switch (currentStep) {
      case 0: // Personal Info
        if (!formData.name?.trim()) {
          stepErrors.name = "Name is required";
        }
        if (!formData.email?.trim()) {
          stepErrors.email = "Email is required";
        } else if (!isValidEmail(formData.email)) {
          stepErrors.email = "Please enter a valid email address";
        }
        break;
        
      case 1: // Business Info
        if (!formData.company?.trim()) {
          stepErrors.company = "Company name is required";
        }
        if (!formData.industry?.trim()) {
          stepErrors.industry = "Industry is required";
        }
        if (!formData.size) {
          stepErrors.size = "Company size is required";
        }
        break;
        
      case 2: 
        break;
    }
    
    return stepErrors;
  };

  const handleSubmit = () => {
    const finalErrors = validateStep(step);
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify(formData));
    
    // Initialize default dashboard stats
    const defaultStats = {
      teamMembers: 5,
      activeProjects: 2,
      weeklyData: [
        { name: "Mon", progress: 2 },
        { name: "Tue", progress: 4 },
        { name: "Wed", progress: 3 },
        { name: "Thu", progress: 5 },
        { name: "Fri", progress: 6 },
        { name: "Sat", progress: 4 },
        { name: "Sun", progress: 7 },
      ],
    };
    
    localStorage.setItem("dashboardStats", JSON.stringify(defaultStats));
    navigate("/dashboard");
  };

  const handleNext = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length === 0) {
      if (step === steps.length - 1) {
        handleSubmit();
      } else {
        setStep(prev => prev + 1);
        setErrors({}); // Clear errors when moving to next step
      }
    } else {
      setErrors(stepErrors);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(0, prev - 1));
    setErrors({}); // Clear errors when moving back
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const CurrentStep = steps[step].component;

  // fallback UI for debugging
  if (!steps[step]) {
    return <div className="text-center text-red-600">Onboarding step not found. Please refresh.</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <ProgressBar currentStep={step} totalSteps={steps.length} />
        <div className="mt-8">
          {React.createElement(steps[step].component, {
            data: formData,
            onChange: handleChange,
            errors,
          })}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            className="btn bg-gray-500 hover:bg-gray-600"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
          >
            Back
          </button>
          <button
            className="btn bg-blue-600 hover:bg-blue-700"
            onClick={handleNext}
          >
            {step === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}