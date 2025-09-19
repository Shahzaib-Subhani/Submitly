import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComponentCard = ({ title, children, className = "" }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={`rounded-2xl border border-gray-200 bg-white ${className}`}>
                <div className="flex items-center gap-2 px-6 py-5">
                    <button
                        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <ChevronLeft size={20} className="w-5 h-5 text-gray-700" />
                    </button>
                    <h3 className="text-lg font-medium text-gray-800">{title}</h3>
                </div>

                <div className="p-4 border-t border-gray-100 sm:p-6">
                    <div className="space-y-6">{children}</div>
                </div>
            </div>
        </>
    );
}

export default ComponentCard;
