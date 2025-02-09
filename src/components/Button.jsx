import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, onClick, type = "filled", className = "", btnType='button', children }) => {
  const baseClasses =
    `relative inline-flex text-nowrap items-center justify-center hover:opacity-80 font-semibold rounded-md transition px-4 py-2`;
    
    
    const typeClasses = {
      filled: "bg-blue-600", // ✅ Removed text-white
      outlined: "border border-blue-500 text-blue-500",
      text: "text-blue-500",
    };
    

  const mergedClasses = `${baseClasses} ${
    typeClasses[type] || typeClasses.filled
  } ${className}`;

  return to ? (
    <Link to={to} className={mergedClasses}>
      {children}
    </Link>
  ) : (
    <button type={btnType} className={mergedClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
