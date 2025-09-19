import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import { Calendar } from 'lucide-react';
import React, { useEffect } from 'react';

const Datepicker = ({ id,
    mode,
    name,
    onChange,
    value,
    label,
    defaultDate,
    placeholder,
    error,
    ...props
}) => {
    useEffect(() => {
        const flatPickr = flatpickr(`#${id}`, {
            mode: mode || "single",
            static: true,
            monthSelectorType: "static",
            dateFormat: "d-m-Y",
            defaultDate,
            minDate: new Date().fp_incr(1),
            onChange,
        });

        return () => {
            if (!Array.isArray(flatPickr)) {
                flatPickr.destroy();
            }
        };
    }, [mode, onChange, id, defaultDate]);
    return (
        <div className='mb-4 relative'>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Choose Date</label>

            <div className="relative">
                <input
                    id={id}
                    name={name}
                    {...props}
                    className={`h-11 w-75 rounded-lg border appearance-none px-4 py-2.5 text-md shadow-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 focus:border-indigo-300 focus:ring-indigo-500/20 ${error ? "border-rose-600" : "border-gray-300"
                        } `}
                    value={value}
                    onChange={onChange}
                />
                {error && <p className="text-rose-600 text-sm">{error}</p>}
            </div>
        </div>
    );
}

export default Datepicker;
