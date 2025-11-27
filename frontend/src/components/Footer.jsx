import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} TinyLink</span>
        <span className="muted">
          Built with ❤️ using Node.js · React · MySQL
        </span>
      </div>
    </footer>
  );
}
