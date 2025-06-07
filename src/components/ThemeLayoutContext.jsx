import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeLayoutContext = createContext();

export function ThemeLayoutProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [layout, setLayout] = useState("default");

  // Load from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const { theme: savedTheme, layout: savedLayout } = JSON.parse(userData);
      if (savedTheme) setTheme(savedTheme);
      if (savedLayout) setLayout(savedLayout);
    }
  }, []);

  // Apply theme to body
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeLayoutContext.Provider value={{ theme, setTheme, layout, setLayout }}>
      {children}
    </ThemeLayoutContext.Provider>
  );
}

export function useThemeLayout() {
  return useContext(ThemeLayoutContext);
}
