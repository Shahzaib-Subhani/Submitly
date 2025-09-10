import { Link } from 'react-router-dom';


const baseStyles =
    "inline-flex items-center px-3 py-2 justify-center gap-1 rounded-full font-medium cursor-pointer border";


// color styles for variants
const variants = {
    light: {
        indigo:
            "bg-indigo-50 text-indigo-500 border-indigo-300 hover:bg-indigo-100",
        emerald:
            "bg-emerald-50 text-emerald-600 border-emerald-300 hover:bg-emerald-100",
        red:
            "bg-red-50 text-red-600 border-red-300 hover:bg-red-100",
        amber:
            "bg-amber-50 text-amber-600 border-amber-300 hover:bg-amber-100",
        blue: "bg-blue-50 text-blue-500 border-blue-300 hover:bg-blue-100",
        light: "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100",
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
const LinkButton = ({ children, type, className, path, variant = "light", color = "indigo", ...props }) => {
    const colorStyles = variants[variant][color];
    return (
        <Link to={path}>
            <button
                type={type}
                className={`${baseStyles}  ${colorStyles}`}
                {...props}
            >
                {children}
            </button>
        </Link>
    );
}

export default LinkButton;
