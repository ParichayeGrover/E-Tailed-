import React from "react";

export default function Step2BusinessInfo({ data, onChange, errors }) {
  return (
    <div className="step-transition">
      <h2 className="text-3xl font-bold mb-10 text-blue-700">Business Info</h2>
      <div className="mb-8">
        <label htmlFor="company">Company Name</label>
        <input
          id="company"
          type="text"
          className="text-xl py-4 w-full"
          value={data.company}
          onChange={e => onChange("company", e.target.value)}
          placeholder="Enter your company name"
        />
        {errors.company && <div className="text-red-500 text-base mt-1">{errors.company}</div>}
      </div>
      <div className="mb-8">
        <label htmlFor="industry">Industry</label>
        <input
          id="industry"
          type="text"
          className="text-xl py-4 w-full"
          value={data.industry}
          onChange={e => onChange("industry", e.target.value)}
          placeholder="Enter your industry"
        />
        {errors.industry && <div className="text-red-500 text-base mt-1">{errors.industry}</div>}
      </div>
      <div className="mb-2">
        <label htmlFor="size">Company Size</label>
        <input
          id="size"
          type="number"
          min="1"
          className="text-xl py-4 w-full"
          value={data.size}
          onChange={e => onChange("size", e.target.value)}
          placeholder="Enter number of employees"
        />
        {errors.size && <div className="text-red-500 text-base mt-1">{errors.size}</div>}
      </div>
    </div>
  );
}