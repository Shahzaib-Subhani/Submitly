import React from "react";

export default function Button({ children, type, className, ...props }) {
  return (
    <button
      type={type}
      className={` py-3 px-4  bg-indigo-500 text-white font-semibold rounded-lg
        shadow-sm hover:bg-indigo-600 transition-colors duration-200
        focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:ring-opacity-50 cursor-pointer
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
