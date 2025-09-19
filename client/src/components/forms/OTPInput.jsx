import React, { useRef } from 'react';

const OTPInput = ({ value, onChange, length = 6, error }) => {
    const inputsRef = useRef([]);
    const getOtpArray = (otp = "") =>
        otp.split("").concat(Array(length).fill("")).slice(0, length);


    const setOtpAt = (index, digit) => {
        const otpArray = getOtpArray(value);
        otpArray[index] = digit;
        onChange(otpArray.join(""));
    };

    const handleChange = (rawValue, index) => {
        const digit = rawValue.replace(/\D/g, "").slice(0, 1);
        if (!/^\d?$/.test(digit)) return;
        setOtpAt(index, digit);
        if (digit && index < length - 1) inputsRef.current[index + 1]?.focus();
    };

    const handleKeyDown = (e, index) => {
        const otpArr = getOtpArray(value);
        if (e.key === "Backspace") {
            e.preventDefault();
            if (otpArr[index]) setOtpAt(index, "");
            else if (index > 0) {
                setOtpAt(index - 1, "");
                inputsRef.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            inputsRef.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
            e.preventDefault();
            inputsRef.current[index + 1]?.focus();
        }
    };
    return (
        <>
            <div className="flex justify-between gap-2 sm:gap-3">
                {Array.from({ length }).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={getOtpArray(value)[index]}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={`w-12 h-12 text-center text-lg font-medium border rounded-lg focus:outline-none focus:ring-3 bg-transparent text-gray-800 focus:border-indigo-300 focus:ring-indigo-500/20 ${error ? "border-rose-500" : "border-gray-300"
                            }`}
                    />
                ))}
            </div>
            {error && <p className="text-rose-600 text-sm">{error}</p>}
        </>
    );
}

export default OTPInput;
