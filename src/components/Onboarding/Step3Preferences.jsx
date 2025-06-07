import React from "react";
import { useThemeLayout } from "../ThemeLayoutContext";

export default function Step3Preferences({ data, onChange, errors = {} }) {
  const { setTheme, setLayout } = useThemeLayout();

  const handleThemeChange = e => {
    onChange("theme", e.target.value);
    setTheme(e.target.value);
  };
  const handleLayoutChange = e => {
    onChange("layout", e.target.value);
    setLayout(e.target.value);
  };

  return (
    <div className="step-transition">
      <h2 className="text-3xl font-bold mb-10 text-blue-700">Preferences</h2>
      <div className="mb-8">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          className="text-xl py-4 w-full"
          value={data.theme}
          onChange={handleThemeChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        {errors.theme && <div className="text-red-500 text-base mt-1">{errors.theme}</div>}
      </div>
      <div className="mb-2">
        <label htmlFor="layout">Default Dashboard Layout</label>
        <select
          id="layout"
          className="text-xl py-4 w-full"
          value={data.layout}
          onChange={handleLayoutChange}
        >
          <option value="default">Default</option>
          <option value="compact">Compact</option>
          <option value="expanded">Expanded</option>
        </select>
        {errors.layout && <div className="text-red-500 text-base mt-1">{errors.layout}</div>}
      </div>
    </div>
  );
}