import React from "react";
import { Link } from "react-router-dom";

export const Footer = ({ darkMode }) => {
  // Conditional styling based on darkMode
  const footerStyle = darkMode ? "bg-black text-white" : "bg-white text-black";

  return (
    <div className={`${footerStyle} p-4`}>
      <p className="text-center">
        © Copyright 2025 All rights reserved.
        <Link to="/privacy" className="ml-2 hover:underline">
          Privacy Policy
        </Link>
        {" - "}
        <Link to="/terms" className="ml-2 hover:underline">
          Terms of Service
        </Link>
        {" - "}
        <Link to="/disclaimer" className="ml-2 hover:underline">
          Disclaimer
        </Link>
      </p>
    </div>
  );
};
