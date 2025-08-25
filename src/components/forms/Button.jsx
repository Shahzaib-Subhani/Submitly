import React from "react";

export default function Button({ children, type, className }, props) {
  return (
    <button
      type={type}
      className={`
        w-full py-3 px-4  bg-gray-800 text-white font-semibold rounded-sm 
        shadow-md hover:bg-gray-900 transition-colors duration-200
        focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
