import { EyeClosedIcon, EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Input(
  { label, name, type = "text", divClassName = "", inputClassName = "", value, error },
  ...props
) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(() => !showPassword);
  };
  return (
    <>
      <div className={`mb-4 relative ${divClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
        )}
        <input
          name={name}
          type={showPassword ? "text" : type}
          value={value}
          {...props}
          className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-md shadow-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-indigo-300 focus:ring-indigo-500/20 ${inputClassName} ${error ? "border-red-500" : "order-gray-300"
            } `}
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        {type === "password" ? (
          <button
            type="button"
            onClick={handlePasswordVisibility}
            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-10/15 text-gray-700"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <EyeIcon size={20} />
            )}
          </button>
        ) : null}
      </div>
    </>
  );
}
