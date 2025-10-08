import { BadgeInfo, CircleCheckBig, CircleX, Info, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Notification = ({ t, type }) => {
    const { main, sub } = t.message || {};
    const classNames = {
        success: "border-emerald-500",
        error: "border-rose-500",
        info: "border-sky-500",
    };

    const iconClasses = {
        success: "text-emerald-600",
        error: "text-rose-600",
        info: "text-sky-600",
    };

    const IconsList = {
        success: CircleCheckBig,
        error: CircleX,
        info: BadgeInfo,
    };

    const Icon = IconsList[type] || Info;
    return (
        <div
            className={`flex items-center gap-3 w-full sm:max-w-[340px] bg-white rounded-md z-999 border antialiased p-3 shadow-lg ${classNames[type]} ${t.visible ? "animate-enter" : "animate-leave"
                }`}
        >
            <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconClasses[type]}`}
            >
                <Icon size={25} />
            </div>

            <div className="flex-1">
                <p className="text-md font-medium text-gray-800">{main}</p>
                {sub && <p className="text-sm text-gray-500 mt-1">{sub}</p>}
            </div>

            <button
                onClick={() => toast.dismiss(t.id)}
                className="ml-2 text-gray-600 text-lg font-medium hover:text-gray-800 "
            >
                ✕
            </button>
        </div>
    );
}

export default Notification;
