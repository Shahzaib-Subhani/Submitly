import { useState } from "react";

export default function Input(
  { label, name, type = "text", value, error },
  ...props
) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(() => !showPassword);
  };
  return (
    <>
      <div className="flex flex-col gap-1 mb-4 relative">
        {label && (
          <label className="font-normal text-sm text-gray-700">{label}</label>
        )}
        <input
          name={name}
          type={showPassword ? "text" : type}
          value={value}
          {...props}
          className={`w-full border px-3 py-2 text-sm shadow-sm rounded-md transition duration-300 ease  focus:border-indigo-400 hover:border-indigo-300   text-slate-700 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${error ? "border-red-500" : "border-slate-200"
            }`}
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        {type === "password" ? (
          <div className="flex items-center mb-2">
            <input
              id={`default-checkbox${name}`}
              type="checkbox"
              onChange={handlePasswordVisibility}
              className="w-4 h-4  cursor-pointer outline-0 rounded-md checked:border-transparent accent-gray-900"
            />

            <label htmlFor={`default-checkbox${name}`} className="ms-2 text-sm cursor-pointer text-gray-400">
              Show Password
            </label>
          </div>
        ) : null}
      </div>
    </>
  );
}
