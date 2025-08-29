import React from 'react';

const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";


// color styles for variants
const variants = {
    light: {
        indigo:
            "bg-indigo-100 text-indigo-500",
        emerald:
            "bg-emerald-100 text-emerald-600",
        red:
            "bg-red-100 text-red-600",
        amber:
            "bg-amber-100 text-amber-600",
        blue: "bg-blue-light-100 text-blue-light-500",
        light: "bg-gray-100 text-gray-700",
        dark: "bg-gray-500 text-white",
    },
    solid: {
        indigo: "bg-indigo-500 text-white",
        emerald: "bg-emerald-500 text-white",
        red: "bg-red-500 text-white",
        amber: "bg-amber-500 text-white",
        blue: "bg-blue-light-500 text-white",
        light: "bg-gray-400 text-white",
        dark: "bg-gray-700 text-white",
    },
};
const TableBadge = ({ variant = "light",
    color = "indigo",
    children }) => {
    const colorStyles = variants[variant][color];

    return (

        <>
            <span className={`${baseStyles}  ${colorStyles}`}>
                {children}
            </span>
        </>
    );
}

export default TableBadge;
