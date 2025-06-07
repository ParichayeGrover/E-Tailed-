// progress bar logic
import React from "react";

export default function ProgressBar({ currentStep, totalSteps }) {
  return (
    <div className="progress-bar" aria-label="Progress Bar">
      <div
        className="progress-bar-inner"
        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
      ></div>
    </div>
  );
}