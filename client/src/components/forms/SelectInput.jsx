
const SelectInput = ({ label, name, value, error, placeholder, options = [], ...props }) => {
    return (
        <>

            <div className={`mb-3`}>
                {label && (
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">{label}</label>
                )}
                <select
                    name={name}
                    value={value}
                    className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-md shadow-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-indigo-300 focus:ring-indigo-500/20 ${error ? "border-red-500" : "border-gray-300"
                        } `}
                    {...props}
                >
                <option value="" disabled className="text-gray-700"> {placeholder} </option>
                {options.map((option) => (
                    <option key={option.evaluatorID} value={option._id} className="text-gray-700"> {option.name} </option>
                ))}
                </select>
                {error && <p className="text-rose-600 text-sm">{error}</p>}
            </div>
        </>
    );
}

export default SelectInput;
