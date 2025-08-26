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
          className={`w-full border px-3 py-2 text-sm shadow-sm rounded-sm transition duration-300 ease  focus:border-slate-400 hover:border-slate-300   text-slate-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-300 ${
            error ? "border-red-500" : "border-slate-200"
          }`}
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        {type === "password" ? (
          <div class="flex items-center mb-2">
            <input
              id="default-checkbox"
              type="checkbox"
              onChange={ handlePasswordVisibility}
              class="w-4 h-4 text-gray-600 bg-gray-100 rounded-md accent-gray-800"
            />
            <label for="default-checkbox" class="ms-2 text-sm  text-gray-400">
              Show Password
            </label>
          </div>
        ) : null}
      </div>
    </>
  );
}
