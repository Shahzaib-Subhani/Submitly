import { EyeIcon, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

const InputPassword = ({ label, name, divClassName = "", inputClassName = "", value, error, ...props }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(() => !showPassword);
    };
    return (
        <>
            <div className={`mb-3 ${divClassName}`}>
                <div className={"relative"}>
                    {label && (
                        <label className="block text-sm font-medium text-gray-800 mb-1.5">{label}</label>
                    )}
                    <input
                        name={name}
                        type={"password"}
                        value={value}
                        className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-md shadow-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-indigo-300 focus:ring-indigo-500/20 ${inputClassName} ${error ? "border-red-500" : "border-gray-300"
                            } `}
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={handlePasswordVisibility}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-10/15 text-gray-700"
                    >
                        {showPassword ? (
                            <EyeIcon size={20} />
                        ) : (
                            <EyeOff size={20} />
                        )}
                    </button>


                </div>
                {error && <p className="text-rose-600 text-sm">{error}</p>}
            </div>
        </>
    );
}

export default InputPassword;
