const TextArea = ({ label, name, divClassName = "", inputClassName = "", value, error, rows = 3, ...props }) => {
    return (
        <div className={`mb-3 ${divClassName} relative`}>
            {label && (
                <label className="block text-sm font-medium text-gray-800 mb-1.5">{label}</label>
            )}
            <textarea
                name={name}
                value={value}
                rows={rows}
                className={`w-full rounded-lg border appearance-none px-4 py-2.5 text-md shadow-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-indigo-300 focus:ring-indigo-500/20 ${inputClassName} ${error ? "border-red-500" : "border-gray-300"
                    } `}
                {...props}
            />
            {error && <p className="text-rose-600 text-sm">{error}</p>}
        </div>
    );
};

export default TextArea;