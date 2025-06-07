import React from "react";

export default function Step1PersonalInfo({ data, onChange, errors }) {
  return (
    <div className="step-transition">
      <h2 className="text-3xl font-bold mb-10 text-blue-700">Personal Info</h2>
      <div className="mb-8">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="text-xl py-4 w-full"
          value={data.name}
          onChange={e => onChange("name", e.target.value)}
          placeholder="Enter your name"
        />
        {errors.name && <div className="text-red-500 text-base mt-1">{errors.name}</div>}
      </div>
      <div className="mb-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="text-xl py-4 w-full"
          value={data.email}
          onChange={e => onChange("email", e.target.value)}
          placeholder="Enter your email"
        />
        {errors.email && <div className="text-red-500 text-base mt-1">{errors.email}</div>}
      </div>
    </div>
  );
}