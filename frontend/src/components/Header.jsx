import React, { useEffect, useState } from "react";
import "../styles/styles.css";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand-wrap">
          <h1 className="logo">TinyLink</h1>
          <p className="subtitle">Fast • Simple • Reliable URL Shortener</p>
        </div>

        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </header>
  );
}
