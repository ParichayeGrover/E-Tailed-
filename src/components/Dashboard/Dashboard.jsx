import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useThemeLayout } from "../ThemeLayoutContext";
import { useNavigate } from "react-router-dom";

const defaultWeeklyData = [
  { name: "Mon", progress: 2 },
  { name: "Tue", progress: 4 },
  { name: "Wed", progress: 3 },
  { name: "Thu", progress: 5 },
  { name: "Fri", progress: 6 },
  { name: "Sat", progress: 4 },
  { name: "Sun", progress: 7 },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [teamMembers, setTeamMembers] = useState(5);
  const [activeProjects, setActiveProjects] = useState(2);
  const [notifications] = useState(3);
  const [weeklyData, setWeeklyData] = useState(defaultWeeklyData);
  const [editMode, setEditMode] = useState(false);
  const { layout } = useThemeLayout();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) setUser(JSON.parse(data));
    const stats = localStorage.getItem("dashboardStats");
    if (stats) {
      const parsed = JSON.parse(stats);
      setTeamMembers(parsed.teamMembers || 5);
      setActiveProjects(parsed.activeProjects || 2);
      setWeeklyData(parsed.weeklyData || defaultWeeklyData);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      "dashboardStats",
      JSON.stringify({ teamMembers, activeProjects, weeklyData })
    );
    setEditMode(false);
  };

  const handleWeeklyChange = (idx, value) => {
    setWeeklyData((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, progress: Number(value) } : d))
    );
  };

  if (!user) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 overflow-auto dark:text-white">
      {/* Top bar with back button and heading */}
      <div className="w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[75vw] xl:w-[75vw] 2xl:w-[75vw] max-w-6xl flex flex-col pt-10">
        <div className="flex items-center justify-center mb-6">
          <button
            className="flex items-center text-blue-600 hover:text-blue-800 text-xl font-semibold focus:outline-none dark:text-white dark:hover:text-blue-300"
            onClick={() => navigate("/onboarding")}
            aria-label="Back"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <span className="mr-2" style={{ fontSize: "1.3em" }}>
              &larr;
            </span>{" "}
            Back
          </button>
          <div className="flex-1 flex justify-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-white tracking-tight text-center">
              Your Dashboard
            </h1>
          </div>
          <div className="w-24" /> {/* Spacer for symmetry */}
        </div>
        {/* Welcome Section */}
        <div className="mb-8 w-full flex flex-col items-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-white mb-1 text-center">
            Welcome, {user.name}!
          </div>
          <div className="text-base md:text-lg text-gray-600 dark:text-white text-center">
            {user.email} &bull; {user.company} &bull; {user.industry}
          </div>
        </div>
        {/* Stat Cards - Modern, visually appealing, with icons and color accents */}
        <div className="flex flex-row flex-wrap gap-8 w-full mb-10 justify-center items-stretch">
          {/* Team Members Card */}
          <div
            className="flex-1 min-w-[220px] max-w-xs bg-white bg-opacity-70 dark:bg-white dark:bg-opacity-90 backdrop-blur-md text-gray-900 dark:text-gray-900 rounded-2xl shadow-xl flex flex-col items-center justify-center py-8 px-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative cursor-pointer overflow-hidden group"
            style={{ height: "220px", minWidth: "260px", maxWidth: "320px" }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-purple-800/20 opacity-50"
            ></div>
            <div
              className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 opacity-20 group-hover:opacity-30 transition duration-300"
              style={{ filter: "blur(20px)" }}
            ></div>
            <div
              className="absolute left-0 bottom-0 w-full h-2 rounded-b-2xl"
              style={{
                background:
                  "linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%)",
                boxShadow: "0 8px 24px 0 #a78bfa55",
              }}
            ></div>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/80 mb-4 z-10 group-hover:animate-pulse">
              <svg
                className="w-8 h-8 text-blue-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7a4 4 0 11-8 0 4 4 0 018 0zM5 7a4 4 0 108 0 4 4 0 00-8 0z"
                />
              </svg>
            </div>
            <div className="relative z-20 flex flex-col items-center justify-center w-full b">
              {editMode ? (
                <input
                  type="number"
                  min="1"
                  className="text-4xl py-2 w-24 text-center bg-transparent border-2 border-blue-400/50 rounded-xl text-white dark:text-white"
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(Number(e.target.value))}
                />
              ) : (
                <span className="text-6xl font-bold text-blue-700 dark:text-blue-200 drop-shadow-lg">
                  {teamMembers}
                </span>
              )}
              <div className="text-blue-700 dark:text-blue-300 text-lg font-bold mt-4 z-20 text-center tracking-wide drop-shadow-md">
                Team Members
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          </div>

          {/* Active Projects Card */}
          <div
            className="flex-1 min-w-[220px] max-w-xs bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-80 backdrop-blur-md text-gray-900 dark:text-white rounded-2xl shadow-xl flex flex-col items-center justify-center py-8 px-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative cursor-pointer overflow-hidden group"
            style={{ height: "220px", minWidth: "260px", maxWidth: "320px" }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-green-800/20 opacity-50"
            ></div>
            <div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-green-600 opacity-20 group-hover:opacity-30 transition duration-300"
              style={{ filter: "blur(20px)" }}
            ></div>
            <div
              className="absolute left-0 bottom-0 w-full h-2 rounded-b-2xl"
              style={{
                background:
                  "linear-gradient(90deg, #6ee7b7 0%, #059669 100%)",
                boxShadow: "0 8px 24px 0 #6ee7b755",
              }}
            ></div>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-900/80 mb-4 z-10 group-hover:animate-pulse">
              <svg
                className="w-8 h-8 text-green-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-2a4 4 0 014-4h4a4 4 0 014 4v2M9 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className="relative z-20">
              {editMode ? (
                <input
                  type="number"
                  min="0"
                  className="text-4xl py-2 w-24 text-center bg-transparent border-2 border-green-400/50 rounded-xl text-white dark:text-white"
                  value={activeProjects}
                  onChange={(e) => setActiveProjects(Number(e.target.value))}
                />
              ) : (
                <span className="text-6xl font-bold text-green-700 dark:text-green-200 drop-shadow-lg">
                  {activeProjects}
                </span>
              )}
            </div>
            <div className="text-white/90 text-lg font-medium mt-4 z-10 text-center tracking-wide dark:text-white">
              Active Projects
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-500"></div>
          </div>

          {/* Notifications Card */}
          <div
            className="flex-1 min-w-[220px] max-w-xs bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-80 backdrop-blur-md text-gray-900 dark:text-white rounded-2xl shadow-xl flex flex-col items-center justify-center py-8 px-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative cursor-pointer overflow-hidden group"
            style={{ height: "220px", minWidth: "260px", maxWidth: "320px" }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-yellow-800/20 opacity-50"
            ></div>
            <div
              className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-yellow-600 opacity-20 group-hover:opacity-30 transition duration-300"
              style={{ filter: "blur(20px)" }}
            ></div>
            <div
              className="absolute left-0 bottom-0 w-full h-2 rounded-b-2xl"
              style={{
                background:
                  "linear-gradient(90deg, #fcd34d 0%, #d97706 100%)",
                boxShadow: "0 8px 24px 0 #fcd34d55",
              }}
            ></div>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-900/80 mb-4 z-10 group-hover:animate-pulse">
              <svg
                className="w-8 h-8 text-yellow-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div className="relative z-20">
              <span className="text-6xl font-bold text-yellow-700 dark:text-yellow-200 drop-shadow-lg">
                {notifications}
              </span>
            </div>
            <div className="text-white/90 text-lg font-medium mt-4 z-10 text-center tracking-wide dark:text-white">
              Notifications
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
          </div>
        </div>
        {/* Chart Section */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-inner w-full mb-8 p-8 dark:text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
<h2 className="text-2xl font-semibold text-blue-700 dark:text-white mb-4 md:mb-0">              Weekly Progress
            </h2>
            {editMode && (
              <div className="flex flex-wrap gap-4">
                {weeklyData.map((d, idx) => (
                  <div key={d.name} className="flex flex-col items-center">
                    <label className="text-lg font-semibold mb-1">{d.name}</label>
                    <input
                      type="number"
                      min="0"
                      className="text-lg py-2 w-20 text-center border-2 border-blue-200 rounded-lg"
                      value={d.progress}
                      onChange={(e) => handleWeeklyChange(idx, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis allowDecimals={false} stroke="#8884d8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#2563eb"
                strokeWidth={4}
                dot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Edit/Save Buttons */}
        <div className="flex justify-end mt-4 gap-4 w-full dark:text-white">
          {editMode ? (
            <button
              className="btn  bg-green-600 hover:bg-green-700 text-xl py-4 px-8 dark:text-white"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <>
              <button
                className="btn bg-red-400! hover:bg-red-700! text-xl py-4 px-8 dark:text-white"
                style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none' }}
                onClick={() => {
                  localStorage.clear();
                  navigate("/onboarding/step-1");
                }}
              >
                Logout
              </button>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-xl py-4 px-8 dark:text-white"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}