import { Loader, LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function Button({ children, type, className, label, isLoading, loadingMessage = "Submitting", ...props }) {
  return (
    <button
      type={type}
      className={`py-3 px-4  bg-indigo-500 text-white font-semibold rounded-lg
        shadow-sm hover:bg-indigo-600 transition-colors duration-200
        focus:outline-none focus:ring-1 focus:ring-indigo-100 focus:ring-opacity-50 cursor-pointer
        disabled:bg-indigo-400 text-center
        ${className}
      `}
      disabled={isLoading}
      {...props}
    >

      { isLoading ? (
        <>
          <span className="ms-2 flex items-center gap-3 justify-center">
            <Loader size={25} strokeWidth={2} className="animate-spin" />
            {loadingMessage} ...
          </span>
        </>
      ) : (
        "Submit"
      )}
    </button>
  );
}
